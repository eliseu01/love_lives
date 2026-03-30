import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GiftPage from './pages/GiftPage'
import LoginPage from './pages/LoginPage'
import EditorPage from './pages/EditorPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas (já existentes) */}
        <Route path="/p/:slug" element={<GiftPage />} />
        <Route path="/dev" element={<Navigate to="/p/dev" replace />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas protegidas */}
        <Route path="/meus-presentes" element={
          <ProtectedRoute><DashboardPage /></ProtectedRoute>
        } />
        <Route path="/criar" element={
          <ProtectedRoute><EditorPage /></ProtectedRoute>
        } />
        <Route path="/editar/:slug" element={
          <ProtectedRoute><EditorPage /></ProtectedRoute>
        } />

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
