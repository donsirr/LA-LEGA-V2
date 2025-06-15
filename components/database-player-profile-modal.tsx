"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Player } from "@/lib/supabase"
import { X, Flag, Users, Trophy, BarChart3, Target, Shield, Zap, Loader2 } from "lucide-react"

interface DatabasePlayerProfileModalProps {
  player: Player | null
  isOpen: boolean
  onClose: () => void
  loading?: boolean
}

export default function DatabasePlayerProfileModal({
  player,
  isOpen,
  onClose,
  loading = false,
}: DatabasePlayerProfileModalProps) {
  if (!isOpen) return null

  if (loading || !player) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[400px] bg-gradient-to-br from-gray-900 to-gray-800 text-white border-gray-700">
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
            <span className="ml-2 text-white">Loading player data...</span>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const stats = player.stats?.[0] // Get the first (current) stats record
  console.log("Modal player data:", player) // Debug log
  console.log("Modal stats data:", stats) // Debug log

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white border-gray-700">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full flex items-center justify-center">
                    <img src={player.image_url || "/placeholder.svg"}></img>
                </div>
              </div>
              <div>
                <DialogTitle className="text-3xl font-bold text-white mb-2">
                  {player.name || "Unknown Player"}
                </DialogTitle>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {player.team?.name || "Free Agent"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flag className="h-4 w-4" />
                    {player.nationality || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Left Column - Player Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-red-500" />
                Player Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Height:</span>
                  <span className="font-semibold">{player.height || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Region:</span>
                  <span className="font-semibold">{player.region || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <Badge className="bg-blue-600">{player.category || "N/A"}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">League:</span>
                  <span className="font-semibold">{player.team?.league || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Biography Card */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Biography</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{player.bio || "No biography available."}</p>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-4 text-center">
                <Trophy className="h-6 w-6 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold text-white">{stats?.points || 0}</div>
                <div className="text-xs text-red-100">Points</div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold text-white">{stats?.blocks || 0}</div>
                <div className="text-xs text-blue-100">Blocks</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-4 text-center">
                <Zap className="h-6 w-6 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold text-white">{stats?.aces || 0}</div>
                <div className="text-xs text-yellow-100">Aces</div>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-center">
                <Target className="h-6 w-6 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold text-white">{stats?.digs || 0}</div>
                <div className="text-xs text-green-100">Digs</div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-red-500" />
                Performance Metrics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Attack Percentage</span>
                    <span className="font-semibold">{stats?.attack_percentage || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(stats?.attack_percentage || 0, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Attack Efficiency</span>
                    <span className="font-semibold">{stats?.attack_efficiency || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(stats?.attack_efficiency || 0, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Serve Effectiveness</span>
                    <span className="font-semibold">{stats?.serve_effectiveness || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(stats?.serve_effectiveness || 0, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Defense Rating</span>
                    <span className="font-semibold">{stats?.defense_rating || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(stats?.defense_rating || 0, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Additional Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-lg font-bold text-white">{stats?.form_rating || 0}/10</div>
                  <div className="text-xs text-gray-400">Form Rating</div>
                </div>
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-lg font-bold text-white">{stats?.matches_played || 0}</div>
                  <div className="text-xs text-gray-400">Matches Played</div>
                </div>
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-lg font-bold text-white">
                    {player.team?.wins || 0}-{player.team?.losses || 0}
                  </div>
                  <div className="text-xs text-gray-400">Team Record</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</div>
            <Button onClick={onClose} className="bg-red-600 hover:bg-red-700">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
