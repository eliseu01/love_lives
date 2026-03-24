import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GiftPage from './pages/GiftPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota principal: /p/:slug */}
        <Route path="/p/:slug" element={<GiftPage />} />

        {/* Rota de dev: /dev carrega dados de exemplo */}
        <Route path="/dev" element={<Navigate to="/p/dev" replace />} />

        {/* Rota raiz: placeholder */}
        <Route
          path="/"
          element={
            <div
              style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFF8F5',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#C2185B',
                fontSize: 20,
                fontStyle: 'italic',
              }}
            >
              LoveStory ♥
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
