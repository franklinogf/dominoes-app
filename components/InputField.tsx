import { View, type TextInputProps } from "react-native"
import * as React from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { cn } from "~/lib/utils"
import {
  type Control,
  Controller,
  type Path,
  type FieldValues,
} from "react-hook-form"
import { Small } from "./ui/typography"
import { Text } from "./ui/text"

interface InputFieldProps<TFormValues extends FieldValues>
  extends TextInputProps {
  label?: string
  className?: string
  control: Control<TFormValues>
  name: Path<TFormValues>
}
export const InputField = <TFormValues extends Record<string, any>>({
  name,
  control,
  label,
  className,
  ...props
}: InputFieldProps<TFormValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error, invalid },
      }) => (
        <View className="mb-4">
          {label && (
            <Label
              nativeID={label}
              className={cn("font-semibold mb-2", {
                "text-red-500": invalid,
              })}
            >
              <Text className="text-lg">{label}</Text>
            </Label>
          )}
          <Input
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            {...props}
            className={cn(className, { "border-red-500": invalid })}
          />
          {error && (
            <Small className="text-muted-foreground mt-2">
              {error.message}
            </Small>
          )}
        </View>
      )}
    />
  )
}

/* ------------------------- old version to use ref ------------------------- */
// const InputField = React.forwardRef<
//   React.ElementRef<typeof TextInput>,
//   InputFieldProps<Record<string, string | undefined>>
// >(({ label, control, name, className, ...props }, ref) => {
//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({
//         field: { value, onChange, onBlur },
//         fieldState: { error, invalid },
//       }) => (
//         <View className="my-4">
//           {label && (
//             <Label
//               nativeID={label}
//               className={cn("font-semibold mb-2", {
//                 "text-red-500": invalid,
//               })}
//             >
//               {label}
//             </Label>
//           )}
//           <Input
//             ref={ref}
//             value={value}
//             onBlur={onBlur}
//             onChangeText={onChange}
//             {...props}
//             className={cn(className, { "border-red-500": invalid })}
//           />
//           {error && (
//             <Small className="text-muted-foreground">{error.message}</Small>
//           )}
//         </View>
//       )}
//     />
//   )
// })

// InputField.displayName = "InputField"
// export { InputField }
