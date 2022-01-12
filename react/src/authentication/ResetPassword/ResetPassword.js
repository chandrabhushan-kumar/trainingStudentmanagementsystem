import React, {Component} 	from 'react';
import './ResetPassword.css';

import $ 	 from 'jquery';
import Axios from 'axios';
import Swal  from 'sweetalert2';

export default class ResetPassword extends Component{
	constructor(){
		super();
		this.state = {
			email 		: "",
			password 	: "",
		}
	}
	/*==============================componentDidMount()==============================================*/
	componentDidMount(){
		$("#eye1").click(function(){
			var inputType = document.getElementById("password");
		  	if($(this).hasClass("fa-eye-slash")){
		  		$("#eye1").removeClass("fa-eye-slash");
		  		$("#eye1").removeClass("viewPass1");
		  		$("#eye1").addClass("fa-eye");
		  		$("#eye1").addClass("viewPass2");
		  		inputType.type = "text";
		  	}else{
		  		$("#eye1").removeClass("fa-eye");
		  		$("#eye1").removeClass("viewPass2");
		  		$("#eye1").addClass("fa-eye-slash");
		  		$("#eye1").addClass("viewPass1");
		  		inputType.type = "password";
		  	}
		});
		$("#eye2").click(function(){
			var inputType = document.getElementById("confirmpassword");
		  	if($(this).hasClass("fa-eye-slash")){
		  		$("#eye2").removeClass("fa-eye-slash");
		  		$("#eye2").removeClass("viewPass1");
		  		$("#eye2").addClass("fa-eye");
		  		$("#eye2").addClass("viewPass2");
		  		inputType.type = "text";
		  	}else{
		  		$("#eye2").removeClass("fa-eye");
		  		$("#eye2").removeClass("viewPass2");
		  		$("#eye2").addClass("fa-eye-slash");
		  		$("#eye2").addClass("viewPass1");
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
			email 		: this.state.email,
			password 	: this.state.password,
		}
		console.log("formValues = ",formValues);

		Axios.post("http://localhost:3007/api/login",formValues)
			 .then(response =>{			 	
			 		console.log("Response From Login = ",response.data);			 		

			 		if (response.data.message === "Successfully Logged In") {
			 			if (response.data.status === "Blocked") {
			 				this.props.history.push("/match_otp/"+response.data.user_id);
			 			}else{
			 				Swal.fire('Done!','Login Successfully...','success');
				 			this.setState({
								email 		: "",
								password 	: "",
				 			});
				 			this.props.history.push("/dashboard");
			 			}			 			
			 			localStorage.setItem('token', response.data.token);			 			
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
			<div className="reset-wrapper container-fluid col-lg-12" style={{height: winHeight.height + 'px'}}>
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">										
						<div className="reset col-lg-4 col-lg-offset-4">
							<div className="logoWrapper">
								<img src="/images/logo5.png" alt="logo.png"/>
							</div>
							<div className="resetForm">
								<h4>Change Password</h4>
								<h6>Enter Your Password below to Change.</h6>
								<form>
									<div className="resetRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<input type="password" name="password" id="password" className="form-control" placeholder="Password"
											onChange = {this.handleChange.bind(this)}
											value 	 = {this.state.password}
										/>
										<i id="eye1" className="showPass viewPass1 fa fa-eye-slash"></i>
										<span className="msg">Click the eye to toggle visibility</span>
									</div>
									<div className="resetRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<input type="confirmpassword" name="confirmpassword" id="confirmpassword" className="form-control" placeholder="Confirm Password"
											onChange = {this.handleChange.bind(this)}
											value 	 = {this.state.confirmpassword}
										/>
										<i id="eye2" className="showPass viewPass1 fa fa-eye-slash"></i>
										<span className="msg">Click the eye to toggle visibility</span>
									</div>
									<div className="btnRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<button type="button" className="reset-btn center-block"
											onClick={this.handleSubmit.bind(this)}
										>Change Password</button>
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