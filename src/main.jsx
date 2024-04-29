import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Stats } from '@react-three/drei'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Stats />
  </React.StrictMode>,
)
