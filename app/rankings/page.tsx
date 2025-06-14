import DatabaseRankingsTable from "@/components/database-rankings-table"
import Header from "@/components/header"

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Rankings</h1>
          <p className="text-gray-400">Current standings and team rankings across all leagues</p>
        </div>
        <DatabaseRankingsTable />
      </div>
    </div>
  )
}
