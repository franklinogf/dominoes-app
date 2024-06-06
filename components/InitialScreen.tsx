import { View } from "react-native"
import { Image } from "expo-image"
import { Text } from "./ui/text"
import InputField from "./InputField"
import { Button } from "./ui/button"
import lightIcon from "~/assets/dominoes-icon-light.png"
import darkicon from "../assets/dominoes-icon-dark.png"
import type { Teams } from "~/lib/types"
import { useColorScheme } from "~/lib/useColorScheme"

interface InitialScreenProps {
  startGame: () => void
  teamsNames: Teams
  setTeamsNames: React.Dispatch<React.SetStateAction<Teams>>
}
export function InitialScreen({
  startGame,
  teamsNames,
  setTeamsNames,
}: InitialScreenProps) {
  const { isDarkColorScheme } = useColorScheme()
  const dominoesIcon = isDarkColorScheme ? lightIcon : darkicon
  return (
    <View className="w-full h-full justify-center items-center ">
      <View style={{ width: 100, height: 100 }}>
        <Image source={dominoesIcon} contentFit="cover" style={{ flex: 1 }} />
      </View>
      <Text className="text-3xl font-bold my-10">Nombres de los equipos</Text>
      <View className="w-[300px]">
        <InputField
          label="Equipo 1"
          value={teamsNames.team1}
          onChangeText={(value) => {
            setTeamsNames({
              ...teamsNames,
              team1: value,
            })
          }}
        />

        <InputField
          label="Equipo 2"
          value={teamsNames.team2}
          onChangeText={(value) => {
            setTeamsNames({
              ...teamsNames,
              team2: value,
            })
          }}
        />

        <Button className="w-full mt-4" size="lg" onPress={startGame}>
          <Text>Continuar</Text>
        </Button>
      </View>
    </View>
  )
}
