import InfiniteScroll from 'react-infinite-scroll-component'

export function ConductorList ({ conductores, fetchNextPage, hasNextPage, handleEdit, deleteMutation, handleAscOrder, ascOrder }) {
  return (
    <InfiniteScroll
      dataLength={conductores.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className='text-center'>Cargando más conductores...</h4>}
      endMessage={<p className='text-center'>No hay más conductores</p>}
      scrollThreshold={1}
      scrollableTarget='scrollableDiv'
    >
      <div className='table-responsive'>
        <table className='table'>
          <thead className='border-info fw-bold'>
            <tr>
              <td style={{ borderRightWidth: 1 }} onClick={handleAscOrder} role='button'>
                ID <span className='text-info'>{ascOrder ? '⋀' : '⋁'}</span>
              </td>
              <td>Nombre</td>
              <td>Apellido</td>
              <td>Email</td>
              <td>Estado</td>
              <td>Fecha de creación</td>
              <td className='text-end' style={{ paddingRight: 75 }}>Acción</td>
            </tr>
          </thead>

          <tbody>
            {conductores
              .filter(conductor => conductor) // <-- elimina undefined
              .map(conductor => (
                <tr key={conductor.id}>
                  <td className='border-dark' style={{ borderRightWidth: 1 }}>{conductor.id}</td>
                  <td>{conductor.nombre}</td>
                  <td>{conductor.apellido}</td>
                  <td>{conductor.email}</td>
                  <td>{conductor.estado ? conductor.estado : 'Sin Estado'}</td>
                  <td>{conductor.createdAt ? new Date(conductor.createdAt).toLocaleDateString('es-AR'): 'Sin fecha'}</td>
                  <td className='text-end'>
                    <button className='btn btn-sm bg-info text-white me-2' onClick={() => handleEdit(conductor)}>
                      Editar
                    </button>
                    <button className='btn btn-sm bg-danger text-white' onClick={async () => deleteMutation(conductor.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </InfiniteScroll>
  )
}
