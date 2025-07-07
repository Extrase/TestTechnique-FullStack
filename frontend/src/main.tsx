import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render( // "!" assure TypeScript que l'élément 'root' existe dans le DOM
  <React.StrictMode> {/* mode strict pour détecter les problèmes en développement */}
    <App /> {/* composant racine de l'app */}
  </React.StrictMode>,
)