import { Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function IndexPage() {
  return (
    <SafeAreaView className='bg-blue-400 flex-1 justify-center items-center'>
      <View>
        <Text className='text-3xl font-bold my-6'>Nombres de los equipos</Text>
        <View className='space-y-4'>
          <View className='space-y-2'>
            <Text className='text-xl font-semibold'>Equipo 1</Text>
            <TextInput className='border bg-white h-12 rounded-lg text-black text-xl px-2' />
          </View>
          <View className='space-y-2'>
            <Text className='text-xl font-semibold'>Equipo 2</Text>
            <TextInput className='border bg-white h-12 rounded-lg text-black text-xl px-2' />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
