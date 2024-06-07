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
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const formSchema = z.object({
  team1: z.string().min(1).max(50),
  team2: z.string().max(50),
  limit: z.string(),
})

interface InitialScreenProps {
  startGame: ({
    team1,
    team2,
    limit,
  }: {
    team1: string
    team2: string
    limit: string
  }) => void
  teamsNames: Teams
  limit: string
}

export function InitialScreen({
  startGame,
  teamsNames,
  limit,
}: InitialScreenProps) {
  const { isDarkColorScheme } = useColorScheme()
  const dominoesIcon = isDarkColorScheme ? lightIcon : darkicon
  const team2InputRef = useRef<TextInput>(null)
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      team1: teamsNames.team1,
      team2: teamsNames.team2,
      limit: limit || "200",
    },
  })
  function onSubmit(data: z.infer<typeof formSchema>) {
    startGame({ team1: data.team1, team2: data.team2, limit: data.limit })
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="h-full justify-center items-center ">
        <View style={{ width: 100, height: 100 }}>
          <Image source={dominoesIcon} contentFit="cover" style={{ flex: 1 }} />
        </View>
        <Text className="text-3xl font-bold my-10">Nombres de los equipos</Text>
        <View className="w-[300px]">
          <InputField
            control={control}
            name="team1"
            returnKeyType="next"
            autoFocus
            maxLength={50}
            autoCapitalize="words"
            label="Equipo 1"
            onSubmitEditing={() => {
              if (team2InputRef.current) {
                team2InputRef.current.focus()
              }
            }}
            blurOnSubmit={false}
          />
          <InputField
            control={control}
            name="team2"
            returnKeyType="next"
            autoFocus
            maxLength={50}
            autoCapitalize="words"
            label="Equipo 2"
            // ref={team2InputRef}
            blurOnSubmit={false}
          />

          <View className="my-4">
            <Text className="mb-4">Selecciona el limite de la partida</Text>
            <Controller
              control={control}
              name="limit"
              render={({ field: { value, onChange } }) => (
                <RadioGroup
                  value={value}
                  onValueChange={onChange}
                  className="w-full flex-row justify-around"
                >
                  <RadioGroupItemWithLabel
                    value="200"
                    onLabelPress={onChange}
                  />
                  <RadioGroupItemWithLabel
                    value="150"
                    onLabelPress={onChange}
                  />
                  <RadioGroupItemWithLabel
                    value="100"
                    onLabelPress={onChange}
                  />
                </RadioGroup>
              )}
            />
          </View>

          <Button className="w-full" size="lg" onPress={handleSubmit(onSubmit)}>
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
