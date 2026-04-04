import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GiftPage from './pages/GiftPage'
import LoginPage from './pages/LoginPage'
import EditorPage from './pages/EditorPage'
import DashboardPage from './pages/DashboardPage'
import LandingPage from './pages/LandingPage'
import PaymentResultPage from './pages/PaymentResultPage'
import ProtectedRoute from './components/ProtectedRoute'
import { Analytics } from "@vercel/analytics/next"

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

        {/* Retorno do pagamento */}
        <Route path="/pagamento/sucesso" element={<PaymentResultPage status="success" />} />
        <Route path="/pagamento/erro" element={<PaymentResultPage status="failure" />} />
        <Route path="/pagamento/pendente" element={<PaymentResultPage status="pending" />} />

        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
