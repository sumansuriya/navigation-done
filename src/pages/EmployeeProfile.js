import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployeeDetailsAction,
  updateEmployeeDetailsAction,
       } from "../redux/EmployeeProfileReducer";
import { Link, useHistory } from "react-router-dom";
import { AppNav } from "./AppNav";
import { Select } from "react-select";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../logo15.png";
import { updateRenderAction } from "../redux/EmployeeReducer";
import { signOutAction } from "../redux/UserReducer";
import back from "../image12.jpg";
import profilepic from "../logo15.png";


export const EmployeeProfile = () => {
  const signOut = () => {
    // Logical Operation.
    // cookies / sessino are getting removed from the browser
    dispatch(signOutAction());

    // redirect the user to login page.
    history.push("/employee-signin");
  };

  const clearEmployeeLeaveRequestURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-leave-request-add");
  };

  const clearEmployeeRequestURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-request-add");
  };

const dispatch = useDispatch();
const history = useHistory();
const state = useSelector((state) => state);

console.log(state);

const formEl = useRef();

useEffect(() => {
  dispatch(getEmployeeDetailsAction());
}, []);

const empid = state.employeeProfile.empProfile.empid;
const firstname = state.employeeProfile.empProfile.firstname;
const lastname = state.employeeProfile.empProfile.lastname;
const empmail = state.employeeProfile.empProfile.empmail;
const username = state.employeeProfile.empProfile.username;
const password = state.employeeProfile.empProfile.password;
const empHireDate = state.employeeProfile.empProfile.empHireDate;
const empDeptName = state.employeeProfile.empProfile.empDeptName;
const designation = state.employeeProfile.empProfile.designation;
const location = state.employeeProfile.empProfile.location;
const contactNo = state.employeeProfile.empProfile.contactNo;

  console.log(state.employeeProfile.empProfile);

  return (
    <div
    style={{ height: "130vh",
    backgroundImage: `url(${back})`, 
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat"}}
    >
      <div>
      <Navbar style={{"background-color":"black"}} bg="" variant="dark" expand="">
          <img align="left" src={logo} height="5%" width="5%" />
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link onClick={clearEmployeeRequestURef}>
                Employee Request Add
              </Nav.Link>
              <Nav.Link as={Link} to="/employee-status-checklist">
                Employee Status Check List
              </Nav.Link>
              <Nav.Link as={Link} to="/employee-status-checkform">
                Employee Status Check Form
              </Nav.Link>
              <Nav.Link onClick={clearEmployeeLeaveRequestURef}>
                Employee Leave Request Add
              </Nav.Link>
              <Nav.Link as={Link} to="/employee-leave-checkform">
                Employee Leave Check Form
              </Nav.Link>
              <Nav.Link as={Link} to="/employee-leave-checklist">
                Employee Leave Status List
              </Nav.Link>
              <Nav.Link as={Link} to="/employee-task-checkform">
                Employee Task Assign Form
              </Nav.Link>
              <Nav.Link as={Link} to="/employee-task-checklist">
                Employee Task Assign List
              </Nav.Link>

             

              <Nav.Link as={Link} to="/employee-about-us">
              About Us
            </Nav.Link>

              <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

    <form>
 
</form>


      <div className="d-flex flex-row-reverse alert alert-info">  
         <span className="col-5 p-1">  
             <Link to="/employee-profile-update">
                 <h5 className="text-right"> Edit Profile </h5> 
             </Link>
         </span> 
           
         <center> 
              <h2> Employee Profile </h2> 
        </center> 
      </div>  
      

      <div class="container">
<div class="row gutters">
<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="account-settings">
			<div class="user-profile">
				<div class="user-avatar mb-1">
         
					<img src={profilepic}
          width="210" height="200" alt="Maxwell Admin"/>
				</div>
        <center>
				<h4 class="user-name mb-1">Hello!</h4>
				<h4 class="user-email mb-3" >Welcome to TMS</h4></center>
			</div>
      
			<div class="about">
      <h5 class="ml-2 mb-1">About</h5>
				<p className="p-1"> Task Management System is an Organized system for identifying, monitoring, and managing your work. From managing simple to-do lists to helping teams to work and collaborate better and helps you with estimation and scheduling of your work and helps you make decisions when changes in priority are needed.</p>
        <br></br>
        <p></p>
			</div>
		</div>
	</div>
</div>
</div>
<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h5 class="mb-2 text-primary">Employee Details</h5>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="firstName">First Name</label>
					<input type="text" class="form-control" id="firstName" value={firstname} readOnly placeholder="Enter first name"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="lastName">Last Name</label>
					<input type="text" class="form-control" id="lastName" value={lastname} readOnly placeholder="Enter Last name"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group ">
					<label for="EmpID">Employee ID</label>
					<input type="text" class="form-control" id="EmpID" value={empid} readOnly placeholder="Enter phone number"/>
          <div class="form-group"><br></br>
					<label for="Employeemail mb-1">Employee mail</label>
					<input type="text" class="form-control" id="Employeemail" value={empmail} readOnly placeholder="Enter Employee Id"/>
				</div>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group ">
					<label for="location mb-1">Work Location</label>
					<input type="text" class="form-control" id="location" value={location} readOnly placeholder="Enter Location"/>
        <div class="form-group"><br></br>
					<label for="contactno mb-1" >Contact number</label>
					<input type="text" class="form-control" id="contactno" value={contactNo} readOnly placeholder="Enter Email"/>
				</div>
        </div>
        
			</div>
		</div>
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h5 class="mt-4 mb-2 text-primary">Professional Details</h5>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group ">
					<label for="designation ">Designation</label>
					<input type="text" class="form-control" id="designation" value={designation} readOnly placeholder="Enter Username"/>
          <div class="form-group "><br></br>
					<label for="Username mb-1">Username</label>
					<input type="text" class="form-control" id="Username" value={username} readOnly placeholder="Enter Department"></input>
				</div>
				</div>
			</div>
		
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="Department mb-1">Department</label>
					<input type="text" class="form-control" id="Department" value={empDeptName} readOnly placeholder="Enter Designation"/>
          <div class="form-group "><br></br>
					<label for="Hiredate mb-1">Hire date</label>
					<input type="text" class="form-control" id="Hiredate" value={empHireDate} readOnly placeholder="Enter HireDate"></input>
          
				</div>
        
				</div>
			</div>
			
		</div>
	</div>
</div>
</div>
</div>
</div>

        
      </div>
      
    
  );
};
