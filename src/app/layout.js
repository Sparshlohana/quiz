'use client'

import { Inter } from 'next/font/google';
import { ThemeContextProvider } from './context/context';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: `Spash's Quiz`,
  description: 'Enjoy the quiz!!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeContextProvider>
        <body className={inter.className}>{children}</body>
      </ThemeContextProvider>
    </html>
  )
}
