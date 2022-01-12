import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './StudentList.css';

import Axios 				 from 'axios';
import Swal  				 from 'sweetalert2';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export default class StudentList extends Component{
	constructor(props){
		super(props);
		this.state={
			user_id 		: "",
			type 			: "",
			studentData 	: [],
		}
	}
	/*===============================componentDidMount()=============================================*/
	componentDidMount(){
		if(this.props.match.params.type === "student"){
			console.log("user_id = ",this.props.match.params.id);
			this.setState({
				user_id : this.props.match.params.id,
				type 	: this.props.match.params.type
			});
			
		}	
		this.getStudentList();	
	}
	/*==============================getOneStudent()==============================================*/
	getStudentList(){
		Axios.get("http://localhost:3007/api/student/get")
			 .then(response =>{
			 	console.log("response = ",response.data);
			 	this.setState({
			 		studentData : response.data.students,
			 	});
			 	console.log("Student data : ", this.state.studentData);
			 })
			 .catch(error =>{
			 	console.log("Some Error Occured While Getting Student List");
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
					console.log("user_id = ", this.state.user_id);
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
						<h3>Student List</h3>
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
							<Link to="/">Student List</Link>
						</p>
					</div>
					<div className="three-dots pull-right">
						<i className="fa fa-ellipsis-v"></i>
					</div>
				</div>				
				<div className="main-content col-lg-12 col-md-12 col-sm-12 col-xs-12">											
					<div className="tabledata col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<h3>Application form</h3>
						<ReactHTMLTableToExcel
		                    id="test-table-xls-button"
		                    className="download-table-xls-button"
		                    table="table-to-xls"
		                    filename="tablexls"
		                    sheet="tablexls"
		                    buttonText="Download as XLS"
		                />
						<table id="table-to-xls" className="table table-bordered table-striped table-hovered">
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
								{
									this.state.studentData
								?
									this.state.studentData.map((student, index)=>{
										return(
											<tr key={index}>										
										<td>
											{
												student.fname + " " +
												student.mname + " " +
												student.lname 
											}
										</td>										
										<td className="emailwrap">{student.email}</td>										
										<td className="genderwrap">{student.gender}</td>										
										<td className="coursewrap">{student.course}</td>										
										<td className="branchwrap">{student.branch}</td>										
										<td className="actionwrap">
											<a href={"/admission/"+student._id} ><i className="fa fa-edit action-icon"></i></a>&nbsp; | &nbsp; 
											<a href={"/student_profile/"+student._id} ><i className="fa fa-eye action-icon"></i></a>&nbsp; | &nbsp;
											<p id={student._id} onClick={this.deleteStudent.bind(this)}><i className="far fa-trash-alt action-icon"></i></p>
										</td>										
									</tr>
										);
									})
									
								:
									<div className="tabledata col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<h3>Application form</h3>
										<table className="table table-bordered table-striped table-hovered">
											<thead>
												<tr>
													<td rowSpan="6" className="noData">
													<i className="fa fa-file-alt"></i>
													<h3>No Appication Data Available ...!</h3>
													</td>
												</tr>
											</thead>
										</table>
									</div>
								}
								
							</tbody>
						</table>
					</div>
				</div>				
			</div>
		);
	}
}
