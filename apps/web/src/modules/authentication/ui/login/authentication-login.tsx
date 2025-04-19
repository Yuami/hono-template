'use client'
import Link from 'next/link'
import LoginImage from '@/components/images/login-image'
import { FC, useCallback } from 'react'
import { useAuthenticationLogin } from '@/modules/authentication/service/authentication-login-service/authentication-login-service'
import { FormattedMessage } from 'react-intl'
import { LoginForm } from '@/modules/authentication/ui/login/authentication-login-form'
import { LoginTransfer } from '@/modules/authentication/service/authentication-login-service/authentication-login-service-contract'

export const AuthenticationLogin: FC = () => {
  const { login } = useAuthenticationLogin()

  const handleSubmit = useCallback(
    ({ email, password }: LoginTransfer): void => {
      login(email, password)
    },
    [login]
  )

  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              <FormattedMessage id="login_title" defaultMessage="Login" />
            </h1>
            <p className="text-balance text-muted-foreground">
              <FormattedMessage
                id="login_description"
                defaultMessage="Enter your email below to login to your account"
              />
            </p>
          </div>
          <LoginForm onSubmit={handleSubmit} />
          <div className="mt-4 text-center text-sm">
            <FormattedMessage
              id="login_no_account"
              defaultMessage="Don't have an account?"
            />{' '}
            <Link href="/register" className="underline">
              <FormattedMessage id="login_signup" defaultMessage="Sign Up" />
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <LoginImage className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  )
}
