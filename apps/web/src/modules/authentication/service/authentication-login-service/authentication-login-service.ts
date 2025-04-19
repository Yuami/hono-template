import { useCallback } from 'react'
import { useAuth } from '@/modules/authentication/service/authentication-context/authentication-context'

export const useAuthenticationLogin = (): {
  login: (email: string, password: string) => Promise<void>
} => {
  const auth = useAuth()

  const login = useCallback(
    async (email: string, password: string) => {
      if (auth) {
        await auth.login(email, password)
      } else {
        throw new Error('Authentication context not available')
      }
    },
    [auth]
  )

  return { login }
}
