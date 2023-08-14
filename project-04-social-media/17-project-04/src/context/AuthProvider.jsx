import React, { useState, createContext, useEffect } from "react"
import { useForm } from "../hooks/useForm";
import { useFeed } from "../hooks/useFeed";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const { loginAuth, auth, setAuth, dataCounters, counters, setCounters } = useFeed()

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
    dataCounters(userId, token)
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, counters, setCounters }}  >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;