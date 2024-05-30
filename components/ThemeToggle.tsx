import AsyncStorage from "@react-native-async-storage/async-storage"
import { Pressable, View } from "react-native"
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar"
import { MoonStar } from "~/lib/icons/MoonStar"
import { Sun } from "~/lib/icons/Sun"
import { useColorScheme } from "~/lib/useColorScheme"
import { cn } from "~/lib/utils"

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme()
  return (
    <Pressable
      onPress={() => {
        const newTheme = isDarkColorScheme ? "light" : "dark"
        setColorScheme(newTheme)
        setAndroidNavigationBar(newTheme)
        AsyncStorage.setItem("theme", newTheme)
      }}
    >
      {({ pressed }) => (
        <View
          className={cn(
            "aspect-square pt-0.5 justify-center items-start",
            pressed && "opacity-70",
          )}
        >
          {isDarkColorScheme ? (
            <MoonStar
              className="text-foreground"
              size={23}
              strokeWidth={1.25}
            />
          ) : (
            <Sun className="text-foreground" size={24} strokeWidth={1.25} />
          )}
        </View>
      )}
    </Pressable>
  )
}
