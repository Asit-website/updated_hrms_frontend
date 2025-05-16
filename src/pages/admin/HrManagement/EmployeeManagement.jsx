
import React, { useState, useEffect } from "react";

import "react-calendar/dist/Calendar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useMain} from '../../../hooks/UseMain'

import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import OutsideClickHandler from "react-outside-click-handler";


const EmployeeManagement = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {

  const navigate = useNavigate();

  let todayDate = new Date().toLocaleDateString('en-GB');

  const { user, getUsers, getActivitiesByUser, deleteUser, getDepartments, getDesignations } = useMain();

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const [currentTab, setCurrentTab] = useState("active")


  const filteredData = data.filter((item) => 
    item.designation !== "CEO" &&
    item._id !== user._id &&
    (currentTab === "active" ? item.isDeactivated === "No" : item.isDeactivated === "Yes")
  );
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));

  const { role } = hrms_user;
  const { employeeManageEditPermission, employeeManageActivatePermission } = hrms_permission;

  const [allData, setAllData] = useState([]);

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [currView, setCurrView] = useState(-1);

  const [filters, setFilters] = useState({
    department: "Department",
    designation: "Designation",
    employeeType: "Employee Type"
  })

  const [department, setDepartment] = useState([]);

  const [designation, setDesignation] = useState([]);

  const fetchDesig = async () => {
    const ans = await getDesignations();
    setDesignation(ans?.data);
  }

  const getData = async () => {
    const ans = await getUsers();
    const reversedData = ans?.data?.slice().reverse();
    setAllData(reversedData);
    setData(reversedData);
  };

  const getDep = async () => {
    const ans = await getDepartments();
    setDepartment(ans?.data);
  }

  const getData1 = async (date) => {
    const data = await getActivitiesByUser(date, '', '', 0, 10, '');
  };

  const deleteUser1 = async (id, isDeact) => {

    confirmAlert({
      title: `Are you sure you want to ${isDeact ? "Activate" : "Deactivate"} this Person?`,
      buttons: [
        {
          label: `${isDeact ? "Activate" : "Deactivate"}`,
          style: {
            background: "#DD3409"
          },
          onClick: async () => {
            await deleteUser(id);
            toast.success(`${isDeact ? "Activate" : "Deactivate"} Successfully`);
            setRefreshFlag(!refreshFlag);
            getData();
          }
        },
        {
          label: 'Cancel',
          style: {
            background: "none",
            border: "1px solid #0B56E4",
            color: "#0B56E4",
          },
          onClick: () => null
        }
      ]
    });

  };

  const filterHandler = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  useEffect(() => {
    getData();
    fetchDesig();
    getDep();
  }, [refreshFlag]);

  useEffect(() => {
    getData1(todayDate);
  }, []);

  useEffect(() => {
    const completeData = [...allData];

    const filterData = completeData.filter((data) => {
      return (
        (filters.department === "Department" || data.department === filters.department) &&
        (filters.designation === "Designation" || data.designation === filters.designation) &&
        (filters.employeeType === "Employee Type" || data.EmployeeType === filters.employeeType)
      );
    });

    setCurrentPage(1);
    setData(filterData);
  }, [filters.department, filters.designation, filters.employeeType]);

  const [checkInpId, setCheckInpId] = useState([]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  };

  const srchEmpFunction = (e) => {
    const value = e.target.value;
    setCurrentPage(1);
    if (value === "") {
      setData(allData);
    }
    else {
      const completeData = [...allData];
      console.log("comp;ete", completeData);
      const filter = completeData.filter((data) => data?.fullName?.toLowerCase()?.includes(value.toLowerCase()));
      console.log("filter", filter);
      setData(filter);
    }
  }

  const checkallinput = () => {
    const idList = allData.map((d) => d?._id);
    setCheckInpId(idList);
  };


  return (
    <>
      <div className="employee-dash h-full">
    

        
        <div className="tm">
         

          <div className="pt-8 pr-5 pb-8 pl-[14px] relative w-full">
            <div className="flex-col">

              {/* first  */}

              <div className="flex items-center justify-between flex-col gap-3 md:flex-row">

                <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px] text-left">Employee Management</h2>



                {/* right  */}
                <div className="flex gap-[16px] items-center">
                  <NavLink to="/adminDash/EmployeeMan"><button className="ddBtn flex items-center min-h-[40px] px-[16px] py-[10px] pl-[12px] gap-[10px] border-none rounded-[10px] bg-[#0B56E4]">
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747388185/pp_ah1fdx.png" alt="" />
                    <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left text-white">Add Employee</span>
                  </button></NavLink>
                  {/* <img src={f} alt="" /> */}
                </div>



              </div>

              {/* filter section  */}
              <section className="w-full h-[48px] rounded-[10px] bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)] mt-[20px] flex items-center px-[12px] gap-[20px] overflow-x-scroll xl:overflow-x-hidden">

                <h3 className="text-[14px] font-semibold leading-[20px] tracking-[0.0025em] text-left text-[#2B2B2B] min-w-max">Filter by</h3>
                <p className="h-full w-[1px] bg-[#B3CBF7]" />
                
                <select name="employeeType" className="employetypeselect bg-transparent border-0 outline-none w-[150px] text-[14px] font-normal text-[#0F141C]" value={currentTab} onChange={(e)=>setCurrentTab(e.target.value)} id="">
                  <option value="active">Active Employee</option>
                  <option value="deactive">Deactive Employee</option>
                </select>

                <p className="h-full w-[1px] bg-[#B3CBF7]" />

                <select name="department" className="employetypeselect bg-transparent border-0 outline-none w-[150px] text-[14px] font-normal text-[#0F141C]" onChange={filterHandler} id="">
                  <option value="Department">Department</option>
                  {
                    department?.map((val, index) => {
                      return <option key={index} value={val?.name}>{val?.name}</option>
                    })
                  }
                </select>

                <p className="h-full w-[1px] bg-[#B3CBF7]" />

                <select name="designation" className="employetypeselect bg-transparent border-0 outline-none w-[150px] text-[14px] font-normal text-[#0F141C]" onChange={filterHandler} id="">
                  <option value="Designation">Designation</option>
                  {
                    designation?.map((val, index) => {
                      return <option key={index} value={val?.name}>{val?.name}</option>
                    })
                  }
                </select>




                <p className="h-full w-[1px] bg-[#B3CBF7]" />
                <select name="employeeType" className="employetypeselect" onChange={filterHandler} id="">
                  <option value="Employee Type">Employee Type</option>
                  <option value="Full-time Employees">Full-time Employees</option>
                  <option value="Intern Employees">Intern Employees</option>
                  <option value="Freelancer Employees">Freelancer Employees</option>
                </select>
              </section>


              {/* second */}
              <div className="flex justify-between mt-[10px] mb-[10px]">
                <p className="pt-6 pb-2 text-[#1B2533] text-[12px] font-medium leading-[16px] tracking-[0.004em] text-left">Total Records {data?.length}</p>
              </div>
              <main className="flex flex-col w-full bg-white py-4 border border-[#E8E9EB] rounded-[10px] overflow-x-scroll">

                <div className="border-b border-[#E8E9EB] h-[44px]">

                  <div className="flex items-center justify-between pl-[16px] pr-[16px]">
                    <p className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">All Employee</p>

                    <div className="flex gap-[10px] items-center cursor-pointer">

                      <input type="text" placeholder="Search..." className="border border-[#D0D4DC] w-[200px] px-2.5 h-[38px] rounded-[10px]" onChange={(e) => srchEmpFunction(e)} />
                    </div>
                  </div>

                </div>

                <div className="relative w-full bg-white overflow-x-scroll md:overflow-visible">

                  <table className="w-full text-sm text-gray-700">

                    <thead className="bg-white font-semibold">
                      <tr>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap ">
                          ID
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          EMPLOYEE NAME
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          EMAIL
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          DEPARTMENT
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          DESIGNATION
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        </th>

                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          ACTION
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        paginatedData.filter(x => x.designation !== "CEO" && x._id !== user._id)?.map((item, index) => (
                          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                            <th scope="row" className="px-6 py-4 text-gray-800"><span className="index cursor-pointer">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </span> </th>
                            <td className="px-6 py-4 text-gray-800">{item?.fullName}</td>
                            <td className="px-6 py-4 text-gray-800">{item?.email}</td>
                            <td className="px-6 py-4 text-gray-800">{item?.department}</td>
                            <td className="px-6 py-4 text-gray-800">{item?.designation}</td>
                            <td className="px-6 py-4 text-gray-800">{item?.joiningDate}</td>

                            <OutsideClickHandler
                              onOutsideClick={() => {
                                if (index == currView) {
                                  setCurrView(-1);
                                }
                              }}
                            >
                              <div className="viewOnwWRAP">

                                <td onClick={() => {
                                  if (index == currView) {
                                    setCurrView(-1);
                                  }
                                  else {
                                    setCurrView(index)
                                  }
                                }} className="px-6 py-4 taskAns cursor-pointer relative"><img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747388144/actions_vwxpah.png" alt="" />
                                </td>


                                {
                                  index == currView &&

                                  <div className="absolute -top-[65px] min-w-[120px] border-t border-[#E3E3E3] flex flex-col shadow-[0_4px_12px_0_rgba(26,26,26,0.2)] py-2 gap-[5px] rounded-tl-[8px] z-[1000] bg-white right-[75px]">
                                    {/* first  */}
                                    <div onClick={() => navigate("/adminDash/EmployeeDetails", { state: item?._id })} className="flex gap-2 items-center px-2 cursor-pointer">
                                   
                                      <FaRegEye className="text-[18px]"/>
                                      <p className="text-left">View</p>
                                    </div>

                                    <hr />

                                    {/* second */}
                                    {
                                      (employeeManageEditPermission || role === "ADMIN") &&

                                      <div onClick={() => {
                                        navigate(`/adminDash/EmployeeMan/${item._id}`);
                                      }} className="flex gap-3 items-center px-2 cursor-pointer">
                                        {/* <img src={edit22} alt="" /> */}
                                        <MdOutlineEdit className="text-[18px]"/>
                                        <p className="text-left">Edit </p>
                                      </div>

                                    }

                                    <hr />

                                    {/* third */}
                                    {
                                      (employeeManageActivatePermission || role === "ADMIN") &&

                                      <div onClick={() => {
                                        deleteUser1(item?._id, item?.isDeactivated === "Yes");
                                      }} className="flex gap-3 items-center px-2 cursor-pointer">
                                        {/* <img src={deleted} alt="" /> */}
                                        <MdDeleteOutline className="text-[18px]"/>
                                        <p className="text-left "> {item?.isDeactivated === "Yes" ? "Activate" : "Deactivate"} </p>
                                      </div>
                                    }
                                  </div>

                                }
                              </div>
                            </OutsideClickHandler>
                          </tr>
                        ))
                      }



                    </tbody>

                  </table>
                </div>

              </main>


            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2.5 mt-5">
                <button className={`w-[100px] h-[40px] gap-2.5 rounded-[10px] border border-[#D8D8D8] bg-white text-[#2B2B2B] text-[12px] font-medium leading-[16px] tracking-[0.004em] text-center ${currentPage !== 1 && "putthehovebtn"} disabled:bg-gray-200`} onClick={() => {
                  handlePageChange(currentPage - 1);
                  scrollToTop();
                }} disabled={currentPage === 1}>
                  Previous
                </button>
                <span className="pagenum">Page {currentPage} of {totalPages}</span>
                <button className={`w-[100px] h-[40px] gap-2.5 rounded-[10px] border border-[#D8D8D8] bg-white text-[#2B2B2B] text-[12px] font-medium leading-[16px] tracking-[0.004em] text-center ${currentPage !== totalPages && "putthehovebtn"} disabled:bg-gray-200`} onClick={() => {
                  handlePageChange(currentPage + 1)
                  scrollToTop();

                }} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeManagement;
