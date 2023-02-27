import express from 'express';
import { login, register } from '../controller/authentication_controller/authentication_controller.js';
import { createRestaurant, getListRestaurant, getSingleRestaurant, updateOneRestaurant, deleteRestaurant } from '../controller/restaurant_controller/restaurant_controller.js';

const router = express.Router();
router.post('/restaurant', createRestaurant);
router.get('/restaurant', getListRestaurant);
router.get('/restaurant/:restaurant_id', getSingleRestaurant);
router.patch('/restaurant/:restaurant_id', updateOneRestaurant);
router.delete('/restaurant/:restaurant_id', deleteRestaurant);
router.post('/register', register);
router.post('/login', login);



export default router;
