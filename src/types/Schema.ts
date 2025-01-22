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

export const leaveSchema = z.object({
  user_id: z.string().uuid(),
  start_date: z.date(), 
  end_date: z.date(), 
  leave_type_id: z.number().int(),
  title: z.string().min(1).max(255), 
  message: z.string().min(1).max(1000),
  image: z.instanceof(File).optional(),
});

export type TypeLeaveSchema = z.infer<typeof leaveSchema>;
