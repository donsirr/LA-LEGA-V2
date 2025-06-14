import DatabaseScheduleGrid from "@/components/database-schedule-grid"
import Header from "@/components/header"

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Match Schedule</h1>
          <p className="text-gray-400">View upcoming matches, live games, and results</p>
        </div>
        <DatabaseScheduleGrid />
      </div>
    </div>
  )
}