import React from "react";
import "react-calendar/dist/Calendar.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { useMain } from "../../../hooks/UseMain";

const data = [
  {
    profile: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810198/emplyProfile_l38lvi.png",
    name: "Surbhi Rajwanshi",
    profession: "Jr.Developer",
    mail: "Surbhi@kusheldigi.com",
    phoneNumber: "9873******",
    department: "Developer",
    dateOfJoin: "02 March,2022"
  },
  {
    profile: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810198/emplyProfile_l38lvi.png",
    name: "Surbhi Rajwanshi",
    profession: "Jr.Developer",
    mail: "Surbhi@kusheldigi.com",
    phoneNumber: "9873******",
    department: "Developer",
    dateOfJoin: "02 March,2022"
  },
  {
    profile: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810198/emplyProfile_l38lvi.png",
    name: "Surbhi Rajwanshi",
    profession: "Jr.Developer",
    mail: "Surbhi@kusheldigi.com",
    phoneNumber: "9873******",
    department: "Developer",
    dateOfJoin: "02 March,2022"
  },
  {
    profile: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810198/emplyProfile_l38lvi.png",
    name: "Surbhi Rajwanshi",
    profession: "Jr.Developer",
    mail: "Surbhi@kusheldigi.com",
    phoneNumber: "9873******",
    department: "Developer",
    dateOfJoin: "02 March,2022"
  },

  {
    profile: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810198/emplyProfile_l38lvi.png",
    name: "Surbhi Rajwanshi",
    profession: "Jr.Developer",
    mail: "Surbhi@kusheldigi.com",
    phoneNumber: "9873******",
    department: "Developer",
    dateOfJoin: "02 March,2022"
  },
  {
    profile: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810198/emplyProfile_l38lvi.png",
    name: "Surbhi Rajwanshi",
    profession: "Jr.Developer",
    mail: "Surbhi@kusheldigi.com",
    phoneNumber: "9873******",
    department: "Developer",
    dateOfJoin: "02 March,2022"
  },
  {
    profile: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810198/emplyProfile_l38lvi.png",
    name: "Surbhi Rajwanshi",
    profession: "Jr.Developer",
    mail: "Surbhi@kusheldigi.com",
    phoneNumber: "9873******",
    department: "Developer",
    dateOfJoin: "02 March,2022"
  },
  {
    profile: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810198/emplyProfile_l38lvi.png",
    name: "Surbhi Rajwanshi",
    profession: "Jr.Developer",
    mail: "Surbhi@kusheldigi.com",
    phoneNumber: "9873******",
    department: "Developer",
    dateOfJoin: "02 March,2022"
  },

  {
    profile: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810198/emplyProfile_l38lvi.png",
    name: "Surbhi Rajwanshi",
    profession: "Jr.Developer",
    mail: "Surbhi@kusheldigi.com",
    phoneNumber: "9873******",
    department: "Developer",
    dateOfJoin: "02 March,2022"
  },
  {
    profile: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810198/emplyProfile_l38lvi.png",
    name: "Surbhi Rajwanshi",
    profession: "Jr.Developer",
    mail: "Surbhi@kusheldigi.com",
    phoneNumber: "9873******",
    department: "Developer",
    dateOfJoin: "02 March,2022"
  },
  {
    profile: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810198/emplyProfile_l38lvi.png",
    name: "Surbhi Rajwanshi",
    profession: "Jr.Developer",
    mail: "Surbhi@kusheldigi.com",
    phoneNumber: "9873******",
    department: "Developer",
    dateOfJoin: "02 March,2022"
  },
  {
    profile: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810198/emplyProfile_l38lvi.png",
    name: "Surbhi Rajwanshi",
    profession: "Jr.Developer",
    mail: "Surbhi@kusheldigi.com",
    phoneNumber: "9873******",
    department: "Developer",
    dateOfJoin: "02 March,2022"
  },


]

const AdminEmplyee = () => {

  const location = useLocation();
  console.log(location.state)

  const { getActiveUsers } = useMain();
  const [data1, setData1] = useState([]);

  let hrms_user = JSON?.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;


  const getData = async () => {
    const ans = await getActiveUsers();
    setData1(ans?.data);
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <div className="employee-dash h-full">

        <div className="w-full ">

          <div className="w-full min-h-[calc(100vh_-_83px)] relative pt-8 pb-8 pr-5 pl-[20px]">
            <div className="flex-col">
              {/* first  */}
              <p className="text-[24px] text-center font-semibold leading-[32px] lg:text-left text-[#101820]">Active Employee</p>
              {/* second */}
              <div className="flex w-full h-[70vh] items-center justify-center">
                {
                  data1.length > 0 ? (
                    <main className="grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(275px,1fr))] mt-4">

                      {data1?.length > 0 && data1?.map((employ, index) => (
                        <div key={index} className="rounded-[10px] bg-white flex flex-col items-center py-4 gap-[15px] max-w-[350px]">
                          <div className="flex flex-col items-center gap-2.5">
                            <img className="w-[65px] h-[65px] rounded-full" src={employ?.user?.profileImage ? employ?.user?.profileImage : data[0].profile} alt="" />
                            <h2>{employ?.user?.fullName}</h2>
                            <p>{employ?.user?.designation}</p>
                            <button className="bg-[#6FD943] w-[90px] h-[30px] rounded-[3px]"><span>{employ?.user?.isBreakIn ? "Break" : "Online"}</span></button>
                          </div>

                          <div className="w-full flex flex-col bg-[#F8F9FD] px-4 py-2.5 rounded-[3px] gap-2.5">
                            <p className="flex items-center gap-[10px]"><img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810331/mail_dkyb5n.png" alt="" /> <span>{employ?.user?.email}</span></p>
                            <p className="flex items-center gap-[10px]"><img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747810304/call_fe0vov.png" alt="" /> <span>{employ?.user?.mobile}</span></p>
                          </div>

                          <div className="w-full left-[20px] px-[13px] py-2.5 rounded-[3px] bg-[#F8F9FD] flex flex-col gap-2.5">
                            <p className="flex justify-between items-center">
                              <span className="text-xs font-normal tracking-normal text-[#293240] text-left">Department</span>
                              <span className="snsL text-xs font-normal tracking-normal text-[#293240] text-left">{employ?.user?.department}</span>
                            </p>
                            <p className="flex justify-between items-center">
                              <span className="text-xs font-normal tracking-normal text-[#293240] text-left">Date of Joining</span>
                              <span className="snsL text-xs font-normal tracking-normal text-[#293240] text-left">{new Date(employ?.user?.joiningDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
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

export default AdminEmplyee;
