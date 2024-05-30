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
}
export function ConfirmationAlert({
  actionAccept,
  buttonText,
  message,
  actionAcceptText,
  buttonFullWitdh,
  buttonIcon,
  buttonVariant = "destructive",
  buttonSize = "sm",
}: ConfirmationAlertProps) {
  return (
    <AlertDialog className={cn({ "w-full": buttonFullWitdh })}>
      <AlertDialogTrigger asChild>
        <Button
          className="flex-row gap-2"
          variant={buttonVariant}
          size={buttonSize}
        >
          <Text>{buttonText}</Text>
          {buttonIcon}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{message}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row justify-center gap-8">
          <AlertDialogCancel>
            <Text>Cancelar</Text>
          </AlertDialogCancel>

          <AlertDialogAction onPress={actionAccept}>
            <Text>{actionAcceptText}</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
