import { deleteGame, getAllGames } from "db/database"
// import { type games } from "db/schema"
import { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { H1 } from "~/components/ui/typography"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Text } from "~/components/ui/text"
import { Trash } from "~/lib/icons/Trash"
import { ConfirmationAlert } from "~/components/ConfirmationAlert"
import { type games } from "~/db/schema"
import { usePathname } from "expo-router"
type SelectGame = typeof games.$inferSelect

type Game = SelectGame
export default function HistoryPage() {
  const pathname = usePathname()
  const [games, setGames] = useState<Game[]>([])

  const getGames = async () => {
    const result = await getAllGames()
    setGames(result)
  }

  useEffect(() => {
    if (pathname === "/history") {
      getGames()
    }
  }, [pathname])

  const deleteGameFromHistory = async (gameId: number) => {
    await deleteGame({ gameId })
    getGames()
  }
  return (
    <SafeAreaView edges={["bottom"]}>
      <View className="pb-2">
        <H1 className="text-center ">Historial</H1>
      </View>
      <FlatList
        bounces={false}
        data={games}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="gap-4 p-3 pb-20"
        renderItem={({ item: game }) => (
          <Card key={game.id} className="w-full">
            <CardHeader>
              <CardTitle className="text-center">
                {game.team1} VS {game.team2}
              </CardTitle>
              <CardDescription className="text-center text-lg">
                {new Date(game.date).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-xl font-semibold text-center">
                Ganador: {game[game.winner]}
              </Text>
              <Text className="text-xl font-semibold text-center">
                Puntuación: {game.score1} - {game.score2}
              </Text>
            </CardContent>
            <CardFooter>
              <ConfirmationAlert
                buttonText="Borrar"
                buttonIcon={<Trash className="stroke-white" />}
                buttonFullWitdh
                message="Seguro que quiere eliminarlo del historial?"
                actionAcceptText="Borrar"
                actionAccept={() => {
                  deleteGameFromHistory(game.id)
                }}
              />
            </CardFooter>
          </Card>
        )}
      />
    </SafeAreaView>
  )
}
