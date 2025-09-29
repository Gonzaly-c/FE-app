import InfiniteScroll from "react-infinite-scroll-component"
import { useNavigate } from 'react-router-dom';


export function ViajeList({ viajes, fetchNextPage, hasNextPage, handleEdit, deleteMutation, handleAscOrder, ascOrder }) { 
  
  const navigate = useNavigate();

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
                    
                    <td className='text-center'>
                      {viaje.estado === 'Inactivo'
                        ? 'Cancelado/Suspendido'
                        : (() => {
                            const hoy = new Date();
                            const fechaIni = new Date(viaje.fechaIni);
                            const fechaFin = new Date(viaje.fechaFin);

                            if (fechaFin < hoy) return 'Finalizado';
                            if (fechaIni > hoy) return 'Programado';
                            if (fechaIni <= hoy && fechaFin >= hoy) return 'En curso';
                            return 'Sin Estado';
                          })()}
                    </td>


                    <td className='text-center'>
                      

                    <button
                      className='btn btn-sm text-white me-2'
                      style={{ backgroundColor: '#009e00ff', color: '#fff', marginTop: '-5px'}}
                      onClick={() => navigate(`/admin/lineaCargas?viajeId=${viaje.id}`)}
                    >
                      Ver Cargas
                    </button>
                    <button
                      className='btn btn-sm text-white me-2'
                      style={{ backgroundColor: '#009e00ff', color: '#fff', marginTop: '-5px' }}
                      onClick={() => navigate(`/admin/observaciones?viajeId=${viaje.id}`)}
                    >
                      Ver Observaciones
                    </button>


                      <button
                        className='btn btn-sm bg-info text-white me-2' 
                        style={{ marginTop: '-5px'}}
                        onClick={handleEdit.bind(this, viaje)}
                        
                      >
                        Editar
                      </button>
                      <button className='btn btn-sm bg-danger text-white' onClick={async () => deleteMutation(viaje.id)}
                        style={{ marginTop: '-5px'}}>
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