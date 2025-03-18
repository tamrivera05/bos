"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import Image from "next/image"

import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter } from "../../../components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Textarea } from "../../../components/ui/textarea"
import { Calendar } from "../../../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { toast } from "sonner";
import documentRequestSchema, { RequestFormValues } from "./document-request-schema"

const documentImages = {
    postal_id: "/PostalId.png",
    birth_certificate: "/BirthCertificate.jpg",
    barangay_id: "/BarangayID.jpg",
    voters_id: "/VotersID.png",
    business_clearance: "/BusinessClearance.jpg",
    barangay_clearance: "/BarangayClearance.png",
  }
  
  export default function DocumentRequestForm() {
    const form = useForm<RequestFormValues>({
      resolver: zodResolver(documentRequestSchema),
      defaultValues: {
        fullName: "",
        address: "",
        email: "",
        contactNumber: "",
        documentType: "",
        purpose: "",
      },
    })
  
    const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  
     const onSubmit: SubmitHandler<RequestFormValues> = async (values) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        toast.success("Request Submitted");
        
        // Reset form after 2 seconds
        setTimeout(() => {
          console.log(values)
          form.reset();
        }, 2000);
    }
  
    return (
      <>
        <Card className="max-w-3xl mx-auto">
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1F2937]">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Juan Dela Cruz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1F2937]">Complete Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="123 Main St, Barangay Example, City, Province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1F2937]">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="juan@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1F2937]">Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="09123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
  
                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-[#1F2937]">Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1F2937]">Document Type</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          setSelectedDocument(value)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select the document you need" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="postal_id">Postal ID</SelectItem>
                          <SelectItem value="birth_certificate">Birth Certificate</SelectItem>
                          <SelectItem value="barangay_id">Barangay ID</SelectItem>
                          <SelectItem value="voters_id">Voter's ID</SelectItem>
                          <SelectItem value="business_clearance">Business Clearance</SelectItem>
                          <SelectItem value="barangay_clearance">Barangay Clearance</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                {selectedDocument && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Document Preview</h3>
                    <div className="border rounded-md overflow-hidden">
                      <Image
                        src={documentImages[selectedDocument as keyof typeof documentImages] || "/placeholder.svg"}
                        alt={`${selectedDocument.replace("_", " ")} preview`}
                        width={600}
                        height={400}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      This is a sample preview of the document you are requesting.
                    </p>
                  </div>
                )}
  
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1F2937]">Purpose of Request</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please explain why you need this document..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Briefly explain why you are requesting this document.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <Button type="submit" className="w-full bg-[#1F2937]">
                  Submit Request
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <p>For inquiries, please contact the Barangay Office at 8255-6321 / 255-63-21.</p>
          </CardFooter>
        </Card>
      </>
    )
  }
