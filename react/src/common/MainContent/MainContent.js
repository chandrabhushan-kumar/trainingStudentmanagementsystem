import React, {Component} 	from 'react';
import {Route, Switch} 		from 'react-router-dom';

import './MainContent.css';

import Dashboard 		from '../../modules/student/Dashboard/Dashboard.js';
import AdmissionForm 	from '../../modules/student/AdmissionForm/AdmissionForm.js';
import StudentProfile 	from '../../modules/student/StudentProfile/StudentProfile.js';
import StudentList 		from '../../modules/student/StudentList/StudentList.js';
import PageNotFound 	from '../../common/PageNotFound/PageNotFound.js';


export default class MainContent extends Component{
	render(){
		return(
			<div className="row">
				<div className="main-content-wrapper col-lg-12">
					<Switch>	
						<Route exact path="/dashboard" 				component={Dashboard} />						 
						<Route exact path="/admission" 				component={AdmissionForm} />
						<Route exact path="/admission/:id" 			component={AdmissionForm} />
						<Route exact path="/student_profile/:id" 	component={StudentProfile} />
						<Route exact path="/student_list" 			component={StudentList} />
						<Route  					   				component={PageNotFound} />		
					</Switch>
				</div>			
			</div>			
		);
	}
}