import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  street_address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  birth_date: z.string().min(1, "Birth date is required"),
  contact_number: z.string().min(1, "Contact number is required"),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export default signUpSchema;
