import { useTheme } from "@/lib/utils/useTheme";
import { Icons } from "@/resource";
import { Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";

export const ButtonsFloat = () => {
  const { isDarkMode: isTheme, toggleDarkMode: toggleTheme } = useTheme();
  const linkCustomer = 'https://api.whatsapp.com/send?phone=6285161721727&text=Halo%20selamat%20datang%20di%20WhatsApp%20admin%20FathForce'
  
  return (
    <div className="fixed bottom-2 right-2 sm:bottom-8 sm:right-8 z-50">
      <div className="flex flex-col gap-2 sm:gap-4">
        <Tooltip content="Theme" placement="left">
          <Button isIconOnly onPress={toggleTheme}>
            {isTheme ? <Icons.Sun /> : <Icons.Moon />}
          </Button>
        </Tooltip>
        <Tooltip content="Hubungi Customer" placement="left">
          <Button isIconOnly>
            <Link href={linkCustomer} target="_blank">
              <Icons.Customer />
            </Link>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
