import React from "react";
import {
  Briefcase,
  Settings,
  Phone,
  Users,
  RefreshCcw,
  Gift,
} from "lucide-react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMain } from "../../../hooks/UseMain";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { useAuth } from "../../../Context/AuthContext";

export default function LeadManagement() {
  const {
    getLead,
    getTodayLead,
    deleteLeads,
    getLeadByUser,
    closeLeadApiFetch,
    totalLeads, setTotalLeads,
    userLeads, setUserLeads,
    allCloseLead, setAllCloseLead,
    todayLead, setTodayLead,
  } = useMain();

  const { user } = useAuth();

  const theadData1 = [
    "Company",
    "Email",
    "FirstName",
    "LastName",
    "Close Date",
    "Status",
  ];

  const theadData2 = [
    "Company",
    "Email",
    "FirstName",
    "LastName",
    "Close Date",
    "Status",

  ];


  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const fetchLead = async () => {
    const ans = await getLead();
    if (ans?.data) {
      setTotalLeads(ans?.data?.length);
    }
  };
  const fetchUserLead = async () => {
    const ans = await getLeadByUser(hrms_user?._id);
    if (ans?.status) {
      setUserLeads(ans?.data.length);
    }
  };

  const [closeSerch, setCloseSrch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [optionedit, setOptionEdit] = useState(null);
  const [todayLeadSrch, setTodayLeadSrch] = useState("");
  const [paginatedData, setPaginationData] = useState([]);

  const closeLead = async () => {
    const ans = await closeLeadApiFetch();
    setAllCloseLead(ans?.status)
  };

  const fetchLeads = async () => {
    const ans = await getTodayLead();
    if (ans.status) {
      setTodayLead(ans?.leads);
    }
  };

  useEffect(() => {
    if (todayLeadSrch === "") {
      setPaginationData([...todayLead]);
    }
    else {
      const filterData = todayLead.filter((lead) => lead?.Company?.toLowerCase()?.includes(todayLeadSrch?.toLocaleLowerCase()))
      setPaginationData(filterData);
    }
  }, [todayLeadSrch])

  const filteredCloseLeads = allCloseLead?.filter((lead) => {
    const searchWords = closeSerch.toLowerCase().trim().split(/\s+/);
    const name = lead.Company.toLowerCase();
    return searchWords.every((word) => name.includes(word));
  });



  useEffect(() => {
    setPaginationData(todayLead?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  }, [currentPage, todayLead])

  const stats = [
    {
      img: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746188858/Frame_9688_zhh0hh.png",
      label: "Total Leads",
      value: totalLeads,
      link: user?.role === "ADMIN" ? "/adminDash/myLead" : "/employeeDash/myLead"
    },
    {
      img: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746188839/Frame_9688_ddpeva.png",
      label: "User Leads",
      value: userLeads,
      link: user?.role === "ADMIN" ? "/adminDash/userLead" : "/employeeDash/userLead"
    },
    {
      img: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746188839/Frame_9688_ddpeva.png",
      label: "Closed Leads",
      value: allCloseLead?.length,
      link: user?.role === "ADMIN" ? "/adminDash/closeLeads" : "/employeeDash/closeLeads"
    },
  ];


  const deleteProject = async (id) => {
    confirmAlert({
      title: "Are you sure to delete this data?",
      message: "All related data to this will be deleted",
      buttons: [
        {
          label: "Yes, Go Ahead!",
          style: {
            background: "#FF5449",
          },
          onClick: async () => {
            await deleteLeads(id);
            toast.success("delete Successfully");
            fetchLead();
          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });
  };


  useEffect(() => {
    if (!totalLeads.length) {
      fetchLead();
    }
    if (!userLeads.length) {
      fetchUserLead();
    }
    if (!allCloseLead.length) {
      closeLead();
    }
    if (!todayLead.length) {
      fetchLeads();
    }
  }, []);
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-[#f9fbfc]">
      <div className="flex flex-col md:flex-row justify-between items-start mb-5 overflow-x-scroll xl:overflow-x-hidden gap-3">
        <div>
          <h2 className="text-[24px] font-semibold text-[#111827] leading-6">
            Lead Management
          </h2>
          <p className="text-[12px] text-[#6B7280] mt-1">
            Real-time insights and performance overview
          </p>
        </div>
        <div className="flex space-x-3 pt-4 md:pt-0">
          <button
            onClick={() => navigate(user?.role === "ADMIN" ? "/adminDash/leadDash" : "/employeeDash/leadDash")}
            className="flex items-center gap-1 text-[16px] font-medium px-4 py-[6px] border border-[#2563eb] text-[#2563eb] rounded-md hover:bg-blue-50"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </button>
          <NavLink to={user?.role === "ADMIN" ? "/adminDash/myLead" : "/employeeDash/myLead"}>
            <button className="bg-[#2563eb] text-white text-[16px] font-medium px-4 py-[6px] rounded-md hover:bg-blue-700">
              My Leads
            </button>
          </NavLink>
          <NavLink to={user?.role === "ADMIN" ? "/adminDash/userLead" : "/employeeDash/userLead"}>
            <button className="bg-[#2563eb] text-white text-[16px] font-medium px-4 py-[6px] rounded-md hover:bg-blue-700">
              User Leads
            </button>
          </NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const cardContent = (
            <div
              className="bg-white rounded-lg p-4 border border-[#f3f4f6] shadow-md transition-all ease-in-out flex flex-col justify-between h-full hover:bg-blue-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <img src={stat.img} alt="icon" />
                </div>
                <p className="text-[17px] text-[#374151] font-medium">{stat.label}</p>
              </div>

              <p className="text-[24px] text-[#111827] font-semibold mt-1 text-end">
                {stat.value}
              </p>
            </div>
          );
          return stat.link ? (
            <NavLink
              key={i}
              to={stat.link}
              className="block hover:bg-blue-100 cursor-pointer rounded-lg"
            >
              {cardContent}
            </NavLink>
          ) : (
            <div key={i}>{cardContent}</div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-8">

        <div className="bg-grey rounded-xl border-2 overflow-x-auto overflow-hidden  xl:col-span-2">
          <div className="flex p-4 justify-between sm:items-center bg-white flex-wrap">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold ">Today's Leads</h3>

            </div>

            <div className="mt-2 sm:mt-0 sm:self-end self-end">
              <input value={todayLeadSrch} onChange={(e) => setTodayLeadSrch(e.target.value)} type="text" className="w-[200px] h-[38px] rounded-[10px] px-[10px] py-0 bg-white border border-[#D0D4DC]" placeholder="Search..." />
            </div>
          </div>

          <hr />

          <div className="w-full relative bg-white  border border-gray-200">
            <table className="w-full text-sm text-gray-700">
              {/* Table Head */}
              <thead className="bg-white font-semibold">
                <tr>
                  {theadData1.map((head, idx) => (
                    <th
                      key={idx}
                      className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>


              <tbody>
                {paginatedData && paginatedData.length > 0 ? (paginatedData?.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ">


                    <td className="px-4 py-4 text-gray-800">
                      {item?.Company}
                    </td>
                    <td className="px-4 py-4 text-gray-800">{item?.Email}</td>
                    <td className="px-4 py-4 text-gray-800">
                      {item?.FirstName}
                    </td>
                    <td className="px-4 py-4 text-gray-800">
                      {item?.LastName}
                    </td>
                    <td className="px-4 py-4 text-gray-800">
                      <div
                        scope="col"
                        className={`flex items-center justify-center rounded-[27px] h-[28px] text-xs font-normal
                              ${item?.LeadStatus === "Connected" && "bg-[#20C997] text-white"} 
                              ${item?.LeadStatus == "Nurturing" && "bg-[#6F42C1] text-white"} ${item?.LeadStatus == "Qualified" && "bg-[#28A745] text-white"} 
                              ${item?.LeadStatus == "Unqualified" && "bg-[#6C757D] text-white"}  ${item?.LeadStatus == "Converted" && "bg-[#218838] text-white"}
                               ${item?.LeadStatus == "Not Converted" && "bg-[#DC3545] text-white"}
                               ${item?.LeadStatus == "Junk" && "bg-[#343A40] text-white"}
                               ${item?.LeadStatus === "New" && "bg-[#007BFF] text-white"}
                              
                               `}
                      >
                        {item?.LeadStatus}
                      </div>
                    </td>

                    <td
                      onClick={() => {
                        if (optionedit === index) {
                          setOptionEdit(null);
                        } else {
                          setOptionEdit(index);
                        }
                      }}
                      className="px-6 py-4 text-gray-800 moverights cursor-pointer relative"
                    >

                      <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746515211/more_vert_qbxefn.png" alt="" className="morevertimg" />

                      {optionedit === index && (
                        <div className="absolute z-[100] flex flex-col top-[-85px] right-5 w-[161px] h-[54px] rounded-[8px] bg-white border border-[#E3E3E3] shadow-[0_4px_12px_0_#1A1A1A33]"
                        >
                          <div
                            onClick={() =>
                              navigate(user?.role === "ADMIN" ? "/adminDash/editLead" : "/employeeDash/editLead", {
                                state: item,
                              })
                            }
                            className="w-[161px] h-[44px] pt-[12px] pr-[91px] pb-[12px] pl-[12px] border-b border-b-[#E8E9EB] bg-white flex items-center gap-[10px]"

                          >
                            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260260/Vector_zah5tt.svg" alt="" />
                            <p className="text-sm text-gray-700 hover:bg-gray-100">Edit</p>
                          </div>
                          <div
                            onClick={() => {
                              navigate(user?.role === "ADMIN" ? `/adminDash/importLead/${item._id}` : `/employeeDash/importLead/${item._id}`);
                            }}
                            className="w-[161px] h-[44px] pt-[12px] pr-[91px] pb-[12px] pl-[12px] border-b border-b-[#E8E9EB] bg-white flex items-center gap-[10px]"

                          >
                            <svg
                              width="20"
                              height="14"
                              viewBox="0 0 20 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0002 2.41667C13.1585 2.41667 15.9752 4.19167 17.3502 7C15.9752 9.80833 13.1585 11.5833 10.0002 11.5833C6.84183 11.5833 4.02516 9.80833 2.65016 7C4.02516 4.19167 6.84183 2.41667 10.0002 2.41667ZM10.0002 0.75C5.8335 0.75 2.27516 3.34167 0.833496 7C2.27516 10.6583 5.8335 13.25 10.0002 13.25C14.1668 13.25 17.7252 10.6583 19.1668 7C17.7252 3.34167 14.1668 0.75 10.0002 0.75ZM10.0002 4.91667C11.1502 4.91667 12.0835 5.85 12.0835 7C12.0835 8.15 11.1502 9.08333 10.0002 9.08333C8.85016 9.08333 7.91683 8.15 7.91683 7C7.91683 5.85 8.85016 4.91667 10.0002 4.91667ZM10.0002 3.25C7.9335 3.25 6.25016 4.93333 6.25016 7C6.25016 9.06667 7.9335 10.75 10.0002 10.75C12.0668 10.75 13.7502 9.06667 13.7502 7C13.7502 4.93333 12.0668 3.25 10.0002 3.25Z"
                                fill="#383838"
                              />
                            </svg>

                            <p className="text-sm text-gray-700 hover:bg-gray-100">View</p>
                          </div>
                          <div
                            onClick={() => {
                              deleteProject(item?._id);
                            }}
                            className="w-[161px] h-[44px] pt-[12px] pr-[91px] pb-[12px] pl-[12px] border-b border-b-[#E8E9EB] bg-white flex items-center gap-[10px]"

                          >
                            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260280/delete_sgefhv.png" alt="delete" />
                            <p className="text-sm text-gray-700 hover:bg-gray-100">Delete</p>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-400 px-6 py-4">
                      No data available !!
                    </td>
                  </tr>)}
              </tbody>

            </table>
          </div>
        </div>
        <div className="bg-grey rounded-xl border-2 overflow-hidden  xl:col-span-2">
          <div className="flex  p-4 justify-between sm:items-center bg-white flex-wrap">
            <div className="flex items-center gap-2 ">
              <h3 className="text-xl font-semibold ">
                My Leads Closing This Month
              </h3>
            </div>

            <div className="mt-2 sm:mt-0 sm:self-end self-end">
              <input type="text" className="w-[200px] h-[38px] rounded-[10px] px-[10px] py-0 bg-white border border-[#D0D4DC]" value={closeSerch} onChange={(e) => setCloseSrch(e.target.value)} placeholder="Search..." />
            </div>
          </div>

          <hr />
          <div className="w-full overflow-x-auto bg-white  border border-gray-200 shadow-sm">
            <table className="w-full text-sm text-gray-700">
              {/* Table Head */}
              <thead className="bg-white font-semibold">
                <tr>
                  {theadData2.map((head, idx) => (
                    <th
                      key={idx}
                      className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>


              <tbody>
                {filteredCloseLeads && filteredCloseLeads.length > 0 ? (
                  filteredCloseLeads?.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                      <td
                        scope="row"
                        className="px-4 py-4 text-gray-800"
                      >
                        {item?.Company}
                      </td>
                      <td className="px-4 py-4 text-gray-800">{item?.Email}</td>
                      <td className="px-4 py-4 text-gray-800">{item?.FirstName}</td>
                      <td className="px-4 py-4 text-gray-800">{item?.LastName}</td>
                      <td className="px-4 py-4 text-gray-800">{new Date(item?.closeDate).toLocaleDateString('en-GB')}</td>
                      <td className="px-4 py-4 text-gray-800">

                        <div
                          scope="col"
                          className={`text-left text-[14px] flex items-center justify-center rounded-[27px] h-[28px] font-normal
                              ${item?.LeadStatus === "Connected" && "bg-[#20C997] text-white"} 
                              ${item?.LeadStatus == "Nurturing" && "bg-[#6F42C1] text-white"} ${item?.LeadStatus == "Qualified" && "bg-[#28A745] text-white"} 
                              ${item?.LeadStatus == "Unqualified" && "bg-[#6C757D] text-white"}  ${item?.LeadStatus == "Converted" && "bg-[#218838] text-white"}
                               ${item?.LeadStatus == "Not Converted" && "bg-[#DC3545] text-white"}
                               ${item?.LeadStatus == "Junk" && "bg-[#343A40] text-white"}
                               ${item?.LeadStatus === "New" && "bg-[#007BFF] text-white"}
                              
                               `}
                        >
                          {item?.LeadStatus}
                        </div>

                      </td>
                      <td className="px-6 py-4 text-gray-800">{item?.staus}</td>



                    </tr>

                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-400 px-6 py-4">
                      No data available !!
                    </td>
                  </tr>
                )
                }

              </tbody>

            </table>
          </div>


        </div>

      </div>
      <button
        onClick={() => navigate(user?.role === "ADMIN" ? "/adminDash/closeLeads" : "/employeeDash/closeLeads")}
        className="px-4 py-2 bg-white hover:bg-gray-100 border mt-4 text-sm border-gray-300 rounded-md block m-auto"
      >
        View All
      </button>
    </div>
  );
}
