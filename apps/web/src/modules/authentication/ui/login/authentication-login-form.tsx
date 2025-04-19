import { FormattedMessage } from 'react-intl'
import { useForm } from 'react-hook-form'
import {
  loginSchema,
  LoginTransfer,
} from '@/modules/authentication/service/authentication-login-service/authentication-login-service-contract'
import { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useIntl } from 'react-intl'

type LoginFormProps = {
  onSubmit: (data: LoginTransfer) => void
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const intl = useIntl()
  const form = useForm<LoginTransfer>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormattedMessage id="login_email" defaultMessage="Email" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder={intl.formatMessage({
                      id: 'login_email_placeholder',
                      defaultMessage: 'you@example.com',
                    })}
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
                    id="login_password"
                    defaultMessage="Password"
                  />
                </FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            <FormattedMessage id="login_button" defaultMessage="Login" />
          </Button>
          <Button variant="outline" className="w-full">
            <FormattedMessage
              id="login_google_button"
              defaultMessage="Login with Google"
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}
