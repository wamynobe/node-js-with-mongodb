// import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import * as dotenv from 'dotenv'
import router from '../node-js-with-mongo/server/routes/main.js';
dotenv.config();
// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
// set up mongoose
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Error connecting to database');
    });
// set up port
const port = 5035;
// set up route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Project with Nodejs Express and MongoDB',
    });
});
app.listen(port, () => {
    console.log(`Our server is running on port ${port}`);
});
app.use('/api/', router);
