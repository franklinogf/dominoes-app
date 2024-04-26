import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HistoryPage() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>History</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: '#2f3aa2',
    alignItems: 'center',
    // justifyContent: 'center',
  },
})
