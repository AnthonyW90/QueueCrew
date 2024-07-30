import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';

dotenv.config()

const app = new Hono();

app.use('*', cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))

// Auth
app.route('/api/auth', authRoutes);

// API routes
app.get('/api', (c) => c.json({ message: 'Hello from QueueCrew API!' }));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use('/*', serveStatic({ root: './public' }));
  
  // Serve index.html for any unmatched routes (for SPA routing)
  app.get('*', (c) => c.html('./public/index.html'));
}

const port = process.env.PORT === undefined ? 3000 : Number(process.env.PORT);
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});