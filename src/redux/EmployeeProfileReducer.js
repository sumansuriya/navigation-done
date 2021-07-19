import axios from "axios";

const initState = {
  empProfile: {},
  progress: false,

  // on click of update button; the key will be updated.
  uref: {},
};

const EMPLOYEE_GET_DETAILS_ACTION_TYPE = "EMPLOYEE_GET_DETAILS_ACTION_TYPE";
const EMPLOYEE_UPDATE_DETAILS_ACTION_TYPE =
  "EMPLOYEE_UPDATE_DETAILS_ACTION_TYPE";

export const getEmployeeDetailsAction = (payload) => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const userid=localStorage.getItem("empId");
    
    const url = `http://localhost:8080/api/v1/emp/profile/${userid}`;
    const response = await axios.get(url, payload);

    console.log(response.data);

    // UI UPDATE
    dispatch({
      type: EMPLOYEE_GET_DETAILS_ACTION_TYPE,
      payload: response.data,
    });
  };
};

export const updateRenderAction = (payload) => {
  // ONLY UPDATEING THE UI
  // 5
  return { type: EMPLOYEE_UPDATE_DETAILS_ACTION_TYPE, payload: payload };
};

export const updateEmployeeDetailsAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8080/api/v1/emp/profile/update`;
    await axios.put(url, payload);

    // making the uref empty again.
    updateRenderAction({});

    // update the ui. TODO
    dispatch({ type: EMPLOYEE_UPDATE_DETAILS_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: EMPLOYEE_UPDATE_DETAILS_ACTION_TYPE, payload: false });
    }, 5000);
  };  
};

export function EmployeeProfileReducer(state = initState, action) {
  switch (action.type) {
    case EMPLOYEE_GET_DETAILS_ACTION_TYPE:
      return { ...state, empProfile: action.payload };
    case EMPLOYEE_UPDATE_DETAILS_ACTION_TYPE:
      return { ...state, progress: action.payload };

    default:
      return state;
  }
}
