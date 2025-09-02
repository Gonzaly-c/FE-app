import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {
  const [isGestionOpen, setIsGestionOpen] = useState(false);
  console.log(isGestionOpen)
  
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="col-5 col-md-3 col-lg-2 bg-info text-white p-3 vh-100">
        <h2 className="mb-4 text-center">RailTracker</h2>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin">
              📊 Panel de control
            </Link>
          </li>

          {/* Gestión con estado */}
          <li className="nav-item mb-2 text-start">
            <a
              className="nav-link text-white w-100 text-start "
              onClick={() => setIsGestionOpen(!isGestionOpen)}
              role="button"
            >
              📁 Gestión {isGestionOpen ? "▲" : "▼"}
            </a>
            {isGestionOpen && (
              <ul className="list-unstyled ml-3 w-100">
                <li>
                  <Link className="nav-link text-white" to="/admin/trenes">
                    🚂 Trenes
                  </Link>
                </li>
                <li>
                  <Link className="nav-link text-white " to="/admin/recorridos">
                    🗺️ Recorridos
                  </Link>
                </li>
                <li>
                  <Link className="nav-link text-white" to="/admin/conductores">
                    👨‍✈️ Conductores
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider bg-white" />
                </li>
                <li>
                  <Link className="nav-link text-white" to="/admin/extra">
                    🔗 Separated link
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin/viajes">
              🚆 Viajes
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin/perfil">
              👤 Perfil
            </Link>
          </li>
          <li className="nav-item mt-4">
            <button className="btn btn-outline-light w-100">Cerrar sesión</button>
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}