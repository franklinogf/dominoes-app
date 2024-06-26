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
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { TeamKeys } from "~/lib/types"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const formSchema = z.object({
  score: z.coerce.number().min(1, { message: "No puede dejarlo vacío" }),
})
type FormType = z.infer<typeof formSchema>
interface InputDialogProps {
  actionAccept: (teamKey: TeamKeys, score: number) => void
  onLongPress?: (teamKey: TeamKeys) => void
  team: TeamKeys
  label?: string
  labelClassName?: string
  buttonFullWitdh?: boolean
  limit: number
  disbled?: boolean
  wins: number
}
export function InputDialog({
  actionAccept,
  onLongPress,
  team,
  label,
  labelClassName,
  buttonFullWitdh,
  limit,
  disbled = false,
  wins,
}: InputDialogProps) {
  const [open, setOpen] = useState(false)
  const { control, handleSubmit, resetField } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      score: 0,
    },
  })
  const { t } = useTranslation()
  function onSubmit(data: FormType) {
    resetField("score")
    actionAccept(team, data.score)
    setOpen(false)
  }
  return (
    <AlertDialog
      open={open}
      defaultOpen={true}
      className={cn({ "w-full": buttonFullWitdh })}
    >
      <AlertDialogTrigger asChild>
        <Button
          onLongPress={() => {
            onLongPress?.(team)
          }}
          disabled={disbled}
          onPress={() => {
            setOpen(true)
          }}
        >
          <Text className="absolute top-1 right-1" style={{ fontSize: 20 }}>
            {wins}
          </Text>
          <Text className={cn("font-bold", labelClassName)}>{label}</Text>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            {t("Agregar puntuación")}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <View>
          <InputField
            control={control}
            name="score"
            contextMenuHidden={true}
            autoFocus={true}
            maxLength={3}
            keyboardType="number-pad"
          />
          <Small className="text-muted-foreground">
            {t("Limite")}: {limit}
          </Small>
        </View>
        <AlertDialogFooter className="flex-row justify-center gap-8">
          <AlertDialogCancel
            onPress={() => {
              resetField("score")
              setOpen(false)
            }}
          >
            <Text>{t("Cancelar")}</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={handleSubmit(onSubmit)}>
            <Text>{t("Aceptar")}</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
