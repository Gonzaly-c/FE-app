import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api.js";

export function useRecorridoQuery(){
  return useMutation({
    mutationKey: ['recorridoQuery'],
    mutationFn: async (recorridoId) => {
      console.log(`/recorrido/${recorridoId}`)
      const recorrido = await api.get(`/recorrido/${recorridoId}`, { withCredentials: true })
      return recorrido.data.data
    },
  })
 }