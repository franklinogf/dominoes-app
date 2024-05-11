import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function TabLayout() {
  return (
    <>
      <StatusBar style='light' />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#dbf6ff',
          },
          tabBarActiveTintColor: '#002c45',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: 'Juego',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name='gamepad' color={color} />,
          }}
        />
        <Tabs.Screen
          name='history'
          options={{
            title: 'Historial',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name='history' color={color} />,
          }}
        />
      </Tabs>
    </>
  )
}
