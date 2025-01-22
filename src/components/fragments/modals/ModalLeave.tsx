import { leaveSchema, TypeLeaveSchema } from "@/types/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Button, Input, Textarea } from "@nextui-org/react";
// import { Select, SelectItem } from "@nextui-org/select";
import { useForm } from "react-hook-form";

type Props = {
  open: boolean;
  OpenChange: (isOpen: boolean) => void;
  OnSubmit?: () => void;
}

export const ModalLeave = ({ open, OpenChange }: Props): React.ReactElement => {
  const { register, handleSubmit, formState: { errors } } = useForm<TypeLeaveSchema>({
    mode: "all",
    resolver: zodResolver(leaveSchema),
  });
  
  const onSubmit = (data: TypeLeaveSchema) => {
    const formData = new FormData();

    if (data.title) formData.append("title", data.title);
    if (data.end) formData.append("end", data.end);
    if (data.description) formData.append("message", data.description);
    if (data.image) formData.append("image", data.image[0]);

    console.log(data);
    // mutate(data); // Panggil mutate untuk mengirim data ke server
  };
  
  return (
    <Modal isOpen={open} onOpenChange={OpenChange}  isKeyboardDismissDisabled={true} isDismissable={false}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                  <Input
                    label="Judul"
                    labelPlacement="outside"
                    type="text"
                    placeholder="Masukkan judul pengajuan izin"
                    errorMessage={errors.title?.message?.toString()}
                    isInvalid={Boolean(errors.title)}
                    {...register("title")}
                  />
                  {/* <Select
                    label="Tipe Izin"
                    labelPlacement="outside"
                    placeholder="Pilih tipe anda"
                    errorMessage={errors.leave_type_id?.message?.toString()}
                    isInvalid={Boolean(errors.leave_type_id)}
                    {...register("leave_type_id")}
                  >
                    <SelectItem>Keperluan Pribadi</SelectItem>
                    <SelectItem>Lainnya</SelectItem>
                  </Select> */}
                  <Input
                    label="Sampai Tanggal"
                    labelPlacement="outside"
                    type="date"
                    errorMessage={errors.end?.message?.toString()}
                    isInvalid={Boolean(errors.end)}
                    {...register("end")}
                  /> 
                  <Input
                    label="Gambar"
                    labelPlacement="outside"
                    type="file"
                    placeholder="Masukan Gambar"
                    description="Unggah dokumen atau gambar pendukung (opsional)"
                    errorMessage={errors.image?.message?.toString()}
                    isInvalid={Boolean(errors.image)}
                    {...register("image")}
                    
                  />
                  <Textarea
                    label="Keterangan Tambahan"
                    placeholder="Tuliskan keterangan tambahan terkait izin Anda"
                    labelPlacement="outside"
                    type="text"
                    errorMessage={errors.description?.message?.toString()}
                    isInvalid={Boolean(errors.description)}
                    {...register("description")}
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
