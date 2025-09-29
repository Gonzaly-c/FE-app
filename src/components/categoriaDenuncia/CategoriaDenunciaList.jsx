import InfiniteScroll from "react-infinite-scroll-component"

export function CategoriaDenunciaList({ categoriaDenuncias, fetchNextPage, hasNextPage, handleEdit, deleteMutation, handleAscOrder, ascOrder }) { 

  return(

    <InfiniteScroll
      dataLength={categoriaDenuncias.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className='text-center'>Cargando más categoriaDenuncias...</h4>}
      endMessage={<p className='text-center'>No hay más categoriaDenuncias</p>}
      scrollThreshold={1}
      scrollableTarget='scrollableDiv'
    >
      <div className='table-responsive'>
        <table className='table'>
          <thead className='border-info fw-bold'>
            <tr>
              <td style={{ borderRightWidth: 1 }} onClick={handleAscOrder} role="button">ID <span className="text-info">{ascOrder ? "⋀" : "⋁"}</span></td>
              <td>Titulo</td>
              <td>Descripcion</td>
              <td>Estado</td>
              <td>Fecha de creación</td>
              <td className='text-end' style={{ paddingRight: 75 }}>Acción</td>
            </tr>
          </thead>

          <tbody>
              {console.log(categoriaDenuncias)}
              {categoriaDenuncias.map((categoriaDenuncia) => {
                return (
                  <tr key={categoriaDenuncia.id}>
                    <td className='border-dark' style={{ borderRightWidth: 1 }}>{categoriaDenuncia.id}</td>
                    <td>{categoriaDenuncia.titulo}</td>
                    <td>{categoriaDenuncia.descripcion}</td>
                    <td>{categoriaDenuncia.estado ? categoriaDenuncia.estado : 'Sin Estado'}</td>
                    <td>{categoriaDenuncia.createdAt? new Date(new Date(categoriaDenuncia.createdAt).getTime() + 3 * 60 * 60 * 1000).toLocaleDateString('es-AR'): 'Sin fecha'}</td>
                    <td className='text-end'>
                      <button
                        className='btn btn-sm bg-info text-white me-2'
                        onClick={handleEdit.bind(this, categoriaDenuncia)}
                      >
                        Editar
                      </button>
                      <button className='btn btn-sm bg-danger text-white' onClick={async () => deleteMutation(categoriaDenuncia.id)}>
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