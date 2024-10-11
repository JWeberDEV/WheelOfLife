import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WhellOfLife from './WhellOfLife.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WhellOfLife />
  </StrictMode>,
)
