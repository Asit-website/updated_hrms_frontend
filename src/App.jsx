import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/Dashboard";
import LeadManagement from './pages/admin/LeadManagement'
import ClientDashboard from "./pages/Client/ClientDashboard";
import Login from "./pages/auth/Login";
import Forget from "./pages/auth/Forget";
import Create from "./pages/auth/Create";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/create" element={<Create/>}/>
        <Route path="/forget" element={<Forget/>}/>
      <Route path="/login" element={<Login/>}/>
  <Route element={<MainLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />

          <Route path="/admin/leadmanagement" element={<LeadManagement/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
