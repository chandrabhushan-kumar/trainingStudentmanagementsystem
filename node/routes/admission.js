const express 	= require('express');
const router  	= express.Router();
const multer 	= require('multer');

var storage = multer.diskStorage({
	destination: function(req,res,cb){
		cb(null,'./uploads');
	},
	filename: function(req, file, cb){
		console.log("req = ",req);
		console.log("files = ",file);
		var originalname = file.originalname.split(".");
		cb(null, originalname[0] + "."+ originalname[1]);
	}
})

var upload 	 = multer({ storage : storage});

const StudentController   = require('../controllers/admission.js');

router.post('/post', 		   								StudentController.insert_student);
router.get('/get/:student_id', 								StudentController.get_oneStudent);
router.get('/get/one/:user_id', 							StudentController.get_oneStudentuser);
router.get('/get', 			   								StudentController.get_studentList);
router.post('/delete', 										StudentController.delete_student);
router.post('/delete/photo',   								StudentController.delete_photo);
router.post('/delete/image10th',   							StudentController.delete_resultImage10th);
router.post('/delete/image12th',   							StudentController.delete_resultImage12th);
router.post('/post/photo', 	 	upload.single("photo"), 	StudentController.upload_photo);
router.post('/post/doc10th', 	upload.single("doc10th"), 	StudentController.upload_document10);
router.post('/post/doc12th', 	upload.single("doc12th"), 	StudentController.upload_document12);

module.exports = router;
