import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useCategoriaDenunciasQuery () {
  return (useQuery({
    queryKey: ['categoriaDenunciasQuery'],
    queryFn: async () => {
      const res = await api.get('/categoriaDenuncia', { withCredentials: true })
      return res.data.data
    }
  }))
}

export function traerCategoriaDenunciasQuery () {
  return useQuery({
    queryKey: ['categoriaDenuncias'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/categoriaDenuncia')
      return res.data.items.filter(item => item.estado === 'Activo') || [] // ajusta según tu backend
    }
  })
}
