import { FlatList, ScrollView, View } from "react-native"
import { useState } from "react"
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
    name: "Omar",
    score: [],
  },
  team2: { name: "Darwin", score: [] },
  team3: { name: "", score: [] },
  team4: { name: "", score: [] },
}
function sumScores(scores: number[]) {
  return scores.reduce((a, b) => a + b, 0)
}

export default function IndexPage() {
  const [teams, setTeams] = useState<Teams>(initialTeamState)
  const [gameStarted, setGameStarted] = useState(true)
  const [limit, setLimit] = useState<number>(200)

  function getWinner(teams: Teams) {
    const winner = Object.keys(teams).filter((x) => {
      return sumScores(teams[x as TeamKeys].score) === limit
    }) as TeamKeys[]

    return winner.length > 0 ? winner[0] : undefined
  }
  const startGame = (teams: Teams, limit: number) => {
    setTeams(teams)
    setLimit(limit)
    setGameStarted(true)
  }

  const endGame = () => {
    setTeams(initialTeamState)
    setGameStarted(false)
    // const { team1, team2 } = teams
    // const score1 = sumScores(scores.team1)
    // const score2 = sumScores(scores.team2)
    // const winner = score1 > score2 ? "team1" : "team2"

    // if (score1 > 0 || score2 > 0) {
    //   insertNewGame({
    //     winner,
    //     score1,
    //     score2,
    //     team1,
    //     team2,
    //   })
    // }
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

  const winner: TeamKeys | undefined = getWinner(teams)

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
