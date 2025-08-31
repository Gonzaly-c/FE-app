import { useEffect, useRef, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
// import RailTrackerLogo from '../assets/RailTrackerImages/RailTrackerLogoRecorted.png'

export default function ConductorLayout() {
  // Sidebar open state for mobile
  const [mobileOpen, setMobileOpen] = useState(false);

  // Resizing state & width (persisted)
  const minWidth = 160;
  const maxWidth = 480;
  const defaultWidth = 260;
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    try {
    const saved = localStorage.getItem('ct_sidebar_width');
    return saved ? parseInt(saved, 10) : defaultWidth;
  } catch {
    return defaultWidth;
  }

  });

  // Side: 'left' or 'right' (persisted)
  const [sidebarSide, setSidebarSide] = useState(() => {
    try {
      const saved = localStorage.getItem('ct_sidebar_side');
      return saved === 'right' ? 'right' : 'left';
    } catch {
      return 'left';
    }
  });

  const resizingRef = useRef(false);
  const containerRef = useRef(null);
  const sidebarRef = useRef(null);

  const [gestionOpen, setGestionOpen] = useState(false);
  const [viajesOpen, setViajesOpen] = useState(false);

  // Keep track of small screen (responsive behavior)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Mouse / touch handlers for resizing — support both left and right sidebars
  useEffect(() => {
    function onMove(e) {
      if (!resizingRef.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const rect = containerRef.current
        ? containerRef.current.getBoundingClientRect()
        : { left: 0, right: window.innerWidth };

      let newWidth;
      if (sidebarSide === 'left') {
        newWidth = clientX - rect.left;
      } else {
        // right side: width is distance from clientX to right edge
        newWidth = rect.right - clientX;
      }

      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      setSidebarWidth(newWidth);
    }

    function onUp() {
      if (resizingRef.current) {
        resizingRef.current = false;
        try {
          localStorage.setItem('ct_sidebar_width', String(sidebarWidth));
          localStorage.setItem('ct_sidebar_side', sidebarSide);
        } catch { /* ignore */ }
      }
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
    
  }, [sidebarWidth, sidebarSide]);

  const startResize = (e) => {
    e.preventDefault();
    resizingRef.current = true;
  };

  const toggleSidebarSide = () => {
    setSidebarSide((s) => {
      const next = s === 'left' ? 'right' : 'left';
      try {
        localStorage.setItem('ct_sidebar_side', next);
      } catch { /* ignore */ }
      return next;
    });
  };

  // Simple nav button component — ensures full width & centered text
  const NavButton = ({ to, onClick, children, icon, compact }) => {
    const baseClass =
      'd-flex flex-column align-items-center justify-content-center text-white w-100';

    const padding = compact ? 'py-2' : 'py-3';

    const commonProps = {
      className: `${baseClass} ${padding}`,
      onClick,
      style: { textDecoration: 'none', border: 'none', background: 'transparent' },
    };

    const inner = (
      <>
        {icon && (
          <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }} className="mb-1">
            {icon}
          </span>
        )}
        <span style={{ textAlign: 'center', display: 'block' }}>{children}</span>
      </>
    );

    if (to) {
      return (
        <Link to={to} {...commonProps}>
          {inner}
        </Link>
      );
    }

    return (
      <button type="button" {...commonProps}>
        {inner}
      </button>
    );
  };

  // computed styles
  const asideStyle = isMobile
    ? {
        width: sidebarWidth,
        position: 'fixed',
        top: 0,
        left: sidebarSide === 'left' ? 0 : 'auto',
        right: sidebarSide === 'right' ? 0 : 'auto',
        height: '100vh',
        zIndex: 1040,
        transform: mobileOpen
          ? 'translateX(0)'
          : sidebarSide === 'left'
          ? `translateX(-${sidebarWidth}px)`
          : `translateX(${sidebarWidth}px)`,
        transition: 'transform 180ms ease',
        backgroundColor: '#212529',
        overflowY: 'auto',
      }
    : {
        width: sidebarWidth,
        minWidth: sidebarWidth,
        maxWidth: sidebarWidth,
        height: '100vh',
        overflowY: 'auto',
      };

  const resizerStyle = {
    width: 8,
    cursor: 'col-resize',
    height: '100vh',
    zIndex: 1050,
    background: 'transparent',
  };

  // The aside content builder so we can render it before or after main depending on side
  const AsideContent = () => (
    <aside
      ref={sidebarRef}
      className="bg-dark text-white d-flex flex-column p-3"
      style={asideStyle}
      aria-label="Sidebar de navegación"
    >
      {/* Header: logo + title + controls */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <img
            //src={RailTrackerLogo}
            alt="Mi ferrocarril"
            style={{ width: 36, height: 36, objectFit: 'contain', marginRight: 10 }}
          />
          <h5 className="mb-0" style={{ color: '#fff' }}>
            Mi ferrocarril
          </h5>
        </div>

        <div className="d-flex gap-2 align-items-center">
          {/* Toggle side */}
          <button
            type="button"
            className="btn btn-sm btn-outline-light"
            onClick={toggleSidebarSide}
            aria-label="Mover sidebar de lado"
            title="Mover sidebar de lado"
          >
            ↔
          </button>

          {/* Mobile: close button when open */}
          {isMobile && (
            <button
              type="button"
              className="btn btn-sm btn-outline-light"
              onClick={() => setMobileOpen(false)}
              aria-label="Cerrar menú"
            >
              ✖
            </button>
          )}
        </div>
      </div>

      <div className="flex-grow-1">
        <ul className="nav flex-column gap-1">
          <li className="nav-item">
            <NavButton to="/conductor" icon="📊">
              Panel de control
            </NavButton>
          </li>

          <li className="nav-item">
            <NavButton
              onClick={(e) => {
                e && e.preventDefault();
                setGestionOpen(!gestionOpen);
              }}
              icon="📁"
            >
              Gestión
            </NavButton>

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

          <li className="nav-item">
            <NavButton
              onClick={(e) => {
                e && e.preventDefault();
                setViajesOpen(!viajesOpen);
              }}
              icon="🚆"
            >
              Viajes
            </NavButton>

            {viajesOpen && (
              <ul id="viajes-submenu" className="nav flex-column mt-2">
                <li className="nav-item">
                  <NavButton to="/conductor/viajes/activos" compact icon="▶️">
                    En curso
                  </NavButton>
                </li>
                <li className="nav-item">
                  <NavButton to="/conductor/viajes/pasados" compact icon="⏮️">
                    Finalizados
                  </NavButton>
                </li>
                <li className="nav-item">
                  <NavButton to="/conductor/viajes/programados" compact icon="📅">
                    Programados
                  </NavButton>
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item">
            <NavButton to="/conductor/perfil" icon="👤">
              Perfil
            </NavButton>
          </li>
        </ul>
      </div>

      {/* Cerrar sesión: pegado abajo */}
      <div className="mt-auto pt-3">
        <button className="btn btn-outline-danger w-100" type="button">
          Cerrar sesión
        </button>
      </div>
    </aside>
  );

  return (
    <div ref={containerRef} className="d-flex position-relative" style={{ minHeight: '100vh' }}>
      {/* Desktop: render sidebar on left or right by ordering elements */}
      {!isMobile && sidebarSide === 'left' && <AsideContent />}

      {!isMobile && sidebarSide === 'left' && (
        <div
          role="separator"
          aria-orientation="vertical"
          onMouseDown={startResize}
          onTouchStart={startResize}
          style={resizerStyle}
        />
      )}

      {/* Main (overlay effect when mobile) */}
      <main className="flex-grow-1 p-4">
        {/* Mobile toggle button in top-left of main when collapsed */}
        {isMobile && (
          <div className="mb-3 d-flex align-items-center">
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              ☰
            </button>
            <h5 className="mb-0">Panel</h5>
          </div>
        )}

        <Outlet />
      </main>

      {!isMobile && sidebarSide === 'right' && (
        <div
          role="separator"
          aria-orientation="vertical"
          onMouseDown={startResize}
          onTouchStart={startResize}
          style={resizerStyle}
        />
      )}

      {!isMobile && sidebarSide === 'right' && <AsideContent />}

      {/* Mobile: render aside as overlay (keeps it in DOM so it can animate properly) */}
      {isMobile && <AsideContent />}
    </div>
  );
}


