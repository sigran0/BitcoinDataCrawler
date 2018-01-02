require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8081;
const host = process.env.HOST || '127.0.0.1';

const index = require('./routes/index');
const api = require('./routes/api');
const crawler = require('./tools/crawlLoop');

app.use('/', index);
app.use('/api', api);

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

// MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/coin-db', {
    useMongoClient: true
});

app.listen(port, host, function() {
    console.log(`server is running on ${host}:${port}`);
    crawler.run();
});