import { Hono } from 'hono'
import { db } from '../db/db'
import { users } from '../models/schema'
import { eq } from 'drizzle-orm';

const router = new Hono();

router.get('/me', async (c) => {
  const userId = c.get('jwtPayload').userId;
  const user = await db.query.users.findFirst({
    where: eq(userId, users.id)
  })

  if(!user) {
    return c.json({ error: 'User not found' }, 404)
  }

  return c.json(user)
})

export default router;