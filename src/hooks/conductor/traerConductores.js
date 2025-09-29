import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useConductoresQuery () {
  return (useQuery({
    queryKey: ['conductoresQuery'],
    queryFn: async () => {
      const res = await api.get('/conductor', { withCredentials: true })
      return res.data.data
    }
  }))
}

export function traerConductoresQuery () {
  return useQuery({
    queryKey: ['conductores'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/conductor')
      return res.data.items.filter(item => item.estado === 'Activo') || [] // ajusta según tu backend
    }
  })
}
