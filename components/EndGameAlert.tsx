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
interface EndGameAlertProps {
  endGame: () => void
}
export function EndGameAlert({ endGame }: EndGameAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Text>Terminar juego</Text>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Esta seguro que quiere terminar el juego?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row justify-center gap-8">
          <AlertDialogCancel>
            <Text>Cancelar</Text>
          </AlertDialogCancel>

          <AlertDialogAction onPress={endGame}>
            <Text>Terminar</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
