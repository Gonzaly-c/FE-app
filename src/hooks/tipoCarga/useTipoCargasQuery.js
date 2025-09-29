import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'

export function useTipoCargasQuery () {
  return (useQuery({
    queryKey: ['tipoCargasQuery'],
    queryFn: async () => {
      const res = await api.get('/tipoCarga', { withCredentials: true })
      return res.data.data
    }
  }))
}

