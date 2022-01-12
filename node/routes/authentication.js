const express 	= require('express');
const router  	= express.Router();

const AuthenticationController   = require('../controllers/authentication.js');

router.post('/post', 		   	AuthenticationController.insert_user);
router.post('/login', 			AuthenticationController.login_user);
router.post('/verify_otp', 		AuthenticationController.verify_otp);
router.post('/send_otp', 		AuthenticationController.send_otp);
// router.get('/get/one/:user_id', AuthenticationController.get_oneStudentuser);
// router.get('/get', 			   	AuthenticationController.get_studentList);
// router.post('/delete', 			AuthenticationController.delete_student);

module.exports = router;
