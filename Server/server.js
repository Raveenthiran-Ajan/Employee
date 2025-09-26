const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const mongoDatabase = 'mongodb://localhost:27017/MERN';

mongoose.connect(mongoDatabase, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('There is problem while connecting database ' + err) }
);

const app = express();
mongoose.Promise = global.Promise;

const employeeRoutes = require('../Routes/Employee.route.js');

app.use(bodyParser.json());


app.use(cors());
app.use('/employees', employeeRoutes);


const port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log('Server Listening On Port : ' + port);
});
