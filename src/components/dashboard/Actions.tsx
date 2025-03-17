"use client";

import { ModalLeave } from "@/components/fragments/modals/ModalLeave";
import {
  useCheckIn,
  useCheckOut,
  useQrin,
  useQrout,
} from "@/lib/hooks/useActions";
import { useGeolocation } from "@/lib/utils/useGeolocation";
import {
  Button,
  ButtonVariantProps,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

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

export const Actions = ({ checkIn, checkOut, leave, roleUser }: Props) => {
  const { getLocation } = useGeolocation();
  const { In, loadIn } = useCheckIn();
  const { Out, loadOut } = useCheckOut();
  const { Qrin, loadQrin } = useQrin();
  const { Qrout, loadQrout } = useQrout();
  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();

  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [scanActionType, setScanActionType] = useState<"qrin" | "qrout">(
    "qrin"
  );
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (qrScannerOpen) {
      const scanner = new Html5QrcodeScanner("qr-scanner", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });

      scanner.render(
        (decodedText) => {
          handleScan({ text: decodedText });
          scanner.clear();
        },
        (error) => console.warn("QR Scan Error:", error)
      );

      return () => scanner.clear();
    }
  }, [qrScannerOpen]);

  const handleAction = async (
    actionType: "checkin" | "checkout" | "qrin" | "qrout",
    qrCodeId?: string
  ) => {
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
      } else if (actionType === "qrin" && qrCodeId) {
        Qrin({
          qr_code_id: qrCodeId,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
      } else if (actionType === "qrout" && qrCodeId) {
        Qrout({
          qr_code_id: qrCodeId,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memproses aksi");
    }
  };

  const handleScan = (data: { text?: string } | null) => {
    if (!data || !data.text) {
      toast.error("QR Code tidak valid atau tidak terbaca.");
      return;
    }

    let qrCodeId = data.text;
    try {
      const parsedData = JSON.parse(data.text);
      if (parsedData?.qr_code_id) {
        qrCodeId = parsedData.qr_code_id;
      }
    } catch {}

    setQrScannerOpen(false);
    handleAction(scanActionType, qrCodeId);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2 sm:gap-4">
        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
          <Button
            onPress={() => handleAction("checkin")}
            color="primary"
            {...defaultStyle}
            isDisabled={
              checkIn || checkOut || leave === "accepted" || leave === "pending"
            }
          >
            {loadIn ? "Memproses..." : "Datang"}
          </Button>
          <Button
            onPress={() => handleAction("checkout")}
            color="danger"
            {...defaultStyle}
            isDisabled={
              !checkIn ||
              checkOut ||
              leave === "accepted" ||
              leave === "pending"
            }
          >
            {loadOut ? "Memproses..." : "Pulang"}
          </Button>
          <Button onPress={() => onOpen()} color="warning" {...defaultStyle}>
            Izin
          </Button>
        </div>

        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
          {/* Tombol Masuk QR */}
          <Button
            color="success"
            {...defaultStyle}
            onPress={() => {
              setScanActionType("qrin"); // Set scanActionType ke "qrin"
              setQrScannerOpen(true); // Buka modal scanner
            }}
            isDisabled={scanActionType === "qrin" || scanActionType === "qrout"} // Jika sudah qrin atau qrout, tombol disabled
          >
            {loadQrin ? "Memproses..." : "Masuk QR"}
          </Button>

          {/* Tombol Keluar QR */}
          <Button
            color="secondary"
            {...defaultStyle}
            onPress={() => {
              setScanActionType("qrout"); // Set scanActionType ke "qrout"
              setQrScannerOpen(true); // Buka modal scanner
            }}
            isDisabled={scanActionType !== "qrin" || scanActionType === "qrout"} // Jika belum qrin atau sudah qrout, tombol disabled
          >
            {loadQrout ? "Memproses..." : "Keluar QR"}
          </Button>
        </div>
      </div>

      <ModalLeave
        modal={{ open: isOpen, close: onClose, OpenChange: onOpenChange }}
        role={roleUser}
      />

      <Modal
        isOpen={qrScannerOpen}
        onClose={() => setQrScannerOpen(false)}
        size="md"
      >
        <ModalContent>
          <ModalHeader>
            Scan QR untuk {scanActionType === "qrin" ? "Masuk" : "Keluar"}
          </ModalHeader>
          <ModalBody>
            <div id="qr-scanner" ref={scannerRef}></div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
