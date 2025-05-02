import React, { useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";

export default function LoginPage() {
  const [userType, setUserType] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
   <section className="bg-gray-100 min-h-screen">
   <div className="flex items-center justify-center p-5 py-12 xl:p-24 xl:py:24">
      <div className="bg-white rounded-2xl shadow-md flex max-w-5xl w-full overflow-hidden">
       
        <div className="w-full md:w-1/2 p-8 md:p-12">
      
          <div className="mb-6 flex items-center space-x-3">
            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746172201/Kds_logo_1_1_qj1mca.png" alt="KDS Logo" className="h-10" />
            
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 mb-6">to access HRMS Dashboard</p>

         
        
 <div>
      <div className="flex border rounded-md mb-6 overflow-hidden w-fit">
        <button
          onClick={() => setUserType("admin")}
          className={`px-6 py-2 text-md font-normal ${
            userType === "admin"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Admin
        </button>
        <button
          onClick={() => setUserType("employee")}
          className={`px-6 py-2 text-md font-medium ${
            userType === "employee"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          Employee
        </button>
      </div>

      {userType === "admin" ? (
        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 mb-4 border rounded-md text-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-700 bg-gray-200"
        />
      ) : (
        <input
          type="text"
          placeholder="Employee Code"
          className="w-full px-4 py-3 mb-4 border rounded-md text-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-700 bg-gray-200"
        />
      )}
    </div>
          <div className="relative w-full mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-md text-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-gray-900 placeholder:text-gray-700 bg-gray-200"
            />
          
            <button
  type="button"
  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? (
    <RxEyeOpen className="w-5 h-5 font-bold text-gray-600" aria-label="Hide password" />
  ) : (
    <GoEyeClosed  className="w-5 h-5 font-bold text-gray-600" aria-label="Show password" />
  )}
</button>
          </div>

          <div className="mb-6">
            <a href="#" className="text-blue-600 text-md hover:underline">
              Forgot Password?
            </a>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-md text-md font-medium hover:bg-blue-700 transition">
            Login
          </button>
        </div>
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
     <p className="text-gray-500 text-sm">Terms of Use and Privacy Policy.</p>
   </div>
   </section>
     
   </>
  );
}