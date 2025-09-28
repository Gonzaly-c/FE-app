import InfiniteScroll from "react-infinite-scroll-component"

export function EstadoTrenList({ estadoTrenes, fetchNextPage, hasNextPage, handleEdit, deleteMutation, handleAscOrder, ascOrder }) { 

  return(

    <InfiniteScroll
      dataLength={estadoTrenes.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className='text-center'>Cargando más estadoTrenes...</h4>}
      endMessage={<p className='text-center'>No hay más estadoTrenes</p>}
      scrollThreshold={1}
      scrollableTarget='scrollableDiv'
    >
      <div className='table-responsive'>
        <table className='table'>
          <thead className='border-info fw-bold'>
            <tr>
              <td style={{ borderRightWidth: 1 }} onClick={handleAscOrder} role="button">ID <span className="text-info">{ascOrder ? "⋀" : "⋁"}</span></td>
              <td>Nombre</td>
              <td>Tren</td>
              <td>Vigente desde</td>
              <td>Estado</td>
              <td>Fecha de creación</td>
              <td className='text-end' style={{ paddingRight: 75 }}>Acción</td>
            </tr>
          </thead>

          <tbody>
              {console.log(estadoTrenes)}
              {estadoTrenes.map((estadoTren) => {
                return (
                  <tr key={estadoTren.id}>
                    <td className='border-dark' style={{ borderRightWidth: 1 }}>{estadoTren.id}</td>
                    <td>{estadoTren.nombre}</td>
                    <td>{estadoTren.tren ? estadoTren.tren : 'Sin Tren'}</td>
                    <td>{estadoTren.fechaVigencia ? estadoTren.fechaVigencia.slice(0, 10) : 'Sin fecha'}</td>
                    <td>{estadoTren.estado ? estadoTren.estado : 'Sin Estado'}</td>
                    <td>{estadoTren.createdAt ? estadoTren.createdAt.slice(0, 10) : 'Sin fecha'}</td>


                    <td className='text-end'>
                      <button
                        className='btn btn-sm bg-info text-white me-2'
                        onClick={handleEdit.bind(this, estadoTren)}
                      >
                        Editar
                      </button>
                      <button className='btn btn-sm bg-danger text-white' onClick={async () => deleteMutation(estadoTren.id)}>
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