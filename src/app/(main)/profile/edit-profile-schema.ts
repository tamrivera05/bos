import * as z from "zod"

export const editProfileSchema = z.object({
  basic: z.object({
    birthdate: z.string().min(1, "Birthdate is required"),
    gender: z.enum(["Male", "Female"], {
      required_error: "Gender is required",
      invalid_type_error: "Gender must be either Male or Female",
    }),
  }),
  contact: z.object({
    contactNumber: z
      .string()
      .min(1, "Contact number is required")
      .regex(/^[0-9+\-\s()]*$/, "Invalid contact number format"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username must not exceed 50 characters"),
  }),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    stateProvince: z.string().min(1, "State/Province/Area is required"),
  }),
})

export type EditProfileFormData = z.infer<typeof editProfileSchema>
