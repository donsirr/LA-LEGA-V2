"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PlayerProfileModal from "./database-player-profile-modal"
import { getTeamById, getPlayersByTeam } from "@/lib/database"
import type { Team, Player } from "@/lib/supabase"
import { ArrowLeft, Users, Trophy, MapPin, Calendar, Target, Loader2 } from "lucide-react"

interface DatabaseTeamRosterProps {
  teamId: string
}

export default function DatabaseTeamRoster({ teamId }: DatabaseTeamRosterProps) {
  const [team, setTeam] = useState<Team | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function loadTeamData() {
      setLoading(true)
      const [teamData, playersData] = await Promise.all([
        getTeamById(teamId),
        getPlayersByTeam(teamId),
      ])
      setTeam(teamData)
      setPlayers(playersData)
      setLoading(false)
    }

    loadTeamData()
  }, [teamId])

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
        <span className="ml-2 text-white">Loading team...</span>
      </div>
    )
  }

  if (!team) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Team not found</h1>
          <Link href="/teams">
            <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              Back to Teams
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Group players by position
  const playersByPosition = players.reduce(
    (acc, player) => {
      if (!acc[player.position]) {
        acc[player.position] = []
      }
      acc[player.position].push(player)
      return acc
    },
    {} as Record<string, Player[]>,
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/teams">
        <Button variant="outline" className="mb-6 bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Teams
        </Button>
      </Link>

      {/* Team Header */}
      <div className="rounded-lg p-8 mb-8 relative overflow-hidden" style={{ backgroundColor: team.primary_color }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{team.name}</h1>
              <p className="text-white/80 text-lg mb-4">
                {team.city} • {team.league}
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-white">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{players.length} Players</span>
                </div>
                <div className="flex items-center text-white">
                  <Trophy className="w-5 h-5 mr-2" />
                  <span>{team.wins} Wins</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="w-24 h-24 bg-white/0 rounded-lg flex items-center justify-center mb-4">
                <span>
                  <img src={team.image_url}></img>
                </span>
              </div>
              <Badge className="bg-white/20 text-white border-white/30">{team.league}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-gray-400" />
            <span className="text-2xl font-bold text-white">
              {team.wins}-{team.losses}
            </span>
          </div>
          <p className="text-gray-400 text-sm">W-L Record</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-5 h-5 text-gray-400" />
            <span className="text-2xl font-bold text-white">{team.championships}</span>
          </div>
          <p className="text-gray-400 text-sm">Championships</p>
        </div>
      </div>

      {/* Roster by Position */}
      <div className="space-y-8">
        {Object.entries(playersByPosition).map(([position, positionPlayers]) => (
          <div key={position}>
            <h2 className="text-2xl font-bold text-white mb-4">{position}s</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {positionPlayers.map((player) => (
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
                      <p className="text-gray-300 text-sm mb-2">{player.position}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        {/* <span>{player.age} years</span> */}
                        <span>{player.nationality}</span>
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
          </div>
        ))}
      </div>

      {/* Player Profile Modal */}
      <PlayerProfileModal player={selectedPlayer} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
