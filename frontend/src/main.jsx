import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Utilities/fontawesome.js'
import App from './App.jsx'
import { AuthProvider } from "./Providers/AuthProvider";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)