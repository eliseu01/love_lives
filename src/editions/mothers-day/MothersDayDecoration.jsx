export default function MothersDayDecoration() {
  return (
    <svg
      viewBox="0 0 140 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: '14px',
        right: '14px',
        width: '90px',
        height: '64px',
        opacity: 0.7,
        mixBlendMode: 'multiply',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      {/* Flor 1 — maior, à esquerda, levemente rotacionada */}
      <g transform="translate(50 55) rotate(-10)">
        <ellipse cx="0" cy="-20" rx="10" ry="16" fill="#b8395f" />
        <ellipse cx="0" cy="-20" rx="10" ry="16" fill="#b8395f" transform="rotate(72)" />
        <ellipse cx="0" cy="-20" rx="10" ry="16" fill="#b8395f" transform="rotate(144)" />
        <ellipse cx="0" cy="-20" rx="10" ry="16" fill="#b8395f" transform="rotate(216)" />
        <ellipse cx="0" cy="-20" rx="10" ry="16" fill="#b8395f" transform="rotate(288)" />
        <circle cx="0" cy="0" r="9" fill="#7a2342" />
        <circle cx="-2.5" cy="-2.5" r="1.8" fill="#d4537a" />
        <circle cx="3" cy="1" r="1.3" fill="#d4537a" />
      </g>

      {/* Flor 2 — menor, à direita, sobreposta acima */}
      <g transform="translate(105 38) rotate(18)">
        <ellipse cx="0" cy="-13" rx="6.5" ry="10.5" fill="#a83257" />
        <ellipse cx="0" cy="-13" rx="6.5" ry="10.5" fill="#a83257" transform="rotate(72)" />
        <ellipse cx="0" cy="-13" rx="6.5" ry="10.5" fill="#a83257" transform="rotate(144)" />
        <ellipse cx="0" cy="-13" rx="6.5" ry="10.5" fill="#a83257" transform="rotate(216)" />
        <ellipse cx="0" cy="-13" rx="6.5" ry="10.5" fill="#a83257" transform="rotate(288)" />
        <circle cx="0" cy="0" r="6" fill="#6b1f3a" />
      </g>
    </svg>
  )
}
