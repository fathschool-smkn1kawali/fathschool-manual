"use client";

import { Icons, Images } from "@/resource";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import { toast } from "sonner";
import { Buttons } from "../fragments/Buttons";
import Image from "next/image";

/**
 * NavBar component that displays a greeting and user controls.
 *
 * @returns {React.ReactElement} The JSX element representing the navigation bar.
 */
export const NavBar: React.FC = (): React.ReactElement => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout Berhasil");
    window.location.href = "/";
  };

  return (
    <>
      <Navbar className="bg-transparent border-b py-2.5">
        <NavbarBrand className="space-x-4">
          <Image
            src={Images.SmknKawali.src}
            alt="logo"
            width={50}
            height={50}
          />
          <h5 className="hidden sm:block">SMKN 1 Kawali</h5>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex gap-2 border-e-2 pe-2">
            {navbarItems.map((item, index) => (
              <Button
                key={index}
                onPress={item.onCLick}
                isIconOnly
                variant="bordered"
              >
                {item.icon}
              </Button>
            ))}
          </NavbarItem>
          <NavbarItem className="gap-2 border-e-2 pe-4">
            <Buttons />
          </NavbarItem>

          <NavbarItem>
            <Button onPress={onOpen} isIconOnly color="danger" variant="flat">
              <Icons.Logout />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h5>Konfirmasi Logout</h5>
              </ModalHeader>
              <ModalBody>
                <p>Setelah logout, Anda perlu memasukkan kredensial untuk mengakses aplikasi lagi. Apakah Anda yakin ingin melanjutkan?</p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onOpenChange} color="primary" variant="flat">
                  Batal
                </Button>
                <Button onPress={handleLogout} color="danger" variant="solid">
                  Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const navbarItems = [
  {
    icon: <Icons.Notification />,
    onCLick: () => toast.info("Ups, Fitur belum tersedia"),
  },
  {
    icon: <Icons.User />,
    onCLick: () => toast.info("Ups, Fitur belum tersedia"),
  },
];
