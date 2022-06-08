//including the mongoose library
const mongoose = require('mongoose');

//creating the user database schema
const createUser = new mongoose.Schema({
    name :{ 
        type: String,
        required: true
    },
    email :{ 
        type: String,
        required: true
    },
    password :{
        type: String,
        required: true
    },
    type :{
        type: String,
        required: true
    }
});

//naming the collection
const userSchema = mongoose.model('userSchema',createUser);

//exporting the user collection
module.exports = userSchema;