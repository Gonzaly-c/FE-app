import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const [isGestionOpen, setIsGestionOpen] = useState(false);
  const { logout, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    setUser(null)
    navigate('/')
  }
   
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="d-flex flex-column col-5 col-md-3 col-lg-2 bg-dark text-white p-3 vh-100">
        <h1 className="mb-4 text-center">RailTracker</h1>
        <ul className="nav flex-column flex-grow-1">
          <li className="nav-item mb-4 h4">
            <Link className="nav-link text-white" to="/admin">
              📊 Panel de control
            </Link>
          </li>

          {/* Gestión con estado */}
          <li className="nav-item text-start h4">
            <a
              className="nav-link text-white"
              onClick={() => setIsGestionOpen(!isGestionOpen)}
              role="button"
            >
              📁 Gestión {isGestionOpen ? "▲" : "▼"}
            </a>
            {isGestionOpen && (
              <ul className="list-unstyled ms-3 w-100 h5">
                <li className="">
                  <Link className="nav-link text-white mt-2" to="/admin/trenes">
                    🚂 Trenes
                  </Link>
                </li>
                <li>
                  <Link className="nav-link text-white mt-2" to="/admin/recorridos">
                    🗺️ Recorridos
                  </Link>
                </li>
                <li>
                  <Link className="nav-link text-white mt-2" to="/admin/conductores">
                    👨‍✈️ Conductores
                  </Link>
                </li>
                
              </ul>
            )}
          </li>

          <li className="nav-item my-4 h4">
            <Link className="nav-link text-white" to="/admin/viajes">
              🚆 Viajes
            </Link>
          </li>
          <li className="nav-item mb-4 h4">
            <Link className="nav-link text-white" to="/admin/perfil">
              👤 Perfil
            </Link>
          </li>

        </ul>
        
        <div className="d-flex align-bottom mb-3">
            <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
              Cerrar sesión
            </button>
        </div>
      </div>

      

      {/* Contenido principal */}
      <div className="flex-grow-1 p-4  ">
        <Outlet />
      </div>
    </div>
  );
}