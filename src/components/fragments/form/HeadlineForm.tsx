import { Images } from "@/resource";
import { JSX } from "react";
import Image from "next/image";

export const HeadlineForm: React.FC = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center pb-6">
      <Image src={Images.SmknKawali.src} alt="Image" width={90} height={90} blurDataURL={Images.SmknKawali.blurDataURL}  />
      <p className="text-xl font-bold mt-8 mb-2 dark:text-slate-100 text-slate-900">Selamat Datang</p>
      <p className="text-small text-default-500 w-3/4 text-center">
        Log in untuk absensi <br /> sekolah SMK Negeri 1 Kawali
      </p>
    </div>
  );
};
