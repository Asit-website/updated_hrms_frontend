    import React, { useEffect, useState } from "react";

    import "react-calendar/dist/Calendar.css";
    import { NavLink, useNavigate } from "react-router-dom";
    import { confirmAlert } from "react-confirm-alert"; // Import
    import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
    import toast from "react-hot-toast";
    import { IoIosCloseCircle } from "react-icons/io";

    import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
    import { FaRegEye } from "react-icons/fa";
    import { useMain } from "../../../hooks/UseMain";
import { useAuth } from "../../../Context/AuthContext";

    const UserLead = () => {
    const navigate = useNavigate();

    const {
      
        getLead3,
        deleteLeads,
        getUserByDesignation,
        getLeadByUser,
        closeLead,
    } = useMain();
    
    const {user} = useAuth()

    const [refreshFlag, setRefreshFlag] = useState(false);

    const [card, setCard] = useState(false);

    const [leadUser, setLeadUser] = useState("Select User");

    const [desUsers, setDeUsers] = useState([]);

    const [Filter1, setFilter1] = useState("Select");

    const stylepeer2 = {
        display: card ? "block" : "none",
    };

    const [filter, setFilter] = useState(false);

    const stylePeer3 = {
        display: filter ? "block" : "none",
    };

    const [allLead, setAllLead] = useState([]);

    let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

    const [allLeading, setAlleading] = useState([]);

    const fetchLead = async () => {
        const ans = await getLead3();
        setAllLead(ans?.allLead);
        setAlleading(ans?.allLead);
    };

    useEffect(() => {
        fetchLead();
    }, [refreshFlag]);

    const [currView, setCurrView] = useState(-1);

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

    const [currentPage, setCurrentPage] = useState(1);

    let itemsPerPage = 10;

    const totalPages = Math.ceil(allLead?.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = Math.min(startIndex + itemsPerPage, allLead?.length);

    const currentItems = allLead?.slice(startIndex, endIndex);

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const [sortDate, setSortDate] = useState("");
    const [sortDate2, setSortDate2] = useState("");

    const [OwnerFilter, setOwnerFilter] = useState(false);

    const handleCheckboxChange = (event) => {
        setOwnerFilter(event.target.checked);
    };

    const applyHandler = () => {
        if (OwnerFilter) {
        const filterdata = allLeading.filter((lead) => {
            const { LeadOwner } = lead;
            return LeadOwner?._id === hrms_user?._id;
        });
        setAllLead(filterdata);
        } else {
        setAllLead(allLeading);
        }
    };

    const fetchDesiUser = async () => {
        const ans = await getUserByDesignation();
        if (ans?.status) {
        setDeUsers(ans?.data);
        }
    };

    const getFilteLead = async () => {
        const ans = await getLeadByUser(leadUser);
        if (ans?.status) {
        setAllLead(ans?.data);
        } else {
        setAllLead(allLeading);
        }
    };

    useEffect(() => {
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
        if (leadUser !== "" && leadUser !== "Select User") {
        getFilteLead();
        } else {
        setAllLead(allLeading);
        }
    }, [leadUser]);

    useEffect(() => {
        fetchDesiUser();
    }, []);

    useEffect(() => {
        if (leadUser === "Select User" || leadUser === "") {
        setAllLead(allLeading);
        return;
        } else {
        const userLead = allLeading.filter((ld) => ld?.LeadOwner === leadUser);

        let FiltData;

        const today = new Date();

        if (Filter1 === "Per Day") {
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            FiltData = userLead.filter((ld) => {
            const createdAt = new Date(ld.createAt);
            return createdAt >= today && createdAt < tomorrow;
            });
        } else if (Filter1 === "This Week") {
            const firstDayOfWeek = new Date(today);
            firstDayOfWeek.setDate(today.getDate() - 7);

            const lastDayOfWeek = new Date(today);

            FiltData = userLead.filter((ld) => {
            const createdAt = new Date(ld.createAt);
            return createdAt >= firstDayOfWeek && createdAt <= lastDayOfWeek;
            });
        } else if (Filter1 === "Last 14 Days") {
            const fourteenDaysAgo = new Date(today);
            fourteenDaysAgo.setDate(today.getDate() - 14);

            FiltData = userLead.filter((ld) => {
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

            FiltData = userLead.filter((ld) => {
            const createdAt = new Date(ld.createAt);
            return (
                createdAt >= firstDayOfMonth && createdAt <= firstDayOfNextMonth
            );
            });
        }

        setAllLead(FiltData);
        }
    }, [Filter1]);

    const [searchText, setSrchText] = useState("");

    useEffect(() => {
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
                toast.success("Successfuly Done");
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
    };

    return (
        <>
        <div className="flex relative bg-[#f5f5f5] h-full">
    

            <div className="w-full bg-[#f5f5f5]">
            

            <div className="w-full relative mt-[40px] px-[20px] pb-[32px] pl-[30px]">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                <div>
                    <h2 className="text-[24px] font-semibold text-[#111827] leading-6 text-center lg:text-left">Lead Management</h2>
                    <p className="text-[12px] text-[#6B7280] mt-1 text-center lg:text-left">Real-time insights and performance overview</p>
                </div>
                <div className="lead_content2">
                    <div className="flex items-center justify-center gap-[10px]">
                    <NavLink to={user?.role === "ADMIN" ? "/adminDash/leadFile" : "/employeeDash/leadFile"}>
                        <button className="flex items-center justify-evenly w-[162px] h-[40px] border border-[#0B56E4] rounded-[10px] bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)] mt-2 lg:mt-0">
                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746687192/donwlaond_d9hrjl.png" alt="download" />
                        <span className="text-[#0B56E4] font-medium text-[16px]"> Import Leads</span>
                        </button>
                    </NavLink>
                    </div>
                </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between overflow-x-scroll xl:overflow-x-hidden">
                <div>
                    <div className="my-[20px] flex items-center gap-[20px]">
                    {/* <img src={fff} alt="" /> */}

                    <div className="flex items-center w-[285px] h-[48px] px-[16px] py-[8px] gap-[16px] rounded-[15px] bg-white border border-[#D0D4DC]">
                        <input
                        className="w-[288px] h-[46px] px-[16px] py-[8px] gap-[8px] border-[#666D76] font-inter  text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left outline-none"
                        value={searchText}
                        onChange={(e) => setSrchText(e.target.value)}
                        type="text"
                        placeholder="Search leads"
                        />
                        <span className="flex items-center gap-8">
                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746530595/bx-search_sxotf2.png" alt="Search" />
                        </span>
                    </div>
                    </div>

                
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-5">
                    <span className="text-[#666D76] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left">Sort by</span>

                    <input className="w-[265px] h-[48px] px-[16px] py-[8px] gap-[8px] border-t rounded-[10px] text-[#1B2533]"
                    type="date"
                    value={sortDate}
                    onChange={(e) => setSortDate(e.target.value)}
                    />

                    <span className="text-[#666D76] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left">TO</span>

                    <input
                    className="w-[265px] h-[48px] px-[16px] py-[8px] gap-[8px] border-t rounded-[10px] text-[#1B2533]"
                    type="date"
                    value={sortDate2}
                    onChange={(e) => setSortDate2(e.target.value)}
                    />
                </div>
                </div>

                <div>
                {/* apply currnt filter  */}

                <div className="w-full bg-white border border-gray-400 shadow-[0px_8px_32px_-2px_#1B25330F] py-[15px] mt-[20px] min-h-[250px] rounded-xl ">
                    <div className="px-[20px] ">
                    <div className="flex items-center justify-between px-[10px] overflow-x-scroll lg:overflow-x-hidden">
                    <div className=" flex gap-2 items-center">
                        <h3 className="text-[#1B2533] font-semibold text-[16px]">User Leads</h3>

                        <div className="border relative min-w-36 ml-3 py-1 border-gray-300 flex items-center rounded-md">
                        <select
                        // className="userFilterr"
                        className="appearance-none border-none py-1 outline-none w-full pl-2 min-w-12"
                        name="leadUser"
                        onChange={(e) => {
                            setLeadUser(e.target.value);
                        }}
                        id=""
                        >
                        <option value="Select User" className="">Select User</option>
                        {desUsers?.map((u, index) => (
                            <option key={index} value={u._id}>
                            {u?.fullName}
                            </option>
                        ))}
                        </select>
                        <img width="30" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746530550/downis_yfkfau.png" className="absolute right-1"   alt="downis" />
                        </div>
                    </div>

                    <div className="border ml-3 py-1 border-gray-300 flex items-center rounded-md">
                        <select
                        onChange={(e) => setFilter1(e.target.value)}
                        value={Filter1}
                        name="thisFilter"
                        id="fentar"
                        className="borde-none outline-none pl-3 py-1"
                        >
                        <option value="Select" >
                            Select
                        </option>
                        <option value="Per Day">Per Day</option>
                        <option value="This Week"> This Week</option>
                        <option value="Last 14 Days">Last 14 Days</option>
                        <option value="This Month">This Month</option>
                        </select>
                        {/* <img
                        width="30"
                        className="absolute right-[40px]"
                        src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746530550/downis_yfkfau.png"
                        alt=""
                        /> */}
                    </div>
                    </div>

                    <div className="relative w-full bg-white overflow-x-scroll">
                    <table className="w-full text-sm text-gray-700">
                        <thead className="bg-white font-semibold">
                        <tr>
                            <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                            {/* <input type="checkbox" placeholder="" /> */}
                            SR NO.
                            </th>
                            <th
                            scope="col"
                            className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                            >
                            Company Name
                            </th>
                            <th
                            scope="col"
                            className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                            >
                           
                            LeadName
                            </th>

                            <th
                            scope="col"
                            className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                            >
                            Website
                            </th>

                            <th
                            scope="col"
                            className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                            >
                            Status
                            </th>
                            <th
                            scope="col"
                            className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                            >
                            Lead Date
                            </th>
                            <th
                            scope="col"
                            className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                            >
                            Action
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {currentItems?.map((item, index) => {
                            return (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                                <td scope="col" className="px-3 py-3">
                               
                                {index+1}
                                </td>
                                <td
                                scope="col"
                                className="px-6 py-4 text-gray-800"
                                >
                                {item?.Company}
                                </td>
                                <td
                                scope="col"
                                className="px-6 py-4 text-gray-800"
                                >
                                {item?.FirstName}
                                {item?.LastName}
                                </td>

                                

                                <td
                                scope="col"
                                className="px-6 py-4 text-gray-800"
                                >
                                {item?.Website}
                                </td>

                                <td scope="col" className="px-6 py-4 text-gray-800">
                                <div
                                    scope="col"
                                    className={`statussame makedivcent 
                                ${item?.LeadStatus === "Connected" && "connected"
                                    } 
                                ${item?.LeadStatus == "Nurturing" && "Nurturing"
                                    } ${item?.LeadStatus == "Qualified" && "Qualified"
                                    } 
                                ${item?.LeadStatus == "Unqualified" &&
                                    "Unqualified"
                                    }  ${item?.LeadStatus == "Converted" && "Converted"
                                    }
                                ${item?.LeadStatus == "Not Converted" &&
                                    "Converteds"
                                    }
                                ${item?.LeadStatus == "Junk" && "Junk"}
                                ${item?.LeadStatus === "New" && "Newleadstatus"}
                                
                                `}
                                >
                                    {item?.LeadStatus}
                                </div>
                                </td>

                                <td className="px-6 py-4 text-gray-800">
                                {new Date(item?.createAt).toLocaleDateString(
                                    "en-CA"
                                )}
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
                                
                                    }}
                                className="px-3 py-3 flex items-center hiii_gap cursor-pointer relative"
                                >
                                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746687309/actions_rgpytx.png" alt="" />
                                

                                {index === currView && (
                                    <div className="absolute -top-16 min-w-[120px] h-fit border border-[#E3E3E3] flex flex-col shadow-[0px_4px_12px_0px_#1A1A1A33] py-2 gap-[5px] rounded-tl-[8px] z-[1000] bg-white right-[75px]">
                                    <div className="flex gap-4 items-center px-2 cursor-pointer" onClick={() =>
                                        navigate(user?.role === "ADMIN" ? "/adminDash/editLead" : "/employeeDash/editLead", {
                                        state: item,
                                        })
                                    }>
                                        
                                        <MdOutlineEdit className="text-[18px]"/>
                                        <p>Edit</p>
                                    </div>
                                    <hr />
                                    <div className="flex gap-4 items-center px-2 cursor-pointer" onClick={() => {
                                        navigate(
                                        user?.role === "ADMIN" ? `/adminDash/importLead/${item._id}` : `/employeeDash/importLead/${item._id}`
                                        );
                                    }}>
                                    
                                        <FaRegEye className="text-[18px]"/>
                                        <p>View</p>
                                    </div>
                                    <hr />
                                    <div className="flex gap-4 items-center px-2 cursor-pointer" onClick={() => {
                                        deleteProject(item?._id);
                                    }}>
                                        {/* <svg className="cursor-pointer" width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.33317 5.5V13.8333H2.6665V5.5H9.33317ZM8.08317 0.5H3.9165L3.08317 1.33333H0.166504V3H11.8332V1.33333H8.9165L8.08317 0.5ZM10.9998 3.83333H0.999837V13.8333C0.999837 14.75 1.74984 15.5 2.6665 15.5H9.33317C10.2498 15.5 10.9998 14.75 10.9998 13.8333V3.83333Z" fill="#DE3730" />
                                        </svg> */}
                                        <MdDeleteOutline className="text-[18px]"/>
                                        <p>Delete</p></div>
                                        <hr />
                                    <div
                                        onClick={() => {
                                        closeLeadHandler(item?._id);
                                        }}
                                        className="flex gap-3 items-center px-2 cursor-pointer"
                                    >
                                        <IoIosCloseCircle className="incfornsizze" />

                                        <p>Close</p>

                                    </div>
                                    </div>
                                )}
                                </td>
                                </div>
                                </OutsideClickHandler>
                            
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    </div>

                    {totalPages > 1 && (<div className="prev_next">
                    <div className="next">
                        <button onClick={prevPage} disabled={currentPage === 1}>
                        <span>Prev</span>
                        <svg
                            width="8"
                            height="10"
                            viewBox="0 0 8 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z"
                            fill="#666D76"
                            />
                        </svg>
                        </button>
                    </div>

                    <div className="on1">
                        <p>{currentPage}</p>
                    </div>

                    <div className="next">
                        <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        >
                        <span>Next</span>
                        <svg
                            width="8"
                            height="10"
                            viewBox="0 0 8 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z"
                            fill="#666D76"
                            />
                        </svg>
                        </button>
                    </div>
                    </div>)}
                </div>
                </div>
            </div>
            </div>
            </div>
        </div>
        </>
    );
    };

    export default UserLead;
