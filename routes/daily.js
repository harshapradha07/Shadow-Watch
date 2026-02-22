// backend/routes/daily.js
import express from 'express';
import DailyCheck from '../models/DailyCheck.js';
import cron from 'node-cron';
import DailyCheck from './models/DailyCheck.js';

// run every day at 02:00 AM
cron.schedule('0 2 * * *', async () => {
  console.log('Running daily check cron...');
  // For demo, create one record without an email
  const roll = Math.random();
  const level = roll > 0.75 ? 'Critical' : (roll > 0.4 ? 'Moderate' : 'Low');
  await DailyCheck.create({ level, details: 'Automated daily scan (demo)'});
});

const router = express.Router();

// POST manual check or api-triggered check
router.post('/', async (req, res) => {
  const { email } = req.body || {};
  // a simple detection logic demo:
  const roll = Math.random();
  const level = roll > 0.75 ? 'Critical' : (roll > 0.4 ? 'Moderate' : 'Low');
  const details = level === 'Critical' ? 'Multiple leaks found on paste sites' : 'No major leaks';

  const rec = await DailyCheck.create({ email, level, details });
  res.json({ level: rec.level, details: rec.details, email: rec.email, ts: rec.ts });
});

// GET history
router.get('/', async (req, res) => {
  const list = await DailyCheck.find().sort({ ts: -1 }).limit(50);
  res.json(list);
});

export default router;
