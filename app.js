const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const app = express();

app.use(cors());
app.use(bodyParser.json());
//ROUTES
const userRoute = require('./routes/userController');
app.use('/user',userRoute);
const questionRoute = require('./routes/questionController');
app.use('/question',questionRoute);

//Connect to db
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true,useUnifiedTopology: true},() => 
console.log('Connected to DB'));

//start listening to the server
app.listen(3000);