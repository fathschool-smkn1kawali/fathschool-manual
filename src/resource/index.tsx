import ImageSchool from "/public/bg.jpeg";
import Logo from "/public/Logo.png";

export const Images = {
  ImageSchool,
  Logo,
};


import { RiLockPasswordLine, RiCustomerService2Line } from "react-icons/ri";
import { MdOutlineEmail, MdOutlineRemoveRedEye } from "react-icons/md";
import { HiOutlineEyeOff } from "react-icons/hi";
import { LuMoonStar, LuSun } from "react-icons/lu";

type IconProps = {
  size?: number;
  className?: string;
  color?: string;
};

export const Icons = {
  Email: ({ size = 20, className = "", color }: IconProps) => (
    <MdOutlineEmail size={size} className={className} color={color} />
  ),
  Password: ({ size = 20, className = "", color }: IconProps) => (
    <RiLockPasswordLine size={size} className={className} color={color} />
  ),
  ShowEye: ({ size = 20, className = "", color }: IconProps) => (
    <MdOutlineRemoveRedEye size={size} className={className} color={color} />
  ),
  EyeOff: ({ size = 20, className = "", color }: IconProps) => (
    <HiOutlineEyeOff size={size} className={className} color={color} />
  ),
  Moon: ({ size = 20, className = "", color }: IconProps) => (
    <LuMoonStar size={size} className={className} color={color} />
  ),
  Sun: ({ size = 20, className = "", color }: IconProps) => (
    <LuSun size={size} className={className} color={color} />
  ),
  Customer: ({ size = 20, className = "", color }: IconProps) => (
    <RiCustomerService2Line size={size} className={className} color={color} />
  ),
};
