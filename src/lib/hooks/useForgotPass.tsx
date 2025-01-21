import { TypeForgotPassSchema } from "@/types/Schema";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { toast } from "sonner";

/**
 *  * Hook to forgot password the user.
 *
 * @returns {UseMutationResult} The result of the mutation.
 */

export function useForgotPass() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL?.toString()}/forgot-password-manual`;

  return useMutation({
    mutationFn: async (data: TypeForgotPassSchema) => axios.post<AxiosResponse>(url, data),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Check WhatsApp Anda");
    },
    onError: (error: AxiosError) => {
      const status = (error?.response?.data as { status: number })?.status || 500
      const statusText = status === 404 ? 'No Handphone User tidak Ditemukan' : 'Terjadi Kesalahan pada Server'

      toast.error(statusText);
    },
  })
}