import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  discordId: text('discord_id').notNull().unique(),
  username: text('username').notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow()
})

export const groups = sqliteTable('groups', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow()
})

export const userGroups = sqliteTable('user_groups', {
  userId: text('user_id').notNull().references(() => users.id),
  groupId: text('group_id').notNull().references(() => groups.id),
  role: text('role', { enum: ['admin', 'member'] }).notNull().default('member'),
}, (table) => ({
  pk: primaryKey({ columns: [table.userId, table.groupId] })
}))

export const userGroupsRelations = relations(userGroups, ({ one }) => ({
  user: one(users, {
    fields: [userGroups.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [userGroups.groupId],
    references: [groups.id],
  }),
}));

export const groupsRelations = relations(groups, ({ many }) => ({
  userGroups: many(userGroups),
}));

export const gameSuggestions = sqliteTable('game_suggestions', {
  id: text('id').primaryKey(),
  gameName: text('game_name').notNull(),
  suggestedFor: integer('suggested_for', {mode: 'timestamp'}).notNull(),
  groupId: text('group_id').notNull().references(() => groups.id),
  userId: text('user_id').notNull().references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow()
})

export const gameSuggestionsRelations = relations(gameSuggestions, ({ one, many }) => ({
  group: one(groups, {
    fields: [gameSuggestions.groupId],
    references: [groups.id]
  }),
  user: one(users, {
    fields: [gameSuggestions.userId],
    references: [users.id]
  }),
  votes: many(votes)
}));

export const votes = sqliteTable('votes', {
  id: text('id').primaryKey(),
  gameSuggestionId: text('game_suggestion_id').notNull().references(() => gameSuggestions.id),
  userId: text('user_id').notNull().references(() => users.id),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow()
})

export const votesRelations = relations(votes, ({one}) => ({
  gameSuggestions: one(gameSuggestions, {
    fields: [votes.gameSuggestionId],
    references: [gameSuggestions.id]
  }),
  user: one(users, {
    fields: [votes.userId],
    references: [users.id]
  })
}))