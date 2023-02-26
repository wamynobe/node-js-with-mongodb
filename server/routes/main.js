import express from 'express';
import { createRestaurant, getListRestaurant, getSingleRestaurant, updateOneRestaurant, deleteRestaurant } from '../controller/restaurant_controller.js';

const router = express.Router();
router.post('/restaurant', createRestaurant);
router.get('/restaurant', getListRestaurant);
router.get('/restaurant/:restaurant_id', getSingleRestaurant);
router.patch('/restaurant/:restaurant_id', updateOneRestaurant);
router.delete('/restaurant/:restaurant_id', deleteRestaurant);

export default router;
