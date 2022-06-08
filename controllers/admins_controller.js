const User = require('../models/users');
const Reviews = require('../models/reviews');
const PendingReviews = require('../models/pendingreviews');

//action to rediect and return the employee update page
module.exports.employeeUpdate = async function(req,res){
    try{
        user = await User.findById(req.params.id);
        return res.render('employee_update', {
            title: "EMPLOYEE UPDATE",
            user: user
        });
    }catch(err){
        console.log('Error', err);
        return;
    }      
}

module.exports.update = async function(req,res){
    User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true}, function(err, result){
        if(err){
            console.log(err);
        }
        return res.redirect('back');
    }); 
}

module.exports.updateToAdmin = async function(req,res){
    let request = req.body.actionButton;
    if(request == "admin"){
        User.findByIdAndUpdate(req.params.id,{ $set: { type: "ADMIN" } },{new:true}, function(err, result){
            if(err){
                console.log(err);
            }
        });
        return res.redirect('/'); 
    }else{
        User.findByIdAndDelete(req.params.id,function(err){
            if(err){
                console.log("Error in deleting the object");
            }
        });
        let review_aut = await Reviews.find({employee: req.params.id});
        if(review_aut){
            Reviews.findByIdAndDelete(review_aut.id,function(err){
                if(err){
                    console.log("Error in deleting the object");
                }
            });
        }
        let pend_rev = await PendingReviews.find({employee: req.params.id});
        if(pend_rev){
            PendingReviews.findByIdAndDelete(pend_rev.id,function(err){
                if(err){
                    console.log("Error in deleting the object");
                }
            });
        }
    }
    return res.redirect('/');        
}    


module.exports.employeeDetails = async function(req,res){
    try{
        user = await User.findById(req.params.id);
        // reviews = await Reviews.find({employee: req.params.id});
        let reviews = await Reviews.find({employee: req.params.id});
        let names = [];
        for(var r = 0; r < reviews.length; r++){
            let temp_name = await User.findById(reviews[r].review_author);
            if(temp_name){
                names[r]= temp_name.name;
            }
        }
        return res.render('employee_details', {
            title: "EMPLOYEE DETAILS",
            user: user,
            emp_reviews: reviews,
            auth_name: names
        });
    }catch(err){
        console.log('Error', err);
        return;
    }  
}

module.exports.assignReviews = async function(req,res){
    users = await User.find({type: "EMPLOYEE"});
    emp = req.params.id;
    var employees = [];
    for(let u of users){
        if(u._id == req.params.id){
            continue;
        }else{
            employees.push(u);
        }        
    }
    try{
        return res.render('assign_reviews', {
            title: "ASSIGN REVIEWS",
            employees: employees,
            emp: emp            
        });
    }catch(err){
        console.log('Error', err);
        return;
    }  
}


module.exports.employeeAssignReview = async function(req,res){
    employeesList = req.body.employees;
    let check = await PendingReviews.findOne({employee: req.params.id});
    if(check){
        await PendingReviews.findByIdAndUpdate(check.id,{ $set: { reviewsId: employeesList }});
        return res.redirect('back');
    }else{
        PendingReviews.create({
            employee: req.params.id,
            reviewsId: employeesList
        },function(err, assign){
            if(err){
                console.log('Error in creating the list');
                return;
            }
            return res.redirect('back');
        });
    }
    
}