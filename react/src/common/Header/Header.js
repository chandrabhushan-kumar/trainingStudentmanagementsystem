import React, {Component} from 'react';
import './Header.css';

export default class Header extends Component{
	logoutForm() {	
		console.log("style = ", document.getElementById("myForm").style.display);
		if((document.getElementById("myForm").style.display)==="block"){
			document.getElementById("myForm").style.display = "none";
		}else{
			document.getElementById("myForm").style.display = "block";			
		}	
	}
	/*===============================logout()=============================================*/
	logout(){
		localStorage.clear();
	}
	/*===============================render()=============================================*/
	render(){
		return(
			<div className="row">
				<div className="col-lg-12 headerbar">				
					<div className="menuBtn">
						<i className="fa fa-bars"></i>
					</div>
					<div className="user" onClick={this.logoutForm.bind(this)}>
						<div className="adminLogin">
							<img src="/images/user.jpg" alt="user.jpg" />
						</div>					
						<div className="userName pull-right">
							Jyoti Khedkar
						</div>
					</div>
					<div className="form-popup" id="myForm">
						<div className="userDetails">
							<i className="fa fa-user-alt user-icon"></i> &nbsp;
							<span>Jyoti Khedkar</span>
						</div>
						<div className="logout">
							<a href="/" onClick={this.logout.bind(this)}>Logout</a>
						</div>						  
					</div>
				</div>
			</div>
		);
	}
}