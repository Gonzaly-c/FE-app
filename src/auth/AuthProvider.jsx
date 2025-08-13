import { AuthContext } from "../context/AuthContext.jsx"
import { useState } from "react"
import { useEffect } from "react"
import { useLoginMutation } from "../hooks/useLoginMutation.js"
import { useLogoutMutation } from "../hooks/useLogoutMutation.js"


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

    // const login = async (email, password) => {
    //   try {
    //     const userToSet = await loginService(email, password)
    //     return userToSet
    //   } catch (error) {
    //     console.error("Error during login:", error)
    //     throw error
    //   }}
    
  const { mutateAsync: login, isPending: isLoginPending, isError: isLoginError } = useLoginMutation() 

  const { mutateAsync: logout, isPending: isLogoutPending, isError: isLogoutError } = useLogoutMutation()

  // const logout = () => {
  //   logoutService()
  //   setUser(null)
  // }

  return(
    <AuthContext.Provider value={{user, setUser, login, logout, isLoginPending, isLoginError, isLogoutError, isLogoutPending}}> 
      {children}
    </AuthContext.Provider>
  )
}