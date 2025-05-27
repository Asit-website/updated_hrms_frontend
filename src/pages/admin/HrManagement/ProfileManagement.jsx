import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


import { useMain } from "../../../hooks/UseMain";

const ProfileManagement = () => {
  const navigate = useNavigate();
  const { getUsers, user } = useMain();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const ans = await getUsers();
    // console.log(ans);
    setData(ans.data);
  };

  const toggleMenu = (index) => {
    document.querySelectorAll(".menus")[index].classList.toggle('hidden');
  };

  return (
    <>
      <div className="employee-dash h-full">
      

        <div className="w-full bg-[#f5f5f5]">
         

          <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full">
            <div className="flex-col">
              <div className="bg-white mx-[5px] py-[35px] rounded-[5px]">

                <div className="main-card flex items-center justify-between overflow-x-scroll">
                  <div className="flex items-center relative z-[2] py-[10px] px-[15px] mx-[25px] max-w-[400px] w-full cursor-pointer mt-[20px]">
                      <div className="absolute top-0 left-0 w-full h-full bg-[#0b60ff] opacity-10 rounded-[10px] -z-10"></div>
                    <NavLink to="/adminDash/EmployeeMan">
                      <div className="main-box1">
                        <div className="relative z-[2] h-[55px] w-[55px] flex flex-col items-center justify-center">
                             <div class="absolute top-0 left-0 w-full h-full bg-[#0b60ff] opacity-15 rounded-[10px] -z-10"></div>
                          <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748347130/person_jhmlip.png" alt="loj" className="block m-auto w-[28px]"/>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/adminDash/EmployeeMan">
                      <div className="ml-[30px]">
                        <h3 className="text-[#000f2b] opacity-80 text-[18.5px] font-bold">Employee Registration</h3>
                      </div>
                    </NavLink>
                  </div>

                  <NavLink to="/adminDash/profile-management" className="flex items-center relative z-[2] py-[10px] px-[15px] mx-[25px] max-w-[400px] w-full cursor-pointer mt-[20px] ">
                    <div className="absolute top-0 left-0 w-full h-full bg-[#0b60ff] opacity-10 rounded-[10px] -z-10"></div>
                    <div className="main-box1">
                      <div className="relative z-[2] h-[55px] w-[55px] flex flex-col items-center justify-center">
                         <div class="absolute top-0 left-0 w-full h-full bg-[#0b60ff] opacity-15 rounded-[10px] -z-10"></div>
                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748347130/person_jhmlip.png" alt="loj" className="block m-auto w-[28px]"/>
                      </div>
                    </div>
                    <div className="ml-[30px]">
                      <h3 className="text-[#000f2b] opacity-80 text-[18.5px] font-bold">Profile Management</h3>
                    </div>
                  </NavLink>

                  <div className="flex items-center relative z-[2] py-[10px] px-[15px] mx-[25px] max-w-[400px] w-full cursor-pointer mt-[20px] ">
                      <div className="absolute top-0 left-0 w-full h-full bg-[#0b60ff] opacity-10 rounded-[10px] -z-10"></div>
                    <div className="main-box1">
                      <div className="relative z-[2] h-[55px] w-[55px] flex flex-col items-center justify-center">
                          <div class="absolute top-0 left-0 w-full h-full bg-[#0b60ff] opacity-15 rounded-[10px] -z-10"></div>
                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748347085/person2_zdmqsw.png" alt="loj" className="block m-auto w-[28px]"/>
                      </div>
                    </div>
                    <div className="ml-[30px]">
                      <h3 className="text-[#000f2b] opacity-80 text-[18.5px] font-bold">Roles Management</h3>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-x-auto mx-[25px] mt-[30px] rounded-[5px]">
                  <table className="min-w-full text-sm text-left bg-white rounded-lg">
                    <thead className="bg-white font-semibold">
                      <tr>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          <h4>S.No</h4>
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          <h4>Employee Name</h4>
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          <h4>Designation</h4>
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          <h4>Reporting manager</h4>
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          <h4>Registration Date</h4>
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          <h4>Employee Code</h4>
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          <h4>Employee Status</h4>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((e, index) => {
                        return (
                          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 text-gray-800 ">
                            <td scope="row" className="px-6 py-4">
                              <p className="sno">{('0' + (index + 1)).slice(-2)}</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className=" flex items-center timer">
                                <img width={28} height={28} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748347464/cg_sournb.png" alt="cg" />
                                <p className="ml-2">{e.fullName}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 timer">
                              <p>{e.designation}</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center timer">
                                <img width={28} height={28} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748347464/cg_sournb.png" alt="cg" />
                                <p className="ml-2">{e.reportingManager}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="reg-date flex items-center">
                                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748347424/celes_gevwub.png" alt="celes" />
                                <div className="ml-2">
                                  <h4>{e.joiningDate}</h4>
                                  {/* <p>10 : 45 AM</p> */}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 timer">
                              <p>KDS{e?.employeeCode}</p>
                            </td>
                            <td className="px-6 py-4 relative cursor-pointer">
                              <div className="flex items-center flex border border-[#ececec] justify-between max-w-[90px] w-full rounded-[3px] py-[4px] px-[10px] relative"
                                onClick={() => toggleMenu(index)}
                              >
                                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748347371/green_bm0lnh.png" alt="green" />
                                <p>{e.status === "OFFLINE" ? "Inactive" : "Active"}</p>
                                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748347251/bottomArrow_dkzxff.png" alt="green" />
                              </div>
                              <div className="absolute z-[1000] right-[15px] -top-[52px] w-[125px] bg-white border border-gray-200 shadow-lg  flex-col menus hidden menu-0">
                                <div onClick={() => {
                                  navigate(`/adminDash/EmployeeMan/${e._id}`);
                                }} className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 ">
                                  <img width={13} height={11} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747814038/edit22_gcmjla.png" alt="" />
                                  <p className="ml-2">Edit</p>
                                </div>
                                <div className="items-center w-full px-4 py-2 text-sm flex gap-2 text-red-600 hover:bg-red-100">
                                  <img
                                    width={11}
                                    height={11}
                                    src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747310323/deli_bn0fs6.svg"
                                    alt=""
                                  />
                                  <p className="ml-2">Delete</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileManagement;
