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
              <td className='text-center'>Conductor</td>
              <td className='text-center'>Fecha de hecho</td>
              <td className='text-center'>Fecha de vencimiento</td>
              <td className='text-center'>Estado</td>

              <td className='text-end' style={{ paddingRight: 75 }}>Acción</td>
            </tr>
          </thead>

          <tbody>
            {console.log(licencias)}
            {licencias.map((licencia) => {
              return (
                <tr key={licencia.id}>
                  <td className='border-dark' style={{ borderRightWidth: 1 }}>{licencia.id}</td>
                  <td className='text-center'>{licencia.conductor.nombre} {licencia.conductor.apellido}</td>
                  <td className='text-center'>{licencia.fechaHecho? new Date(new Date(licencia.fechaHecho).getTime() + 3 * 60 * 60 * 1000).toLocaleDateString('es-AR'): 'Sin fecha'}</td>
                  <td className='text-center'>{licencia.fechaVencimiento? new Date(new Date(licencia.fechaVencimiento).getTime() + 3 * 60 * 60 * 1000).toLocaleDateString('es-AR'): 'Sin fecha'}</td>
                  <td className='text-center'>{licencia.estado}</td>
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
