

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import donorRoutes from './routes/donorRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Try MongoDB, but don't crash if not connected
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  

app.get('/', (req, res) => {
  res.send('🩸 BloodLink Global API is Running... Ready for Donors!');
});

app.use('/api/donors', donorRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'API Working!', donors: '195 countries' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Open http://localhost:${PORT}`);
});