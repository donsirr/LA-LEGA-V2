import Header from "@/components/header"
import DatabaseTeamsGrid from "@/components/database-teams-grid"

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Teams</h1>
          <p className="text-gray-400">Explore all volleyball teams and their rosters</p>
        </div>
        <DatabaseTeamsGrid />
      </div>
    </div>
  )
}