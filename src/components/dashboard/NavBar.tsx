'use client'

import { JSX } from "react";
import { Icons, Images } from "@/resource";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import Image from "next/image";

/**
 * NavBar component that displays a greeting and user controls.
 *
 * @returns {JSX.Element} The JSX element representing the navigation bar.
 */
export const NavBar: React.FC = (): JSX.Element => {
  return (
    <Navbar className="bg-transparent border-b py-2.5">
      <NavbarBrand className="space-x-4">
        <Image src={Images.SmknKawali.src} alt="logo" width={50} height={50} />
        <h5>SMKN 1 Kawali</h5>
      </NavbarBrand>
      
      <NavbarContent justify="end" className="hidden sm:flex">
        <NavbarItem className="flex gap-2 border-e-2 pe-2">
          {navbarItems.map((item, index) => (
            <Button key={index} onPress={item.onCLick} isIconOnly variant="bordered">
              {item.icon}
            </Button>
          ))}
        </NavbarItem>
        <NavbarItem>
          <Button endContent={<Icons.Logout/>} color="danger" href="#" variant="flat">
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>

    </Navbar>
  );
};

const navbarItems = [
  { icon: <Icons.Notification />, onCLick: () => toast.info('Ups, Fitur belum tersedia') },
  { icon: <Icons.User />, onCLick: () => toast.info('Ups, Fitur belum tersedia') },
  // { icon: <Icons.Clock />, onCLick: () => toast.info('Ups, Fitur belum tersedia') },
  { icon: <Icons.Settings />, onCLick: () => toast.info('Ups, Fitur belum tersedia')},
];