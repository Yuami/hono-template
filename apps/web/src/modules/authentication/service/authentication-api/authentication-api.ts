import integracareApi from '@/modules/base/service/integracare-api/integracare-api'
import {
  getAuthenticationCsrfApiPathFor,
  getAuthenticationLoginApiPathFor,
  getAuthenticationLogoutApiPathFor,
  getAuthenticationRegisterApiPathFor,
  getAuthenticationUserApiPathFor,
  getAuthenticationUserCheckApiPathFor,
} from '@/modules/authentication/service/authentication-api/authentication-api-config'
import { RegisterUser } from '@/modules/authentication/model/user-model'

export async function updateCsrfCookie() {
  // This might not be needed with better-auth, but keeping the function for compatibility
  try {
    await integracareApi.get(getAuthenticationCsrfApiPathFor())
  } catch (error) {
    console.warn('CSRF endpoint not available, continuing without CSRF token')
  }
}

export async function postLoginAction(email: string, password: string) {
  // Try to get CSRF token but continue if it fails
  try {
    await updateCsrfCookie()
  } catch (error) {
    console.warn('Failed to get CSRF token, continuing with login')
  }

  try {
    const response = await integracareApi.post(
      getAuthenticationLoginApiPathFor(),
      { email, password }
    )
    return response.data
  } catch (error) {
    console.error('Failed to login:', error)
    throw error
  }
}

export async function getUserCheckQuery() {
  try {
    const response = await integracareApi.get(
      getAuthenticationUserCheckApiPathFor()
    )
    return response.data
  } catch (error) {
    console.error('Failed to check user authentication status:', error)
    // Return null to indicate user is not authenticated
    return null
  }
}

export async function getUserQuery() {
  try {
    const response = await integracareApi.get(getAuthenticationUserApiPathFor())
    return response.data
  } catch (error) {
    console.error('Failed to get user data:', error)
    // Return null to indicate user data is not available
    return null
  }
}

export async function postLogoutAction() {
  try {
    await integracareApi.post(getAuthenticationLogoutApiPathFor())
  } catch (error) {
    console.error('Failed to logout:', error)
    throw error
  }
}

export async function postRegisterAction(registerUser: RegisterUser) {
  // Try to get CSRF token but continue if it fails
  try {
    await updateCsrfCookie()
  } catch (error) {
    console.warn('Failed to get CSRF token, continuing with registration')
  }

  // Format the request to match better-auth's expected format
  const requestData = {
    email: registerUser.email,
    password: registerUser.password,
    name: registerUser.name,
    // password_confirmation is included as is
    password_confirmation: registerUser.password_confirmation
  }

  try {
    const response = await integracareApi.post(
      getAuthenticationRegisterApiPathFor(),
      requestData
    )
    return response.data
  } catch (error) {
    console.error('Failed to register user:', error)
    throw error
  }
}
