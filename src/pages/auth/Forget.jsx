import React, { useState } from "react";
import { useMain } from "../../hooks/UseMain";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ({setAlert}) => {
   const navigate = useNavigate();
  const { forgetPassword,loading } = useMain();
    const [value, setValue] = useState({
    employeeCode: '',
    email: '',
  });
    const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
    const handleSubmit = async (e) => {
    e.preventDefault();
    let ans = await forgetPassword(value);
    if (ans.success) {
      localStorage.setItem('kds-reset-email', ans.email);
      navigate("/forget1", {
        state: { email: value.email }
      });
      setAlert("success", ans.message);

    }else {
      setAlert("error", ans.message);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between px-4 pt-6 pb-4 relative">
      
      <div className="absolute top-8 left-5 md:left-24">
       <a href="/login
       ">
         <button className="flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746183920/Buttons_rfwzs7.png"
            alt="arrow"
          
          />
        </button>
       </a>
      </div>

        <div className="flex items-center justify-center flex-1">

            <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded-lg p-11 w-full max-w-lg">
         
          <div className="flex items-center space-x-3 mb-6">
            <img
              src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746172201/Kds_logo_1_1_qj1mca.png"
              alt="Kushel Digi Logo"
            />
          </div>

       
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Forgotten your password?
          </h2>

          
          <p className="text-sm text-gray-600 mb-4">
            There is nothing to worry about, we'll send you a message to help you reset your password.
          </p>

       <input
            type="text"
            placeholder="Employee Code"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-700 font-normal text-base"
            onChange={handleChange} name="employeeCode" value={value.employeeCode}
          />
          <input
            type="email"
            placeholder="info@kushel.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-700 font-normal text-base"
            onChange={handleChange} name="email" value={value.email}
          />

         
          <button
            type='submit' disabled={loading} className="yui flex justify-center items-center p-2 bg-blue-500 text-white rounded-lg w-full transition-all duration-300 ease-in-out">
                  {loading ? ( <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>)
                  : ('Send Reset Link')}
         
          </button>
        </div>
        </form>
      </div>


      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm">Terms of Use and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default ForgotPassword;

