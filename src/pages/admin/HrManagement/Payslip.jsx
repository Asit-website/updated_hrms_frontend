import "react-calendar/dist/Calendar.css";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useReactToPrint } from "react-to-print";
import { useMain } from "../../../hooks/UseMain";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";


const Payslip = () => {
  const { user, getUserSlip, togglePayslip, buildAPI, setUserTotalLeaveApi } =
    useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));

  const { role } = hrms_user;
  const { paySlipActionPermission } = hrms_permission;

  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const [openPayslip, setOpenPayslip] = useState(false);

  const styleperr = {
    display: show ? "block" : "none",
  };

  const [formdata, setFormdata] = useState({
    month: "January",
    year: "2024",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [data, setData] = useState([]);

  const [showToggle, setShowToggle] = useState(null);

  const [popdata, setPopData] = useState(null);

  const [totaldata, setTotaldata] = useState([]);

  const fetchUserSlip = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    const ans = await getUserSlip(formdata.month, formdata.year);
    if (ans?.status) {
      setData(ans?.payslipDetails);
      setTotaldata(ans?.payslipDetails);
    }

    setLoading(false);
  };

  const toggleStatus = async (userId) => {
    const toastId = toast.loading("Loading...");
    const ans = await togglePayslip(userId, formdata.month, formdata.year);
    if (ans?.status) {
      fetchUserSlip(false);
      toast.success("Successfuly updated");
    } else {
      toast.error("Something went wrong , plese try again");
    }

    toast.dismiss(toastId);
    setShowToggle(null);
  };

  useEffect(() => {
    fetchUserSlip();
  }, [formdata.month, formdata.year]);

  useEffect(() => {
    let toastId;
    if (loading) {
      toastId = toast.loading("Loading...");
    } else {
      toast.dismiss(toastId);
    }
  }, [loading]);

  const bulkPaymentHandler = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await buildAPI(formdata.month, formdata.year);
    if (ans?.status) {
      toast.success("Successfuly done");
      setShow(false);
      fetchUserSlip();
    } else {
      toast.error("Something went wrong , please try again");
    }

    toast.dismiss(toastId);
  };

  const contonentPDF = useRef();

  const generatePdf = useReactToPrint({
    content: () => contonentPDF.current,
    documentTitle: "Order",
    parentContainer: {
      "@media print": {
        display: "block",
      },
    },
    onAfterPrint: () => alert("already saved"),
  });

  const deductionData = () => {
    if (parseInt(popdata?.totalLeaves) > 2) {
      let leftLeave;
      if (popdata?.user?.totalLeaves > parseInt(hrms_user?.userAllowance)) {
        leftLeave = parseInt(popdata?.totalLeaves);
      } else {
        leftLeave = parseInt(popdata?.totalLeaves) - 2;
      }
      let netsalary = popdata?.user?.netSalary;
      let perdaySalary = parseInt(netsalary / 30);
      return perdaySalary * leftLeave;
    } else {
      return 0;
    }
  };

  const setUsersTotalLeaves = async () => {
    const ans = await setUserTotalLeaveApi();
  };

  useEffect(() => {
    setUsersTotalLeaves();
  }, []);

  const [srchtxt, setsrchtxt] = useState("");

  useEffect(() => {
    if (srchtxt === "") {
      setData(totaldata);
    } else {
      const filterdata = totaldata?.filter((f) =>
        f?.user?.fullName?.toLowerCase()?.includes(srchtxt?.toLowerCase())
      );
      setData(filterdata);
    }
  }, [srchtxt]);

  //Pagination part is implemented here

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const popwrapper = useRef();

  useOutsideClick(popwrapper, () => {
    setShowToggle(null);
  });
  const tableRef = useRef(null);
  return (
    <>
      <div className={`employee-dash  h-full`}>
       
        <div className="tm">
         

          <div className={`relative w-full px-[20px] pt-[32px] pb-[32px] pl-[20px] ${openPayslip ? "hidenOverflow" : ""} `}>
            <div className="flex-col flex gap-[24px]">
              {/* first  */}
              <div className="flex items-center justify-between htmj">
                <h2 className="text-[#101820] text-xl font-semibold leading-8 text-left">Payslip</h2>
                <button onClick={() => setShow(true)} className="flex items-center justify-center gap-1 bg-[#0B56E4] h-[40px] w-[143px] rounded-[8px] text-white">Bulk Payment</button>
              </div>

              <div className="bg-white border border-[#d8dbdf] rounded-[10px] shadow-[0px_8px_24px_rgba(208,212,216,0.2)] pt-[5px] pb-[20px]">
                <div className="flex items-center pt-5 gap-2 overflow-x-scroll lg:overflow-x-hidden pr-5">
                  <div className="type_date">
                    <select
                    className="w-[196px] h-[46px] border border-[#969BA1] bg-[#E8E9EB] outline-none text-[#1B2533] text-sm font-normal rounded-[6px] ml-5"
                      name="month"
                      onChange={changeHandler}
                      value={formdata.month}
                      id=""
                    >
                      <option>January</option>
                      <option>Febuary</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                      <option>November</option>
                      <option>December</option>
                    </select>
                  </div>
                  <div className="type_year">
                    <select
                    className="w-[196px] h-[46px] border border-[#969BA1] bg-[#E8E9EB] outline-none text-[#1B2533] text-sm font-normal rounded-[6px] ml-[10px]"
                      name="year"
                      value={formdata.year}
                      onChange={changeHandler}
                      id=""
                    >
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                      <option>2027</option>
                      <option>2028</option>
                      <option>2029</option>
                      <option>2030</option>
                    </select>
                  </div>
                  <div className="btn_export">
                    <button className="w-[99px] h-[44px] border border-[#189877] bg-[#E8F5F1] rounded-[6px] ml-[10px] text-[#189877] font-medium text-base">Export</button>
                 <DownloadTableExcel
        filename="users_table"
        sheet="users"
        currentTableRef={tableRef.current}>
      </DownloadTableExcel>
                   
                  </div>
                </div>

                <div className="flex items-center justify-between px-[25px] mb-5 mt-4 gap-3">
                  <h3 className="font-semibold min-w-fit">Employee Payslip</h3>

                  <form className="max-w-md">
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute sonit inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Employee"
                        required=""
                        onChange={(e) => setsrchtxt(e.target.value)}
                        value={srchtxt}
                      />
                    </div>
                  </form>
                </div>

                <div className="relative overflow-x-auto w-full">
                  <table
                    id="table-to-xls"
                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className="sipi">
                        <th scope="col" className="px-6 py-3">
                          Employee ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Employee Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Payroll Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Salary
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Month Leave
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Net Salary
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems
                        .filter(
                          (x) =>
                            x.user.designation !== "CEO" &&
                            x.user._id !== user._id
                        )
                        ?.map((item, index) => (
                          <tr
                            key={index}
                            className="bg-white opos border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <td className="px-6 py-4">
                              #KDS{item?.user?.employeeCode}
                            </td>
                            <td className="px-6 py-4">
                              {item?.user?.fullName}
                            </td>
                            <td className="px-6 py-4">
                              {item?.user?.paySlipType}
                            </td>
                            <td className="px-6 py-4">
                              {item?.user?.salary ? item?.user?.salary : "00"}
                            </td>

                            <td className="px-6 py-4">{item?.totalLeaves}</td>
                            <td className="px-6 py-4">
                              {item?.user?.netSalary}
                            </td>

                            <td className={`px-6 py-4 `}>
                              {" "}
                              <span
                                className={`${item?.status === "Unpaid" ? "w-[61px] h-[28px] border border-[#E45D3A] rounded-[27px] bg-[#FCEBE6] px-[20px] py-[10px] text-[#E45D3A] font-inter text-[12px] font-normal leading-[16px] tracking-[0.004em]" : "w-[61px] h-[28px] border border-[#189877] rounded-[27px] bg-[#E8F5F1] px-[20px] py-[10px] text-[#189877] text-[12px] font-normal leading-[16px] tracking-[0.004em]"
                                  } `}
                              >
                                {item?.status}
                              </span>{" "}
                            </td>

                            <td>
                              {(paySlipActionPermission ||
                                role === "ADMIN") && (
                                  <div className="relative">
                                    <td
                                      className="px-6 py-4"
                                    >
                                      <img
                                        onClick={() => {
                                          if (showToggle === index) {
                                            setShowToggle(null);
                                          } else {
                                            setShowToggle(index);
                                          }
                                        }}
                                        className="cursor-pointer" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747634200/acy_ah4jhd.svg" alt="acy" />
                                    </td>
                                    {showToggle === index && (
                                      <div className="absolute bg-white w-[170px] z-[100] h-fit border border-[#E3E3E3] shadow-[0px_4px_12px_0px_#1A1A1A33] top-[-44px] right-[65px]" ref={popwrapper}>
                                        <p
                                        className="cursor-pointer text-[#2B2B2B] text-sm font-normal leading-[20px] tracking-[0.0025em] text-left px-[10px] py-[10px] border-b border-[#E8E9EB] transition duration-200 hover:bg-[#0B56E4] hover:text-white"
                                          onClick={() => {
                                            toggleStatus(item?.user?._id);
                                          }}
                                        >
                                          Click to{" "}
                                          {item?.status === "Unpaid"
                                            ? "Paid"
                                            : "Unpaid"}
                                        </p>
                                        <p
                                          className="cursor-pointer text-[#2B2B2B] text-sm font-normal leading-[20px] tracking-[0.0025em] text-left px-[10px] py-[10px] border-b border-[#E8E9EB] transition duration-200 hover:bg-[#0B56E4] hover:text-white"
                                          onClick={() => {
                                            setOpenPayslip(true);
                                            setShowToggle(null);
                                            setPopData(item);
                                          }}
                                        >
                                          Payslip
                                        </p>
                                        {/* <p>Delete </p> */}
                                      </div>
                                    )}
                                  </div>
                                )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center mt-5">
                    <div className="next">
                      <button
                      className="border border-[#D8D8D8] rounded-[5px] w-[55px] h-[26px] flex items-center justify-evenly mx-[5px]"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      >
                        <span className="text-[#101820]">Prev</span>
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
                    <div className="w-[26px] h-[26px] border border-[#D8D8D8] flex items-center justify-center rounded-[5px] mx-[5px]">
                      <p className="text-[#2B2B2B] text-xs font-medium leading-4 text-left">{currentPage}</p>
                    </div>
                    <div className="next">
                      <button
                      className="border border-[#D8D8D8] rounded-[5px] w-[55px] h-[26px] flex items-center justify-evenly mx-[5px]"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        <span className="text-[#101820]">Next</span>
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===============modal of export start========= */}
      <>
        {/* Modal toggle */}
        {/* Main modal */}
        <div
          style={styleperr}
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="hidden h-screen bg-[#4040404D] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative max-w-[493px] w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 sijk">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white gd">
                  Bulk Payment
                </h3>
                <img
                  className="cursor-pointer"
                  onClick={() => {
                    setShow(false);
                  }}
                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747634150/oot_xn6y0l.svg"
                  alt="oot"
                />
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base ipsd leading-relaxed text-gray-500 dark:text-gray-400">
                  Total Unpaid Employee 24 out of 23
                </p>
              </div>
              {/* Modal footer */}
              <div className="flex  thj items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={bulkPaymentHandler}
                  data-modal-hide="default-modal"
                  type="button"
                  className="text-white bulk bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Bulk Payment
                </button>
                <button
                  onClick={() => setShow(false)}
                  data-modal-hide="default-modal"
                  type="button"
                  className="py-2.5 ml-3 cancol px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* ========================modal of export end=============== */}

      {/*  =================== this is openpayslip ============================= */}

      {openPayslip && (
        <div className="fixed w-screen overflow-hidden top-0 left-0 right-0 bg-[#4040404D] h-screen z-[3000] backdrop-blur-[1px]">
          <div ref={contonentPDF} className="w-[814px] h-[580px] p-[12px] rounded-[12px] flex flex-col gap-[24px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <nav className="flex items-center justify-between">
              <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747634105/kdslogo_j8mtt1.png" alt="" className="kdslogo" />

              {/* <button onClick={generatePdf}>Print</button> */}

              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold leading-6 tracking-[0.005em] text-left text-[#2B2B2B]">Kushel Digi Solutions</h3>
                <p className="text-xs font-medium leading-4 text-left">
                  G-9, first Floor, Sector 63, Noida, Noida, <br />
                  Uttar pradesh-251352
                </p>
              </div>

              <img
                onClick={() => setOpenPayslip(false)}
                className="cursor-pointer"
                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747634238/cancell_jq39hl.png"
                alt=""
              />
            </nav>
            <div className="flex items-center justify-center">
              <button
                id="test_print"
                onClick={() => {
                  generatePdf();
                }}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[150px] max-w-full block mx-auto"
              >
                Print
              </button>
            </div>
            <hr />
            <h3 className="text-center font-semibold text-sm uppercase">
              Payslip for the month of {popdata?.month} - {popdata?.year}
            </h3>
            <hr />
            <div>
              <div className="flex gap-[50px] max-w-[600px] w-full justify-between">
                {/* left side */}
                <div className="max-w-[300px] flex flex-col gap-[10px]">
                  <label className="flex items-center gap-[10px]">
                    <p className="text-[#2B2B2B] text-xs font-medium leading-4 tracking-[0.004em] text-left">Employee Name :</p>
                    <p className="text-[#2B2B2B] text-xs font-medium leading-4 tracking-[0.004em] text-left">{popdata?.user?.fullName}</p>
                  </label>

                  <label className="flex items-center gap-[10px]">
                    <p className="text-[#2B2B2B] text-xs font-medium leading-4 tracking-[0.004em] text-left">Designation :</p>
                    <p className="text-[#2B2B2B] text-xs font-medium leading-4 tracking-[0.004em] text-left">{popdata?.user?.designation}</p>
                  </label>

                  <label className="flex items-center gap-[10px]">
                    <p className="text-[#2B2B2B] text-xs font-medium leading-4 tracking-[0.004em] text-left">Joining Date :</p>
                    <p className="text-[#2B2B2B] text-xs font-medium leading-4 tracking-[0.004em] text-left">{popdata?.user?.joiningDate}</p>
                  </label>
                </div>

                {/* rigth side */}
                <div className="flex flex-col gap-2">
                  
                  <label className="flex gap-[10px]">
                    <p className="text-[#2B2B2B] text-xs font-medium leading-4 tracking-[0.004em] text-left">Employee Code : </p>
                    <p className="text-[#2B2B2B] text-xs font-medium leading-4 tracking-[0.004em] text-left">KDS{popdata?.user?.employeeCode}</p>
                  </label>
                  <label className="flex gap-[10px]">
                    <p className="text-[#2B2B2B] text-xs font-medium leading-4 tracking-[0.004em] text-left">Father Name : </p>
                    <p className="text-[#2B2B2B] text-xs font-medium leading-4 tracking-[0.004em] text-left">{popdata?.user?.father}</p>
                  </label>

                  <label className="flex gap-[10px]">
                    <p className="text-[#2B2B2B] text-xs font-medium leading-4 tracking-[0.004em] text-left">Pan no : </p>
                    <p className="text-[#2B2B2B] text-xs font-medium leading-4 tracking-[0.004em] text-left">{popdata?.user?.pan}</p>
                  </label>
                </div>
              </div>

              <div className="">
                <div class="relative overflow-hidden">
                  <table class="w-full text-sm text-left rtl:text-right  ">
                    <thead class="text-xs vhg  uppercase bg-gray-50 dark:bg-gray-700 ">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Earning Type
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Pay Rate
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Type
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Month Leave
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="vhg">
                      <tr class="bg-white ">
                        <td class="px-6 py-4">Basic Salary</td>
                        <td class="px-6 py-4">{popdata?.user?.salary}</td>
                        <td class="px-6 py-4">Monthly Payslip</td>
                        <td class="px-6 py-4">{popdata?.totalLeaves}</td>
                        <td class="px-6 py-4">{popdata?.user?.netSalary}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="w-full flex flex-col items-end gap-2 mt-6">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium leading-4 text-left">Deduction :</p>
                    <p className="text-xs font-medium leading-4 text-left"> {deductionData()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium leading-4 text-left">Total Earning :</p>
                    <p className="text-xs font-medium leading-4 text-left"> {popdata?.user?.netSalary - deductionData()}</p>
                  </div>
               
                </div>
              </div>

              <div className="flex flex-col gap-[8px]">
                <h3>Employee Signature</h3>
                <p>Paid By</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  =================== end  is openpayslip ============================= */}
    </>
  );
};

export default Payslip;
