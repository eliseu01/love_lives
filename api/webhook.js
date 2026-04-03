import { MercadoPagoConfig, Payment } from 'mercadopago'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
})

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const WEBHOOK_SECRET = process.env.MP_WEBHOOK_SECRET

function verifyWebhookSignature(req) {
  // Se não temos secret configurado, pula a validação (dev/test)
  if (!WEBHOOK_SECRET) return true

  const xSignature = req.headers['x-signature']
  const xRequestId = req.headers['x-request-id']

  if (!xSignature || !xRequestId) return false

  // Extrair ts e v1 do header x-signature
  // Formato: "ts=1234567890,v1=abc123..."
  const parts = xSignature.split(',')
  let ts = ''
  let hash = ''

  for (const part of parts) {
    const [key, value] = part.split('=')
    if (key && value) {
      const trimmedKey = key.trim()
      const trimmedValue = value.trim()
      if (trimmedKey === 'ts') ts = trimmedValue
      else if (trimmedKey === 'v1') hash = trimmedValue
    }
  }

  if (!ts || !hash) return false

  // Obter data.id da query string
  const url = new URL(req.url, `https://${req.headers.host}`)
  const dataId = url.searchParams.get('data.id') || req.body?.data?.id || ''

  // Montar o template e calcular HMAC
  const signatureTemplate = `id:${dataId};request-id:${xRequestId};ts:${ts};`
  const computedHash = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(signatureTemplate)
    .digest('hex')

  return computedHash === hash
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // 1. Validar assinatura do webhook
    if (!verifyWebhookSignature(req)) {
      console.error('Webhook com assinatura inválida')
      return res.status(401).json({ error: 'Assinatura inválida' })
    }

    // 2. Processar a notificação
    const { type, data } = req.body

    if (type !== 'payment') {
      return res.status(200).json({ ok: true })
    }

    const paymentId = data?.id
    if (!paymentId) {
      return res.status(200).json({ ok: true })
    }

    // 3. Buscar detalhes do pagamento na API do Mercado Pago
    const payment = new Payment(mp)
    const paymentData = await payment.get({ id: paymentId })

    if (paymentData.status !== 'approved') {
      return res.status(200).json({ ok: true, status: paymentData.status })
    }

    const giftId = paymentData.external_reference

    if (!giftId) {
      console.error('Webhook sem external_reference')
      return res.status(200).json({ ok: true })
    }

    // 4. Verificar que o valor pago confere (evita manipulação de preço)
    const expectedPrice = parseFloat(process.env.GIFT_PRICE || '24.90')
    if (paymentData.transaction_amount < expectedPrice) {
      console.error(`Valor pago (${paymentData.transaction_amount}) menor que esperado (${expectedPrice})`)
      return res.status(200).json({ ok: true })
    }

    // 5. Atualizar o presente para 'paid'
    const { error: updateError } = await supabase
      .from('gifts')
      .update({
        status: 'paid',
        mp_payment_id: String(paymentId),
      })
      .eq('id', giftId)
      .eq('status', 'draft') // só atualiza se ainda for draft (idempotente)

    if (updateError) {
      console.error('Erro ao atualizar presente:', updateError)
      return res.status(500).json({ error: 'Erro ao atualizar' })
    }

    return res.status(200).json({ ok: true, status: 'paid' })

  } catch (error) {
    console.error('Erro no webhook:', error)
    return res.status(200).json({ ok: true })
  }
}
