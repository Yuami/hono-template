'use client'
import { AuthProvider } from '@/modules/authentication/service/authentication-context/authentication-context'
import { ProtectedRoutes } from '@/modules/base/service/protected-routes/protected-routes'
import { IntlProvider } from 'react-intl'
import { useLocale } from '@/modules/locale/messages'
import { ReactNode } from 'react'

export const Providers = ({ children }: { children: ReactNode }) => {
  const { locale, messages } = useLocale()

  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <AuthProvider>
        <ProtectedRoutes>{children}</ProtectedRoutes>
      </AuthProvider>
    </IntlProvider>
  )
}
