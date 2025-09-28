import InfiniteScroll from 'react-infinite-scroll-component'

export function LicenciaList ({ licencias, fetchNextPage, hasNextPage, handleEdit, deleteMutation, handleAscOrder, ascOrder }) {
  console.log('Licencias en LicenciaList:', licencias)
  return (

    <InfiniteScroll
      dataLength={licencias.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className='text-center'>Cargando más licencias...</h4>}
      endMessage={<p className='text-center'>No hay más licencias</p>}
      scrollThreshold={1}
      scrollableTarget='scrollableDiv'
    >
      <div className='table-responsive'>
        <table className='table'>
          <thead className='border-info fw-bold'>
            <tr>
              <td style={{ borderRightWidth: 1 }} onClick={handleAscOrder} role='button'>ID <span className='text-info'>{ascOrder ? '⋀' : '⋁'}</span></td>
              <td>Conductor</td>
              <td>Fecha de hecho</td>
              <td>Fecha de creación</td>
              <td>Estado</td>

              <td className='text-end' style={{ paddingRight: 75 }}>Acción</td>
            </tr>
          </thead>

          <tbody>
            {console.log(licencias)}
            {licencias.map((licencia) => {
              return (
                <tr key={licencia.id}>
                  <td className='border-dark' style={{ borderRightWidth: 1 }}>{licencia.id}</td>
                  <td>{licencia.conductor.nombre} {licencia.conductor.apellido}</td>
                  <td>{licencia.fechaHecho ? licencia.fechaHecho.slice(0, 10) : 'Sin fecha'}</td>
                  <td>{licencia.fechaVencimiento ? licencia.fechaVencimiento.slice(0, 10) : 'Sin fecha'}</td>
                  <td>{licencia.estado}</td>
                  <td className='text-end'>
                    <button
                      className='btn btn-sm bg-info text-white me-2'
                      onClick={handleEdit.bind(this, licencia)}
                    >
                      Editar
                    </button>
                    <button className='btn btn-sm bg-danger text-white' onClick={async () => deleteMutation(licencia.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </InfiniteScroll>
  )
}
