import { LoginPage } from "./auth/LoginPage.jsx"
import { AuthProvider } from "./auth/AuthProvider.jsx"


function App() {
  return (
    <AuthProvider>
      <LoginPage/>
    </AuthProvider>
  )
}

export default App
