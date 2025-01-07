import { Images } from "@/resource";
import Image from "next/image";

export const HeadlineForm: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center items-center py-4">
        <Image src={Images.Logo.src} alt="Logo" blurDataURL={Images.Logo.blurDataURL} width={100} height={100} />
      </div>
      <div className="text-center w-72 mx-auto py-6">
        <h3 className="text-2xl font-bold mb-2">SIGN IN</h3>
        <small>
          Lorem ipsum dolor sit amet, Itaque quae quis numquam aliquam quisquam deserunt.
        </small>
      </div>
    </div>
  );
};