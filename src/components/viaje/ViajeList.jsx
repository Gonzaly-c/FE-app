import InfiniteScroll from "react-infinite-scroll-component"
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export function ViajeList({ viajes, fetchNextPage, hasNextPage, handleEdit, deleteMutation, handleAscOrder, ascOrder }) {

  const getEstadoTexto = (viaje) => {
    const hoy = new Date();
    const fechaIni = new Date(viaje.fechaIni);
    const fechaFin = new Date(viaje.fechaFin);

    if (viaje.estado === 'Inactivo') {
      return 'Cancelado/Suspendido';
    }

    if (viaje.estado === 'Pendiente') {
      return fechaIni > hoy ? 'Pendiente' : 'Viaje no aceptado';
    }

    if (fechaFin < hoy) return 'Finalizado';
    if (fechaIni > hoy) return 'Programado';
    if (fechaIni <= hoy && fechaFin >= hoy) return 'En curso';

    return 'Sin Estado';
  };

  const estadosContados = viajes.reduce((acc, viaje) => {
    const estadoTexto = getEstadoTexto(viaje);
    acc[estadoTexto] = (acc[estadoTexto] || 0) + 1;
    return acc;
  }, {});

  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');

  const viajesFiltrados = estadoSeleccionado
    ? viajes.filter(viaje => getEstadoTexto(viaje) === estadoSeleccionado)
    : viajes;

  const navigate = useNavigate();

  const EstadoBadge = ({ viaje }) => {
    const estadoTexto = getEstadoTexto(viaje);

    const map = {
      'Finalizado': 'success',
      'En curso': 'warning',
      'Cancelado/Suspendido': 'danger',
      'Programado': 'info',
      'Pendiente': 'dark',
      'Viaje no aceptado': 'danger',
      'Sin Estado': 'secondary',
    };

    const variant = map[estadoTexto] || 'secondary';

    return (
      <span
        className={`btn btn-sm bg-${variant} text-white me-2`}
        style={{
          pointerEvents: 'none',
          marginTop: '-10px',
          minWidth: '180px',
          textAlign: 'center',
          fontWeight: '500',
          lineHeight: '2.5',
        }}
      >
        {estadoTexto}
      </span>
    );
  };

  return (
    <InfiniteScroll
      dataLength={viajes.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className='text-center'>Cargando más viajes...</h4>}
      endMessage={<p className='text-center'>No hay más viajes</p>}
      scrollThreshold={1}
      scrollableTarget='scrollableDiv'
    >
      <div className="mb-3 d-flex align-items-center">
        <label className="me-2">Filtrar por estado:</label>
        <select
          className="form-select w-auto"
          value={estadoSeleccionado}
          onChange={e => setEstadoSeleccionado(e.target.value)}
        >
          <option value="">Todos</option>
          {Object.entries(estadosContados).map(([estado, cantidad]) => (
            <option key={estado} value={estado}>
              {estado} ({cantidad})
            </option>
          ))}
        </select>
      </div>

      <div className='table-responsive'>
        <table className='table'>
          <thead className='border-info fw-bold'>
            <tr>
              <td style={{ borderRightWidth: 1 }} onClick={handleAscOrder} role="button">
                ID <span className="text-info">{ascOrder ? "⋀" : "⋁"}</span>
              </td>
              <td className='text-center'>Conductor</td>
              <td className='text-center'>Tren</td>
              <td className='text-center'>Recorrido</td>
              <td className='text-center'>Inicio</td>
              <td className='text-center'>Fin</td>
              <td className='text-center'>Estado</td>
              <td className='text-center' style={{ paddingRight: 75 }}>Acción</td>
            </tr>
          </thead>

          <tbody>
            {viajesFiltrados.map((viaje) => (
              <tr key={viaje.id}>
                <td className='border-dark-center' style={{ borderRightWidth: 1 }}>{viaje.id}</td>
                <td className='text-center'>
                  {viaje.conductor.nombre ? viaje.conductor.nombre : 'Sin Conductor'} {viaje.conductor.apellido ? viaje.conductor.apellido : ''}
                </td>
                <td className='text-center'>
                  {viaje.tren.modelo ? viaje.tren.modelo : 'Sin modelo'} (color: {viaje.tren.color ? viaje.tren.color : 'Sin color'})
                </td>
                <td className='text-center'>
                  {viaje.recorrido.ciudadSalida ? viaje.recorrido.ciudadSalida : 'Sin ciudad de salida'} -
                  {viaje.recorrido.ciudadLlegada ? viaje.recorrido.ciudadLlegada : 'Sin ciudad de llegada'}
                </td>
                <td className='text-center'>
                  {viaje.fechaIni ? new Date(new Date(viaje.fechaIni).getTime() + 3 * 60 * 60 * 1000).toLocaleDateString('es-AR') : 'Sin fecha'}
                </td>
                <td className='text-center'>
                  {viaje.fechaFin ? new Date(new Date(viaje.fechaFin).getTime() + 3 * 60 * 60 * 1000).toLocaleDateString('es-AR') : 'Sin fecha'}
                </td>
                <td className="text-center">
                  <EstadoBadge viaje={viaje} />
                </td>
                <td className='text-center'>
                  <button
                    className='btn btn-sm text-white me-2'
                    style={{ backgroundColor: '#009e00ff', marginTop: '-10px' }}
                    onClick={() => navigate(`/admin/lineaCargas?viajeId=${viaje.id}`)}
                  >
                    Ver Cargas
                  </button>
                  <button
                    className='btn btn-sm text-white me-2'
                    style={{ backgroundColor: '#009e00ff', marginTop: '-10px' }}
                    onClick={() => navigate(`/admin/observaciones?viajeId=${viaje.id}`)}
                  >
                    Ver Observaciones
                  </button>
                  <button
                    className='btn btn-sm bg-info text-white me-2'
                    style={{ marginTop: '-10px' }}
                    onClick={handleEdit.bind(this, viaje)}
                  >
                    Editar
                  </button>
                  <button
                    className='btn btn-sm bg-danger text-white'
                    onClick={async () => deleteMutation(viaje.id)}
                    style={{ marginTop: '-10px' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InfiniteScroll>
  );
}