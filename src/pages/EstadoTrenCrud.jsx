import { Modal } from '../components/Modal.jsx'
import { EstadoTrenForm } from '../components/estadoTren/EstadoTrenForm.jsx'
import { EstadoTrenList } from '../components/estadoTren/EstadoTrenList.jsx'
import { useEstadoTrenCrud } from '../hooks/estadoTren/useEstadoTrenCrud.js'
import { useQueryClient } from '@tanstack/react-query'

export function EstadoTrenCrud() {
  const queryClient = useQueryClient()
  const {
    estadoTrenes,
    showModal,
    setShowModal,
    estadoTrenToEdit,
    deleteMutation,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    ascOrder,
    handleFilter,
    handleEdit,
    handleCreate,
    handleAscOrder
  } = useEstadoTrenCrud()


  if (isLoading) return <h1 className='text-center'>Cargando..</h1>

  if (isError) return <h1>{error}</h1>

  return (
    <div>
      <h1 className='h1 mt-2 text-center'>Lista de EstadoTrenes</h1>

      <div className='d-flex justify-content-between mb-4'>
        <button
          className='btn btn-info'
          onClick={handleCreate}
        >
          Crear un estadoTren
        </button>

        <div className='input-group w-auto'>
          <p role='button' onClick={async () => {document.getElementById("findOneInput").value = ''; await queryClient.invalidateQueries({queryKey: ['estadoTrenesInfinite']})}}>X</p>
          <input
            type='number'
            className='form-control'
            placeholder='Buscar por id'
            id='findOneInput'
          />
          <span role='button' className='input-group-text' onClick={() => handleFilter(document.getElementById("findOneInput").value)}>
            🔍
          </span>
        </div>
      </div>
      {/* Logica pensada para ordenar los estadoTrenes segun el atributo que apreta el usuario, todavian no hecha */ }
      <EstadoTrenList estadoTrenes={estadoTrenes} handleAscOrder={handleAscOrder} ascOrder={ascOrder} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} handleEdit={handleEdit} deleteMutation={deleteMutation}/>
      
      {
        showModal &&
        <Modal onClose={() => setShowModal(false)} title={(estadoTrenToEdit.current ? 'Editar' : 'Crear') + ' EstadoTren'}>
          <EstadoTrenForm onSuccess={() => setShowModal(false)} estadoTrenToEdit={estadoTrenToEdit.current} />
        </Modal>
      }
    </div>

  )
}
