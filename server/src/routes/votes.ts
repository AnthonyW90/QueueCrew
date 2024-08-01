import { Hono } from 'hono';
import { db } from '../db/db';
import { votes } from '../models/schema';
import { nanoid } from 'nanoid';
import { and, eq } from 'drizzle-orm';

const router = new Hono();

router.post('/', async (c) => {
  const userId = c.get('jwtPayload').userId;
  const { gameSuggestionId } = await c.req.json();

  const existingVote = await db.query.votes.findFirst({
    where: (votes, { eq, and }) => and(
      eq(votes.userId, userId),
      eq(votes.gameSuggestionId, gameSuggestionId)
    )
  });

  if(existingVote) {
    return c.json({ error: 'You have already voted for this suggestion' }, 400);
  };

  const newVote = await db.insert(votes).values({
    userId,
    gameSuggestionId,
    id: nanoid()
  }).returning();

  return c.json(newVote[0], 201);
})

router.delete('/:gameSuggestionId', async (c) => {
  const userId = c.get('jwtPayload').userId;
  const gameSuggestionId = c.req.param('gameSuggestionId');

  const deletedVote = await db.delete(votes)
    .where(and(
      eq(votes.userId, userId),
      eq(votes.gameSuggestionId, gameSuggestionId)
    ))
    .returning();

  if(deletedVote.length === 0){
    return c.json({ error: 'Vote not found' }, 404);
  };

  return c.json({ message: 'Vote removed successfully' });
})

export default router