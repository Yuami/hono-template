import React, { FC } from 'react'
import { RegisterUser } from '@/modules/authentication/model/user-model'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { FormattedMessage, useIntl } from 'react-intl'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import {
  registrationSchema,
  RegistrationTransfer,
} from '@/modules/authentication/service/authentication-register-service/authentication-register-service-contract'
import { zodResolver } from '@hookform/resolvers/zod'

type RegistrationFormProps = {
  onSubmit: (registerUser: RegisterUser) => void
}

export const RegistrationForm: FC<RegistrationFormProps> = ({ onSubmit }) => {
  const intl = useIntl()
  const form = useForm<RegistrationTransfer>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FormattedMessage
                      id="register_first_name"
                      defaultMessage="First Name"
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={intl.formatMessage({
                        id: 'register_first_name_placeholder',
                        defaultMessage: 'John',
                      })}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FormattedMessage
                      id="register_last_name"
                      defaultMessage="Last Name"
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={intl.formatMessage({
                        id: 'register_last_name_placeholder',
                        defaultMessage: 'Robinson',
                      })}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormattedMessage
                    id="register_email"
                    defaultMessage="Email"
                  />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={intl.formatMessage({
                      id: 'register_email_placeholder',
                      defaultMessage: 'm@example.com',
                    })}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormattedMessage
                    id="register_password"
                    defaultMessage="Password"
                  />
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormattedMessage
                    id="register_password_confirmation"
                    defaultMessage="Confirm Password"
                  />
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">
            <FormattedMessage
              id="register_button"
              defaultMessage="Create an account"
            />
          </Button>
          <Button variant="outline" className="w-full">
            <FormattedMessage
              id="register_google_button"
              defaultMessage="Sign up with Google"
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}
