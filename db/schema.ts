import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const games = sqliteTable('games', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  winner: text('winner', { enum: ['team1', 'team2'] }).notNull(),
  team1: text('team1').notNull(),
  team2: text('team2').notNull(),
  score1: integer('score1').notNull(),
  score2: integer('score2').notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
})
