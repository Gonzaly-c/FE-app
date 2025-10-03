import { useForm } from 'react-hook-form'
import { useLineaCargaPost } from '../../hooks/lineaCarga/useLineaCargaPost.js'
import { useLineaCargaPut } from '../../hooks/lineaCarga/useLineaCargasPut.js'
import { CategoriaDenunciaActivas } from '../../hooks/categoriaDenuncia/useCategoriaDenunciaQuery.js'
import { ViajeFindAll } from '../../hooks/viaje/useViajeQuery.js'

export function LineaCargaForm ({ onSuccess, lineaCargaToEdit }) {
  const { data: categoriaDenuncias = [] } = CategoriaDenunciaActivas()

  const { register, formState: { errors }, handleSubmit, isPending: isPendingForm } = useForm({
    mode: 'onBlur',
    defaultValues: lineaCargaToEdit
      ? {
          lineaCargas: lineaCargaToEdit.lineaCargas,
          estado: lineaCargaToEdit.estado,
          idViaje: lineaCargaToEdit.viaje?.id,
          idCategoria: lineaCargaToEdit.categoriaDenuncia?.id,
        }
      : {},
  });

  const { mutateAsync: handlePost, isError: isErrorPost } = useLineaCargaPost()
  const { mutateAsync: handlePut, isError: isErrorPut } = useLineaCargaPut()
  const { data: viajes = [] } = ViajeFindAll()
  
  const onSubmit = async (formData) => {
    const lineaCarga = {
      lineaCargas: formData.lineaCargas,      
      estado: formData.estado,
      idViaje: Number(formData.idViaje),
      idCategoria: Number(formData.idCategoria)
    }

    if (lineaCargaToEdit) {
      lineaCarga.id = lineaCargaToEdit.id
      await handlePut(lineaCarga)

      if (!isErrorPut) onSuccess()
      return
    }

    await handlePost(lineaCarga)

    if (!isErrorPost) onSuccess()
    return
  }

  return (
    console.log(viajes),
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className='mb-3'>
        <label className='form-label'>Viaje</label>
        <select
          {...register('idViaje', { required: 'El viaje es requerido' })}
          className='form-control'
          defaultValue={lineaCargaToEdit?.viaje?.id || ''}
        >
          <option value=''>Selecciona un viaje</option>
          {viajes.map(c => (
            <option key={c.id} value={c.id}>
              {c.id}-{c.recorrido.ciudadSalida}/{c.recorrido.ciudadLlegada} ({c.fechaIni? new Date(new Date(c.fechaIni).getTime() + 3 * 60 * 60 * 1000).toLocaleDateString('es-AR'): 'Sin fecha'})
            </option>
          ))}
        </select>
        {errors.idViaje && <span className='text-danger'>{errors.idViaje.message}</span>}
      </div>

      <div className='mb-3'>
        <label className='form-label'>Categoria</label>
        <select
          {...register('idCategoria', { required: 'La categoria es requerida' })}
          className='form-control'
          defaultValue={lineaCargaToEdit?.categoria?.id || ''}
        >
          <option value=''>Selecciona una categoria</option>
          {categoriaDenuncias.map(c => (
            <option key={c.id} value={c.id}>
              {c.id}-{c.titulo} {/* el usuario ve nombre completo */}
            </option>
          ))}
        </select>
        {errors.idCategoria && <span className='text-danger'>{errors.idCategoria.message}</span>}
      </div>


      <div className='mb-3'>
        <label className='form-label' htmlFor='lineaCargas'>LineaCargas:</label>
        <textarea
          id='lineaCargas'
          {...register('lineaCargas', {
            required: 'La Observación es requerida',
            value: lineaCargaToEdit ? lineaCargaToEdit.lineaCargas : ''
          })}
          className='form-control'
          placeholder='Observación del viaje'
          rows={6}
          style={{ resize: 'vertical' }}
        />
        {errors.lineaCargas && <span className='text-danger'>{errors.lineaCargas.message}</span>}
      </div>


      <div className='mb-1'>
                <label className='form-label' htmlFor='estado'>Estado:</label>
                <select
                id='estado' {...register('estado', {
                    required: 'El estado es requerido',
                    value: lineaCargaToEdit ? lineaCargaToEdit.estado : ''
                })}
                className='form-select'
                >
                <option value=''>Seleccione un estado</option>
                <option value='Activo'>Activo</option>
                <option value='Inactivo'>Inactivo</option>
                </select>
                {errors.estado && <span className='text-danger'>{errors.estado.message}</span>}
            </div>

      <div className='d-flex justify-content-between'>
        <button type='button' className='btn btn-secondary' onClick={onSuccess}>
          Volver
        </button>

        <button type='submit' className='btn btn-success d-block mt-2' style={{ backgroundColor: '#002050ff', color: '#fff' }}>
          {isPendingForm ? 'Enviando...' : 'Enviar'}
        </button>
      </div>

      {isErrorPost && <span className='text-danger'>Error al crear la lineaCarga</span>}
      {isErrorPut && <span className='text-danger'>Error al actualizar la lineaCarga</span>}
    </form>
  )
}
