import { deleteAllGames, deleteGame, getAllGames } from "db/database"
import { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { H1 } from "~/components/ui/typography"

import { type games } from "~/db/schema"
import { usePathname } from "expo-router"

import { GameHistoryCard } from "~/components/GameHistoryCard"
import { Text } from "~/components/ui/text"
import { ConfirmationAlert } from "~/components/ConfirmationAlert"
type Game = typeof games.$inferSelect
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
  const handleDeleteAllGamesButton = async () => {
    await deleteAllGames()
    getGames()
  }
  return (
    <View>
      <View className="pb-2 items-center gap-2">
        <H1 className="text-center">Historial</H1>
        <ConfirmationAlert
          buttonText="Borrar todo el historial"
          actionAccept={handleDeleteAllGamesButton}
          actionAcceptText="Borrar todo"
          message="Desea borrar todo el historial?"
        />
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 180 }}
        bounces={false}
        data={games}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="gap-4 p-3 pb-20"
        renderItem={({ item: game }) => (
          <GameHistoryCard
            game={game}
            deleteAction={() => {
              deleteGameFromHistory(game.id)
            }}
          />
        )}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18 }}>
                Aun no tienes historial, juega una partida
              </Text>
            </View>
          )
        }}
      />
    </View>
  )
}
