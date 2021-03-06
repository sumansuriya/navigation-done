import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployeeRequestsCheckAction } from "../redux/EmployeeRequestStatusCheckReducer";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/EmployeeReducer";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";

export const EmployeeTimeExtensionStatusCheck = () => {
  const formEl = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
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
  const state = useSelector((state) => state);

  const [taskId, setTaskId] = useState();

  const updateTaskId = (e) => setTaskId(e.target.value);

  const CheckList = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    console.log(isFormValid);

    if (isFormValid) {
      console.log("hello");
      // dispatch the call to redux ::for API CALL
      console.log(taskId);
      dispatch(getAllEmployeeRequestsCheckAction( taskId ));
      history.push("/employee-status-checklist");

      // clear the form
     // setTaskId("");
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
              <Nav.Link onClick={clearEmployeeRequestURef}>
                Employee Request Add
              </Nav.Link>
              <Nav.Link as={Link} to="/employee-status-checklist">
                Employee Status Check List
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
      <div
        className="bg-transparent d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="w-50">
          <h4 className="text-center text-light alert alert-transaparent">
            Employee Request Status Check
          </h4>

          <form ref={formEl} className="needs-validation" noValidate>
            <div className="row mb-1 justify-content-center">
              <input
                type="number"
                value={taskId}
                onChange={updateTaskId}
                placeholder="Enter TaskId"
                className="form-control form-control-lg mb-1 w-50"
                required
              />
            </div>

            <div>
              <Link to="/employee-status-checklist">
                <div className="row mb-1 justify-content-center">
                  <input
                    type="button"
                    value="check "
                  // onChange={CheckList}
                   onClick={CheckList}
                    
                    
                    className="btn btn-success btn-lg w-50"
                  />
                </div>
              </Link>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};