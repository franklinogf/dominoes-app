import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HistoryPage() {
  return (
    <SafeAreaView style={styles.container}>
      <Text className='text-3xl font-semibold text-white py-5'>Historial</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: '#262626',
    alignItems: 'center',
    // justifyContent: 'center',
  },
})
