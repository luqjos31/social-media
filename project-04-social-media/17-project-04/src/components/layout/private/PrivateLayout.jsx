import React from "react"
import Header from "./Header"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

export default function PrivateLayout(props) {
  return (
    <>
      {/* LAYOUT */}

      {/* Header */}

      <Header />

      {/* Principal content*/}
      <section className="layout__content">
        <Outlet />
      </section >

      {/*Lateral Bar*/}
      <Sidebar />

    </>
  )
}
