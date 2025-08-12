import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../services/api.js";

export function ProtectedRoute({ allowedRoles }){
  const [auth, setAuth] = useState({isAuth: false, role: null, isLoading: true});

  useEffect(() => {
    api.get('/auth/check', { withCredentials: true })
      .then((res) => {setAuth({isAuth: true, role: res.data.userData.role, isLoading: false})})
      .catch((error) => {
        console.error("Error al verificar la autenticación:", error.response ? error.response.data : error.message);
        setAuth({isAuth: false, role: null, isLoading: false});
      });

  }, [])

  if(auth.isLoading) return <h1>Cargando...</h1>
  if(!auth.isAuth) return <Navigate to='/' />
  if(!allowedRoles.includes(auth.role)) return <Navigate to='/' />
  
  return <Outlet />
}