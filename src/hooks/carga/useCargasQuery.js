import { api } from '../../services/api.js'
import { useQuery } from '@tanstack/react-query'

export function useCargasQuery () {
  return (useQuery({
    queryKey: ['cargasQuery'],
    queryFn: async () => {
      const res = await api.get('/carga', { withCredentials: true })
      return res.data.data
    }
  }))
}

