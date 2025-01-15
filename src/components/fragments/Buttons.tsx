'use client';

import { useGetSettings } from "@/lib/hooks/useGetSettings";
import { useTheme } from "@/lib/utils/useTheme";
import { Icons } from "@/resource";
import { Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

/**
 * * Buttons component that renders two icon-only buttons with tooltips.
 * 
 * - The first button toggles the theme between dark and light modes.
 * - The second button links to a WhatsApp chat with a predefined phone number and message.
 * 
 * @returns {JSX.Element} A JSX element containing the buttons.
 */
export const Buttons = () => {
  const { data } = useGetSettings();
  const { isDarkMode: isTheme, toggleDarkMode: toggleTheme } = useTheme();
  const url = `https://api.whatsapp.com/send?phone=${data?.data.data?.app_phone ?? "6281321828144"}&text=Hallo%20Admin` 

  return (
    <div className="flex justify-end gap-2 sm:gap-4 relative z-50">
      
      <Tooltip content="Theme" placement="bottom">
        <Button isIconOnly onPress={toggleTheme} variant="bordered">
          {isTheme ? <Icons.Sun /> : <Icons.Moon />}
        </Button>
      </Tooltip>

      <Tooltip content="Hubungi Customer" placement="bottom">
        <Button isIconOnly as={Link} href={url} target="_blank" variant="bordered">
          <Icons.Customer />
        </Button>
      </Tooltip>
    </div>
  );
};
