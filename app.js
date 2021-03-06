const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://admin:admin123@ucldb-rvys5.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('UCL'))

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);
 
app.listen(5000);