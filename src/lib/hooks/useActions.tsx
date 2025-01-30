import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

type CheckLocation = {
  latitude: number;
  longitude: number;
};

/**
 * * Fetches the checkin status of a user with the given ID, if given.
 *
 * @param {string | null} id The ID of the user to check.
 *
 * @returns {UseQueryResult<boolean, AxiosError>} The result of the query.
 */
function useCheckById(id: string | null) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL?.toString()}/isCheckinManual/${id}`

  return useQuery({
    queryKey: ['checkById', id],
    refetchInterval: 10000, // Refetch every 10 seconds
    queryFn: async () => axios.get(url),
    onError: (error) => console.error("Error fetching check data:", error),
  })
}



/**
 *  * Logs in a user using the provided login credentials.
 *
 * @param {CheckLocation} data The login credentials to use.
 * @returns {UseMutationResult<AxiosResponse, unknown, CheckLocation, unknown>} The result of the mutation.
 */
function useCheckIn() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL?.toString()}/checkinManual`
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CheckLocation) => {

      const userString = localStorage.getItem("user");
      if (!userString) {
        throw new Error("User not found in localStorage");
      }

      const user = JSON.parse(userString);
      const payload = {
        user_id: user.id, 
        lattitude: data.latitude,
        longitude: data.longitude,
      };

      return axios.post(url, payload);
    },
    onError: (error: AxiosError) => {
      const status = (error?.response?.data as { status: number })?.status || 500
      const statusText = status === 400 ? 'Anda Sudah Check In' : status === 403 ? 'Anda Berada Diluar Jangkauan' : status === 404 ? 'User Tidak Ditemukan' : 'Terjadi Kesalahan pada Server'
      
      console.log(error);
      toast.error(statusText)
    },
    onSuccess: () => {
      // window.location.href = "/dashboard/attendance";
      queryClient.invalidateQueries(["checkById"]);
      toast.success("Check In Berhasil")
    },
  });
}



/**
 * * Hook to check out the user using the provided location.
 *
 * @param {CheckLocation} data The location to use.
 * @returns {UseMutationResult<AxiosResponse, unknown, CheckLocation, unknown>} The result of the mutation.
 */
function useCheckOut() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL?.toString()}/checkoutManual`
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CheckLocation) => {
      const userString = localStorage.getItem("user");
      if (!userString) {
        throw new Error("User not found in localStorage");
      }

      const user = JSON.parse(userString);
      const payload = {
        user_id: user.id, 
        lattitude: data.latitude,
        longitude: data.longitude,
      };

      return axios.post(url, payload);
    },
    onError: (error: AxiosError) => {
      const status = (error?.response?.data as { status: number })?.status || 500
      const statusText = status === 400 ? 'Anda Sudah Check Out' : status === 402 ? 'Belum Jadwal Pulang'  : status === 401 ? 'Anda Belum Check In' : status === 404 ? 'User Tidak Ditemukan' : status === 403 ? 'Anda Berada Diluar Jangkauan' : 'Terjadi Kesalahan pada Server'

      toast.error(statusText)
    },
    onSuccess: () => {
      // window.location.href = "/dashboard/attendance";
      queryClient.invalidateQueries(["checkById"]);
      toast.success("Check Out Berhasil")
    },
  });
}




function useLeave() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL?.toString()}/leaveManual`;
  const queryClient = useQueryClient();

  // Helper function to format date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return useMutation({
    mutationFn: async (payload: FormData) => {
      const userString = localStorage.getItem("user");
      if (!userString) {
        throw new Error("User not found in localStorage");
      }
  
      const user = JSON.parse(userString);
      const leavePayload = new FormData();

      const startDate = new Date()

      leavePayload.append('user_id', user.id);
      leavePayload.append('title', payload.get('title') as string);
      leavePayload.append('leave_type_id', payload.get('leave_type_id') as string);
      leavePayload.append('description', payload.get('description') as string);
      leavePayload.append('end', payload.get('end') as string);
      leavePayload.append('start', formatDate(startDate));
      if (payload.get('image')) {
        leavePayload.append('image', payload.get('image') as File);
      }
  
      return axios.post(url, leavePayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onError: (error: AxiosError) => {
      console.log(error);
      toast.error("Terjadi Kesalahan pada Server");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["checkById"]);
      toast.success("Anda Berhasil Mengajukan Izin");
    },
  });
  
}




function useLeaveTypes(roleType: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/leave-types/${roleType}`;

  return useQuery({
    queryKey: ['leaveTypes', roleType],
    queryFn: async () => axios.get(url),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });
}

export {
  useCheckIn,
  useCheckOut,
  useLeave,
  useLeaveTypes,
  useCheckById
}