	const express 		= require ('express');
	const app 			= express();

	const morgan 		= require('morgan');
	const bodyParser 	= require('body-parser'); 
	const mongoose 		= require ('mongoose');

	const dbname 		= 'student_admission';

	mongoose.connect('mongodb://localhost/'+dbname,{
		useNewUrlParser: true,
		useUnifiedTopology: true 
	})
	mongoose.promise = global.Promise;

	app.use(morgan("dev"));
	app.use('/uploads', express.static('uploads'));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
		if (req.method === "OPTIONS") {
			res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
			return res.status(200).json({});
		}
		next();
	});

	const StudentRoutes			= require("./routes/admission.js");
	const AuthenticationRoutes	= require("./routes/authentication.js");

	app.use("/api/student", 		StudentRoutes);
	app.use("/api/authentication", 	AuthenticationRoutes);
	
	app.get("/",(req,res)=>{
		res.json({"message":"Welcome to Student Admission API"})
	})

	app.use((req, res, next) => {
		const error = new Error("This URL Not found");
		error.status = 404;
		next(error);
	});

	app.use((error, req, res, next) => {
		res.status(error.status || 500);
		res.json({
				error: {
					message: error.message
				}
		});
	});

module.exports = app;