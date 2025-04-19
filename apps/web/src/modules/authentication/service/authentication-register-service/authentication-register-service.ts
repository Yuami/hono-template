import { useCallback } from 'react'
import { RegisterUser } from '@/modules/authentication/model/user-model'
import { signUp } from '@/modules/authentication/service/auth-client/auth-client'

export const useAuthenticationRegister = (): ((
  registerUser: RegisterUser
) => Promise<void>) => {
  return useCallback(async (registerUser: RegisterUser) => {
    await signUp.email({
      email: registerUser.email,
      password: registerUser.password,
      name: registerUser.name,
      password_confirmation: registerUser.password_confirmation
    })
  }, [])
}
