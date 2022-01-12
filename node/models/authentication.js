const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id 			: mongoose.Schema.Types.ObjectId,
    services 		: {
			        	password :{
			            	bcrypt : String,
			        	}
    				},
    loginTokens     : Array,
    profile	    	: {
				        uname  : String,
				        mobile : String,
				        email  : String,
				     },
	userType 		: String,
	status 			: String,
    otp 			: Number,
    createdAt 		: Date,
    createdBy 		: String
});

module.exports = mongoose.model('user', userSchema);