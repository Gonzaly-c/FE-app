import { useEffect, useState, useRef } from 'react'
//import { useTrenesQuery } from '../hooks/tren/useTrenesQuery'
import { useTrenesDelete } from '../hooks/tren/useTrenesDelete'
import { Modal } from '../components/Modal'
import { TrenForm } from '../components/tren/TrenForm.jsx'
import { useTrenesInfinite } from '../hooks/tren/infinityScrollTren.js'
import { TrenList } from '../components/tren/TrenList.jsx'

export function TrenCrud() {
  const [trenes, setTrenes] = useState([])
  const [orderedTrenes, setOrderedTrenes] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const trenToEdit = useRef(null) // variable para menejar si es edicion o creacion
  // const { data: trenes, isLoading, isError, error } = useTrenesQuery()
  const { mutateAsync: deleteMutation } = useTrenesDelete()
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useTrenesInfinite()

  useEffect(() => {
    setTrenes(data?.pages.flatMap(page => page.items) ?? [])
    // logica que va a ser necesaria para hacer filtrados locales
  }, [data])

  const handleFilter = () => {
    // if(e.target.value === '') setTrenes(data?.pages.flatMap(page => page.items) ?? [])
    // else(setTrenes(
    //   trenes.filter((tren) => tren.id.toString().includes(e.target.value))
    // ))
    alert('No implementado en backend aún')
  }

  const handleEdit = (tren) => {
    trenToEdit.current = tren
    setShowModal(true)
  }

  const handleCreate = () => {
    trenToEdit.current = null
    setShowModal(true)
  }

  if (isLoading) return <h1 className='text-center'>Cargando..</h1>

  if (isError) return <h1>{error}</h1>

  return (
    <div>
      <h1 className='h1 mt-2 text-center'>Lista de Trenes</h1>

      <div className='d-flex justify-content-between mb-4'>
        <button
          className='btn btn-info'
          onClick={handleCreate}
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
      {/* Logica pensada para ordenar los trenes segun el atributo que apreta el usuario, todavian no hecha */ }
      <TrenList trenes={orderedTrenes? orderedTrenes:trenes} setOrderedTrenes={setOrderedTrenes} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} handleEdit={handleEdit} deleteMutation={deleteMutation}/>
      
      {
        showModal &&
        <Modal onClose={() => setShowModal(false)} title={(trenToEdit.current ? 'Editar' : 'Crear') + ' Tren'}>
          <TrenForm onSuccess={() => setShowModal(false)} trenToEdit={trenToEdit.current} />
        </Modal>
      }
    </div>

  )
}
