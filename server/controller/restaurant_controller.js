import mongoose from 'mongoose';
import Resturant from '../models/restaurant.js';
// create new cause
export function createRestaurant(req, res) {
    const restaurant = new Resturant({
        _id: mongoose.Types.ObjectId(),
        address: req.body.address,
        borough: req.body.borough,
        cuisine: req.body.cuisine,
        restaurant_id: req.body.restaurant_id,
        name: req.body.name,
    });

    return restaurant
        .save()
        .then((newRestaurant) => {
            return res.status(201).json({
                success: true,
                message: 'New restaurant created successfully',
                Resturant: newRestaurant,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}
