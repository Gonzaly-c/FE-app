import { useMutation } from '@tanstack/react-query'
import { api } from '../../services/api.js'

export function useLicenciaQuery () {
  return useMutation({
    mutationKey: ['licenciaQuery'],
    mutationFn: async (licenciaId) => {
      console.log(`/licencia/${licenciaId}`)
      const licencia = await api.get(`/licencia/${licenciaId}`, { withCredentials: true })
      return licencia.data.data
    }
  })
}
