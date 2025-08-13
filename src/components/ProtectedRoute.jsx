import { Outlet, Navigate, useLocation } from "react-router-dom";
//import { api } from "../services/api.js";
import { useAuthQuery } from "../hooks/useAuthQuery.js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useEffect } from "react";

export function ProtectedRoute({ allowedRoles }){
  // MIGRACION A REACT QUERY
  // const [auth, setAuth] = useState({isAuth: false, role: null, isLoading: true});
  const location = useLocation() // Para que cada vez que cambie el path actual hija se vuela a renderizar y asi poder autentificar de nuevo el token
  const { data, isLoading, isError } = useAuthQuery(location) // React Query
  const { logout, setUser } = useContext(AuthContext)
  console.log(isError)
  useEffect( () => {
    const verificarAuth = async () => {
    if (isError || !allowedRoles.includes(data.role)) {
      await logout()
      setUser(null)
      }
    }
      verificarAuth()
  }, [isError])
  
  if(isLoading) return <h1>Cargando...</h1> // React Query
  if(isError || !allowedRoles.includes(data.role)) {
    return <Navigate to='/'/>
  } // React Query

  return <Outlet />
}