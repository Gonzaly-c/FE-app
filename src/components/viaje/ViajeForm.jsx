import { useForm } from 'react-hook-form'
import { useViajePost } from '../../hooks/viaje/useViajePost'
import { useViajePut } from '../../hooks/viaje/useViajesPut'
import { RecorridoActivos, TrenActivos, ConductorValidoViaje} from '../../hooks/Querys.js'

export function ViajeForm({ onSuccess, viajeToEdit }) {
    const { register, formState: { errors }, handleSubmit, isPending: isPendingForm, watch } = useForm({ mode: 'onBlur' })
    const { mutateAsync: handlePost, isError: isErrorPost } = useViajePost()
    const { mutateAsync: handlePut, isError: isErrorPut } = useViajePut() 
    const { data: recorridos = [] } = RecorridoActivos()
    const { data: conductores = [] } = ConductorValidoViaje()    
    const { data: trenes = [] } = TrenActivos()
    
    const onSubmit = async(formData) =>{
        const viaje = {
            fechaIni: formData.fechaIni,
            fechaFin: formData.fechaFin,
            estado: formData.estado,
            idTren: Number(formData.idTren),
            idRecorrido: Number(formData.idRecorrido),
            idConductor: Number(formData.idConductor),
        }
        
        
        const fechaIni = new Date(formData.fechaIni);
        const fechaFin = new Date(formData.fechaFin);

        const conductor = conductores.find(c => c.id === Number(formData.idConductor));
        if (!conductor) {
        alert('Conductor no válido');
        return;
        }

        // Validar que no tenga viajes en el rango
        const tieneViajeEnRango = conductor.viajes.filter(c => c.estado === 'Activo' && (!viajeToEdit || c.id !== viajeToEdit.id)).some(v => {
        const inicio = new Date(v.fechaIni);
        const fin = new Date(v.fechaFin);
        return (
            (inicio <= fechaFin && fin >= fechaIni) || // se solapan
            (inicio <= fechaIni && fin >= fechaFin)    // cubre todo el rango
        );
        });

        if (tieneViajeEnRango) {
        alert('El conductor ya tiene un viaje en ese rango de fechas');
        return;
        }

        const tren = trenes.find(c => c.id === Number(formData.idTren));
        if (!tren) {
        alert('Tren no válido');
        return;
        }

        // Validar que no tenga viajes en el rango
        
        
        const tieneTrenViajeEnRango = tren.viajes
        .filter(v => v.estado === 'Activo' && (!viajeToEdit || v.id !== viajeToEdit.id))
        .some(v => {
            const inicio = new Date(v.fechaIni);
            const fin = new Date(v.fechaFin);
            return (
            (inicio <= fechaFin && fin >= fechaIni) ||
            (inicio <= fechaIni && fin >= fechaFin)
            );
        });



        if (tieneTrenViajeEnRango) {
        alert('El Tren ya tiene un viaje en ese rango de fechas');
        return;
        }

        if(viajeToEdit){
            viaje.id = viajeToEdit.id
            await handlePut(viaje)
            
            if(!isErrorPut) onSuccess()
            return
        }

        await handlePost(viaje)
        
        if(!isErrorPost) onSuccess()
        return
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-3'>
                <label className='form-label'>Conductor</label>
                <select
                {...register('idConductor', { required: 'El conductor es requerido' })}
                className='form-control'
                defaultValue={viajeToEdit?.conductor?.id || ''}
                >
                <option value=''>Selecciona un conductor</option>
                {conductores.map(c => (
                    <option key={c.id} value={c.id}>
                    {c.id}-{c.nombre} {c.apellido} {/* el usuario ve nombre completo */}
                    </option>
                ))}
                </select>
                {errors.idConductor && <span className='text-danger'>{errors.idConductor.message}</span>}
            </div>

            <div className='mb-3'>
                <label className='form-label'>Trenes</label>
                <select
                {...register('idTren', { required: 'El Tren es requerido' })}
                className='form-control'
                defaultValue={viajeToEdit?.tren?.id || ''}
                >
                
                <option value="">Selecciona un Tren</option>
                {trenes.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.id}-{c.modelo} (color: {c.color})
                    </option>

                ))}
                </select>
                {errors.idTren && <span className='text-danger'>{errors.idTren.message}</span>}
            </div>

            <div className='mb-3'>
                <label className='form-label'>Recorridos</label>
                <select
                {...register('idRecorrido', { required: 'El Recorrido es requerido' })}
                className='form-control'
                defaultValue={viajeToEdit?.recorrido?.id || ''}
                >
                
                <option value="">Selecciona un Recorrido</option>
                {recorridos.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.id}-(Salida: {c.ciudadSalida}) (Llegada: {c.ciudadLlegada})
                    </option>

                ))}
                </select>
                {errors.idRecorrido && <span className='text-danger'>{errors.idRecorrido.message}</span>}
            </div>

            <div className='mb-1'>
                <label className='form-label' htmlFor='fechaIni'>Fecha Inicio:</label>
                <input
                id='fechaIni' type='date' {...register('fechaIni', { required: 'La fecha de inicio es requerida'}
                    )}
                className='form-control' placeholder='Fecha de inicio'
                defaultValue={viajeToEdit?.fechaIni ? viajeToEdit.fechaIni.slice(0, 10): ''}
                />
                {errors.fechaIni && <span className='text-danger'>{errors.fechaIni.message}</span>}
            </div>

            <div className='mb-1'>
                <label className='form-label' htmlFor='fechaFin'>Fecha de Llegada:</label>
                <input
                id='fechaFin' type='date' {...register('fechaFin', { required: 'La fecha de llegada es requerida', 
                    validate: (value) => {
                        const fechaIni = new Date(watch('fechaIni'));
                        const fechaFin = new Date(value);
                        return fechaFin >= fechaIni || 'La fecha de llegada debe ser posterior o igual a la de inicio';
                }})}
                className='form-control' placeholder='Fecha de llegada'
                defaultValue={viajeToEdit?.fechaFin ? viajeToEdit.fechaFin.slice(0, 10): ''}

                />
                {errors.fechaFin && <span className='text-danger'>{errors.fechaFin.message}</span>}
            </div>
            {/* Uno con validacion para que la fecha sea >= Hoy
            <input
                id="fechaFin"
                type="date"
                {...register('fechaFin', {
                    required: 'La fecha de llegada es requerida',
                    validate: (value) => {
                    const fechaIni = new Date(watch('fechaIni'));
                    const fechaFin = new Date(value);
                    const hoy = new Date();
                    hoy.setHours(0, 0, 0, 0); // para comparar solo la fecha

                    if (fechaFin < fechaIni) {
                        return 'La fecha de llegada debe ser posterior o igual a la de inicio';
                    }

                    if (fechaFin < hoy) {
                        return 'La fecha de llegada no puede ser anterior a hoy';
                    }

                    return true;
                    },
                })}
                className="form-control"
                placeholder="Fecha de llegada"
                defaultValue={
                    viajeToEdit?.fechaFin ? viajeToEdit.fechaFin.slice(0, 10) : ''
                }
                />
                {errors.fechaFin && (
                <span className="text-danger">{errors.fechaFin.message}</span>
                )}
                */}

            <div className='mb-1'>
                <label className='form-label' htmlFor='estado'>Estado:</label>
                <select
                id='estado' {...register('estado', {
                    required: 'El estado es requerido',
                    value: viajeToEdit ? viajeToEdit.estado : ''
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
                
                <button type='submit' className='btn btn-success d-block mt-2' style={{ backgroundColor: '#002050ff', fechaFin: '#fff' }}>
                {isPendingForm? 'Enviando...' : 'Enviar'}
                </button>
            </div>

            {isErrorPost && <span className='text-danger'>Error al crear el viaje</span>}
            {isErrorPut && <span className='text-danger'>Error al actualizar el viaje</span>}       
        </form>
    )
}