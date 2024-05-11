import { Stack } from 'expo-router/stack'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import migrations from '../drizzle/migrations'
import { Text, View } from 'react-native'
import { db } from 'db/database'

export default function AppLayout() {
  const { success, error } = useMigrations(db, migrations)

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
    <SafeAreaProvider>
      <StatusBar style='dark' />
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  )
}
