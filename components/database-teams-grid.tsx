"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTeams } from "@/lib/database"
import type { Team } from "@/lib/supabase"
import { Users, Trophy, MapPin, Loader2, Filter } from "lucide-react"

export default function DatabaseTeamsGrid() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLeague, setSelectedLeague] = useState<string>("all")

  useEffect(() => {
    async function loadTeams() {
      setLoading(true)
      const data = await getTeams()
      setTeams(data)
      setLoading(false)
    }

    loadTeams()
  }, [])

  // Get unique leagues for filtering
  const leagues = Array.from(new Set(teams.map((team) => team.league)))

  // Filter teams based on selected league
  const filteredTeams = teams.filter((team) => {
    return selectedLeague === "all" || team.league === selectedLeague
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
        <span className="ml-2 text-white">Loading teams...</span>
      </div>
    )
  }

  return (
    <div>

      {/* League Filter */}
      <div className="bg-gray-800 p-4 rounded-lg mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-white font-medium">Filter by League:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedLeague === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLeague("all")}
            className={selectedLeague === "all" ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"}
          >
            All Leagues ({teams.length})
          </Button>
          {leagues.map((league) => {
            const count = teams.filter((t) => t.league === league).length
            return (
              <Button
                key={league}
                variant={selectedLeague === league ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLeague(league)}
                className={selectedLeague === league ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"}
              >
                {league} ({count})
              </Button>
            )
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-400">
          Showing <span className="text-white font-medium">{filteredTeams.length}</span> teams
          {selectedLeague !== "all" && <span> in {selectedLeague}</span>}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTeams.map((team) => (
          <Link key={team.id} href={`/teams/${team.id}`}>
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all duration-300 cursor-pointer group hover:scale-105">
              {/* Team Header with Colors */}
              <div className="h-32 relative" style={{ backgroundColor: team.primary_color }}>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/20 text-white border-white/30">{team.league}</Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-xl group-hover:text-gray-200 transition-colors">
                    {team.name}
                  </h3>
                  <br></br>
                </div>
              </div>

              {/* Team Logo */}
              <div className="relative -mt-8 ml-4 mb-4">
                <div className="w-16 h-16 bg-white/0 flex items-center justify-center">
                  <span>
                    <img src={team.image_url}></img>
                  </span>
                </div>
              </div>

              {/* Team Stats */}
              <div className="px-4 pb-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="text-white font-bold">16</div>
                    <div className="text-gray-400 text-xs">Players</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Trophy className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="text-white font-bold">{team.wins}</div>
                    <div className="text-gray-400 text-xs">Wins</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No teams found for the selected league.</p>
          <Button
            variant="outline"
            className="mt-4 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            onClick={() => setSelectedLeague("all")}
          >
            Show All Teams
          </Button>
        </div>
      )}

    </div>
  )
}
