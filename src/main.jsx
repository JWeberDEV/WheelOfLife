import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PolarAreaChart from './PolarAreaChart.jsx'
import Content from './Content.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Content />
  </StrictMode>,
)
