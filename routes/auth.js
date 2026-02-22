// backend/routes/auth.js
import express from 'express';
import {OAuth2Client} from 'google-auth-library';
import User from '../models/User.js'; // ensure your User model has fields email, name, googleId

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  const { id_token } = req.body;
  if (!id_token) return res.status(400).json({ error: 'No token' });

  try {
    const ticket = await client.verifyIdToken({ idToken: id_token, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    // find or create user
    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.create({ googleId, email, name });
    }
    // send basic user info back
    res.json({ email: user.email, name: user.name, id: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Token verification failed' });
  }
});

export default router;
