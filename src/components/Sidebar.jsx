import React, { useState } from "react";
import { FaAngleDown, FaTasks } from "react-icons/fa";
import { GrSettingsOption } from "react-icons/gr";
import {
  MdAssessment,
  MdDashboard,
  MdLeaderboard,
  MdManageAccounts,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const [showLeadLi, setShowLeadLi] = useState(false);
  const [showTaskLi, setShowTaskLi] = useState(false);
  const [openAssets, setOpenAssets] = useState(
    sessionStorage.getItem("adminAssetsManagement") === "true"
  );
  const [assetsItem, setAssetsItem] = useState(null);
  const assestspage = [
    {
      title: "Assests Management",
      link: "/performance/Assets",
    },
    {
      title: "Items",
      link: "/adminDash/HRM/Expense",
    },
  ];
  const [openHr, setOpenHr] = useState(false);
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
              <a
                href="#"
                className="flex items-center p-2 py-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdDashboard />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <hr />
            <li>
              <a
                href="#"
                className="flex items-center p-2 py-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdLeaderboard />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Lead Management
                </span>
                <span onClick={() => setShowLeadLi(!showLeadLi)}>
                  <FaAngleDown
                    className={`transition-all ${
                      showLeadLi ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </a>
            </li>
            <hr />
            {showLeadLi && (
              <div className="pl-4">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 py-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <MdDashboard />
                    <span className="ms-3">Lead</span>
                  </a>
                </li>
                <hr />
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 py-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <MdDashboard />
                    <span className="ms-3">Lead System Setting</span>
                  </a>
                </li>
                <hr />
              </div>
            )}
            <li>
              <a
                href="#"
                className="flex items-center p-2 py-3  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaTasks />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Task Management
                </span>
                <span onClick={() => setShowTaskLi(!showTaskLi)}>
                  <FaAngleDown
                    className={`transition-all ${
                      showTaskLi ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </a>
            </li>
            <hr />
            {showTaskLi && (
              <div className="pl-4">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 py-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <MdDashboard />
                    <span className="ms-3">Clients</span>
                  </a>
                </li>
                <hr />
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 py-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <MdDashboard />
                    <span className="ms-3">Projects</span>
                  </a>
                </li>
                <hr />
              </div>
            )}
            <li>
              <a
                href="#"
                className="flex items-center p-2 py-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdManageAccounts />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Hr Management
                </span>
              </a>
            </li>
            <hr />
            {/* <li>
                            <a href="#" className="flex items-center p-2 py-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <MdAssessment />
                                <span className="flex-1 ms-3 whitespace-nowrap">Assets</span>
                            </a>
                        </li> */}
            <div
              onClick={() => {
                setOpenAssets((prev) => !prev);
                sessionStorage.setItem("adminAssetsManagement", !openAssets);
              }}
              className="flex items-center justify-between w-full h-[44px] cursor-pointer ml-0 px-[10px]"
            >
              <div className="flex items-center gap-3">
                <img
                  src={`${
                    window.location.pathname === "/performance/Assets" ||
                    window.location.pathname === "/adminDash/HRM/Expense"
                      ? "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746867422/analytics_hjcdw1.svg"
                      : "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746867455/anal_iwhmpq.svg"
                  }`}
                  alt="assets-icon"
                />
                <p
                  className={`text-[16px] font-medium leading-[18px] tracking-[0px] text-left ${
                    window.location.pathname === "/performance/Assets" ||
                    window.location.pathname === "/adminDash/HRM/Expense" ||
                    openAssets
                      ? "semo"
                      : "none"
                  }`}
                >
                  Assets
                </p>
              </div>

              <img
                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746867385/vect_gyg2cc.svg"
                alt="toggle-arrow"
              />
            </div>

            {openAssets && (
              <div className="alladminDash-item ml-5 -mt-3">
                {assestspage?.map((item, index) => (
                  <div
                    onClick={() => {
                      setAssetsItem(index);
                      navigate(item?.link);
                      setOpenAssets(true);
                    }}
                    className="flex items-center gap-2 p-2 py-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border-b-[1px] cursor-pointer"
                    key={index}
                  >
                    {assetsItem === index ? (
                      <img
                        src={
                          window.location.pathname === item?.link
                            ? "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746867296/clientsIcon_dlzq3r.svg"
                            : "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746867296/clientsIcon_dlzq3r.svg"
                        }
                        alt=""
                        className="w-6"
                      />
                    ) : (
                      <img
                        src={
                          window.location.pathname === item?.link
                            ? "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746867344/projects_u88awi.svg"
                            : "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746867344/projects_u88awi.svg"
                        }
                        alt=""
                        className="w-5"
                      />
                    )}
                    <p
                      className={`${
                        assetsItem === index
                          ? "text-[16px]"
                          : "text-[16px] font-medium leading-[17px] tracking-[0px] text-left"
                      } ${
                        window.location.pathname === item?.link ? "fan" : ""
                      } lessfontweight`}
                    >
                      {item?.title}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <hr />
            {/* <li>
                            <a href="#" className="flex items-center p-2 py-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <GrSettingsOption />
                                <span className="flex-1 ms-3 whitespace-nowrap">Hr Admin Setup</span>
                            </a>
                        </li> */}

            <div
              onClick={() => {
                setOpenHr((prev) => !prev);
                sessionStorage.setItem("adminHRSetup", !openHr);
              }}
              className="flex items-center justify-between  w-full h-[44px] cursor-pointer ml-0 px-[10px]"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746868302/reading_stkfi2.svg"
                  alt="dasg"
                />
                <p
                  className={`text-[16px] font-medium leading-[18px] tracking-[0px] text-left ${
                    openHr && "fan"
                  }`}
                >
                  Hr Admin Setup
                </p>
              </div>

              <img
                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746867385/vect_gyg2cc.svg"
                alt="vect"
              />
            </div>

            {openHr && (
              <div className="alladminDash-item ml-5">
                {hrAdminItems?.map((item, index) => (
                  <div
                    onClick={() => {
                      setHrItem(index);
                      navigate(item?.link);
                      // setOpenLeaveMan(true);
                    }}
                    className="flex items-center gap-2 p-2 py-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border-b-[1px] cursor-pointer"
                    key={index}
                  >
                    {hrItem == index ? (
                      <img
                        src={`${
                          window.location.pathname === `${item?.link}`
                            ? "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746868460/fiber_m7ucfr.svg"
                            : "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746868499/tyming_y3l9ku.svg"
                        }`}
                        alt=""
                      />
                    ) : (
                      <img
                        src={`${
                          window.location.pathname === `${item?.link}`
                            ? "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746868460/fiber_m7ucfr.svg"
                            : "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746868499/tyming_y3l9ku.svg"
                        }`}
                        alt=""
                      />
                    )}
                    <p
                      className={` ${
                        hrItem === index
                          ? "text-[16px]"
                          : "text-[16px] font-medium leading-[17px] tracking-[0px] text-left"
                      } ${
                        window.location.pathname === `${item?.link}`
                          ? "fan"
                          : ""
                      } lessfontweight`}
                    >
                      {item?.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
