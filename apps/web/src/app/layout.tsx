import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { Providers } from '@/modules/base/ui/providers'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html className="h-full bg-white" lang="en">
      <body className={`${inter.variable} h-full`}>
        <Providers>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  )
}
