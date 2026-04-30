import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useEdition } from '../contexts/EditionContext'

const DEV_DATA = {
  valentines: {
    names: 'Luciano & Karlla',
    start_date: '2016-06-27',
    letter_text: `Desde o primeiro dia, soube que você era especial.
Cada momento ao seu lado é uma lembrança que guardo com carinho.
Obrigado por cada sorriso, cada abraço, cada aventura.
Te amo hoje e sempre.`,
    music_url: 'https://www.youtube.com/watch?v=VUkt0mrkR5s',
    photos: [
      { src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&h=500&fit=crop', caption: 'O começo de tudo' },
      { src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=500&fit=crop', caption: 'Nossa primeira vez' },
      { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=500&fit=crop', caption: 'Te encontrei' },
      { src: 'https://images.unsplash.com/photo-1501901609772-df0848060b33?w=400&h=500&fit=crop', caption: 'Momentos assim' },
      { src: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=500&fit=crop', caption: 'Sempre juntos' },
    ],
  },
  'mothers-day': {
    names: 'Gabriel & Dona Maria',
    start_date: '1998-05-10',
    letter_text: `Tem coisas que a gente demora a colocar em palavras —
não porque não sente, mas porque sente demais.
Você foi o primeiro colo,
a primeira voz,
e até hoje é em você que eu penso
quando o mundo aperta.
Obrigado(a) por cada bronca que era cuidado,
por cada dia que você escolheu estar.
Tudo o que tem de bom em mim
passou pelas suas mãos antes.
Eu te amo, mãe.`,
    music_url: 'https://www.youtube.com/watch?v=VUkt0mrkR5s',
    photos: [
      { src: 'https://kkeuneyvixnmpxkyxaaj.supabase.co/storage/v1/object/public/photos/4564b0b3-cb8f-4394-acef-bbd8864cab51/1777591201695-0.jpg', caption: 'Seu sorriso me alegra' },
      { src: 'https://kkeuneyvixnmpxkyxaaj.supabase.co/storage/v1/object/public/photos/4564b0b3-cb8f-4394-acef-bbd8864cab51/1777591201734-1.jpg', caption: 'Meu primeiro lar' },
      { src: 'https://kkeuneyvixnmpxkyxaaj.supabase.co/storage/v1/object/public/photos/4564b0b3-cb8f-4394-acef-bbd8864cab51/1777591201786-2.jpg', caption: 'Você me ensinou isso' },
      { src: 'https://kkeuneyvixnmpxkyxaaj.supabase.co/storage/v1/object/public/photos/4564b0b3-cb8f-4394-acef-bbd8864cab51/1777591201760-3.jpg', caption: 'Sempre vou lembrar' },
      { src: 'https://kkeuneyvixnmpxkyxaaj.supabase.co/storage/v1/object/public/photos/4564b0b3-cb8f-4394-acef-bbd8864cab51/1777591201771-4.jpg', caption: 'Minha pessoa favorita' },
    ],
  },
}

export function useGiftData(slug) {
  const edition = useEdition()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Em desenvolvimento sem slug, usa dados de exemplo
    if (!slug || slug === 'dev') {
      setData(DEV_DATA[edition.id] ?? DEV_DATA.valentines)
      setLoading(false)
      return
    }

    async function fetchGift() {
      if (!supabase) {
        setError('Supabase não configurado. Preencha o .env com as credenciais.')
        setLoading(false)
        return
      }
      try {
        const { data: gift, error: fetchError } = await supabase
          .from('gifts')
          .select('*')
          .eq('slug', slug)
          .eq('edition', edition.id)
          .single()

        if (fetchError) throw fetchError
        if (!gift) throw new Error('Presente não encontrado')

        setData(gift)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGift()
  }, [slug, edition.id])

  return { data, loading, error }
}
