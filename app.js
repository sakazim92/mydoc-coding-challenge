// import core modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // an optional middleware to log incomming requests into the console window
const mongoose = require('mongoose');
var config = require('./config');
// var swaggerJSDoc = require('swagger-jsdoc');
// require('events').EventEmitter.defaultMaxListeners = 0;

//import routes
const keyValueStoreRoutes = require('./routes/keyValueStoreRoutes');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(config.dbConnection, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    if (err) {
        console.log('Unable to connect to the database. Please restart the server. Error:', err);
    } else {
        console.log('Connected to Database successfully!');
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); // Now all the incomming requests with funnel through it and will get logded into the console window.
app.use('/object', keyValueStoreRoutes);
app.disable('etag');


module.exports = app;