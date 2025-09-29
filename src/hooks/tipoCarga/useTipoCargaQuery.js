import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api.js";

export function useTipoCargaQuery(){
  return useMutation({
    mutationKey: ['tipoCargaQuery'],
    mutationFn: async (tipoCargaId) => {
      console.log(`/tipoCarga/${tipoCargaId}`)
      const tipoCarga = await api.get(`/tipoCarga/${tipoCargaId}`, { withCredentials: true })
      return tipoCarga.data.data
    },
  })
 }