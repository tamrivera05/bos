import { z } from "zod";

export const appointmentsSchema = z.object({
  date: z.date(),
  timeSlot: z.string({
    required_error: "Please select a time slot.",
  }),
  notes: z.string().min(1, {
    message: "Please enter any notes or comments.",
  }),
});

export type AppointmentFormValues = z.infer<typeof appointmentsSchema>;

export default appointmentsSchema;
