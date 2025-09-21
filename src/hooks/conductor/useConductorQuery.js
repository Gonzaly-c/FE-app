import { useMutation } from '@tanstack/react-query'
import { api } from '../../services/api.js'

export function useConductorQuery () {
  return useMutation({
    mutationKey: ['conductorQuery'],
    mutationFn: async (conductorId) => {
      console.log(`/conductor/${conductorId}`)
      const conductor = await api.get(`/conductor/${conductorId}`, { withCredentials: true })
      return conductor.data.data
    }
  })
}
