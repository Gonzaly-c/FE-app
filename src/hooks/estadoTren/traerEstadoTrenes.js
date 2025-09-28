import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useEstadoTrenesQuery () {
  return (useQuery({
    queryKey: ['estadoTrenesQuery'],
    queryFn: async () => {
      const res = await api.get('/estadoTren', { withCredentials: true })
      return res.data.data 
    }
  }))
}

export function traerEstadoTrenesQuery () {
  return useQuery({
    queryKey: ['estadoTrenes'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/estadoTren')
      return res.data.items.filter(item => item.estado === 'Activo') || [] // ajusta según tu backend
    }
  })
}