import { FlatList, ScrollView, View } from "react-native"
import { useEffect, useState } from "react"
import { insertNewGame } from "db/database"
import { InitialScreen } from "~/components/InitialScreen"
import type { TeamKeys, Teams } from "~/lib/types"
import { ConfirmationAlert } from "~/components/ConfirmationAlert"
import { Separator } from "~/components/ui/separator"
import { InputDialog } from "~/components/InputDialog"
import { cn } from "~/lib/utils"
import { H1, Small } from "~/components/ui/typography"

const initialTeamState: Teams = {
  team1: { name: "", score: [], wins: 0 },
  team2: { name: "", score: [], wins: 0 },
  team3: { name: "", score: [], wins: 0 },
  team4: { name: "", score: [], wins: 0 },
}
function sumScores(scores: number[]) {
  return scores.reduce((a, b) => a + b, 0)
}

export default function IndexPage() {
  const [teams, setTeams] = useState<Teams>(initialTeamState)
  const [gameStarted, setGameStarted] = useState(false)
  const [limit, setLimit] = useState<number>(200)
  const [winner, setWinner] = useState<TeamKeys | undefined>(undefined)

  useEffect(() => {
    const winningTeam = Object.keys(teams).filter((x) => {
      return sumScores(teams[x as TeamKeys].score) >= limit
    }) as TeamKeys[]

    setWinner(winningTeam.length > 0 ? winningTeam[0] : undefined)
  }, [teams])

  function startGame(teams: Teams, limit: number) {
    setTeams(teams)
    setLimit(limit)
    setGameStarted(true)
  }

  function teamWithMostPoints() {
    const scores = Object.entries(teams).map(([_, team]) =>
      sumScores(team.score),
    )

    const teamWithMostPoints = Object.keys(teams).filter((x) => {
      if (sumScores(teams[x as TeamKeys].score) === 0) return false
      if (sumScores(teams[x as TeamKeys].score) === Math.max(...scores)) {
        return true
      }
      return false
    })
    return (
      teamWithMostPoints.length > 0 ? teamWithMostPoints[0] : undefined
    ) as TeamKeys | undefined
  }

  function endGame() {
    const winnerTeam = winner ?? teamWithMostPoints()
    if (winnerTeam) {
      insertNewGame({
        winner: winnerTeam,
        score1: sumScores(teams.team1.score),
        score2: sumScores(teams.team2.score),
        score3: sumScores(teams.team3.score),
        score4: sumScores(teams.team4.score),
        team1: teams.team1.name,
        team2: teams.team2.name,
        team3: teams.team3.name,
        team4: teams.team4.name,
      })
    }
    setTeams(initialTeamState)
    setGameStarted(false)
  }
  function restartGame() {
    const winnerTeam = winner ?? teamWithMostPoints()

    if (winnerTeam === undefined) return

    setTeams((prev) => {
      return {
        team1: { ...prev.team1, score: [] },
        team2: { ...prev.team2, score: [] },
        team3: { ...prev.team3, score: [] },
        team4: { ...prev.team4, score: [] },
        [winnerTeam]: {
          ...prev[winnerTeam],
          score: [],
          wins: prev[winnerTeam].wins + 1,
        },
      }
    })

    insertNewGame({
      winner: winnerTeam,
      score1: sumScores(teams.team1.score),
      score2: sumScores(teams.team2.score),
      score3: sumScores(teams.team3.score),
      score4: sumScores(teams.team4.score),
      team1: teams.team1.name,
      team2: teams.team2.name,
      team3: teams.team3.name,
      team4: teams.team4.name,
    })
  }
  const addScore = (teamKey: TeamKeys, newScore: number) => {
    setTeams((prev) => {
      const team = prev[teamKey]
      team.score.push(newScore)
      return {
        ...prev,
        [teamKey]: { ...prev[teamKey], score: team.score },
      }
    })
  }

  const removeScore = (teamKey: TeamKeys, scoreIndex: number) => {
    setTeams((prev) => {
      const team = teams[teamKey]
      team.score.splice(scoreIndex, 1)
      return {
        ...prev,
        [teamKey]: { ...prev[teamKey], score: team.score },
      }
    })
  }
  function addScoreWhenAllPassed(teamKey: TeamKeys) {
    setTeams((prev) => {
      const team = prev[teamKey]
      team.score.push(30)
      return {
        ...prev,
        [teamKey]: { ...prev[teamKey], score: team.score },
      }
    })
  }

  const teamsMap = Object.entries(teams).filter(([_, team]) => team.name !== "")
  return (
    <>
      {!gameStarted ? (
        <InitialScreen startGame={startGame} limit={limit} />
      ) : (
        <View style={{ alignItems: "center", flex: 1, paddingHorizontal: 5 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <ConfirmationAlert
              message="Seguro que desea terminar este juego?"
              actionAcceptText="Terminar"
              buttonText="Terminar"
              actionAccept={endGame}
            />
            <ConfirmationAlert
              message="Reiniciar el juego con los mismos jugadores?"
              actionAcceptText="Reiniciar"
              buttonText="Reiniciar"
              actionAccept={restartGame}
              disabled={teamWithMostPoints() === undefined}
            />
          </View>
          <Separator className="my-4" />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {teamsMap.map(([key, team]) => (
              <View className="max-w-[100px] min-w-[85px]" key={key}>
                <InputDialog
                  onLongPress={addScoreWhenAllPassed}
                  wins={team.wins}
                  disbled={winner !== undefined}
                  limit={limit}
                  label={team.name}
                  team={key as TeamKeys}
                  actionAccept={addScore}
                />
              </View>
            ))}
          </View>

          <Separator className="my-4" />
          <ScrollView
            style={{ width: "100%" }}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
              }}
            >
              <FlatList
                bounces={false}
                horizontal
                keyExtractor={(item) => item[0]}
                data={teamsMap}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "space-around",
                }}
                renderItem={({ item: [key, team] }) => {
                  const teamKey = key as TeamKeys
                  return (
                    <View className="max-w-[100px] min-w-[85px]">
                      {team.score.map((score, index) => (
                        <View
                          style={{ marginBottom: 5 }}
                          key={`${teamKey}-${index}`}
                        >
                          <ConfirmationAlert
                            disabled={
                              (winner === teamKey &&
                                index !== team.score.length - 1) ||
                              (winner !== teamKey && winner !== undefined)
                            }
                            buttonVariant="outline"
                            buttonSize="lg"
                            message="Desea borrarlo?"
                            actionAcceptText="Borrar"
                            buttonText={score.toString()}
                            actionAccept={() => {
                              removeScore(teamKey, index)
                            }}
                          />
                        </View>
                      ))}
                    </View>
                  )
                }}
              />
            </View>
          </ScrollView>

          <Separator className="my-4" />
          <View
            style={{
              height: 60,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {teamsMap.map(([key, team]) => {
              const totalScore = sumScores(team.score)
              return (
                <View
                  key={key}
                  className="items-center max-w-[100px] min-w-[85px]"
                >
                  <H1
                    className={cn({
                      "text-green-500": winner === key,
                    })}
                  >
                    {totalScore}
                  </H1>
                  {winner === key ? (
                    <Small className={"font-bold text-green-500"}>Winner</Small>
                  ) : (
                    <Small className="text-center text-muted-foreground">
                      {limit - totalScore}
                    </Small>
                  )}
                </View>
              )
            })}
          </View>
        </View>
      )}
    </>
  )
}
