import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployeeTaskAssignAction } from "../redux/EmployeeTaskAssignReducer";
import { AppNav } from "./AppNav";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/EmployeeReducer";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";
import background from "../image30.jpeg";

export const EmployeeTaskAssign = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const signOut = () => {
    // Logical Operation.
    // cookies / sessino are getting removed from the browser
    dispatch(signOutAction());

    // redirect the user to login page.
    history.push("/employee-signin");
  };
  const history = useHistory();
  const clearEmployeeRequestURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-request-add");
  };
  const clearEmployeeLeaveRequestURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-leave-request-add");
  };

  useEffect(() => {
    dispatch(getAllEmployeeTaskAssignAction());
  }, []);

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
              <Nav.Link as={Link} to="/employee-task-checkform">
                Employee Task Assign Form
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
      <div className="alert alert-secondary mb-0">
        <h3>Employee Task Assign</h3>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Employee ID</th>

            <th scope="col">Task ID</th>
            <th scope="col">Task Name</th>
            <th scope="col">Task Status</th>
            <th scope="col">Project ID</th>
            <th scope="col">Start Date</th>
            <th scope="col">Dead Line</th>
          </tr>
        </thead>
        <tbody className="text-light">
          {state.employeeTaskAssign.employeeTaskCheck.map((item, index) => (
            <tr key={index}>
              {item !== undefined && <td>{item.emp.empid}</td>}

              {item !== undefined && <td>{item.taskId}</td>}
              {item !== undefined && <td>{item.taskName}</td>}
              {item !== undefined && <td>{item.taskStatus}</td>}
              {item !== undefined && <td>{item.projectid}</td>}
              {item !== undefined && <td>{item.startDate}</td>}
              {item !== undefined && <td>{item.deadLine}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};