import { drizzle } from 'drizzle-orm/expo-sqlite'
import * as schema from './schema'
import { openDatabaseSync } from 'expo-sqlite/next'
import { and, eq } from 'drizzle-orm'
const expoDb = openDatabaseSync('db.db')
export const db = drizzle(expoDb, { schema })

type InsertGame = typeof schema.games.$inferInsert

interface NewGame extends InsertGame {
  scores: {
    team1: number[]
    team2: number[]
  }
}

export const insertNewGame = async ({ winner, team1, team2, scores }: NewGame) => {
  const gamesResult = await db.insert(schema.games).values({
    winner,
    team1,
    team2,
    date: new Date(),
  })
  console.log({ gamesResult })
  await db.insert(schema.scores).values({
    gameId: gamesResult.lastInsertRowId,
    team: 'team1',
    scores: scores.team1,
  })
}

export const getAllGames = async () => {
  const result = await db.query.games.findMany()
  return result
}

export const getScores = async ({ gameId, team }: { gameId: number; team: 'team1' | 'team2' }) => {
  const result = await db
    .select()
    .from(schema.scores)
    .where(and(eq(schema.scores.gameId, gameId), eq(schema.scores.team, team)))
  return result
}

export const deleteGame = async ({ gameId }: { gameId: number }) => {
  await db.delete(schema.games).where(eq(schema.games.id, gameId))
  console.log('game deleted')
}
