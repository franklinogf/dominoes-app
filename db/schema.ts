import { relations } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
const teamsEnum = ['team1', 'team2'] as const

export const games = sqliteTable('games', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  winner: text('winner', { enum: teamsEnum }).notNull(),
  team1: text('team1').notNull(),
  team2: text('team2').notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
})

export const scores = sqliteTable('scores', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  gameId: integer('game_id')
    .references(() => games.id)
    .notNull(),
  team: text('team', { enum: teamsEnum }).notNull(),
  scores: text('scores', { mode: 'json' }),
})

export const gamesRelations = relations(games, ({ many }) => ({
  scores: many(scores),
}))
export const scoresRelations = relations(scores, ({ one }) => ({
  game: one(games, {
    fields: [scores.gameId],
    references: [games.id],
  }),
}))
