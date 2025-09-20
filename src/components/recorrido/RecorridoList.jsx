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
              <td>Modelo</td>
              <td>Color</td>
              <td>Estado Actual</td>
              <td>Fecha de creación</td>
              <td className='text-end' style={{ paddingRight: 75 }}>Acción</td>
            </tr>
          </thead>

          <tbody>
              {console.log(recorridos)}
              {recorridos.map((recorrido) => {
                return (
                  <tr key={recorrido.id}>
                    <td className='border-dark' style={{ borderRightWidth: 1 }}>{recorrido.id}</td>
                    <td>{recorrido.modelo}</td>
                    <td>{recorrido.color}</td>
                    <td>{recorrido.estadoActual ? recorrido.estadoActual.nombre : 'Sin Estado'}</td>
                    <td>{recorrido.createdAt.slice(0, 10)}</td>

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