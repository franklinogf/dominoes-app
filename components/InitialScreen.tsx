import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ScrollView,
} from "react-native"
import { Image } from "expo-image"
import { Text } from "./ui/text"
import { InputField } from "./InputField"
import { Button } from "./ui/button"
import lightIcon from "~/assets/dominoes-icon-light.png"
import darkicon from "../assets/dominoes-icon-dark.png"
import { type Teams, TeamsCount } from "~/lib/types"
import { useColorScheme } from "~/lib/useColorScheme"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Label } from "./ui/label"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  fourTeamsSchema,
  threeTeamsSchema,
  twoTeamsSchema,
  type GameSchemaType,
} from "~/formSchemas/gameSchema"
import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import { useTranslation } from "react-i18next"

interface InitialScreenProps {
  startGame: (teams: Teams, limit: number) => void
  limit: number
}
const styles = StyleSheet.create({
  toggleGroupItem: {
    height: 50,
    width: 50,
    alignContent: "center",
    justifyContent: "center",
  },
  toggleGroupItemText: { fontSize: 24, paddingTop: 6, color: "black" },
})
export function InitialScreen({ startGame, limit }: InitialScreenProps) {
  const { t } = useTranslation()
  const { isDarkColorScheme } = useColorScheme()
  const dominoesIcon = isDarkColorScheme ? lightIcon : darkicon
  const [teamsCount, setTeamsCount] = useState<TeamsCount>(TeamsCount.TwoTeams)

  // const team2InputRef = useRef<TextInput>(null)
  const { control, handleSubmit } = useForm<GameSchemaType>({
    shouldFocusError: true,
    resolver: zodResolver(
      teamsCount === TeamsCount.TwoTeams
        ? twoTeamsSchema
        : teamsCount === TeamsCount.ThreeTeams
          ? threeTeamsSchema
          : fourTeamsSchema,
    ),
    defaultValues: {
      team1: "",
      team2: "",
      team3: "",
      team4: "",
      limit: limit || 200,
    },
  })
  function onSubmit(data: GameSchemaType) {
    // alert(JSON.stringify(data, null, 2))
    const teams: Teams = {
      team1: { name: data.team1, score: [], wins: 0 },
      team2: { name: data.team2, score: [], wins: 0 },
      team3: { name: data.team3 ?? "", score: [], wins: 0 },
      team4: { name: data.team4 ?? "", score: [], wins: 0 },
    }
    startGame(teams, data.limit)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
            paddingBottom: 20,
          }}
        >
          <View style={{ width: 100, height: 100 }}>
            <Image
              source={dominoesIcon}
              contentFit="contain"
              style={{ flex: 1 }}
            />
          </View>
          <View className="my-4">
            <Text className="text-3xl font-bold">
              {t("Nombres de los")}{" "}
              {teamsCount === TeamsCount.TwoTeams
                ? t("equipos")
                : t("jugadores")}
            </Text>
          </View>
          <View className="w-full mb-2">
            <ToggleGroup
              className="w-full"
              value={teamsCount}
              onValueChange={(val) => {
                if (val === undefined) return
                setTeamsCount(val as TeamsCount)
              }}
              type="single"
            >
              <ToggleGroupItem
                style={styles.toggleGroupItem}
                value={TeamsCount.TwoTeams}
                aria-label={t("Dos equipos")}
              >
                <Text style={styles.toggleGroupItemText}>
                  {TeamsCount.TwoTeams}
                </Text>
              </ToggleGroupItem>
              <ToggleGroupItem
                style={styles.toggleGroupItem}
                value={TeamsCount.ThreeTeams}
                aria-label={t("Tres equipos")}
              >
                <Text style={styles.toggleGroupItemText}>
                  {TeamsCount.ThreeTeams}
                </Text>
              </ToggleGroupItem>

              <ToggleGroupItem
                style={styles.toggleGroupItem}
                value={TeamsCount.FourTeams}
                aria-label={t("Cuatro Equipos")}
              >
                <Text style={styles.toggleGroupItemText}>
                  {TeamsCount.FourTeams}
                </Text>
              </ToggleGroupItem>
            </ToggleGroup>
          </View>
          <View style={{ flexGrow: 1 }} className="w-[300px]">
            <InputField
              control={control}
              name="team1"
              returnKeyType="done"
              autoFocus
              maxLength={15}
              autoCapitalize="words"
              label={
                teamsCount === TeamsCount.TwoTeams
                  ? t("Equipo") + " 1"
                  : t("Jugador") + " 1"
              }
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
              label={
                teamsCount === TeamsCount.TwoTeams
                  ? t("Equipo") + " 2"
                  : t("Jugador") + " 2"
              }
              // ref={team2InputRef}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                Keyboard.dismiss()
              }}
            />
            {(teamsCount === TeamsCount.ThreeTeams ||
              teamsCount === TeamsCount.FourTeams) && (
              <InputField
                control={control}
                name="team3"
                returnKeyType="done"
                maxLength={15}
                autoCapitalize="words"
                label={`${t("Jugador")} 3`}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  Keyboard.dismiss()
                }}
              />
            )}
            {teamsCount === TeamsCount.FourTeams && (
              <InputField
                control={control}
                name="team4"
                returnKeyType="done"
                maxLength={15}
                autoCapitalize="words"
                label={`${t("Jugador")} 4`}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  Keyboard.dismiss()
                }}
              />
            )}

            <View className="my-4">
              <Text className="mb-4">
                {t("Selecciona el limite de la partida")}
              </Text>
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

            <Button
              className="w-full"
              size="lg"
              onPress={handleSubmit(onSubmit)}
            >
              <Text>{t("Continuar")}</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
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
