// C:\Users\Pubg\Documents\cms-project\config\redis.config.ts
// Description: Redis client configuration for caching and job queues in CMS project
// Created: July 22, 2025, 10:40 AM IST
// Updated: July 22, 2025, 10:40 AM IST
import { createClient } from 'redis';
const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});
client.on('error', (err) => console.error('Redis Error:', err));
client.connect();
export default client;
