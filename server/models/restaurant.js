import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const restaurantSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  address: {
    type: Object,
    required: true,
  },
  borough: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true,
  },
  restaurant_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Restaurant', restaurantSchema);