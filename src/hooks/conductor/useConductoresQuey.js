import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'

export function useConductoresQuery () {
  return (useQuery({
    queryKey: ['conductoresQuery'],
    queryFn: async () => {
      const res = await api.get('/conductor', { withCredentials: true })
      return res.data.data
    }
  }))
}
