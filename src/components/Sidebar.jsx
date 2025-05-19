import React, { useState } from "react";
import { FaAngleDown, FaTasks } from "react-icons/fa";
import { GrSettingsOption } from "react-icons/gr";
import {
  MdAssessment,
  MdDashboard,
  MdLeaderboard,
  MdManageAccounts,
} from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const [showLeadLi, setShowLeadLi] = useState(false);
  const [showTaskLi, setShowTaskLi] = useState(false);
  const [showTaskMa, setShowTaskMa] = useState(false);
  const [openAssets, setOpenAssets] = useState(
    sessionStorage.getItem("adminAssetsManagement") === "true"
  );
  const [assetsItem, setAssetsItem] = useState(null);

  const [openHr, setOpenHr] = useState(false);
  const [openLeaveManagement, setLeaveManagement] = useState(false);
    const [payrollManagement, setPayRollManagement] = useState(false);
      const [performaneManagement, setPerformaneManagement] = useState(false);

  const [hrItem, setHrItem] = useState(0);
  const hrAdminItems = [
    {
      title: "Award",
      link: "/adminDash/HRM/AwardHRM",
    },
    {
      title: "Transfer",
      link: "/adminDash/HRM/TransferHRM",
    },
    {
      title: "Regisnation",
      link: "/adminDash/HRM/ResignationHRM",
    },
    {
      title: "Promotion",
      link: "/adminDash/HRM/PromotionHRM",
    },
    {
      title: "Complaints",
      link: "/adminDash/HRM/ComplaintsHRM",
    },
    {
      title: "Warning",
      link: "/adminDash/HRM/WarningHRM",
    },
    {
      title: "Termination",
      link: "/adminDash/HRM/TerminationHRM",
    },
    {
      title: "Holiday",
      link: "/adminDash/HRM/holiday",
    },
    {
      title: "Announcement",
      link: "/adminDash/announcement",
    },
    {
      title: "Announcement",
      link: "/adminDash/announcement",
    },
  ];

  const navigate = useNavigate();
  return (
    <>
      <div
        id="drawer-navigation"
        className={`fixed top-[82px] left-0 z-40 w-80 h-screen p-4 shadow-xl border border-r-2 overflow-y-auto transition-transform bg-white dark:bg-gray-800 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400 md:hidden"
        >
          Menu
        </h5>
        <button
          type="button"
          onClick={() => setShowSidebar(false)}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white md:hidden"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        <div className="py-4 overflow-y-auto">
          <ul className=" font-medium">
            <li>
              <NavLink
                to="/adminDash/HRM"
                className={({ isActive }) =>
                  `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                }
              >
                <MdDashboard
                  className={`${({ isActive }) =>
                    isActive ? "text-[#0B56E4]" : ""}`}
                />
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 py-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdLeaderboard />
                <span
                  onClick={() => setShowLeadLi(!showLeadLi)}
                  className="flex-1 ms-3 whitespace-nowrap"
                >
                  Lead Management
                </span>
                <span>
                  <FaAngleDown
                    className={`transition-all ${
                      showLeadLi ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </a>
            </li>

            {showLeadLi && (
              <div className="pl-4">
                <li>
                  <NavLink
                    to="/adminDash/leadDash"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${isActive ? "bg-[#F5F9FF] text-[#0B56E4]" : "text-black"}`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />

                    <span className="ms-3">Lead</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/adminDash/LeadSystemSetting"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${isActive ? "bg-[#F5F9FF] text-[#0B56E4]" : "text-black"}`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Lead System Setting</span>
                  </NavLink>
                </li>
              </div>
            )}
            <li>
              <a
                href="#"
                className="flex items-center p-2 py-3  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaTasks />
                <span
                  onClick={() => setShowTaskLi(!showTaskLi)}
                  className="flex-1 ms-3 whitespace-nowrap"
                >
                  Task Management
                </span>
                <span>
                  <FaAngleDown
                    className={`transition-all ${
                      showTaskLi ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </a>
            </li>

            {showTaskLi && (
              <div className="pl-4">
                <li>
                  <NavLink
                    to="/adminDash/HRM/taskClients"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${isActive ? "bg-[#F5F9FF] text-[#0B56E4]" : "text-black"}`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Clients</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/adminDash/HRM/taskProjects"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${isActive ? "bg-[#F5F9FF] text-[#0B56E4]" : "text-black"}`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Projects</span>
                  </NavLink>
                </li>
              </div>
            )}

            <li>
              <a
                href="#"
                className="flex items-center p-2 py-3  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaTasks />
                <span
                  onClick={() => setShowTaskMa(!showTaskMa)}
                  className="flex-1 ms-3 whitespace-nowrap"
                >
                  Hr Management
                </span>
                <span>
                  <FaAngleDown
                    className={`transition-all ${
                      showTaskMa ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </a>
            </li>

            {showTaskMa && (
              <div className="pl-4">
                <li>
                  <NavLink
                    to="/adminDash/HRM/employeeManagement"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Employee Management</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/adminDash/HRM/markAttendance"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Attendance Management</span>
                  </NavLink>
                </li>






                <li 
              
                onClick={()=> setLeaveManagement(!openLeaveManagement)}>
                  <p className="flex items-center p-2 py-3 rounded-lg group cursor-pointer hover:bg-gray-100"
                    
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Leave Management setup</span>
                  </p>
                </li>

                {
                openLeaveManagement && (
                  <div className="pl-4">
                      <li>
                  <NavLink
                    to="/adminDash/HRM/LeaveEmployee"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
                      ${
                        isActive
                          ? "bg-[#F5F9FF] text-[#0B56E4]"
                          : "text-black hover:bg-gray-100"
                      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Employees on Leave</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/adminDash/HRM/leaveRequest"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
                      ${
                        isActive
                          ? "bg-[#F5F9FF] text-[#0B56E4]"
                          : "text-black hover:bg-gray-100"
                      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Leave Request</span>
                  </NavLink>
                </li>
                  </div>
                )
                }

               


   <li 
              
                onClick={()=> setPayRollManagement(!payrollManagement)}>
                  <p className="flex items-center p-2 py-3 rounded-lg group cursor-pointer hover:bg-gray-100"
                    
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Payroll Management</span>
                  </p>
                </li>

                {
                payrollManagement && (
                  <div className="pl-4">
                      <li>
                  <NavLink
                    to="/adminDash/setSallary"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
                      ${
                        isActive
                          ? "bg-[#F5F9FF] text-[#0B56E4]"
                          : "text-black hover:bg-gray-100"
                      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Set Salary</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/adminDash/payslip"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
                      ${
                        isActive
                          ? "bg-[#F5F9FF] text-[#0B56E4]"
                          : "text-black hover:bg-gray-100"
                      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Payslip</span>
                  </NavLink>
                </li>
                  </div>
                )
                }




                <li>
                  <NavLink
                    to="/adminDash/documentManagement"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Document Management</span>
                  </NavLink>
                </li>



              
   <li 
              
                onClick={()=> setPerformaneManagement(!performaneManagement)}>
                  <p className="flex items-center p-2 py-3 rounded-lg group cursor-pointer hover:bg-gray-100"
                    
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Performance Setup</span>
                  </p>
                </li>

                {
              performaneManagement && (
                  <div className="pl-4">
                      <li>
                  <NavLink
                    to="/performance/appraisal"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
                      ${
                        isActive
                          ? "bg-[#F5F9FF] text-[#0B56E4]"
                          : "text-black hover:bg-gray-100"
                      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Appraisal</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/performance/goalTracking"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
                      ${
                        isActive
                          ? "bg-[#F5F9FF] text-[#0B56E4]"
                          : "text-black hover:bg-gray-100"
                      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Goal Tracking</span>
                  </NavLink>
                </li>
                  </div>
                )
                }



                <li>
                  <NavLink
                    to="/adminDash/HRM/HRMsystemSetup"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Hr System Setup</span>
                  </NavLink>
                </li>
              </div>
            )}

            <li>
              <a
                href="#"
                className="flex items-center p-2 py-3  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaTasks />
                <span
                  onClick={() => setAssetsItem(!assetsItem)}
                  className="flex-1 ms-3 whitespace-nowrap"
                >
                  Assets
                </span>
                <span>
                  <FaAngleDown
                    className={`transition-all ${
                      assetsItem ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </a>
            </li>

            {assetsItem && (
              <div className="pl-4">
                <li>
                  <NavLink
                    to="/performance/Assets"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Assets Management</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/adminDash/HRM/Expense"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Items</span>
                  </NavLink>
                </li>
              </div>
            )}

            <li>
              <a
                href="#"
                className="flex items-center p-2 py-3  rounded-lg dark:text-white  dark:hover:bg-gray-700 group"
              >
                <FaTasks />
                <span
                  onClick={() => setOpenHr(!openHr)}
                  className="flex-1 ms-3 whitespace-nowrap"
                >
                  Hr Admin Setup
                </span>
                <span>
                  <FaAngleDown
                    className={`transition-all ${openHr ? "rotate-180" : ""}`}
                  />
                </span>
              </a>
            </li>

            {openHr && (
              <div className="pl-4">
                <li>
                  <NavLink
                    to="/adminDash/HRM/AwardHRM"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Award</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/adminDash/HRM/TransferHRM"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Transfer</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/adminDash/HRM/ResignationHRM"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Regisnation</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/adminDash/HRM/PromotionHRM"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Promtion</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/adminDash/HRM/ComplaintsHRM"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Complaints</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/adminDash/HRM/WarningHRM"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Warning</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/adminDash/HRM/TerminationHRM"
                    className="flex items-center p-2 py-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <MdDashboard />
                    <span className="ms-3">Termination</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/adminDash/HRM/holiday"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Holiday</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/adminDash/announcement"
                    className={({ isActive }) =>
                      `flex items-center p-2 py-3 rounded-lg group
      ${
        isActive
          ? "bg-[#F5F9FF] text-[#0B56E4]"
          : "text-black hover:bg-gray-100"
      }`
                    }
                  >
                    <MdDashboard
                      className={`${({ isActive }) =>
                        isActive ? "text-[#0B56E4]" : ""}`}
                    />
                    <span className="ms-3">Announcement</span>
                  </NavLink>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
