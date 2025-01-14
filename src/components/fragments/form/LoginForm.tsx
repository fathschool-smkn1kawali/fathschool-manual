"use client";

import { loginSchema, TypeLoginSchema } from "@/types/Schema";
import { Button, Input, Image } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/lib/hooks/useLogin";
import { useState } from "react";
import { Icons, Images } from "@/resource";
import { HeadlineForm } from "./HeadlineForm";

export const LoginForm: React.FC = () => {
  const { status, mutate } = useLogin();
  const [isVisible, setIsVisible] = useState(false);
  const { register, handleSubmit, formState: { errors }} = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<TypeLoginSchema> = (data: TypeLoginSchema) => {
    mutate(data);
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
              placeholder="Masukan email Anda"
              type="email"
              variant="bordered"
              defaultValue="4085_std@fathforce.com"
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
              placeholder="Masukan password Anda"
              type={isVisible ? "text" : "password"}
              variant="bordered"
              defaultValue="12345678"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...register("password")}
            />
            <Button
              className="w-full font-semibold"
              color="primary"
              type="submit"
              isLoading={status === "loading"}
              disabled={status === "loading"}
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
