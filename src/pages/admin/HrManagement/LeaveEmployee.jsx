import React from "react";
import "react-calendar/dist/Calendar.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMain } from "../../../hooks/UseMain";

const LeaveEmployee = () => {
  const { fetchTodayLeave } = useMain();
  const [data, setData] = useState([]);
  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  const location = useLocation();
  console.log(location)
  const { role } = hrms_user;

  const getLeavesEmp = async () => {
    const ans = await fetchTodayLeave();

    if (ans?.status) {
      console.log("today leave", ans?.data)
      setData(ans?.data);
    }
  };

  useEffect(() => {
    getLeavesEmp();
  }, []);

  return (
    <>
      <div className="employee-dash h-full">

        <div className="w-full  ">

          <div className="pt-[32px] pr-[20px] pb-[32px] pl-[24px] relative min-h-[calc(100vh_-_83px)] w-full">
            <div className="flex-col">
              {/* First */}
              <div className="flex flex-col gap-2 max-w-[1440px] w-full mx-auto">
                <p className="text-[20px] font-normal leading-[24px] tracking-normal text-left text-[#060606]">Employees on Leave</p>
              </div>

              {/* Second */}
              <div className={`${data.length > 0 ? "" : "flex w-full h-[70vh] items-center justify-center"}`}>
                {
                  data.length > 0 ? (
                    <main className="grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(275px,1fr))] mt-4">
                      {data?.length > 0 && data?.map((employ, index) => (
                        <div key={index} className="rounded-[10px] bg-white flex flex-col items-center py-4 px-4 gap-[15px] max-w-[350px] w-full">
                          <div className="flex flex-col items-center gap-[10px]">
                            <img
                              className="w-[65px] h-[65px] rounded-full"
                              src={
                                employ?.user?.profileImage
                                  ? employ?.user?.profileImage
                                  : "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747467977/emplyProfile_xumpiq.png"
                              }
                              alt=""
                            />
                            <h2 className="text-[16px] font-normal tracking-[0px] text-left text-[#060606]">{employ?.user?.fullName}</h2>
                            <p className="text-[14px] font-normal tracking-[0px] text-left text-[#293240]">{employ?.user?.department}</p>

                            <button className="bg-[#E9002A] w-[90px] h-[30px] rounded-[3px]">
                              <span className="text-[14px] font-normal leading-[28px] tracking-[0px] text-left text-white">Inactive</span>
                            </button>
                          </div>

                          <div className="flex gap-2.5 items-center">
                            <p className="flex gap-4 items-center">
                              <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747468019/mail_y0yekf.png" alt="" />{" "}
                              <span>{employ?.user?.email}</span>
                            </p>
                          </div>

                          <div className="w-full left-[20px] p-[10px_13px] rounded-[3px] bg-[#F8F9FD] flex flex-col gap-[10px]">
                            <p className="flex justify-between items-center">
                              <span className="text-[12px] font-normal tracking-[0px] text-left text-[#293240]"> Department</span>
                              <span className="snsL text-[12px] font-normal tracking-[0px] text-left text-[#293240]">{employ?.user?.department}</span>
                            </p>

                            <p className="flex justify-between items-center">
                              <span className="text-[12px] font-normal tracking-[0px] text-left text-[#293240]">Start Date</span>
                              <span className="snsL text-[12px] font-normal tracking-[0px] text-left text-[#293240]">{employ?.startDate}</span>
                            </p>
                            <p className="flex justify-between items-center">
                              <span className="text-[12px] font-normal tracking-[0px] text-left text-[#293240]">End Date</span>
                              <span className="snsL text-[12px] font-normal tracking-[0px] text-left text-[#293240]">{employ?.endDate}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </main>
                  ) : <p className="text-[22px]">No Data Found</p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveEmployee;
