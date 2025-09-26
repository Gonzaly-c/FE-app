import InfiniteScroll from "react-infinite-scroll-component"

export function TipoCargaList({ tipoCargas, fetchNextPage, hasNextPage, handleEdit, deleteMutation, handleAscOrder, ascOrder }) { 

  return(

    <InfiniteScroll
      dataLength={tipoCargas.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className='text-center'>Cargando más tipoCargas...</h4>}
      endMessage={<p className='text-center'>No hay más tipoCargas</p>}
      scrollThreshold={1}
      scrollableTarget='scrollableDiv'
    >
      <div className='table-responsive'>
        <table className='table'>
          <thead className='border-info fw-bold'>
            <tr>
              <td style={{ borderRightWidth: 1 }} onClick={handleAscOrder} role="button">ID <span className="text-info">{ascOrder ? "⋀" : "⋁"}</span></td>
              <td>Nombre</td>
              <td>Descripcion</td>
              <td>Estado</td>
              <td>Fecha de creación</td>
              <td className='text-end' style={{ paddingRight: 75 }}>Acción</td>
            </tr>
          </thead>

          <tbody>
              {console.log(tipoCargas)}
              {tipoCargas.map((tipoCarga) => {
                return (
                  <tr key={tipoCarga.id}>
                    <td className='border-dark' style={{ borderRightWidth: 1 }}>{tipoCarga.id}</td>
                    <td>{tipoCarga.name}</td>
                    <td>{tipoCarga.desc}</td>
                    <td>{tipoCarga.estado ? tipoCarga.estado : 'Sin Estado'}</td>
                    <td>{tipoCarga.createdAt ? tipoCarga.createdAt.slice(0, 10) : 'Sin fecha'}</td>


                    <td className='text-end'>
                      <button
                        className='btn btn-sm bg-info text-white me-2'
                        onClick={handleEdit.bind(this, tipoCarga)}
                      >
                        Editar
                      </button>
                      <button className='btn btn-sm bg-danger text-white' onClick={async () => deleteMutation(tipoCarga.id)}>
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