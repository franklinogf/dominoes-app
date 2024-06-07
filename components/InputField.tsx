import { type TextInput, View, type TextInputProps } from "react-native"
import * as React from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { cn } from "~/lib/utils"

interface Props extends TextInputProps {
  label?: string
  value: string
  error?: boolean
  onChangeText: (value: string) => void
}
const InputField = React.forwardRef<React.ElementRef<typeof TextInput>, Props>(
  ({ label, error = false, className, ...props }, ref) => {
    return (
      <View className="my-4">
        {label && (
          <Label
            nativeID={label}
            className={cn("font-semibold mb-2", { "text-red-500": error })}
          >
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          {...props}
          className={cn(className, { "border-red-500": error })}
        />
      </View>
    )
  },
)
InputField.displayName = "InputField"
export { InputField }
