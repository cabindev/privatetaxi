// app/page.tsx
import OurServices from './cars/page'
import Carousel from './components/Carousel'
import Pricing from './pricing/page'
import GalleryPreview from './components/GalleryPreview'
import Transfer from './components/Transfer'
import Script from 'next/script'


export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "Private Taxi Pattaya",
    "image": "URL_รูปภาพ_ของคุณ",
    "description": "บริการแท็กซี่พัทยา รถรับส่งสนามบิน",
    "areaServed": "Pattaya",
    "availableLanguage": ["th", "en"],
    "priceRange": "฿฿฿"
  }

  return (
    <>
      <Script
        id="schema-taxi"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col min-h-screen">
        <Carousel />
        <OurServices />
        <Transfer />
        <GalleryPreview />
        <Pricing />
      </main>
    </>
  )
}