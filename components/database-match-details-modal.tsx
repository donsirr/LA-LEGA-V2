"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Match, MatchStatistics } from "@/lib/supabase"
import { X, Clock, Hash, Trophy, Target } from "lucide-react"
import { useState } from "react"

interface DatabaseMatchDetailsModalProps {
  match: Match | null
  isOpen: boolean
  onClose: () => void
}

export default function DatabaseMatchDetailsModal({ match, isOpen, onClose }: DatabaseMatchDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "statistics" | "sets">("overview")

  if (!match || !match.home_team || !match.away_team) return null

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const StatBar = ({
    label,
    homeValue,
    awayValue,
    homeColor,
    awayColor,
  }: {
    label: string
    homeValue: number
    awayValue: number
    homeColor: string
    awayColor: string
  }) => {
    const total = homeValue + awayValue
    const homePercentage = total > 0 ? (homeValue / total) * 100 : 50
    const awayPercentage = total > 0 ? (awayValue / total) * 100 : 50

    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-white">{homeValue}</span>
          <span className="text-xs text-gray-400">{label}</span>
          <span className="text-sm font-medium text-white">{awayValue}</span>
        </div>
        <div className="flex h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${homePercentage}%`,
              backgroundColor: homeColor,
            }}
          />
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${awayPercentage}%`,
              backgroundColor: awayColor,
            }}
          />
        </div>
      </div>
    )
  }

  // Get statistics for home and away teams from database
  const homeStats = match.statistics?.find((stat: MatchStatistics) => stat.team_id === match.home_team_id)
  const awayStats = match.statistics?.find((stat: MatchStatistics) => stat.team_id === match.away_team_id)

  // Check if we have statistics data
  const hasStatistics = homeStats && awayStats
  const hasSetScores = match.set_scores && match.set_scores.length > 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold text-white">Match Details</DialogTitle>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        {/* Match Header */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="border-gray-600 text-gray-400">
              {match.league}
            </Badge>
            <div className="flex items-center gap-2">
              {match.status === "live" && <Badge className="bg-red-600 animate-pulse">LIVE</Badge>}
              {match.status === "scheduled" && (
                <Badge variant="outline" className="border-green-600 text-green-400">
                  Upcoming
                </Badge>
              )}
              {match.status === "completed" && (
                <Badge variant="outline" className="border-gray-600 text-gray-400">
                  Final
                </Badge>
              )}
            </div>
          </div>

          {/* Teams Display */}
          <div className="grid grid-cols-3 items-center gap-4">
            {/* Home Team */}
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-2"
              >
                <img src={match.home_team_image_url}></img>
              </div>
              <h3 className="font-bold text-lg">{match.home_team.name}</h3>
              <p className="text-gray-400 text-sm">{match.home_team.city}</p>
              {(match.status === "completed" || match.status === "live") && (
                <div className="text-3xl font-bold mt-2">{match.home_score}</div>
              )}
            </div>

            {/* VS */}
            <div className="text-center">
              <div className="text-gray-500 font-bold text-xl">VS</div>
            </div>

            {/* Away Team */}
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-2"
              >
                <img src={match.away_team_image_url}></img>
              </div>
              <h3 className="font-bold text-lg">{match.away_team.name}</h3>
              <p className="text-gray-400 text-sm">{match.away_team.city}</p>
              {(match.status === "completed" || match.status === "live") && (
                <div className="text-3xl font-bold mt-2">{match.away_score}</div>
              )}
            </div>
          </div>

          {/* Match Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-700">
            <div className="flex items-center text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              <div>
                <div className="text-xs">Date & Time</div>
                <div className="text-white text-sm">{formatDate(match.match_date)}</div>
                <div className="text-white text-sm">{formatTime(match.match_date)}</div>
              </div>
            </div>
            <div className="flex items-center text-gray-400">
              <Hash className="w-4 h-4 mr-2" />
              <div>
                <div className="text-xs">Round</div>
                <div className="text-white text-sm">{match.round || "Regular Season"}</div>
              </div>
            </div>
            <div className="flex items-center text-gray-400">
              <Trophy className="w-4 h-4 mr-2" />
              <div>
                <div className="text-xs">League</div>
                <div className="text-white text-sm">{match.league}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("overview")}
            className={activeTab === "overview" ? "bg-red-600 hover:bg-red-700" : "hover:bg-gray-700"}
          >
            Overview
          </Button>
          {hasStatistics && (
            <Button
              variant={activeTab === "statistics" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("statistics")}
              className={activeTab === "statistics" ? "bg-red-600 hover:bg-red-700" : "hover:bg-gray-700"}
            >
              Statistics
            </Button>
          )}
          {hasSetScores && (
            <Button
              variant={activeTab === "sets" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("sets")}
              className={activeTab === "sets" ? "bg-red-600 hover:bg-red-700" : "hover:bg-gray-700"}
            >
              Set Scores
            </Button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Team Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 text-center">{match.home_team.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">League Ranking</span>
                    <span className="font-bold">#{match.home_team.ranking}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Wins - Losses</span>
                    <span className="font-bold">
                      {match.home_team.wins}-{match.home_team.losses}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Championships</span>
                    <span className="font-bold">{match.home_team.championships}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">League</span>
                    <span className="font-bold">{match.home_team.league}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 text-center">{match.away_team.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">League Ranking</span>
                    <span className="font-bold">#{match.away_team.ranking}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Wins - Losses</span>
                    <span className="font-bold">
                      {match.away_team.wins}-{match.away_team.losses}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Championships</span>
                    <span className="font-bold">{match.away_team.championships}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">League</span>
                    <span className="font-bold">{match.away_team.league}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "statistics" && hasStatistics && (
          <div className="space-y-6">
            {/* Match Statistics */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="font-semibold mb-4 flex items-center">
                <Target className="w-4 h-4 mr-2 text-blue-400" />
                Match Statistics
              </h4>
              <div className="space-y-4">
                <StatBar
                  label="Total Points"
                  homeValue={homeStats.total_points}
                  awayValue={awayStats.total_points}
                  homeColor={match.home_team.primary_color}
                  awayColor={match.away_team.primary_color}
                />
                <StatBar
                  label="Attacks"
                  homeValue={homeStats.attacks}
                  awayValue={awayStats.attacks}
                  homeColor={match.home_team.primary_color}
                  awayColor={match.away_team.primary_color}
                />
                <StatBar
                  label="Blocks"
                  homeValue={homeStats.blocks}
                  awayValue={awayStats.blocks}
                  homeColor={match.home_team.primary_color}
                  awayColor={match.away_team.primary_color}
                />
                <StatBar
                  label="Aces"
                  homeValue={homeStats.aces}
                  awayValue={awayStats.aces}
                  homeColor={match.home_team.primary_color}
                  awayColor={match.away_team.primary_color}
                />
                <StatBar
                  label="Kills"
                  homeValue={homeStats.kills}
                  awayValue={awayStats.kills}
                  homeColor={match.home_team.primary_color}
                  awayColor={match.away_team.primary_color}
                />
                <StatBar
                  label="Digs"
                  homeValue={homeStats.digs}
                  awayValue={awayStats.digs}
                  homeColor={match.home_team.primary_color}
                  awayColor={match.away_team.primary_color}
                />
                <StatBar
                  label="Errors"
                  homeValue={homeStats.errors}
                  awayValue={awayStats.errors}
                  homeColor={match.home_team.primary_color}
                  awayColor={match.away_team.primary_color}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "sets" && hasSetScores && (
          <div className="space-y-6">
            {/* Set Scores */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Set Scores</h4>
              <div className="space-y-3">
                {match.set_scores?.map((set, index) => (
                  <div key={set.id} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                    <span className="text-gray-400">Set {set.set_number}</span>
                    <div className="flex items-center space-x-4">
                      <span className="font-bold">{set.home_score}</span>
                      <span className="text-gray-500">-</span>
                      <span className="font-bold">{set.away_score}</span>
                      {set.duration_minutes > 0 && (
                        <span className="text-xs text-gray-400">({set.duration_minutes}min)</span>
                      )}
                      {set.home_score > set.away_score ? (
                        <Badge className="bg-green-600 text-xs">{match.home_team.name}</Badge>
                      ) : set.away_score > set.home_score ? (
                        <Badge className="bg-green-600 text-xs">{match.away_team.name}</Badge>
                      ) : (
                        <Badge className="bg-yellow-600 text-xs">In Progress</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
