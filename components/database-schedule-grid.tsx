"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getMatches } from "@/lib/database"
import type { Match } from "@/lib/supabase"
import DatabaseMatchDetailsModal from "./database-match-details-modal"
import { Calendar, Filter, Loader2, Hash } from "lucide-react"

export default function DatabaseScheduleGrid() {
    const [matches, setMatches] = useState<Match[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedLeague, setSelectedLeague] = useState<string>("all")
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        async function fetchMatches() {
            try {
                const data = await getMatches()
                setMatches(data)
            } catch (error) {
                console.error("Error fetching matches:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchMatches()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
                <span className="ml-2 text-white">Loading matches...</span>
            </div>
        )
    }

    // Get unique leagues for filtering
    const leagues = Array.from(new Set(matches.map((match) => match.league)))

    // Filter matches based on selected filters
    const filteredMatches = matches.filter((match) => {
        const leagueMatch = selectedLeague === "all" || match.league === selectedLeague
        const statusMatch = selectedStatus === "all" || match.status === selectedStatus
        return leagueMatch && statusMatch
    })

    // Group matches by date
    const matchesByDate = filteredMatches.reduce(
        (acc, match) => {
            const dateKey = new Date(match.match_date).toDateString()
            if (!acc[dateKey]) {
                acc[dateKey] = []
            }
            acc[dateKey].push(match)
            return acc
        },
        {} as Record<string, Match[]>,
    )

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "live":
                return <Badge className="bg-red-600 animate-pulse">LIVE</Badge>
            case "scheduled":
                return (
                    <Badge variant="outline" className="border-green-600 text-green-400">
                        Upcoming
                    </Badge>
                )
            case "completed":
                return (
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                        Final
                    </Badge>
                )
            default:
                return null
        }
    }

    const handleMatchClick = (match: Match) => {
        setSelectedMatch(match)
        setIsModalOpen(true)
    }

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <span className="text-white font-medium">Filters:</span>
                </div>

                {/* League Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">League:</span>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={selectedLeague === "all" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedLeague("all")}
                            className={selectedLeague === "all" ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"}
                        >
                            All
                        </Button>
                        {leagues.map((league) => (
                            <Button
                                key={league}
                                variant={selectedLeague === league ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedLeague(league)}
                                className={selectedLeague === league ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"}
                            >
                                {league}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Status:</span>
                    <div className="flex gap-2">
                        <Button
                            variant={selectedStatus === "all" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedStatus("all")}
                            className={selectedStatus === "all" ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"}
                        >
                            All
                        </Button>
                        <Button
                            variant={selectedStatus === "scheduled" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedStatus("scheduled")}
                            className={
                                selectedStatus === "scheduled" ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
                            }
                        >
                            Upcoming
                        </Button>
                        <Button
                            variant={selectedStatus === "live" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedStatus("live")}
                            className={selectedStatus === "live" ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"}
                        >
                            Live
                        </Button>
                        <Button
                            variant={selectedStatus === "completed" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedStatus("completed")}
                            className={
                                selectedStatus === "completed" ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
                            }
                        >
                            Completed
                        </Button>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-400">
                    Showing <span className="text-white font-medium">{filteredMatches.length}</span> matches
                </p>
            </div>

            {/* Matches by Date */}
            <div className="space-y-8">
                {Object.entries(matchesByDate).map(([date, dayMatches]) => (
                    <div key={date}>
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar className="w-5 h-5 text-red-500" />
                            <h2 className="text-xl font-bold text-white">
                                {new Date(date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </h2>
                            <Badge variant="outline" className="text-gray-400 border-gray-600">
                                {dayMatches.length} {dayMatches.length === 1 ? "match" : "matches"}
                            </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {dayMatches.map((match) => (
                                <div
                                    key={match.id}
                                    className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors cursor-pointer"
                                    onClick={() => handleMatchClick(match)}
                                >
                                    {/* Match Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                                            {match.league}
                                        </Badge>
                                        {getStatusBadge(match.status)}
                                    </div>

                                    {/* Teams */}
                                    <div className="space-y-3 mb-4">
                                        {/* Home Team */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className="w-8 h-8 rounded-full flex items-center justify-center"
                                                >
                                                    <img src={match.home_team_image_url}></img>
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium">{match.home_team?.name || "Unknown Team"}</div>
                                                    <div className="text-gray-400 text-xs">{match.home_team?.city}</div>
                                                </div>
                                            </div>
                                            {match.status === "completed" && (
                                                <div className="text-white font-bold text-lg">{match.home_score}</div>
                                            )}
                                        </div>

                                        {/* VS Divider */}
                                        <div className="flex items-center justify-center">
                                            <div className="text-gray-500 text-sm font-medium">VS</div>
                                        </div>

                                        {/* Away Team */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className="w-8 h-8 rounded-full flex items-center justify-center"
                                                >
                                                    <img src={match.away_team_image_url}></img>
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium">{match.away_team?.name || "Unknown Team"}</div>
                                                    <div className="text-gray-400 text-xs">{match.away_team?.city}</div>
                                                </div>
                                            </div>
                                            {match.status === "completed" && (
                                                <div className="text-white font-bold text-lg">{match.away_score}</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Match Details */}
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center text-gray-400">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <span>{formatTime(match.match_date)}</span>
                                        </div>
                                        <div className="flex items-center text-gray-400">
                                            <Hash className="w-4 h-4 mr-2" />
                                            <span>Round {match.round}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {filteredMatches.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No matches found for the selected filters.</p>
                    <Button
                        variant="outline"
                        className="mt-4 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                        onClick={() => {
                            setSelectedLeague("all")
                            setSelectedStatus("all")
                        }}
                    >
                        Clear Filters
                    </Button>
                </div>
            )}

            {/* Match Details Modal */}
            <DatabaseMatchDetailsModal match={selectedMatch} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}
