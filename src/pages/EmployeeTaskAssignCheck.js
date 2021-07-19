import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllEmployeeTaskAssignAction } from "../redux/EmployeeTaskAssignReducer";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { updateRenderAction } from "../redux/EmployeeReducer";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";
import background from "../image30.jpeg";


export const EmployeeTaskAssignCheck = () => {
  const formEl = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const state = useSelector((state) => state);

  const [empid, setEmpid] = useState("");

  const updateEmpid = (e) => setEmpid(e.target.value);

  const TaskCheckList = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    console.log(isFormValid);

    if (isFormValid) {
      // dispatch the call to redux ::for API CALL
      dispatch(getAllEmployeeTaskAssignAction(empid));
      history.push("/employee-task-checklist");

      // clear the form
      // setEmpid("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };
  const signOut = () => {
    // Logical Operation.
    // cookies / sessino are getting removed from the browser
    dispatch(signOutAction());

    // redirect the user to login page.
    history.push("/employee-signin");
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
    
    <div
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
      <div
        className="bg-transparent d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="w-50">
        <h2 className="text-center alert alert-info">
          Employee Task Assign Check
        </h2>

        <form ref={formEl} className="needs-validation" noValidate>
          <div>
            <input
              type="number"
              value={empid}
              onChange={updateEmpid}
              placeholder="Enter your EmpId"
              className="form-control form-control-lg mb-1"
              required
            />
          </div>

          <div>
            <Link to="/task-assign">
              <input
                type="button"
                value="check "
                onClick={TaskCheckList}
                className="btn btn-info btn-lg w-100"
              />
            </Link>
          </div>
         
        </form>
        </div>
      </div>
    </div>
  );
};