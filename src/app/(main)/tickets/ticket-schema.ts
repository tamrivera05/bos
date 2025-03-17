import { z } from "zod";

export const TicketSchema = z.object({
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select a priority level.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
});
