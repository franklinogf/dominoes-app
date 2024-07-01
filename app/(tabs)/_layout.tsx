import React from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"
import { NAV_THEME } from "~/lib/constants"
import { useColorScheme } from "~/lib/useColorScheme"
import { useTranslation } from "react-i18next"

export default function TabLayout() {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation()
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
            ? NAV_THEME.dark.background
            : NAV_THEME.light.background,
          tabBarInactiveTintColor: isDarkColorScheme ? "gray" : "gray",
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "600",
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("Juego"),
            tabBarIcon: ({ color }) => (
              <FontAwesome size={26} name="gamepad" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: t("Historial"),
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="history" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  )
}
