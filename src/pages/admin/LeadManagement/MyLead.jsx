import React, { useEffect, useRef, useState } from "react";
import "react-calendar/dist/Calendar.css";

import { NavLink, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import AdminNavbar from "../Navbar/AdminNavbar";
import { IoIosCloseCircle } from "react-icons/io";

import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useMain } from "../../../hooks/UseMain";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useAuth } from "../../../Context/AuthContext";
import { useClickOutside } from "../../../hooks/useClickOutside";

const MyLead = () => {
  const navigate = useNavigate();

  const { getLead, deleteLeads, getUserByDesignation, closeLead } = useMain();
  const { user } = useAuth();

  const [desUsers, setDeUsers] = useState([]);

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [Filter1, setFilter1] = useState("Select");
  const tableRef = useRef(null);
  const [allLeading, setAllLeading] = useState([]);
  const [allLead, setAllLead] = useState([]);
  const [allData, setAllData] = useState([]);

  const fetchLead = async () => {
    const ans = await getLead("", "", "", "");
    setAllLead(ans?.data);
    setAllData(ans?.data);
    setAllLeading(ans?.data);
  };

  const [filterInput, setFilterInput] = useState();

  useEffect(() => {
    fetchLead();
  }, [refreshFlag]);

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
            setRefreshFlag(!refreshFlag);
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
    if (filterInput) {
      const filtered = allLeading.filter((lead) => {
        const leadDate = new Date(lead.createAt);
        const currentDate = new Date();
        const daysAgo = new Date(
          currentDate.setDate(currentDate.getDate() - filterInput)
        );
        return leadDate >= daysAgo;
      });

      setAllLead(filtered);
    } else {
      setAllLead(allLeading);
    }
  }, [filterInput, allLeading]);

  const [currentPage, setCurrentPage] = useState(1);

  let itemsPerPage = 5;

  const currentFilteredItems = allLead.filter((item) => item.status !== 'Close').sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, currentFilteredItems?.length);

  const currentItems = currentFilteredItems?.slice(startIndex, endIndex);
  const totalPages = Math?.ceil(currentFilteredItems?.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(totalPages, 1));
    }
  }, [currentFilteredItems.length, totalPages]);

  const [sortDate, setSortDate] = useState("");

  const [sortDate2, setSortDate2] = useState("");

  const fetchDesiUser = async () => {
    const ans = await getUserByDesignation();
    if (ans?.status) {
      setDeUsers(ans?.data);
    }
  };

  useEffect(() => {
    setCurrentPage(1);

    if (
      sortDate !== undefined &&
      sortDate2 !== undefined &&
      sortDate != "" &&
      sortDate !== null &&
      sortDate2 != "" &&
      sortDate2 !== null
    ) {
      const sortedData = allLeading.filter((l) => {
        const { createAt } = l;

        const date = new Date(createAt);

        const cyear = date.getFullYear();
        const cmonth = date.getMonth() + 1;
        const cday = date.getDate();

        const [nyear, nmonth, nday] = sortDate.split("-");
        const [nyear2, nmonth2, nday2] = sortDate2.split("-");

        return (
          cyear >= parseInt(nyear) &&
          cyear <= parseInt(nyear2) &&
          cmonth >= parseInt(nmonth) &&
          cmonth <= parseInt(nmonth2) &&
          cday >= parseInt(nday) &&
          cday <= parseInt(nday2)
        );
      });

      setAllLead(sortedData);
    } else {
      setAllLead(allLeading);
    }
  }, [sortDate, sortDate2]);

  useEffect(() => {
    fetchDesiUser();
  }, []);

  // this is for filter per day one
  useEffect(() => {
    let FiltData;

    const today = new Date();
    setCurrentPage(1);

    if (Filter1 === "Per Day") {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      FiltData = allLeading.filter((ld) => {
        const createdAt = new Date(ld.createAt);
        return createdAt >= today && createdAt < tomorrow;
      });
    } else if (Filter1 === "This Week") {
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - 7);

      const lastDayOfWeek = new Date(today);

      FiltData = allLeading.filter((ld) => {
        const createdAt = new Date(ld.createAt);
        return createdAt >= firstDayOfWeek && createdAt <= lastDayOfWeek;
      });
    } else if (Filter1 === "Last 14 Days") {
      const fourteenDaysAgo = new Date(today);
      fourteenDaysAgo.setDate(today.getDate() - 14);

      FiltData = allLeading.filter((ld) => {
        const createdAt = new Date(ld.createAt);
        return createdAt >= fourteenDaysAgo && createdAt <= today;
      });
    } else if (Filter1 === "This Month") {
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const firstDayOfNextMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        1
      );

      FiltData = allLeading.filter((ld) => {
        const createdAt = new Date(ld.createAt);
        return createdAt >= firstDayOfMonth && createdAt <= firstDayOfNextMonth;
      });
    }

    setAllLead(FiltData);
  }, [Filter1]);

  const [searchText, setSrchText] = useState("");

  useEffect(() => {
    setCurrentPage(1);
    if (searchText === "") {
      setAllLead(allLeading);
    } else {
      const filterData = allLeading.filter((lead) => {
        const leadName = `${lead.FirstName} ${lead.LastName}`.toLowerCase();
        return leadName.includes(searchText.toLowerCase());
      });
      setAllLead(filterData);
    }
  }, [searchText]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const [currView, setCurrView] = useState(-1);

  const [checkInpId, setCheckInpId] = useState([]);

  const checkallinput = () => {
    const idList = allData.map((d) => d?._id);
    setCheckInpId(idList);
  };

  const closeLeadHandler = async (id) => {

    confirmAlert({
      title: "Are you sure to close this deal?",
      message: "All related data to this deal will closed",
      buttons: [
        {
          label: "Yes, Go Ahead!",
          style: {
            background: "#FF5449",
          },
          onClick: async () => {
            const toastId = toast.loading("Loading...");

            const ans = await closeLead(id);
            if (ans.status) {
              toast.success("Successfuly Closed");
              setAllLead((prevLeads) =>
                prevLeads.filter((lead) => lead._id !== id)
              );
            }

            toast.dismiss(toastId);
          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });

  }

  const ref = useClickOutside(()=>{
    setCurrView(-1);
  })

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Leads Table',
    sheet: 'Leads'
  })

  return (
    <>
      <div className="flex relative h-full">
        <div className="w-full">

          <div className="pt-[10px] px-[20px] pb-[30px]">
            <div className="flex flex-col xl:flex-row items-start lg:items-center justify-between gap-4 xl:gap-0">
              <div className="lead_content1">
                <h2 className="text-[#101820] font-semibold text-[20px] lg:text-[24px]">
                  Lead Management
                </h2>
                <p className="text-[12px] text-[#6B7280] mt-1">
                  Real-time insights and performance overview
                </p>
              </div>

              <div>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center gap-3 lg:gap-[10px]">
                  <NavLink to={user?.role === "ADMIN" ? "/adminDash/createLead" : "/employeeDash/createLead"}>
                    <button className="bg-[#0B56E4] w-full sm:w-[186px] h-[40px] rounded-[10px] text-white font-inter font-medium text-[16px] flex items-center justify-center px-[10px] py-[0px] gap-[3px]">
                      <img
                        src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746536488/pluss_syd720.png"
                        alt=""
                      />
                      <span className="text-[16px] font-medium text-white">
                        Create New Lead
                      </span>
                    </button>
                  </NavLink>

                  <NavLink to={user?.role === "ADMIN" ? "/adminDash/leadFile" : "/employeeDash/leadFile"}>
                    <button className="flex items-center justify-center w-full sm:w-[162px] h-[40px] border border-[#0B56E4] rounded-[10px] bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)]">
                      <span className="text-[#0B56E4] font-medium text-[16px] px-5">
                        Import Leads
                      </span>
                    </button>
                  </NavLink>

                  <button
                    onClick={onDownload}
                    className="flex items-center justify-center w-full sm:w-[162px] h-[40px] border border-[#0B56E4] rounded-[10px] bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)]"
                  >
                    <span className="text-[#0B56E4] font-medium text-[16px]">
                      Export Leads
                    </span>
                  </button>
                </div>
              </div>
            </div>


            <div className="flex justify-between items-center flex-wrap">
              {/* left side */}
              <div>
                <div className="my-[20px] flex gap-[20px] items-center">
                  <div className="flex items-center gap-[8px] w-[285px] h-[48px] px-[16px] py-[8px] rounded-[15px] bg-white border border-[#D0D4DC]">
                    <input
                      className="w-[288px] h-[46px] px-[16px] py-[8px] gap-[8px] border border-t border-none outline-none text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left"
                      value={searchText}
                      onChange={(e) => setSrchText(e.target.value)}
                      type="text"
                      placeholder="Search leads"
                    />
                    <span className="flex items-center gap-4">
                      <img className="cursor-pointer" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746530595/bx-search_sxotf2.png" alt="Serach" />
                    </span>
                  </div>

                </div>


              </div>

              <div className="flex flex-col lg:flex-row gap-0 items-center lg:gap-5">
                <span className="text-[#666D76] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left">Sort by</span>

                <input
                  className="w-[265px] h-[48px] px-[16px] py-[8px] gap-[8px]  border-[#1B2533] rounded-[10px] text-[#1B2533"
                  type="date"
                  value={sortDate}
                  onChange={(e) => setSortDate(e.target.value)}
                />

                <span className="text-[#666D76] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left">TO</span>

                <input
                  className="w-[265px] h-[48px] px-[16px] py-[8px] gap-[8px] border-[#1B2533] rounded-[10px] text-[#1B2533"
                  type="date"
                  value={sortDate2}
                  onChange={(e) => setSortDate2(e.target.value)}
                />
              </div>
            </div>

            <div>

              <div className="flex items-center justify-end p-8">
                <select
                  onChange={(e) => setFilter1(e.target.value)}
                  value={Filter1}
                  name="thisFilter"
                  id="fentar"
                  className="relative p-1"
                >

                  <option value="Select" disabled selected>
                    Select
                  </option>
                  <option value="Per Day">Per Day</option>
                  <option value="This Week"> This Week</option>
                  <option value="Last 14 Days">Last 14 Days</option>
                  <option value="This Month">This Month</option>
                </select>

              </div>

              <div className="bg-grey rounded-xl border-2">
                <div className="w-full border-gray-200 bg-white border overflow-x-scroll md:overflow-visible">
                  <table className="w-full text-sm text-gray-700 overflow-x-auto md:overflow-visible">
                    <thead className="bg-white font-semibold">
                      <tr>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">

                          S/N
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          Company Name
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap ">
                          LeadName
                        </th>

                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap ">
                          Website
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          Status
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap ">
                          Lead Date
                        </th>

                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          ACTION
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentItems.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                          <td scope="col" className="px-6 py-4 text-gray-800">

                            {
                              index + 1
                            }
                            {console.log(currentItems, currentFilteredItems)}
                          </td>

                          <td className="px-6 py-4 text-gray-800">{item?.Company}</td>
                          <td className="px-6 py-4 text-gray-800">
                            {item?.FirstName} {item?.LastName}
                          </td>

                          <td className="px-6 py-4 text-gray-800">{item?.Website}</td>

                          <td scope="col" className="px-6 py-4 text-gray-800">
                            <div
                              scope="col"
                              className={`statussame 
                              ${item?.LeadStatus === "Connected" && "connected"} 
                              ${item?.LeadStatus == "Nurturing" && "Nurturing"} ${item?.LeadStatus == "Qualified" && "Qualified"} 
                              ${item?.LeadStatus == "Unqualified" && "Unqualified"}  ${item?.LeadStatus == "Converted" && "Converted"}
                               ${item?.LeadStatus == "Not Converted" && "Converteds"}
                               ${item?.LeadStatus == "Junk" && "Junk"}
                               ${item?.LeadStatus === "New" && "Newleadstatus"}
                              
                               `}
                            >
                              {item?.LeadStatus}
                            </div>
                          </td>

                          <td className="px-6 py-4 text-gray-800">
                            {new Date(item?.createAt).toLocaleDateString("en-CA")}
                          </td>

                          <div className="relative">
                              <td
                                onClick={() => {
                                  setCurrView(currView === index ? -1 : index);

                                }}
                                className="px-6 py-4 text-gray-800"
                              >
                                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746536583/actions_cwfbva.png" alt="" />
                              </td>

                              {index === currView && (
                                <div ref={ref} className="absolute top-[-90px] min-w-[120px] h-fit border-t border-[#E3E3E3] flex flex-col shadow-[0_4px_12px_0px_#1A1A1A33] py-[8px] gap-[5px] rounded-tl-[8px] rounded-tr-none rounded-br-none rounded-bl-none z-[1000] bg-white right-[75px]">
                                  <div className="flex gap-4 items-center px-2 cursor-pointer" onClick={() => navigate("/adminDash/editLead", { state: item })}>

                                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260260/Vector_zah5tt.svg" alt="Edit" />
                                    <p className="text-sm text-gray-700 hover:bg-gray-100">Edit</p>
                                  </div>
                                  <hr />
                                  <div className="flex gap-4 items-center px-2 cursor-pointer" onClick={() => {
                                    navigate(user?.role === "ADMIN" ? `/adminDash/importLead/${item._id}` : `/employeeDash/importLead/${item._id}`);
                                  }}>

                                    <FaRegEye className="text-[18px]" />
                                    <p className="text-sm text-gray-700 hover:bg-gray-100">View</p>
                                  </div>
                                  <hr />
                                  <div className="flex gap-4 items-center px-2 cursor-pointer" onClick={() => {
                                    deleteProject(item?._id)
                                  }}>

                                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260280/delete_sgefhv.png" alt="delete" />
                                    <p className="text-sm text-gray-700 hover:bg-gray-100">Delete</p>
                                  </div>
                                  <hr />
                                  <div
                                    onClick={() => {
                                      closeLeadHandler(item?._id);
                                    }}
                                    className="flex gap-3 items-center px-2 cursor-pointer"
                                  >
                                    <IoIosCloseCircle className="incfornsizze" />

                                    <p className="text-sm text-gray-700 hover:bg-gray-100">Close Deal</p>

                                  </div>
                                </div>
                              )}
                            </div>


                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>



            </div>

            {totalPages > 1 && (<div className="flex items-center gap-[10px] justify-center mt-[20px]">
              <button
                className={`w-[100px] h-[40px] gap-[10px] rounded-[10px] border border-[#D8D8D8] bg-white text-[#2B2B2B] text-[12px] font-medium leading-[16px] tracking-[0.004em] text-center ${currentPage !== 1 && "transition-all duration-300 hover:bg-[#2B2B2B] hover:text-white"
                  } disabled:bg-gray-200`}
                onClick={() => {
                  handlePageChange(currentPage - 1);
                  scrollToTop();
                }}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-[#2B2B2B] font-inter text-[12px] font-normal leading-[16px] tracking-[0.004em] text-left">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`w-[100px] h-[40px] gap-[10px] rounded-[10px] border border-[#D8D8D8] bg-white text-[#2B2B2B] text-[12px] font-medium leading-[16px] tracking-[0.004em] text-center ${currentPage !== totalPages && "transition-all duration-300 hover:bg-[#2B2B2B] hover:text-white"
                  } disabled:bg-gray-200`}
                onClick={() => {
                  handlePageChange(currentPage + 1);
                  scrollToTop();
                }}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>)}

          </div>
        </div>
      </div>
    </>
  );
};

export default MyLead;
