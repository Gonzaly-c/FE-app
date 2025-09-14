import { useEffect, useState, useRef } from 'react'
import { useTrenesQuery } from '../hooks/tren/useTrenesQuery'
import { useTrenesDelete } from '../hooks/tren/useTrenesDelete'
import { Modal } from '../components/Modal'
import { TrenForm } from '../components/forms/TrenForm'

export function TrenCrud () {
  const [filteredTrenes, setFilteredTrenes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const trenToEdit = useRef(null) // variable para menejar si es edicion o creacion
  const { data: trenes, isLoading, isError, error } = useTrenesQuery()
  const { mutateAsync: handleDelete } = useTrenesDelete()

  useEffect(() => {
    if (trenes) setFilteredTrenes(trenes)
    // logica que va a ser necesaria para hacer filtrados locales
  }, [trenes])

  const handleFilter = (e) => {
    setFilteredTrenes(
      trenes.filter((tren) => tren.id.toString().includes(e.target.value))
    )
  }

  if (isLoading) return <h1 className='text-center'>Cargando..</h1>

  if (isError) return <h1>{error}</h1>

  return (
    <div>
      <h1 className='h1 mt-2 text-center'>Lista de Trenes</h1>

      <div className='d-flex justify-content-between mb-4'>
        <button
          className='btn btn-info'
          onClick={async () => { setShowModal(true) }}
        >
          Crear un tren
        </button>

        <div className='input-group w-auto'>
          <input
            type='text'
            className='form-control'
            placeholder='Buscar por id'
            onChange={handleFilter}
          />
          <span className='input-group-text'>
            🔍
          </span>
        </div>
      </div>

      <div className='table-responsive'>
        <table className='table'>
          <thead className='border-info fw-bold'>
            <tr>
              <td style={{ borderRightWidth: 1 }}>ID</td>
              <td>Modelo</td>
              <td>Color</td>
              <td>Fecha de creación</td>
              <td className='text-end' style={{ paddingRight: 75 }}>Acción</td>
            </tr>
          </thead>

          <tbody>
            {filteredTrenes.map((tren) => {
              return (
                <tr key={tren.id}>
                  <td className='border-dark' style={{ borderRightWidth: 1 }}>{tren.id}</td>
                  <td>{tren.modelo}</td>
                  <td>{tren.color}</td>
                  <td>{tren.createdAt.slice(0, 10)}</td>

                  <td className='text-end'>
                    <button
                      className='btn btn-sm bg-info text-white me-2'
                      onClick={async () => { trenToEdit.current = tren; setShowModal(true) }}
                    >
                      Editar
                    </button>
                    <button className='btn btn-sm bg-danger text-white' onClick={async () => handleDelete(tren.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showModal &&
        <Modal onClose={() => setShowModal(false)} title={(trenToEdit.current ? 'Editar' : 'Crear') + ' Tren'}>
          <TrenForm onSuccess={() => setShowModal(false)} trenToEdit={trenToEdit.current} />
        </Modal>}
    </div>

  )
}
