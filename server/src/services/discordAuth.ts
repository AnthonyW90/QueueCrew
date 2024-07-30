import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { users } from '../models/schema';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { setCookie } from 'hono/cookie';
import { Context } from 'hono';

const DISCORD_API_BASE_URL = 'https://discord.com/api/v10';

interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
}

export async function getDiscordAuthURL(){
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    redirect_uri: `${process.env.FRONTEND_URL}/auth/callback`,
    response_type: 'code',
    scope: 'identify',
  })

  return `${DISCORD_API_BASE_URL}/oauth2/authorize?${params.toString()}`;
}

export async function handleDiscordCallback(c: Context, code: string) {
  // Exchange code for token
  console.log('inside handleDiscordCallback', {c, code})
  const tokenResponse = await fetch(`${DISCORD_API_BASE_URL}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${process.env.APP_URL}/api/auth/discord/callback`,
    }),
  });
  console.log(`${process.env.APP_URL}/api/auth/discord/callback`)
  console.log(1)
  const tokenData = await tokenResponse.json();
  console.log({tokenData})
  
  // Get user info
  const userResponse = await fetch(`${DISCORD_API_BASE_URL}/users/@me`, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  console.log(2)
  
  const discordUser: DiscordUser = await userResponse.json();
  console.log({discordUser})
  
  // Create or update user in database
  const db = drizzle(createClient({ url: process.env.TURSO_DATABASE_URL! }));
  console.log(3)
  
  const existingUser = await db.select().from(users).where(eq(users.discordId, discordUser.id));
  console.log(4)
  
  let userId: string;
  
  if (existingUser.length > 0) {
    userId = existingUser[0].id;
    await db.update(users).set({
      username: discordUser.username,
      avatarUrl: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
    }).where(eq(users.id, userId));
  } else {
    const newUserId = nanoid()
    const result = await db.insert(users).values({
      id: newUserId,
      discordId: discordUser.id,
      username: discordUser.username,
      avatarUrl: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
    }).returning({ insertedId: users.id });
    userId = result[0].insertedId;
  }
  console.log(5)
  // Generate JWT
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  
  // Set HTTP-only cookie
  setCookie(c, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days,
    path: '/'
  })
  
  console.log(6)
  return { success: true };
}  