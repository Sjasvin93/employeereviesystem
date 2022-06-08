//mongoose library
const mongoose = require('mongoose');

//connect to the employee review database
mongoose.connect('mongodb+srv://sjasvin9493:55dnMViuYUr5pggp@cluster0.uzty2.mongodb.net/employee_review_system_db?retryWrites=true&w=majority');

//acquire the connection to check if its successful or not
const db = mongoose.connection;

// to check for error
db.on('error', console.error.bind(console, 'error connection to db'));

//after successful connection
db.once('open', function(){
    console.log('DB is connected successfully');
});

//exporting the database
module.exports = db;