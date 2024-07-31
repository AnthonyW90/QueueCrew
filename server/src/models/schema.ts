import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  discordId: text('discord_id').notNull().unique(),
  username: text('username').notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`now()`)
})

export const groups = sqliteTable('groups', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`now()`)
})

export const userGroups = sqliteTable('user_groups', {
  userId: text('user_id').notNull().references(() => users.id),
  groupId: text('group_id').notNull().references(() => groups.id),
  role: text('role', { enum: ['admin', 'member'] }).notNull().default('member'),
}, (table) => ({
  pk: primaryKey({ columns: [table.userId, table.groupId] })
}))

export const gameSuggestions = sqliteTable('game_suggestions', {
  id: text('id').primaryKey(),
  gameName: text('game_name').notNull(),
  suggestedFor: integer('suggested_for', {mode: 'timestamp'}).notNull(),
  groupId: text('group_id').notNull().references(() => groups.id),
  userId: text('user_id').notNull().references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`now()`)
})