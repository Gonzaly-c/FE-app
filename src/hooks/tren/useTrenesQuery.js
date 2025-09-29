import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useTrenesQuery () {
  return (useQuery({
    queryKey: ['trenesQuery'],
    queryFn: async () => {
      const res = await api.get('/tren', { withCredentials: true })
      return res.data.data
    }
  }))
}
export function traerTrenesQuery () {
  return useQuery({
    queryKey: ['trenes'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/tren')
      return res.data.items || [] // ajusta según tu backend
    }
  })
}

