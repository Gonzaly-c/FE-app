import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCargaPost } from '../../hooks/carga/useCargaPost';
import { useCargaPut } from '../../hooks/carga/useCargasPut';
import { traerTipoCargasQuery } from '../../hooks/tipoCarga/traerTipoCargas.js';


export function CargaForm({ onSuccess, cargaToEdit }) {
    const { data: tipoCargas = [] } = traerTipoCargasQuery()
    const {register, formState: { errors, isSubmitting: isPendingForm }, handleSubmit, reset, } = useForm({
    mode: 'onBlur',
    defaultValues: { name: '', tara: '', estado: '', idTipoCarga: '' },
  });
    const { mutateAsync: handlePost, isError: isErrorPost } = useCargaPost();
    const { mutateAsync: handlePut, isError: isErrorPut } = useCargaPut();

  // Precarga de valores cuando estamos editando (se mantiene de tu implementación actual)
  useEffect(() => {
    if (cargaToEdit) {
      reset({
        name: cargaToEdit.name ?? '',
        tara: String(cargaToEdit.tara ?? ''),
        estado: cargaToEdit.estado ?? '',
        idTipoCarga: cargaToEdit.tipoCarga?.id ?? '',
      });
    }
  }, [cargaToEdit, reset]);

  

  const onSubmit = async (formData) => {
    const payload = {
      name: formData.name,
      tara: Number(formData.tara),
      estado: formData.estado,
      idTipoCarga: Number(formData.idTipoCarga),
    };

    // Solo enviar idTipoCarga si se eligió uno
    if (formData.idTipoCarga !== '') {
      payload.idTipoCarga = Number(formData.idTipoCarga);
    }

    if (cargaToEdit) {
      payload.id = cargaToEdit.id;
      await handlePut(payload);
      if (!isErrorPut) onSuccess?.();
      return;
    }

    await handlePost(payload);
    if (!isErrorPost) onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Tipo de Carga */}
      <div className='mb-3'>
        <label className='form-label'>Tipo de Carga</label>
        <select
          {...register('idTipoCarga', { required: 'El Tipo de Carga es requerido' })}
          className='form-control'
          defaultValue={cargaToEdit?.tipoCarga?.id || ''}
        >
          
        <option value="">Selecciona un Tipo de Carga</option>
          {tipoCargas.map((c) => (
            <option key={c.id} value={c.id}>
              {c.id}-{c.name}
            </option>

          ))}
        </select>
        {errors.idTipoCarga && <span className='text-danger'>{errors.idTipoCarga.message}</span>}
      </div>
      {/* Nombre */}
      <div className='mb-1'>
                <label className='form-label' htmlFor='name'>Nombre:</label>
                <input
                id='name' type='text' {...register('name', { required: 'El nombre es requerido'
                , value: cargaToEdit ? cargaToEdit.name : ''})}
                className='form-control' placeholder='Nombre de la carga'
                />
                {errors.name && <span className='text-danger'>{errors.name.message}</span>}
        </div>

      {/* Tara */}
      <div className='mb-1'>
      <label className="form-label" htmlFor='tara'>Tara:</label>
      <input
        {...register('tara', {
          required: 'La tara es obligatoria',
          validate: (value) =>
            /^\d+$/.test(value) ? true : 'Solo se permiten números enteros',
        })}
        className="form-control"
        placeholder="Tara de la carga"
      />
      {errors.tara && (
        <span className="text-danger">{errors.tara.message}</span>
      )}
      </div>

      {/* Estado */}
    <div className='mb-1'>
                <label className='form-label' htmlFor='estado'>Estado:</label>
                <select
                id='estado' {...register('estado', {
                    required: 'El estado es requerido',
                    value: cargaToEdit ? cargaToEdit.estado : ''
                })}
                className='form-select'
                >
                <option value=''>Seleccione un estado</option>
                <option value='Activo'>Activo</option>
                <option value='Inactivo'>Inactivo</option>
                </select>
                {errors.estado && <span className='text-danger'>{errors.estado.message}</span>}
            </div>

      {/* Acciones */}
      <div className='d-flex justify-content-between'>
                <button type='button' className="btn btn-secondary" onClick={onSuccess}>
                    Volver
                </button>
                
                <button type='submit' className='btn btn-success d-block mt-2' style={{ backgroundColor: '#002050ff', desc: '#fff' }}>
                {isPendingForm? 'Enviando...' : 'Enviar'}
                </button>
            </div>

            {isErrorPost && <span className='text-danger'>Error al crear el tipoCarga</span>}
            {isErrorPut && <span className='text-danger'>Error al actualizar el tipoCarga</span>}   
    </form>
  );
}
