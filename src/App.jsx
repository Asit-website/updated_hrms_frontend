import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import PrivateRoute from "./pages/auth/PrivateRoute";
import Unauthorized from "./pages/auth/Unauthorized";
import NotFound from "./components/NotFound";
import HomeRedirect from "./pages/auth/HomeRedirect";
import Login from "./pages/auth/Login";
import Forget from "./pages/auth/Forget";
import Create from "./pages/auth/Create";
import ForgetPassword1 from "./pages/auth/ForgetPassword1";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnnouncement from './pages/admin/Dashboard/AdminAnnouncement';
import HolidayHrm from './pages/admin/Dashboard/HolidayHrm';
import ActiveEmplyee from './pages/admin/Dashboard/AdminEmplyee';
import HalfRequest from "./pages/admin/Dashboard/HalfRequest";
import TotalEmployee from "./pages/admin/Dashboard/TotalEmployee";
import DeactivateEmployee from "./pages/admin/Dashboard/DeactivateEmployee";
import LeadManagement from "./pages/admin/LeadManagement/LeadManagement";
import CloseLeads from "./pages/admin/LeadManagement/CloseLeads";
import LeadsList from "./pages/admin/LeadsList";
import CreateLead from "./pages/admin/CreateLead";
import MyLead from "./pages/admin/LeadManagement/MyLead";
import LeadFile2 from "./pages/admin/LeadManagement/LeadFile2";
import UserLead from "./pages/admin/LeadManagement/UserLead";
import LeadSystemSetting from "./pages/admin/LeadManagement/LeadSystemSetting";
import EditLead from "./pages/admin/LeadManagement/EditLead";
import ImportLead from "./pages/admin/LeadManagement/ImportLead";
import QuotationForm from "./pages/admin/LeadManagement/QuotationForm";
import ProposalForm from "./pages/admin/LeadManagement/ProposalForm";
import Permission from "./pages/admin/Permission/Permission";
import PermissionDetail from "./pages/admin/Permission/PermissionDetail";
import Profile from "./pages/admin/MySelf/Profile";
import MySelf from "./pages/admin/MySelf/MySelf";
import Assets from "./pages/admin/Performance/Assets";
import Items from "./pages/admin/Performance/Items";
import AwardHrm from "./pages/admin/HrAdmin/AwardHrm";
import Promotion from "./pages/admin/HrAdmin/Promotion";
import Transfer from "./pages/admin/HrAdmin/Transfer";
import Resignation from "./pages/admin/HrAdmin/Resignation";
import Complaints from "./pages/admin/HrAdmin/Complaints";
import Warning from "./pages/admin/HrAdmin/Warning";
import Termination from "./pages/admin/HrAdmin/Termination";
import Clients from './pages/admin/TaskManagement/Clients';
import ProjectOverView from './pages/admin/TaskManagement/ProjectOverView';
import ClientsProject from './pages/admin/TaskManagement/ClientsProject';
import TaskProjects from "./pages/admin/TaskManagement/Projects/TaskProjects";
import EmployeeManagement from "./pages/admin/HrManagement/EmployeeManagement";
import EmployeeDetail from './pages/admin/HrManagement/EmployeeDetail';
import EmployeeManage from "./pages/admin/HrManagement/EmployeeManage";
import MarkAttendance from "./pages/admin/HrManagement/MarkAttendance";
import LeaveEmployee from "./pages/admin/HrManagement/LeaveEmployee";
import LeaveRequest from "./pages/admin/HrManagement/LeaveRequest";
import SetSallary from "./pages/admin/HrManagement/SetSallary";
import SetSalaryId from './pages/admin/HrManagement/SetSalaryId';
import Payslip from "./pages/admin/HrManagement/Payslip";
import DocumentManagement from "./pages/admin/HrManagement/DocumentManagement";
import Appraisal from "./pages/admin/HrManagement/Appraisal";
import GoalTracking from "./pages/admin/HrManagement/GoalTracking";
import HRMsystemSetup from "./pages/admin/HrManagement/HRMsystemSetup";
import EmployeeMan from './pages/admin/HrManagement/EmployeeMan';
import MeetLead from "./pages/admin/LeadManagement/MeetLead";
import Notification from "./pages/admin/Notification";

// Employee Pages
// import MyProject from './pages/employee/Task Mangement/MyProject';
import ProjectDetails2 from "./pages/employee/Task Mangement/ProjectDetail2";
import MyLeaves from "./pages/employee/MyLeave";
import ClientProjectOverview from "./pages/Client/ClientProjectOverview";
import CreateEmployee from "./pages/employee/CreateEmployee";
import UploadITRForm from "./pages/admin/Performance/UploadITRForm";
import ITRReturn from "./pages/admin/Performance/ITRReturn";
import Tasks from "./pages/admin/TaskManagement/Tasks";
import EmployeAttendence from "./pages/admin/HrManagement/EmployeAttendence";
import ProfileManagement from "./pages/admin/HrManagement/ProfileManagement";
import EditQuotation from "./pages/admin/LeadManagement/EditQuotation";

