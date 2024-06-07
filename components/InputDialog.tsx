import { View } from "react-native"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { Text } from "~/components/ui/text"
import { cn } from "~/lib/utils"
import { InputField } from "./InputField"
import { Small } from "./ui/typography"
interface InputDialogProps {
  actionAccept: () => void
  buttonText?: string
  buttonFullWitdh?: boolean
  value: string
  onValueChange: (value: string) => void
  limit: string
}
export function InputDialog({
  actionAccept,
  buttonText,
  buttonFullWitdh,
  value,
  onValueChange,
  limit,
}: InputDialogProps) {
  return (
    <AlertDialog
      onOpenChange={(value) => {
        if (!value) onValueChange("")
      }}
      className={cn({ "w-full": buttonFullWitdh })}
    >
      <AlertDialogTrigger asChild>
        <Button className="w-[200px]">
          <Text>{buttonText}</Text>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Agregar puntuación
          </AlertDialogTitle>
        </AlertDialogHeader>
        <View>
          <InputField
            contextMenuHidden={true}
            autoFocus={true}
            maxLength={3}
            keyboardType="number-pad"
            value={value}
            onChangeText={onValueChange}
          />
          <Small className="text-muted-foreground">Limite: {limit}</Small>
        </View>
        <AlertDialogFooter className="flex-row justify-center gap-8">
          <AlertDialogCancel>
            <Text>Cancelar</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={actionAccept}>
            <Text>Aceptar</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
