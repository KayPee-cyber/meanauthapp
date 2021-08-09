const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to theDatabase
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

//On Connect
mongoose.connection.on('connected', () => {
    console.log('Connected to the database ' + config.database);
});

//On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});
// Express Middleware
const app = express();

const users = require('./routes/users');

//Port Number
const port = 3000;

//CORS Middlewarem
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

//Body-Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Users Route
app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

//Start Server
app.listen(port, () => {
    console.log('Server running on port ' + port);
});