import { LoginPage } from "./auth/LoginPage.jsx"
import { AuthProvider } from "./auth/AuthProvider.jsx"
import { BrowserRouter, Router, Routes, Route } from "react-router-dom"
import { RegisterPage } from "./pages/RegisterPage.jsx"
import { EnConstruccion } from "./pages/EnConstruccion.jsx"
import { ProtectedRoute } from "./components/ProtectedRoute.jsx"



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        
        <Routes>
          <Route path='/pagina-en-construccion' element={ <EnConstruccion/> }> </Route>
          
          <Route element={<ProtectedRoute allowedRoles={'admin'}/>}>
            <Route path='/admin/dashboard' element={<h1>Admin Home</h1>}></Route>
          </Route>
          
          <Route path='/conductor/dashboard' element={<h1>Conductor Home</h1>}></Route>
          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
