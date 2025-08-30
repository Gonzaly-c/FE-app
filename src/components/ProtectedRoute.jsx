import { Outlet, Navigate, useLocation } from 'react-router-dom'
// import { api } from "../services/api.js";
import { useAuthQuery } from '../hooks/useAuthQuery.js'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'

export function ProtectedRoute ({ allowedRoles }) {
  const location = useLocation() // Para que cada vez que cambie el path actual hija se vuela a renderizar y asi poder autentificar de nuevo el token
  const { data, isLoading, isError } = useAuthQuery(location)
  const { logout, setUser } = useContext(AuthContext)

  useEffect(() => {
    const verificarAuth = async () => {
      if (isError /* || !allowedRoles.includes(data.role) */) {
        await logout()
        setUser(null)
      }
    }
    
    verificarAuth()

  }, [isError])

  if(isLoading) return <h1>Cargando...</h1>
  if(isError || !allowedRoles.includes(data.role)) {
    if(isError) return <Navigate to='/'/>

    if(data.role === 'admin') return <Navigate to='/admin/dashboard'/>
    
    if(data.role === 'conductor') return <Navigate to='/conductor/dashboard'/>
    
  }

  return <Outlet />
}
