import { useState } from "react"
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
import { Button, type ButtonProps } from "~/components/ui/button"
import { Text } from "~/components/ui/text"
import { cn } from "~/lib/utils"
interface ConfirmationAlertProps {
  actionAccept: () => void
  actionAcceptText: string
  buttonText?: string
  buttonIcon?: JSX.Element
  message: string
  buttonFullWitdh?: boolean
  buttonVariant?: ButtonProps["variant"]
  buttonSize?: ButtonProps["size"]
  disabled?: boolean
  onPress?: () => void
  showAlert?: () => void
}
export function ConfirmationAlert({
  actionAccept,
  showAlert,
  onPress,
  buttonText,
  message,
  actionAcceptText,
  buttonFullWitdh,
  buttonIcon,
  buttonVariant = "destructive",
  buttonSize = "sm",
  disabled = false,
}: ConfirmationAlertProps) {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} className={cn({ "w-full": buttonFullWitdh })}>
      <AlertDialogTrigger asChild>
        <Button
          onPress={() => {
            onPress?.()
            setOpen(true)
          }}
          disabled={disabled}
          className="flex-row gap-2"
          variant={buttonVariant}
          size={buttonSize}
        >
          <Text style={{ fontSize: 20 }}>{buttonText}</Text>
          {buttonIcon}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">{message}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row justify-center gap-4">
          <AlertDialogCancel
            onPress={() => {
              setOpen(false)
            }}
          >
            <Text>Cancelar</Text>
          </AlertDialogCancel>

          <AlertDialogAction
            onPress={() => {
              showAlert?.()
              actionAccept()
            }}
          >
            <Text>{actionAcceptText}</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
