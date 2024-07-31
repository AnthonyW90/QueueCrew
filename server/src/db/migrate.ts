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

  try {
    await migrate(db, { migrationsFolder: './src/db/migrations' });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    if (typeof error === 'object' && error !== null && 'cause' in error) {
      console.error('Error cause:', (error as { cause: unknown }).cause);
    }
  } finally {
    await client.close();
  }
}

runMigrations().catch((err) => {
  console.error('Unhandled error in runMigrations:', err);
  process.exit(1);
});