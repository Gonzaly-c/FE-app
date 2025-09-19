import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api.js";

export function useTrenQuery(){
  return useMutation({
    mutationKey: ['trenQuery'],
    mutationFn: async (trenId) => {
      console.log(`/tren/${trenId}`)
      const tren = await api.get(`/tren/${trenId}`, { withCredentials: true })
      return tren.data.data
    },
  })
 }