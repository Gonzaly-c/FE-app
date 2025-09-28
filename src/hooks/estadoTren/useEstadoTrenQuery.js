import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api.js";

export function useEstadoTrenQuery(){
  return useMutation({
    mutationKey: ['estadoTrenQuery'],
    mutationFn: async (estadoTrenId) => {
      console.log(`/estadoTren/${estadoTrenId}`)
      const estadoTren = await api.get(`/estadoTren/${estadoTrenId}`, { withCredentials: true })
      return estadoTren.data.data
    },
  })
 }