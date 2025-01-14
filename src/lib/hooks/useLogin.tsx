import axios, { AxiosError, AxiosResponse } from "axios";
import { TypeLoginSchema } from "@/types/Schema";
import { useMutation, UseMutationResult } from "react-query";
import { toast } from "sonner";

/**
 *  * Logs in a user using the provided login credentials.
 *
 * @param {TypeLoginSchema} data The login credentials to use.
 * @returns {UseMutationResult<AxiosResponse, unknown, TypeLoginSchema, unknown>} The result of the mutation.
 */
export function useLogin(): UseMutationResult<AxiosResponse, unknown, TypeLoginSchema, unknown> {
  const url = process.env.NEXT_PUBLIC_LOGIN?.toString() || "http://localhost:8000/api/loginStudent";

  return useMutation({
    mutationFn: async (data: TypeLoginSchema) => axios.post<AxiosResponse>(url, data),
    onSuccess: (data: AxiosResponse) => {
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data.data.data));
      toast.success('Login Berhasil')
      window.location.href = "/dashboard/attendance";
    },
    onError: (error: AxiosError) => {
      const status = (error?.response?.data as { status: number })?.status || 500
      const statusText = status === 403 ? 'Akun tidak memiliki akses untuk fitur ini' : status === 404 ? 'User tidak ditemukan' : status === 401 ? 'Password salah' : 'Terjadi kesalahan pada server'
      
      toast.error(statusText) 
    }
  })
}
