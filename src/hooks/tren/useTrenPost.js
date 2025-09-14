import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'

export function useTrenPost () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['trenPost'],
    mutationFn: async (tren) => {
      await api.post('/tren', tren, { withCredential: true })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['trenesQuery'])
    }
  })
}
