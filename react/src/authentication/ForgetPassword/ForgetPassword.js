import React, {Component} 	from 'react';
import './ForgetPassword.css';

import $ 	 from 'jquery';
import Axios from 'axios';
import Swal  from 'sweetalert2';

export default class ForgetPassword extends Component{
	constructor(){
		super();
		this.state = {
			email 		: "",
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
		}
		console.log("formValues",formValues);
		Axios.post("http://localhost:3007/api/authentication/send_otp",formValues)
			 .then(response =>{		
			 		console.log("Response = ",response.data);			 		
			 		if (response.data.message === "Data Not Found") {
			 			Swal.fire('Sorry!','User with This Email Id Does Not Exist!','info');
				 		this.setState({
							email 		: "",
				 		});
			 		}else{
				 		var formValues ={
				 			userid 		: response.data.user._id,
				 			reqFrom 	: "forgetPass",
				 		}	
				 		console.log("response = ", formValues);				 		
				 		Swal.fire('Done!','OTP Sent On Your Email Id...','success');
				 		this.props.history.push("/verify_otp/",formValues);
				 	}			 	
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
			<div className="otp-wrapper container-fluid col-lg-12" style={{height: winHeight.height + 'px'}}>
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">						
						<div className="otp col-lg-4 col-lg-offset-4">
							<div className="logoWrapper">
								<img src="/images/logo5.png" alt="logo.png"/>
							</div>
							<div className="otpForm">
								<h4>Reset Password</h4>
								<h6>Enter your email for password recovery.</h6>
								<form>									
									<div className="otpRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<input type="email" name="email" className="form-control" placeholder="Enter Your Email Id"
											onChange = {this.handleChange.bind(this)}
											value 	 = {this.state.email}
										/>
									</div>
									<div className="btnRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<button type="button" className="otp-btn center-block"
											onClick={this.handleSubmit.bind(this)}
										>Send OTP</button>
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