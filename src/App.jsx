import { LoginPage } from './auth/LoginPage.jsx'
import { AuthProvider } from './auth/AuthProvider.jsx'
import { BrowserRouter, Router, Routes, Route, Link } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { EnConstruccion } from './pages/EnConstruccion.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Page404 from './pages/404.jsx'

function App () {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>

          <Routes>
            {/* Pagina en construccion */}
            <Route path='/pagina-en-construccion' element={<EnConstruccion />}> </Route>

            {/* Administrador */}
            <Route path='/admin' element={<ProtectedRoute allowedRoles='admin' />}>
              <Route
                path='dashboard'
                element={<Link to='/admin/CRUD-Recorrido'>Ir a CRUD Recorrido</Link>}
              />

              <Route
                path='CRUD-Recorrido'
                element={<Link to='/admin/dashboard'>Volver a HOME</Link>}
              />

              {/* 404 protegido para /admin/... */}
              <Route
                path='*'
                element={<Page404 role='admin' />}
              />
            </Route>

            {/* Conductor */}
            <Route
              path='/conductor'
              element={<ProtectedRoute
                allowedRoles='conductor'
                       />}
            >

              <Route
                path='dashboard'
                element={<Link to='/conductor/misViajes'>Ir a mis viajes</Link>}
              />

              <Route
                path='misViajes'
                element={<Link to='/conductor/dashboard'>Volver a HOME</Link>}
              />

              {/* 404 protegido para /conductor/... */}
              <Route
                path='*'
                element={<Page404 role='conductor' />}
              />
            </Route>

            {/* Inicio y registro */}
            <Route
              path='/'
              element={<LoginPage />}
            />

            <Route
              path='/register'
              element={<RegisterPage />}
            />

            {/* 404 global */}
            <Route
              path='*'
              element={<Page404 role='global' />}
            />

          </Routes>
        </AuthProvider>

      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default App
