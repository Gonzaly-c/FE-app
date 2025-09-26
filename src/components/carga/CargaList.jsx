import InfiniteScroll from "react-infinite-scroll-component"

export function CargaList({ cargas, fetchNextPage, hasNextPage, handleEdit, deleteMutation, handleAscOrder, ascOrder }) { 

  return(

    <InfiniteScroll
      dataLength={cargas.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className='text-center'>Cargando más cargas...</h4>}
      endMessage={<p className='text-center'>No hay más cargas</p>}
      scrollThreshold={1}
      scrollableTarget='scrollableDiv'
    >
      <div className='table-responsive'>
        <table className='table'>
          <thead className='border-info fw-bold'>
            <tr>
              <td style={{ borderRightWidth: 1 }} onClick={handleAscOrder} role="button">ID <span className="text-info">{ascOrder ? "⋀" : "⋁"}</span></td>
              <td>Nombre</td>
              <td>Tara</td>
              <td>Estado</td>
              <td>Tipo de carga</td>
              <td>Fecha de creación</td>

              <td className='text-end' style={{ paddingRight: 75 }}>Acción</td>
            </tr>
          </thead>

          <tbody>
              {console.log(cargas)}
              {cargas.map((carga) => {
                return (
                  <tr key={carga.id}>
                    <td className='border-dark' style={{ borderRightWidth: 1 }}>{carga.id}</td>
                    <td>{carga.name}</td>
                    <td>{carga.tara}</td>
                    <td>{carga.estado}</td>
                    <td>{carga.tipoCarga ? carga.tipoCarga.name : 'Sin tipo carga'}</td>
                    <td>{carga.createdAt ? carga.createdAt.slice(0, 10) : 'Sin fecha'}</td>

                    <td className='text-end'>
                      <button
                        className='btn btn-sm bg-info text-white me-2'
                        onClick={handleEdit.bind(this, carga)}
                      >
                        Editar
                      </button>
                      <button className='btn btn-sm bg-danger text-white' onClick={async () => deleteMutation(carga.id)}>
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