import { supabase } from "./supabase"
import type { Team, Player, PlayerRanking, Match, MatchStatistics, SetScore, TeamPerformance } from "./supabase"

// Teams
export async function getTeams(): Promise<Team[]> {
  const { data, error } = await supabase.from("teams").select("*").order("ranking")

  if (error) {
    console.error("Error fetching teams:", error)
    return []
  }

  return data || []
}

export async function getTeamById(id: number): Promise<Team | null> {
  const { data, error } = await supabase.from("teams").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching team:", error)
    return null
  }

  return data
}

export async function getTeamBySlug(slug: string): Promise<Team | null> {
  const { data, error } = await supabase.from("teams").select("*").eq("id", Number.parseInt(slug)).single()

  if (error) {
    console.error("Error fetching team by slug:", error)
    return null
  }

  return data
}

// Team Rankings with statistics
export async function getTeamRankings() {
  const { data, error } = await supabase
    .from("teams")
    .select(`
      *,
      statistics:team_statistics(*)
    `)
    .order("ranking")

  if (error) {
    console.error("Error fetching team rankings:", error)
    return []
  }

  return data || []
}

export async function getTeamRankingsByLeague(league?: string) {
  let query = supabase.from("teams").select(`
      *,
      statistics:team_statistics(*)
    `)

  if (league && league !== "all") {
    query = query.eq("league", league)
  }

  const { data, error } = await query.order("ranking")

  if (error) {
    console.error("Error fetching team rankings by league:", error)
    return []
  }

  return data || []
}

// Team Performance (Last 5 matches)
export async function getTeamPerformance(teamId: number): Promise<TeamPerformance[]> {
  const { data, error } = await supabase
    .from("team_performance")
    .select("*")
    .eq("team_id", teamId)
    .order("match_date", { ascending: false })
    .limit(5)

  if (error) {
    console.error("Error fetching team performance:", error)
    return []
  }

  return data || []
}

// Players
export async function getPlayers(): Promise<Player[]> {
  const { data, error } = await supabase
    .from("players")
    .select(`
      *,
      team:teams(*),
      stats:player_stats(*)
    `)
    .order("name")

  if (error) {
    console.error("Error fetching players:", error)
    return []
  }

  return data || []
}

export async function getPlayersByTeam(teamId: number): Promise<Player[]> {
  const { data, error } = await supabase
    .from("players")
    .select(`
      *,
      team:teams(*),
      stats:player_stats(*)
    `)
    .eq("team_id", teamId)
    .order("name")

  if (error) {
    console.error("Error fetching players by team:", error)
    return []
  }

  return data || []
}

export async function getPlayersByPosition(position: string): Promise<Player[]> {
  const { data, error } = await supabase
    .from("players")
    .select(`
      *,
      team:teams(*),
      stats:player_stats(*)
    `)
    .eq("position", position)
    .order("name")

  if (error) {
    console.error("Error fetching players by position:", error)
    return []
  }

  return data || []
}

