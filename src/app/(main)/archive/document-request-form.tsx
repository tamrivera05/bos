'use client';
import { Input } from '@/components/ui/input';
import { useApiFetch } from '@/lib/hooks/useApiFetch';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMask } from '@react-input/mask';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import { Calendar } from '../../../components/ui/calendar';
import { Card, CardContent, CardFooter } from '../../../components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../../components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../../components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import documentRequestSchema, {
  RequestFormValues
} from './document-request-schema';

const documentImages = {
  postal_id: '/PostalId.png',
  birth_certificate: '/BirthCertificate.jpg',
  barangay_id: '/BarangayID.jpg',
  voters_id: '/VotersID.png',
  business_clearance: '/BusinessClearance.jpg',
  barangay_clearance: '/BarangayClearance.png'
};

export default function DocumentRequestForm() {
  const [isLoading, setIsLoading] = useState(false);
  const fetchApi = useApiFetch();

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(documentRequestSchema),
    defaultValues: {
      fullName: '',
      address: '',
      email: '',
      contactNumber: '',
      documentType: '',
      purpose: ''
    }
  });

  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const onSubmit: SubmitHandler<RequestFormValues> = useCallback(
    async (values) => {
      setIsLoading(true);
      const { error } = await fetchApi('/documents', {
        method: 'POST',
        body: JSON.stringify({
          type: values.documentType,
          full_name: values.fullName,
          address: values.address,
          email: values.email,
          contact_number: values.contactNumber,
          date_of_birth: format(values.birthdate, 'yyyy-MM-dd'),
          purpose: values.purpose
        })
      });

      if (error) {
        toast.error('An error occurred while submitting your request.');
        setIsLoading(false);
        return;
      }

      toast.success('Your request has been submitted successfully.');
      form.reset();
      setIsLoading(false);
    },
    [fetchApi, form]
  );

  const contactRef = useMask({
    mask: '+63 (___) ___ ____',
    replacement: { _: /\d/ }
  });

  return (
    <>
      <Card className="mx-auto max-w-3xl">
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
                      <Input
                        disabled={isLoading}
                        placeholder="Juan Dela Cruz"
                        {...field}
                      />
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
                    <FormLabel className="text-[#1F2937]">
                      Complete Address
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="123 Main St, Barangay Example, City, Province"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1F2937]">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="juan@example.com"
                          type="email"
                          {...field}
                        />
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
                      <FormLabel className="text-[#1F2937]">
                        Contact Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="09123456789"
                          {...field}
                          ref={contactRef}
                        />
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
                    <FormLabel className="text-[#1F2937]">
                      Date of Birth
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isLoading}
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
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
                    <FormLabel className="text-[#1F2937]">
                      Document Type
                    </FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedDocument(value);
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
                        <SelectItem value="birth_certificate">
                          Birth Certificate
                        </SelectItem>
                        <SelectItem value="barangay_id">Barangay ID</SelectItem>
                        <SelectItem value="voters_id">Voter's ID</SelectItem>
                        <SelectItem value="business_clearance">
                          Business Clearance
                        </SelectItem>
                        <SelectItem value="barangay_clearance">
                          Barangay Clearance
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedDocument && (
                <div className="mt-4">
                  <h3 className="mb-2 text-lg font-medium">Document Preview</h3>
                  <div className="overflow-hidden rounded-md border">
                    <Image
                      src={
                        documentImages[
                          selectedDocument as keyof typeof documentImages
                        ] || '/placeholder.svg'
                      }
                      alt={`${selectedDocument.replace('_', ' ')} preview`}
                      width={600}
                      height={400}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This is a sample preview of the document you are requesting.
                  </p>
                </div>
              )}

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1F2937]">
                      Purpose of Request
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Please explain why you need this document..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Briefly explain why you are requesting this document.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-[#1F2937]"
              >
                Submit Request
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <p>
            For inquiries, please contact the Barangay Office at 8255-6321 /
            255-63-21.
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
