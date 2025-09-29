import InfiniteScroll from "react-infinite-scroll-component"

export function ViajeList({ viajes, fetchNextPage, hasNextPage, handleEdit, deleteMutation, handleAscOrder, ascOrder }) { 

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
              <td>Conductor</td>
              <td>Tren</td>
              <td>Recorrido</td>
              <td>Inicio</td>
              <td>Fin</td>
              <td>Estado</td>
              <td className='text-end' style={{ paddingRight: 75 }}>Acción</td>
            </tr>
          </thead>

          <tbody>
              {console.log(viajes)}
              {viajes.map((viaje) => {
                return (
                  <tr key={viaje.id}>
                    <td className='border-dark' style={{ borderRightWidth: 1 }}>{viaje.id}</td>
                    <td>{viaje.conductor.nombre} {viaje.conductor.apellido}</td>
                    <td>{viaje.tren.modelo} (color: {viaje.tren.color})</td>
                    <td>{viaje.recorrido.ciudadSalida}-{viaje.recorrido.ciudadLlegada}</td>
                    <td>{viaje.fechaIni? new Date(new Date(viaje.fechaIni).getTime() + 3 * 60 * 60 * 1000).toLocaleDateString('es-AR'): 'Sin fecha'}</td>
                    <td>{viaje.fechaFin? new Date(new Date(viaje.fechaFin).getTime() + 3 * 60 * 60 * 1000).toLocaleDateString('es-AR'): 'Sin fecha'}</td>
                    <td>{viaje.estado ? viaje.estado : 'Sin Estado'}</td>



                    <td className='text-end'>
                      <button
                        className='btn btn-sm bg-info text-white me-2'
                        onClick={handleEdit.bind(this, viaje)}
                      >
                        Editar
                      </button>
                      <button className='btn btn-sm bg-danger text-white' onClick={async () => deleteMutation(viaje.id)}>
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