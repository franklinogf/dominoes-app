import { Alert, ScrollView, View, SafeAreaView } from "react-native"
import { useEffect, useState } from "react"
import ConfettiCannon from "react-native-confetti-cannon"
import { insertNewGame } from "db/database"
import { Button } from "~/components/ui/button"
import { Text } from "~/components/ui/text"
import { InitialScreen } from "~/components/InitialScreen"
import type { Team, TeamScore, Teams } from "~/lib/types"
import { EndGameAlert } from "~/components/EndGameAlert"

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
  // verifyInstallation()
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
    Alert.prompt(
      "Agregar puntos",
      undefined,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Agregar",
          onPress(value) {
            if (value == null || value === "") return
            const newScores = scores[team]
            newScores.push(parseInt(value))
            setScores({ ...scores, [team]: newScores })
          },
        },
      ],
      "plain-text",
      undefined,
      "number-pad",
      {
        cancelable: true,
      },
    )
  }

  const removeScore = (team: Team, scoreIndex: number) => {
    Alert.alert("Desea borrarlo?", undefined, [
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          const newScores = scores[team]
          newScores.splice(scoreIndex, 1)
          setScores({ ...scores, [team]: newScores })
        },
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ])
  }
  const team1Total = sumScores(scores.team1)
  const team2Total = sumScores(scores.team2)

  useEffect(() => {
    setHasReachLimit(team1Total >= limit || team2Total >= limit)
  }, [team1Total, team2Total])
  const winner =
    team1Total >= limit ? "team1" : team2Total >= limit ? "team2" : undefined

  return (
    <SafeAreaView className="bg-background">
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
        <View className="px-1 flex-1 items-center">
          <View className="my-2">
            <EndGameAlert endGame={endGame} />
          </View>
          <View className="flex-row my-2 justify-center space-x-1">
            <View className="w-1/2">
              {/* <Button
                onPress={() => {
                  addScore("team1")
                }}
                label={teamsNames.team1}
              /> */}
            </View>
            <View className="w-1/2">
              {/* <Button
                onPress={() => {
                  addScore("team2")
                }}
                label={teamsNames.team2}
              /> */}
            </View>
          </View>
          <ScrollView>
            <View className="flex-row divide-x divide-white min-h-full">
              <View className="w-1/2">
                {/* {scores.team1.map((score, index) => (
                  <Button
                    onLongPress={() => {
                      removeScore("team1", index)
                    }}
                    key={`team1-${index}`}
                    label={score.toString()}
                    className="mb-2 py-1 bg-transparent"
                  />
                ))} */}
              </View>
              <View className="w-1/2">
                {/* {scores.team2.map((score, index) => (
                  <Button
                    onLongPress={() => {
                      removeScore("team2", index)
                    }}
                    key={`team2-${index}`}
                    label={score.toString()}
                    className="mb-2 py-1 bg-transparent"
                  />
                ))} */}
              </View>
            </View>
          </ScrollView>
          <View className="flex-row">
            <Text
              className={`${winner === "team1" ? "text-primary-700" : "text-black/80"} font-bold text-2xl text-center w-1/2 text-white pb-5`}
            >
              {team1Total}
            </Text>
            <Text
              className={`${winner === "team2" ? "text-primary-700" : "text-black/80"} font-bold text-2xl text-center w-1/2 text-white pb-5`}
            >
              {team2Total}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}
