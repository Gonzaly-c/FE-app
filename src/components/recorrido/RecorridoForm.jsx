import { useForm } from 'react-hook-form'
import { useRecorridoPost } from '../../hooks/recorrido/useRecorridoPost'
import { useRecorridoPut } from '../../hooks/recorrido/useRecorridosPut'

export function RecorridoForm({ onSuccess, recorridoToEdit }) {
    const { register, formState: { errors }, handleSubmit, isPending: isPendingForm } = useForm({ mode: 'onBlur' })
    const { mutateAsync: handlePost, isError: isErrorPost } = useRecorridoPost()
    const { mutateAsync: handlePut, isError: isErrorPut } = useRecorridoPut() 

    const onSubmit = async(formData) =>{
        const recorrido = {
            modelo: formData.modelo,
            color: formData.color,
        }

        if(recorridoToEdit){
            recorrido.id = recorridoToEdit.id
            await handlePut(recorrido)
            
            if(!isErrorPut) onSuccess()
            return
        }

        await handlePost(recorrido)
        
        if(!isErrorPost) onSuccess()
        return
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
                <label className='form-label' htmlFor='modelo'>Modelo:</label>
                <input
                id='modelo' type='text' {...register('modelo', { required: 'El modelo es requerido'
                , value: recorridoToEdit ? recorridoToEdit.modelo : ''})}
                className='form-control' placeholder='Modelo del recorrido'
                />
                {errors.modelo && <span className='text-danger'>{errors.modelo.message}</span>}
            </div>

            <div className='mb-1'>
                <label className='form-label' htmlFor='color'>Color:</label>
                <input
                id='color' type='text' {...register('color', { required: 'El color es requerido'
                , value: recorridoToEdit ? recorridoToEdit.color : ''})}
                className='form-control' placeholder='Color del recorrido'
                />
                {errors.color && <span className='text-danger'>{errors.color.message}</span>}
            </div>

            <div className='d-flex justify-content-between'>
                <button className="btn btn-secondary" onClick={onSuccess}>
                    Volver
                </button>
                
                <button type='submit' className='btn btn-success d-block mt-2' style={{ backgroundColor: '#002050ff', color: '#fff' }}>
                {isPendingForm? 'Enviando...' : 'Enviar'}
                </button>
            </div>

            {isErrorPost && <span className='text-danger'>Error al crear el recorrido</span>}
            {isErrorPut && <span className='text-danger'>Error al actualizar el recorrido</span>}       
        </form>
    )
}