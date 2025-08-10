import { LoginPage } from "./auth/LoginPage.jsx"
import { AuthProvider } from "./auth/AuthProvider.jsx"
import { BrowserRouter, Router, Routes, Route } from "react-router-dom"
import { RegisterPage } from "./pages/RegisterPage.jsx"



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        
        <Routes>
          
          <Route path='/admin/dashboard' element={<h1>Admin Home</h1>}></Route>
          <Route path='/conductor/dashboard' element={<h1>Conductor Home</h1>}></Route>

          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
