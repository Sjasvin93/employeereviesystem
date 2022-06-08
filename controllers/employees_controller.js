const reviews = require('../models/reviews');
const user = require('../models/users');
const pendingReviews = require('../models/pendingreviews');
const { type } = require('express/lib/response');

module.exports.employeeFeedback= async function(req,res){
    const author = req.body.userId;
    try{
        employee = await user.findById(req.params.id);
        return res.render('give_feedback', {
            title: "GIVE FEEDBACK",
            current_user: employee,
            feedback_author: author
        });
    }catch(err){
        console.log('Error', err);
        return;
    }
}

module.exports.employeeSubmitFeedback= async function(req,res){
    author = await user.findById(req.body.reviewAuthor);
    currentUser = req.params.id;
    let authordetails = await pendingReviews.findOne({employee: req.body.reviewAuthor});
    if(authordetails.reviewsId.length == 1){
        pendingReviews.findByIdAndDelete(authordetails.id,function(err){
            if(err){
                console.log("Error in deleting the object");
            }
        });
    }else{
        await pendingReviews.findByIdAndUpdate(authordetails.id,{ $pull: { reviewsId: currentUser }});
    }
    reviews.create({
        employee: currentUser,
        review_author: author.id,
        review: req.body.feedback
    }, function(err, newReview){
        if(err){
            console.log('Error in creating the list');
            return;
        }
        console.log("Successfull Insertion", newReview);
        return res.redirect('/');
    });       
}