import React, {Component} from 'react';

import './StudentProfile.css';

import Axios from 'axios';
import Swal  from 'sweetalert2';

export default class StudentProfile extends Component{
	constructor(props){
		super(props);
		this.state={
			student_id 		: "",
			studentData 	: {},
		}
	}
	/*===============================componentDidMount()=============================================*/
	componentDidMount(){
		console.log("Props = ", this.props.match.params.id);
		if(this.props.match.params.id){
			this.setState({student_id : this.props.match.params.id});
			this.getOneStudent(this.props.match.params.id);
		}
	}
	/*==============================getCarModels()==============================================*/
	getOneStudent(student_id){
		Axios.get("http://localhost:3007/api/student/get/"+student_id)
			 .then(response =>{
			 	this.setState({
			 		studentData : response.data.student,
			 	});
			 	console.log("Student data : ", this.state.studentData);
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
					this.props.history.push("/dashboard");
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
	/*==============================render()==============================================*/
	render(){
		return(
			<div className="pageWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="profilePic col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="profileback row">
						{/*<img src="/images/profile-back.jpg" alt="profile-back.jpg" />*/}
					</div> 
					<div className="profilefront">
						<div className="studentImg">
							{	
								this.state.studentData.photo
							?
								<img src={"http://localhost:3007/"+this.state.studentData.photo} alt="user.jpg" />
							:
								null
							}
						</div>	
						<div className="studentName">
							<h3>{this.state.studentData.fname + " " + this.state.studentData.mname + " " + this.state.studentData.lname}</h3>
						</div>
						<div className="actions ">
							<div className="actionLink">
								<i className="fa fa-trash" id={this.state.studentData._id} onClick={this.deleteStudent.bind(this)}></i>
							</div>
						</div>
						<div className="actions">
							<div className="actionLink">
								<a href={"/admission/"+this.state.studentData._id}><i className="fa fa-edit"></i></a>
							</div>
						</div>
						<div className="actions">
							<div className="actionLink">
								<a href={"/dashboard/student/"+this.state.studentData.user_id}><i className="fa fa-list"></i></a>
							</div>
						</div>					
					</div>					
					<div className="three-dots pull-right">
						<i className="fa fa-ellipsis-v"></i>
					</div>
				</div>
				<div className="blockrow padding-left0 padding-right0 col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
					<div className="courseInfo col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<h3 className="blockHeading">Course Information</h3>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<i className="field-icon far fa-file-alt"></i>
							{this.state.studentData.course}
						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<i className="field-icon far fa-file-alt"></i>
							{this.state.studentData.branch}
						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<i className="field-icon far fa-calendar-alt"></i>
							{this.state.studentData.admissionYear}
						</div>
					</div>
				</div>

				<div className="blockrow padding-left0 padding-right0 col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
					<div className="padding-left0 col-lg-8 col-md-8 col-sm-8 col-xs-12">
						<div className="personalInfo col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<h3 className="blockHeading">Personal Information</h3>
							<div className="field">
								<i className="field-icon far fa-user"></i>
								{this.state.studentData.fname + " " + this.state.studentData.mname + " " + this.state.studentData.lname}
							</div>
							<div className="field">
								<i className="field-icon fas fa-calendar-alt"></i>
								{this.state.studentData.birthdate}
							</div>
							<div className="field">
								<i className="field-icon far fa-user"></i>
								{this.state.studentData.gender}
							</div>
							<div className="field">
								<i className="field-icon fas fa-globe-asia"></i>
								{this.state.studentData.nationality}
							</div>
						</div> 						
					</div>
					<div className="padding-right0 col-lg-4 col-md-4 col-sm-4 col-xs-12"> 
						<div className="contactInfo col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<h3 className="blockHeading">Contact Information</h3>
							<div className="field">
								<i className="field-icon far fa-envelope"></i>
								{this.state.studentData.email}
							</div>
							<div className="field">
								<i className="field-icon fas fa-mobile-alt"></i>
								{this.state.studentData.mobile}
							</div>
							<div className="field">
								<i className="field-icon fas fa-map-marker-alt"></i>
								{
									this.state.studentData.address + ", " +
									this.state.studentData.city + ", " +
									this.state.studentData.stateName + ", " +
									this.state.studentData.country + "."
								}
							</div>
						</div>
					</div>
				</div>
				<div className="blockrow padding-left0 padding-right0 col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="academicInfo col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<h3 className="academicHeading">Academics</h3>
						<div className="field">
							<table className="table table-bordered table-striped table-hovered">
								<thead>
									<tr>
										<th>Education</th>
										<th>School/College Name</th>
										<th>Marks</th>
										<th>Year of Passing</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>10th</td>										
										<td>{this.state.studentData.school10th}</td>										
										<td>{this.state.studentData.marks10th}</td>										
										<td>{this.state.studentData.year10th}</td>										
									</tr>
									<tr>
										<td>12th</td>
										<td>{this.state.studentData.school12th}</td>										
										<td>{this.state.studentData.marks12th}</td>										
										<td>{this.state.studentData.year12th}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="blockrow padding-left0 padding-right0 col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="documentsInfo col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<h3 className="blockHeading">Uploaded Documents</h3>
						<div className="field">
							1. 10th Marksheet &nbsp;
							<span className="filepath">({this.state.studentData.doc10th})</span>
							<i className="doc-icon far fa-file-alt" title="click to view document"></i>
						</div>
						<div className="field">
							2. 12th Marksheet &nbsp;
							<span className="filepath">({this.state.studentData.doc12th})</span>
							<i className="doc-icon far fa-file-alt" title="click to view document"></i>
						</div>
					</div>
				</div>
			</div>
		);
	}
}