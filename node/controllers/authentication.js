const mongoose 		= require('mongoose');
const User 	 		= require('../models/authentication.js');
const bcrypt    	= require('bcryptjs');
var jwt 			= require('jsonwebtoken');
var nodemailer 		= require('nodemailer');

/*===============================insert_user()=============================================*/
exports.insert_user = (req, res, next) =>{	

	console.log("Inside Signup User = ", req.body);

	User.find({"profile.email" : req.body.email})
        .then(response =>{
            if(response.length > 0){
                res.status(200).json({
                    message : "User with this email is already registered!"
                });
            }else{
                bcrypt.hash(req.body.password, 10, function(err,hash){
                    console.log("hash = ",hash);
                    const user = new User({
                        "_id"          : new mongoose.Types.ObjectId(),
                        profile        : {
                            "uname"     : req.body.uname,
                            "mobile"   : req.body.mobile,
                            "email"    : req.body.email,
                        },
                        "services.password.bcrypt"   : hash,
                        "userType"                   : req.body.userType,
                        "status" 					 : req.body.status,
                        "otp" 						 : getRndInteger(1000,10000),
                        "createdAt" 				 : new Date(),
                    });
            
                    user.save()
                        .then(user => {
                            console.log("user = ", user);

                            var transporter = nodemailer.createTransport({
							  service: 'gmail',
							  auth: {
							    user: 'khedkarjyoti1995@gmail.com',
							    pass: 'jyo@1995'
							  }
							});

							var mailOptions = {
							  from    : 'khedkarjyoti1995@gmail.com',
							  to      : user.profile.email,
							  subject : 'OTP From Student Admission Portal',
							  text    : 'OTP is : '+user.otp,
							};

							transporter.sendMail(mailOptions, function(error, info){
							  if (error) {
							    console.log(error);
							  } else {
							    console.log('Email sent: ' + info.response);
							  }
							});

                            res.status(200).json({
                                "user" : user
                            });
                        })
                        .catch( (err) => {
                            console.log("error while storing signup data ", err);
                            res.status(500).json({
                                error : err,
                                message : "error while storing signup data"
                            })
                        })
            
                });                


            }
        })
}
/*===============================login_user()=============================================*/
exports.login_user = (req,res,next) => {
    console.log("login body = ", req.body);

    User.findOne({"profile.email" : req.body.email})
        .then(response => {
            console.log("Response login = ", response);
            if(response){
                var storedPwd = response.services.password.bcrypt; 
                var status 	  = response.status;
                var user_id   = response._id;
                var userType  = response.userType;
                
                bcrypt.compare(req.body.password, storedPwd, function(err,rslt){
                    if(rslt){                       
                        var token = jwt.sign({
                                        email   : req.body.email,
                                        user_id : response._id,
                                        password : req.body.password
                                    }, 
                                    'secret',
                                    {
                                        expiresIn : "7d"
                                    });
                        
                        User.updateOne(
                            {_id : response._id},
                            {
                                $push : {"loginTokens" :
                                		{
		                                    timestamp : new Date(),
		                                    token : token
                                		}  
                            	}
                            }
                        )
                        .then(updateResponse => {
                            res.status(200).json({
                                message  : "Successfully Logged In",
                                token 	 : token,
                                status 	 : status,
                                user_id  : user_id,
                                userType : userType,
                            })
                        })
                        .catch((err) => {
                            console.log("error while generating Token", err);
                            res.status(500).json({
                                error : err,
                                message : "error while generating Token"
                            })
                        })

                    }else{
                        res.status(200).json({
                            message : "Password Not Matching!"
                        })
                    }
                });

            }else{
                res.status(200).json({
                    message : "Please register before Login"
                })
            }
        })
        .catch( (err) => {
            console.log("error while Login ", err);
            res.status(500).json({
                error : err,
                message : "error while Login"
            })
        })
}
/*===============================verify_otp()=============================================*/
exports.verify_otp = (req,res,next)=>{
	console.log("In verify OTP = ",req.body);

	User.findOne({_id : req.body.userid})
		.then((user)=>{
			if(user.otp == req.body.otp){
                User.updateOne(
                            {_id : req.body.userid},
                            {
                                $set : {"status" : req.body.status}
                            }
                        )
                        .then(response => {
                            res.status(200).json({
                                message  : "Status Updated"
                            })
                        })
                        .catch((err) => {
                            console.log("error while generating Token", err);
                            res.status(500).json({
                                message : "Error While Updating Status"
                            })
                        })
				    res.status(200).json({
                    message : "OTP Matched!"
                })
			}else{
				    res.status(200).json({
                    message : "OTP Doesn't Matched!"
                })
			}
		})
		.catch((error)=>{
			console.log("Error While Getting User Data", error);
            res.status(500).json({
                error : error,
                message : "Error While Getting User Data"
            })
		});
}
// ========================= get_oneStudent =================================
exports.send_otp = (req, res, next)=>{

    User.findOne({"profile.email" : req.body.email})
        .then(user => {
            if(user){
                var newOtp = getRndInteger(1000,10000);
                User.updateOne(
                            {_id : user._id},
                            {
                                $set : {"otp" : newOtp}
                            }
                    )
                    .then(updateUser => {
                        var transporter = nodemailer.createTransport({
                            services: 'gmail',
                            auth    : {
                                        user    : 'khedkarjyoti1995@gmail.com',
                                        pass    : 'jyo@1995'
                                      }
                        });

                        var mailOptions = {
                          from    : 'khedkarjyoti1995@gmail.com',
                          to      : req.body.email,
                          subject : 'OTP From Student Admission Portal',
                          text    : 'OTP is : '+newOtp,
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                          if (error) {
                            console.log(error);
                          } else {
                            console.log('Email sent: ' + info.response);
                          }
                        });
                        res.status(200).json({
                            message  : "OTP Updated"
                        })
                        
                    })
                    .catch((err) => {
                        console.log("error while updating OTP", err);
                        res.status(500).json({
                            message : "Error While Updating OTP"
                        })
                    })
                
                res.status(200).json({
                    message : "OTP Sent",
                    user    : user
                });

            }else{
                res.status(200).json({
                    message : "Data Not Found",
                    user    : user
                });                     
            }
        })
        .catch((error)=>{
            console.log("error while getting User Data = ", error);
            res.status(500).json({
                "message" : "Some error occured while getting User Data",
                "error"   : error
            })
        });
}
// ========================= Generate Random Number =========================
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}