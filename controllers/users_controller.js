const { use } = require('express/lib/application');
const User = require('../models/users');
const PendingReviews = require('../models/pendingreviews');
const Reviews = require('../models/reviews');

//action to rediect and return the signup page
module.exports.signUp = async function(req,res){
    try{
        return res.render('signup', {
            title: "SIGN UP",
        });
    }catch(err){
        console.log('Error', err);
        return;
    }  
}

//action to rediect and return the signin page
module.exports.signIn = async function(req,res){
    try{
        return res.render('signin', {
            title: "SIGN IN",
        });
    }catch(err){
        console.log('Error', err);
        return;
    }  
}

//action to create a user in the admin database
module.exports.createUser = function(req, res){
    console.log(req.body);
    if (req.body.userPassword != req.body.userConfirmPassword){
        return res.redirect('back');
    }
    User.findOne({email: req.body.userEmail}, function(err, user){
        if(err){console.log("error in creating the user");}
        if (!user){
            User.create({
                name: req.body.userName,
                email: req.body.userEmail,
                password: req.body.userPassword,
                type: req.body.userType
            }, function(err, newUser){
                if(err){
                    console.log('Error in creating the list');
                    return;
                }
                console.log("Successfull Insertion", newUser);
                return res.redirect('/users/sign-in');
            });
        }else{
            console.log("successfully created");;
            return res.redirect('back');
        }

    });
}
 
// render the admin and employee sign-in page
module.exports.profileLogIn = async function(req, res){
    let user = await User.findOne({email: req.body.loginEmail});
    if(user.type == "ADMIN"){
        let users = await User.find({type: "EMPLOYEE"});
        var isUser = false;
        if(users.length >= 1){
            isUser = true;
            return res.render('admin_profile', {
                title: 'Admin Profile',
                users: users,
                isUser: isUser
            });
        }else{
            return res.render('admin_profile', {
                title: 'Admin Profile',
                isUser: isUser
            });
        }        
    }else{
        let emp = await PendingReviews.findOne({employee: user.id});
        let reviews = await Reviews.find({employee: user.id});
        var isPendingReview = false;
        var isReview = false;
        let names = [];
        let pendingreviews= [];
        let results = [];
        if(emp && reviews.length >= 1){
            pendingreviews  = emp.reviewsId;
            for(var i = 0; i < pendingreviews.length; i++){
                let pend_rev = await User.findById(pendingreviews[i]);
                if(pend_rev){
                    results[i] = pend_rev;
                } 
            }
            for(var r = 0; r < reviews.length; r++){
                let temp_name = await User.findById(reviews[r].review_author);
                if(temp_name){
                    names[r]= temp_name.name;
                }
            }
            isPendingReview = true;
            isReview =true;
            return res.render('employee_profile', {
                title: 'Employee Profile',
                profile_user: user,
                pending_reviews: results,
                emp_reviews: reviews,
                auth_name: names,
                isPendingReview : isPendingReview,
                isReview : isReview
            });
        }else if(emp){
            pendingreviews  = emp.reviewsId;
            for(var i = 0; i < pendingreviews.length; i++){
                let pend_rev = await User.findById(pendingreviews[i]);
                if(pend_rev){
                    results[i] = pend_rev;
                }
            }
            isPendingReview = true;
            return res.render('employee_profile', {
            title: 'Employee Profile',
            profile_user: user,
            pending_reviews: results,
            isPendingReview : isPendingReview,
            isReview : isReview
            });
        }else if(reviews.length >= 1){
            for(var r = 0; r < reviews.length; r++){
                let temp_name = await User.findById(reviews[r].review_author);
                if(temp_name){
                    names[r]= temp_name.name;
                }
            }
            isReview = true;            
            return res.render('employee_profile', {
                title: 'Employee Profile',
                profile_user: user,
                emp_reviews: reviews,
                auth_name: names,
                isReview : isReview,
                isPendingReview : isPendingReview
            });
        }else{
            return res.render('employee_profile', {
                title: 'Employee Profile',
                isPendingReview : isPendingReview,
                isReview : isReview
            });
        }        
    }    
}



