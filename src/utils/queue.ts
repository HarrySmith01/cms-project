// C:\Users\Pubg\Documents\cms-project\src\utils\queue.ts
// Description: BullMQ queue configuration using Redis for async tasks in CMS project
// Created: July 22, 2025, 10:40 AM IST
// Updated: July 22, 2025, 10:40 AM IST
import { Queue } from 'bullmq';
export const jobQueue = new Queue('cms-jobs', {
  connection: { host: 'localhost', port: 6379 },
});
