import axios from "axios";


const initState = {
  employeeLeaveCheckListbyTaskId : [],
  
  progress: false,

  // on click of update button; the key will be updated.
  uref: {},
};


//const EMPLOYEE_GET_ALL_REQUESTS_BY_TASK_ID_ACTION_TYPE = "EMPLOYEE_GET_ALL_REQUESTS_BY_TASK_ID_ACTION_TYP";
const LEAVE_REQUEST_BY_TASK_ID_ACTION_TYPE = "LEAVE_REQUEST_BY_TASK_ID_ACTION_TYPE";

export const getAllLeaveRequestsAction = (payload) => {
    return async (dispatch) => {
      // API CALL :: FETCH RECORDS
    // const taskId=localStorage.setItem("taskId",payload)
     //console.log(payload);
      const url = `http://localhost:8080/api/v1/leaves/${payload}`;
     const response = await axios.get(url);
  
      console.log(response.data);

      // dispatch({ type:REQUEST_BY_ID_ACTION_TYPE , payload: ""});
      // UI UPDATE
      dispatch({ type:LEAVE_REQUEST_BY_TASK_ID_ACTION_TYPE , payload: response.data });
   

    };
  };

//   export const deleteLeaveRequestAction = (payload) => {
//     return async (dispatch) => {
//       // MAKE AN API/SERVER CALL
//       const url = `http://localhost:8080/api/v1/request/delete/${payload.requestid}`;
//       await axios.delete(url,payload);
  
//       // Update the UI TODO :: Fetch The Updated List
//    // dispatch(getAllEmployeeRequestsCheckAction());
//  dispatch(getAllTaskTimeExtensionRequestsAction());
//     };
//   };


  export function EmployeeLeaveCheckReducer(state = initState, action) {
    switch (action.type) {
      // case EMPLOYEE_GET_ALL_REQUESTS_BY_TASK_ID_ACTION_TYPE:
      //   return { ...state, EmployeeStatusCheckListTE: action.payload };
        case LEAVE_REQUEST_BY_TASK_ID_ACTION_TYPE:
          return { ...state, employeeLeaveCheckListbyTaskId : action.payload };
    
      default:
        return state;
    }}