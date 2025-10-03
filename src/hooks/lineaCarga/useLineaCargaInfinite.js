import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from '../../services/api.js'

export function useLineaCargasInfinite () {
  return useInfiniteQuery({
    queryKey: ['lineaCargasInfinite'],
    queryFn: async ({ pageParam = null }) => {
      const res = await api.get('/lineaCarga', {
        params: { limit: 10, cursor: pageParam },
        withCredentials: true
      })
      return res.data.data
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined
    }
  })
}
