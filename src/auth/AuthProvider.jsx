import { AuthContext } from "../context/AuthContext.jsx"

export const AuthProvider = ({ children }) => {
  const authValue = '' //valor del contexto
  
  return(
    //Aca validaciones del login mediante useState y otras cosas

    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  )
}