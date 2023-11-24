import React from 'react'
import ReactDOM from 'react-dom/client'
import "./assets/style/global.scss"
import { Login } from './views/Login.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Login />
 </React.StrictMode>,
)
