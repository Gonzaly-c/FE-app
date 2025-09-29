import { api } from '../services/api'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'

//Tipo Cargas
export function TipoCargaFindAll() { //Obtiene todos los tipos de cargas
  return (useQuery({
    queryKey: ['tipoCargaFindAll'],
    queryFn: async () => {
      const res = await api.get('/tipoCarga', { withCredentials: true })
      return res.data.items
    }
  }))
}

export function TipoCargaGetOne(){ //Obtiene un tipo de carga por ID
  return useMutation({
    mutationKey: ['tipoCargaGetOne'],
    mutationFn: async (tipoCargaId) => {
      console.log(`/tipoCarga/${tipoCargaId}`)
      const tipoCarga = await api.get(`/tipoCarga/${tipoCargaId}`, { withCredentials: true })
      return tipoCarga.data.items
    },
  })
}

export function TipoCargaActivos() { //Obtiene todos los tipos de cargas activos
  return useQuery({
    queryKey: ['tipoCargas'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/tipoCarga')
      return res.data.items.filter(item => item.estado === 'Activo') 
    }
  })
}

//Categoria Denuncias
export function CategoriaDenunciaFindAll() { //Obtiene todas las categorias de denuncias
  return (useQuery({
    queryKey: ['categoriaDenunciaFindAll'],
    queryFn: async () => {
      const res = await api.get('/categoriaDenuncia', { withCredentials: true })
      return res.data.items
    }
  }))
}

export function CategoriaDenunciaGetOne(){ //Obtiene una categoria de denuncia por ID
  return useMutation({
    mutationKey: ['categoriaDenunciaGetOne'],
    mutationFn: async (categoriaDenunciaId) => {
      console.log(`/categoriaDenuncia/${categoriaDenunciaId}`)
      const categoriaDenuncia = await api.get(`/categoriaDenuncia/${categoriaDenunciaId}`, { withCredentials: true })
      return categoriaDenuncia.data.items
    },
  })
}

export function CategoriaDenunciaActivas() { //Obtiene todas las categorias de denuncias activas
  return useQuery({
    queryKey: ['categoriaDenuncias'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/categoriaDenuncia')
      return res.data.items.filter(item => item.estado === 'Activo') 
    }
  })
}

//Conductores
export function ConductorFindAll() { //Obtiene todos los conductores
  return (useQuery({
    queryKey: ['conductorFindAll'],
    queryFn: async () => {
      const res = await api.get('/conductor', { withCredentials: true })
      return res.data.items
    }
  }))
}

export function ConductorGetOne () { //Obtiene un conductor por ID
  return useMutation({
    mutationKey: ['conductorGetOne'],
    mutationFn: async (conductorId) => {
      console.log(`/conductor/${conductorId}`)
      const conductor = await api.get(`/conductor/${conductorId}`, { withCredentials: true })
      return conductor.data.items
    }
  })
}

export function ConductorActivos() { //Obtiene todos los conductores activos
  return useQuery({
    queryKey: ['conductorActivos'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/conductor')
      return res.data.items.filter(item => item.estado === 'Activo') 
    }
  })
}

export function ConductorPendientes() { //Obtiene todos los conductores pendientes
  return useQuery({
    queryKey: ['conductorPendientes'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/conductor')
      return res.data.items.filter(item => item.estado === 'Pendiente') 
    }
  })
}

export function ConductorInactivos() { //Obtiene todos los conductores inactivos
  return useQuery({
    queryKey: ['conductorInactivos'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/conductor')
      return res.data.items.filter(item => item.estado === 'Inactivo') 
    }
  })
}

export function ConductorValidoViaje() { //Obtiene todos los conductores validos para un viaje
  return useQuery({
    queryKey: ['conductorValidoViaje'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/conductor')
      return res.data.items.filter(item => {
        return item.licencias.some(licencia => new Date(licencia.fechaVencimiento) > new Date()) // se puede agregar item.estado === 'Activo' && para la validacion (no esta agregado porque se podria haber hecho un viaje con un conductor que actualmente este inactivo)
      })
    }
  })
}

//Estado Trenes
export function EstadoTrenFindAll() { //Obtiene todos los estados de trenes
  return (useQuery({
    queryKey: ['estadoTrenFindAll'],
    queryFn: async () => {
      const res = await api.get('/estadoTren', { withCredentials: true })
      return res.data.items 
    }
  }))
}

export function EstadoTrenGetOne(){ //Obtiene un estado de tren por ID
  return useMutation({
    mutationKey: ['estadoTrenGetOne'],
    mutationFn: async (estadoTrenId) => {
      console.log(`/estadoTren/${estadoTrenId}`)
      const estadoTren = await api.get(`/estadoTren/${estadoTrenId}`, { withCredentials: true })
      return estadoTren.data.items
    },
  })
}

