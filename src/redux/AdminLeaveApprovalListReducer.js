import axios from "axios";

const initState = {
  AdminLeaveApprovalList: [],
  progress: false,

  // on click of update button; the key will be updated.
  uref: {},
};

// ACTION TYPES :: EMPLOYEE :: ENITY1

const ADMIN_GET_ALL_LEAVE_REQUEST_ACTION_TYPE = "ADMIN_GET_ALL_LEAVE_REQUEST_ACTION_TYPE";

// ACTIONS
export const getAllLeaveRequestAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8080/api/v1/emp/leave`;
    const response = await axios.get(url);

     console.log(response.data);

    // UI UPDATE
    dispatch({ type: ADMIN_GET_ALL_LEAVE_REQUEST_ACTION_TYPE, payload: response.data });
  };
};
// REDURE FOR STATE UPDTE
export function AdminLeaveApprovalListReducer(state = initState, action) {
    switch (action.type) {
      case  ADMIN_GET_ALL_LEAVE_REQUEST_ACTION_TYPE:
        return { ...state,  AdminLeaveApprovalList: action.payload };
        
      default:
        return state;
    }
  }