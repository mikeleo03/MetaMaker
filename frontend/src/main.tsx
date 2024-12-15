import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TimerProvider } from './contexts/TimerContext.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TimerProvider>
      <App />
    </TimerProvider>
  </StrictMode>,
)