// Client Pages
import ClientDashboard from "./pages/Client/ClientDashboard";
import AttendenceCalendar from "./pages/employee/AttendenceCalendar";
import AddEmployee from "./pages/admin/LeadManagement/AddEmployee";


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/forget1" element={<ForgetPassword1 />} />
        <Route path="/forget2" element={<Create />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<MainLayout />}>

          <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/adminDash/HRM" element={<AdminDashboard />} />
             <Route path="/adminDash/addEmployee" element={<AddEmployee/>} />
            <Route path="/adminDash/announcement" element={<AdminAnnouncement />} />
            <Route path="/adminDash/HRM/holiday" element={<HolidayHrm />} />
            <Route path="/adminDash/HRM/activeEmployee" element={<ActiveEmplyee />} />
            <Route path="/adminDash/HRM/halfDayRequest" element={<HalfRequest />} />
            <Route path="/adminDash/HRM/totalEmployee" element={<TotalEmployee />} />
            <Route path="/adminDash/HRM/deactivate" element={<DeactivateEmployee />} />
            <Route path="/adminDash/leadFile" element={<LeadFile2 />} />
            <Route path="/adminDash/userLead" element={<UserLead />} />
            <Route path="/adminDash/leadDash" element={<LeadManagement />} />
            <Route path="/adminDash/myLead" element={<MyLead />} />
            <Route path="/adminDash/closeLeads" element={<CloseLeads />} />
            <Route path="/admin/leadlist" element={<LeadsList />} />
            <Route path="/adminDash/createLead" element={<CreateLead />} />
            <Route path="/adminDash/editLead" element={<EditLead />} />
             <Route path="/adminDash/editQuotation" element={<EditQuotation/>} />
            <Route path="/adminDash/importLead/:id" element={<ImportLead />} />
            <Route path="/adminDash/LeadSystemSetting" element={<LeadSystemSetting />} />
            <Route path="/adminDash/HRM/QuotationForm" element={<QuotationForm />} />
            <Route path="/adminDash/HRM/ProposalForm" element={<ProposalForm />} />
            <Route path="/adminDash/Permission" element={<Permission />} />
            <Route path="/adminDash/PermissionDetail" element={<PermissionDetail />} />
            <Route path="/adminDash/profile" element={<Profile />} />
            <Route path="/adminDash/mySelf" element={<MySelf />} />
            <Route path="/adminDash/HRM/ResignationHRM" element={<Resignation />} />
            <Route path="/adminDash/HRM/PromotionHRM" element={<Promotion />} />
            <Route path="/adminDash/HRM/ComplaintsHRM" element={<Complaints />} />
            <Route path="/adminDash/HRM/WarningHRM" element={<Warning />} />
            <Route path="/adminDash/HRM/TerminationHRM" element={<Termination />} />
            <Route path="/adminDash/HRM/TransferHRM" element={<Transfer />} />
            <Route path="/adminDash/HRM/AwardHRM" element={<AwardHrm />} />
             <Route path="/adminDash/meetLead" element={<MeetLead/>} />
            <Route path="/performance/Assets" element={<Assets />} />
            <Route path="/adminDash/HRM/Expense" element={<Items />} />
            <Route path="/performance/appraisal" element={<Appraisal />} />
            <Route path="/performance/goalTracking" element={<GoalTracking />} />
            <Route path="/adminDash/HRM/taskClients" element={<Clients />} />
            <Route path="/adminDash/HRM/clientsProject" element={<ClientsProject />} />
            <Route path="/adminDash/HRM/projectOverview" element={<ProjectOverView />} />
            <Route path="/adminDash/HRM/taskProjects" element={<TaskProjects />} />
            <Route path="/adminDash/HRM/EmployeeManagement" element={<EmployeeManagement />} />
            <Route path="/adminDash/EmployeeDetails" element={<EmployeeDetail />} />
            <Route path="/adminDash/EmployeeMan/:id" element={<EmployeeManage />} />
            <Route path="/adminDash/HRM/markAttendance" element={<MarkAttendance />} />
            <Route path="/adminDash/HRM/LeaveEmployee" element={<LeaveEmployee />} />
            <Route path="/adminDash/HRM/leaveRequest" element={<LeaveRequest />} />
            <Route path="/adminDash/setSallary" element={<SetSallary />} />
            <Route path="/adminDash/setAll/:id" element={<SetSalaryId />} />
            <Route path="/adminDash/payslip" element={<Payslip />} />
            <Route path="/adminDash/documentManagement" element={<DocumentManagement />} />
            <Route path="/adminDash/HRM/HRMsystemSetup" element={<HRMsystemSetup />} />
            <Route path="/adminDash/EmployeeMan" element={<EmployeeMan />} />
             <Route path="/adminDash/notification" element={<Notification/>} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["EMPLOYEE"]} />}>
            <Route path="/employeeDash" element={<AdminDashboard />} />
            {/* <Route path="/employeeDash/HRM/myProjects" element={<MyProject />} /> */}
            <Route path="/employeeDash/HRM/projectDetails" element={<ProjectDetails2 />} />
            <Route path="/employeeDash/employeeLeave" element={<MyLeaves />} />
            <Route path="/employeeDash/atten" element={<AttendenceCalendar />} />
          </Route>

          <Route path="/client" element={<ClientDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
