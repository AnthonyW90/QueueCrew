import { Hono } from 'hono';
import { getDiscordAuthURL, handleDiscordCallback } from '../services/discordAuth';

const authRoutes = new Hono();

authRoutes.get('/discord', async (c) => {
  const authURL = await getDiscordAuthURL();
  return c.redirect(authURL);
});

authRoutes.get('/discord/callback', async (c) => {
  const code = c.req.query('code');
  if (!code) {
    return c.json({ error: 'Missing authorization code' }, 400);
  }

  try {
    const token = await handleDiscordCallback(code);
    // In a real application, you'd set this token as an HTTP-only cookie
    return c.json({ token });
  } catch (error) {
    console.error('Error during Discord callback:', error);
    return c.json({ error: 'Authentication failed' }, 500);
  }
});

export default authRoutes;