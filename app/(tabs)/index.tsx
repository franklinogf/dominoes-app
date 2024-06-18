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
  team1: {
    name: "",
    score: [],
  },
  team2: { name: "", score: [] },
  team3: { name: "", score: [] },
  team4: { name: "", score: [] },
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
      return sumScores(teams[x as TeamKeys].score) === limit
    }) as TeamKeys[]

    setWinner(winningTeam.length > 0 ? winningTeam[0] : undefined)
  }, [teams])

  function startGame(teams: Teams, limit: number) {
    setTeams(teams)
    setLimit(limit)
    setGameStarted(true)
  }

  function endGame() {
    const teamScores = Object.entries(teams).reduce((obj, [key, team]) => {
      return { ...obj, [key]: { ...team, score: sumScores(team.score) } }
    }, {}) as Record<TeamKeys, { name: string; score: number }>

    const { team1, team2, team3, team4 } = teamScores

    if (
      team1.score > 0 ||
      team2.score > 0 ||
      team3.score > 0 ||
      team4.score > 0
    ) {
      const scores = Object.entries(teamScores).flatMap(
        ([_, team]) => team.score,
      )
      const teamWithMostPoints = Object.keys(teamScores).filter((x) => {
        return teamScores[x as TeamKeys].score === Math.max(...scores)
      })[0] as TeamKeys

      insertNewGame({
        winner: winner ?? teamWithMostPoints,
        score1: team1.score,
        score2: team2.score,
        score3: team3.score,
        score4: team4.score,
        team1: team1.name,
        team2: team2.name,
        team3: team3.name,
        team4: team4.name,
      })
    }
    setTeams(initialTeamState)
    setGameStarted(false)
  }

  const addScore = (teamKey: TeamKeys, newScore: number) => {
    setTeams((prev) => {
      const team = prev[teamKey]
      team.score.push(newScore)
      return {
        ...prev,
        [teamKey]: { name: prev[teamKey].name, score: team.score },
      }
    })
  }

  const removeScore = (teamKey: TeamKeys, scoreIndex: number) => {
    setTeams((prev) => {
      const team = teams[teamKey]
      team.score.splice(scoreIndex, 1)
      return {
        ...prev,
        [teamKey]: { name: prev[teamKey].name, score: team.score },
      }
    })
  }

  const teamsMap = Object.entries(teams).filter(([_, team]) => team.name !== "")

  return (
    <>
      {!gameStarted ? (
        <InitialScreen startGame={startGame} limit={limit} />
      ) : (
        <View style={{ alignItems: "center", flex: 1 }}>
          <ConfirmationAlert
            message="Seguro que desea terminar este juego?"
            actionAcceptText="Terminar"
            buttonText="Terminar juego"
            actionAccept={endGame}
          />
          <Separator className="my-4" />

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {teamsMap.map(([key, team]) => (
              <InputDialog
                key={key}
                disbled={winner !== undefined}
                limit={limit}
                label={team.name}
                team={key as TeamKeys}
                actionAccept={addScore}
              />
            ))}
          </View>

          <Separator className="my-4" />
          {/* <ScrollView
            // bounces={false}
            className="px-1.5"
            contentContainerClassName="justify-between flex-row w-full"
          >
            <View className="w-1/2 gap-2 pr-1.5">
              {teams.team1.score.map((score, index) => (
                <ConfirmationAlert
                  disabled={
                    (winner === "team1" &&
                      index !== teams.team1.score.length - 1) ||
                    winner === "team2"
                  }
                  buttonVariant="outline"
                  buttonSize="lg"
                  key={`team1-${index}`}
                  message="Desea borrarlo?"
                  actionAcceptText="Borrar"
                  buttonText={score.toString()}
                  actionAccept={() => {
                    removeScore("team1", index)
                  }}
                />
              ))}
            </View>
            <Separator orientation="vertical" />
            <View className="w-1/2 pl-1.5">
              {teams.team2.score.map((score, index) => (
                <ConfirmationAlert
                  disabled={
                    (winner === "team2" &&
                      index !== teams.team2.score.length - 1) ||
                    winner === "team1"
                  }
                  buttonVariant="outline"
                  buttonSize="lg"
                  key={`team2-${index}`}
                  message="Desea borrarlo?"
                  actionAcceptText="Borrar"
                  buttonText={score.toString()}
                  actionAccept={() => {
                    removeScore("team2", index)
                  }}
                />
              ))}
            </View>
          </ScrollView> */}
          <ScrollView
            style={{ width: "100%" }}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
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
                    <View style={{ width: 100 }}>
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
                <View key={key} className="items-center">
                  <H1
                    className={cn({
                      "text-green-500": winner === key,
                    })}
                  >
                    {totalScore}
                  </H1>
                  <Small className="text-center text-muted-foreground">
                    -{limit - totalScore}
                  </Small>
                </View>
              )
            })}
          </View>
        </View>
      )}
    </>
  )
}
