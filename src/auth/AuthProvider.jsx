import { AuthContext } from "../context/AuthContext.jsx"
import { useState } from "react"
import { loginService, logoutService, getToken } from "./authService.js"
import { useEffect } from "react"


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const token = getToken()
    if (token) {
      // Aquí podrías hacer una llamada a la API para obtener los datos del usuario
      // usando el token, pero por simplicidad, solo lo guardamos en el estado.
      //setUser({ token }) // Simulando un usuario con el token
    }
  }, [] )

    const login = async (email, password) => {
      try {
        const userToSet = await loginService(email, password)
        return userToSet
      } catch (error) {
        console.error("Error during login:", error)
        throw error
      }}
    
    const logout = () => {
      logoutService()
      setUser(null)
    }

  return(
    

    <AuthContext.Provider value={{login, logout, user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}