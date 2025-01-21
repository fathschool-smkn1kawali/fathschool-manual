import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type TypeLoginSchema = z.infer<typeof loginSchema>;

export const forgotPassSchema = z.object({
  phone: z
    .string()
    .min(8, "No WhatsApp minimal 8 karakter")
    .max(13, "No WhatsApp maksimal 13 karakter")
    .regex(/^\d+$/, "No WhatsApp harus berupa angka"),
});

export type TypeForgotPassSchema = z.infer<typeof forgotPassSchema>;