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
              <td className='text-center'>Ciudad Salida</td>
              <td className='text-center'>Ciudad Llegada</td>
              <td className='text-center'>Total de Km</td>
              <td className='text-center'>Fecha de creación</td>
              <td className='text-center'>Estado</td>
              <td className='text-end' style={{ paddingRight: 75 }}>Acción</td>
            </tr>
          </thead>

          <tbody>
              {console.log(recorridos)}
              {recorridos.map((recorrido) => {
                return (
                  <tr key={recorrido.id}>
                    <td className='border-dark' style={{ borderRightWidth: 1 }}>{recorrido.id}</td>
                    <td className='text-center'>{recorrido.ciudadSalida}</td>
                    <td className='text-center'>{recorrido.ciudadLlegada}</td>
                    <td className='text-center'>{recorrido.totalKm}</td>
                    <td className='text-center'>{recorrido.createdAt? new Date(new Date(recorrido.createdAt).getTime() + 3 * 60 * 60 * 1000).toLocaleDateString('es-AR'): 'Sin fecha'}</td>
                    <td className='text-center'>{recorrido.estado}</td>

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