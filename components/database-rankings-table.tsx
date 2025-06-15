"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getTeamRankingsByLeague, getTeamPerformance } from "@/lib/database"
import type { Team, TeamPerformance } from "@/lib/supabase"
import { ArrowUpDown, Trophy, TrendingUp, TrendingDown, Minus, Loader2, ChevronUp, ChevronDown } from "lucide-react"

type SortField = "ranking" | "wins" | "losses" | "points" | "winPercentage"
type SortDirection = "asc" | "desc"

interface TeamWithPerformance extends Team {
  recentForm?: TeamPerformance[]
  points?: number
  winPercentage?: number
}

export default function DatabaseRankingsTable() {
  const [allTeams, setAllTeams] = useState<TeamWithPerformance[]>([])
  const [displayTeams, setDisplayTeams] = useState<TeamWithPerformance[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLeague, setSelectedLeague] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>("points")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  useEffect(() => {
    async function loadRankings() {
      setLoading(true)
      const data = await getTeamRankingsByLeague("all") // Always load all teams first

      // Load recent form for each team
      const teamsWithPerformance = await Promise.all(
        data.map(async (team) => {
          const recentForm = await getTeamPerformance(team.id)
          const points = team.wins * 3 + team.losses * 1
          const winPercentage = team.wins + team.losses > 0 ? (team.wins / (team.wins + team.losses)) * 100 : 0

          return {
            ...team,
            recentForm,
            points,
            winPercentage,
          }
        }),
      )

      setAllTeams(teamsWithPerformance)
      setLoading(false)
    }

    loadRankings()
  }, [])

  // Filter and sort teams whenever league or sort changes
  useEffect(() => {
    let filteredTeams = [...allTeams]

    // Apply league filter
    if (selectedLeague !== "all") {
      filteredTeams = filteredTeams.filter((team) => team.league === selectedLeague)
    }

    // Apply sorting
    filteredTeams.sort((a, b) => {
      let aValue: number
      let bValue: number

      switch (sortField) {
        case "ranking":
          aValue = a.ranking
          bValue = b.ranking
          break
        case "wins":
          aValue = a.wins
          bValue = b.wins
          break
        case "losses":
          aValue = a.losses
          bValue = b.losses
          break
        case "points":
          aValue = a.points || 0
          bValue = b.points || 0
          break
        case "winPercentage":
          aValue = a.winPercentage || 0
          bValue = b.winPercentage || 0
          break
        default:
          aValue = a.ranking
          bValue = b.ranking
      }

      if (sortDirection === "asc") {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })

    setDisplayTeams(filteredTeams)
  }, [allTeams, selectedLeague, sortField, sortDirection])

  // Get unique leagues for filtering
  const leagues = Array.from(new Set(allTeams.map((team) => team.league)))

  // Handle column header click
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection(field === "ranking" ? "asc" : "desc") // Default to desc for performance metrics
    }
  }

  // Get sort icon
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-3 w-3 text-red-500" />
    ) : (
      <ChevronDown className="ml-1 h-3 w-3 text-red-500" />
    )
  }

  const getTrendIcon = (team: TeamWithPerformance) => {
    const stats = team.statistics?.[0]
    if (!stats) {
      const winRate = team.wins / (team.wins + team.losses)
      if (winRate > 0.6) return <TrendingUp className="w-4 h-4 text-green-500" />
      if (winRate < 0.4) return <TrendingDown className="w-4 h-4 text-red-500" />
      return <Minus className="w-4 h-4 text-gray-500" />
    }

    switch (stats.trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  // Group teams by league for display
  const teamsByLeague = allTeams.reduce((acc, team) => {
    if (!acc[team.league]) acc[team.league] = []
    acc[team.league].push(team)
    return acc
  }, {} as Record<string, TeamWithPerformance[]>)

  Object.values(teamsByLeague).forEach((teams) => {
    teams.sort((a, b) => (b.points ?? 0) - (a.points ?? 0))
  })

  const filteredLeagues =
    selectedLeague === "all" ? Object.entries(teamsByLeague) : [[selectedLeague, teamsByLeague[selectedLeague] || []]]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
        <span className="ml-2 text-white">Loading rankings...</span>
      </div>
    )
  }

  return (
    <div>
      {/* League Filter */}
      <div className="bg-gray-800 p-4 rounded-lg mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Trophy className="w-4 h-4 text-gray-400" />
          <span className="text-white font-medium">Filter by League:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedLeague === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLeague("all")}
            className={selectedLeague === "all" ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"}
          >
            All Leagues ({allTeams.length})
          </Button>
          {leagues.map((league) => {
            const count = allTeams.filter((t) => t.league === league).length
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

      {/* Sort Info */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm">
          Showing <span className="text-white font-medium">{displayTeams.length}</span> teams
          {selectedLeague !== "all" && <span> in {selectedLeague}</span>}
          {sortField !== "ranking" && (
            <span>
              {" "}
              • Sorted by{" "}
              <span className="text-white font-medium">
                {sortField === "winPercentage" ? "Win %" : sortField.charAt(0).toUpperCase() + sortField.slice(1)}
              </span>{" "}
              ({sortDirection === "desc" ? "Highest first" : "Lowest first"})
            </span>
          )}
        </p>
      </div>

      {/* Multi-League Tables */}
      {filteredLeagues.map(([leagueName, teams]) => (
        <div key={leagueName} className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">{leagueName}</h2>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-700">
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
                      onClick={() => handleSort("ranking")}
                    >
                      <div className="flex items-center">
                        <span>Rank</span>
                        {getSortIcon("ranking")}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Team</th>
                    <th
                      className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
                      onClick={() => handleSort("points")}
                    >
                      <div className="flex items-center justify-center">
                        <span>Points</span>
                        {getSortIcon("points")}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
                      onClick={() => handleSort("wins")}
                    >
                      <div className="flex items-center justify-center">
                        <span>W</span>
                        {getSortIcon("wins")}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
                      onClick={() => handleSort("losses")}
                    >
                      <div className="flex items-center justify-center">
                        <span>L</span>
                        {getSortIcon("losses")}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
                      onClick={() => handleSort("winPercentage")}
                    >
                      <div className="flex items-center justify-center">
                        <span>Win %</span>
                        {getSortIcon("winPercentage")}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Trend
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Last 5
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {teams.map((team, index) => {
                    const winPercentage = team.winPercentage?.toFixed(1) || "0.0"
                    const points = team.points || 0

                    return (
                      <tr key={team.id} className="hover:bg-gray-750 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-bold text-white text-lg">{index + 1}</span>
                            {index + 1 <= 3 && (
                              <Trophy
                                className={`ml-2 h-4 w-4 ${index + 1 === 1
                                  ? "text-yellow-500"
                                  : index + 1 === 2
                                    ? "text-gray-400"
                                    : "text-amber-700"
                                  }`}
                              />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Link
                            href={`/teams/${team.id}`}
                            className="flex items-center hover:opacity-80 transition-opacity"
                          >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                              <img src={team.image_url} />
                            </div>
                            <div>
                              <div className="font-medium text-white">{team.name}</div>
                              <div className="text-gray-400 text-xs">
                                {team.city} • {team.league}
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <span className="font-bold text-white text-lg">{points}</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <span className="text-green-500 font-semibold">{team.wins}</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <span className="text-red-500 font-semibold">{team.losses}</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <span className="text-white font-semibold">{winPercentage}%</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center">{getTrendIcon(team)}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex justify-center space-x-1">
                            {team.recentForm?.slice(0, 5).map((match, matchIndex) => (
                              <div
                                key={matchIndex}
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${match.result === "W"
                                  ? "bg-green-600 text-white"
                                  : match.result === "L"
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-600 text-white"
                                  }`}
                                title={`vs Team ${match.opponent_id}: ${match.points_scored}-${match.points_conceded}`}
                              >
                                {match.result}
                              </div>
                            )) ||
                              Array.from({ length: 5 }, (_, formIndex) => (
                                <div
                                  key={formIndex}
                                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-gray-600 text-white"
                                >
                                  -
                                </div>
                              ))}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}


      {displayTeams.length === 0 && (
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