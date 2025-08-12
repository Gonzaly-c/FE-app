import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../services/api.js";

export function ProtectedRoute({ allowedRoles }){
  const [auth, setIsAuth] = useState()

  useEffect(() => {
    try {
      const res = api.get('/auth/check', {withCredentials: true})
      setIsAuth({isAuth: true, role: res.data.useraData.role})
    } catch(error) {
      console.error("Error en la autentificacion: " + error)
      setIsAuth({isAuth: false, role: null})
    }

  }, [])

      
  if(!auth.isAuth) return <Navigate to='/' />
  if(!allowedRoles.includes(auth.role)) return <Navigate to='/' />
  
  return <Outlet />
}