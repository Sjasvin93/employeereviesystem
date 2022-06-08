//including the mongoose library
const mongoose = require('mongoose');

//creating the pending reviews database schema
const pendingReviews = new mongoose.Schema({
    employee :{ 
        type: String,
        required: true
    },
    reviewsId :{
        type: Array,
        required: true
    }
});

//naming the collection
const pendingReviewsSchema = mongoose.model('pendingReviewsSchema',pendingReviews);

//exporting the pending reviews collection
module.exports = pendingReviewsSchema;