import InfiniteScroll from "react-infinite-scroll-component"

export function RecorridoList({ recorridos, fetchNextPage, hasNextPage, handleEdit, deleteMutation, handleAscOrder, ascOrder }) { 

  return(

    <InfiniteScroll
      dataLength={recorridos.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className='text-center'>Cargando más recorridos...</h4>}
      endMessage={<p className='text-center'>No hay más recorridos</p>}
      scrollThreshold={1}
      scrollableTarget='scrollableDiv'
    >
      <div className='table-responsive'>
        <table className='table'>
          <thead className='border-info fw-bold'>
            <tr>
              <td style={{ borderRightWidth: 1 }} onClick={handleAscOrder} role="button">ID <span className="text-info">{ascOrder ? "⋀" : "⋁"}</span></td>
              <td>Ciudad Salida</td>
              <td>Ciudad Llegada</td>
              <td>Total de Km</td>
              <td>Fecha de creación</td>
              <td>Estado</td>
              <td className='text-end' style={{ paddingRight: 75 }}>Acción</td>
            </tr>
          </thead>

          <tbody>
              {console.log(recorridos)}
              {recorridos.map((recorrido) => {
                return (
                  <tr key={recorrido.id}>
                    <td className='border-dark' style={{ borderRightWidth: 1 }}>{recorrido.id}</td>
                    <td>{recorrido.ciudadSalida}</td>
                    <td>{recorrido.ciudadLlegada}</td>
                    <td>{recorrido.totalKm}</td>
                    <td>{recorrido.createdAt ? new Date(recorrido.createdAt).toLocaleDateString('es-AR'): 'Sin fecha'}</td>
                    <td>{recorrido.estado}</td>

                    <td className='text-end'>
                      <button
                        className='btn btn-sm bg-info text-white me-2'
                        onClick={handleEdit.bind(this, recorrido)}
                      >
                        Editar
                      </button>
                      <button className='btn btn-sm bg-danger text-white' onClick={async () => deleteMutation(recorrido.id)}>
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