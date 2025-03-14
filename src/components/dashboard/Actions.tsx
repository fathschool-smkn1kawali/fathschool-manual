"use client";

import { ModalLeave } from "@/components/fragments/modals/ModalLeave";
import { useCheckIn, useCheckOut } from "@/lib/hooks/useActions";
import { useGeolocation } from "@/lib/utils/useGeolocation";
import { Button, ButtonVariantProps, useDisclosure } from "@nextui-org/react";
import { toast } from "sonner";

const defaultStyle: ButtonVariantProps & { className: string } = {
  size: "lg",
  variant: "shadow" as const,
  className:
    "px-10 py-2 text-medium md:px-16 sm:py-3.5 text-white font-semibold",
};

type Props = {
  checkIn: boolean;
  checkOut: boolean;
  leave: string;
  roleUser: string;
};

export const Actions = ({
  checkIn,
  checkOut,
  leave,
  roleUser,
}: Props): React.ReactElement => {
  const { getLocation } = useGeolocation();
  const { In, loadIn } = useCheckIn();
  const { Out, loadOut } = useCheckOut();
  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();

  /**
   * Handle action from user, whether it's checkin, checkout, or leave.
   * @param {string} actionType - The type of action to be performed.
   * @returns {Promise<void>}
   */
  const handleAction = async (actionType: "checkin" | "checkout" | "leave") => {
    try {
      const locationData = await getLocation();

      if (!locationData) return;

      if (actionType === "checkin") {
        In({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
      } else if (actionType === "checkout") {
        Out({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memproses aksi");
      console.error("Action error:", error);
    }
  };

  // Kondisi disable button
  const isCheckInDisabled =
    checkIn || checkOut || leave === "accepted" || leave === "pending";
  const isCheckOutDisabled =
    !checkIn || checkOut || leave === "accepted" || leave === "pending";
  const isLeaveDisabled =
    checkIn || checkOut || leave === "accepted" || leave === "pending";

  return (
    <>
      <div className="flex flex-col items-center gap-2 sm:gap-4">
        {/* Baris Pertama: Check-in, Check-out, Izin */}
        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
          {/* Tombol Check-in */}
          <Button
            onPress={() => handleAction("checkin")}
            color="primary"
            {...defaultStyle}
            isDisabled={isCheckInDisabled}
          >
            {loadIn ? "Memproses..." : "Datang"}
          </Button>

          {/* Tombol Check-out */}
          <Button
            onPress={() => handleAction("checkout")}
            color="danger"
            {...defaultStyle}
            isDisabled={isCheckOutDisabled}
          >
            {loadOut ? "Memproses..." : "Pulang"}
          </Button>

          {/* Tombol Izin */}
          <Button
            onPress={() => onOpen()}
            color="warning"
            {...defaultStyle}
            isDisabled={isLeaveDisabled}
          >
            Izin
          </Button>
        </div>

        {/* Baris Kedua: Tambahan Check In & Check Out */}
        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
          {/* Tombol Check-in Tambahan */}
          <Button color="success" {...defaultStyle}>
            Masuk
          </Button>

          {/* Tombol Check-out Tambahan */}
          <Button color="secondary" {...defaultStyle}>
            Keluar
          </Button>
        </div>
      </div>

      <ModalLeave
        modal={{ open: isOpen, close: onClose, OpenChange: onOpenChange }}
        role={roleUser}
      />
    </>
  );
};
