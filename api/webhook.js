import { MercadoPagoConfig, Payment } from 'mercadopago'
import { createClient } from '@supabase/supabase-js'

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
})

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { type, data } = req.body

    // O Mercado Pago envia vários tipos de notificação.
    // Só nos interessa 'payment'
    if (type !== 'payment') {
      return res.status(200).json({ ok: true })
    }

    const paymentId = data?.id
    if (!paymentId) {
      return res.status(200).json({ ok: true })
    }

    // Buscar detalhes do pagamento na API do Mercado Pago
    const payment = new Payment(mp)
    const paymentData = await payment.get({ id: paymentId })

    // Só ativar se o pagamento foi aprovado
    if (paymentData.status !== 'approved') {
      return res.status(200).json({ ok: true, status: paymentData.status })
    }

    const giftId = paymentData.external_reference

    if (!giftId) {
      console.error('Webhook sem external_reference')
      return res.status(200).json({ ok: true })
    }

    // Atualizar o presente para 'paid'
    const { error: updateError } = await supabase
      .from('gifts')
      .update({
        status: 'paid',
        mp_payment_id: String(paymentId),
      })
      .eq('id', giftId)

    if (updateError) {
      console.error('Erro ao atualizar presente:', updateError)
      return res.status(500).json({ error: 'Erro ao atualizar' })
    }

    return res.status(200).json({ ok: true, status: 'paid' })

  } catch (error) {
    console.error('Erro no webhook:', error)
    // Sempre retornar 200 para o MP não reenviar indefinidamente
    return res.status(200).json({ ok: true })
  }
}
