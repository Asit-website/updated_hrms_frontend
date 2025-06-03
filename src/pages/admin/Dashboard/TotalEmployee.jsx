import React from "react";
import "react-calendar/dist/Calendar.css";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMain } from "../../../hooks/UseMain";

const TotalEmployee = () => {
  const { getUsers } = useMain();

  const [data, setData] = useState([])

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;
  const location = useLocation();

  useEffect(() => {
    getData();
  }, []);

  // const getData = async () => {
  //   const ans = await getUsers();
  //   // console.log(ans);
  //   setData(ans.data);
  // };
  const getData = async () => {
    const ans = await getUsers();
    // Filter active employees
    const activeEmployees = ans?.data?.filter(emp => emp.isDeactivated === "No");
    console.log("activeEmployees", activeEmployees);
    setData(activeEmployees);
  };



  return (
    <>
      <div className="employee-dash h-full">
       
        <div className="w-full ">
         

          <div className="pt-[32px] pr-[20px] pb-[32px] pl-[20px] relative w-full
">
            <div className="flex-col">
              {/* first  */}
              <div className="hrmDasTxtFir">
                {/* <p className="hrmHed">Dashboard</p> */}
                {location.state ? (<div className="hrDsPa">
                
                  <NavLink to={`/adminDash/HRM`}>
                    <span className="hover:text-[#1567FF] cursor-pointer text-xl">Dashboard</span>
                  </NavLink>
                  <span>
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747743027/chevron_right_ztbdvq.png" alt="" />
                  </span>{" "}
                  <span className="text-[#1567FF] cursor-pointer">Total Employees</span>
                </div>) : (<p className="hrmHed text-[20px] font-normal leading-[24px] tracking-normal text-left text-[#060606]
">Total Employees</p>)}
              </div>
              {/* second */}
              <main className="grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(275px,1fr))] mt-4">
                {
                  data?.map((employ, index) => (
                    <div key={index} className="bg-white flex flex-col items-center py-4 gap-[15px] bg-grey rounded-xl border-2">

                      <div className="flex flex-col items-center gap-[10px]">

                        <img className="w-[65px] h-[65px] rounded-full object-cover" src={employ?.profileImage ? employ?.profileImage : "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747820097/emplyProfile_tj5hfz.png"} alt="" />
                        <h2 className="text-[16px] font-normal leading-[44px] tracking-[0px] text-left text-[#060606]">{employ?.fullName}</h2>
                        <p className="text-[14px] font-normal leading-[44px] tracking-[0px] text-left text-[#293240]">{employ?.title}</p>
                      </div>

                      <div className="max-w-full w-full flex flex-col bg-[#F8F9FD] pt-[10px] pr-[16px] pb-[10px] pl-[16px] rounded-[3px] gap-[10px]
">
                        <p className="flex gap-[10px] items-center overflow-x-scroll md:overflow-x-hidden"><img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810331/mail_dkyb5n.png" alt="" /> <span>{employ?.email}</span></p>
                        {/* <p><img src={call} alt="" /> <span>{employ?.mobile}</span></p> */}
                        <p className="flex gap-[10px] items-center
">Designation : {employ?.designation}</p>
                      </div>

                      <div className="max-w-full w-full left-[20px] pt-[10px] pr-[13px] pb-[10px] pl-[13px] rounded-[3px] bg-[#F8F9FD] flex flex-col gap-[10px]
">
                        <p className="flex justify-between items-center
">
                          <span className="text-[12px] font-normal tracking-[0px] text-left text-[#293240]
">Department</span>
                          <span className="sns text-[12px] font-normal tracking-[0px] text-left text-[#293240]">{employ?.department}</span>
                        </p>
                        <p className="flex justify-between items-center
">
                          <span className="text-[12px] font-normal tracking-[0px] text-left text-[#293240]
">Date of Joining</span>
                          <span className="sns text-[12px] font-normal tracking-[0px] text-left text-[#293240]">
                            {employ?.joiningDate ? new Date(employ.joiningDate).toISOString().split('T')[0] : ''}
                          </span>

                        </p>
                      </div>

                    </div>
                  ))
                }

              </main>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalEmployee;
