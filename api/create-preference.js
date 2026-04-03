import { MercadoPagoConfig, Preference } from 'mercadopago'
import { createClient } from '@supabase/supabase-js'

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
})

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const SITE_URL = process.env.SITE_URL
const GIFT_PRICE = parseFloat(process.env.GIFT_PRICE || '24.90')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // 1. Extrair e validar o token JWT do usuário
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token de autenticação ausente' })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return res.status(401).json({ error: 'Token inválido' })
    }

    // 2. Validar o gift_id
    const { gift_id } = req.body

    if (!gift_id) {
      return res.status(400).json({ error: 'gift_id é obrigatório' })
    }

    // 3. Buscar o presente e verificar que pertence ao usuário autenticado
    const { data: gift, error: fetchError } = await supabase
      .from('gifts')
      .select('id, slug, names, status, user_id')
      .eq('id', gift_id)
      .single()

    if (fetchError || !gift) {
      return res.status(404).json({ error: 'Presente não encontrado' })
    }

    if (gift.user_id !== user.id) {
      return res.status(403).json({ error: 'Sem permissão' })
    }

    if (gift.status === 'paid') {
      return res.status(400).json({ error: 'Presente já foi pago' })
    }

    // 4. Usar SITE_URL fixa (não derivar do header Host)
    if (!SITE_URL) {
      console.error('SITE_URL não configurada')
      return res.status(500).json({ error: 'Configuração do servidor incompleta' })
    }

    // 5. Criar preferência no Mercado Pago
    const preference = new Preference(mp)
    const result = await preference.create({
      body: {
        items: [
          {
            id: gift.id,
            title: `LoveStory — Presente para ${gift.names}`,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: GIFT_PRICE,
          },
        ],
        back_urls: {
          success: `${SITE_URL}/pagamento/sucesso?slug=${gift.slug}`,
          failure: `${SITE_URL}/pagamento/erro?slug=${gift.slug}`,
          pending: `${SITE_URL}/pagamento/pendente?slug=${gift.slug}`,
        },
        auto_return: 'approved',
        external_reference: gift.id,
        notification_url: `${SITE_URL}/api/webhook`,
        payment_methods: {
          excluded_payment_types: [
            { id: 'ticket' },
          ],
          installments: 1,
        },
      },
    })

    // 6. Salvar o ID da preferência
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
