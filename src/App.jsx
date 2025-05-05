import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/Dashboard";
import LeadManagement from "./pages/admin/LeadManagement";
import LeadsList from "./pages/admin/LeadsList";
import CreateLead from "./pages/admin/CreateLead";
import ClientDashboard from "./pages/Client/ClientDashboard";
import Login from "./pages/auth/Login";
import Forget from "./pages/auth/Forget";
import Create from "./pages/auth/Create";

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

          <Route path="/adminDash/leadDash" element={<LeadManagement />} />
          <Route path="/admin/leadlist" element={<LeadsList />} />
          <Route path="/admin/createlead" element={<CreateLead />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
