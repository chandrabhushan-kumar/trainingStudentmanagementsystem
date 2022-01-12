import React, {Component} from 'react';
import {Link} 			  from 'react-router-dom';
import $ 				  from 'jquery';
import './LeftSideBar.css';

export default class LeftSideBar extends Component{
	constructor(props){
		super(props);
		this.state = {
			userType : "",
		}
	}
	/*===============================componentDidMount()=============================================*/
	componentDidMount(){
		this.checkUser();
		$('.leftMenuList li').click(function() {
		    $(this).addClass('active').siblings().removeClass('active');
		});
	}
	/*===============================checkUser()=============================================*/
	checkUser(){
		var userType = localStorage.getItem("userType");
		this.setState({userType : userType});
	}
	/*===============================render()=============================================*/
	render(){
		return(
			<div className="row">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 leftsideBar">
					<div className="row">				
						<div className="logo">
							<Link to="/"><small><img src="/images/logo5.png" alt="logo.png" /> Student</small><b>App</b></Link>
						</div>
						<div className="leftMenuBar">
							<h6 className="main-navigation">Main Navigation</h6>
							<ul className="leftMenuList">
								<li className="active">
									<Link to="/dashboard"><i className="fa fa-home"></i>Dashboard</Link>
								</li>
								{									
									this.state.userType ==="student"
								?
									<li>
										<Link to="/admission"><i className="fas fa-file-alt"></i>Admission</Link>
									</li>
								:
									<li>
										<Link to="/student_list"><i className="fas fa-user-graduate"></i>Student List</Link>
									</li>
								}
							</ul>
						</div>
					</div>					
				</div>
			</div>
		);
	}
}