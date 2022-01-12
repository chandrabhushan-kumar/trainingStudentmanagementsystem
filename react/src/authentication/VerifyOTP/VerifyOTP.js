import React, {Component} 	from 'react';
import './VerifyOTP.css';

import $ 	 from 'jquery';
import Axios from 'axios';
import Swal  from 'sweetalert2';

export default class verifyOTP extends Component{
	constructor(props){
		super(props);
		this.state = {
			userid 		: "",
			otp 		: "",
			reqFrom 	: "",
		}
	}
	/*==============================componentDidMount()==============================================*/
	componentDidMount(){
		console.log("Verify OTP Props = ",this.props);
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
		this.setState({reqFrom : this.props.location.state.reqFrom});
		if (this.state.reqFrom === "login") {
			if(this.props.location.state.user_id && this.props.location.state.token){
				this.setState({
					userid 		: this.props.location.state.user_id,
					token  		: this.props.location.state.token,
					userType  	: this.props.location.state.userType,
				});
			}
		}
		if (this.state.reqFrom === "forgetPass") {
			if(this.props.location.state.user_id && this.props.location.state.token){
				this.setState({
					userid 		: this.props.location.state.user_id,
				});
			}
		}
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
			userid 		: this.state.userid,
			otp 		: this.state.otp,
			status 		: "Active",
		}
		
		Axios.post("http://localhost:3007/api/authentication/verify_otp",formValues)
			 .then(response =>{			 	
			 		console.log("Response From OTP = ",response.data);
			 		if (response.data.message === "OTP Matched!") {
			 			if(this.state.reqFrom === "login"){
					 		var formValues ={
					 			userType   	: this.state.userType,
					 			userid 		: this.state.userid,
					 			token  		: this.state.token,
					 		}	
					 		console.log("response = ", formValues);				 		
				 			Swal.fire('Login Successful!','Welcome to Dashboard...','success');	
				 			localStorage.setItem('token', this.state.token); 		
					 		this.props.history.push("/dashboard/",formValues);
					 	}else{
					 		var formValues ={
					 			userid 		: this.state.userid
					 		}	
					 		console.log("response = ", formValues);		
					 		this.props.history.push("/reset_password/",formValues);
					 	}	
			 		}else{
			 			Swal.fire('Oops!','OTP is Wrong...','error');
			 			this.setState({
							otp 		: "",	
				 		});	
			 		}			 	
			 })
			 .catch(error =>{			 	
		 		console.log("OTP Doesn't Matched");
		 		Swal.fire('Oops!','Somthing Went Wrong...','error');			 	
			 });
	}
	/*===============================render()=============================================*/
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
								<h4>Verify OTP</h4>
								<h6>Simply enter OTP here</h6>
								<form>									
									<div className="otpRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<input type="text" name="otp" className="form-control" placeholder="Enter OTP Here..."
											onChange = {this.handleChange.bind(this)}
											value 	 = {this.state.otp}
										/>
									</div>
									<div className="btnRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<button type="button" className="otp-btn center-block"
											onClick={this.handleSubmit.bind(this)}
										>Verify OTP</button>
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