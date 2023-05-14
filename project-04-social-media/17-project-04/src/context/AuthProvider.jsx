import React, { useState, createContext, useEffect } from "react"
import { useForm } from "../hooks/useForm";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const { loginAuth, loading, auth, setAuth } = useForm()

  useEffect(() => {
    // effect code here
    authUser()
  }, []);

  const authUser = async () => {

    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (!token || !user) { return false }

    const userObj = JSON.parse(user)
    const userId = userObj.id
    loginAuth(userId, token)

  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}  >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;