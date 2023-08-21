import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './commons/header'
import Footer from './commons/footer'
import Head from 'next/head'
import Link from 'next/link'
import NavLink from './commons/NavLink'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Chat App</title>
      </head>
      <body className={"bg-gray-200"}>
        <Header title={"Chat Application"}/>
        <div className='p-4 min-h-[calc(100vh-100px)] container mx-auto'>{children}</div>
        <Footer />
      </body>

    </html>
  )
}
