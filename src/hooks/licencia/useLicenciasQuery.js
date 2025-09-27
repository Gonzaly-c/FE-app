import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'

export function useLicenciasQuery () {
  return (useQuery({
    queryKey: ['licenciasQuery'],
    queryFn: async () => {
      const res = await api.get('/licencia', { withCredentials: true })
      return res.data.data
    }
  }))
}
