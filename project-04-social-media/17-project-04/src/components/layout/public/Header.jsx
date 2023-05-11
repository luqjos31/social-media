import React from "react"
import Nav from "./Nav"

export default function Header(props) {
  return (

    <header className="layout__navbar">

      <div className="navbar__header">
        <a href="#" className="navbar__title">Social</a>
      </div>
      <Nav />

    </header>
  )
}
