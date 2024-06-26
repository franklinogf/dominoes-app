import { drizzle } from "drizzle-orm/expo-sqlite"
import * as schema from "./schema"
import { openDatabaseSync } from "expo-sqlite/next"
import { eq } from "drizzle-orm"
export const expoDb = openDatabaseSync("db.db")
export const db = drizzle(expoDb, { schema })

type InsertGame = typeof schema.games.$inferInsert

type NewGame = Omit<InsertGame, "date" | "id">

export const insertNewGame = async ({
  winner,
  team1,
  team2,
  team3,
  team4,
  score1,
  score2,
  score3,
  score4,
}: NewGame) => {
  const gamesResult = await db.insert(schema.games).values({
    winner,
    team1,
    team2,
    team3: team3 !== "" ? team3 : null,
    team4: team4 !== "" ? team4 : null,
    score1,
    score2,
    score3: team3 !== "" ? score3 : null,
    score4: team4 !== "" ? score4 : null,
    date: new Date(),
  })
  console.log({ gamesResult })
}

export const getAllGames = async () => {
  const result = await db.query.games.findMany({
    orderBy: (games, { desc }) => [desc(games.date)],
  })
  return result
}

export const deleteGame = async ({ gameId }: { gameId: number }) => {
  await db.delete(schema.games).where(eq(schema.games.id, gameId))
}
export const deleteAllGames = async () => {
  await db.delete(schema.games)
}
