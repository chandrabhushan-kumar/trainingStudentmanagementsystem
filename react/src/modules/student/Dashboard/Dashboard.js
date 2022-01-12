import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Dashboard.css';

import Axios from 'axios';
import Swal  from 'sweetalert2';

export default class Dashboard extends Component{
	constructor(props){
		super(props);
		this.state={
			user_id 		: "",
			userType 		: "",
			studentData 	: {},
			isLoad 			: true,
		}
	}
	/*===============================componentDidMount()=============================================*/
	componentDidMount(){		
		if(localStorage.getItem("userType") === "student"){
			console.log("user_id = ",localStorage.getItem("user_id"));
			this.setState({
				user_id : localStorage.getItem("user_id"),
				userType: localStorage.getItem("userType"),
			});
			this.getOneStudent(localStorage.getItem("user_id"));
		}		
	}
	/*==============================getOneStudent()==============================================*/
	getOneStudent(user_id){
		Axios.get("http://localhost:3007/api/student/get/one/"+user_id)
			 .then(response =>{
			 	// console.log("response = ",response.data);
			 	this.setState({
			 		studentData : response.data.student,
			 	});
			 })
			 .catch(error =>{
			 	console.log("Some Error Occured While Getting One Student Data");
			 });
	}
	/*==============================deleteStudent()==============================================*/
	deleteStudent(event){
		event.preventDefault();
		var id = event.currentTarget.id;
		var formValues = {
			id: id
		}

		Swal.fire({
		  title: 'Are you sure you want to Delete this Record?',
		  text: 'You will not be able to recover this record after delete!',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#d33',
		  cancelButtonColor: '#3085d6',
		  confirmButtonText: 'Yes, delete it!',
		  cancelButtonText: 'No, keep it'
		}).then((result) => {
		  if (result.value) {

			Axios.post("http://localhost:3007/api/student/delete",formValues)
				 .then(response =>{
					console.log("response = ", response.data);
					Swal.fire('Deleted!', 'Student Deleted Successfully!', 'success');
					if(response.data.response.deletedCount === 1){
				 		this.getOneStudent(this.state.user_id);
				 	}
				 })
				 .catch(error=>{
					console.log("Error while Deleting Student", error);
					Swal.fire('Oops...', 'Something went wrong!', 'error')
				 });

		  } else if (result.dismiss === Swal.DismissReason.cancel) {
		    Swal.fire(
		      'Ok Fine!',
		      'Your record is safe :)',
		      'info'
		    )
		  }
		})	
	}
	/*===============================render()=============================================*/
	render(){
		return(
			<div className="row pageWrapper">
				<div className="breadcrums">
					<div className="pageName">
						<h3>Dashboard</h3>
					</div> 
					<div className="divider">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
						<span className="divider-slash">|</span>
					</div>
					<div className="pagePath">
						<p>
							<Link to="/" className="home"><i className="fa fa-home"></i></Link>
							<span className="divider-slash">
								<i className="fa fa-circle"></i>
							</span>
							<Link to="/">Dashboard</Link>
						</p>
					</div>
					<div className="three-dots pull-right">
						<i className="fa fa-ellipsis-v"></i>
					</div>
				</div>
				{
					this.state.userType === "student"
				?
					<div className="main-content col-lg-12 col-md-12 col-sm-12 col-xs-12">						
						{
							this.state.studentData
						?
							<div className="tabledata col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<h3>Application form</h3>
								<table className="table table-bordered table-striped table-hovered">
									<thead>
										<tr>
											<th>Applicant Name</th>
											<th>Email Id</th>
											<th>Gender</th>
											<th>Course</th>
											<th>Branch</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										<tr>										
											<td>
												{
													this.state.studentData.fname + " " +
													this.state.studentData.mname + " " +
													this.state.studentData.lname 
												}
											</td>										
											<td className="emailwrap">{this.state.studentData.email}</td>										
											<td className="genderwrap">{this.state.studentData.gender}</td>										
											<td className="coursewrap">{this.state.studentData.course}</td>										
											<td className="branchwrap">{this.state.studentData.branch}</td>										
											<td className="actionwrap">
												<a href={"/admission/"+this.state.studentData._id} ><i className="fa fa-edit action-icon"></i></a>&nbsp; | &nbsp; 
												<a href={"/student_profile/"+this.state.studentData._id} ><i className="fa fa-eye action-icon"></i></a>&nbsp; | &nbsp;
												<span id={this.state.studentData._id} onClick={this.deleteStudent.bind(this)}><i className="far fa-trash-alt action-icon"></i></span>
											</td>										
										</tr>
									</tbody>
								</table>
							</div>
						:
							<div className="tabledata col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<h3>Application form</h3>
								<div className="noData col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-12">									
									<i className="fa fa-file-alt"></i>
									<h3>The Admission Form is Not Yet Filled...!</h3>											
								</div>
							</div>
						}
					</div>
				:
					<div className="main-content">
						<div className="stats">
							<div className="col-lg-3 stat-block">
								<div className="all-records-1">
									<div className="count-and-icon">										
										<div className="stat-icon col-lg-12">
											<i className="icon-1 fas fa-user-graduate"></i>
										</div>
										<div className="stat-count col-lg-12">
											<p>2000</p>
										</div>
									</div>
									<div className="statName">
										<h4>Total Applications</h4>
									</div>
									<div className="viewMore">
										<a href="/student_list">View More <i className="fa fa-angle-double-right"></i></a>
									</div>
								</div>
							</div>
							<div className="col-lg-3 stat-block">
								<div className="all-records-2">
								<div className="count-and-icon">
										<div className="stat-icon col-lg-12">
											<i className="icon-2 fas fa-file-alt"></i>
										</div>
										<div className="stat-count col-lg-12">
											<p>20</p>
										</div>
									</div>
									<div className="statName">
										<h4>Total Courses</h4>
									</div>
									<div className="viewMore">
										<a href="/student_list">View More <i className="fa fa-angle-double-right"></i></a>
									</div>
								</div>
							</div>
							<div className="col-lg-3 stat-block">
								<div className="all-records-3">
									<div className="count-and-icon">
										<div className="stat-icon col-lg-12">
											<i className="icon-3 fas fa-file-alt"></i>
										</div>
										<div className="stat-count col-lg-12">
											<p>2000</p>
										</div>
									</div>
									<div className="statName">
										<h4>Total Branches</h4>
									</div>
									<div className="viewMore">
										<a href="/student_list">View More <i className="fa fa-angle-double-right"></i></a>
									</div>
								</div>
							</div>
							<div className="col-lg-3 stat-block">
								<div className="all-records-4">
									<div className="count-and-icon">
										<div className="stat-icon col-lg-12">
											<i className="icon-4 fas fa-user-graduate"></i>
										</div>
										<div className="stat-count col-lg-12">
											<p>2000</p>
										</div>
									</div>
									<div className="statName">
										<h4>Total Accepted Aplications</h4>
									</div>
									<div className="viewMore">
										<a href="/student_list">View More <i className="fa fa-angle-double-right"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}
