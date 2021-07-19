import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployeeAction,
  updateEmployeeAction,
} from "../redux/EmployeeReducer";
import { AppNav } from "./AppNav";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/EmployeeReducer";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";

export const EmployeeAdd = () => {
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

  const [firstname, setFirstname] = useState(state.employee.uref.firstname);
  const [lastname, setLastname] = useState(state.employee.uref.lastname);
  const [username, setUsername] = useState(state.employee.uref.username);
  const [empmail, setEmpmail] = useState(state.employee.uref.empmail);
  const [empDeptName, setEmpDeptName] = useState(
    state.employee.uref.empDeptName
  );
  const [location, setLocation] = useState(state.employee.uref.location);
  const [empHireDate, setEmpHireDate] = useState(
    state.employee.uref.empHireDate
  );
  const [designation, setDesignation] = useState(
    state.employee.uref.designation
  );
  const [contactNo, setContactNo] = useState(state.employee.uref.contactNo);

  const updateFirstname = (e) => setFirstname(e.target.value);
  const updateLastname = (e) => setLastname(e.target.value);
  const updateUsername = (e) => setUsername(e.target.value);
  const updateempmail = (e) => setEmpmail(e.target.value);
  const updatempDeptName = (e) => setEmpDeptName(e.target.value);
  const updatelocation = (e) => setLocation(e.target.value);
  const updatempHireDate = (e) => setEmpHireDate(e.target.value);
  const updateDesignation = (e) => setDesignation(e.target.value);
  const updateContactNo = (e) => {
    console.log(e.target.value);
    const numericValue = e.target.value.replace(/[^\d]/gi, "");
    setContactNo(numericValue);
  };

  const addNewEmployee = (e) => {
    // WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
    // console.log(formEl.current);
    // console.log(formEl.current.checkValidity());
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createEmployeeAction({
          firstname,
          lastname,
          username,
          empmail,
          empDeptName,
          location,
          empHireDate,
          designation,
          contactNo,
        })
      );

      var DEPTdropDown = document.getElementById("dept");
      DEPTdropDown.selectedIndex = 0;

      var ROLEdropDown = document.getElementById("role");
      ROLEdropDown.selectedIndex = 0;

      // clear the form
      setFirstname("");
      setLastname("");
      setUsername("");
      setEmpmail("");
      setEmpDeptName("");
      setLocation("");
      setEmpHireDate("");
      setDesignation("");
      setContactNo("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const updateEmployee = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        updateEmployeeAction({
          empid: state.employee.uref.empid,
          firstname,
          lastname,
          username,
          empmail,
          empDeptName,
          location,
          empHireDate,
          designation,
          contactNo,
        })
      );

      // clear the form
      setFirstname("");
      setLastname("");
      setUsername("");
      setEmpmail("");
      setEmpDeptName("");
      setLocation("");
      setEmpHireDate("");
      setDesignation("");
      setContactNo("");

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
        {state.employee.uref.empid ? (
          <center>
            <h2>Employee Update</h2>
          </center>
        ) : (
          <center>
            <h2>Employee Create</h2>
          </center>
        )}
      </div>
    
        <div>
         {state.employee.progress && ( 
            state.employee.uref.empid ? (
        <div className="row mb-1 justify-content-center">
          <div className="mx-4 alert alert-success w-50 ">
            Employee updated Successfully
          </div>
        </div>
         ) : (
            <div className="row mb-1 justify-content-center">
              <div className="mx-4 alert alert-success w-50 ">
                Employee added Successfully
              </div>
            </div>
           )
        )}
      </div>

      <form ref={formEl} className="mx-4 needs-validation" noValidate>

        <div className="row mb-1 justify-content-center">
        {state.employee.uref.empid ? (
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={firstname}
            placeholder="Enter firstname"
            onChange={updateFirstname}
            required
            readOnly
          />
        ) : (
          <input
          type="text"
          className="form-control form-control-lg w-50"
          value={firstname}
          placeholder="Enter firstname"
          onChange={updateFirstname}
          required
          />
        )}
        </div>

        <div className="row mb-1 justify-content-center">
        {state.employee.uref.empid ? (
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={lastname}
            placeholder="Enter lastname"
            onChange={updateLastname}
            required
            readOnly
          />
        ) : (
          <input
          type="text"
          className="form-control form-control-lg w-50"
          value={lastname}
          placeholder="Enter lastname"
          onChange={updateLastname}
          required
        />
        )}
        </div>

        <div className="row mb-1 justify-content-center">
          <input
            type="email"
            className="form-control form-control-lg w-50"
            value={empmail}
            placeholder="Enter mail"
            onChange={updateempmail}
            required
          />
        </div>

        <div className="row mb-1 justify-content-center">
        {state.employee.uref.empid ? (
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={username}
            placeholder="Enter username"
            onChange={updateUsername}
            required
            readOnly
          />
        ) : (
          <input
          type="text"
          className="form-control form-control-lg w-50"
          value={username}
          placeholder="Enter username"
          onChange={updateUsername}
          required
        />
        )}
        </div>

        <h5 className="text-light text-center col-7"> Enter Hire date </h5>
        <div className="row mb-1 justify-content-center">
        {state.employee.uref.empid ? (
          <input
            placeholder="Enter hire date"
            type="date"
            className="form-control form-control-lg w-50"
            value={empHireDate}
            onChange={updatempHireDate}
            required
            readOnly
          />
        ) : (
          <input
            placeholder="Enter hire date"
            type="date"
            className="form-control form-control-lg w-50"
            value={empHireDate}
            onChange={updatempHireDate}
            required
          /> 
        )}
        </div>

        <div className="row mb-1 justify-content-center">
          {state.employee.uref.empid ? (
            <select
              className="custom-select custom-select-lg w-50"
              value={empDeptName}
              required
              onChange={(e) => {
                const updateDeptName = e.target.value;
                setEmpDeptName(updateDeptName);
              }}
            >
              <option value="">Select department</option>
              <option value="Accounts and Finance">Accounts and Finance</option>
              <option value="HR">HR</option>
              <option value="Sales and Marketing">Sales and Marketing</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Learning and Development">
                Learning and Development
              </option>

              <optgroup label="IT Services">
                <option>Developer</option>
                <option>Testing</option>
                <option>Support Role</option>
              </optgroup>
            </select>
          ) : (
            <select
              className="custom-select custom-select-lg w-50"
              id="dept"
              required
              onChange={(e) => {
                const setDeptName = e.target.value;
                setEmpDeptName(setDeptName);
              }}
            >
              <option value="">Select department</option>
              <option value="Accounts and Finance">Accounts and Finance</option>
              <option value="HR">HR</option>
              <option value="Sales and Marketing">Sales and Marketing</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Learning and Development">
                Learning and Development
              </option>

              <optgroup label="IT Services">
                <option>Developer</option>
                <option>Testing</option>
                <option>Support Role</option>
              </optgroup>
            </select>
          )}
        </div>

        <div className="row mb-1 justify-content-center">
          {state.employee.uref.empid ? (
            <select
              className="custom-select custom-select-lg w-50"
              value={designation}
              required
              onChange={(e) => {
                const updateEmpDesignation = e.target.value;
                setDesignation(updateEmpDesignation);
              }}
            >
              <option value="">Select designation</option>

              <optgroup label="A-Grade">
                <option>Associate-A3</option>
                <option>Analyst-A4</option>
                <option>Senior Analyst-A5</option>
              </optgroup>

              <optgroup label="B-Grade">
                <option>Associate Consultant-B1</option>
                <option>Consultant-B2</option>
              </optgroup>

              <optgroup label="C-Grade">
                <option>Senior Consultant-C1</option>
                <option>Manager-C2</option>
              </optgroup>

              <optgroup label="D-Grade">
                <option>Senior Manager-D1</option>
                <option>Program Manager-D2</option>
              </optgroup>

              <optgroup label="E-Grade">
                <option>Director-E1</option>
                <option>Senior Director-E2</option>
              </optgroup>
            </select>
          ) : (
            <select
              className="custom-select custom-select-lg w-50"
              id="role"
              required
              onChange={(e) => {
                const setEmpDesignation = e.target.value;
                setDesignation(setEmpDesignation);
              }}
            >
              <option value="">Select designation</option>

              <optgroup label="A-Grade">
                <option>Associate-A3</option>
                <option>Analyst-A4</option>
                <option>Senior Analyst-A5</option>
              </optgroup>

              <optgroup label="B-Grade">
                <option>Associate Consultant-B1</option>
                <option>Consultant-B2</option>
              </optgroup>

              <optgroup label="C-Grade">
                <option>Senior Consultant-C1</option>
                <option>Manager-C2</option>
              </optgroup>

              <optgroup label="D-Grade">
                <option>Senior Manager-D1</option>
                <option>Program Manager-D2</option>
              </optgroup>

              <optgroup label="E-Grade">
                <option>Director-E1</option>
                <option>Senior Director-E2</option>
              </optgroup>
            </select>
          )}
        </div>

        <div className="row mb-1 justify-content-center">
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={location}
            placeholder="Enter work location"
            onChange={updatelocation}
            required
          />
        </div>

        <div className="row mb-1 justify-content-center">
        {state.employee.uref.empid ? (
          <input
            type="text"
            className="form-control form-control-lg mb-1 w-50"
            value={contactNo}
            placeholder="Enter Contact number"
            onChange={updateContactNo}
            minLength="10"
            maxLength="10"
            required
            readOnly
          />
        ) : (
          <input
          type="text"
          className="form-control form-control-lg mb-1 w-50"
          value={contactNo}
          placeholder="Enter Contact number"
          onChange={updateContactNo}
          minLength="10"
          maxLength="10"
          required
        />
        )}
      </div>

        <div>
          <div className="row mb-1 justify-content-center">
            {state.employee.uref.empid ? (
              <input
                type="button"
                onClick={updateEmployee}
                value="Update Employee"
                className="btn btn-lg btn-info w-50"
              />
            ) : (
              <input
                type="button"
                onClick={addNewEmployee}
                value="Add Employee"
                className="btn btn-lg btn-success w-50"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
