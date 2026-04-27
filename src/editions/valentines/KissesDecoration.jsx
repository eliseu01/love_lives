import { useId } from 'react'

function LipsSVG({ id, rotation, top, right }) {
  return (
    <svg
      width="72" height="42"
      viewBox="0 0 110 55"
      style={{
        position: 'absolute', top, right,
        transform: `rotate(${rotation}deg)`,
        filter: 'blur(0.3px)',
        mixBlendMode: 'multiply',
        opacity: 0.78,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <defs>
        <clipPath id={id}>
          <path d="M 8,28 C 8,10 25,3 42,9 C 47,11 50,15 55,13 C 60,15 63,11 68,9 C 85,3 102,10 102,28 C 90,20 72,17 55,19 C 38,17 20,20 8,28 Z" />
          <path d="M 8,28 C 20,46 38,52 55,50 C 72,52 90,46 102,28 C 90,35 72,39 55,39 C 38,39 20,35 8,28 Z" />
        </clipPath>
      </defs>
      <path d="M 8,28 C 8,10 25,3 42,9 C 47,11 50,15 55,13 C 60,15 63,11 68,9 C 85,3 102,10 102,28 C 90,20 72,17 55,19 C 38,17 20,20 8,28 Z" fill="#8b1a1a" opacity="0.85" />
      <path d="M 8,28 C 20,46 38,52 55,50 C 72,52 90,46 102,28 C 90,35 72,39 55,39 C 38,39 20,35 8,28 Z"                                 fill="#8b1a1a" opacity="0.85" />
      <g clipPath={`url(#${id})`}>
        <text x="10" y="18" style={{ fontFamily: 'Georgia, serif', fontSize: '4.5px', fill: '#2a1a1a' }}>amor que atravessa o tempo</text>
        <text x="8"  y="24" style={{ fontFamily: 'Georgia, serif', fontSize: '4px',   fill: '#2a1a1a' }}>e nas páginas da vida</text>
        <text x="12" y="30" style={{ fontFamily: 'Georgia, serif', fontSize: '4.5px', fill: '#2a1a1a' }}>encontra seu lar</text>
        <text x="10" y="36" style={{ fontFamily: 'Georgia, serif', fontSize: '4px',   fill: '#2a1a1a' }}>coração que não esquece</text>
        <text x="14" y="42" style={{ fontFamily: 'Georgia, serif', fontSize: '4.5px', fill: '#2a1a1a' }}>te amo</text>
      </g>
    </svg>
  )
}

export default function KissesDecoration() {
  const id1 = useId()
  const id2 = useId()
  return (
    <>
      <LipsSVG id={`lips-a-${id1}`} rotation={-10} top={14} right={10} />
      <LipsSVG id={`lips-b-${id2}`} rotation={5}   top={24} right={18} />
    </>
  )
}
