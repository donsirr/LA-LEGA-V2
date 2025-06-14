import Header from "@/components/header"
import DatabasePlayerRankings from "@/components/database-player-rankings"

export default function PlayerRankings() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <DatabasePlayerRankings />
      </div>
    </div>
  )
}
