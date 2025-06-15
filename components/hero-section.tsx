"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "LA LEGA - Welcome to the New Era.",
      badge: "CONTINENTAL Cup",
      image: "https://media.discordapp.net/attachments/1372237334363246673/1377216167491539005/cover_s2.png?ex=684d4001&is=684bee81&hm=286dddfc2aaed00780416eb9c9f6837bf4927a9067787efec6c70358997b7fb2&=&format=webp&quality=lossless",
    },
    {
      title: "LA LEGA - Road to Greatness Awaits.",
      badge: "ASIA Cup",
      image: "/cover2.jpg",
    },
    {
      title: "LA LEGA - Welcomes Europe Division!",
      badge: "EUROPA Cup",
      image: "https://media.discordapp.net/attachments/1342067436945539084/1378666608599236608/DRAGONSOFTHEREDSUN.png?ex=684d40d5&is=684bef55&hm=f6e4625aa3c5e523a04e60107a5950a9073bfefaa03b08782caa16fa8bb49ed8&=&format=webp&quality=lossless&",
    },
  ]

  // Auto-play slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={slides[currentSlide].image || "/placeholder.svg"}
          alt="Volleyball player celebrating"
          fill
          className="object-cover transition-opacity duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <Badge className="bg-lime-400 text-black font-bold mb-4 hover:bg-lime-300">
            {slides[currentSlide].badge}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-1000">
            {slides[currentSlide].title}
          </h1>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full">
        <div className="absolute inset-0 bg-gradient-to-l from-red-600/20 to-transparent transform skew-x-12" />
        <div className="absolute top-20 right-20 w-32 h-1 bg-red-600 transform rotate-45" />
        <div className="absolute top-32 right-16 w-24 h-1 bg-red-600 transform rotate-45" />
        <div className="absolute top-44 right-12 w-16 h-1 bg-red-600 transform rotate-45" />
      </div>
    </section>
  )
}
