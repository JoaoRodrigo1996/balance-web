import '../lib/dayjs'
import '../styles/globals.css'
import type { Metadata } from 'next'
import { Roboto_Mono, Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import { TransactionContextProvider } from '@/contexts/transaction-context'
import { AuthContextProvider } from '@/contexts/auth-context'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: 'Balance',
  description:
    'Balance is a applications where you can register your incomes and outcomes during the month.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} ${roboto_mono.variable} font-sans`}
      >
        <AuthContextProvider>
          <TransactionContextProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
          </TransactionContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
