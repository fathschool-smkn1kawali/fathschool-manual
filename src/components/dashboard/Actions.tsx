"use client";

import { ModalLeave } from "@/components/fragments/modals/ModalLeave";
import { useCheckIn, useCheckOut } from "@/lib/hooks/useActions";
import { useGeolocation } from "@/lib/utils/useGeolocation";
import { Button, ButtonVariantProps, useDisclosure } from "@nextui-org/react";
import { toast } from "sonner";

const defaultStyle: ButtonVariantProps & { className: string } = {
  size: "lg",
  variant: "shadow" as const,
  className: 'px-10 py-2 text-medium md:px-16 sm:py-3.5 text-white font-semibold'
}

type Props = {
  checkIn: boolean,
  checkOut: boolean,
  // typesLeave: []
}

export const Actions = ({ checkIn, checkOut }: Props): React.ReactElement => {
  const { isLoading: isLoadingLocation, getLocation } = useGeolocation();
  const { mutate: CheckIn, isLoading: loadCheckIn } = useCheckIn();
  const { mutate: CheckOut, isLoading: loadChekOut } = useCheckOut();
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const handleAction = async (actionType: "checkin" | "checkout" | "leave") => {
    try {
      const locationData = await getLocation();

      if (!locationData) return;

      if (actionType === "checkin") {
        CheckIn({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
      } else if (actionType === "checkout")  {
        CheckOut({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memproses aksi");
      console.error("Action error:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
        <Button
          onPress={() => handleAction("checkin")}
          color="primary"
          {...defaultStyle}
          isDisabled={isLoadingLocation || loadCheckIn || checkIn}
        >
          {isLoadingLocation || loadCheckIn ? "Memproses..." : "Masuk"}
        </Button>

        <Button
          onPress={() => handleAction("checkout")}
          color="danger"
          {...defaultStyle}
          isDisabled={isLoadingLocation || loadChekOut || checkOut}
        >
          {isLoadingLocation || loadChekOut ? "Memproses..." : "Pulang"}
        </Button>
        <Button
          onPress={onOpen}
          color="warning"
          {...defaultStyle}
          isDisabled={isLoadingLocation || loadChekOut}
        >
          {isLoadingLocation || loadChekOut ? "Memproses..." : "Izin"}
        </Button>
      </div>

      <ModalLeave open={isOpen} OpenChange={onOpenChange} />
    </>
  );
};
