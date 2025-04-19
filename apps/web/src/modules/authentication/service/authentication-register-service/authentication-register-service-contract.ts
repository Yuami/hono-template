import { TypeOf, z } from 'zod'

export const registrationSchema = z
  .object({
    name: z.string().min(1, { message: 'First name is required' }),
    last_name: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    password_confirmation: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
  })
  .superRefine((data) => {
    if (data.password !== data.password_confirmation) {
      return { password_confirmation: 'Passwords do not match' }
    }
    return data
  })

export type RegistrationTransfer = TypeOf<typeof registrationSchema>
