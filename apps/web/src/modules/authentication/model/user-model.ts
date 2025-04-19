export type User = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string
  createdAt: string
  updatedAt: string
  stripeCustomerId?: string
}

export type RegisterUser = {
  name: string
  email: string
  password: string
  password_confirmation: string
}
