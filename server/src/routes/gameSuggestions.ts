import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import { db } from '../db/db'
import { gameSuggestions } from '../models/schema';

const router = new Hono();

router.post('/', async (c) => {
  const userId = c.get('jwtPayload').userId;
  const { gameName, suggestedFor, groupId } = await c.req.json();

  const newSuggestion = await db.insert(gameSuggestions).values({
    gameName,
    suggestedFor,
    groupId,
    userId,
    id: nanoid(),
  }).returning();

  return c.json(newSuggestion[0], 201);
})

router.get('/:groupId', async (c) => {
  const groupId = c.req.param('groupId');

  const suggestions = await db.query.gameSuggestions.findMany({
    where: (gameSuggestions, {eq}) => eq(gameSuggestions.groupId, groupId),
    with: {
      user: true,
      votes: true,
    },
  })

  return c.json(suggestions)
})

export default router