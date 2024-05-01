import { Stack } from 'expo-router/stack'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function AppLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style='dark' />
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  )
}
