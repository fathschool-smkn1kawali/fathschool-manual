import { LoginSchema } from "@/types/Schema";
import axios from "axios";
import { useMutation } from "react-query";

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginSchema) => axios.post('/api/login', data),
    onSuccess: (data) => {
      console.log('success' + data);
    },
    onError: (error) => {
      console.log('error' + error);
    }
  })
}