import React, {Component} 	from 'react';
import './Login.css';

import $ 	 from 'jquery';
import Axios from 'axios';
import Swal  from 'sweetalert2';

export default class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			email 		: "",
			password 	: "",
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
			email 		: this.state.email,
			password 	: this.state.password,
		}

		Axios.post("http://localhost:3007/api/authentication/login",formValues)
			 .then(response =>{			 	
			 		// console.log("Response From Login = ",response.data);	
			 		if (response.data.message === "Successfully Logged In") {
			 			if (response.data.status === "Blocked") {
			 				var formValues = {
			 					user_id  : response.data.user_id,
			 					token 	 : response.data.token,
			 					userType : response.data.userType,
			 					reqFrom  : "login",
			 				}
			 				this.props.history.push("/verify_otp/",formValues);
			 			}else{
			 				Swal.fire('Done!','Login Successfully...','success');
				 			this.setState({
								email 		: "",
								password 	: "",
				 			});
				 			// var formValues ={
				 			// 	user_id  : response.data.user_id,
			 				// 	token 	 : response.data.token,
			 				// 	userType : response.data.userType,
				 			// }

				 			localStorage.setItem('token', response.data.token);
				 			localStorage.setItem('user_id', response.data.user_id);
				 			localStorage.setItem('userType', response.data.userType);
				 			this.props.history.push("/dashboard");
			 			}			 			
			 						 			
			 		}else{
			 			Swal.fire('Oops!', 'This User Id Does not Exist', 'error');
			 		}		 		
			 })
			 .catch(error =>{			 	
		 		console.log("Error While Login");
		 		Swal.fire('Oops!','Somthing Went Wrong...','error');			 	
			 });
	}
	render(){
		const winHeight = {
		  height: $(window).height()		  
		};
		// {console.log("height = ",winHeight.height)}
		return(
			<div className="login-wrapper container-fluid col-lg-12" style={{height: winHeight.height + 'px'}}>
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">										
						<div className="login col-lg-4 col-lg-offset-4">
							<div className="logoWrapper">
								<img src="/images/logo5.png" alt="logo.png"/>
							</div>
							<div className="loginForm">
								<h4>Welcome back</h4>
								<h6>Sign in with your credentials below.</h6>
								<form>
									<div className="loginRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<input type="email" name="email" className="form-control" placeholder="Enter Your Email"
											onChange = {this.handleChange.bind(this)}
											value 	 = {this.state.email}
										/>
									</div>
									<div className="loginRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<input type="password" name="password" id="password" className="form-control" placeholder="Password"
											onChange = {this.handleChange.bind(this)}
											value 	 = {this.state.password}
										/>
										<i id="eye" className="showPass viewPass1 fa fa-eye-slash"></i>
										<span className="msg">Click the eye to toggle visibility</span>
									</div>
									<div className="loginRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="remember col-lg-6 col-md-6 col-sm-6 col-xs-6">
											<input type="checkbox" name="remember" /> 
											<div className="rememberLabel">Remember Me</div>
										</div>
										<div className="forgetPass col-lg-6 col-md-6 col-sm-6 col-xs-6">
											<a href="/forget_password" className="forgetPass" title="click here to change password">Forget Password? </a>
										</div>
									</div>
									<div className="loginRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<button type="button" className="login-btn center-block"
											onClick={this.handleSubmit.bind(this)}
										>Login</button>
									</div>
									<div className="loginRow accountRow col-lg-12 col-md-12 col-sm-12 col-xs-12">						
										<div className="account col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<p>Don't have an account?</p>
											<a href="/register" title="click here to create an account">Create An Account</a>
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