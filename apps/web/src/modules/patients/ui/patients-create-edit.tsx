'use client'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { FC } from 'react'
import { SingleDatePicker } from '@/modules/base/ui/date-picker/single-date-picker'

const patientFormSchema = z.object({
  name: z.string().min(2).max(60),
  last_name: z.string().min(2).max(100),
  legal_id: z.string().min(8).max(50),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  address: z.string().min(2).max(255),
  birth_date: z.date(),
})

type PatientFormValues = z.infer<typeof patientFormSchema>

export type PatientsCreateEditProps = {
  patient?: Patient
  onSubmit?: (data: PatientFormValues) => void
}

const patientToFormValues = (
  patient: Patient | undefined
): PatientFormValues | undefined => {
  if (!patient) return undefined

  return {
    name: patient.name,
    last_name: patient.last_name,
    legal_id: patient.legal_id,
    email: patient.email,
    phone: patient.phone,
    address: patient.address,
    birth_date: new Date(patient.birth_date),
  }
}

export const PatientsCreateEdit: FC<PatientsCreateEditProps> = ({
  patient,
  onSubmit,
}) => {
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: patientToFormValues(patient),
  })

  function handleOnSubmit(data: PatientFormValues) {
    onSubmit?.(data)
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
        <div className="flex space-x-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="email@email.com" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birth_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Date</FormLabel>
              <FormControl>
                <SingleDatePicker
                  defaultDate={new Date(field.value)}
                  onDateChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div></div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
