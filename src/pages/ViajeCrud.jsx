import { Modal } from '../components/Modal.jsx'
import { ViajeForm } from '../components/viaje/ViajeForm.jsx'
import { ViajeList } from '../components/viaje/ViajeList.jsx'
import { useViajeCrud } from '../hooks/viaje/useViajeCrud.js'
import { useQueryClient } from '@tanstack/react-query'

export function ViajeCrud() {
  const queryClient = useQueryClient()
  const {
    viajes,
    showModal,
    setShowModal,
    viajeToEdit,
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
  } = useViajeCrud()

  if (isLoading) return <h1 className='text-center'>Cargando..</h1>

  if (isError) return <h1>{error}</h1>

  return (
    <div>
      <h1 className='h1 mt-2 text-center'>Lista de Viajes</h1>

      <div className='d-flex justify-content-between mb-4'>
        <button
          className='btn btn-info'
          onClick={handleCreate}
        >
          Crear un viaje
        </button>

        <div className='input-group w-auto'>
          <p role='button' onClick={async () => {document.getElementById("findOneInput").value = ''; await queryClient.invalidateQueries({queryKey: ['viajesInfinite']})}}>X</p>
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
      {/* Logica pensada para ordenar los viajes segun el atributo que apreta el usuario, todavian no hecha */ }
      <ViajeList viajes={viajes} handleAscOrder={handleAscOrder} ascOrder={ascOrder} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} handleEdit={handleEdit} deleteMutation={deleteMutation}/>
      
      {
        showModal &&
        <Modal onClose={() => setShowModal(false)} title={(viajeToEdit.current ? 'Editar' : 'Crear') + ' Viaje'}>
          <ViajeForm onSuccess={() => setShowModal(false)} viajeToEdit={viajeToEdit.current} />
        </Modal>
      }
    </div>

  )
}
