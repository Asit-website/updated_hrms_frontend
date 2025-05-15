import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/Dashboard";
import LeadManagement from "./pages/admin/LeadManagement/LeadManagement";
import CloseLeads from "./pages/admin/LeadManagement/CloseLeads";
import LeadsList from "./pages/admin/LeadsList";
import CreateLead from "./pages/admin/CreateLead";
import ClientDashboard from "./pages/Client/ClientDashboard";
import Login from "./pages/auth/Login";
import Forget from "./pages/auth/Forget";
import Create from "./pages/auth/Create";
import MyLead from "./pages/admin/LeadManagement/MyLead";
import LeadFile2 from "./pages/admin/LeadManagement/LeadFile2";
import UserLead from "./pages/admin/LeadManagement/UserLead";
import Profile from "./pages/admin/MySelf/Profile";
import Permission from "./pages/admin/Permission/Permission";
import PermissionDetail from "./pages/admin/Permission/PermissionDetail";
import { useState } from "react";
import Assets from "./pages/admin/Performance/Assets";
import Items from "./pages/admin/Performance/Items";
import MySelf from "./pages/admin/MySelf/MySelf";
import AwardHrm from "./pages/admin/HrAdmin/AwardHrm";
import Promotion from "./pages/admin/HrAdmin/Promotion";
import Transfer from "./pages/admin/HrAdmin/Transfer";
import Resignation from "./pages/admin/HrAdmin/Resignation";
import Complaints from "./pages/admin/HrAdmin/Complaints";
import Warning from "./pages/admin/HrAdmin/Warning";
import Termination from "./pages/admin/HrAdmin/Termination";
import Holiday from "./pages/admin/HrAdmin/Holiday";
import Announcement from "./pages/admin/HrAdmin/Announcement";
import 'react-toastify/dist/ReactToastify.css';
import Clients from './pages/admin/TaskManagement/Clients'
import ProjectOverView from './pages/admin/TaskManagement/ProjectOverView'
import ClientsProject from './pages/admin/TaskManagement/ClientsProject'
import LeadSystemSetting from "./pages/admin/LeadManagement/LeadSystemSetting";
import TaskProjects from "./pages/admin/TaskManagement/Projects/TaskProjects";
import EditLead from "./pages/admin/LeadManagement/EditLead";
import ImportLead from "./pages/admin/LeadManagement/ImportLead";

var tc;
function App() {
  const [alertValue, setAlertValue] = useState({
    show: false,
    color: "",
    message: "",
  });

  const [pop, setPop] = useState(false);
  const setAlert = (color, message) => {
    setAlertValue({
      color,
      message,
      show: true,
    });

    clearTimeout(tc);
    tc = setTimeout(() => {
      setAlertValue({
        color: "",
        message: "",
        show: false,
      });
    }, 3000);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/create" element={<Create />} />
        <Route path="/forget" element={<Forget />} />

        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/adminDash/HRM" element={<AdminDashboard />} />
          <Route path="/employeeDash" element={<EmployeeDashboard />} />
          <Route path="/client" element={<ClientDashboard />} />

          <Route path="/adminDash/leadFile" element={<LeadFile2 />} />
          <Route path="/adminDash/userLead" element={<UserLead />} />
          <Route path="/adminDash/leadDash" element={<LeadManagement />} />
          <Route
            path="/adminDash/HRM/ResignationHRM"
            element={<Resignation />}
          />
          <Route path="/adminDash/HRM/PromotionHRM" element={<Promotion />} />
          <Route path="/adminDash/HRM/ComplaintsHRM" element={<Complaints />} />
          <Route path="/adminDash/closeLeads" element={<CloseLeads />} />
          <Route
            path="/adminDash/Permission"
            element={
              <Permission pop={pop} setAlert={setAlert} setPop={setPop} />
            }
          />
          <Route
            path="/adminDash/PermissionDetail"
            element={
              <PermissionDetail pop={pop} setAlert={setAlert} setPop={setPop} />
            }
          />
          <Route path="/adminDash/myLead" element={<MyLead />} />
           <Route path="/adminDash/importLead/:id" element={<ImportLead/>} />
          <Route
            path="/adminDash/profile"
            element={<Profile pop={pop} setPop={setPop} setAlert={setAlert} />}
          />
          <Route path="/adminDash/createLead" element={<CreateLead />} />
          <Route
            path="/adminDash/mySelf"
            element={<MySelf setAlert={setAlert} />}
          />
          <Route
            path="/performance/Assets"
            element={<Assets pop={pop} setPop={setPop} setAlert={setAlert} />}
          />
          <Route path="/adminDash/HRM/Expense" element={<Items />} />
          <Route path="/adminDash/HRM/WarningHRM" element={<Warning />} />
          <Route
            path="/adminDash/HRM/TerminationHRM"
            element={<Termination />}
          />
          <Route
            path="/adminDash/announcement"
            element={
              <Announcement pop={pop} setPop={setPop} setAlert={setAlert} />
            }
          />
             <Route path="/adminDash/editLead" element={<EditLead/>} />
          <Route path="/adminDash/HRM/holiday" element={<Holiday />} />
          <Route path="/adminDash/HRM/TransferHRM" element={<Transfer />} />
          <Route path="/adminDash/HRM/AwardHRM" element={<AwardHrm />} />
          <Route path="/admin/leadlist" element={<LeadsList />} />
           <Route path="/adminDash/LeadSystemSetting" element={<LeadSystemSetting/>} />
           {/* task management */}
             <Route path="/adminDash/HRM/taskClients" element={<Clients setAlert={setAlert} />} />
               <Route path="/adminDash/HRM/clientsProject" element={<ClientsProject/>} />
                 <Route path="/adminDash/HRM/projectOverview" element={<ProjectOverView/>} />
                   <Route path="/adminDash/HRM/taskProjects" element={<TaskProjects/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
