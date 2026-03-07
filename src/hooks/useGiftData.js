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
    { src: null, caption: 'O começo de tudo' },
    { src: null, caption: 'Nossa primeira vez' },
    { src: null, caption: 'Te encontrei' },
    { src: null, caption: 'Momentos assim' },
    { src: null, caption: 'Sempre juntos' },
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
