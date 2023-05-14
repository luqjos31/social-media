import React, { useContext } from "react"
import AuthContext from "../context/AuthProvider"
export default function useAuth(props) {
  return useContext(AuthContext)
}
