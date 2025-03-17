"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bug,
  Check,
  CreditCard,
  HelpCircle,
  Lightbulb,
  Loader2,
  User,
} from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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
import { toast } from "sonner";
import { TicketSchema } from "./ticket-schema";

const TicketForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof TicketSchema>>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof TicketSchema>> = async (
    values,
  ) => {
    return console.log(values);
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Success state
    setIsSubmitting(false);
    setIsSuccess(true);

    toast("Ticket submitted successfully", {
      description: "We'll get back to you as soon as possible.",
    });

    // Reset form after 2 seconds
    setTimeout(() => {
      form.reset();
      setIsSuccess(false);
    }, 2000);
  };
  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="concern"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>What's your concern?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4 sm:grid-cols-5"
                    >
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem
                              value="technical"
                              className="sr-only"
                            />
                          </FormControl>
                          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
                            <Bug className="mb-3 h-6 w-6" />
                            <span className="text-center text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Technical Issue
                            </span>
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem
                              value="billing"
                              className="sr-only"
                            />
                          </FormControl>
                          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
                            <CreditCard className="mb-3 h-6 w-6" />
                            <span className="text-center text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Billing Question
                            </span>
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem
                              value="feature"
                              className="sr-only"
                            />
                          </FormControl>
                          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
                            <Lightbulb className="mb-3 h-6 w-6" />
                            <span className="text-center text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Feature Request
                            </span>
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem
                              value="account"
                              className="sr-only"
                            />
                          </FormControl>
                          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
                            <User className="mb-3 h-6 w-6" />
                            <span className="text-center text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Account Access
                            </span>
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem
                              value="general"
                              className="sr-only"
                            />
                          </FormControl>
                          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
                            <HelpCircle className="mb-3 h-6 w-6" />
                            <span className="text-center text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              General Inquiry
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
                className="w-full sm:w-auto"
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
                className="w-full sm:w-auto"
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
