type TwoTeams = "team1" | "team2"
type ThreeTeams = "team1" | "team2" | "team3"
type FourTeams = "team1" | "team2" | "team4"
export type TeamKeys = TwoTeams | ThreeTeams | FourTeams
export enum TeamsCount {
  TwoTeams = "2",
  ThreeTeams = "3",
  FourTeams = "4",
}

export interface Team {
  name: string
  score: number[]
  wins: number
}

export type Teams = Record<TeamKeys, Team>
