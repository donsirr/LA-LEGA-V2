"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getPlayerRankings, subscribeToPlayerRankings, getFullPlayerData } from "@/lib/database"
import type { PlayerRanking, Player } from "@/lib/supabase"
import DatabasePlayerProfileModal from "./database-player-profile-modal"
import { Search, Loader2, TrendingUp, TrendingDown, Minus, Trophy } from "lucide-react"

export default function DatabasePlayerRankings() {
  const [rankings, setRankings] = useState<PlayerRanking[]>([])
  const [filteredRankings, setFilteredRankings] = useState<PlayerRanking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPosition, setSelectedPosition] = useState<string>("all")
  const [selectedLeague, setSelectedLeague] = useState<string>("all")
  const [selectedNationality, setSelectedNationality] = useState<string>("all")
  const [ageFilter, setAgeFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)

  const positions = ["Outside Hitter", "Setter", "Middle Blocker", "Libero", "Opposite Hitter"]

  // Load initial data
  useEffect(() => {
    async function loadRankings() {
      setLoading(true)
      const data = await getPlayerRankings()
      console.log("Loaded rankings:", data) // Debug log
      setRankings(data)
      setFilteredRankings(data)
      setLoading(false)
    }

    loadRankings()

    // Subscribe to real-time updates
    const subscription = subscribeToPlayerRankings((updatedRankings) => {
      setRankings(updatedRankings)
      applyFilters(updatedRankings)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Apply filters
  const applyFilters = (data: PlayerRanking[] = rankings) => {
    let filtered = data

    // Position filter
    if (selectedPosition !== "all") {
      filtered = filtered.filter((r) => r.position === selectedPosition)
    }

    // League filter
    if (selectedLeague !== "all") {
      filtered = filtered.filter((r) => r.player?.team?.league === selectedLeague)
    }

    // Nationality filter
    if (selectedNationality !== "all") {
      filtered = filtered.filter((r) => r.player?.nationality === selectedNationality)
    }

    // Age filter
    if (ageFilter !== "all") {
      filtered = filtered.filter((r) => {
        const age = r.player?.age || 0
        switch (ageFilter) {
          case "young":
            return age < 25
          case "prime":
            return age >= 25 && age <= 30
          case "veteran":
            return age > 30
          default:
            return true
        }
      })
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.player?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.player?.team?.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredRankings(filtered)
  }

  // Update filters
  useEffect(() => {
    applyFilters()
  }, [selectedPosition, selectedLeague, selectedNationality, ageFilter, searchQuery, rankings])

  // Get unique values for filters
  const leagues = Array.from(new Set(rankings.map((r) => r.player?.team?.league).filter(Boolean)))
  const nationalities = Array.from(new Set(rankings.map((r) => r.player?.nationality).filter(Boolean)))

  const handlePlayerClick = async (ranking: PlayerRanking) => {
    if (ranking.player?.id) {
      setModalLoading(true)
      setIsModalOpen(true)

      // Fetch full player data for the modal
      const fullPlayerData = await getFullPlayerData(ranking.player.id)
      console.log("Full player data:", fullPlayerData) // Debug log

      if (fullPlayerData) {
        setSelectedPlayer(fullPlayerData)
      } else {
        // Fallback to ranking player data if full data fetch fails
        setSelectedPlayer(ranking.player)
      }

      setModalLoading(false)
    }
  }

  const getTrendIcon = (trend: string | number) => {
    const trendStr = String(trend)
    switch (trendStr) {
      case "up":
      case "1":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "down":
      case "-1":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
        <span className="ml-2 text-white">Loading player rankings...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Real-time indicator */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Player Rankings</h1>
        <Badge variant="outline" className="border-green-500 text-green-500">
          🔴 Live Data
        </Badge>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search players or teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>

            {/* Position Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedPosition === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPosition("all")}
                className={selectedPosition === "all" ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"}
              >
                All Positions
              </Button>
              {positions.map((position) => (
                <Button
                  key={position}
                  variant={selectedPosition === position ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPosition(position)}
                  className={
                    selectedPosition === position ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
                  }
                >
                  {position}
                </Button>
              ))}
            </div>

            {/* Other Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded px-3 py-2"
              >
                <option value="all">All Leagues</option>
                {leagues.map((league) => (
                  <option key={league} value={league}>
                    {league}
                  </option>
                ))}
              </select>

              <select
                value={selectedNationality}
                onChange={(e) => setSelectedNationality(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded px-3 py-2"
              >
                <option value="all">All Countries</option>
                {nationalities.map((nationality) => (
                  <option key={nationality} value={nationality}>
                    {nationality}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="text-gray-400 mb-4">
        Showing {filteredRankings.length} of {rankings.length} players
      </div>

      {/* Rankings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRankings.map((ranking, index) => (
          <div
            key={ranking.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 hover:border-red-500 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl"
            onClick={() => handlePlayerClick(ranking)}
          >
            {/* Rank Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  #{ranking.overall_rank}
                </div>
                {ranking.overall_rank <= 3 && (
                  <Trophy
                    className={`h-5 w-5 ${ranking.overall_rank === 1
                      ? "text-yellow-500"
                      : ranking.overall_rank === 2
                        ? "text-gray-400"
                        : "text-amber-700"
                      }`}
                  />
                )}
              </div>
              <div className="flex items-center space-x-1">{getTrendIcon(ranking.form_trend)}</div>
            </div>

            {/* Player Avatar */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full flex items-center justify-center">
                  {/* <span className="text-white font-bold text-lg">
                    {ranking.player?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2) || "??"}
                  </span> */}
                  <img src={ranking.player?.image_url || "/placeholder.svg"}></img>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-gray-800 rounded-full p-1">
                  <Badge className="bg-blue-600 text-xs px-2 py-0.5">
                    {ranking.player?.position?.slice(0, 3) || "N/A"}
                  </Badge>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{ranking.player?.name || "Unknown Player"}</h3>
                <p className="text-gray-400 text-sm">{ranking.player?.team?.name || "Free Agent"}</p>
                <p className="text-gray-500 text-xs">
                  {ranking.player?.nationality || "Unknown"} • Region {ranking.player?.age || "N/A"}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-red-400">{ranking.total_score?.toFixed(1) || "0.0"}</div>
                <div className="text-xs text-gray-400">Total Score</div>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-yellow-400">{ranking.form_rating || 0}/10</div>
                <div className="text-xs text-gray-400">Form Rating</div>
              </div>
            </div>

            {/* Performance Bars */}
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Attack</span>
                  <span>{ranking.player?.stats?.[0]?.attack_percentage || 0}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full"
                    style={{ width: `${Math.min(ranking.player?.stats?.[0]?.attack_percentage || 0, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Defense</span>
                  <span>{ranking.player?.stats?.[0]?.defense_rating || 0}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full"
                    style={{ width: `${Math.min(ranking.player?.stats?.[0]?.defense_rating || 0, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Click indicator */}
            <div className="mt-4 text-center">
              <span className="text-xs text-gray-500">Click for details</span>
            </div>
          </div>
        ))}
      </div>

      {filteredRankings.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-8 text-center">
            <p className="text-gray-400">No players found matching your filters.</p>
          </CardContent>
        </Card>
      )}

      {/* Player Profile Modal */}
      <DatabasePlayerProfileModal
        player={selectedPlayer}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedPlayer(null)
        }}
        loading={modalLoading}
      />
    </div>
  )
}
