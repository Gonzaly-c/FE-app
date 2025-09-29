import { Modal } from '../components/Modal.jsx'
import { CategoriaDenunciaForm } from '../components/categoriaDenuncia/CategoriaDenunciaForm.jsx'
import { CategoriaDenunciaList } from '../components/categoriaDenuncia/CategoriaDenunciaList.jsx'
import { useCategoriaDenunciaCrud } from '../hooks/categoriaDenuncia/useCategoriaDenunciaCrud.js'
import { useQueryClient } from '@tanstack/react-query'

export function CategoriaDenunciaCrud() {
  const queryClient = useQueryClient()
  const {
    categoriaDenuncias,
    showModal,
    setShowModal,
    categoriaDenunciaToEdit,
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
  } = useCategoriaDenunciaCrud()


  if (isLoading) return <h1 className='text-center'>Cargando..</h1>

  if (isError) return <h1>{error}</h1>

  return (
    <div>
      <h1 className='h1 mt-2 text-center'>Lista de Categoria de Denuncias</h1>

      <div className='d-flex justify-content-between mb-4'>
        <button
          className='btn btn-info'
          onClick={handleCreate}
        >
          Crear una Categoria Denuncia
        </button>

        <div className='input-group w-auto'>
          <p role='button' onClick={async () => {document.getElementById("findOneInput").value = ''; await queryClient.invalidateQueries({queryKey: ['categoriaDenunciasInfinite']})}}>X</p>
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
      {/* Logica pensada para ordenar los categoriaDenuncias segun el atributo que apreta el usuario, todavian no hecha */ }
      <CategoriaDenunciaList categoriaDenuncias={categoriaDenuncias} handleAscOrder={handleAscOrder} ascOrder={ascOrder} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} handleEdit={handleEdit} deleteMutation={deleteMutation}/>
      
      {
        showModal &&
        <Modal onClose={() => setShowModal(false)} title={(categoriaDenunciaToEdit.current ? 'Editar' : 'Crear') + ' CategoriaDenuncia'}>
          <CategoriaDenunciaForm onSuccess={() => setShowModal(false)} categoriaDenunciaToEdit={categoriaDenunciaToEdit.current} />
        </Modal>
      }
    </div>

  )
}
