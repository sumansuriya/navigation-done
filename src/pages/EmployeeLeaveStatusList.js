import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getAllLeaveRequestsAction,
} from "../redux/EmployeeLeaveCheckReducer"

import { AppNav } from "./AppNav";
import { Nav, Navbar } from "react-bootstrap";
import { updateRenderAction } from "../redux/EmployeeReducer";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";

export const EmployeeLeaveStatusList = () => {
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
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllLeaveRequestsAction());
  }, []);


  console.log(state.employeeleavecheck.employeeLeaveCheckListbyTaskId);

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
              <Nav.Link onClick={clearEmployeeLeaveRequestURef}>
                Employee Leave Request Add
              </Nav.Link>
              <Nav.Link as={Link} to="/employee-leave-checkform">
                Employee Leave Check Form
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
      <div className="alert alert-secondary mb-0">
        <h2>Employee Leave Status Check List</h2>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
          <th scope="col">leaveid</th>
            <th scope="col">assignedleaves</th>
            <th scope="col">approvedleaves</th>
            <th scope="col">balancedLeaves</th>
            <th scope="col">reason</th>
            <th scope="col">leaveduration</th>
            <th scope="col">leavetype</th>
            <th scope="col">leaveStatus</th>
            <th scope="col">taskid</th>
          </tr>
        </thead>
        <tbody className="text-light">

          {state.employeeleavecheck.employeeLeaveCheckListbyTaskId.map(
            (item, index) => (
              <tr key={index}>
                <th scope="row">{item.leaveid}</th>
                <td>{item.assignedleaves}</td>
                <td>{item.approvedleaves}</td>
                <td>{item.balanceLeaves}</td>
                <td>{item.reason}</td>
                <td>{item.leaveduration}</td>
                <td>{item.leavetype}</td>
                <td>{item.leaveStatus}</td>


              {item!==undefined&&(<td>{item.tasks.taskId}</td> )}
                
               {/* <td>{item.task.taskName}</td>
              <td>{item.task.taskStatus}</td>
               <td>{item.task.projectid}</td>
              <td>{item.task.startDate}</td>
               <td>{item.task.deadLine}</td> */}

                 
               
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};