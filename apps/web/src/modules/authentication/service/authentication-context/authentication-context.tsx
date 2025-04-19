'use client'
import {
  createContext,
  FC,
  ReactNode,
  useContext,
} from 'react'
import { User } from '@/modules/authentication/model/user-model'
import { useSession, signIn, signOut } from '@/modules/authentication/service/auth-client/auth-client'

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // Use the better-auth useSession hook to get session data
  const {
    data: session,
    isPending: loading,
    error,
    refetch
  } = useSession()

  // Extract user data from session if available
  const user = session?.user as User | null

  // Use better-auth signIn method for login
  const login = async (email: string, password: string) => {
    await signIn.email({
      email,
      password
    })
    // Refetch session data after login
    await refetch()
  }

  // Use better-auth signOut method for logout
  const logout = async () => {
    await signOut()
    // Refetch session data after logout
    await refetch()
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      error: error || null,
      refetch 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
