// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import UrgentReservation from './components/UrgentReservation'
import ChristmasWishes from './components/ChristmasWishes'

export const metadata: Metadata = {
  title: 'Private Taxi Pattaya | แท็กซี่พัทยา | รถรับส่งสนามบิน',
  description: 'บริการแท็กซี่พัทยา รถรับส่งสนามบิน Private taxi service in Pattaya, Airport transfer, Professional drivers, 24/7 service',
  keywords: 'แท็กซี่พัทยา, taxi pattaya, private taxi, รถรับส่งสนามบิน, airport transfer pattaya',
  openGraph: {
    title: 'Private Taxi Pattaya | แท็กซี่พัทยา',
    description: 'บริการแท็กซี่พัทยา รถรับส่งสนามบิน Private taxi service in Pattaya',
    locale: 'th_TH',
    type: 'website'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <ChristmasWishes/>
        <UrgentReservation/>
        <Footer/>
      </body>
    </html>
  )
}