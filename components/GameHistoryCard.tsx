import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Text } from "~/components/ui/text"
import { Trash } from "~/lib/icons/Trash"
import { ConfirmationAlert } from "~/components/ConfirmationAlert"
import { getLocales } from "expo-localization"
import { type games } from "~/db/schema"
import { useTranslation } from "react-i18next"
type Game = typeof games.$inferSelect

interface GameHistoryCardProps {
  game: Game
  deleteAction: () => void
}
export function GameHistoryCard({ game, deleteAction }: GameHistoryCardProps) {
  const { languageCode } = getLocales()[0]
  const { t } = useTranslation()
  const title = [game.team1, game.team2, game.team3, game.team4]
    .filter(Boolean)
    .join(" VS ")
  const scores = [game.score1, game.score2, game.score3, game.score4]
    .filter((score) => score !== null)
    .join(" - ")
  return (
    <Card key={game.id} className="w-full">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center text-lg">
          {new Date(game.date).toLocaleString(languageCode ?? "es", {
            timeStyle: "short",
            dateStyle: "long",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Text className="text-xl font-semibold text-center">
          {t("Ganador")}: {game[game.winner]}
        </Text>
        <Text className="text-xl font-semibold text-center">
          {t("Puntuación")}: {scores}
        </Text>
      </CardContent>
      <CardFooter>
        <ConfirmationAlert
          buttonText={t("Borrar")}
          buttonIcon={<Trash className="stroke-white" />}
          buttonFullWitdh
          message={t("Seguro que quiere eliminarlo del historial?")}
          actionAcceptText={t("Borrar")}
          actionAccept={deleteAction}
        />
      </CardFooter>
    </Card>
  )
}
