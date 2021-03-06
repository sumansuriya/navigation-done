import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllTaskTimeExtensionRequestsAction } from "../redux/AdminTaskTimeExtensionRequestsReducer";
import { updateRenderAction } from "../redux/EmployeeRequestReducer";
import { AppNav } from "./AppNav";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../logo15.png";
import {
  getAllEmployeeRequestsCheckAction,
  deleteRequestAction,
} from "../redux/EmployeeRequestStatusCheckReducer";
import { signOutAction } from "../redux/UserReducer";

export const AdminTaskExtensionRequestList = () => {
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
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllTaskTimeExtensionRequestsAction());
  }, []);

  // 2
  const updateRequest = (item) => {
    console.log("Update Record", item);

    // 3 :: updating the store
    dispatch(updateRenderAction(item));

    // navigateing to the page
    history.push("/employee-request-update");
  };
  const deleteRecord = (item) => {
    console.log("DELETE RECORD", item.requestid);
    // dispatch the call.
    dispatch(deleteRequestAction(item));
  };

  console.log(
    state.adminTaskTimeExtensionRequest.AdminTaskExtensionRequestList
  );
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
      <div className="alert alert-secondary mb-0">
        <h2>Employee Time Extension Requests List</h2>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">requestid</th>
            <th scope="col">empid</th>
            <th scope="col">status</th>
            <th scope="col">reason</th>
            <th scope="col">taskExtensionDate</th>
            <th scope="col">taskid</th>
            <th scope="col">taskName</th>
            <th scope="col">taskStatus</th>
            <th scope="col">projectid</th>
            <th scope="col">deadLine</th>

            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="text-light">
          {state.adminTaskTimeExtensionRequest.AdminTaskExtensionRequestList.map(
            (item, index) => (
              <tr key={index}>
                <th scope="row">{item.requestid}</th>
                <td>{item.task.emp.empid}</td>
                <td>{item.status}</td>
                <td>{item.reason}</td>
                <td>{item.taskExtensionDate}</td>
                <td>{item.task.taskId}</td>
              <td>{item.task.taskName}</td>
              <td>{item.task.taskStatus}</td>
               <td>{item.task.projectid}</td>
               <td>{item.task.deadLine}</td>

                <td>
                <div className="row mb-2  justify-content-center">
                  <input
                    type="button"
                    value="Update"
                    className="btn btn-outline-success btn-sm  mr-1"
                    // onClick={updateRecord} :1
                    onClick={() => updateRequest(item)}
                  />
                </div>
                   <input
                    type="button"
                    value="Delete"
                    // onClick={deleteRecord}
                    onClick={() => deleteRecord(item)}
                    className="btn btn-outline-danger btn-sm"
                  />
                  
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};