const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

const users = require('./routes/users');
const port = 4444;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

//Body parser middleware
app.use(bodyParser.json());
app.use('/users',users);

//Index route
app.get('/',function (req,res) {
    res.send('woooww');
});

//Start server
app.listen(port,function () {
    console.log('Server running at port:' + port);
});