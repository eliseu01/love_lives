import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGiftData } from '../hooks/useGiftData'

import LoadingSection from '../components/LoadingSection'
import LetterSection from '../components/LetterSection'
import GallerySection from '../components/GallerySection'
import CounterSection from '../components/CounterSection'
import FinalSection from '../components/FinalSection'
import FloatingPlayer from '../components/FloatingPlayer'

export default function GiftPage() {
  const { slug } = useParams()
  const { data, loading, error } = useGiftData(slug)

  const [appLoading, setAppLoading] = useState(true)   // controla a tela de loading
  const [musicStarted, setMusicStarted] = useState(false)

  // Tela de loading (animação inicial)
  // onDone é chamado quando o AnimatePresence termina o fade-out
  if (appLoading) {
    return <LoadingSection onDone={() => setAppLoading(false)} />
  }

  // Dados ainda buscando do Supabase após o loading visual
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: '#FFF8F5' }}>
        <p style={{ fontFamily: 'Playfair Display, serif', color: '#C2185B', fontStyle: 'italic' }}>
          carregando...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-8"
        style={{ background: '#FFF8F5' }}>
        <span style={{ fontSize: 48 }}>💔</span>
        <p style={{ fontFamily: 'Playfair Display, serif', color: '#C2185B', fontSize: 20, textAlign: 'center' }}>
          Este presente não foi encontrado.
        </p>
        <p style={{ fontFamily: 'Lato, sans-serif', color: '#F48FB1', fontSize: 14, textAlign: 'center' }}>
          O link pode ter expirado ou estar incorreto.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Player flutuante — some na seção final */}
      <FloatingPlayer
        musicTitle={data.music_title}
        musicArtist={data.music_artist}
        visible={musicStarted}
      />

      {/* Seções em scroll contínuo */}
      <LetterSection
        letterText={data.letter_text}
        onMusicStart={() => setMusicStarted(true)}
      />

      <GallerySection photos={data.photos} />

      <CounterSection names={data.names} startDate={data.start_date} />

      <FinalSection
        names={data.names}
        musicTitle={data.music_title}
        musicArtist={data.music_artist}
      />
    </>
  )
}
