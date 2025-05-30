
import React, { useState, useEffect } from "react";

import "react-calendar/dist/Calendar.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import {toast} from "react-toastify";
import { useMain } from "../../../hooks/UseMain";
import { useClickOutside } from "../../../hooks/useClickOutside";


const DeactivateEmployee = () => {

  const navigate = useNavigate();
  const location = useLocation();

  let todayDate = new Date().toLocaleDateString('en-GB');

  const { user, getUsers, getActivitiesByUser, deleteUser, getDepartments, getDesignations } = useMain();

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const filteredData = data.filter((item) => item.designation !== "CEO" && item._id !== user._id && item?.isDeactivated == "Yes");
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

  const ref = useClickOutside(()=>{
    setCurrView(-1);
  })

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
      <div className="employee-dash h-full ">
        
        <div className="w-full ">
         
          <div className="pt-8 pr-5 pb-8 pl-[20px] relative w-full
">
            <div className="flex-col">

              {/* first  */}

              <div className="flex items-center justify-between flex-col lg:flex-row">

                {location.state ? (<div className="flex flex-row gap-2 justify-between items-center">

                  <NavLink to={`/adminDash/HRM`}>
                    <h2 className="hover:text-[#1567FF] cursor-pointer text-xl ">Dashboard</h2>
                  </NavLink>
                  <span>
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747743027/chevron_right_ztbdvq.png" alt="" />
                  </span>
                  <span className="text-[#1567FF] cursor-pointer">Deactivate Employee Management</span>
                </div>) : (<h2 className="hrmHed text-[20px] font-normal leading-[24px] tracking-normal mb-5 lg:mb-0 md:text-left text-[#060606] text-center
">Deactivate Employee Management</h2>)}

                {/* right  */}
                <div className="flex gap-[16px] items-center">
                  <NavLink to="/adminDash/EmployeeMan"><button className="ddBtn flex items-center min-h-[40px] pt-[10px] pr-4 pb-[10px] pl-3 gap-[10px] border-0 rounded-[10px] bg-[#0B56E4] text-white">
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747822006/pp_oq2j4i.png" alt="" />
                    <span>Add Employee</span>
                  </button></NavLink>
                  {/* <img src={f} alt="" /> */}
                </div>

              </div>

              {/* filter section  */}
              <section className="w-full h-[48px] rounded-[10px] mt-[20px] flex items-center px-3 gap-[20px] bg-gradient-to-tr from-[#D1E8FD] to-[#EDEFFF] overflow-x-scroll lg:overflow-x-hidden
">
    

                <h3 className="text-[14px] font-semibold leading-[20px] tracking-[0.0025em] text-left text-[#2B2B2B] min-w-fit">Filter by</h3>

                <p className="line h-full w-[1px] bg-[#B3CBF7]"/>

                <select 
                className="bg-transparent border-0 outline-none w-[150px] text-[14px] font-normal text-[#0F141C]
"
                name="department" onChange={filterHandler} id="">
                  <option value="Department">Department</option>
                  {
                    department?.map((val, index) => {
                      return <option key={index} value={val?.name}>{val?.name}</option>
                    })
                  }
                </select>

                <p className="line  h-full w-[1px] bg-[#B3CBF7]"/>

                <select
                className="bg-transparent border-0 outline-none w-[150px] text-[14px] font-normal text-[#0F141C]
"
                name="designation" onChange={filterHandler} id="">
                  <option value="Designation">Designation</option>
                  {
                    designation?.map((val, index) => {
                      return <option key={index} value={val?.name}>{val?.name}</option>
                    })
                  }
                </select>

                <p className="line h-full w-[1px] bg-[#B3CBF7]" />


                <select 
                
                name="employeeType" className="employetypeselect bg-transparent border-0 outline-none w-[150px] text-[14px] font-normal text-[#0F141C]
" onChange={filterHandler} id="">
                  <option value="Employee Type">Employee Type</option>
                  <option value="Full-time Employees">Full-time Employees</option>
                  <option value="Intern Employees">Intern Employees</option>
                  <option value="Freelancer Employees">Freelancer Employees</option>
                </select>


                <p className="line h-full w-[1px] bg-[#B3CBF7]" />

              </section>


              {/* second */}

              <p className="pt-6 pb-2 text-[#1B2533] text-[12px] font-medium leading-[16px] tracking-[0.004em] text-left
">Total Records {data?.length}</p>

              <main className="flex flex-col w-full bg-white py-4 border border-[#E8E9EB] rounded-[10px]
">

                <div className="border-b border-[#E8E9EB] h-[44px]
">

                  <div className="flex items-center justify-between px-4
">
                    <p className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left
">All Employee</p>
                  </div>

                </div>

                <div className="relative  overflow-x-scroll w-full min-h-[220px]">

                  <table className="w-full table1 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                    <thead className="text-xs uppercase textALLtITL ">
                      <tr>
                       
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          EMPLOYEE NAME
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          EMAIL
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          DEPARTMENT
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          DESIGNATION
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          DATE OF JOIN
                        </th>

                        <th scope="col" className="px-6 py-3 taskTitl ">
                          ACTION
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        paginatedData.filter(x => x.designation !== "CEO" && x._id !== user._id && x.isDeactivated == "Yes")?.map((item, index) => (
                          <tr key={index} className="bg-white border-b fdf">
                           
                            <th scope="row" className="px-6 py-4   "><span className="index cursor-pointer">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </span> </th>
                            <td className="px-6 py-4 taskAns">{item?.fullName}</td>
                            <td className="px-6 py-4 taskAns">{item?.email}</td>
                            <td className="px-6 py-4 taskAns">{item?.department}</td>
                            <td className="px-6 py-4 taskAns">{item?.designation}</td>
                            <td className="px-6 py-4 taskAns">{item?.joiningDate}</td>

                            <div className="viewOnwWRAP relative">

                                <td onClick={() => {
                                  if (index == currView) {
                                    setCurrView(-1);
                                  }
                                  else {
                                    setCurrView(index)
                                  }
                                }} className="px-6 py-4 taskAns cursor-pointer"><img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747813854/actions_nwb36s.png" alt="" /></td>


                                {
                                  index == currView &&

                                  <div ref={ref} className="absolute -top-[65px] min-w-[120px] h-fit flex flex-col shadow-lg py-2 gap-[5px] rounded-tl-[8px] bg-white right-[75px] z-[1000] border border-[#E3E3E3]
">
                                    {/* first  */}
                                    <div onClick={() => navigate("/adminDash/EmployeeDetails", { state: item?._id })} className="flex gap-1 p-[5px] cursor-pointer
">
                                      <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747821812/bx-happy-heart-eyes_fdzdmf.png" alt="" />
                                      <p>View</p>
                                    </div>

                                    <hr />

                                    {/* second */}
                                    {
                                      (employeeManageEditPermission || role === "ADMIN") &&

                                      <div onClick={() => {
                                        navigate(`/adminDash/EmployeeMan/${item._id}`);
                                      }} className="flex gap-1 p-[5px] cursor-pointer
">
                                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747814038/edit22_gcmjla.png" alt="" />
                                        <p>Edit </p>
                                      </div>

                                    }

                                    <hr />

                                    {/* third */}
                                    {
                                      (employeeManageActivatePermission || role === "ADMIN") &&

                                      <div onClick={() => {
                                        deleteUser1(item?._id, item?.isDeactivated === "Yes");
                                      }} className="flex gap-1 p-[5px] cursor-pointer
">
                                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747481374/frema_ayb4lq.svg" alt="" />
                                        <p className="deel"> {item?.isDeactivated === "Yes" ? "Activate" : "Deactivate"} </p>
                                      </div>
                                    }
                                  </div>

                                }
                              </div>
                          </tr>
                        ))
                      }



                    </tbody>

                  </table>
                </div>

              </main>


            </div>

         {
          currentPage > 1 && (
            <div className="emPaginate">
            <button className={`prepaginate ${currentPage !== 1 && "putthehovebtn"} disabled:bg-gray-200`} onClick={() => {
              handlePageChange(currentPage - 1);
              scrollToTop();
            }} disabled={currentPage === 1}>
              Previous
            </button>
            <span className="pagenum">Page {currentPage} of {totalPages}</span>
            <button className={`prepaginate ${currentPage !== totalPages && "putthehovebtn"} disabled:bg-gray-200`} onClick={() => {
              handlePageChange(currentPage + 1)
              scrollToTop();

            }} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
          )
         }
          </div>
        </div>
      </div>
    </>
  );
};

export default DeactivateEmployee;
