import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HistoryPage() {
  return (
    <SafeAreaView className='bg-neutral-800 flex-1'>
      <Text className='text-3xl font-semibold text-white py-5 text-center'>Historial</Text>
    </SafeAreaView>
  )
}
