const express = require('express');
const app = express();
const bodyParser = require('body-parser');  
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny')); //tiny will log only the request method, url, status code and response time

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err.message);
});

app.use('*', (req, res, next) => {
    console.log('Request was made to: ' + req.originalUrl);
    return res.status(400).json({ 
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
     });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});