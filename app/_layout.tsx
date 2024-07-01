import { StatusBar } from "expo-status-bar"
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
import migrations from "../drizzle/migrations"
import { AppState, Platform, Text, View } from "react-native"
import { db } from "db/database"
import { type Theme, ThemeProvider } from "@react-navigation/native"
import "~/app/global.css"
import { NAV_THEME } from "~/lib/constants"
import { SplashScreen, Stack } from "expo-router"
import { useEffect, useState } from "react"
import { useColorScheme } from "~/lib/useColorScheme"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { PortalHost } from "~/components/primitives/portal"
import { ThemeToggle } from "~/components/ThemeToggle"
import "~/lib/i18n"
import { useTranslation } from "react-i18next"
import { getLocales } from "expo-localization"

// 181219
const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
}
export { ErrorBoundary } from "expo-router"
SplashScreen.preventAutoHideAsync()
export default function AppLayout() {
  const { i18n } = useTranslation()
  const { success, error } = useMigrations(db, migrations)
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false)
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (Platform.OS === "android" && nextAppState === "active") {
        const { languageCode } = getLocales()[0]
        i18n.changeLanguage(languageCode ?? "en")
      }
    })

    return () => {
      subscription.remove()
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      const theme = await AsyncStorage.getItem("theme")
      if (theme == null) {
        AsyncStorage.setItem("theme", colorScheme)
        setIsColorSchemeLoaded(true)
        return
      }
      const colorTheme = theme === "dark" ? "dark" : "light"
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme)

        setIsColorSchemeLoaded(true)
        return
      }
      setIsColorSchemeLoaded(true)
    })().finally(() => {
      SplashScreen.hideAsync()
    })
  }, [])

  if (!isColorSchemeLoaded) {
    return null
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Migration error: {JSON.stringify(error, null, 2)}</Text>
        <Text>Migration error: {error.message}</Text>
      </View>
    )
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    )
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerRight: () => {
              return <ThemeToggle />
            },
          }}
        />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  )
}
