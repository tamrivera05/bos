import { z } from "zod";

export const documentRequestSchema = z.object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
    address: z.string().min(5, { message: "Address must be at least 5 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    birthdate: z.date({ required_error: "Please select a date of birth." }),
    contactNumber: z.string().min(18, { message: "Contact number must be 10 digits." }),
    documentType: z.string({ required_error: "Please select a document type." }),
    purpose: z.string().min(10, { message: "Purpose must be at least 10 characters." }),
});

export type RequestFormValues = z.infer<typeof documentRequestSchema>;

export default documentRequestSchema;
