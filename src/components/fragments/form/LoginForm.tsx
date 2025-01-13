"use client";

import { loginSchema, TypeLoginSchema } from "@/types/Schema";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/lib/hooks/useLogin";
import { toast } from "sonner";
import { useState } from "react";
import { Icons } from "@/resource";
import { HeadlineForm } from "./HeadlineForm";

export const LoginForm: React.FC = () => {
  const { isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<TypeLoginSchema> = (data: TypeLoginSchema) => {
    toast.success("Login success");
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-full mx-auto rounded-2xl lg:p-4 lg:border-2">
      <HeadlineForm />

      <div className="flex flex-col gap-4 my-4 md:mb-8">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email address"
          labelPlacement="outside"
          startContent={<Icons.Email/>}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          labelPlacement="outside"
          startContent={<Icons.Password/>}
          endContent={
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Icons.ShowEye/> : <Icons.EyeOff/>}
            </button>
          }
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          {...register("password")}
        />
      </div>
      
      <Button
        fullWidth
        color="primary"
        isLoading={isLoading}
        disabled={isLoading}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};