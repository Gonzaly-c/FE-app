import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'

export function useTrenesQuery () {
  return (useQuery({
    queryKey: ['trenesQuery'],
    queryFn: async () => {
      const res = await api.get('/tren', { withCredentials: true })
      return res.data.data
    }
  }))
}
