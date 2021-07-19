import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { AdminReducer } from "./AdminReducer";
import { EmployeeReducer } from "./EmployeeReducer";
import { EmployeeTaskReducer } from "./EmployeeTaskReducer";
import { AdminTaskTimeExtensionRequestsReducer } from "./AdminTaskTimeExtensionRequestsReducer";
import { EmployeeRequestReducer } from "./EmployeeRequestReducer";
import { EmployeeRequestStatusCheckReducer } from "./EmployeeRequestStatusCheckReducer";
import { EmployeeLeaveRequestReducer } from "./EmployeeLeaveRequestReducer";
import { UserReducer } from "./UserReducer";
import {AdminLeaveApprovalListReducer} from "./AdminLeaveApprovalListReducer";
import { EmployeeBenchReducer } from "./EmployeeBenchReducer";
import { EmployeeReportReducer } from "./EmployeeReportReducer";
import { EmployeeProfileReducer } from "./EmployeeProfileReducer";
import { EmployeeLeaveCheckReducer } from "./EmployeeLeaveCheckReducer";
import { EmployeeTaskAssignReducer } from "./EmployeeTaskAssignReducer";

const rootReducer = combineReducers({
  admin: AdminReducer,
  user: UserReducer,
  employee: EmployeeReducer,
  employeeTask: EmployeeTaskReducer,
  adminTaskTimeExtensionRequest: AdminTaskTimeExtensionRequestsReducer,
  employeeRequest: EmployeeRequestReducer,
  employeeRequestStatusCheck : EmployeeRequestStatusCheckReducer,
  employeeLeaveRequest: EmployeeLeaveRequestReducer,
  adminLeaveApprovalRequest: AdminLeaveApprovalListReducer,
  employeeBench: EmployeeBenchReducer,
  employeeTaskAssign: EmployeeTaskAssignReducer,
  employeeReport: EmployeeReportReducer,
  employeeleavecheck: EmployeeLeaveCheckReducer,
  employeeProfile: EmployeeProfileReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export { store };

// HOW TO ACCESS THE STORE IN COMPOENNT
// state.employeeList :: when there was only one reducer.
// state.authSuccess :: when there was only one reducer.
// state.employee.employeeList
// state.user.authSuccess
