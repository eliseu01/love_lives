import { useState, useEffect } from 'react'

// YouTube oEmbed — gratuito, sem API key, retorna título e canal do vídeo
// Docs: https://oembed.com / https://developers.google.com/youtube/oembed
export function useYouTubeMetadata(musicUrl) {
  const [metadata, setMetadata] = useState({ title: null, artist: null })

  useEffect(() => {
    if (!musicUrl) return

    const oEmbedUrl =
      `https://www.youtube.com/oembed?url=${encodeURIComponent(musicUrl)}&format=json`

    fetch(oEmbedUrl)
      .then((res) => res.json())
      .then((data) => {
        setMetadata({
          title: data.title,        // ex: "august (Official Lyric Video)"
          artist: data.author_name, // ex: "Taylor Swift"
        })
      })
      .catch(() => {}) // falha silenciosa — FloatingPlayer e FinalSection ficam sem texto
  }, [musicUrl])

  return metadata
}
