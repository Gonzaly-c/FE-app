import { Outlet, Navigate, useLocation } from "react-router-dom";
//import { api } from "../services/api.js";
import { useAuthQuery } from "../hooks/useAuthQuery.js";

export function ProtectedRoute({ allowedRoles }){
  // MIGRACION A REACT QUERY
  // const [auth, setAuth] = useState({isAuth: false, role: null, isLoading: true});
  const location = useLocation() // Para que cada vez que cambie el path actual hija se vuela a renderizar y asi poder autentificar de nuevo el token

  const { data: userData, isLoading, isError } = useAuthQuery(location) // React Query

  // useEffect(() => {
  //   api.get('/auth/check', { withCredentials: true })
  //     .then((res) => {setAuth({isAuth: true, role: res.data.userData.role, isLoading: false})})
  //     .catch((error) => {
  //       console.error("Error al verificar la autenticación:", error.response ? error.response.data : error.message);
  //       setAuth({isAuth: false, role: null, isLoading: false});
  //     });

  // })

  if(isLoading) return <h1>Cargando...</h1> // React Query
  if(isError || !allowedRoles.includes(userData.role)) return <Navigate to='/'/> // React Query

  // if(auth.isLoading) return <h1>Cargando...</h1>
  // if(!auth.isAuth) return <Navigate to='/' />
  // if(!allowedRoles.includes(auth.role)) return <Navigate to='/' />
  
  return <Outlet />
}