export function EstadoTrenActivos() { //Obtiene todos los estados de trenes activos
  return useQuery({
    queryKey: ['estadoTrenActivos'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/estadoTren')
      return res.data.items.filter(item => item.estado === 'Activo') 
    }
  })
}

//Cargas
export function CargaFindAll() { //Obtiene todas las cargas
  return (useQuery({
    queryKey: ['cargaFindAll'],
    queryFn: async () => {
      const res = await api.get('/carga', { withCredentials: true })
      return res.data.items
    }
  }))
}

export function CargaGetOne(){ //Obtiene una carga por ID
  return useMutation({
    mutationKey: ['cargaGetOne'],
    mutationFn: async (cargaId) => {
      console.log(`/carga/${cargaId}`)
      const carga = await api.get(`/carga/${cargaId}`, { withCredentials: true })
      return carga.data.items
    },
  })
}

export function CargaActivos() { //Obtiene todos las cargas activas
  return useQuery({
    queryKey: ['CargaActivos'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/carga')
      return res.data.items.filter(item => item.estado === 'Activo') 
    }
  })
}

//Licencias
export function LicenciaFindAll () { //Obtiene todas las licencias
  return (useQuery({
    queryKey: ['licenciaFindAll'],
    queryFn: async () => {
      const res = await api.get('/licencia', { withCredentials: true })
      return res.data.items
    }
  }))
}

export function LicenciaGetOne () { //Obtiene una licencia por ID
  return useMutation({
    mutationKey: ['licenciaGetOne'],
    mutationFn: async (licenciaId) => {
      console.log(`/licencia/${licenciaId}`)
      const licencia = await api.get(`/licencia/${licenciaId}`, { withCredentials: true })
      return licencia.data.items
    }
  })
}

export function LicenciaActivos () { //Obtiene todas las licencias activas
  return (useQuery({
    queryKey: ['licenciaActivos'],
    queryFn: async () => {
      const res = await api.get('/licencia', { withCredentials: true })
      return res.data.items.filter(item => item.estado === 'Activo') 
    }
  }))
}

//Recorridos
export function RecorridoFindAll () { //Obtiene todos los recorridos
  return (useQuery({
    queryKey: ['recorridoFindAll'],
    queryFn: async () => {
      const res = await api.get('/recorrido', { withCredentials: true })
      return res.data.items
    }
  }))
}

export function RecorridoGetOne(){ //Obtiene un recorrido por ID
  return useMutation({
    mutationKey: ['recorridoGetOne'],
    mutationFn: async (recorridoId) => {
      console.log(`/recorrido/${recorridoId}`)
      const recorrido = await api.get(`/recorrido/${recorridoId}`, { withCredentials: true })
      return recorrido.data.items
    },
  })
}

export function RecorridoActivos () { //Obtiene todos los recorridos activos
  return (useQuery({
    queryKey: ['recorridoActivos'],
    queryFn: async () => {
      const res = await api.get('/recorrido', { withCredentials: true })
      return res.data.items.filter(item => item.estado === 'Activo')
    }
  }))
}

//Trenes
export function TrenFindAll() { //Obtiene todos los trenes
  return (useQuery({
    queryKey: ['trenFindAll'],
    queryFn: async () => {
      const res = await api.get('/tren', { withCredentials: true })
      return res.data.items
    }
  }))
}

export function TrenGetOne(){ //Obtiene un tren por ID
return useMutation({
    mutationKey: ['trenGetOne'],
    mutationFn: async (trenId) => {
    console.log(`/tren/${trenId}`)
    const tren = await api.get(`/tren/${trenId}`, { withCredentials: true })
    return tren.data.items
    },
})
}

export function TrenActivos() { //Obtiene todos los trenes activos (falta validar que funciona)
  return (useQuery({
    queryKey: ['trenActivos'],
    queryFn: async () => {
      const res = await api.get('/tren', { withCredentials: true })
      return res.data.items.filter(item => item.estadoActual?.nombre === 'Disponible');
    }
  }))
}

//Viajes
export function ViajeFindAll() { //Obtiene todos los viajes
  return (useQuery({
    queryKey: ['viajeFindAll'],
    queryFn: async () => {
      const res = await api.get('/viaje', { withCredentials: true })
      return res.data.items
    }
  })) 
}

export function ViajeGetOne(){ //Obtiene un viaje por ID
  return useMutation({
    mutationKey: ['viajeGetOne'],
    mutationFn: async (viajeId) => {
      console.log(`/viaje/${viajeId}`)
      const viaje = await api.get(`/viaje/${viajeId}`, { withCredentials: true })
      return viaje.data.items
    },
  }) 
}

