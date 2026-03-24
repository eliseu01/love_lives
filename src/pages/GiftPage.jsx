import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useGiftData } from '../hooks/useGiftData'
import { useYouTubeMetadata } from '../hooks/useYouTubeMetadata'

import LoadingSection from '../components/LoadingSection'
import LetterSection from '../components/LetterSection'
import GallerySection from '../components/GallerySection'
import CounterSection from '../components/CounterSection'
import FinalSection from '../components/FinalSection'
import FloatingPlayer from '../components/FloatingPlayer'
import YouTubePlayer from '../components/YouTubePlayer'

export default function GiftPage() {
  const { slug } = useParams()
  const { data, loading, error } = useGiftData(slug)

  const [appLoading, setAppLoading] = useState(true)
  const [musicStarted, setMusicStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const playerRef = useRef(null)
  const pendingPlayRef = useRef(false)

  // Busca título e artista direto do YouTube — sem mock, sem armazenar no banco
  const { title: musicTitle, artist: musicArtist } = useYouTubeMetadata(data?.music_url)

  function handlePlayerReady(player) {
    playerRef.current = player
    if (pendingPlayRef.current) {
      player.playVideo()
      pendingPlayRef.current = false
    }
  }

  function handleMusicStart() {
    setMusicStarted(true)
    if (playerRef.current) {
      playerRef.current.playVideo()
    } else {
      pendingPlayRef.current = true
    }
  }

  function handleTogglePlay() {
    const player = playerRef.current
    if (!player) return
    if (player.getPlayerState() === window.YT?.PlayerState?.PLAYING) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
  }

  if (appLoading) {
    return <LoadingSection onDone={() => setAppLoading(false)} />
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: '#FFF8F5' }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#C2185B', fontStyle: 'italic' }}>
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
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#C2185B', fontSize: 20, textAlign: 'center' }}>
          Este presente não foi encontrado.
        </p>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#F48FB1', fontSize: 14, textAlign: 'center' }}>
          O link pode ter expirado ou estar incorreto.
        </p>
      </div>
    )
  }

  return (
    <div style={{ paddingBottom: musicStarted ? 88 : 0 }}>
      <YouTubePlayer
        musicUrl={data.music_url}
        onPlayerReady={handlePlayerReady}
        onPlaybackUpdate={setIsPlaying}
      />

      <FloatingPlayer
        musicTitle={musicTitle}
        musicArtist={musicArtist}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        visible={musicStarted}
        coverSrc={data.photos?.[0]?.src}
      />

      <LetterSection
        letterText={data.letter_text}
        names={data.names}
        startDate={data.start_date}
        onMusicStart={handleMusicStart}
      />

      <GallerySection photos={data.photos} />

      <CounterSection names={data.names} startDate={data.start_date} />

      <FinalSection
        names={data.names}
        musicTitle={musicTitle}
        musicArtist={musicArtist}
        coverPhoto={data.photos?.[0]?.src}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
      />
    </div>
  )
}