export async function getPlayerById(id: number): Promise<Player | null> {
  const { data, error } = await supabase
    .from("players")
    .select(`
      *,
      team:teams(*),
      stats:player_stats(*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching player:", error)
    return null
  }

  return data
}

// Featured players for spotlight (limit to 8)
export async function getFeaturedPlayers(): Promise<Player[]> {
  const { data, error } = await supabase
    .from("players")
    .select(`
      *,
      team:teams(*),
      stats:player_stats(*)
    `)
    .not("category", "is", null)
    .neq("category", "")
    .limit(16)
    .order("id")

  if (error) {
    console.error("Error fetching featured players:", error)
    return []
  }

  return data || []
}

// Player Rankings - Fixed to include all player data with stats
export async function getPlayerRankings(): Promise<PlayerRanking[]> {
  const { data, error } = await supabase
    .from("player_rankings")
    .select(`
      *,
      player:players(
        *,
        team:teams(*),
        stats:player_stats(*)
      )
    `)
    .order("overall_rank")

  if (error) {
    console.error("Error fetching player rankings:", error)
    return []
  }

  return data || []
}

export async function getPlayerRankingsByPosition(position: string): Promise<PlayerRanking[]> {
  const { data, error } = await supabase
    .from("player_rankings")
    .select(`
      *,
      player:players(
        *,
        team:teams(*),
        stats:player_stats(*)
      )
    `)
    .eq("position", position)
    .order("position_rank")

  if (error) {
    console.error("Error fetching player rankings by position:", error)
    return []
  }

  return data || []
}

// Get full player data by ID for modal
export async function getFullPlayerData(playerId: number): Promise<Player | null> {
  const { data, error } = await supabase
    .from("players")
    .select(`
      *,
      team:teams(*),
      stats:player_stats(*)
    `)
    .eq("id", playerId)
    .single()

  if (error) {
    console.error("Error fetching full player data:", error)
    return null
  }

  return data
}

// Matches with statistics and set scores
export async function getMatches(): Promise<Match[]> {
  const { data, error } = await supabase
    .from("matches")
    .select(`
      *,
      home_team:teams!home_team_id(*),
      away_team:teams!away_team_id(*),
      statistics:match_statistics(*),
      set_scores(*)
    `)
    .order("match_date")

  if (error) {
    console.error("Error fetching matches:", error)
    return []
  }

  return data || []
}

export async function getMatchById(id: number): Promise<Match | null> {
  const { data, error } = await supabase
    .from("matches")
    .select(`
      *,
      home_team:teams!home_team_id(*),
      away_team:teams!away_team_id(*),
      statistics:match_statistics(*),
      set_scores(*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching match:", error)
    return null
  }

  return data
}

export async function getMatchesByTeam(teamId: number): Promise<Match[]> {
  const { data, error } = await supabase
    .from("matches")
    .select(`
      *,
      home_team:teams!home_team_id(*),
      away_team:teams!away_team_id(*),
      statistics:match_statistics(*),
      set_scores(*)
    `)
    .or(`home_team_id.eq.${teamId},away_team_id.eq.${teamId}`)
    .order("match_date")

  if (error) {
    console.error("Error fetching matches by team:", error)
    return []
  }

  return data || []
}

// Match Statistics
export async function getMatchStatistics(matchId: number): Promise<MatchStatistics[]> {
  const { data, error } = await supabase.from("match_statistics").select("*").eq("match_id", matchId)

  if (error) {
    console.error("Error fetching match statistics:", error)
    return []
  }

  return data || []
}

// Set Scores
export async function getSetScores(matchId: number): Promise<SetScore[]> {
  const { data, error } = await supabase.from("set_scores").select("*").eq("match_id", matchId).order("set_number")

  if (error) {
    console.error("Error fetching set scores:", error)
    return []
  }

  return data || []
}

// Search functions
export async function searchPlayers(query: string): Promise<Player[]> {
  const { data, error } = await supabase
    .from("players")
    .select(`
      *,
      team:teams(*),
      stats:player_stats(*)
    `)
    .or(`name.ilike.%${query}%`)
    .order("name")

  if (error) {
    console.error("Error searching players:", error)
    return []
  }

  return data || []
}

// Real-time subscriptions
export function subscribeToPlayerRankings(callback: (rankings: PlayerRanking[]) => void) {
  const subscription = supabase
    .channel("player_rankings_changes")
    .on("postgres_changes", { event: "*", schema: "public", table: "player_rankings" }, async () => {
      const rankings = await getPlayerRankings()
      callback(rankings)
    })
    .subscribe()

  return subscription
}

export function subscribeToMatches(callback: (matches: Match[]) => void) {
  const subscription = supabase
    .channel("matches_changes")
    .on("postgres_changes", { event: "*", schema: "public", table: "matches" }, async () => {
      const data = await getMatches()
      callback(data || [])
    })
    .subscribe()

  return subscription
}
