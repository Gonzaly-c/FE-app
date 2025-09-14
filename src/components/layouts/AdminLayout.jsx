import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const [isGestionOpen, setIsGestionOpen] = useState(false);
  const sidebarLogic = {
    sidebarOpenClass:
      "d-flex flex-column justify-content-between bg-dark text-white h-100 p-3 position-fixed overflow-y-auto",
    sidebarClosed: "d-none",
    marginContent: { marginLeft: "300px" },
    marginContentClosed: { marginLeft: "20px" },
  };
  const [showSidebar, setShowSidebar] = useState(true);
  const { logout, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/");
  };

  return (
    <div className="d-flex">
      
      <div
        className={
          showSidebar
            ? sidebarLogic.sidebarOpenClass
            : sidebarLogic.sidebarClosed
        }
        style={{ width: "300px", minHeight: "100vh", overflowY: "auto", transition: "0.3s"}}
      >
       
        <div>
          <h1 className="mb-4 text-center">RailTracker</h1>
          <ul className="nav flex-column">
            <li className="nav-item mb-4 h4">
              <Link className="nav-link text-white" to="/admin">
                📊 Panel de control
              </Link>
            </li>

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
                  <li>
                    <Link
                      className="nav-link text-white mt-2"
                      to="/admin/trenes"
                    >
                      🚂 Trenes
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="nav-link text-white mt-2"
                      to="/admin/recorridos"
                    >
                      🗺️ Recorridos
                    </Link>
                  </li>
                  
                  <li>
                    <Link
                      className="nav-link text-white mt-2"
                      to="/admin/conductores"
                    >
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
        </div>

        <div>
          <div className="d-flex mb-3">
            <button
              className="btn btn-outline-info w-100"
              onClick={() => setShowSidebar(false)}
            >
              Cerrar Sidebar
            </button>
          </div>
          <div className="d-flex mb-3">
            <button
              className="btn btn-outline-danger w-100"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {!showSidebar && (
        <button
          className="btn btn-primary position-fixed h-100 pe-3"
          style={{ width: "20px" }}
          onClick={() => {
            setShowSidebar(true);
          }}
        >
          ☰
        </button>
      )}

      <div
        className="flex-grow-1 p-4"
        style={
          showSidebar
            ? sidebarLogic.marginContent
            : sidebarLogic.marginContentClosed
        }
      >
        <Outlet />
      </div>
    </div>
  );
}