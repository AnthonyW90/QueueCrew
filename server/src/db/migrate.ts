import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import dotenv from 'dotenv';

dotenv.config();

async function runMigrations() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const db = drizzle(client);

  console.log('Running migrations...');

  await migrate(db, { migrationsFolder: './migrations' });

  console.log('Migrations completed successfully');

  client.close();
}

runMigrations().catch((err) => {
  console.error('Error running migrations:', err);
  process.exit(1);
});