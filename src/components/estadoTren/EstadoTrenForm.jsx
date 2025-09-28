import { useForm } from 'react-hook-form'
import { useEstadoTrenPost } from '../../hooks/estadoTren/useEstadoTrenPost'
import { useEstadoTrenPut } from '../../hooks/estadoTren/useEstadoTrenesPut'

export function EstadoTrenForm({ onSuccess, estadoTrenToEdit }) {
    const { register, formState: { errors }, handleSubmit, isPending: isPendingForm } = useForm({ mode: 'onBlur' })
    const { mutateAsync: handlePost, isError: isErrorPost } = useEstadoTrenPost()
    const { mutateAsync: handlePut, isError: isErrorPut } = useEstadoTrenPut() 

    const onSubmit = async(formData) =>{
        const estadoTren = {
            nombre: formData.nombre,
            fechaVigencia: formData.fechaVigencia,
            estado: formData.estado,
            idTren: Number(formData.idTren),
        }

        if(estadoTrenToEdit){
            estadoTren.id = estadoTrenToEdit.id
            await handlePut(estadoTren)
            
            if(!isErrorPut) onSuccess()
            return
        }

        await handlePost(estadoTren)
        
        if(!isErrorPost) onSuccess()
        return
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
                <label className='form-label' htmlFor='nombre'>Nombre:</label>
                <input
                id='nombre' type='text' {...register('nombre', { required: 'El nombre es requerido'
                , value: estadoTrenToEdit ? estadoTrenToEdit.nombre : ''})}
                className='form-control' placeholder='Nombre del estadoTren'
                />
                {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
            </div>

            <div className='mb-1'>
                <label className='form-label' htmlFor='fechaVigencia'>Fecha de Vigencia:</label>
                <input
                id='fechaVigencia' type='date' {...register('fechaVigencia', { required: 'La fecha de vigencia es requerida', value: estadoTrenToEdit ? estadoTrenToEdit.fechaVigencia : '' })}
                className='form-control' placeholder='Fecha de vigencia'
                />
                {errors.fechaVigencia && <span className='text-danger'>{errors.fechaVigencia.message}</span>}
            </div>

            <div className='mb-1'>
                <label className='form-label' htmlFor='idTren'>Numero del Tren:</label>
                <input
                id='idTren' type='text' {...register('idTren', { required: 'El numero del tren es requerido'
                , value: estadoTrenToEdit ? estadoTrenToEdit.tren : ''})}
                className='form-control' placeholder='Numero del tren'
                />
                {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
            </div>

            <div className='mb-1'>
                <label className='form-label' htmlFor='estado'>Estado:</label>
                <select
                id='estado' {...register('estado', {
                    required: 'El estado es requerido',
                    value: estadoTrenToEdit ? estadoTrenToEdit.estado : ''
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
                <button type='button' className="btn btn-secondary" onClick={onSuccess}>
                    Volver
                </button>
                
                <button type='submit' className='btn btn-success d-block mt-2' style={{ backgroundColor: '#002050ff', desc: '#fff' }}>
                {isPendingForm? 'Enviando...' : 'Enviar'}
                </button>
            </div>

            {isErrorPost && <span className='text-danger'>Error al crear el estadoTren</span>}
            {isErrorPut && <span className='text-danger'>Error al actualizar el estadoTren</span>}       
        </form>
    )
}