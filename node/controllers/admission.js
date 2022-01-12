const mongoose 		= require('mongoose');
const Student 	 	= require('../models/admission.js');
const Fs 			= require('fs');

exports.insert_student = (req, res, next) =>{	
	if (req.body.action === "Insert") {
		console.log("Inside Insert Student = ", req.body);
		Student.find({"user_id" : req.body.user_id})
        .then(response =>{
            if(response.length > 0){
                res.status(200).json({
                    message : "Already Applied!"
                });
            }else{
				var student = new Student({
					_id 			: new mongoose.Types.ObjectId(),
					user_id 		: req.body.user_id,
					course 	 		: req.body.course,
					branch		 	: req.body.branch,
					admissionYear 	: req.body.admissionYear,
					fname  			: req.body.fname,
					mname 	 		: req.body.mname,
					lname 			: req.body.lname,
					gender 			: req.body.gender,
					birthdate 		: req.body.birthdate,
					nationality 	: req.body.nationality,
					photo  			: req.body.photo,
					email 	 		: req.body.email,
					mobile 		 	: req.body.mobile,
					city 	 		: req.body.city,
					stateName 		: req.body.stateName,
					country 	    : req.body.country,
					address 		: req.body.address,
					school10th 		: req.body.school10th,
					marks10th 		: req.body.marks10th,
					year10th 		: req.body.year10th,
					school12th 		: req.body.school12th,
					marks12th 		: req.body.marks12th,
					year12th 		: req.body.year12th,
					doc10th 	 	: req.body.doc10th,
					doc12th 		: req.body.doc12th,
					createdAt 		: new Date(),
					createdBy 		: "Jyoti",
				})
				student.save()
				   .then(response =>{
					 	res.status(200).json({
					 		message  : "Student Inserted Successfully...",
					 		response : response,
					 	});
				   })
				   .catch(error =>{
					 	console.log("Error Occured While Inserting Student", error);
					 	res.status(500).json({
					 		message  : "Some Error Occured While Inserting Student",
					 		error 	 : error,
					 	});
				   });
			}
	})
	}else{
		console.log("Inside Update Student = ",req.body);
		Student.update(
				{_id : req.body.student_id},
				{
				 	$set:{
				 		user_id 		: req.body.user_id,
				 		course 	 		: req.body.course,
						branch		 	: req.body.branch,
						admissionYear 	: req.body.admissionYear,
						fname  			: req.body.fname,
						mname 	 		: req.body.mname,
						lname 			: req.body.lname,
						gender 			: req.body.gender,
						birthdate 		: req.body.birthdate,
						nationality 	: req.body.nationality,
						photo  			: req.body.photo,
						email 	 		: req.body.email,
						mobile 		 	: req.body.mobile,
						city 	 		: req.body.city,
						stateName 		: req.body.stateName,
						country 	    : req.body.country,
						address 		: req.body.address,
						school10th 		: req.body.school10th,
						marks10th 		: req.body.marks10th,
						year10th 		: req.body.year10th,
						school12th 		: req.body.school12th,
						marks12th 		: req.body.marks12th,
						year12th 		: req.body.year12th,
						doc10th 	 	: req.body.doc10th,
						doc12th 		: req.body.doc12th,
				 	}
				}
			 )
			 .then(response =>{
			 	res.status(200).json({
			 		message  	: "Student Updated Successfully...",
			 		student_id 	: req.body.student_id,
			 		response 	: response,
			 	});
			 })
			 .catch(error =>{
			 	console.log("Error Occured While Updating Student",error),
			 	res.status(500).json({
			 		message : "Some Error Occured While Updating Student",
			 		error 	: error,
			 	});
			 });
	}
}
// ========================= upload_photo =================================
exports.upload_photo = (req,res,next) => {
	console.log("photo = ", req.file);
	return res.status(200).json({
		filepath : req.file.path
	});

}
// ========================= upload_document10 =================================
exports.upload_document10 = (req,res,next) => {
	console.log("10th Result = ", req.file);
	return res.status(200).json({
		filepath : req.file.path
	});

}
// ========================= upload_document12 =================================
exports.upload_document12 = (req,res,next) => {
	console.log("12th Result = ", req.file);
	return res.status(200).json({
		filepath : req.file.path
	});

}
// ========================= delete_photo =================================
exports.delete_photo = (req,res,next) => {
	console.log("req.body = ", req.body);
	var filepath = req.body.filepath;
	Fs.unlink(filepath, (error)=>{
		if(error){
			 res.status(401).json({
				message : "File Can Not Be Deleted",
				error   : error
			});	
		}else{
			res.status(200).json({
				message : "File Deleted"
			});	
		}
	});
}
// ========================= delete_resultImage10th =================================
exports.delete_resultImage10th = (req,res,next) => {
	console.log("req.body = ", req.body);
	var filepath = req.body.filepath;
	Fs.unlink(filepath, (error)=>{
		if(error){
			 res.status(401).json({
				message : "File Can Not Be Deleted",
				error   : error
			});	
		}else{
			res.status(200).json({
				message : "File Deleted"
			});	
		}
	});
}
// ========================= delete_resultImage12th =================================
exports.delete_resultImage12th = (req,res,next) => {
	console.log("req.body = ", req.body);
	var filepath = req.body.filepath;
	Fs.unlink(filepath, (error)=>{
		if(error){
			 res.status(401).json({
				message : "File Can Not Be Deleted",
				error   : error
			});	
		}else{
			res.status(200).json({
				message : "File Deleted"
			});	
		}
	});
}
// ========================= get_oneStudent =================================
exports.get_oneStudent = (req,res,next)=>{
	var student_id = req.params.student_id;

	Student.findOne({_id : student_id})
			.then(student => {
		   		if(student){
			   		res.status(200).json({
			   			message : "Data Available",
			   			student : student
			   		});			   			
		   		}else{
			   		res.status(200).json({
			   			message : "Data Not Found",
			   			student : student
			   		});			   			
		   		}
		    })
			.catch((error)=>{
				console.log("error while getting Student Data = ", error);
				res.status(500).json({
					"message" : "Some error occured while getting Student Data",
					"error"   : error
				})
			});
}
// ========================= get_oneStudentuser =================================
exports.get_oneStudentuser = (req,res,next)=>{
	var user_id = req.params.user_id;

	Student.findOne({user_id : user_id})
			.then(student => {
		   		if(student){
			   		res.status(200).json({
			   			message : "Data Available",
			   			student : student
			   		});			   			
		   		}else{
			   		res.status(200).json({
			   			message : "Data Not Found",
			   			student : student
			   		});			   			
		   		}
		    })
			.catch((error)=>{
				console.log("error while getting Student Data = ", error);
				res.status(500).json({
					"message" : "Some error occured while getting Student Data",
					"error"   : error
				})
			});
}
// ========================= delete_student =================================
exports.delete_student = (req,res,next) =>{
	console.log("student id = ",req.body);

	Student.remove({_id : req.body.id})
		   .then(response => {
			   		console.log("response = ",response);
					res.status(200).json({
						message : "Student Deleted Successfully",
						response : response
					})
		   })
		   .catch((error)=>{
				console.log("error while Deleting Student = ", error);
				res.status(500).json({
					"message" : "Some error occured while Deleting Student",
					"error"   : error
				})
		   });
}
// ========================= get_studentList =================================
exports.get_studentList = (req,res,next)=>{
	console.log("in studentlist = ",req.body)
	Student.find()
		   .sort({createdAt : -1})
		   .then(students => {
		   		if(students.length > 0){
			   		res.status(200).json({
			   			message   : "Data Available",
			   			students  : students
			   		});			   			
		   		}else{
			   		res.status(200).json({
			   			message   : "Data Not Found",
			   			students  : students
			   		});			   			
		   		}
		   	})
			.catch((error)=>{
				console.log("error while getting Data = ", error);
				res.status(500).json({
					"message" : "Some error occured while getting Student List",
					"error"   : error
				})
			});
}