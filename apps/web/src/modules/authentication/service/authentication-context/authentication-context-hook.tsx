import { useEffect, useState } from 'react'
import {
  getUserCheckQuery,
  getUserQuery,
} from '@/modules/authentication/service/authentication-api/authentication-api'
import { User } from '@/modules/authentication/model/user-model'

export const useAuthenticationCheckUser = (
  updateUser: (user: User | null) => void
): boolean => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if the user has an active session
        const sessionData = await getUserCheckQuery()

        if (sessionData && sessionData.authenticated) {
          // If authenticated, get the user data
          const userData = await getUserQuery()

          if (userData) {
            // Transform the data if needed to match our User type
            updateUser(userData)
          } else {
            updateUser(null)
          }
        } else {
          updateUser(null)
        }
      } catch (error) {
        console.error('Authentication check failed:', error)
        updateUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [updateUser])

  return loading
}
