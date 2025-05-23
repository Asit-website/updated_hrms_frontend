import React, { useEffect, useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { useMain } from "../../hooks/UseMain";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { login, setUser, loading } = useMain();
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("hrms_user");
    const role = JSON.parse(localStorage.getItem("hrms_token"));

    if (user && location.pathname === '/login') {
      if (role?.role === "Client") navigate('/client');
      else if (role?.role === "HR") navigate('/hrDash');
      else if (role?.role === "EMPLOYEE") navigate("/employeeDash");
      else navigate("/adminDash/HRM");
    }
  }, [location.pathname, navigate]);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ans = await login({
      email: value.email.trim(),
      password: value.password
    });

    if (ans?.success || ans?.status) {
      const user = ans.user || ans?.data?.client;

      setUser(user);
      localStorage.setItem("hrms_user", JSON.stringify(user));
      localStorage.setItem("hrms_permission", JSON.stringify(user?.PermissionRole || {}));
      localStorage.setItem("hrms_token", JSON.stringify({
        token: ans.token || ans?.data?.token,
        role: user?.role || user?.Role
      }));

      toast.success("success", ans.message);

      const role = user?.role || user?.Role;
      if (role === "HR") navigate("/hrDash");
      else if (role === "EMPLOYEE") navigate("/employeeDash");
      else if (role === "Client") navigate("/client");
      else navigate("/adminDash/HRM");
    } else {
      toast.error("error", ans.message);
    }
  };

  return (
    <>
      <section className="bg-gray-100 min-h-screen flex flex-col justify-between p-6">
        <div className="flex items-center justify-center p-5 py-12">
          <div className="bg-white rounded-2xl shadow-md flex max-w-5xl w-full overflow-hidden">
            <form
              onSubmit={handleSubmit}
              className="w-full md:w-1/2 p-8 md:p-12"
            >
              <div className="mb-6 flex items-center space-x-3">
                <img
                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746172201/Kds_logo_1_1_qj1mca.png"
                  alt="KDS Logo"
                  className="h-10"
                />
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                Sign in
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                to access HRMS Dashboard
              </p>

              <div>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={value.email}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 mb-4 border rounded-md text-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-700 bg-gray-200"
                />
              </div>
              <div className="relative w-full mb-6">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  value={value.password}
                  name="password"
                  className="w-full px-4 py-3 border rounded-md text-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-gray-900 placeholder:text-gray-700 bg-gray-200"
                />

                <span
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <RxEyeOpen
                      className="w-5 h-5 font-bold text-gray-600"
                      aria-label="Hide password"
                    />
                  ) : (
                    <GoEyeClosed
                      className="w-5 h-5 font-bold text-gray-600"
                      aria-label="Show password"
                    />
                  )}
                </span>
              </div>

              <div className="mb-6">
                <a href="/forget" className="text-blue-600 text-md hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-md text-md font-medium hover:bg-blue-700 transition disabled:bg-blue-400"
              >
                Login
              </button>
            </form>
            <div className="hidden md:flex w-1/2 items-center justify-center p-6 bg-white border-l-2 border-gray-100">
              <img
                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746172201/Frame_ubn3lr.png"
                alt=""
                className="w-full max-w-sm"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Terms of Use and Privacy Policy.
          </p>
        </div>
      </section>
    </>
  );
}
