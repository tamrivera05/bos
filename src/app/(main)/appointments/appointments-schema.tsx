import { z } from "zod";

export const appointmentsSchema = z.object({
    date: z.date(),
      timeSlot: z.string({
        required_error: "Please select a time slot.",
      }),
      service: z.string({
        required_error: "Please select a service.",
      }),
      notes: z.string().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentsSchema>;

export default appointmentsSchema;