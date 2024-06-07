import { StatusBar } from "expo-status-bar"
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
import migrations from "../drizzle/migrations"
import { Platform, Text, View } from "react-native"
import { db, expoDb } from "db/database"
import { type Theme, ThemeProvider } from "@react-navigation/native"
import "~/app/global.css"
import { NAV_THEME } from "~/lib/constants"
import { SplashScreen, Stack } from "expo-router"
import { useEffect, useState } from "react"
import { useColorScheme } from "~/lib/useColorScheme"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { PortalHost } from "~/components/primitives/portal"
import { useDrizzleStudio } from "expo-drizzle-studio-plugin"
import { ThemeToggle } from "~/components/ThemeToggle"

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
}
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"
SplashScreen.preventAutoHideAsync()
export default function AppLayout() {
  useDrizzleStudio(expoDb)
  const { success, error } = useMigrations(db, migrations)
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false)

  useEffect(() => {
    ;(async () => {
      const theme = await AsyncStorage.getItem("theme")
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background")
      }
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

  if (error != null) {
    return (
      <View>
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
      <Stack
      // screenOptions={{
      //   headerShown: false,
      // }}
      >
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
