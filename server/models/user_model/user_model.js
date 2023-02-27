import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const userSchemal = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    user_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
        required: true,
    },
});

export default mongoose.model('User', userSchemal);