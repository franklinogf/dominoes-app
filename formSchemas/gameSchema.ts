import { z } from "zod"
const teamNameValidation = z
  .string()
  .min(1, { message: "Debe de contener por lo menos 1 caracter" })
  .max(7, { message: "El maximo es de 7 caracteres" })

export const fourTeamsSchema = z.object({
  team1: teamNameValidation,
  team2: teamNameValidation,
  team3: teamNameValidation,
  team4: teamNameValidation,
  limit: z.coerce.number(),
})
export const threeTeamsSchema = fourTeamsSchema.omit({ team4: true })
export const twoTeamsSchema = threeTeamsSchema.omit({ team3: true })

export type GameSchemaType = z.infer<typeof fourTeamsSchema>
