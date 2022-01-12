import React, {Component} 		 from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './Layout.css';

import LeftSideBar 		from '../../common/LeftSideBar/LeftSideBar.js';
import Header 			from '../../common/Header/Header.js';
import Footer 			from '../../common/Footer/Footer.js';
import MainContent 		from '../../common/MainContent/MainContent.js';

import Login 			from '../../authentication/Login/Login.js';
import Register 		from '../../authentication/Register/Register.js';
import VerifyOTP 		from '../../authentication/VerifyOTP/VerifyOTP.js';
import ForgetPassword 	from '../../authentication/ForgetPassword/ForgetPassword.js';
import ResetPassword 	from '../../authentication/ResetPassword/ResetPassword.js';

export default class Layout extends Component{
	constructor(props){
		super(props);
		this.state={
			isLogin : false,
			token   : "",			
		}
	}
	/*===============================componentDidMount()=============================================*/
	componentDidMount(){
		this.checkLogin();
	}
	/*===============================checkLogin()=============================================*/
	checkLogin(){
		var token = localStorage.getItem("token");
		this.setState({token : token});
		if(token){
			this.setState({isLogin : true});
		}else{
			this.setState({isLogin : false});
		}
	}
	/*===============================render()=============================================*/
	render(){
		return(
			<Router>				
				<div className="container-fluid layout col-lg-12 col-md-12 col-sm-12 col-xs-12">
				{
					this.state.isLogin
				?
					<div className="row">
						<div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
							<LeftSideBar />
						</div>
						<div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
							<Header      />
							<MainContent />
							<Footer      />
						</div>
					</div>
				:
					<div className="row">
						<Switch>	
							<Route exact path="/" 					component={Login} />	
							<Route exact path="/register" 			component={Register} />	
							<Route exact path="/verify_otp" 		component={VerifyOTP} />	
							<Route exact path="/forget_password" 	component={ForgetPassword} />	
							<Route exact path="/reset_password" 	component={ResetPassword} />	
						</Switch>
					</div>
				}
				</div>				
			</Router>
		);
	}
}