"use client";

import { useCheckIn, useCheckOut } from "@/lib/hooks/useAttendance";
import { useGeolocation } from "@/lib/utils/useGeolocation";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";

/**
 * * A React component that renders check-in and check-out buttons with geolocation handling.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.checkIn - Indicates if the user is currently checked in.
 * @param {boolean} props.checkOut - Indicates if the user is currently checked out.
 */
export const Actions = ({ checkIn, checkOut }: { checkIn: boolean; checkOut: boolean }): React.ReactElement => {
  const { isLoading: isLoadingLocation, getLocation } = useGeolocation();
  const { mutate: mutateCheckIn, isLoading: isLoadingCheckIn } = useCheckIn();
  const { mutate: mutateCheckOut, isLoading: isLoadingCheckOut } = useCheckOut();

  const handleAction = async (actionType: 'checkin' | 'checkout') => {
    try {
      const locationData = await getLocation();
      
      if (!locationData) return; 

      if (actionType === 'checkin') {
        mutateCheckIn({
          
          // Jarak 500 meter
          // -7.186907263189334, 108.3622633807071
          
          // Jarak 700 meter
          // -7.193195492378045, 108.3622633807071
          
          // Jarak 900 meter
          // -7.1949921229462825, 108.3622633807071

          // Jarak 950 meter
          // -7.195441280588343, 108.3622633807071
          
          // Jarak 1 km
          // -7.195890438230404, 108.3622633807071
          
          // Jarak 1,1 km
          // -7.196788753514521, 108.3622633807071

          // latitude: -7.195890438230404, // Ganti dengan locationData.latitude
          // longitude: 108.3622633807071, 

          latitude: locationData.latitude,
          longitude: locationData.longitude
        });
      } else {
        mutateCheckOut({
          // latitude:  -7.196788753514521, 
          // longitude: 108.3622633807071,

          latitude: locationData.latitude,
          longitude: locationData.longitude
        });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memproses aksi");
      console.error('Action error:', error);
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-4">
      <Button
        onPress={() => handleAction('checkin')}
        variant="shadow"
        color="primary"
        size="lg"
        className="px-10 py-2 text-medium md:px-16 sm:py-3.5"
        isDisabled={isLoadingLocation || isLoadingCheckIn || checkIn}
      >
        {isLoadingLocation || isLoadingCheckIn ? "Memproses..." : "Masuk"}
      </Button>

      <Button
        onPress={() => handleAction('checkout')}
        variant="shadow"
        color="danger"
        size="lg"
        className="px-10 py-2 text-medium md:px-16 sm:py-3.5"
        isDisabled={isLoadingLocation || isLoadingCheckOut || checkOut}
      >
        { isLoadingLocation || isLoadingCheckOut ? "Memproses..." : "Pulang"}
      </Button>
    </div>
  );
};

