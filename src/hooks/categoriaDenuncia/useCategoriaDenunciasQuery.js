import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'

export function useCategoriaDenunciasQuery () {
  return (useQuery({
    queryKey: ['categoriaDenunciasQuery'],
    queryFn: async () => {
      const res = await api.get('/categoriaDenuncia', { withCredentials: true })
      return res.data.data
    }
  }))
}