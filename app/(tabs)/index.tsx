import { Alert, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from '../../components/InputField'
import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import ConfettiCannon from 'react-native-confetti-cannon'
import dominoesIcon from '../../assets/dominoes-icon.png'
import { Image } from 'expo-image'
type Team = 'team1' | 'team2'
type Score = number[]
type TeamScore = Record<Team, Score>
type Teams = Record<Team, string>

const initialTeamsNames: Teams = {
  team1: 'Omar',
  team2: 'Darwin',
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

  const startGame = () => {
    if (teamsNames.team1 === '' || teamsNames.team2 === '') return
    setTeamsCreated(true)
  }

  const endGame = () => {
    Alert.alert('Desea terminar la partida?', undefined, [
      {
        text: 'Terminar',
        style: 'destructive',
        onPress: () => {
          setScores(initialTeamsScores)
          setTeamsCreated(false)
          setHasReachLimit(false)
        },
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ])
  }

  const addScore = (team: Team) => {
    Alert.prompt(
      'Agregar puntos',
      undefined,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Agregar',
          onPress(value) {
            if (value == null || value === '') return
            const newScores = scores[team]
            newScores.push(parseInt(value))
            setScores({ ...scores, [team]: newScores })
          },
        },
      ],
      'plain-text',
      undefined,
      'number-pad',
      {
        cancelable: true,
      }
    )
  }

  const removeScore = (team: Team, scoreIndex: number) => {
    Alert.alert('Desea borrarlo?', undefined, [
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          const newScores = scores[team]
          newScores.splice(scoreIndex, 1)
          setScores({ ...scores, [team]: newScores })
        },
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ])
  }
  const team1Total = sumScores(scores.team1)
  const team2Total = sumScores(scores.team2)

  useEffect(() => {
    setHasReachLimit(team1Total >= limit || team2Total >= limit)
  }, [team1Total, team2Total])
  const winner = team1Total >= limit ? 'team1' : team2Total >= limit ? 'team2' : undefined

  return (
    <SafeAreaView className='bg-neutral-800 flex-1'>
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
        <View className='w-full flex-1 justify-center items-center'>
          <View style={{ width: 100, height: 100 }}>
            <Image source={dominoesIcon} contentFit='cover' style={{ flex: 1 }} />
          </View>
          <Text className='text-3xl font-bold my-6 text-white'>Nombres de los equipos</Text>
          <View className='space-y-5 w-[300px] px-2'>
            <View>
              <InputField
                label='Equipo 1'
                value={teamsNames.team1}
                onChangeText={(value) => {
                  setTeamsNames({ ...teamsNames, team1: value })
                }}
              />
            </View>
            <View>
              <InputField
                label='Equipo 2'
                value={teamsNames.team2}
                onChangeText={(value) => {
                  setTeamsNames({ ...teamsNames, team2: value })
                }}
              />
            </View>
            <View className='justify-center items-center'>
              <Button label='Continuar' onPress={startGame} />
            </View>
          </View>
        </View>
      ) : (
        <View className='px-1 flex-1 items-center'>
          <View className='my-2'>
            <View>
              <Button onPress={endGame} className='bg-red-500' size='sm' label='Terminar juego' />
            </View>
          </View>
          <View className='flex-row my-2 justify-center space-x-1'>
            <View className='w-1/2'>
              <Button
                onPress={() => {
                  addScore('team1')
                }}
                label={teamsNames.team1}
              />
            </View>
            <View className='w-1/2'>
              <Button
                onPress={() => {
                  addScore('team2')
                }}
                label={teamsNames.team2}
              />
            </View>
          </View>
          <ScrollView>
            <View className='flex-row divide-x divide-white min-h-full'>
              <View className='w-1/2'>
                {scores.team1.map((score, index) => (
                  <Button
                    onLongPress={() => {
                      removeScore('team1', index)
                    }}
                    key={`team1-${index}`}
                    label={score.toString()}
                    className='mb-2 py-1 bg-transparent'
                  />
                ))}
              </View>
              <View className='w-1/2'>
                {scores.team2.map((score, index) => (
                  <Button
                    onLongPress={() => {
                      removeScore('team2', index)
                    }}
                    key={`team2-${index}`}
                    label={score.toString()}
                    className='mb-2 py-1 bg-transparent'
                  />
                ))}
              </View>
            </View>
          </ScrollView>
          <View className='flex-row'>
            <Text
              className={`${winner === 'team1' ? 'text-primary-700' : 'text-black/80'} font-bold text-2xl text-center w-1/2 text-white pb-5`}
            >
              {team1Total}
            </Text>
            <Text
              className={`${winner === 'team2' ? 'text-primary-700' : 'text-black/80'} font-bold text-2xl text-center w-1/2 text-white pb-5`}
            >
              {team2Total}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}
