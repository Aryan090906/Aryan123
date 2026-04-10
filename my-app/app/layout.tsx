import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserProgressProvider } from '@/context/UserProgressContext'
import { Navbar } from '@/components/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Codexium - Gamified Learning Platform',
  description: 'Master Data Structures and Algorithms through gamified learning. Solve problems, earn XP, level up, and become a coding master!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <UserProgressProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-6">
              {children}
            </main>
          </div>
        </UserProgressProvider>
      </body>
    </html>
  )
}
