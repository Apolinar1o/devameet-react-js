import React from 'react'
import ReactDOM from 'react-dom/client'
import "./assets/style/global.scss"
import {RouterProvider} from "react-router-dom"
import { App } from './App'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App/>
 </React.StrictMode>,
)
