"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "LA LEGA - Welcome to the New Era.",
      badge: "LEAGUE",
      image: "/cover1.png",
    },
    {
      title: "KENY - SEASON 1 MVP.",
      badge: "ASIA Cup",
      image: "/KENYMVP.jpg",
    },
    {
      title: "LA LEGA - Europe is coming.",
      badge: "EUROPA Cup",
      image: "/cover4.png",
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
