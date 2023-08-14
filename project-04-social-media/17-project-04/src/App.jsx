import { useState } from 'react'
import viteLogo from '/vite.svg'
// import './App.css'
import "./assets/fonts/fontawesome-free-6.1.2-web/css/all.css"
import "./assets/css/normalize.css"
import "./assets/css/styles.css"
import "./assets/css/responsive.css"
import Routing from './router/Routing'

function App() {

  return (
    <div className="layout">
      <Routing />
    </div>
  )

}

export default App