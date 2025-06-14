"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFeaturedPlayers } from "@/lib/database"
import type { Player } from "@/lib/supabase"
import DatabasePlayerProfileModal from "./database-player-profile-modal"

export default function DatabaseStoryBoxes() {
  const [players, setPlayers] = useState<Player[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  const playersPerView = 3

  useEffect(() => {
    async function loadPlayers() {
      try {
        const data = await getFeaturedPlayers()
        setPlayers(data)
      } catch (error) {
        console.error("Error loading featured players:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPlayers()
  }, [])

  const maxIndex = Math.max(0, players.length - playersPerView)

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player)
    setIsModalOpen(true)
  }

  const handlePrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1))
  }

  if (loading) {
    return (
      <section className="py-8 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-white mb-6">Player Spotlight</h2>
          <div className="flex space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-64 bg-gray-800 rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-[4/5] bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Player Spotlight</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 p-2"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 p-2"
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="overflow-hidden">
          <div
            className="flex space-x-4 pb-4 transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (256 + 16)}px)`,
            }}
          >
            {players.map((player) => (
              <div
                key={player.id}
                className="flex-shrink-0 w-64 bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all duration-300 cursor-pointer group hover:scale-105"
                onClick={() => handlePlayerClick(player)}
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={player.image_url || "/placeholder.svg"}
                    alt={player.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-600 text-white text-xs font-semibold hover:bg-red-500">
                      {player.category}
                    </Badge>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-red-400 transition-colors">
                      {player.name}
                    </h3>
                    <p className="text-gray-300 text-sm">{player.position}</p>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="p-4 bg-gray-800">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-white font-bold text-lg">{player.stats?.[0]?.points || 0}</div>
                      <div className="text-gray-400 text-xs">Points</div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">{player.stats?.[0]?.blocks || 0}</div>
                      <div className="text-gray-400 text-xs">Blocks</div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">{player.stats?.[0]?.aces || 0}</div>
                      <div className="text-gray-400 text-xs">Aces</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Player Profile Modal */}
      <DatabasePlayerProfileModal player={selectedPlayer} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
