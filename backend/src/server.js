import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import evRoutes from './routes/evRoutes.js';
import chargingRoutes from './routes/chargingRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/evs', evRoutes);
app.use('/api/charging', chargingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'EVGuide SL API is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚗 EVGuide SL Backend running on port ${PORT}`);
});
