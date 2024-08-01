import { Hono } from 'hono';
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid';
import { db } from '../db/db'
import { groups, userGroups } from '../models/schema'

const router = new Hono();

router.post('/', async (c) => {
  const userId = c.get('jwtPayload').userId;
  const { name } = await c.req.json();

  const newGroup = await db.transaction(async (tx) => {
    const groupId = nanoid()
    const [ group ] = await tx.insert(groups).values({ name, id: groupId }).returning();
    await tx.insert(userGroups).values({ userId, groupId, role: 'admin' })
    return group;
  })

  return c.json(newGroup, 201)
})

router.get('/', async (c) => {
  const userId = c.get('jwtPayload').userId;

  const userGroupsWithDetails = await db.query.userGroups.findMany({
    where: (userGroups, { eq }) => eq(userGroups.userId, userId),
    with: {
      group: true,
    }
  })

  const groupsData = userGroupsWithDetails.map(userGroup => ({
    ...userGroup.group,
    role: userGroup.role
  }))

  return c.json(groupsData)
})

export default router