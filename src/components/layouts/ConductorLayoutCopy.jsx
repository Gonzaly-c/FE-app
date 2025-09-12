import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {
  const [isGestionOpen, setIsGestionOpen] = useState(false);
  console.log(isGestionOpen)
  
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="d-flex flex-column col-5 col-md-3 col-lg-2 bg-dark text-white p-3 vh-100">
        <h2 className="mb-4 text-center">RailTracker</h2>
        <ul className="nav flex-column flex-grow-1">
          <li className="nav-item mb-4">
            <Link className="nav-link text-white h4" to="/admin">
              📊 Panel de control
            </Link>
          </li>

          {/* Gestión con estado */}
          <li className="nav-item text-start ">
            <a
              className="nav-link text-white h4 "
              onClick={() => setIsGestionOpen(!isGestionOpen)}
              role="button"
            >
              📁 Gestión {isGestionOpen ? "▲" : "▼"}
            </a>
            {isGestionOpen && (
              <ul className="list-unstyled ml-3 w-100">
                <li>
                  <Link className="nav-link text-white h5" to="/admin/trenes">
                    🚂 Trenes
                  </Link>
                </li>
                <li>
                  <Link className="nav-link text-white h5" to="/admin/recorridos">
                    🗺️ Recorridos
                  </Link>
                </li>
                <li>
                  <Link className="nav-link text-white h5" to="/admin/conductores">
                    👨‍✈️ Conductores
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider bg-white" />
                </li>
                <li>
                  <Link className="nav-link text-white h5" to="/admin/extra">
                    🔗 Separated link
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
            <button className="btn btn-outline-danger w-100" type="button">
              Cerrar sesión
            </button>
        </div>
      </div>

      

      {/* Contenido principal */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}