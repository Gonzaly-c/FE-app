import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'

export function useRecorridosQuery () {
  return (useQuery({
    queryKey: ['recorridosQuery'],
    queryFn: async () => {
      const res = await api.get('/recorrido', { withCredentials: true })
      return res.data.data
    }
  }))
}

