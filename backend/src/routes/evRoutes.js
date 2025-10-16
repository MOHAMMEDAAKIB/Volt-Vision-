import express from 'express';
import {
  getAllEVs,
  getEVById,
  filterEVs,
  getBrands,
  getTypes,
} from '../controllers/evController.js';

const router = express.Router();

// Routes
router.get('/', getAllEVs);
router.get('/filter', filterEVs);
router.get('/brands', getBrands);
router.get('/types', getTypes);
router.get('/:id', getEVById);

export default router;
