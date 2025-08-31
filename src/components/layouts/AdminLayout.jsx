import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="col-5 col-md-3 col-lg-3 bg-dark text-white p-3 vh-100" >
        <h4 className="mb-4">RailTracker</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin">📊 Panel de control</Link>
          </li>
          <li className="nav-item mb-2 dropdown">
            <a className="nav-link text-white dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">📁 Gestión</a>
            <div class="dropdown-menu">
                <a class="dropdown-item" role="button">Trenes</a>
                <a class="dropdown-item" role="button">Recorridos</a>
                <a class="dropdown-item" role="button">Conductores</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" role="button">Separated link</a>
            </div>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin/viajes">🚆 Viajes</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin/perfil">👤 Perfil</Link>
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