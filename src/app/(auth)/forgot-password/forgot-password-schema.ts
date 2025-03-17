import { z } from "zod";

export const forgotPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export type forgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default forgotPasswordSchema;
