import React, { useEffect, useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { useMain } from "../../hooks/UseMain";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login, clientLogin, setUser, loading } = useMain();
  const location = useLocation();
  const navigate = useNavigate();
  const [userType, setUserType] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);

  const [value, setValue] = useState({
    email: "",
    password: "",
    employeeCode: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("hrms_user");
    const role = JSON.parse(localStorage.getItem("hrms_token"));

    if (user && location.pathname === "/login") {
      if (role && role.role) {
        if (role.role === "Client") navigate("/client");
        else if (role.role === "HR") navigate("/hrDash");
        else if (role.role === "EMPLOYEE") navigate("/employeeDash");
        else navigate("/adminDash/HRM");
      }
    }
  }, [location.pathname, navigate]);

  const adminLogin = (e) => {
    e.preventDefault();
    setValue({
      email: "",
      password: "",
      employeeCode: "",
    });
  };
  const userLogin = (e) => {
    e.preventDefault();
    setValue({
      email: "",
      password: "",
      employeeCode: "",
    });
  };

  const clientsLogin = (e) => {
    e.preventDefault();
    setValue({
      email: "",
      password: "",
      employeeCode: "",
    });
  };
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value.trim("") });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userType === 'client') {
      const ans = await clientLogin(value.email.trim(""), value.password);
      console.log("Client Login Response: ", ans);
      console.log(ans?.data?.client);

      if (ans.status) {
        setUser(ans.user);
        localStorage.setItem("hrms_user", JSON.stringify(ans?.data?.client));
        // localStorage.setItem("hrms_permission", JSON.stringify(ans?.user?.PermissionRole || {}));
        localStorage.setItem(
          "hrms_token",
          JSON.stringify({
            token: ans?.data?.token,
            role: ans?.data?.client?.Role,
          })
        );
        // props.setAlert("success", ans.message);
        // alert("success")
        if (ans.data.client.Role === "Client") {
          navigate("/client");
        }
      } else {
        // props.setAlert("error", ans.message);
      }
    } else {
      let ans = await login(value);
      console.log("ans ", ans?.PermissionRole);

      if (ans.success) {
        setUser(ans.user);
        localStorage.setItem("hrms_user", JSON.stringify(ans?.user));
        localStorage.setItem(
          "hrms_permission",
          JSON.stringify(ans?.user?.PermissionRole || {})
        );
        localStorage.setItem(
          "hrms_token",
          JSON.stringify({
            token: ans.token,
            role: ans?.user?.role,
          })
        );

        if (ans.user.role === "HR") {
          navigate("/hrDash");
        } else if (ans.user.role === "EMPLOYEE") {
          navigate("/employeeDash");
        } else {
          navigate("/adminDash/HRM");
        }
        // toast.success(ans?.message)
        // props.setAlert("success", ans.message);
      } else {
        // props.setAlert("error", ans.message);
      }
    }
  };

  return (
    <>
      <section className="bg-gray-100 min-h-screen">
        <div className="flex items-center justify-center p-5 py-12 xl:p-24 xl:py:24">
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
                <div className="flex border rounded-md mb-6 overflow-x-scroll lg:overflow-x-hidden w-webkit-fill-available lg:w-fit">
                  <span
                    onClick={() => {
                      setUserType("admin");
                      adminLogin;
                    }}
                    className={`px-6 py-2 text-md font-normal cursor-pointer ${
                      userType === "admin"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    Admin
                  </span>
                  <span
                    onClick={() => {
                      setUserType("employee");
                      userLogin;
                    }}
                    className={`px-6 py-2 text-md font-medium cursor-pointer ${
                      userType === "employee"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    Employee
                  </span>
                  <span
                    onClick={() => {
                      setUserType("client");
                      clientsLogin;
                    }}
                    className={`px-6 py-2 text-md font-normal cursor-pointer ${
                      userType === "client"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    Client
                  </span>
                </div>

                {userType === "admin" ? (
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={value.email}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 mb-4 border rounded-md text-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-700 bg-gray-200"
                  />
                ) : userType === "employee" ? (
                  <input
                    type="text"
                    name="employeeCode"
                    onChange={handleChange}
                    value={value.employeeCode}
                    placeholder="Employee Code"
                    className="w-full px-4 py-3 mb-4 border rounded-md text-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-700 bg-gray-200"
                  />
                ) :  userType === "client" ? (
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={value.email}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 mb-4 border rounded-md text-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-700 bg-gray-200"
                  />
                ): null}
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
                <a href="#" className="text-blue-600 text-md hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-md text-md font-medium hover:bg-blue-700 transition"
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
