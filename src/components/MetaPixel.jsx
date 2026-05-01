import { useEffect } from 'react'

const PIXEL_ID = '1230100795673155'

export default function MetaPixel() {
  const edition = import.meta.env.VITE_EDITION

  useEffect(() => {
    if (edition !== 'valentines') return
    if (window.fbq) return

    ;(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = []
      t = b.createElement(e); t.async = true; t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

    window.fbq('init', PIXEL_ID)
    window.fbq('track', 'PageView')
  }, [])

  if (edition !== 'valentines') return null

  return (
    <noscript>
      <img
        height="1" width="1" style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  )
}
