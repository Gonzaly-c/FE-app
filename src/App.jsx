import { LoginPage } from "./auth/LoginPage.jsx"
import { AuthProvider } from "./auth/AuthProvider.jsx"
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom"
import { RegisterPage } from "./pages/RegisterPage.jsx"
import { EnConstruccion } from "./pages/EnConstruccion.jsx"
import { ProtectedRoute } from "./components/ProtectedRoute.jsx"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

function App() {
  return (
    <>
      <BrowserRouter>
        
        <AuthProvider>
          
          <Routes>
            <Route path='/pagina-en-construccion' element={ <EnConstruccion/> }> </Route>
            
            <Route path= '/admin' element={<ProtectedRoute allowedRoles={'admin'}/>}>
              <Route path='dashboard' element={<Link to="/admin/CRUD-Recorrido">Ir a CRUD Recorrido</Link>}></Route>
              <Route path='CRUD-Recorrido' element={<Link to="/admin/dashboard">Volver</Link>}></Route>
            </Route>
            
            <Route path='/conductor/dashboard' element={<h1>Conductor Home</h1>}></Route>
            <Route path='/' element={<LoginPage/>}></Route>
            <Route path='/register' element={<RegisterPage/>}></Route>
          </Routes>

        </AuthProvider>

      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </>
  )
}

export default App
