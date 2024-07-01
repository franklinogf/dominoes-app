import { useTranslation } from "react-i18next"
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
  disabled = false,
}: ConfirmationAlertProps) {
  const { t } = useTranslation()
  return (
    <AlertDialog className={cn({ "w-full": buttonFullWitdh })}>
      <AlertDialogTrigger asChild>
        <Button
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
          <AlertDialogCancel>
            <Text>{t("Cancelar")}</Text>
          </AlertDialogCancel>

          <AlertDialogAction onPress={actionAccept}>
            <Text>{actionAcceptText}</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
