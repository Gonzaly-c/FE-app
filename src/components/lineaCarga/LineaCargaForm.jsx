import { useForm } from 'react-hook-form'
import { useLineaCargaPost } from '../../hooks/lineaCarga/useLineaCargaPost.js'
import { useLineaCargaPut } from '../../hooks/lineaCarga/useLineaCargasPut.js'
import { ViajeFindAll } from '../../hooks/viaje/useViajeQuery.js'
import { CargaActivos } from '../../hooks/carga/useCargaQuery.js'
import { LineaCargaFindAll } from '../../hooks/lineaCarga/useLineaCargaQuery.js'

export function LineaCargaForm ({ onSuccess, lineaCargaToEdit }) {
  const { data: cargas = [] } = CargaActivos()

  const { register, formState: { errors }, handleSubmit, isPending: isPendingForm } = useForm({
    mode: 'onBlur',
    defaultValues: lineaCargaToEdit
      ? {
          estado: lineaCargaToEdit.estado,
          idViaje: lineaCargaToEdit.viaje?.id,
          idCarga: lineaCargaToEdit.carga?.id,
          cantidadVagon: lineaCargaToEdit.cantidadVagon,
        }
      : {},
  });

  const { mutateAsync: handlePost, isError: isErrorPost } = useLineaCargaPost()
  const { mutateAsync: handlePut, isError: isErrorPut } = useLineaCargaPut()
  const { data: viajes = [] } = ViajeFindAll()
  const { data: todasLasLineas = [] } = LineaCargaFindAll()

  const onSubmit = async (formData) => {
    const lineaCarga = {
          estado: formData.estado,
          idViaje: Number(formData.idViaje),
          idCarga: Number(formData.idCarga),
          cantidadVagon: Number(formData.cantidadVagon),
        }
        
    const yaExiste = todasLasLineas.some(
        (lc) => lc.viaje?.id === lineaCarga.idViaje && lc.carga?.id === lineaCarga.idCarga
      )

      if (!lineaCargaToEdit && yaExiste) {
        alert('Ya existe una línea de carga con ese viaje y carga.')
        return
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
        <label className='form-label'>Viaje:</label>
        <select
          {...register('idViaje', { required: 'El "Viaje" es requerido' })}
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
        <label className='form-label'>Carga:</label>
        <select
          {...register('idCarga', { required: 'La "Carga" es requerida' })}
          className='form-control'
          defaultValue={lineaCargaToEdit?.carga?.id || ''}
        >
          <option value=''>Selecciona una carga</option>
          {cargas.map(c => (
            <option key={c.id} value={c.id}>
              {c.id}-{c.name} {/* el usuario ve nombre completo */}
            </option>
          ))}
        </select>
        {errors.idCarga && <span className='text-danger'>{errors.idCarga.message}</span>}
      </div>


       <div className='mb-1'>
      <label className="form-label" htmlFor='cantidadVagon'>Cantidad de vagones:</label>
      <input
        
      {...register('cantidadVagon', {
          required: 'La "Cantidad de vagones" es obligatorio',
          pattern: {
            value: /^[1-9][0-9]*$/, // solo enteros positivos
            message: 'La "Cantidad de vagones" debe ser un número entero mayor a 0',
          },
        })}

        className="form-control"
        placeholder="La cantidad de vagones de la carga"
      />
      {errors.cantidadVagon && (
        <span className="text-danger">{errors.cantidadVagon.message}</span>
      )}
      </div>


      <div className='mb-1'>
                <label className='form-label' htmlFor='estado'>Estado:</label>
                <select
                id='estado' {...register('estado', {
                    required: 'El "Estado" es requerido',
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

      {isErrorPost && <span className='text-danger'>Error al crear la linea de carga</span>}
      {isErrorPut && <span className='text-danger'>Error al actualizar la linea de carga</span>}
    </form>
  )
}
