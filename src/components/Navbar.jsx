import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMain } from '../hooks/UseMain';

const Navbar = ({ showSidebar, setShowSidebar }) => {
  const { allEmployee, getDepartments, getBranchs } = useMain()
  const currentUser = JSON.parse(localStorage.getItem('hrms_user'));
  const { fullName, email, profileImage } = currentUser;
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate('/login');
  };

  useEffect(() => {
    allEmployee();
    getDepartments();
    getBranchs();
  }, [])
  return (

    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1720px] flex flex-wrap items-center justify-between mx-auto p-4 md:px-8">
        <img
          src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1739012691/logo_zckmvw.png"
          className="w-40"
          alt="KushelDigi Logo"
        />
        <div className="relative flex items-center gap-1 md:gap-5 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-10 h-10 rounded-full"
              src={profileImage}
              alt="user photo"
            />
          </button>

          <button className=" bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white md:hidden" onClick={() => setShowSidebar(!showSidebar)}>{showSidebar ? <RxCross2 fontSize={21} /> : <GiHamburgerMenu fontSize={21} />}</button>
           {dropdownOpen && (
            <div className="absolute right-0 top-7 border border-gray-300 z-50 w-48 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{fullName}</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{email}</span>
              </div>
              <ul className="py-2">
                <li>
                  <NavLink to="/adminDash/mySelf" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">MySelf</NavLink>
                </li>
                <li>
                  <NavLink to="/adminDash/Permission" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Permission </NavLink>
                </li>
                <li>
                  <p onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">Log out</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
