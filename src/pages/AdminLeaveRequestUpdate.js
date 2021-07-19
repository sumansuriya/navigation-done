import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createEmployeeLeaveRequestAction,
    updateEmployeeLeaveRequestAction,
  } from "../redux/EmployeeLeaveRequestReducer";
import { AppNav } from "./AppNav";
import { Select } from "react-select";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/EmployeeLeaveRequestReducer";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";
export const AdminLeaveRequestUpdate = () => {
const signOut = () => {
    // Logical Operation.
    // cookies / sessino are getting removed from the browser
    dispatch(signOutAction());

    // redirect the user to login page.
    history.push("/");
  };
  const clearEmployeeURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-add");
  };

  const clearEmployeeTaskURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-task-add");
  };
 
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  console.log(state);

  const formEl = useRef();

  const [reason, setReason] = useState(
    state.employeeLeaveRequest.uref.reason
  );
  const [leaveduration, setLeaveDuration] = useState(state.employeeLeaveRequest.uref.leaveduration);
  const [leavetype, setLeaveType] = useState(state.employeeLeaveRequest.uref.leavetype);

  const [tasks, setTasks] = useState(state.employeeLeaveRequest.uref.tasks);

  const [approvedleaves, setApprovedLeaves] = useState(state.employeeLeaveRequest.uref.approvedleaves);
  const updateReason = (e) => setReason(e.target.value);

  const updateLeaveDuration = (e) => setLeaveDuration(e.target.value);
  
  const updateLeaveType = (e) => setLeaveType(e.target.value);

  const updateTasks = (e) => setTasks(e.target.value);
  const updateApprovedLeaves = (e) => setApprovedLeaves(e.target.value);

 
  const updateEmployeeLeaveRequest = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      console.log(state.employeeLeaveRequest.uref.leaveid);
      dispatch(
        updateEmployeeLeaveRequestAction({
          leaveid:state.employeeLeaveRequest.uref.leaveid,
           
            approvedleaves:approvedleaves
        })
      );

      // clear the form

      setReason("");
      setLeaveDuration("");
      setLeaveType("");
      setTasks("");
      setApprovedLeaves("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };
 
  return (
    <div>
      <div>
        <Navbar style={{"background-color":"black"}} bg="" variant="dark" expand="">
            <img align="left" src={logo} height="5%" width="5%" />

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/admin-list">
                  Admin List
                </Nav.Link>

                <Nav.Link as={Link} to="/employee-list">
                  Employee List
                </Nav.Link>
                <Nav.Link onClick={clearEmployeeURef}>Employee Add</Nav.Link>

                <Nav.Link as={Link} to="/employee-task-list">
                  Employee Task List
                </Nav.Link>
                <Nav.Link onClick={clearEmployeeTaskURef}>
                  Employee Task Add
                </Nav.Link>
                <Nav.Link as={Link} to="/employee-request-list">
                  Employee Time Extension Request List
                </Nav.Link>
                <Nav.Link as={Link} to="/employee-leave-request-list">
                  Employee Leave Request List
                </Nav.Link>
                <Nav.Link as={Link} to="/employee-bench-list">
                  Employee Bench List
                </Nav.Link>
                <Nav.Link as={Link} to="/employee-report-list">
                  Employee Report List
                </Nav.Link>

                <Nav.Link as={Link} to="/about-us">
                About Us
              </Nav.Link>

                <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      <div className="alert alert-secondary">
       
          <center>
            {" "}
            <h2>Employee Leave Request Update</h2>
          </center>
       
      
      </div>

      {state.employeeLeaveRequest.progress && (
        <div className="row mb-1 justify-content-center">
          <div className="mx-4 alert alert-success w-50">
            Leave Request updated Successfully
          </div>
        </div>
      )}

      <form ref={formEl} className="mx-4 needs-validation" noValidate>
      <div className="row mb-1 justify-content-center">
          <input
            type="text"
            value={reason}
            onChange={updateReason}
            className="form-control form-control-lg w-50"
            placeholder="Enter Reason"
            required
          />
        </div>
        <h5 className="text-light text-center col-8"> </h5>
        <div className="row mb-1 justify-content-center">
          <input
            type="number"
            value={leaveduration}
            onChange={updateLeaveDuration}
            className="form-control form-control-lg w-50"
            placeholder="Enter Leave Duration"
            required
          />
        </div>
        <h5 className="text-light text-center col-7"></h5>
        <div className="row mb-1 justify-content-center">
    
            <input
              type="text"
              value={leavetype}
              onChange={updateLeaveType}
              className="form-control form-control-lg w-50"
              placeholder="Enter Leave Type"
              required
            />
         
        </div>

        <div className="row mb-1 justify-content-center">
       
          <input
           type="text"
           value={tasks}
           onChange={updateTasks}
           className="form-control form-control-lg mb-1 w-50"
           placeholder="Enter Task Id"
           required
         />
         
         
        </div>

        <div className="row mb-1 justify-content-center">
         
            <input
              type="number"
              value={approvedleaves}
              onChange={updateApprovedLeaves}
              className="form-control form-control-lg mb-1 w-50"
              placeholder="Enter ApprovedLeaves"
             required
            />
            
          
        </div>
        <div className="row mb-1 justify-content-center">
          
          <input
            type="button"
            onClick={updateEmployeeLeaveRequest}
            value="Update Employee Request"
            className="btn btn-lg btn-info w-50"
          />
          </div>
      </form>
    </div>
  );
};