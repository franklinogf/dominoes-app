import React from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"
import { NAV_THEME } from "~/lib/constants"
import { useColorScheme } from "~/lib/useColorScheme"

export default function TabLayout() {
  const { isDarkColorScheme } = useColorScheme()
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: isDarkColorScheme
              ? NAV_THEME.dark.primary
              : NAV_THEME.light.primary,
          },
          tabBarActiveTintColor: isDarkColorScheme
            ? NAV_THEME.dark.text
            : NAV_THEME.light.text,
          tabBarInactiveTintColor: isDarkColorScheme
            ? NAV_THEME.dark.card
            : NAV_THEME.light.card,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Juego",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="gamepad" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "Historial",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="history" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  )
}
