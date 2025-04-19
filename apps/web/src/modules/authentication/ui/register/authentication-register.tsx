'use client'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import Link from 'next/link'
import LoginImage from '@/components/images/login-image'
import { useAuthenticationRegister } from '@/modules/authentication/service/authentication-register-service/authentication-register-service'
import { useRouter } from 'next/navigation'
import { RegistrationTransfer } from '@/modules/authentication/service/authentication-register-service/authentication-register-service-contract'
import { RegistrationForm } from '@/modules/authentication/ui/register/authentication-registration-form'

export const AuthenticationRegister = () => {
  const register = useAuthenticationRegister()
  const router = useRouter()

  const onSubmit = (data: RegistrationTransfer) => {
    register(data)
    router.push('/login')
  }

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              <FormattedMessage id="register_title" defaultMessage="Register" />
            </h1>
            <p className="text-balance text-muted-foreground">
              <FormattedMessage
                id="register_description"
                defaultMessage="Enter your details below to create your account"
              />
            </p>
          </div>
          <RegistrationForm onSubmit={onSubmit} />
          <div className="mt-4 text-center text-sm">
            <FormattedMessage
              id="register_have_account"
              defaultMessage="Already have an account? "
            />{' '}
            <Link href="/login" className="underline">
              <FormattedMessage
                id="register_sign_in"
                defaultMessage="Sign in"
              />
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
