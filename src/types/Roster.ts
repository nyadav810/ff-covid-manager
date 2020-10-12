interface Roster {
  starters?: string[];
  settings?: {
    wins: number;
    waiver_position: number;
    waiver_budget_used: number;
    waiver_adjusted: number;
    total_moves: number;
    ties: number;
    ppts_decimal: number;
    ppts: number;
    losses: number;
    fpts_decimal: number;
    fpts_against_decimal: number;
    fpts_against: number;
    fpts: number;
  };
  roster_id?: number;
  reserve?: string[];
  players?: string[];
  player_map?: any;
  taxi?: any;
  owner_id?: string;
  metadata?: any;
  league_id?: string;
  co_owners?: any;
}

export default Roster;
