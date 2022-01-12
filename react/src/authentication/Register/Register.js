import React, {Component} 	from 'react';
import './Register.css';

import $ 	 from 'jquery';
import Axios from 'axios';
import Swal  from 'sweetalert2';

export default class Register extends Component{
	constructor(){
		super();
		this.state = {
			uname 		: "",
			mobile 		: "",
			email 		: "",
			password 	: "",
			otp 		: "",
			userType	: "student",
			status 		: "Blocked",
		}
	}
	/*==============================componentDidMount()==============================================*/
	componentDidMount(){
		$("#eye").click(function(){
			var inputType = document.getElementById("password");
		  	if($(this).hasClass("fa-eye-slash")){
		  		$("#eye").removeClass("fa-eye-slash");
		  		$("#eye").removeClass("viewPass1");
		  		$("#eye").addClass("fa-eye");
		  		$("#eye").addClass("viewPass2");
		  		inputType.type = "text";
		  	}else{
		  		$("#eye").removeClass("fa-eye");
		  		$("#eye").removeClass("viewPass2");
		  		$("#eye").addClass("fa-eye-slash");
		  		$("#eye").addClass("viewPass1");
		  		inputType.type = "password";
		  	}
		  	if (($("#password").type) === "password") {
		  			console.log("password....");
		  		}
			console.log("classlist = ",$(this));
			console.log("classlist = ",inputType);
		});
	}
	/*==============================handleChange()==============================================*/
	handleChange(event){
		var name = event.currentTarget.name;
		this.setState({[name] : event.currentTarget.value});
	}
	/*==============================handleSubmit()==============================================*/
	handleSubmit(event){
		event.preventDefault();

		var formValues = {
			uname 		: this.state.uname,
			mobile 		: this.state.mobile,
			email 		: this.state.email,
			password 	: this.state.password,
			otp 		: this.state.otp,
			userType 	: this.state.userType,
			status 		: this.state.status,
		}
		
		Axios.post("http://localhost:3007/api/authentication/post",formValues)
			 .then(response =>{			 	
			 		
			 		if (response.data.message === "User with this email is already registered!") {
			 			Swal.fire('Oops!','User with this email is already registered!','info');
				 		this.setState({
				 			uname 		: "",
							mobile 		: "",
							email 		: "",
							password 	: "",						
							status 		: "Blocked",
				 		});
			 		}else{
				 		Swal.fire('Done!','Account Created Successfully...','success');
				 		this.setState({
				 			uname 		: "",
							mobile 		: "",
							email 		: "",
							password 	: "",						
							status 		: "Blocked",
				 		});
				 	}
			 	this.props.history.push("/");
			 })
			 .catch(error =>{			 	
		 		console.log("Error While Creating Account");
		 		Swal.fire('Oops!','Somthing Went Wrong...','error');			 	
			 });
	}
	render(){
		const winHeight = {
		  height: $(window).height()		  
		};
		return(
			<div className="register-wrapper container-fluid col-lg-12" style={{height: winHeight.height + 'px'}}>
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">						
						<div className="register col-lg-4 col-lg-offset-4">
							<div className="logoWrapper">
								<img src="/images/logo5.png" alt="logo.png"/>
							</div>
							<div className="registerForm">
								<h4>Register for an account</h4>
								<h6>Simply fill out the form below</h6>
								<form>
									<div className="registerRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<input type="text" name="uname" className="form-control" placeholder="Enter Your Name"
											onChange = {this.handleChange.bind(this)}
											value    = {this.state.uname}
										/>
									</div>
									<div className="registerRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<input type="text" name="mobile" className="form-control" placeholder="Enter Your Mobile Number"
											onChange = {this.handleChange.bind(this)}
											value 	 = {this.state.mobile}
										/>
									</div>
									<div className="registerRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<input type="email" name="email" className="form-control" placeholder="Enter Your Email"
											onChange = {this.handleChange.bind(this)}
											value 	 = {this.state.email}
										/>
									</div>									
									<div className="registerRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<input type="password" name="password" id="password" className="form-control" placeholder="Password"
											onChange = {this.handleChange.bind(this)}
											value 	 = {this.state.password}
										/>										
										<i id="eye" className="showPass viewPass1 fa fa-eye-slash"></i>
										<span className="msg">Click the eye to toggle visibility</span>
									</div>
									<div className="registerRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<input type="checkbox" name="remember" checked="checked" 
											onChange = {this.handleChange.bind(this)}
										/> 
										<div className="termsLabel"> I agree to the Terms of Service & Privacy Policy</div>
									</div>
									<div className="registerRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<button type="button" className="register-btn center-block"
											onClick={this.handleSubmit.bind(this)}
										>Sign Up</button>
									</div>
									<div className="loginRow accountRow col-lg-12 col-md-12 col-sm-12 col-xs-12">						
										<div className="account col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<p>Already have an account?</p>
											<a href="/" title="Sign in here">Sign in here</a>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>			
				</div>
			</div>			
		);
	}
}