import { LoginForm } from "@/components/fragments/form/LoginForm";
import { Images } from "@/resource";
import { Image } from "@nextui-org/react";

export default function LoginPage() {
  return (
    <section>

      {/* Content */}
      <div className="block pt-16 sm:pt-24 lg:flex justify-center gap-8 xl:gap-12">
        <LoginForm />
        <div className="w-full hidden lg:flex items-center justify-center cursor-pointer">
          <Image isBlurred isZoomed alt="Image" src={Images.ImageSchool.src} width={500} height={400} />
        </div>
      </div>

    </section>
  );
}
