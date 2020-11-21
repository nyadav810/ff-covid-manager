import { InjuryStatus } from "enums/InjuryStatus";

interface Player {
  fantasy_position_1: string;
  fantasy_position_2: string;
  first_name: string;
  injury_status: InjuryStatus | null;
  last_name: string;
  number: number;
  player_id: string;
  rotowire_id: number;
  rotoworld_id: any;
  sportradar_id: string;
  stats_id: any;
  team: string;
  yahoo_id: number;
}

export default Player;
