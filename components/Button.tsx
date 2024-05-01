import {
  type StyleProp,
  type ViewStyle,
  type TouchableOpacityProps,
  Text,
  Pressable,
} from 'react-native'
import React from 'react'

interface Props extends TouchableOpacityProps {
  label: string
  style?: StyleProp<ViewStyle>
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  onPress?: () => void
}

export default function Button({ label, style, size, ...props }: Props) {
  return (
    <Pressable
      activeOpacity={0.8}
      style={style}
      className='bg-primary-400 py-4 w-full rounded-full'
      {...props}
    >
      <Text className='text-center font-semibold text-lg'>{label}</Text>
    </Pressable>
  )
}
