import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import UrgentReservation from './components/UrgentReservation'


export const metadata: Metadata = {
  title: 'Private Taxi',
  description: 'Book your private taxi ride',
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
       <UrgentReservation/>
        <Footer/>
      </body>
    </html>
  )
}