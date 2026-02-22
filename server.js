import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './routes/auth.js';
import { OAuth2Client } from "google-auth-library";

app.use('/api/auth', authRoutes);

dotenv.config(); // ✅ THIS IS VERY IMPORTANT

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
// ---------- Google Sign-In Route ----------
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
app.post("/auth/google", async (req, res) => {
  try {
    const token = req.body.credential;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userid = payload["sub"];

    res.status(200).json({ message: "✅ Google Sign-In successful", user: payload });
  } catch (error) {
    console.error("❌ Google auth failed:", error);
    res.status(400).json({ error: "Google authentication failed" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
