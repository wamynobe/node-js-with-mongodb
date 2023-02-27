import mongoose from 'mongoose';
import Restaurant from '../../models/restaurant_model/restaurant.js';

export async function createRestaurant(req, res) {
    const restaurant = new Restaurant({
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
                Restaurant: newRestaurant,
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
export function getListRestaurant(req, res) {
    Restaurant.find()
        .select('_id address borough cuisine restaurant_id name')
        .then((allRestaurant) => {
            return res.status(200).json({
                success: true,
                message: 'A list of all restaurant',
                Restaurant: allRestaurant,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });
}
export function getSingleRestaurant(req, res) {
    const id = req.params.restaurant_id;
    Restaurant.findOne({ restaurant_id: id })
        .then((restaurant) => {
            if (restaurant != null) {
                res.status(200).json({
                    success: true,
                    message: `Get single restaurant`,
                    Restaurant: restaurant,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `No restaurant found`,
                });
            }

        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This restaurant does not exist',
                error: err.message,
            });
        });
}
export function updateOneRestaurant(req, res) {
    const updateObject = req.body;
    const id = req.params.restaurant_id;

    Restaurant.updateOne({ restaurant_id: id }, { $set: updateObject })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Restaurant is updated',
                updateRestaurant: updateObject,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.'
            });
        });
}
export function deleteRestaurant(req, res) {
    const id = req.params.restaurant_id;
    Restaurant.findOneAndRemove({ restaurant_id: id })
        .exec()
        .then((data) => {
            if (data == null) {
                return res.status(404).json({
                    success: false,
                    message: `No restaurant found`,
                });
            }
            return res.status(204).json({
                success: true,
            });
        })
        .catch((err) => res.status(500).json({
            success: false,
        }));
}
