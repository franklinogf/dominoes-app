import {
  Keyboard,
  // type TextInput,
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
// import { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const formSchema = z.object({
  team1: z
    .string()
    .min(1, { message: "Debe de contener por lo menos 1 caracter" })
    .max(15, { message: "El maximo es de 15 caracteres" }),
  team2: z
    .string()
    .min(1, { message: "Debe de contener por lo menos 1 caracter" })
    .max(15, { message: "El maximo es de 15 caracteres" }),
  limit: z.coerce.number(),
})
type FormType = z.infer<typeof formSchema>
interface InitialScreenProps {
  startGame: ({
    team1,
    team2,
    limit,
  }: {
    team1: string
    team2: string
    limit: number
  }) => void
  teamsNames: Teams
  limit: number
}

export function InitialScreen({
  startGame,
  teamsNames,
  limit,
}: InitialScreenProps) {
  const { isDarkColorScheme } = useColorScheme()
  const dominoesIcon = isDarkColorScheme ? lightIcon : darkicon
  // const team2InputRef = useRef<TextInput>(null)
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      team1: teamsNames.team1,
      team2: teamsNames.team2,
      limit: limit || 200,
    },
  })
  function onSubmit(data: FormType) {
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
            returnKeyType="done"
            autoFocus
            maxLength={15}
            autoCapitalize="words"
            label="Equipo 1"
            onSubmitEditing={() => {
              // if (team2InputRef.current) {
              //   team2InputRef.current.focus()
              // }
              Keyboard.dismiss()
            }}
            blurOnSubmit={false}
          />
          <InputField
            control={control}
            name="team2"
            returnKeyType="done"
            maxLength={15}
            autoCapitalize="words"
            label="Equipo 2"
            // ref={team2InputRef}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
          />

          <View className="my-4">
            <Text className="mb-4">Selecciona el limite de la partida</Text>
            <Controller
              control={control}
              name="limit"
              render={({ field: { value, onChange } }) => (
                <RadioGroup
                  value={value.toString()}
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
