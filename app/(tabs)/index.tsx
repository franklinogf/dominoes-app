import { ScrollView, View } from "react-native"
import { useState } from "react"
import ConfettiCannon from "react-native-confetti-cannon"
import { insertNewGame } from "db/database"
import { InitialScreen } from "~/components/InitialScreen"
import type { Team, TeamScore, Teams } from "~/lib/types"
import { ConfirmationAlert } from "~/components/ConfirmationAlert"
import { Separator } from "~/components/ui/separator"
import { InputDialog } from "~/components/InputDialog"
import { cn } from "~/lib/utils"
import { H1 } from "~/components/ui/typography"
import { SafeAreaView } from "react-native-safe-area-context"

const initialTeamsNames: Teams = {
  team1: "Omar",
  team2: "Darwin",
}
const initialTeamsScores: TeamScore = {
  team1: [],
  team2: [],
}
function sumScores(scores: number[]) {
  return scores.reduce((a, b) => a + b, 0)
}
export default function IndexPage() {
  const [teamsNames, setTeamsNames] = useState(initialTeamsNames)
  const [teamsCreated, setTeamsCreated] = useState(false)
  const [scores, setScores] = useState(initialTeamsScores)
  const [newScore, setNewScore] = useState("")
  const [limit, setLimit] = useState("")

  const startGame = ({
    team1,
    team2,
    limit,
  }: {
    team1: string
    team2: string
    limit: string
  }) => {
    setTeamsNames({ team1, team2 })
    setLimit(limit)
    setTeamsCreated(true)
  }

  const endGame = () => {
    setScores(initialTeamsScores)
    setTeamsCreated(false)
    const { team1, team2 } = teamsNames
    const score1 = sumScores(scores.team1)
    const score2 = sumScores(scores.team2)
    const winner = score1 > score2 ? "team1" : "team2"

    if (score1 > 0 || score2 > 0) {
      insertNewGame({
        winner,
        score1,
        score2,
        team1,
        team2,
      })
    }
  }

  const addScore = (team: Team) => {
    if (newScore == null || newScore === "") return
    const newScores = scores[team]
    newScores.push(parseInt(newScore))
    setScores({ ...scores, [team]: newScores })
    setNewScore("")
  }

  const removeScore = (team: Team, scoreIndex: number) => {
    const newScores = scores[team]
    newScores.splice(scoreIndex, 1)
    setScores({ ...scores, [team]: newScores })
  }
  const team1Total = sumScores(scores.team1)
  const team2Total = sumScores(scores.team2)

  const hasReachLimit =
    team1Total >= parseInt(limit) || team2Total >= parseInt(limit)
  const winner =
    team1Total >= parseInt(limit)
      ? "team1"
      : team2Total >= parseInt(limit)
        ? "team2"
        : undefined

  return (
    <SafeAreaView className="h-full" edges={["bottom"]}>
      {hasReachLimit &&
        [...Array(5)].map((_, index) => (
          <ConfettiCannon
            key={index}
            count={100}
            origin={{ x: -10, y: 0 }}
            autoStartDelay={index * 1000}
          />
        ))}
      {!teamsCreated ? (
        <InitialScreen
          startGame={startGame}
          teamsNames={teamsNames}
          limit={limit}
        />
      ) : (
        <View className="h-full items-center mt-2">
          <ConfirmationAlert
            message="Seguro que desea terminar este juego?"
            actionAcceptText="Terminar"
            buttonText="Terminar juego"
            actionAccept={endGame}
          />
          <Separator className="my-4" />
          <View className="flex-row w-full justify-between px-1.5">
            <InputDialog
              limit={limit}
              value={newScore}
              onValueChange={setNewScore}
              buttonText={teamsNames.team1}
              actionAccept={() => {
                addScore("team1")
              }}
            />
            <InputDialog
              limit={limit}
              value={newScore}
              onValueChange={setNewScore}
              buttonText={teamsNames.team2}
              actionAccept={() => {
                addScore("team2")
              }}
            />
          </View>
          <Separator className="my-4" />
          <ScrollView
            bounces={false}
            className="px-1.5"
            contentContainerClassName="justify-between flex-row w-full flex-1"
          >
            <View className="w-[200px] gap-2">
              {scores.team1.map((score, index) => (
                <ConfirmationAlert
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
            <View className="w-[200px]">
              {scores.team2.map((score, index) => (
                <ConfirmationAlert
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
          </ScrollView>
          <Separator className="my-4" />
          <View className="flex-row w-full justify-between px-1.5 pb-2">
            <H1
              className={cn("text-center w-1/2", {
                "text-primary": winner === "team1",
              })}
            >
              {team1Total}
            </H1>

            <H1
              className={cn("text-center w-1/2", {
                "text-primary": winner === "team2",
              })}
            >
              {team2Total}
            </H1>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}
