import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { EditionProvider } from './contexts/EditionContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EditionProvider>
      <App />
    </EditionProvider>
  </StrictMode>,
)
