import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/Auth/AuthContext.tsx'
import App from './App.tsx'
import "./index.css"
import { I18nProvider } from './context/AppContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <AuthProvider>
          <App />
      </AuthProvider>
    </I18nProvider>
  </StrictMode>,
)
