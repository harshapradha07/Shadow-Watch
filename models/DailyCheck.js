// backend/models/DailyCheck.js
import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  email: String,
  level: String,
  details: String,
  ts: { type: Date, default: Date.now }
});
export default mongoose.model('DailyCheck', schema);
