"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getPlayers, getTeams } from "@/lib/database"
import type { Player, Team } from "@/lib/supabase"
import PlayerProfileModal from "./database-player-profile-modal"
import { Search, Filter, Flag, Users, Loader2 } from "lucide-react"

export default function DatabasePlayersGrid() {
  const [players, setPlayers] = useState<Player[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPosition, setSelectedPosition] = useState<string>("all")
  const [selectedTeam, setSelectedTeam] = useState<string>("all")
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Load data
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const [playersData, teamsData] = await Promise.all([getPlayers(), getTeams()])
      setPlayers(playersData)
      setTeams(teamsData)
      setLoading(false)
    }

    loadData()
  }, [])

  // Get unique positions for filtering
  const positions = useMemo(() => {
    return Array.from(new Set(players.map((player) => player.position)))
  }, [players])

  // Filter players based on search query and filters
  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesSearch =
        searchQuery === "" ||
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.nationality.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPosition = selectedPosition === "all" || player.position === selectedPosition
      const matchesTeam = selectedTeam === "all" || player.team?.name === selectedTeam

      return matchesSearch && matchesPosition && matchesTeam
    })
  }, [players, searchQuery, selectedPosition, selectedTeam])

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
        <span className="ml-2 text-white">Loading players...</span>
      </div>
    )
  }

  return (
    <div>
      {/* Search and Filters */}
      <div className="bg-gray-800 p-4 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search players by name or nationality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Filter className="text-gray-400 h-4 w-4" />
            <span className="text-gray-400 text-sm">Filters:</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Position Filter */}
          <div className="flex flex-wrap gap-2 mr-4">
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

          {/* Team Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTeam === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTeam("all")}
              className={selectedTeam === "all" ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"}
            >
              All Teams
            </Button>
            {/* {teams.map((team) => (
              <Button
                key={team.id}
                variant={selectedTeam === team.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTeam(team.name)}
                className={selectedTeam === team.name ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"}
              >
                {team.name}
              </Button>
            ))} */}
            {teams
              // .filter((team) => team.id >= 1 && team.id <= 16)
              .filter((team) => team.league === "ASIA Cup" || team.league === "EUROPA Cup")
              .map((team) => (
                <Button
                  key={team.id}
                  variant={selectedTeam === team.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTeam(team.name)}
                  className={
                    selectedTeam === team.name
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  }
                >
                  {team.name}
                </Button>
              ))}

          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-400">
          Showing <span className="text-white font-medium">{filteredPlayers.length}</span> players
        </p>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredPlayers.map((player) => (
          <div
            key={player.id}
            className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all duration-300 cursor-pointer group hover:scale-105"
            onClick={() => handlePlayerClick(player)}
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={player.image_url || "/placeholder.svg"}
                alt={player.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Player Number */}
              <div className="absolute top-3 right-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{player.id}</span>
                </div>
              </div>

              {/* Player Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-red-400 transition-colors">
                  {player.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    className="bg-gray-700 text-gray-300 text-xs"
                    style={{ backgroundColor: player.team?.primary_color }}
                  >
                    {player.position}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center">
                    <Flag className="w-3 h-3 mr-1" />
                    <span>{player.nationality}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    <span>{player.team?.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-white font-bold text-sm">{player.stats?.[0]?.points || 0}</div>
                  <div className="text-gray-400 text-xs">PTS</div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{player.stats?.[0]?.blocks || 0}</div>
                  <div className="text-gray-400 text-xs">BLK</div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{player.stats?.[0]?.aces || 0}</div>
                  <div className="text-gray-400 text-xs">ACE</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No players found matching your filters.</p>
          <Button
            variant="outline"
            className="mt-4 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            onClick={() => {
              setSearchQuery("")
              setSelectedPosition("all")
              setSelectedTeam("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Player Profile Modal */}
      <PlayerProfileModal player={selectedPlayer} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
