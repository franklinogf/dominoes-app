import { ScrollView, View, SafeAreaView } from "react-native"
import { useEffect, useState } from "react"
import ConfettiCannon from "react-native-confetti-cannon"
import { insertNewGame } from "db/database"
import { InitialScreen } from "~/components/InitialScreen"
import type { Team, TeamScore, Teams } from "~/lib/types"
import { ConfirmationAlert } from "~/components/ConfirmationAlert"
import { Separator } from "~/components/ui/separator"
import { InputDialog } from "~/components/InputDialog"
import { ThemeToggle } from "~/components/ThemeToggle"
import { cn } from "~/lib/utils"
import { H1 } from "~/components/ui/typography"

const initialTeamsNames: Teams = {
  team1: "Omar",
  team2: "Darwin",
}
const initialTeamsScores: TeamScore = {
  team1: [],
  team2: [],
}
const limit = 200
function sumScores(scores: number[]) {
  return scores.reduce((a, b) => a + b, 0)
}
export default function IndexPage() {
  const [teamsNames, setTeamsNames] = useState(initialTeamsNames)
  const [teamsCreated, setTeamsCreated] = useState(false)
  const [scores, setScores] = useState(initialTeamsScores)
  const [hasReachLimit, setHasReachLimit] = useState(false)
  const [newScore, setNewScore] = useState("")

  const startGame = () => {
    if (teamsNames.team1 === "" || teamsNames.team2 === "") return
    setTeamsCreated(true)
  }

  const endGame = () => {
    setScores(initialTeamsScores)
    setTeamsCreated(false)
    setHasReachLimit(false)
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

  useEffect(() => {
    setHasReachLimit(team1Total >= limit || team2Total >= limit)
  }, [team1Total, team2Total])
  const winner =
    team1Total >= limit ? "team1" : team2Total >= limit ? "team2" : undefined

  return (
    <SafeAreaView>
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
          setTeamsNames={setTeamsNames}
          teamsNames={teamsNames}
        />
      ) : (
        <View className="h-full items-center">
          <View className="mt-2 w-full flex-row items-center justify-center">
            <ConfirmationAlert
              message="Seguro que desea terminar este juego?"
              actionAcceptText="Terminar"
              buttonText="Terminar juego"
              actionAccept={endGame}
            />

            <View className="ml-5">
              <ThemeToggle />
            </View>
          </View>
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
            className="px-1.5 w-full"
            contentContainerClassName="justify-between flex-row"
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
          <View className="flex-row w-full justify-between px-1.5">
            <H1
              className={cn("text-center w-1/2 p-2", {
                "text-primary": winner === "team1",
              })}
            >
              {team1Total}
            </H1>

            <H1
              className={cn("text-center w-1/2 p-2", {
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
