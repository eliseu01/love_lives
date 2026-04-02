import { MercadoPagoConfig, Preference } from 'mercadopago'
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
    const { gift_id } = req.body

    if (!gift_id) {
      return res.status(400).json({ error: 'gift_id é obrigatório' })
    }

    // Buscar o presente no Supabase
    const { data: gift, error: fetchError } = await supabase
      .from('gifts')
      .select('id, slug, names, status')
      .eq('id', gift_id)
      .single()

    if (fetchError || !gift) {
      return res.status(404).json({ error: 'Presente não encontrado' })
    }

    if (gift.status === 'paid') {
      return res.status(400).json({ error: 'Presente já foi pago' })
    }

    // Detectar a base URL (funciona em preview deploys e produção)
    const protocol = req.headers['x-forwarded-proto'] || 'https'
    const host = req.headers['x-forwarded-host'] || req.headers.host
    const baseUrl = `${protocol}://${host}`
    const isLocalhost = host.startsWith('localhost') || host.startsWith('127.0.0.1')

    // Criar preferência no Mercado Pago
    const preference = new Preference(mp)
    const result = await preference.create({
      body: {
        items: [
          {
            id: gift.id,
            title: `LoveStory — Presente para ${gift.names}`,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: 24.90,
          },
        ],
        back_urls: {
          success: `${baseUrl}/pagamento/sucesso?slug=${gift.slug}`,
          failure: `${baseUrl}/pagamento/erro?slug=${gift.slug}`,
          pending: `${baseUrl}/pagamento/pendente?slug=${gift.slug}`,
        },
        // auto_return exige URLs públicas — desativado em localhost
        ...(!isLocalhost && { auto_return: 'approved' }),
        external_reference: gift.id,
        notification_url: `${baseUrl}/api/webhook`,
        payment_methods: {
          excluded_payment_types: [
            { id: 'ticket' }, // exclui boleto
          ],
          installments: 1,
        },
      },
    })

    // Salvar o ID da preferência no presente
    await supabase
      .from('gifts')
      .update({ mp_preference_id: result.id })
      .eq('id', gift.id)

    return res.status(200).json({
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    })

  } catch (error) {
    console.error('Erro ao criar preferência:', error)
    return res.status(500).json({ error: 'Erro interno' })
  }
}
