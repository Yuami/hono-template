const AUTH_ROUTES = ['/login', '/register', '/forgot-password']

const PUBLIC_ROUTES = [...AUTH_ROUTES]

const isRouteInArray = (pathname: string, routes: string[]): boolean => {
  return routes.includes(pathname)
}

export const isPublicRoute = (pathname: string): boolean => {
  return isRouteInArray(pathname, PUBLIC_ROUTES)
}

export const isAuthRoute = (pathname: string): boolean => {
  return isRouteInArray(pathname, AUTH_ROUTES)
}
