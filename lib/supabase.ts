import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types matching your schema
export interface Team {
  id: string
  name: string
  image_url: string
  city: string
  league: string
  primary_color: string
  wins: number
  losses: number
  championships: number
  ranking: number
  founded?: number
  statistics?: TeamStatistics[]
}

export interface TeamStatistics {
  id: number
  team_id: number
  season: string
  matches_played: number
  wins: number
  losses: number
  points_for: number
  points_against: number
  win_streak: number
  loss_streak: number
  form_points: number
  trend: string
  last_updated: string
  created_at: string
}

export interface TeamPerformance {
  id: number
  team_id: number
  season: string
  match_date: string
  opponent_id: number
  result: string
  points_scored: number
  points_conceded: number
  created_at: string
}

export interface Player {
  id: number
  name: string
  position: string
  team_id: number
  nationality: string
  age: number
  height: string
  image_url: string
  category: string
  bio: string
  created_at: string
  updated_at: string
  team?: Team
  stats?: PlayerStats[]
}

export interface PlayerStats {
  id: number
  player_id: number
  season: string
  points: number
  blocks: number
  aces: number
  attack_percentage: number
  digs: number
  matches_played: number
  attack_efficiency: number
  serve_effectiveness: number
  reception_quality: number
  block_efficiency: number
  defense_rating: number
  form_rating: number
  created_at: string
  updated_at: string
}

export interface PlayerRanking {
  id: number
  player_id: number
  position: string
  overall_rank: number
  position_rank: number
  league_rank: number
  total_score: number
  efficiency: number
  form_rating: number
  consistency: number
  peak_performance: number
  rank_change: number
  form_trend: number
  last_updated: string
  created_at: string
  player?: Player
}

export interface MatchStatistics {
  id: string
  match_id: number
  team_id: number
  total_points: number
  attacks: number
  blocks: number
  aces: number
  errors: number
  digs: number
  kills: number
  created_at: string
  updated_at: string
}

export interface SetScore {
  id: number
  match_id: number
  set_number: number
  home_score: number
  away_score: number
  duration_minutes: number
  created_at: string
}

export interface Match {
  id: string
  home_team_id: number
  away_team_id: number
  home_team_image_url: string
  away_team_image_url: string
  match_date: string
  home_score: number
  away_score: number
  status: string
  league: string
  round: string
  created_at: string
  updated_at: string
  home_team?: Team
  away_team?: Team
  statistics?: MatchStatistics[]
  set_scores?: SetScore[]
}
