import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api.js";

export function useCargaQuery(){
  return useMutation({
    mutationKey: ['cargaQuery'],
    mutationFn: async (cargaId) => {
      console.log(`/carga/${cargaId}`)
      const carga = await api.get(`/carga/${cargaId}`, { withCredentials: true })
      return carga.data.data
    },
  })
 }