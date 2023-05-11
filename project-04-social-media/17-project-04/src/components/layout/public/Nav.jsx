import React from "react"
import avatar from "../../../assets/img/user.png"
import { NavLink } from "react-router-dom"

function Nav(props) {
  return (
    <nav className="navbar__container-lists">
      <ul className="container-lists__menu-list"> <li className="menu-list__item">
        <NavLink to="/login" className="menu-list__link">
          <i className="fa-solid fa-user"></i> <span className="menu-list__title">Login</span>
        </NavLink>
      </li>

        <li className="menu-list__item">
          <NavLink to="/register" className="menu-list__link">
            <i className="fa-solid fa-users"></i>
            <span className="menu-list__title">Register</span>
          </NavLink>
        </li>

      </ul>

    </nav>
  )
}
export default Nav
