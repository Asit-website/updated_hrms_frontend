import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/Dashboard";
import ClientDashboard from "./pages/Client/ClientDashboard";
import Login from "./pages/auth/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/admin/dashboard" element={<MainLayout><AdminDashboard /></MainLayout>} />
        <Route path="/employee/dashboard" element={<MainLayout><EmployeeDashboard /></MainLayout>} />
        <Route path="/client/dashboard" element={<MainLayout><ClientDashboard /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
