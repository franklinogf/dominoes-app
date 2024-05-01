import { View, Text, TextInput } from 'react-native'
import React from 'react'
interface Props {
  label: string
  value: string
  onChangeText: (value: string) => void
  error?: boolean
}
export default function InputField({ label, value, onChangeText, error }: Props) {
  return (
    <View className='space-y-2'>
      <Text className='text-xl font-semibold text-white'>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className={`bg-primary-50 h-12 rounded-lg text-black text-xl px-2 border ${error != null && 'border-red-500'}`}
      />
    </View>
  )
}
