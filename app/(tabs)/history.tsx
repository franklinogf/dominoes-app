import Button from 'components/Button'
import { deleteGame, getAllGames } from 'db/database'
import { type games } from 'db/schema'
import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
type SelectGame = typeof games.$inferSelect

type Game = SelectGame
export default function HistoryPage() {
  const [games, setGames] = useState<Game[]>([])

  const getGames = () => {
    getAllGames()
      .then((result) => {
        setGames(result)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  useEffect(() => {
    getGames()
  }, [])

  const deleteGameFromHistory = async (gameId: number) => {
    await deleteGame({ gameId })
    getGames()
  }
  return (
    <SafeAreaView className='bg-neutral-800 flex-1'>
      <Text className='text-3xl font-semibold text-white py-5 text-center'>Historial</Text>

      <FlatList
        data={games}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 20,
        }}
        renderItem={({ item: game }) => (
          <View key={game.id} className='bg-white p-2'>
            <View>
              <Text className='text-xl font-semibold '>
                {game.team1} VS {game.team2}
              </Text>
              <Text className='text-xl font-semibold '>Ganador: {game[game.winner]}</Text>
              <Text className='text-xl font-semibold '>
                Puntuación: {game.score1} VS {game.score2}
              </Text>
              <Text className='text-xl font-semibold '>{new Date(game.date).toLocaleString()}</Text>
            </View>
            <View className='flex-row justify-end gap-x-3'>
              <Button
                size='sm'
                label='Borrar'
                className='bg-red-400'
                onPress={() => {
                  deleteGameFromHistory(game.id)
                }}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}
