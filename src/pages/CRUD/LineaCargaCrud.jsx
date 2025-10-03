import { Modal } from '../../components/Modal.jsx'
import { LineaCargaForm } from '../../components/lineaCarga/LineaCargaForm.jsx'
import { LineaCargaList } from '../../components/lineaCarga/LineaCargaList.jsx'
import { useLineaCargaCrud } from '../../hooks/lineaCarga/useLineaCargaCrud.js'
import { useQueryClient } from '@tanstack/react-query'

export function LineaCargaCrud() {
  const queryClient = useQueryClient()
  const {
    lineaCargas,
    showModal,
    setShowModal,
    lineaCargaToEdit,
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
  } = useLineaCargaCrud()

  if (isLoading) return <h1 className='text-center'>Cargando..</h1>

  if (isError) return <h1>{error}</h1>

  return (
    <div>
      <h1 className='h1 mt-2 text-center'>Lista de LineaCargas</h1>

      <div className='d-flex justify-content-between mb-4'>
        <button
          className='btn btn-info'
          onClick={handleCreate}
        >
          Crear una LineaCarga
        </button>

        <div className='input-group w-auto'>
          <p role='button' onClick={async () => { document.getElementById('findOneInput').value = ''; await queryClient.invalidateQueries({ queryKey: ['lineaCargasInfinite'] }) }}>X</p>
          <input
            type='number'
            className='form-control'
            placeholder='Buscar por id'
            id='findOneInput'
          />
          <span role='button' className='input-group-text' onClick={() => handleFilter(document.getElementById('findOneInput').value)}>
            🔍
          </span>
        </div>
      </div>
      {/* Logica pensada para ordenar los LineaCargas segun el atributo que apreta el usuario, todavia no hecha */}
      <LineaCargaList lineaCargas={lineaCargas} handleAscOrder={handleAscOrder} ascOrder={ascOrder} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} handleEdit={handleEdit} deleteMutation={deleteMutation} />

      {
        showModal &&
        <Modal onClose={() => setShowModal(false)} title={(lineaCargaToEdit.current ? 'Editar' : 'Crear') + ' LineaCarga'}>
          <LineaCargaForm onSuccess={() => setShowModal(false)} lineaCargaToEdit={lineaCargaToEdit.current} />
        </Modal>
      }
    </div>

  )
}
