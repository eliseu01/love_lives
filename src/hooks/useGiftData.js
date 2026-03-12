import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// Dados de exemplo para desenvolvimento local (antes de conectar ao Supabase)
const DEV_DATA = {
  names: 'Luciano & Karlla',
  start_date: '2016-06-27',
  letter_text: `Desde o primeiro dia, soube que você era especial.
Cada momento ao seu lado é uma lembrança que guardo com carinho.
Obrigado por cada sorriso, cada abraço, cada aventura.
Te amo hoje e sempre.`,
  music_url: 'https://www.youtube.com/watch?v=VUkt0mrkR5s',
  photos: [
    { src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=500&fit=crop', caption: 'O começo de tudo' },
    { src: 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=400&h=500&fit=crop', caption: 'Nossa primeira vez' },
    { src: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&h=500&fit=crop', caption: 'Te encontrei' },
    { src: 'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=400&h=500&fit=crop', caption: 'Momentos assim' },
    { src: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=400&h=500&fit=crop', caption: 'Sempre juntos' },
  ],
}

export function useGiftData(slug) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Em desenvolvimento sem slug, usa dados de exemplo
    if (!slug || slug === 'dev') {
      setData(DEV_DATA)
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
  }, [slug])

  return { data, loading, error }
}
