import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import authRoutes from './routes/auth';

const app = new Hono();

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