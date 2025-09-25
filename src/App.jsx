import { LoginPage } from './auth/LoginPage.jsx'
import { AuthProvider } from './auth/AuthProvider.jsx'
import { BrowserRouter, Router, Routes, Route, Link } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { EnConstruccion } from './pages/EnConstruccion.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Page404 from './pages/404.jsx'
// import ConductoresPage from './pages/conductoresAdmin.jsx'
// import { ConductorCrud } from './pages/ConductorCrud.jsx'
import { TrenCrud } from './pages/TrenCrud.jsx'
import { RecorridoCrud } from './pages/RecorridoCrud.jsx'
import { CargaCrud } from './pages/CargaCrud.jsx'
// import { TestCrud } from './pages/test.jsx'
import { ConductorCrud } from './pages/ConductorCrud.jsx'
import { TipoCargaCrud } from './pages/TipoCargaCrud.jsx'

function App () {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>

          <Routes>
            {/* Pagina en construccion */}
            <Route path='/pagina-en-construccion' element={<EnConstruccion />}> </Route>

            {/* Administrador */}
            <Route path='/admin' element={<ProtectedRoute allowedRoles='admin'> </ProtectedRoute>}>
              <Route
                path='dashboard'
                element={<Link to='/admin/CRUD-Recorrido'>Ir a CRUD Recorrido</Link>}
              />

              <Route
                path='tipoCargas'
                element={<TipoCargaCrud />}
              />

              <Route
                path='recorridos'
                element={<RecorridoCrud />}
              />

              <Route
                path='cargas'
                element={<CargaCrud />}
              />

              <Route
                path='conductores'
                element={<ConductorCrud />}
              />

              <Route
                path='trenes'
                element={<TrenCrud />}
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
