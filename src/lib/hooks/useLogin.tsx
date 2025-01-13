import axios, { AxiosResponse } from "axios";
import { TypeLoginSchema } from "@/types/Schema";
import { useMutation, UseMutationResult } from "react-query";

/**
 *  * Logs in a user using the provided login credentials.
 *
 * @param {TypeLoginSchema} data The login credentials to use.
 * @returns {UseMutationResult<AxiosResponse, unknown, TypeLoginSchema, unknown>} The result of the mutation.
 */
export function useLogin(): UseMutationResult<AxiosResponse, unknown, TypeLoginSchema, unknown> {
  const url = ''

  return useMutation({
    mutationFn: async (data: TypeLoginSchema) => axios.post<AxiosResponse>(url, data),
    onSuccess: (data: AxiosResponse) => console.log('success' + data),
    onError: (error: unknown) => console.log('error' + error)
  })
}
