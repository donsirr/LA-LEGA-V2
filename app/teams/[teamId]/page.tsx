import DatabaseTeamRoster from "@/components/database-team-roster"
import Header from "@/components/header"

interface TeamPageProps {
  params: {
    teamId: string
  }
}

export default function TeamPage({ params }: TeamPageProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <DatabaseTeamRoster teamId={params.teamId} />
    </div>
  )
}