import { createAuthClient } from 'better-auth/react'

// Create the auth client instance with the base URL of the API
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080',
})

// Export individual hooks and methods for easier access
export const { useSession, signIn, signOut, signUp } = authClient
