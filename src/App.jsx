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

function App() {
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
          <Route path="/adminDash/myLead" element={<MyLead/>}/>
          <Route path="/adminDash/createLead" element={<CreateLead/>}/>
          <Route path="/admin/leadlist" element={<LeadsList />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
