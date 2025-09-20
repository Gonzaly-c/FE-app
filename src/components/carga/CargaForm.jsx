import { useForm } from 'react-hook-form'
import { useCargaPost } from '../../hooks/carga/useCargaPost'
import { useCargaPut } from '../../hooks/carga/useCargasPut'

export function CargaForm({ onSuccess, cargaToEdit }) {
    const { register, formState: { errors }, handleSubmit, isPending: isPendingForm } = useForm({ mode: 'onBlur' })
    const { mutateAsync: handlePost, isError: isErrorPost } = useCargaPost()
    const { mutateAsync: handlePut, isError: isErrorPut } = useCargaPut() 

    const onSubmit = async(formData) =>{
        const carga = {
            name: formData.name,
            tara: formData.tara,
            tipoCarga: formData.tipoCarga,
        }

        if(cargaToEdit){
            carga.id = cargaToEdit.id
            await handlePut(carga)
            
            if(!isErrorPut) onSuccess()
            return
        }

        await handlePost(carga)
        
        if(!isErrorPost) onSuccess()
        return
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
                <label className='form-label' htmlFor='name'>Nombre:</label>
                <input
                id='name' type='text' {...register('name', { required: 'El nombre es requerido'
                , value: cargaToEdit ? cargaToEdit.name : ''})}
                className='form-control' placeholder='Nombre de la carga'
                />
                {errors.name && <span className='text-danger'>{errors.name.message}</span>}
            </div>

            <div className='mb-1'>
            <label className='form-label' htmlFor='tara'>
                Tara: 
            </label>
            <input
                id='tara'
                type='text'
                defaultValue={cargaToEdit?.tara || ''}
                {...register('tara', {
                required: 'La tara es requerida',
                validate: (value) =>
                    /^\d+$/.test(value) || 'Solo se permite número enteros'
                })}
                className='form-control'
                placeholder='Tara de la carga'
            />
            {errors.tara && (
                <span className='text-danger'>{errors.tara.message}</span>
            )}
            </div>
            
            <div className='mb-1'>
                <label className='form-label' htmlFor='tipoCarga'>Tipo de carga:</label>
                <input
                id='tipoCarga' type='text' {...register('tipoCarga', { required: 'El Tipo de carga es requerido'
                , value: cargaToEdit ? cargaToEdit.tipoCarga : ''})}
                className='form-control' placeholder='Tipo de carga de la carga'
                />
                {errors.name && <span className='text-danger'>{errors.name.message}</span>}
            </div>

            <div className='d-flex justify-content-between'>
                <button className="btn btn-secondary" onClick={onSuccess}>
                    Volver
                </button>
                
                <button type='submit' className='btn btn-success d-block mt-2' style={{ backgroundTara: '#002050ff', tara: '#fff' }}>
                {isPendingForm? 'Enviando...' : 'Enviar'}
                </button>
            </div>

            {isErrorPost && <span className='text-danger'>Error al crear el carga</span>}
            {isErrorPut && <span className='text-danger'>Error al actualizar el carga</span>}       
        </form>
    )
}