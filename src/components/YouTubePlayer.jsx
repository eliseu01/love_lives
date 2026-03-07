import { useEffect, useState } from 'react'

// Extrai o video ID de qualquer formato de URL do YouTube:
// youtube.com/watch?v=ID  |  youtu.be/ID  |  music.youtube.com/watch?v=ID
function extractVideoId(url) {
  if (!url) return null
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

// Singleton — carrega o script da API do YouTube uma única vez
let ytApiReady = false
const readyCallbacks = []

function loadYouTubeApi() {
  return new Promise((resolve) => {
    if (ytApiReady) return resolve()
    readyCallbacks.push(resolve)
    if (!document.getElementById('yt-iframe-api')) {
      window.onYouTubeIframeAPIReady = () => {
        ytApiReady = true
        readyCallbacks.forEach((r) => r())
        readyCallbacks.length = 0
      }
      const script = document.createElement('script')
      script.id = 'yt-iframe-api'
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    }
  })
}

// onPlayerReady(player): chamado quando o player estiver pronto para receber comandos
// onPlaybackUpdate(isPlaying): chamado a cada mudança de estado
export default function YouTubePlayer({ musicUrl, onPlayerReady, onPlaybackUpdate }) {
  // ID único por instância para o YT.Player encontrar o elemento no DOM
  const [playerId] = useState(() => `yt-${Math.random().toString(36).slice(2, 8)}`)

  useEffect(() => {
    const videoId = extractVideoId(musicUrl)
    if (!videoId) return

    loadYouTubeApi().then(() => {
      new window.YT.Player(playerId, {
        videoId,
        playerVars: {
          autoplay: 0,      // não toca automaticamente — aguarda clique no envelope
          controls: 0,      // sem controles visíveis
          loop: 1,          // loop ativado
          playlist: videoId, // obrigatório para o loop funcionar
          rel: 0,           // sem vídeos relacionados no fim
          modestbranding: 1,
          iv_load_policy: 3, // sem anotações
        },
        events: {
          onReady: (e) => onPlayerReady?.(e.target),
          onStateChange: (e) => {
            const { PLAYING, ENDED } = window.YT.PlayerState
            onPlaybackUpdate?.(e.data === PLAYING)
            // Fallback de loop: se terminar, reinicia
            if (e.data === ENDED) e.target.playVideo()
          },
        },
      })
    })
  }, [musicUrl, playerId])

  return (
    // Escondido visualmente, presente no DOM para a API funcionar
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: -9999,
        left: -9999,
        width: 1,
        height: 1,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -9999,
      }}
    >
      <div id={playerId} />
    </div>
  )
}
