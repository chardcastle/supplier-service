import React from 'react';
import { Providers } from "./providers";
import { Providers as ReduxProviders } from '@/lib/providers'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html className="h-full bg-white" lang="en">
      <body className={[inter.className].concat(["h-full"]).join(" ")}>
        <ReduxProviders>
          <Providers>
            {children}
          </Providers>
        </ReduxProviders>
      </body>
    </html>
  )
}
