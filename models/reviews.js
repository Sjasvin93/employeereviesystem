//including the mongoose library
const mongoose = require('mongoose');

//creating the reviews database schema
const userReviews = new mongoose.Schema({
    employee :{ 
        type: String,
        required: true
    },
    review_author :{ 
        type: String,
        required: true
    },
    review :{
        type: Array,
        required: true
    }
});

//naming the collection
const reviewSchema = mongoose.model('reviewSchema',userReviews);

//exporting the review collection
module.exports = reviewSchema;