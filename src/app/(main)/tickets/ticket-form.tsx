"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useApiFetch } from "@/lib/hooks/useApiFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, ArrowDown, Check, Loader2, Minus } from "lucide-react";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import { z } from "zod";
import { TicketSchema } from "./ticket-schema";

const TicketForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data } = useSWR("/tickets");
  console.log(data);

  const form = useForm<z.infer<typeof TicketSchema>>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      priority: "low",
      subject: "",
      description: "",
    },
  });

  const apiFetch = useApiFetch();

  const onSubmit: SubmitHandler<z.infer<typeof TicketSchema>> = useCallback(
    async (values) => {
      try {
        setIsSubmitting(true);

        const response = await apiFetch("/tickets", {
          method: "POST",
          body: JSON.stringify({
            title: values.subject,
            description: values.description,
            priority: values.priority,
          }),
        });

        console.log(values);

        if (response.error) {
          toast.error("Failed to submit ticket", {
            description: response.error.message,
          });
          return;
        }

        setIsSuccess(true);
        toast.success("Ticket submitted successfully", {
          description: "We'll get back to you as soon as possible.",
        });

        // Reset form after successful submission
        setTimeout(() => {
          form.reset();
          setIsSuccess(false);
        }, 2000);
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error("Ticket submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [apiFetch, form],
  );
  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Priority Level</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                    >
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="low" className="sr-only" />
                          </FormControl>
                          <div className="flex w-full cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
                            <ArrowDown className="mb-3 h-6 w-6 text-green-500" />
                            <span className="text-center text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Low
                            </span>
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem
                              value="medium"
                              className="sr-only"
                            />
                          </FormControl>
                          <div className="flex w-full cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
                            <Minus className="mb-3 h-6 w-6 text-amber-500" />
                            <span className="text-center text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Medium
                            </span>
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="high" className="sr-only" />
                          </FormControl>
                          <div className="flex w-full cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
                            <AlertTriangle className="mb-3 h-6 w-6 text-red-500" />
                            <span className="text-center text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              High
                            </span>
                          </div>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brief summary of your issue"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide details about your issue..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include any relevant information like error messages, steps
                    to reproduce, etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-4">
              <Button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full bg-[#1F2937] sm:w-auto"
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSuccess && <Check className="mr-2 h-4 w-4" />}
                {isSubmitting
                  ? "Submitting..."
                  : isSuccess
                    ? "Submitted!"
                    : "Submit Ticket"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isSubmitting}
                className="w-full text-[#1F2937] hover:bg-[#1F2937] hover:text-white sm:w-auto"
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TicketForm;
