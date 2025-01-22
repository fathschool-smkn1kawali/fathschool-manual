import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";

type Props = {
  open: boolean;
  OpenChange: (isOpen: boolean) => void;
  OnSubmit?: () => void;
}

export const ModalLeave = ({ open, OpenChange }: Props): React.ReactElement => {
  
  return (
    <Modal isOpen={open} onOpenChange={OpenChange}  isKeyboardDismissDisabled={true} isDismissable={false}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalBody>
              <form>
                <div className="flex flex-col gap-4">
                  {/* <Input
                    label="Dari Tanggal"
                    labelPlacement="outside"
                    type="date"
                  /> */}
                  <Input
                    label="Judul"
                    labelPlacement="outside"
                    type="text"
                    placeholder="Masukkan judul pengajuan izin"
                  />
                  <Select
                    label="Tipe Izin"
                    labelPlacement="outside"
                    placeholder="Pilih tipe anda"
                  >
                    <SelectItem>Keperluan Pribadi</SelectItem>
                    <SelectItem>Lainnya</SelectItem>
                  </Select>
                  <Input
                    label="Sampai Tanggal"
                    labelPlacement="outside"
                    type="date"
                  />
                  <Input
                    label="Gambar"
                    labelPlacement="outside"
                    type="file"
                    placeholder="Masukan Gambar"
                    description="Unggah dokumen atau gambar pendukung"
                  />
                  <Textarea
                    label="Keterangan Tambahan"
                    placeholder="Tuliskan keterangan tambahan terkait izin Anda"
                    labelPlacement="outside"
                    type="text"
                  />
                </div>
                <Button type="submit" color="warning" className="text-white mt-4 font-semibold mb-6" fullWidth>
                  Submit
                </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
