const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
	_id 			: mongoose.Schema.Types.ObjectId,
	course 	 		: String,
	branch		 	: String,
	admissionYear 	: String,
	fname  			: String,
	mname 	 		: String,
	lname 			: String,
	gender 			: String,
	birthdate 		: String,
	nationality 	: String,
	photo  			: String,
	email 	 		: String,
	mobile 		 	: String,
	city 	 		: String,
	stateName 		: String,
	country 	    : String,
	address 		: String,
	school10th 		: String,
	marks10th 		: String,
	year10th 		: String,
	school12th 		: String,
	marks12th 		: String,
	year12th 		: String,
	doc10th 	 	: String,
	doc12th 		: String,
	user_id 		: String,
	createdAt 		: Date,
	createdBy 		: String
});

module.exports = mongoose.model('student', studentSchema);


