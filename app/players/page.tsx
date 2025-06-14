import Header from "@/components/header"
import DatabasePlayersGrid from "@/components/database-players-grid"

export default function PlayersPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Players</h1>
          <p className="text-gray-400">Explore all volleyball players across teams and leagues</p>
        </div>
        <DatabasePlayersGrid />
      </div>
    </div>
  )
}