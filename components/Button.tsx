import {
  type StyleProp,
  type ViewStyle,
  type TouchableOpacityProps,
  Text,
  Pressable,
} from 'react-native'
import React from 'react'

const sizeVariant = {
  sm: 'px-2 py-1',
  md: 'px-2 py-1',
}

interface Props extends TouchableOpacityProps {
  label: string
  style?: StyleProp<ViewStyle>
  className?: string
  size?: keyof typeof sizeVariant
  onPress?: () => void
}

export default function Button({ label, style, size = 'md', ...props }: Props) {
  return (
    <Pressable
      activeOpacity={0.8}
      style={style}
      className={`bg-primary-400 rounded-lg ${sizeVariant[size]}`}
      {...props}
    >
      <Text className='text-center font-semibold text-lg text-white'>{label}</Text>
    </Pressable>
  )
}
