import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api.js";

export function useCategoriaDenunciaQuery(){
  return useMutation({
    mutationKey: ['categoriaDenunciaQuery'],
    mutationFn: async (categoriaDenunciaId) => {
      console.log(`/categoriaDenuncia/${categoriaDenunciaId}`)
      const categoriaDenuncia = await api.get(`/categoriaDenuncia/${categoriaDenunciaId}`, { withCredentials: true })
      return categoriaDenuncia.data.data
    },
  })
 }