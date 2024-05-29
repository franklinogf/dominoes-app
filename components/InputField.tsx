import { type TextProps, View } from "react-native"
import React from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { cn } from "~/lib/utils"

interface Props extends TextProps {
  label: string
  value: string
  error?: boolean
  onChangeText: (value: string) => void
}
export default function InputField({
  label,
  error = false,
  className,
  ...props
}: Props) {
  return (
    <View className="my-4">
      <Label
        nativeID={label}
        className={cn("font-semibold mb-2", { "text-red-500": error })}
      >
        {label}
      </Label>
      <Input
        {...props}
        className={cn(className, { "border-red-500": error })}
        aria-labelledbyledBy={label}
        aria-errormessage="inputError"
      />
    </View>
  )
}
