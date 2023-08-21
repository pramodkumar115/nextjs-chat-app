'use client'
import { redirect } from 'next/navigation'
import { CookiesProvider } from 'react-cookie'
import HomePage from './homePage/page'

export default function Home() {
      //redirect("/homePage");
      return <CookiesProvider>
                  {redirect("/homePage")}
            </CookiesProvider>
}
