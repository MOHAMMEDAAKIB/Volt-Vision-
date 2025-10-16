import express from 'express';
import {
  getAllStations,
  getStationById,
  filterStations,
  findNearestStations,
} from '../controllers/chargingController.js';

const router = express.Router();

// Routes
router.get('/', getAllStations);
router.get('/filter', filterStations);
router.get('/nearest', findNearestStations);
router.get('/:id', getStationById);

export default router;
