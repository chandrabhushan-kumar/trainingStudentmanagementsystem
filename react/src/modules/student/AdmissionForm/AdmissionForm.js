import React, {Component} from 'react';
import {Link} 			  from 'react-router-dom';

import './AdmissionForm.css';

import Axios from 'axios';
import Swal  from 'sweetalert2';

export default class AdmissionForm extends Component{
	constructor(props){
		super(props);
		this.state={
			user_id 		: "",
			student_id 		: "",
			course 	 		: "",
			branch		 	: "",
			admissionYear 	: "",
			fname  			: "",
			mname 	 		: "",
			lname 			: "",
			gender 			: "",
			birthdate 		: "",
			nationality 	: "",
			photo  			: "",
			email 	 		: "",
			mobile 		 	: "",
			city 	 		: "",
			stateName 		: "",
			country 	    : "",
			address 		: "",
			school10th 		: "",
			marks10th 		: "",
			year10th 		: "",
			school12th 		: "",
			marks12th 		: "",
			year12th 		: "",
			doc10th 	 	: "",
			doc12th 		: "",
			status 			: "Submitted",
			action 			: "Insert",
		}
	}
	/*===============================componentDidMount()=============================================*/
	componentDidMount(){
		this.setState({user_id : localStorage.getItem("user_id")});
		if(this.props.match.params.id){
			this.setState({student_id : this.props.match.params.id, action:"Update"});
			this.getOneStudent(this.props.match.params.id);
		}
	}
	/*==============================getCarModels()==============================================*/
	getOneStudent(student_id){
		Axios.get("http://localhost:3007/api/student/get/"+student_id)
			 .then(response =>{
			 	this.setState({
			 		course 	 		: response.data.student.course,
					branch		 	: response.data.student.branch,
					admissionYear 	: response.data.student.admissionYear,
					fname  			: response.data.student.fname,
					mname 	 		: response.data.student.mname,
					lname 			: response.data.student.lname,
					gender 			: response.data.student.gender,
					birthdate 		: response.data.student.birthdate,
					nationality 	: response.data.student.nationality,
					photo  			: response.data.student.photo,
					email 	 		: response.data.student.email,
					mobile 		 	: response.data.student.mobile,
					city 	 		: response.data.student.city,
					stateName 		: response.data.student.stateName,
					country 	    : response.data.student.country,
					address 		: response.data.student.address,
					school10th 		: response.data.student.school10th,
					marks10th 		: response.data.student.marks10th,
					year10th 		: response.data.student.year10th,
					school12th 		: response.data.student.school12th,
					marks12th 		: response.data.student.marks12th,
					year12th 		: response.data.student.year12th,
					doc10th 	 	: response.data.student.doc10th,
					doc12th 		: response.data.student.doc12th,
			 	});
			 })
			 .catch(error =>{
			 	console.log("Some Error Occured While Getting One Student Data");
			 });
	}
	/*==============================handleChange()==============================================*/
	handleChange(event){
		var name = event.currentTarget.name;
		this.setState({[name] : event.currentTarget.value});
	}
	/*==============================uploadDoc10th()==============================================*/
	uploadphoto(event){
		var file 	   = event.currentTarget.files[0];
		var formValues = new FormData();
		formValues.append("photo",file);

		Axios.post("http://localhost:3007/api/student/post/photo", formValues)
			.then(response=>{
				console.log("file upload response = ", response.data);
				this.setState({photo : response.data.filepath});
				console.log("photo = ",this.state.photo);
			})
			.catch(error=>{
				console.log("Error while uploading file", error);
			});	
	}
	/*==============================uploadDoc10th()==============================================*/
	uploadDoc10th(event){
		var file 	   = event.currentTarget.files[0];
		var formValues = new FormData();
		formValues.append("doc10th",file);

		Axios.post("http://localhost:3007/api/student/post/doc10th", formValues)
			.then(response=>{
				console.log("file upload response = ", response.data);
				this.setState({doc10th : response.data.filepath});
				console.log("doc10th = ",this.state.doc10th);
			})
			.catch(error=>{
				console.log("Error while uploading file", error);
			});	
	}
	/*==============================uploadDoc12th()==============================================*/
	uploadDoc12th(event){
		var file 	   = event.currentTarget.files[0];
		var formValues = new FormData();
		formValues.append("doc12th",file);

		Axios.post("http://localhost:3007/api/student/post/doc12th", formValues)
			.then(response=>{
				console.log("file upload response = ", response.data);
				this.setState({doc12th : response.data.filepath});
				console.log("doc12th = ",this.state.doc12th);
			})
			.catch(error=>{
				console.log("Error while uploading file", error);
			});	
	}
	/*==============================deletePhoto()==============================================*/
	deletePhoto(event){		
		var formValues = {
			filepath : event.currentTarget.id
		}
		Axios.post("http://localhost:3007/api/student/delete/photo",formValues)
			 .then(response =>{
				console.log("response = ",response.data.message);
				this.setState({
					photo : ""
				})
				// console.log("insuranceDoc = ",this.state.insuranceDoc);
			 })
			 .catch(error=>{
				console.log("Error while deleting image", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			 });	
	}
	/*==============================deleteImage10th()==============================================*/
	deleteImage10th(event){		
		var formValues = {
			filepath : event.currentTarget.id
		}
		Axios.post("http://localhost:3007/api/student/delete/image10th",formValues)
			 .then(response =>{
				console.log("response = ",response.data.message);
				this.setState({
					doc10th : ""
				})
				// console.log("insuranceDoc = ",this.state.insuranceDoc);
			 })
			 .catch(error=>{
				console.log("Error while deleting image", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			 });	
	}
	/*==============================deleteImage12th()==============================================*/
	deleteImage12th(event){		
		var formValues = {
			filepath : event.currentTarget.id
		}
		Axios.post("http://localhost:3007/api/student/delete/image12th",formValues)
			 .then(response =>{
				console.log("response = ",response.data.message);
				this.setState({
					doc12th : ""
				})
				// console.log("insuranceDoc = ",this.state.insuranceDoc);
			 })
			 .catch(error=>{
				console.log("Error while deleting image", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			 });	
	}	
	/*==============================handleSubmit()==============================================*/
	handleSubmit(event){
		event.preventDefault();

		var formValues ={	
			student_id 		: this.props.match.params.id ? this.props.match.params.id : "",					
			user_id 		: this.state.user_id,
			course 	 		: this.state.course,
			branch		 	: this.state.branch,
			admissionYear 	: this.state.admissionYear,
			fname  			: this.state.fname,
			mname 	 		: this.state.mname,
			lname 			: this.state.lname,
			gender 			: this.state.gender,
			birthdate 		: this.state.birthdate,
			nationality 	: this.state.nationality,
			photo  			: this.state.photo,
			email 	 		: this.state.email,
			mobile 		 	: this.state.mobile,
			city 	 		: this.state.city,
			stateName 		: this.state.stateName,
			country 	    : this.state.country,
			address 		: this.state.address,
			school10th 		: this.state.school10th,
			marks10th 		: this.state.marks10th,
			year10th 		: this.state.year10th,
			school12th 		: this.state.school12th,
			marks12th 		: this.state.marks12th,
			year12th 		: this.state.year12th,
			doc10th 	 	: this.state.doc10th,
			doc12th 		: this.state.doc12th,
			status 			: this.state.status,
			action 			: this.state.action,
		}
		// console.log("FormValues = ",formValues);

		Axios.post("http://localhost:3007/api/student/post",formValues)
			 .then(response =>{
			 	if (this.state.action === "Insert") {
			 		console.log("response from student insert = ",response.data);
			 		Swal.fire('Done!','Student Inserted Successfully...','success');
			 		this.props.history.push("/student_profile/"+response.data.response._id);
			 	}else{
			 		console.log("response from student update = ",response.data);
			 		Swal.fire('Done!','Student Updated Successfully...','success');			 		
			 		this.props.history.push("/student_profile/"+response.data.student_id);
			 	}
			 	
			 })
			 .catch(error =>{
			 	if(this.state.action === "Insert"){
			 		console.log("Error While Inserting Student");
			 		Swal.fire('Oops!','User Already Applied For Admission ...','error');
			 	}else{
			 		console.log("Error While Updating Student");
			 		Swal.fire('Oops!','Somthing Went Wrong...','error');
			 	}
			 });
		
	}	
	/*==============================render()==============================================*/
	render(){
		return(
			<div className="pageWrapper">
				<div className="row breadcrums">
					<div className="pageName">
						<h3>Admission Form</h3>
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
							<Link to="/">Admission Form</Link>
						</p>
					</div>
					<div className="three-dots pull-right">
						<i className="fa fa-ellipsis-v"></i>
					</div>
				</div>
				<div className="main-container col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="pageHeading">
						<h2>Admission Form</h2>
					</div>
					<form className="studentForm">
						<div className="row">
							<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="section-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<h5>Application For</h5>
								</div>
							</div>
							<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<div className="form-group">
										<label htmlFor="course">Course <span className="asteric">*</span></label>
										<div className="input-group">
											<span className="input-group-addon"><i className="fa fa-file-alt"></i></span>
											<select name="course" className="form-control"
												onChange = {this.handleChange.bind(this)} 	
												value    = {this.state.course}
											>
												<option>-- Select --</option>
												<option>BE/BTech</option>
												<option>MBA</option>
												<option>BArch</option>
												<option>MCA</option>											
											</select>
										</div>
									</div>
								</div>
								<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<div className="form-group">
										<label htmlFor="branch">Branch <span className="asteric">*</span></label>
										<div className="input-group">
											<span className="input-group-addon"><i className="fa fa-file-alt"></i></span>
											<select name="branch" className="form-control"	
												onChange = {this.handleChange.bind(this)} 	
												value    = {this.state.branch}
											>
											<option>-- Select --</option>
											<option>Computer Science & Engineering(CSE)</option>
											<option>Information Technology(IT)</option>
											<option>Civil Engineering(CE)</option>
											<option>Chemical Engineering(CH)</option>
											<option>Electrical & Electronics Engineering(EN)</option>
											<option>Master of Computer Applications(MCA)</option>
											<option>MBA In Business Economics</option>
											<option>MBA In Finance & Control</option>
											<option>MBA In Tourism Management</option>
											<option>MBA In E-Commerce</option>
											<option>MBA In Marketing</option>
											<option>Architecture</option>
											<option>Construction Technology (Architecture)</option>
											<option>Interior Design (Architecture)</option>
											<option>Planning (Architecture)</option>											
											</select>
										</div>
									</div>
								</div>
								<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<div className="form-group">
										<label htmlFor="admissionYear">Year of Admission<span className="asteric">*</span></label>
										<div className="input-group">
											<span className="input-group-addon"><i className="fa fa-calendar-alt"></i></span>
											<select name="admissionYear" className="form-control"	
												onChange = {this.handleChange.bind(this)} 	
												value    = {this.state.admissionYear}
											>
											<option>-- Select --</option>											
											<option>2020</option>											
											<option>2019</option>											
											<option>2018</option>											
											<option>2017</option>											
											<option>2016</option>											
											<option>2015</option>											
											<option>2014</option>											
											<option>2013</option>											
											<option>2012</option>											
											<option>2011</option>											
											</select>
										</div>
									</div>
								</div>													
							</div>
							<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="section-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<h5>Personal Details</h5>
								</div>
							</div>
							<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<div className="form-group">
										<label htmlFor="fname">First Name <span className="asteric">*</span></label>
										<div className="input-group">
											<span className="input-group-addon"><i className="fas fa-user"></i></span>
											<input type="text" name="fname" className="form-control" 	
												onChange = {this.handleChange.bind(this)} 	
												value    = {this.state.fname}
											/>
										</div>
									</div>
								</div>
								<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<div className="form-group">
										<label htmlFor="mname">Middle Name <span className="asteric">*</span></label>
										<div className="input-group">
											<span className="input-group-addon"><i className="fas fa-user"></i></span>
											<input type="text" name="mname" className="form-control" 	
												onChange = {this.handleChange.bind(this)} 	
												value    = {this.state.mname}
											/>
										</div>
									</div>
								</div>
								<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<div className="form-group">
										<label htmlFor="lname">Last Name <span className="asteric">*</span></label>
										<div className="input-group">
											<span className="input-group-addon"><i className="fas fa-user"></i></span>
											<input type="text" name="lname" className="form-control" 	
												onChange = {this.handleChange.bind(this)} 	
												value    = {this.state.lname}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
									<div className="padding-left0 padding-right0 col-lg-12 col-md-12 col-sm-12 col-xs-12">	
										<div className="padding-left0 col-lg-6 col-md-6 col-sm-6 col-xs-12">
											<div className="form-group genderlabel">
												<label htmlFor="gender">Gender<span className="asteric">*</span></label>
											</div>
											<div className="padding-left0 col-lg-6 col-md-6 col-sm-6 col-xs-12">
												<div className="input-group">															
													<input type="radio" name="gender" value="Male"
														onChange = {this.handleChange.bind(this)}
														checked ={this.state.gender === "Male"}
													/> 
													 <div className="box-label">Male</div>
												</div>
											</div>
											<div className="padding-right0 col-lg-6 col-md-6 col-sm-6 col-xs-12">
												<div className="input-group">
													<input type="radio" name="gender" value="Female"
														onChange = {this.handleChange.bind(this)}
														checked ={this.state.gender === "Female"}
													/> 
													<div className="box-label">Female</div>
												</div>
											</div>								
										</div>
										<div className="padding-right0 col-lg-6 col-md-6 col-sm-6 col-xs-12">
											<div className="form-group">
												<label htmlFor="birthdate">date of Birth<span className="asteric">*</span></label>
												<div className="input-group">
													<span className="input-group-addon"><i className="fa fa-calendar-alt"></i></span>
													<input type="date" name="birthdate" className="form-control"	
														onChange = {this.handleChange.bind(this)} 	
														value    = {this.state.birthdate}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="padding-right0 padding-left0 nationality col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="form-group genderlabel">
											<label htmlFor="nationality">Nationality<span className="asteric">*</span></label>
										</div>
										<div className="padding-left0 col-lg-4 col-md-4 col-sm-4 col-xs-12">
											<div className="input-group">															
												<input type="radio" name="nationality" value="Indian"
													onChange = {this.handleChange.bind(this)}
													checked ={this.state.nationality === "Indian"}
												/> 
												 <div className="box-label">Indian</div>
											</div>
										</div>
										<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
											<div className="input-group">
												<input type="radio" name="nationality" value="NRI"
													onChange = {this.handleChange.bind(this)}
													checked ={this.state.nationality === "NRI"}
												/> 
												<div className="box-label">NRI</div>
											</div>
										</div>
										<div className="padding-right0 col-lg-4 col-md-4 col-sm-4 col-xs-12">
											<div className="input-group">
												<input type="radio" name="nationality" value="Other"
													onChange = {this.handleChange.bind(this)}
													checked ={this.state.nationality === "Other"}
												/> 
												<div className="box-label">Other</div>
											</div>
										</div>								
									</div>
								</div>
								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<div className="formRow">										
										<div className="imageBlock center-block">
											{
												this.state.photo
											?																	
												<div><img src={"http://localhost:3007/"+this.state.photo} alt={this.state.photo} />
												<i className="fa fa-times-circle" id={this.state.photo} 
													onClick={this.deletePhoto.bind(this)}
												></i></div>										
											:
												null
											}
										</div>																	
									</div>										
									<div className="form-group">
										<div className="input-group">
											<input type="file" name="photo" className="file-select"
												onChange={this.uploadphoto.bind(this)}
											/>
										</div>
									</div>	
								</div>													
							</div>
							<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="section-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<h5>Contact Details</h5>
								</div>
							</div>
							<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<div className="form-group">
										<label htmlFor="email">Email <span className="asteric">*</span></label>
										<div className="input-group">
											<span className="input-group-addon"><i className="fa fa-envelope"></i></span>
											<input type="email" name="email" className="form-control"	
												onChange = {this.handleChange.bind(this)} 	
												value    = {this.state.email}
											/>
										</div>
									</div>
								</div>
								<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<div className="form-group">
										<label htmlFor="mobile">Mobile Number <span className="asteric">*</span></label>
										<div className="input-group">
											<span className="input-group-addon"><i className="fa fa-mobile-alt"></i></span>
											<input type="text" name="mobile" className="form-control" 	
												onChange = {this.handleChange.bind(this)} 	
												value    = {this.state.mobile}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<div className="form-group">
										<label htmlFor="city">City <span className="asteric">*</span></label>
										<div className="input-group">
											<span className="input-group-addon"><i className="fa fa-city"></i></span>
											<input type="text" name="city" className="form-control"	
												onChange = {this.handleChange.bind(this)} 	
												value    = {this.state.city}
											/>
										</div>
									</div>
								</div>
								<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<div className="form-group">
										<label htmlFor="stateName">State <span className="asteric">*</span></label>
										<div className="input-group">
											<span className="input-group-addon"><i className="fa fa-city"></i></span>
											<input type="text" name="stateName" className="form-control"	
												onChange = {this.handleChange.bind(this)} 	
												value    = {this.state.stateName}
											/>
										</div>
									</div>
								</div>
								<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<div className="form-group">
										<label htmlFor="country">Country <span className="asteric">*</span></label>
										<div className="input-group">
											<span className="input-group-addon"><i className="fa fa-globe-asia"></i></span>
											<input type="text" name="country" className="form-control"	
												onChange = {this.handleChange.bind(this)} 	
												value    = {this.state.country}
											/>
										</div>
									</div>
								</div>																					
							</div>
							<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className=" col-lg-8 col-md-8 col-sm-8 col-xs-12">
									<div className="form-group">
										<label htmlFor="address">Address <span className="asteric">*</span></label>
										<div className="input-group">
											<span className="input-group-addon"><i className="fa fa-map-marker-alt"></i></span>
											<textarea name="address" rows="4" className="form-control"	
												onChange = {this.handleChange.bind(this)} 	
												value    = {this.state.address}
											/>
										</div>
									</div>
								</div>													
							</div>
							<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="section-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<h5>Educational Details</h5>
								</div>
							</div>
							<div className="formRow tblRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<table className="table table-bordered">
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
											<td>
												<input type="text" name="school10th" className="mark form-control"	
													onChange = {this.handleChange.bind(this)} 	
													value    = {this.state.school10th}
												/>
											</td>
											<td>
												<input type="text" name="marks10th" className="mark form-control"	
													onChange = {this.handleChange.bind(this)} 	
													value    = {this.state.marks10th}
												/>
											</td>
											<td>
												<input type="text" name="year10th" className="mark form-control"	
													onChange = {this.handleChange.bind(this)} 	
													value    = {this.state.year10th}
												/>
											</td>
										</tr>
										<tr>
											<td>12th</td>
											<td>
												<input type="text" name="school12th" className="mark form-control"	
													onChange = {this.handleChange.bind(this)} 	
													value    = {this.state.school12th}
												/>
											</td>
											<td>
												<input type="text" name="marks12th" className="mark form-control"	
													onChange = {this.handleChange.bind(this)} 	
													value    = {this.state.marks12th}
												/>
											</td>
											<td>
												<input type="text" name="year12th" className="mark form-control"	
													onChange = {this.handleChange.bind(this)} 	
													value    = {this.state.year12th}
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="section-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<h5>Documents Required</h5>
								</div>
							</div>
							<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">								
								<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<div className="form-group">
										<label htmlFor="doc10th">1. 10th Marksheet Photo<span className="asteric">*</span></label>
										<input type="file" name="doc10th" className="custom-file-input" 
											onChange={this.uploadDoc10th.bind(this)}
										/>	
									</div>
								</div>
								<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
									{
										this.state.doc10th
									?																	
										<div className="showInsuranceDoc col-lg-4 col-md-4 col-sm-4 col-xs-12">
											<img src={"http://localhost:3007/"+this.state.doc10th} alt={this.state.doc10th+this.state.doc10th} />
											<i className="fa fa-times-circle" id={this.state.doc10th} 
												onClick={this.deleteImage10th.bind(this)}
											></i>	
										</div>											
									:
										null
									}									
								</div>													
							</div>
							<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">								
								<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
									<div className="form-group">
										<label htmlFor="doc12th">2. 12th Marksheet Photo<span className="asteric">*</span></label>
										<input type="file" name="doc12th" className="custom-file-input" 
											onChange={this.uploadDoc12th.bind(this)}
										/>	
									</div>
								</div>
								<div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
									{
										this.state.doc12th
									?																	
										<div className="showInsuranceDoc col-lg-4 col-md-4 col-sm-4 col-xs-12">
											<img src={"http://localhost:3007/"+this.state.doc12th} alt={this.state.doc12th} />
											<i className="fa fa-times-circle" id={this.state.doc12th} 
												onClick={this.deleteImage12th.bind(this)}
											></i>	
										</div>											
									:
										null
									}									
								</div>													
							</div>
							<div className="btnRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className=" col-lg-4 col-lg-offset-8 col-md-4 col-md-offset-8 col-sm-4 col-sm-offset-8 col-xs-12">
									<button type="submit" className="btn btn-lg submit-btn center-block"
										onClick = {this.handleSubmit.bind(this)}
									>Submit</button>
								</div>
							</div>
						</div>
					</form>	
				</div>
			</div>
		);
	}
}