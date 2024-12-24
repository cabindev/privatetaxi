// app/components/ChristmasWishes.tsx
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ChristmasWishes() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const today = new Date()
    const isChristmas = today.getMonth() === 11 && 
      (today.getDate() >= 23 && today.getDate() <= 27)

    if (isChristmas) {
      setTimeout(() => setIsVisible(true), 2000)
      setTimeout(() => setIsVisible(false), 12000)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Sparkles Container */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative max-w-3xl w-full mx-4 animate-fadeInOut">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
          <Image
            src="/images/Chrismas.jpg"
            alt="Merry Christmas"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-red-500">Merry</span> Christmas
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mb-4">
            ขออวยพรให้ทุกท่านมีความสุขในเทศกาลคริสต์มาส
          </p>
          <p className="text-lg md:text-2xl text-white/80">
            และพบเจอแต่สิ่งดีๆ ตลอดปีใหม่ที่กำลังจะมาถึง
          </p>
          <div className="mt-8 text-4xl md:text-6xl animate-bounce">
            🎄 🎅 ⛄️
          </div>
        </div>
      </div>
    </div>
  )
}