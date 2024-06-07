import {
  Keyboard,
  type TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { Image } from "expo-image"
import { Text } from "./ui/text"
import { InputField } from "./InputField"
import { Button } from "./ui/button"
import lightIcon from "~/assets/dominoes-icon-light.png"
import darkicon from "../assets/dominoes-icon-dark.png"
import type { Teams } from "~/lib/types"
import { useColorScheme } from "~/lib/useColorScheme"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Label } from "./ui/label"
import { useRef } from "react"

interface InitialScreenProps {
  startGame: () => void
  teamsNames: Teams
  setTeamsNames: React.Dispatch<React.SetStateAction<Teams>>
  limit: string
  setLimit: React.Dispatch<React.SetStateAction<string>>
}
export function InitialScreen({
  startGame,
  teamsNames,
  setTeamsNames,
  limit,
  setLimit,
}: InitialScreenProps) {
  const { isDarkColorScheme } = useColorScheme()
  const dominoesIcon = isDarkColorScheme ? lightIcon : darkicon
  const team2InputRef = useRef<TextInput>(null)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="h-full justify-center items-center ">
        <View style={{ width: 100, height: 100 }}>
          <Image source={dominoesIcon} contentFit="cover" style={{ flex: 1 }} />
        </View>
        <Text className="text-3xl font-bold my-10">Nombres de los equipos</Text>
        <View className="w-[300px]">
          <InputField
            returnKeyType="next"
            autoFocus
            maxLength={50}
            autoCapitalize="words"
            label="Equipo 1"
            value={teamsNames.team1}
            onChangeText={(value) => {
              setTeamsNames({
                ...teamsNames,
                team1: value,
              })
            }}
            onSubmitEditing={() => {
              if (team2InputRef.current) {
                team2InputRef.current.focus()
              }
            }}
            blurOnSubmit={false}
          />

          <InputField
            ref={team2InputRef}
            returnKeyType="done"
            maxLength={50}
            autoCapitalize="words"
            label="Equipo 2"
            value={teamsNames.team2}
            onChangeText={(value) => {
              setTeamsNames({
                ...teamsNames,
                team2: value,
              })
            }}
          />

          <View className="my-4">
            <Text className="mb-4">Selecciona el limite de la partida</Text>
            <RadioGroup
              value={limit}
              onValueChange={setLimit}
              className="w-full flex-row justify-around"
            >
              <RadioGroupItemWithLabel value="200" onLabelPress={setLimit} />
              <RadioGroupItemWithLabel value="150" onLabelPress={setLimit} />
              <RadioGroupItemWithLabel value="100" onLabelPress={setLimit} />
            </RadioGroup>
          </View>

          <Button className="w-full" size="lg" onPress={startGame}>
            <Text>Continuar</Text>
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

function RadioGroupItemWithLabel({
  value,
  onLabelPress,
}: {
  value: string
  onLabelPress: (value: string) => void
}) {
  return (
    <View className={"flex-row gap-2 items-center"}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label
        nativeID={`label-for-${value}`}
        onPress={() => {
          onLabelPress(value)
        }}
      >
        <Text className="text-2xl">{value}</Text>
      </Label>
    </View>
  )
}
