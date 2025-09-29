import InfiniteScroll from "react-infinite-scroll-component"

export function TrenList({ trenes, fetchNextPage, hasNextPage, handleEdit, deleteMutation, handleAscOrder, ascOrder }) { 

  return(

    <InfiniteScroll
      dataLength={trenes.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className='text-center'>Cargando más trenes...</h4>}
      endMessage={<p className='text-center'>No hay más trenes</p>}
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
              {console.log(trenes)}
              {trenes.map((tren) => {
                return (
                  <tr key={tren.id}>
                    <td className='border-dark' style={{ borderRightWidth: 1 }}>{tren.id}</td>
                    <td>{tren.modelo}</td>
                    <td>{tren.color}</td>
                    <td>{tren.estadoActual ? tren.estadoActual.nombre : 'Sin Estado'}</td>
                    <td>{tren.createdAt ? new Date(tren.createdAt).toLocaleDateString('es-AR'): 'Sin fecha'}</td>


                    <td className='text-end'>
                      <button
                        className='btn btn-sm bg-info text-white me-2'
                        onClick={handleEdit.bind(this, tren)}
                      >
                        Editar
                      </button>
                      <button className='btn btn-sm bg-danger text-white' onClick={async () => deleteMutation(tren.id)}>
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