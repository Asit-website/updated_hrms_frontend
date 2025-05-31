import React from "react";
import { useEffect, useState, useRef, useMemo } from "react";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";

import * as XLSX from "xlsx";
import { format } from 'date-fns';
import { IoSearch } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";


import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import { useMain } from "../../../hooks/UseMain";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";

const MarkAttendance = () => {
  const {
    
    getAllActivities,
    getDepartments,
    allEmployee,
    getAllActivities2,
    postAttendence,
    updateAttendance,
    deleteAttendence
  } = useMain();

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);

    // Convert to 12-hour format with seconds and AM/PM
    const formatted = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // setPrevCheckoutTime(formatted);
    return formatted;
  };

  // Convert "hh:mm:ss AM/PM" → "HH:MM:SS" (24-hour format)
  const formatTo24HourTime = (time12h) => {
    if (!time12h) return "";

    const [time, modifier] = time12h.split(" ");
    let [hours, minutes, seconds] = time.split(":");

    hours = parseInt(hours, 10);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
  };

  // Convert "HH:MM:SS" from <input type="time"> to "hh:mm:ss AM/PM"
  const formatTo12HourTime = (value) => {
    const [hours, minutes, seconds = "00"] = value.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };




  // New Code 

  const [selectedOption, setSelectedOption] = useState("daily"); // 🛠️ ADD THIS
  const [allAttandance, setAllAttandance] = useState([]);
  const [allDepartment, setAllDepartment] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currPage, setCurrPage] = useState(1);
  const rowsPerPage = 5;

  const [active, setActive] = useState("Daily Report");

  const [form, setForm] = useState({
    type: "monthly",
    date: "",
    month: "",
    userId: "",
    department: "Select Department",
    year: ""
  });

  const [mat, setMat] = useState({
    date: "",
    department: ""
  });

  const [dailyFilter, setDailyFilter] = useState({
    date: "",
    department: ""
  });
  const calculateTime = (clockIn, clockOut) => {
    if (!clockIn || !clockOut) return false;

    const parseClockIn = (timeStr) => {
      const [timePart, modifier] = timeStr.includes("AM") || timeStr.includes("PM")
        ? timeStr.split(" ")
        : [timeStr, null];

      let [hours, minutes, seconds] = timePart.split(":").map(Number);
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const date = new Date();
      date.setHours(hours, minutes, seconds || 0, 0);
      return date;
    };

    const inDate = parseClockIn(clockIn);
    const outDate = parseClockIn(clockOut);


    if (outDate <= inDate) {
      outDate.setDate(outDate.getDate() + 1);
    }

    const diffMs = outDate - inDate;
    const diffHours = diffMs / (1000 * 60 * 60);

    return diffHours >= 9;
  };

  // 📦 Helper
  function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  const getMonthlyAttandance = async () => {
    if (form.year && form.month && form.userId) {
      const data = await getAllActivities2(form.type, form.date, form.month, form.userId, form.department, form.year);
      if (data?.status) {
        setAllAttandance(data?.data?.reverse());
        setCurrPage(1);
      }
    } else {
      alert("Please select all fields");
    }
  };

  const getAllAtt = async () => {
    const res = await getAllActivities();
    if (res?.status === 200) {
      setAllAttandance(res?.data?.reverse());
    }
  };

  const getAllDep = async () => {
    const res = await getDepartments();
    if (res.statusCode === 200) {
      setAllDepartment(res?.data);
    }
    const emp = await allEmployee();
    setUsers(emp?.emp);
  };

  useEffect(() => {
    getAllAtt();
    getAllDep();
  }, []);

  useEffect(() => {
    if (selectedOption === "daily") {
      getAllAtt();
      setCurrPage(1);
    } else if (selectedOption === "monthly") {
      setForm(prev => ({ ...prev, type: 'monthly' }));
    }
  }, [selectedOption]);

  // 🔍 Filtered Data
  const filteredData = useMemo(() => {
    return allAttandance.filter((item) => {
      const matchesSearchTerm =
        item?.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.Date?.includes(searchTerm);

      const matchesDate = dailyFilter?.date ? item?.Date === formatDate(dailyFilter.date) : true;
      const matchesDepartment = dailyFilter?.department ? item?.user?.department === dailyFilter.department : true;

      return matchesSearchTerm && matchesDate && matchesDepartment;
    });
  }, [allAttandance, searchTerm, dailyFilter]);

  const paginatedData = useMemo(() => {
    const start = (currPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currPage]);

  const totalPage = Math.ceil(filteredData.length / rowsPerPage);

  const headers = [
    { label: "Employee", key: "user.employeeCode" },
    { label: "Employee", key: "user.fullName" },
    { label: "Department", key: "user.department" },
    { label: "Date", key: "Date" },
    { label: "Clock In", key: "clockIn" },
    { label: "Clock Out", key: "clockOut" },
    { label: "Break", key: "break" },
    { label: "Today Task", key: "todayTask" },
    { label: "Note", key: "Note" },
  ];

  const normalizedData = allAttandance?.map((item) => ({
    ...item,
    user: {
      fullName: item?.user?.fullName || '',
      department: item?.user?.department || '',
      employeeCode: `KDS${item?.user?.employeeCode}` || '',
    },
    break: item?.overTime || item?.break || '',
  }));



  const [data, setData] = useState([]);
  const [data1, setData1] = useState({});
  // const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [allDash, setAllDash] = useState([]);

  const [updateFlag, setUpdateFlag] = useState(false);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [currentPage2, setCurrentPage2] = useState(1);
  const [editPop, setEditPop] = useState(false);

  const pageSize2 = 5;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleNextPage2 = () => {
    if (currentPage2 < totalPages2) {
      setCurrentPage2(currentPage2 + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePrevPage2 = () => {
    if (currentPage2 > 1) {
      setCurrentPage2(currentPage2 - 1);
    }
  };

  const totalPages = Math.ceil(data?.length / pageSize);
  const totalPages2 = Math.ceil(allDash?.length / pageSize);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data?.slice(startIndex, endIndex);
  };
  const [srchText, setSrchText] = useState("");

  const getCurrentPageData2 = () => {
    const startIndex = (currentPage2 - 1) * pageSize2;
    const endIndex = startIndex + pageSize2;
    return allDash?.slice(startIndex, endIndex);
  };

  const parseDate = (dateStr) => {
    if (dateStr !== null) {
      const [day, month, year] = dateStr?.split("/")?.map(Number);
      return new Date(year, month - 1, day);
    } else {
      return dateStr;
    }
  };

  const getData = async () => {
    let ans = await getAllActivities();
    setAllDash(ans?.data);
    const ans1 = await allEmployee();
    setUsers(ans1?.emp);

    const sortedArray = ans?.data.sort(
      (a, b) => parseDate(b?.Date) - parseDate(a?.Date)
    );

    setData1(sortedArray);
    const ans2 = await getDepartments();
    setDepartments(ans2.data);
  };

  // var [selectedOption, setSelectedOption] = useState("daily");
  const [date, setDate] = useState('');
  const [month, setMonth] = useState("");
  const [userId, setuserId] = useState("");
  const [department, setDepartment] = useState("Select Department");

  const handleOptionChange = () => {
    // handleSubmit();
  };



  const formateYear = (inputDate) => {
    console.log(inputDate)
    const dateObj = new Date(inputDate);
    const year = dateObj.getFullYear();
    console.log(year)
    return year
  }
  const handleDownload = async () => {
    console.log("handleDownload");
  };

  const handleShare = async () => {
    console.log("share");
  };




  const currentPageData = getCurrentPageData();

  const currentPageData2 = getCurrentPageData2();

  const [showImportPop, setShowImportPop] = useState(false);

  const [makeChange, setMakeChange] = useState(true);


  const srchHandler = (e) => {
    setSrchText(e.target.value);
  };


  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];

    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("please seelect only file type");
        setExcelFile(null);
      }
    } else {
      console.log("please select the file");
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();

    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      let toastId;
      if (data?.length > 0) {
        toastId = toast.loading("Loading....");
      }

      setExcelData(data?.slice(0, 10));
      for (let i = 0; i < data?.length; i++) {
        const { Break, date, clockIn, clockOut, Employee } = data[i];
        const excelDateObj = new Date((date - 25569) * 86400000);
        const formattedDate = format(excelDateObj, 'MM/dd/yyyy');
        const convertExcelTime = (excelTime) => {
          const totalSeconds = Math.round(excelTime * 86400);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          const date = new Date(0, 0, 0, hours, minutes, seconds);
          return format(date, 'h:mm:ss a');
        };

        const formattedClockIn = convertExcelTime(clockIn);
        const formattedClockOut = convertExcelTime(clockOut);

        const breakSeconds = parseInt(Break * 86400, 10);
        const breakHours = Math.floor(breakSeconds / 3600);
        const breakMinutes = Math.floor((breakSeconds % 3600) / 60);
        const breakSecondsRemainder = breakSeconds % 60;

        const formattedBreak = `${breakHours}:${breakMinutes}:${breakSecondsRemainder}`;

        const filterdata = users.filter(
          (item) => item?.fullName.toLowerCase() === Employee.toLowerCase()
        );

        if (filterdata?.length > 0) {
          let id = filterdata[0]?._id;
          const ans = await postAttendence({
            clockInDetail: formattedClockIn,
            clockOutDetail: formattedClockOut,
            id: id,
            breakTime: formattedBreak,
            clockInDate: formattedDate,
          });

          toast.success("Successfuly uploaded");
        }
      }

      toast.dismiss(toastId);
    }
  };

  const [optionedit, setOptionEdit] = useState(null);

  const [editForm, setEditform] = useState(null);

  const updateHandler = async () => {
    let toastId = toast.loading("Loading...");
    try {
      const ans = await updateAttendance(editForm?._id, editForm?.Date, editForm?.clockIn, editForm?.clockOut, editForm?.breakTime);

      if (ans?.status) {
        toast.success("Successfuly updated");
        setEditform(null);
        setOptionEdit(null);
        getData();
        setMakeChange((prev) => !prev);
        getAllAtt();
      }
      else {
        toast.error("Something went wrong , please try again later");
      }

    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong, please try again");
    }

    toast.dismiss(toastId);
    setEditPop(false)
    setShowIndex(null);

  }

  const convertToDisplayFormat = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleChange = (e) => {
    const inputDate = e.target.value;
    const displayDate = convertToDisplayFormat(inputDate);
    setEditform(prev => ({
      ...prev,
      Date: displayDate
    }));
  };

  const deleteHandler = async (id) => {
    const ans = await deleteAttendence(id);
    if (ans?.status) {
      toast.success("Successffuly deleted");
      setMakeChange((prev) => !prev);
    }
    else {
      toast.error("Something went wrong , please try again");
    }
  }

  const wrapperRef = useRef()

  useOutsideClick(wrapperRef, () => {
    setShowIndex(null);
    setEditPop(false);
  });

  const truncateText = (text, wordLimit, isExpanded) => {
    if (isExpanded) return text;
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const [showIndex, setShowIndex] = useState(null);


  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };
  const handleMonthChange = (selectedDate) => {
    setMonth(selectedDate);
  };

  const handleKeyPress = (e) => {
    if (!/[0-9/]/.test(e.key)) {
      e.preventDefault();
    }
  };

  


  return (
    <>
      {/* <h1>Hello Dinesh</h1> */}
      <div className="employee-dash h-full">
        <div className="w-full  relative">
        
          <div className="pt-8 pr-5 pb-8 pl-[20px] relative w-full">

            <div className="flex-col emWraping">
              {/* first  */}
              <div className="flex items-center justify-between">
                <h2 className="text-[#101820] text-xl font-semibold leading-8 text-left">Attendance  Management</h2>

              </div>

              <div className="w-full flex items-center justify-between p-6 pb-12 bg-white rounded-[5px] overflow-x-scroll gap-5 xl:overflow-x-hidden">
                <div className="flex items-center gap-[15px]">
                  <button
                    onClick={() => {
                      setSelectedOption("daily");
                      // selectedOption = "daily";
                      handleOptionChange();
                    }}
                    className={`${selectedOption === "daily" ? "w-[114px] h-[44px] rounded-[8px] border border-[#0B56E4] [background:linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)]" : "w-[114px] h-[44px] rounded-[8px] border border-[#E3E3E3]"
                      }`}
                  >
                    <span className="text-[14px] font-medium leading-6 text-left text-[#0B56E4]">Daily Report</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedOption("monthly");
                      // selectedOption = "monthly";
                      handleOptionChange();
                    }}
                    className={`${selectedOption === "monthly" ? "w-[114px] h-[44px] rounded-[8px] border border-[#0B56E4] [background:linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)]" : "w-[114px] h-[44px] rounded-[8px] border border-[#E3E3E3]"
                      }`}
                  >
                    <span className="text-[14px] font-medium leading-6 text-left text-[#0B56E4]">Monthly Report</span>
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  {selectedOption === "daily" && (
                    <>
                      <div>
                        <input
                          type="date"
                          className="w-[196px] h-[46px] rounded-[10px] bg-[#E8E9EB] border border-[#D0D4DC] py-2 px-4 cursor-pointer"
                          value={mat.date}
                          onChange={(e) => setMat({ ...mat, date: e.target.value })}
                        />
                      </div>

                      <select
                        className="w-[200px] h-[44px] rounded-[5px] border border-[#9499A0] bg-[#E8E9EB] opacity-70"
                        value={mat.department}
                        onChange={(e) => setMat({ ...mat, department: e.target.value })}
                      >
                        <option value="">All</option>
                        {allDepartment?.map((e, index) => (
                          <option value={e?.name} key={index}>
                            {e?.name}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => setDailyFilter(mat)}
                        className="cursor-pointer flex gap-2 bg-blue-700 text-white py-2 px-3 items-center rounded-md"
                      >
                        <IoSearch /> Search
                      </button>
                    </>
                  )}

                  {selectedOption === "monthly" && (
                    <>
                      <div>
                        <input
                          type="month"
                          name="month"
                          id="month"
                          value={form.year && form.month ? `${form.year}-${form.month}` : ""}
                          onChange={(e) => {
                            const [year, month] = e.target.value.split("-");
                            setForm({ ...form, month, year });
                          }}
                          className="w-[196px] h-[46px] rounded-[10px] bg-[#E8E9EB] border border-[#D0D4DC] py-2 px-4"
                        />
                      </div>

                      <select
                        className="w-[200px] h-[44px] rounded-[5px] opacity-70 border border-[#9499A0]"
                        value={form.userId}
                        onChange={(e) => setForm({ ...form, userId: e.target.value })}
                      >
                        <option value="">Select Employee</option>
                        {users?.map((e, index) => (
                          <option key={index} value={e._id}>
                            {e?.fullName}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={getMonthlyAttandance}
                        className="cursor-pointer flex gap-2 bg-blue-700 text-white py-2 px-3 items-center rounded-md"
                      >
                        <IoSearch /> Search
                      </button>
                    </>
                  )}



                </div>
              </div>

              <main className="bg-white border-t border-[#D8D8D8] -translate-y-[25px]">
                <div className="w-full flex items-center justify-between py-2.5 px-5 bg-white border-b-[1px] pb-7 overflow-x-scroll xl:overflow-x-hidden">
                  <div className="flex items-center justify-between w-full gap-[10px] translate-y-[10px] ">
                    <h3 className="text-[#1B2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left min-w-fit">Daily Attendance</h3>

                    <div className="flex items-center gap-[17px]">

                      {selectedOption !== "monthly" && <div className="flex items-center h-[44px] px-4 py-2 gap-2 rounded-[10px] bg-white border border-black justify-between">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrPage(1);
                          }}
                          placeholder="Search Employee"
                         className="outline-none"
                        />

                        {/* <img src={bxsearch} alt="" /> */}
                      </div>}


                      <CSVLink
                        headers={headers}
                        data={normalizedData}
                        filename={"daily-attendance.csv"}
                        className="px-5 py-2 border border-green-500 text-green-600 rounded hover:bg-green-50 text-sm mr-4"
                      >
                        Export
                      </CSVLink>
                    </div>
                  </div>
                </div>

              <div className="relative overflow-x-scroll ">
                  <table
                    id="table-to-xls1"
                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          Employee Code
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Employee Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Department
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Check In
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Check out
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Break
                        </th>

                        <th scope="col" className="px-4 py-3" data-exclude="true">
                          action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {paginatedData?.map((item, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-4 py-3">
                            KDS{item?.user?.employeeCode}
                          </td>
                          <td className="px-4 py-3">
                            {item?.user?.fullName}
                          </td>
                          <td className="px-4 py-3">
                            {item?.user?.department}
                          </td>
                          <td className="px-4 py-3">{item?.Date}</td>
                          <td className="px-4 py-3">
                            {calculateTime(item.clockIn, item.clockOut)
                              ? "Full Day"
                              : "Half Day"}
                          </td>

                          <td className="px-4 py-3">
                            {item?.clockIn}
                          </td>
                          <td className="px-4 py-3">
                            {item?.clockOut}
                          </td>
                          <td className="px-4 py-3">
                            {item?.breakTime ? item?.breakTime : "No break"}
                          </td>


                          <td
                          
                            className="px-4 py-3 relative"
                            data-exclude="true"
                          >
                            {/* <img src={moreVert} alt="" /> */}
                            <div
                              onClick={() => {
                                if (showIndex === index) {
                                  setShowIndex(null);
                                } else {
                                  setShowIndex(index);
                                }
                              }}
                              className="navdiv cursor-pointer"
                            >
                              {" "}
                              <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png" alt="" />
                            </div>

                            {
                              showIndex === index && (
                                <div ref={wrapperRef} onClick={() => {
                                  setEditform(item);
                                  setEditPop(true)
                                }} className="flex gap-3 items-center bg-white p-[10px] rounded-[5px] absolute right-[65px] top-[-1px] shadow-md">
                                  <MdOutlineEdit className="cursor-pointer text-[20px]" />
                                  <span className="font-normal cursor-pointer">Update</span>
                                </div>
                              
                              )
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredData?.length > 4 && (
                    <div className="flex gap-[5px] w-full items-center mt-5 justify-center mt-4">
                      <button
                        className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                        disabled={currPage === 1}
                        onClick={() => setCurrPage((prev) => prev - 1)}
                      >
                        Prev
                      </button>
                      <span className="px-6 flex items-center">
                        {currPage}
                      </span>
                      <button
                        className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                        disabled={currPage === totalPage}
                        onClick={() => setCurrPage((prev) => prev + 1)}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>





              </main>
            </div>

            {/* for  import cvv popup  */}

            {showImportPop && (
              <div className="importPopWrap">
                <div className="impPopCont">
                  <nav>
                    <h2>Import employee CSV file</h2>
                   
                  </nav>

                  <hr className="hrrr" />

                  <div className="excewrap">
                    {/* <p>Choose File</p> */}
                    <input type="file" required onChange={handleFile} />
                    <span>Exemption application</span>
                  </div>

                  <p className="extext">
                    Exemption application of nawab sharif in DV act (3).doc
                  </p>

                  <div className="impopbtn">
                    <button onClick={handleFileSubmit} className="uplaodin">
                      <span>Upload</span>
                    </button>
                    <button
                      onClick={() => {setShowImportPop(false)
                        setShowIndex()
                      }}
                      className="cence"
                    >
                      <span>Cancel</span>
                    </button>

                  </div>
                </div>
              </div>
            )}
          </div>

          {typeError && <div>{typeError}</div>}

          {
            editPop &&


            <div className="fixed inset-0 w-full min-h-screen z-[3000] bg-[#3534344d] flex justify-center items-center backdrop-blur-[1px]">


              <div ref={wrapperRef} className="w-[599px] h-[428px] p-3 rounded-[18px] flex flex-col gap-5 bg-white">

                <nav className="flex justify-between items-center">
                  <h2 className="text-[#1B2533] font-inter text-base font-semibold leading-6 tracking-[0.0015em] text-left">Edit Attendance</h2>
                
                </nav>

                <hr />

                <div className="flex gap-4 items-center w-full">

                  <label htmlFor="" className="block text-md font-normal mb-1">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Employee</p>
                    <input    className="w-[271.5px] border rounded p-2 text-sm font-normal text-gray-500" value={editForm?.user?.fullName} type="text" />
                  </label>

                  <label htmlFor="" className="block text-md font-normal mb-1">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Date</p>
                    <input onChange={handleChange} value={editForm?.Date?.split('/').reverse().join('-') || ''} type="date" 
                    
                      className="w-[271.5px] border rounded p-2 text-sm font-normal text-gray-500"/>

                  </label>

                </div>

                <div className="flex gap-4 items-center w-full">

                  <label htmlFor="" className="block text-md font-normal mb-1">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Check In</p>
                    <input
                      type="time"
                      step="1"
                      value={formatTo24HourTime(editForm?.clockIn)}
                      onChange={(e) => {
                        const formatted = formatTo12HourTime(e.target.value);
                        setEditform((prev) => ({
                          ...prev,
                          clockIn: formatted,
                        }));
                      }}
             className="border rounded p-2 text-sm font-normal text-gray-500 w-[271.5px]"
                    />
                  </label>


                  <label className="block text-md font-normal mb-1">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Check Out</p>
                    <input
                      type="time"
                      step="1"
                      value={formatTo24HourTime(editForm?.clockOut)}
                      onChange={(e) => {
                        const formatted = formatTo12HourTime(e.target.value);
                        setEditform((prev) => ({
                          ...prev,
                          clockOut: formatted,
                        }));
                      }}
                     className="w-[271.5px] border rounded p-2 text-sm font-normal text-gray-500"
                    />

                  </label>


                </div>


                <div className="flex gap-4 items-center w-full">


                  <label className="block text-md font-normal mb-1">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Break Time (hh:mm:ss)</p>
                    <input
                      type="text"
                       className="w-[271.5px] border rounded p-2 text-sm font-normal text-gray-500"
                      placeholder="e.g. 01:30:00"
                      value={editForm?.breakTime || ""}
                      onChange={(e)=>setEditform((prev)=>({
                        ...prev,breakTime:e.target.value
                      }))}
                     
                        />
                  </label>




                </div>


                <div className="flex items-center gap-4">
                  <button onClick={updateHandler} className="w-[89px] h-[40px] bg-[#0B56E4] rounded-[10px] text-white"><span>Update</span></button>
                  <button onClick={() => {
                    setEditform(null);
                    setEditPop(false);
                    setShowIndex(null)
                    // alert('alert')
                  }} className="w-[86px] h-[40px] rounded-[10px] border border-[#B8BBC0]"><span>Cancel</span></button>
                </div>

              </div>

            </div>


          }


        </div>
      </div>
    </>
  );
};

export default MarkAttendance;