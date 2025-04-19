'use client'
import { FC, ReactNode, useEffect, useState } from 'react'
import { useAuth } from '@/modules/authentication/service/authentication-context/authentication-context'
import { usePathname, useRouter } from 'next/navigation'
import { isAuthRoute, isPublicRoute } from '@/modules/config/routes-config'
import { FormattedMessage } from 'react-intl'
import { LoadingPage } from '@/modules/base/ui/loading/loading-page'

type ProtectedRoutesProps = {
  children: ReactNode
}

export const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ children }) => {
  const auth = useAuth()
  const router = useRouter()
  const pathName = usePathname()
  const [loading, setLoading] = useState(true)
  const user = auth?.user ?? null

  useEffect(() => {
    const shouldRedirect = !user && !isPublicRoute(pathName) && !auth?.loading

    if (shouldRedirect) {
      router.push('/login')
      return
    }

    if (user && isAuthRoute(pathName)) {
      router.push('/dashboard')
      return
    }

    // We need this since we don't want a flicker of the loading screen
    if (!auth?.loading) {
      setLoading(false)
    }
  }, [user, router, auth?.loading, pathName])

  if (!auth || loading) {
    return (
      <LoadingPage
        text={
          <FormattedMessage
            id={'loading_page_title'}
            defaultMessage={'Loading your content'}
          />
        }
      />
    )
  }

  return children
}
