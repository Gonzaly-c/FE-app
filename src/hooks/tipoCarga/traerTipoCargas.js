import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useTipoCargasQuery () {
  return (useQuery({
    queryKey: ['tipoCargasQuery'],
    queryFn: async () => {
      const res = await api.get('/tipoCarga', { withCredentials: true })
      return res.data.data 
    }
  }))
}

export function traerTipoCargasQuery () {
  return useQuery({
    queryKey: ['tipoCargas'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/tipoCarga')
      return res.data.items.filter(item => item.estado === 'Activo') || [] // ajusta según tu backend
    }
  })
}