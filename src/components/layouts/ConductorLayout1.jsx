import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function ConductorLayoutCopy() {
  const [gestionOpen, setGestionOpen] = useState(false);
  const [viajesOpen, setViajesOpen] = useState(false);

  // Pequeño componente para asegurar que los botones principales
  // comparten exactamente las mismas clases y comportamiento.
  const NavButton = ({ onClick, children, ariaControls, ariaExpanded }) => (
    <button
      type="button"
      className="nav-link text-white d-flex align-items-center justify-content-start py-2 px-0 btn btn-link"
      onClick={onClick}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
      {children}
    </button>
  );

  return (
    <div className="d-flex">
      <aside className="col-5 col-md-3 col-lg-3 bg-dark text-white p-3 vh-100 d-flex flex-column">
        <h4 className="mb-4">RailTracker</h4>

        <div className="flex-grow-1">
          <ul className="nav flex-column">

            {/* Panel */}
            <li className="nav-item mb-2">
              <Link to="/conductor" className="nav-link text-white d-flex align-items-center py-2 px-0">
                <span className="me-2">📊</span>
                <span>Panel de control</span>
              </Link>
            </li>

            {/* Gestión con submenú (toggle como button para accesibilidad) */}
            <li className="nav-item mb-2">
              <button
                className="nav-link text-white btn btn-link text-start p-0"
                onClick={(e) => {
                  e.preventDefault();
                  setGestionOpen(!gestionOpen);
                }}
                aria-expanded={gestionOpen}
                aria-controls="gestion-submenu"
              >
                📁 Gestión
              </button>

              {gestionOpen && (
              <ul id="gestion-submenu" className="nav flex-column mt-2">
                <li className="nav-item">
                  <NavButton to="/conductor/gestion/trenes" compact icon="🚂">
                    Trenes
                  </NavButton>
                </li>
                <li className="nav-item">
                  <NavButton to="/conductor/gestion/conductores" compact icon="🗣️">
                    Conductores
                  </NavButton>
                </li>
                <li className="nav-item">
                  <NavButton to="/conductor/gestion/recorridos" compact icon="🚉">
                    Recorridos
                  </NavButton>
                </li>
                <li className="nav-item">
                  <NavButton to="/conductor/gestion/recorridos" compact icon="🚃">
                    Cargas
                  </NavButton>
                </li>
              </ul>
            )}
            </li>

            {/* Viajes con submenú */}
            <li className="nav-item mb-2">
              <button
                className="nav-link text-white btn btn-link text-start p-0"
                onClick={(e) => {
                  e.preventDefault();
                  setViajesOpen(!viajesOpen);
                }}
                aria-expanded={viajesOpen}
                aria-controls="viajes-submenu"
              >
                🚆 Viajes
              </button>

              {viajesOpen && (
                <ul id="viajes-submenu" className="nav flex-column ms-4">
                  <li className="nav-item">
                    <Link className="nav-link text-white ps-3" to="/conductor/viajes/activos">
                      ▶️ En curso
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white ps-3" to="/conductor/viajes/pasados">
                      ⏮️ Finalizados
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white ps-3" to="/conductor/viajes/programados">
                      📅 Programados
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Perfil */}
            <li className="nav-item mb-2">
              <Link className="nav-link text-white d-flex align-items-center py-2 px-0" to="/conductor/perfil">
                <span className="me-2">👤</span>
                <span>Perfil</span>
              </Link>
            </li>

          </ul>
        </div>

        {/* Cerrar sesión: queda pegado abajo */}
        <div className="mt-auto">
          <Link className="button text-white d-flex align-items-center py-2 px-0" to="/"> Cerrar sesión
          </Link>
          
        </div>
      </aside>

      <main className="flex-grow-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

