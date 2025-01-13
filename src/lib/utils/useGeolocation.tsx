import { useState } from "react";

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
export function useGeolocation(): { location: GeolocationData | null; error: string | null; isLoading: boolean; getLocation: () => void } {
  const [location, setLocation] = useState<GeolocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        const { latitude, longitude, accuracy } = position.coords;

        setLocation({ latitude, longitude, accuracy });
        setIsLoading(false);
      },
      (err: GeolocationPositionError) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Permission denied. Please allow GPS access.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case err.TIMEOUT:
            setError("The request to get your location timed out.");
            break;
          default:
            setError("An unknown error occurred.");
            break;
        }
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return { location, error, isLoading, getLocation };
}
