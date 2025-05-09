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
import CloseLeads from './pages/admin/LeadManagement/CloseLeads'
import LeadsList from "./pages/admin/LeadsList";
import CreateLead from "./pages/admin/CreateLead";
import ClientDashboard from "./pages/Client/ClientDashboard";
import Login from "./pages/auth/Login";
import Forget from "./pages/auth/Forget";
import Create from "./pages/auth/Create";
import MyLead from "./pages/admin/LeadManagement/MyLead";
import LeadFile2 from "./pages/admin/LeadManagement/LeadFile2";
import UserLead from "./pages/admin/LeadManagement/UserLead";
import Profile from './pages/admin/MySelf/Profile'
import Permission from "./pages/admin/Permission/Permission";
import PermissionDetail  from "./pages/admin/Permission/PermissionDetail";
import { useState } from "react";
import MySelf from "./pages/admin/MySelf/MySelf";
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
          <Route path="/adminDash/HRM" element={<AdminDashboard/>} />
          <Route path="/employeeDash" element={<EmployeeDashboard />} />
          <Route path="/client" element={<ClientDashboard />} />

          <Route path="/adminDash/leadFile" element={<LeadFile2/>} />
          <Route path="/adminDash/userLead" element={<UserLead/>} />
          <Route path="/adminDash/leadDash" element={<LeadManagement/>} />
          <Route path="/adminDash/closeLeads" element={<CloseLeads/>}/>
          <Route path="/adminDash/Permission" element={<Permission  pop={pop} setAlert={setAlert} setPop={setPop} />} />
          <Route path="/adminDash/PermissionDetail" element={<PermissionDetail pop={pop} setAlert={setAlert} setPop={setPop} />} />
          <Route path="/adminDash/myLead" element={<MyLead/>}/>
          <Route path="/adminDash/profile" element={<Profile pop={pop} setPop={setPop} setAlert={setAlert}/>} />
          <Route path="/adminDash/createLead" element={<CreateLead/>}/>
          <Route path="/adminDash/mySelf" element={<MySelf setAlert={setAlert} />} />
          <Route path="/admin/leadlist" element={<LeadsList />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
