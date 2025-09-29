import InfiniteScroll from "react-infinite-scroll-component"
import { useNavigate } from 'react-router-dom';


export function ViajeList({ viajes, fetchNextPage, hasNextPage, handleEdit, deleteMutation, handleAscOrder, ascOrder }) { 
  
  const navigate = useNavigate();
  const EstadoBadge = ({ viaje }) => {
    const hoy = new Date();
    const fechaIni = new Date(viaje.fechaIni);
    const fechaFin = new Date(viaje.fechaFin);

    let estadoTexto = 'Sin Estado';

    if (viaje.estado === 'Inactivo') {
      estadoTexto = 'Cancelado/Suspendido';
    } else {
      if (fechaFin < hoy) estadoTexto = 'Finalizado';
      else if (fechaIni > hoy) estadoTexto = 'Programado';
      else if (fechaIni <= hoy && fechaFin >= hoy) estadoTexto = 'En curso';
    }

    const map = {
      'Finalizado': 'success',
      'En curso': 'warning',
      'Cancelado/Suspendido': 'danger',
      'Programado': 'info',
      'Sin Estado': 'secondary',
    };

    const variant = map[estadoTexto];

    return (
      <span className={`btn btn-sm bg-${variant} text-white me-2`} style={{ pointerEvents: 'none', marginTop: '-10px',
        minWidth: '180px',
        textAlign: 'center',
        fontWeight: '500',
        lineHeight: '2.5',
        
 }}>
        {estadoTexto}
      </span>
    );
  };

  return(

    <InfiniteScroll
      dataLength={viajes.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className='text-center'>Cargando más viajes...</h4>}
      endMessage={<p className='text-center'>No hay más viajes</p>}
      scrollThreshold={1}
      scrollableTarget='scrollableDiv'
    >
      <div className='table-responsive'>
        <table className='table'>
          <thead className='border-info fw-bold'>
            <tr>
              <td style={{ borderRightWidth: 1 }} onClick={handleAscOrder} role="button">ID <span className="text-info">{ascOrder ? "⋀" : "⋁"}</span></td>
              <td className='text-center'>Conductor</td>
              <td className='text-center'>Tren</td>
              <td className='text-center'>Recorrido</td>
              <td className='text-center'>Inicio</td>
              <td className='text-center'>Fin</td>
              <td className='text-center'>Estado</td>
              <td className='text-center' style={{ paddingRight: 75} }>Acción</td>
            </tr>
          </thead>

          <tbody>
              {console.log(viajes)}
              {viajes.map((viaje) => {
                return (
                  <tr key={viaje.id}>
                    <td className='border-dark-center' style={{ borderRightWidth: 1 }}>{viaje.id}</td>
                    <td className='text-center'>{viaje.conductor.nombre} {viaje.conductor.apellido}</td>
                    <td className='text-center'>{viaje.tren.modelo} (color: {viaje.tren.color})</td>
                    <td className='text-center'>{viaje.recorrido.ciudadSalida}-{viaje.recorrido.ciudadLlegada}</td>
                    <td className='text-center'>{viaje.fechaIni? new Date(new Date(viaje.fechaIni).getTime() + 3 * 60 * 60 * 1000).toLocaleDateString('es-AR'): 'Sin fecha'}</td>
                    <td className='text-center'>{viaje.fechaFin? new Date(new Date(viaje.fechaFin).getTime() + 3 * 60 * 60 * 1000).toLocaleDateString('es-AR'): 'Sin fecha'}</td>
                    
                    <td className="text-center">
                      <EstadoBadge viaje={viaje} />
                    </td>



                    <td className='text-center'>
                      

                    <button
                      className='btn btn-sm text-white me-2'
                      style={{ backgroundColor: '#009e00ff', color: '#fff', marginTop: '-10px'}}
                      onClick={() => navigate(`/admin/lineaCargas?viajeId=${viaje.id}`)}
                    >
                      Ver Cargas
                    </button>
                    <button
                      className='btn btn-sm text-white me-2'
                      style={{ backgroundColor: '#009e00ff', color: '#fff', marginTop: '-10px' }}
                      onClick={() => navigate(`/admin/observaciones?viajeId=${viaje.id}`)}
                    >
                      Ver Observaciones
                    </button>


                      <button
                        className='btn btn-sm bg-info text-white me-2' 
                        style={{ marginTop: '-10px'}}
                        onClick={handleEdit.bind(this, viaje)}
                        
                      >
                        Editar
                      </button>
                      <button className='btn btn-sm bg-danger text-white' onClick={async () => deleteMutation(viaje.id)}
                        style={{ marginTop: '-10px'}}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })}
            
          </tbody>
        </table>
      </div>
    </InfiniteScroll>)
  }