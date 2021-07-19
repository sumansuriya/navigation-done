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
import { updateRenderAction } from "../redux/EmployeeReducer";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";

export const EmployeeLeaveRequestAdd = () => {
  const signOut = () => {
    // Logical Operation.
    // cookies / sessino are getting removed from the browser
    dispatch(signOutAction());

    // redirect the user to login page.
    history.push("/employee-signin");
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

  const updateReason = (e) => setReason(e.target.value);

  const updateLeaveDuration = (e) => setLeaveDuration(e.target.value);
  
  const updateLeaveType = (e) => setLeaveType(e.target.value);

  const updateTasks = (e) => setTasks(e.target.value);
  

  const addNewLeaveRequest = (e) => {
    // WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
    // console.log(formEl.current);
    // console.log(formEl.current.checkValidity());
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createEmployeeLeaveRequestAction({
            reason: reason,
          leaveduration: leaveduration,
          leavetype:leavetype,
          
          tasks: { taskId: tasks },
        })
      );

      // clear the form
      setReason("");
      setLeaveDuration("");
      setLeaveType("");
      setTasks("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };
  
 
  const clearEmployeeRequestURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-request-add");
  };
  const clearEmployeeLeaveRequestURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-leave-request-add");
  };
  return (
    <div>
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
      <div className="alert alert-secondary">
       
          <center>
            {" "}
            <h2>Employee Leave Request Create</h2>
          </center>
       
      </div>

      {state.employeeLeaveRequest.progress && (
        <div className="row mb-1 justify-content-center">
          <div className="mx-4 alert alert-success w-50">
           Leave Request added Successfully
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
        
        <div className="row mb-1 justify-content-center">
           <select
                className="custom-select custom-select-lg w-50"
                onChange={(e) => {
                  const selectedLeaveType = e.target.value;
                  setLeaveType(selectedLeaveType);
                }}
              >
                <option value="">SELECT</option>
                <option value="casual">Casual</option>
                <option value="sick">Sick</option>
              </select>
         
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
              type="button"
              onClick={addNewLeaveRequest}
              value="Add New Request"
              className="btn btn-lg btn-success w-50"
            />
          
        </div>
      </form>
    </div>
  );
};