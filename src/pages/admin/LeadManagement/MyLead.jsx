import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";

import { NavLink, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import AdminNavbar from "../Navbar/AdminNavbar";
import { IoIosCloseCircle } from "react-icons/io";

import OutsideClickHandler from "react-outside-click-handler";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useMain } from "../../../hooks/UseMain";

const MyLead = ({ setAlert, pop, setPop }) => {
  const navigate = useNavigate();

  const { user, getLead, deleteLeads, getUserByDesignation, closeLead } = useMain();

  const [desUsers, setDeUsers] = useState([]);

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [Filter1, setFilter1] = useState("Select");

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

  return (
    <>
      <div className="employee-dash h-full">
       

        <div className="w-full bg-[#f5f5f5]">

          <div className="pt-[10px] px-[20px] pb-[30px]">
            <div className="flex items-center justify-between">
              <div className="lead_content1">
                <h2 className="text-[#101820] font-semibold text-[24px]">Lead Management</h2>
                <p className="text-[12px] text-[#6B7280] mt-1">Real-time insights and performance overview</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-[10px]">
                  <button className="flex items-center justify-center gap-[10px]">
                    <NavLink className="such_thing" to="/adminDash/createLead">
                      {" "}
                      <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746536488/pluss_syd720.png" alt="" />{" "}
                      <span className="colp"> Create New Lead </span>{" "}
                    </NavLink>
                  </button>

                  <NavLink to="/adminDash/leadFile">
                    <button className="refresh">
                      <span className="ref1">Import Leads</span>
                    </button>
                  </NavLink>




                </div>
              </div>
            </div>

            <div className="laed1">
              {/* left side */}
              <div>
                <div className="leftlead1">
                  <div className="inptsearch">
                    <input
                      value={searchText}
                      onChange={(e) => setSrchText(e.target.value)}
                      type="text"
                      placeholder="Search leads"
                    />
                    <span>
                      <img className="cursor-pointer" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746530595/bx-search_sxotf2.png" alt="Serach" />
                    </span>
                  </div>

                </div>


              </div>

              <div className="leaftlead2">
                <span>Sort by</span>

                <input
                  type="date"
                  value={sortDate}
                  onChange={(e) => setSortDate(e.target.value)}
                />

                <span>TO</span>

                <input
                  type="date"
                  value={sortDate2}
                  onChange={(e) => setSortDate2(e.target.value)}
                />
              </div>
            </div>

            <div>

              <div className="test_filter">
                <select
                  onChange={(e) => setFilter1(e.target.value)}
                  value={Filter1}
                  name="thisFilter"
                  id="fentar"
                  className="select-wrapper"
                >

                  <option value="Select" disabled selected>
                    Select
                  </option>
                  <option value="Per Day">Per Day</option>
                  <option value="This Week"> This Week</option>
                  <option value="Last 14 Days">Last 14 Days</option>
                  <option value="This Month">This Month</option>
                </select>
                <img className="doqn" width="30" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746530550/downis_yfkfau.png" alt="downis" />
              </div>

              <div className=" relative w-full overflow-x-scroll md:overflow-visible">
                <table className="w-full table1 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs uppercase textALLtITL ">
                    <tr>
                      <th scope="col" className="px-6 py-3 taskTitl ">
                        {/* <input
                          onClick={() => {
                            if (checkInpId?.length === allData?.length) {
                              setCheckInpId([]);
                            } else {
                              checkallinput();
                            }
                          }}
                          checked={checkInpId?.length === allData.length}
                          type="checkbox"
                          className="checkboxes"
                        /> */}
                        S/N
                      </th>
                      <th scope="col" className="px-6 py-3 taskTitl ">
                        Company Name
                      </th>
                      <th scope="col" className="px-6 py-3 taskTitl ">
                        LeadName
                      </th>
                      {/* <th scope="col" className="px-6 py-3 taskTitl ">
                        Email
                      </th> */}
                      <th scope="col" className="px-6 py-3 taskTitl ">
                        Website
                      </th>
                      <th scope="col" className="px-6 py-3 taskTitl ">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 taskTitl ">
                        Lead Date
                      </th>

                      <th scope="col" className="px-6 py-3 taskTitl ">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr key={index} className="bg-white border-b fdf">
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          {/* <input
                            onClick={() => {
                              if (checkInpId.includes(item?._id)) {
                                const filterdata = checkInpId.filter(
                                  (id) => id !== item?._id
                                );
                                setCheckInpId(filterdata);
                              } else {
                                setCheckInpId((prev) => [...prev, item?._id]);
                              }
                            }}
                            checked={checkInpId.includes(item?._id)}
                            type="checkbox"
                            className="checkboxes"
                          /> */}
                          {
                            index + 1
                          }
                          {console.log(currentItems, currentFilteredItems)}
                        </th>

                        <td className="px-6 py-4 taskAns">{item?.Company}</td>
                        <td className="px-6 py-4 taskAns">
                          {item?.FirstName} {item?.LastName}
                        </td>
                        {/* <td className="px-6 py-4 taskAns">{item?.Email}</td> */}
                        <td className="px-6 py-4 taskAns">{item?.Website}</td>

                        <td scope="col" className="px-3 py-3">
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

                        <td className="px-6 py-4 taskAns">
                          {new Date(item?.createAt).toLocaleDateString("en-CA")}
                        </td>

                        <OutsideClickHandler
                          onOutsideClick={() => {
                            if (index === currView) {
                              setCurrView(-1);
                            }
                          }}
                        >
                          <div className="viewOnwWRAP">
                            <td
                              onClick={() => {
                                setCurrView(currView === index ? -1 : index);
                                // setShowPlay(-1);
                              }}
                              className="px-3 py-3 flex items-center hiii_gap cursor-pointer"
                            >
                              <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746536583/actions_cwfbva.png" alt="" />
                            </td>

                            {index === currView && (
                              <div className="viewOne">
                                <div className="flex gap-4 items-center px-2 cursor-pointer" onClick={() => navigate("/adminDash/editLead", { state: item })}>
                                  {/* <svg className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.71569 5.51667L10.4824 6.28333L2.93236 13.8333H2.16569V13.0667L9.71569 5.51667ZM12.7157 0.5C12.5074 0.5 12.2907 0.583333 12.1324 0.741667L10.6074 2.26667L13.7324 5.39167L15.2574 3.86667C15.5824 3.54167 15.5824 3.01667 15.2574 2.69167L13.3074 0.741667C13.1407 0.575 12.9324 0.5 12.7157 0.5ZM9.71569 3.15833L0.499023 12.375V15.5H3.62402L12.8407 6.28333L9.71569 3.15833Z" fill="#383838" />
                                  </svg> */}
                                   <MdOutlineEdit className="text-[18px]"/>
                                   <p className="text-[12px] font-normal">Edit</p>
                                </div>
                                <hr />
                                <div className="flex gap-4 items-center px-2 cursor-pointer" onClick={() => {
                                  navigate(`/adminDash/importLead/${item._id}`);
                                }}>
                                  {/* <svg className="cursor-pointer" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0002 2.41667C13.1585 2.41667 15.9752 4.19167 17.3502 7C15.9752 9.80833 13.1585 11.5833 10.0002 11.5833C6.84183 11.5833 4.02516 9.80833 2.65016 7C4.02516 4.19167 6.84183 2.41667 10.0002 2.41667ZM10.0002 0.75C5.8335 0.75 2.27516 3.34167 0.833496 7C2.27516 10.6583 5.8335 13.25 10.0002 13.25C14.1668 13.25 17.7252 10.6583 19.1668 7C17.7252 3.34167 14.1668 0.75 10.0002 0.75ZM10.0002 4.91667C11.1502 4.91667 12.0835 5.85 12.0835 7C12.0835 8.15 11.1502 9.08333 10.0002 9.08333C8.85016 9.08333 7.91683 8.15 7.91683 7C7.91683 5.85 8.85016 4.91667 10.0002 4.91667ZM10.0002 3.25C7.9335 3.25 6.25016 4.93333 6.25016 7C6.25016 9.06667 7.9335 10.75 10.0002 10.75C12.0668 10.75 13.7502 9.06667 13.7502 7C13.7502 4.93333 12.0668 3.25 10.0002 3.25Z" fill="#383838" />
                                  </svg> */}
                                  <FaRegEye className="text-[18px]"/>
                                  <p className="text-[12px] font-normal">View</p>
                                </div>
                                <hr />
                                <div className="flex gap-4 items-center px-2 cursor-pointer" onClick={() => {
                                  deleteProject(item?._id)
                                }}>
                                  {/* <svg className="cursor-pointer" width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.33317 5.5V13.8333H2.6665V5.5H9.33317ZM8.08317 0.5H3.9165L3.08317 1.33333H0.166504V3H11.8332V1.33333H8.9165L8.08317 0.5ZM10.9998 3.83333H0.999837V13.8333C0.999837 14.75 1.74984 15.5 2.6665 15.5H9.33317C10.2498 15.5 10.9998 14.75 10.9998 13.8333V3.83333Z" fill="#DE3730" />
                                  </svg> */}
                                 <MdDeleteOutline className="text-[18px]"/>
                                 <p className="text-[12px] font-normal">Delete</p>
                                  </div>
                                  <hr />
                                <div
                                  onClick={() => {
                                    closeLeadHandler(item?._id);
                                  }}
                                  className="flex gap-3 items-center px-2 cursor-pointer"
                                >
                                  <IoIosCloseCircle className="incfornsizze" />

                                  <p className="text-[12px] font-normal">Close Deal</p>

                                </div>
                              </div>
                            )}
                          </div>
                        </OutsideClickHandler>


                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>


            </div>

            {totalPages > 1 && (<div className="emPaginate">
              <button
                className={`prepaginate ${currentPage !== 1 && "putthehovebtn"
                  } disabled:bg-gray-200`}
                onClick={() => {
                  handlePageChange(currentPage - 1);
                  scrollToTop();
                }}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="pagenum">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`prepaginate ${currentPage !== totalPages && "putthehovebtn"
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
