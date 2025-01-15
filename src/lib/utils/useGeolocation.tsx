import { useState } from "react";
import { toast } from "sonner";

export interface GeolocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

/**
 * * Hook to get the user's current geolocation.
 *
 * @returns An object with three properties: `location`, `error`, and `isLoading`.
 *   `location` is a `GeolocationData` object or `null`.
 *   `error` is a string or `null`.
 *   `isLoading` is a boolean.
 *   `getLocation` is a function that takes no arguments and returns no value.
 */
export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = () => {
    return new Promise<GeolocationData | null>((resolve) => {
      if (!navigator.geolocation) {
        const errorMsg = "Geolokasi tidak didukung oleh browser Anda.";
        toast.error(errorMsg);
        setError(errorMsg);
        resolve(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude, accuracy } = position.coords;
          const locationData = { latitude, longitude, accuracy };
          setLocation(locationData);
          setIsLoading(false);
          resolve(locationData);
        },
        (err: GeolocationPositionError) => {
          let errorMsg: string;
          
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMsg = "Akses ditolak. Harap izinkan akses GPS.";
              break;
            case err.POSITION_UNAVAILABLE:
              errorMsg = "Informasi lokasi tidak tersedia.";
              break;
            case err.TIMEOUT:
              errorMsg = "Permintaan untuk mendapatkan lokasi Anda telah berakhir waktu.";
              break;
            default:
              errorMsg = "Terjadi kesalahan yang tidak diketahui.";
              break;
          }
          
          toast.error(errorMsg);
          setError(errorMsg);
          setIsLoading(false);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  return { location, error, isLoading, getLocation };
}
