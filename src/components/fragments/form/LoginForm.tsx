"use client";

import { loginSchema, TypeLoginSchema } from "@/types/Schema";
import { Button, Input, Image } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/lib/hooks/useLogin";
import { toast } from "sonner";
import { useState } from "react";
import { Icons, Images } from "@/resource";
import { HeadlineForm } from "./HeadlineForm";

export const LoginForm: React.FC = () => {
  const { isLoading } = useLogin();
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<TypeLoginSchema> = (data: TypeLoginSchema) => {
    toast.success("Login success");
    console.log(data);
  };

  return (
    <div className="block pt-16 sm:pt-24 lg:flex justify-center gap-8 xl:gap-12">
      {/* Form */}
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <HeadlineForm />

          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <Input
              labelPlacement="outside"
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              {...register("email")}
            />
            <Input
              endContent={
                <button type="button" onClick={() => setIsVisible(!isVisible)}>
                  {isVisible ? <Icons.ShowEye /> : <Icons.EyeOff />}
                </button>
              }
              labelPlacement="outside"
              label="Password"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              variant="bordered"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...register("password")}
            />
            <Button
              className="w-full font-semibold"
              color="primary"
              type="submit"
              isLoading={isLoading}
              spinner
              disabled={isLoading}
            >
              Log In
            </Button>
          </form>
        </div>
      </div>

      <div className="w-full hidden lg:flex items-center justify-center cursor-pointer">
        <Image
          isZoomed
          alt="Image"
          src={Images.ImageSchool.src}
          width={500}
          height={400}
        />
      </div>

    </div>
  );
};
