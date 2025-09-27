import { LoginPage } from './auth/LoginPage.jsx'
import { AuthProvider } from './auth/AuthProvider.jsx'
import { BrowserRouter, Router, Routes, Route, Link } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { EnConstruccion } from './pages/EnConstruccion.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Page404 from './pages/404.jsx'
import { TrenCrud } from './pages/TrenCrud.jsx'
import { RecorridoCrud } from './pages/RecorridoCrud.jsx'
import { CargaCrud } from './pages/CargaCrud.jsx'
import { ConductorCrud } from './pages/ConductorCrud.jsx'
import { TipoCargaCrud } from './pages/TipoCargaCrud.jsx'
import { LicenciaCrud } from './pages/LicenciaCrud.jsx'
import { CategoriaDenunciaCrud } from './pages/CategoriaDenunciaCrud.jsx'
import { EnConstruccionCopy } from './pages/EnConstruccion copy.jsx'

function App () {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>

          <Routes>
            {/* Pagina en construccion */}
            <Route path='/pagina-en-construccion' 
            element={<EnConstruccion />}> 
            </Route>

            {/* Administrador */}
            <Route path='/admin' element={<ProtectedRoute allowedRoles='admin' > </ProtectedRoute>}>
              <Route
                path='dashboard'
                element={<EnConstruccionCopy/>}
              />

              <Route
                path='tipoCargas'
                element={<TipoCargaCrud />}
              />

              <Route
                path='categoriaDenuncias'
                element={<CategoriaDenunciaCrud />}
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
                path='observaciones'
                element={<EnConstruccionCopy/>}
              />

              <Route
                path='viajes'
                element={<EnConstruccionCopy/>}
              />

              <Route
                path='perfil'
                element={<EnConstruccionCopy/>}
              />

              <Route
                path='licencias'
                element={<LicenciaCrud />}
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
                element={<EnConstruccionCopy/>}
              />

              <Route
                path='pendientes'
                element={<EnConstruccionCopy/>}
              />

              <Route
                path='enCursos'
                element={<EnConstruccionCopy/>}
              />

              <Route
                path='finalizados'
                element={<EnConstruccionCopy/>}
              />

              <Route
                path='perfil'
                element={<EnConstruccionCopy/>}
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
