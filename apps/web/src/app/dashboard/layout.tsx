import { ReactNode } from 'react'
import { Navigation } from '@/modules/base/navigation/ui/navigation'

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <Navigation>{children}</Navigation>
}
