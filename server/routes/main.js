import express from 'express';
import { createRestaurant } from '../controller/restaurant_controller.js';

const router = express.Router();
router.post('/restaurant', createRestaurant);

export default router;
