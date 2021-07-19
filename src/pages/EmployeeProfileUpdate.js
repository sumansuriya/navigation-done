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
  import backcolor from "../image18.jfif";

  export const EmployeeProfileUpdate = () => {
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
  
  const [firstname, setFirstname] = useState(state.employeeProfile.empProfile.firstname);
  const [lastname, setLastname] = useState(state.employeeProfile.empProfile.lastname);
  const [empmail, setEmpmail] = useState(state.employeeProfile.empProfile.empmail);
  const [username, setUsername] = useState(state.employeeProfile.empProfile.username);
  const [password, setPassword] = useState(state.employeeProfile.empProfile.password);
  const [empHireDate, setEmpHireDate] = useState(state.employeeProfile.empProfile.empHireDate);
  const [empDeptName, setEmpDeptName] = useState(state.employeeProfile.empProfile.empDeptName);
  const [designation, setDesignation] = useState(state.employeeProfile.empProfile.designation);
  const [location, setLocation] = useState(state.employeeProfile.empProfile.location);
  const [contactNo, setContactNo] = useState(state.employeeProfile.empProfile.contactNo);
  
  const updateFirstname = (e) => setFirstname(e.target.value);
  const updateLastname = (e) => setLastname(e.target.value);
  const updateempmail = (e) => setEmpmail(e.target.value);
  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updatempHireDate = (e) => setEmpHireDate(e.target.value);
  const updatempDeptName = (e) => setEmpDeptName(e.target.value);
  const updateDesignation = (e) => setDesignation(e.target.value);
  const updatelocation = (e) => setLocation(e.target.value);
  const updateContactNo = (e) => {
    console.log(e.target.value);
    const numericValue = e.target.value.replace(/[^\d]/gi, "");
    setContactNo(numericValue);
  };

  const updateEmployeeProfile = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        updateEmployeeDetailsAction({
          empid: state.employeeProfile.empProfile.empid,
          firstname,
          lastname,
          empmail,
          username,
          password,
          empHireDate,
          empDeptName,
          designation,
          location,
          contactNo,
        })
      );
      
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

return (
   
    <div
    style={{ height: "110vh",
    backgroundImage: `url(${backcolor})`, 
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat"}}>
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

              <Nav.Link as={Link} to="/employee-profile">
                Employee Profile
              </Nav.Link>

              <Nav.Link as={Link} to="/employee-about-us">
              About Us
            </Nav.Link>

              <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="d-flex alert alert-secondary">  
         <span className="col-5 p-1">  
             <a href="/employee-profile">
                 <h5> Back </h5> 
            </a>
         </span> 
           
         <center> 
              <h2>Update Profile</h2> 
        </center> 
      </div>  

        <div>
           {state.employeeProfile.progress && (
        <div className="row mb-1  justify-content-center">
          <div className="mx-4 alert alert-success w-50">
            Profile updated Successfully
          </div>
        </div> 
         )}
        </div>

    <form ref={formEl} className="mx-4 needs-validation" noValidate>
       
    <div className="row text-light col-7 justify-content-center">
       <h5>First name</h5>
       </div>
        <div className="row mb-1 justify-content-center">         
        <input
          type="text"
          className="form-control w-50"
          value={firstname}
          placeholder="Enter firstname"
          onChange={updateFirstname}
          required
          />
        </div>

        <div className="row text-light col-7 justify-content-center">
       <h5>Last name</h5>
       </div>
        <div className="row mb-1 justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          value={lastname}
          placeholder="Enter lastname"
          onChange={updateLastname}
          required
        />
        </div>

        <div className="row text-light col-7 justify-content-center">
       <h5>Emp. mail</h5>
       </div>
        <div className="row mb-1 justify-content-center">
          <input
            type="email"
            className="form-control w-50"
            value={empmail}
            placeholder="Enter mail"
            onChange={updateempmail}
            required
            readOnly
          />
        </div>

        <div className="row text-light col-7 justify-content-center">
       <h5>Username</h5>
       </div>
        <div className="row mb-1 justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          value={username}
          placeholder="Enter username"
          onChange={updateUsername}
          required
        />
        </div>

        <div className="row text-light col-7 justify-content-center">
       <h5>Password</h5>
       </div>
        <div className="row mb-1 justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          value={password}
          placeholder="Enter password"
          onChange={updatePassword}
          required
        />
        </div>

        <div className="row text-light col-7 justify-content-center">
       <h5>Location</h5>
       </div>
        <div className="row mb-1 justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            value={location}
            placeholder="Enter work location"
            onChange={updatelocation}
            required
            readOnly
          />
        </div>

        <div className="row text-light col-7 justify-content-center">
       <h5>Contact No</h5>
       </div>
        <div className="row mb-1 justify-content-center">
        <input
          type="text"
          className="form-control mb-2 w-50"
          value={contactNo}
          placeholder="Enter Contact number"
          onChange={updateContactNo}
          minLength="10"
          maxLength="10"
          required
        />
      </div>

      <div className="row mb-1 justify-content-center">
             <input
                type="button"
                onClick={updateEmployeeProfile}
                value="Save Changes"
                className="btn btn-lg mb-2 btn-success w-50"
              />    
       </div>
     </form>
  </div>
 )
}