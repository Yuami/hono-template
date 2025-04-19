const AUTHENTICATION_LOGIN_API_PATH = '/api/v1/auth/login'
const AUTHENTICATION_REGISTER_API_PATH = '/api/v1/auth/register'
const AUTHENTICATION_CSRF_API_PATH = '/api/v1/auth/csrf'
const AUTHENTICATION_USER_CHECK_API_PATH = '/api/v1/auth/session'
const AUTHENTICATION_USER_API_PATH = '/api/v1/auth/user'
const AUTHENTICATION_LOGOUT_API_PATH = '/api/v1/auth/logout'

export function getAuthenticationLoginApiPathFor(): string {
  return AUTHENTICATION_LOGIN_API_PATH
}

export function getAuthenticationRegisterApiPathFor(): string {
  return AUTHENTICATION_REGISTER_API_PATH
}

export function getAuthenticationCsrfApiPathFor(): string {
  return AUTHENTICATION_CSRF_API_PATH
}

export function getAuthenticationUserCheckApiPathFor(): string {
  return AUTHENTICATION_USER_CHECK_API_PATH
}

export function getAuthenticationUserApiPathFor(): string {
  return AUTHENTICATION_USER_API_PATH
}

export function getAuthenticationLogoutApiPathFor(): string {
  return AUTHENTICATION_LOGOUT_API_PATH
}
