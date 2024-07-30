import { Hono } from 'hono';
import { getDiscordAuthURL, handleDiscordCallback } from '../services/discordAuth';
import { setCookie } from 'hono/cookie';

const authRoutes = new Hono();

authRoutes.get('/discord', async (c) => {
  console.log('inside /discord call')
  const authURL = await getDiscordAuthURL();
  console.log({ authURL })
  return c.json(authURL);
});

authRoutes.get('/discord/callback', async (c) => {
  console.log('inside /discord/callback', {c})
  const code = c.req.query('code');
  if (!code) {
    return c.json({ error: 'Missing authorization code' }, 400);
  }

  try {
    await handleDiscordCallback(c, code);
    return c.redirect('/'); // Redirect to the frontend after successful authentication
  } catch (error) {
    console.error('Error during Discord callback:', error);
    return c.json({ error: 'Authentication failed' }, 500);
  }
});

authRoutes.post('/logout', (c) => {
  setCookie(c, 'auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 0, // Expire the cookie immediately
    path: '/',
  });
  return c.json({ success: true });
});

export default authRoutes;