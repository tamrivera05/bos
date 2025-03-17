import { z } from "zod";

export const loginSchema = z.object({
  login: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default loginSchema;
