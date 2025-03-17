import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, { message: "Please enter a valid name" }),
  username: z.string().min(1, { message: "Please enter a valid username" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  streetAddress: z
    .string()
    .min(1, { message: "Please enter a valid street address" }),
  city: z.string().min(1, { message: "Please enter a valid city" }),
  province: z.string().min(1, { message: "Please enter a valid province" }),
  birthDate: z.date(),
  contactNumber: z
    .string()
    .min(1, { message: "Please enter a valid contact number" }),
  gender: z.enum(["Male", "Female"]),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export default signUpSchema;
