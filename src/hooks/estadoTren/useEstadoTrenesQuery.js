import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'

export function useEstadoTrenesQuery () {
  return (useQuery({
    queryKey: ['estadoTrenesQuery'],
    queryFn: async () => {
      const res = await api.get('/estadoTren', { withCredentials: true })
      return res.data.data
    }
  }))
}

