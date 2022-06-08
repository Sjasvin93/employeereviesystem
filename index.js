//including the express library
const express = require('express');

//initializing the express
const app = express();

//setting the port number
const port = process.env.PORT || 8000;

const expressLayouts = require('express-ejs-layouts');

app.use(express.static('assets'));

app.use(expressLayouts);

//setting the path for the views 'ejs'
const path = require('path');

//setting up the database
const db = require('./config/mongoose.js') ;

//Setting up the ejs view engine
app.set('view engine', 'ejs');

//joining the path of current directory with views
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded());

//use express router
app.use('/', require('./routes'));

//making the app listener for the server
app.listen(port , function(err){
    if(err){
        console.log(`Error in starting the server: ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
});

// mongoose.connect('mongodb://localhost/employee_review_system_db');