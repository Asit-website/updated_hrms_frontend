import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useMain } from '../../hooks/UseMain';

const Create = ({ setAlert }) => {
const { forgetPassword2, loading } = useMain();
  const location = useLocation()

  const [value, setValue] = useState({
    password: '',
    password1: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.password === value.password1) {
      const ans = await forgetPassword2({ email: location.state.email, otp:location.state.otp, password: value.password });

      if (ans.success) {
        localStorage.removeItem('hrms_token');
        localStorage.removeItem('hrms_user');
        localStorage.removeItem('kds-reset-email');
        setAlert('success', ans.message);
        navigate('/login');
      }
    }
    else {
      setAlert("error", "Password and confirm Password must be same");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between px-4 pt-6 pb-4 relative">

      {/* Back Button */}
      <div className="absolute top-8 left-5 md:left-24">
        <button onClick={() => navigate("/login")} className="flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746183920/Buttons_rfwzs7.png"
            alt="Back"
          />
        </button>
      </div>

      {/* Form Section */}
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
              Create your password
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Please create a new password to secure your account.
            </p>

            <label htmlFor="password" className="block mb-5">
              <input
                type="password"
                placeholder="New Password"
                name="password"
                id="password"
                onChange={handleChange}
                value={value.password}
                required
                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 placeholder:text-gray-700 font-normal text-base"
              />
            </label>

            <label htmlFor="password1" className="block mb-10">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password1"
                id="password1"
                onChange={handleChange}
                value={value.password1}
                required
                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 placeholder:text-gray-700 font-normal text-base"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Continue'
              )}
            </button>

          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm">Terms of Use and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default Create;
