import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployeeTaskAction,
  updateEmployeeTaskAction,
} from "../redux/EmployeeTaskReducer";
import { AppNav } from "./AppNav";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/EmployeeReducer";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";

export const EmployeeTaskAdd = () => {
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

  const [taskName, setTaskName] = useState(state.employeeTask.uref.taskName);
  const [projectid, setProjectId] = useState(state.employeeTask.uref.projectid);
  const [projectName, setProjectName] = useState(state.employeeTask.uref.projectName);
  const [emp, setEmp] = useState(state.employeeTask.uref.emp);

  const updateTaskName = (e) => setTaskName(e.target.value);
  const updateProjectId = (e) => setProjectId(e.target.value);
  const updateProjectName = (e) => setProjectName(e.target.value);
  const updateEmp = (e) => setEmp(e.target.value);

  const addNewTask = (e) => {
    // WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
    // console.log(formEl.current);
    // console.log(formEl.current.checkValidity());
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createEmployeeTaskAction({
          taskName: taskName,
          projectid: projectid,
          projectName: projectName,
          emp: { empid: emp },
        })
      );

      // clear the form
      setTaskName("");
      setProjectId("");
      setProjectName("");
      setEmp("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const updateEmployeeTask = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      console.log(state.employeeTask.uref.taskId);
      dispatch(
        updateEmployeeTaskAction({
          taskId: state.employeeTask.uref.taskId,

          taskName: taskName,
          projectid: projectid,
          projectName: projectName,
          emp: { empid: emp },
        })
      );

      // clear the form
      setTaskName("");
      setProjectId("");
      setProjectName("");
      setEmp("");

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
        {state.employeeTask.uref.taskId ? (    
          <center>
            <h2>Employee Task Update</h2>
          </center>  
        ) : (
          <center>
            <h2>Employee Task Create</h2>
          </center> 
        )}
      </div>

      <div>
      {state.employeeTask.progress && (
         state.employeeTask.uref.taskId ? (
        <div className="row mb-1  justify-content-center">
          <div className="mx-4 alert alert-success w-50">
            Task updated Successfully
          </div>
        </div>
         ) : (
          <div className="row mb-1  justify-content-center">
          <div className="mx-4 alert alert-success w-50">
            Task added Successfully
          </div>
        </div>
         )
      )}
      </div>

      <form ref={formEl} className="mx-4 needs-validation" noValidate>

        <div>
          <div className="row mb-1 justify-content-center">
          {state.employeeTask.uref.taskId ? (
            <input
              type="text"
              value={taskName}
              onChange={updateTaskName}
              className="form-control form-control-lg w-50"
              placeholder="Enter Task Name"
              required
              readOnly
            />
          ) : (
            <input
              type="text"
              value={taskName}
              onChange={updateTaskName}
              className="form-control form-control-lg w-50"
              placeholder="Enter Task Name"
              required
            />
          )}
          </div>
        </div>

        <div>
          <div className="row mb-1 justify-content-center">
            <input
              type="number"
              value={projectid}
              onChange={updateProjectId}
              className="form-control form-control-lg w-50"
              placeholder="Enter Project Id"
              required
            />
          </div>
        </div>

        <div>
          <div className="row mb-1 justify-content-center">
            <input
              type="text"
              value={projectName}
              onChange={updateProjectName}
              className="form-control form-control-lg w-50"
              placeholder="Enter Project name"
              required
            />
          </div>
        </div>

        <div>
          <div className="row mb-1 justify-content-center">
            <input
              type="number"
              value={emp}
              onChange={updateEmp}
              className="form-control form-control-lg mb-1 w-50"
              placeholder="Enter Employee Id"
              required
            />
          </div>
        </div>

        <div>
          <div className="row mb-1 justify-content-center">
            {state.employeeTask.uref.taskId ? (
              <input
                type="button"
                onClick={updateEmployeeTask}
                value="Update Employee Task"
                className="btn btn-lg btn-info w-50"
              />
            ) : (
              <input
                type="button"
                onClick={addNewTask}
                value="Add New Task"
                className="btn btn-lg btn-success w-50"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
