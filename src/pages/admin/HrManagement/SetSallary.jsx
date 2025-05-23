
import "react-calendar/dist/Calendar.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaRegEye } from "react-icons/fa";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";
import { useMain } from "../../../hooks/UseMain";


const EmployeeSalary = ({ pop, setPop }) => {
  const { user, getUsers } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const ans = await getUsers();
    console.log(ans?.data);
    setData(ans?.data);
  };

  const navigate = useNavigate();

  const [searchtext, setSearchTxt] = useState("");

  const filteredData = data
    ?.filter((x) => x?.designation !== "CEO" && x?._id !== user?._id)
    ?.filter((x) =>
      x?.fullName?.toLowerCase()?.includes(searchtext?.toLowerCase())
    );

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData?.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(filteredData?.length / entriesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on new search
  }, [searchtext]);

  const [showIndex, setShowIndex] = useState(null);

    const popupwrapper = useRef();
  
    useOutsideClick(popupwrapper, () => {
      setShowIndex(null);
    });

  return (
    <>
      <div className="employee-dash h-full">
       
        <div className="tm">
          

          <div className="pt-[32px] pr-[20px] pb-[32px] pl-[20px] relative w-full
">
            <div className="flex-col flex gap-[24px]">
              {/* first */}
              <div className="flex items-center justify-between">
                <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px] text-left">Manage Employee Salary</h2>
              </div>

              <div className="bg-white border border-[#d8dbdf] rounded-[10px] shadow-[0px_8px_24px_rgba(208,212,216,0.2)] pt-[5px] pb-[20px]
">
                <div className="flex items-center justify-between px-[25px] gap-3
">
                  <h3 className="font-medium">Employee</h3>

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
                        onChange={(e) => setSearchTxt(e.target.value)}
                        value={searchtext}
                      />
                    </div>
                  </form>
                </div>

                <div className="relative w-full overflow-x-auto rounded-lg">
                  <table className="min-w-full text-sm text-left bg-white rounded-lg">
                    <thead className="bg-white font-semibold">
                      <tr className="sipi">
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          Employee ID
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          Employee Name
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          Payroll Type
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          Salary
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          Net Salary
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEntries?.map((val, index) => {
                        return (
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 oklo font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              #KDS{val?.employeeCode}
                            </th>
                            <td className="px-6 py-4 text-gray-800">{val?.fullName}</td>
                            <td className="px-6 py-4 text-gray-800">Monthly Payslip</td>
                            <td className="px-6 py-4 text-gray-800">₹{val?.salary}</td>
                            <td className="px-6 py-4 text-gray-800">₹{val?.netSalary}</td>
                            <td

                              className="px-6 py-4 text-gray-800 relative"
                            >
                              <img className=" cursor-pointer" onClick={()=> setShowIndex(showIndex === index ? null : index)} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png" alt="three-dots" />
                              {
                                showIndex === index && (
                                  <div ref={popupwrapper} onClick={() => {
                                    navigate(`/adminDash/setAll/${val?._id}`, {
                                      state: val?._id,
                                    });setShowIndex(null)
                                  }} 
                                   className="absolute cursor-pointer -left-10 top-2 flex gap-2 items-center bg-white px-2 py-2 border border-gray-300 rounded-md">
                                  
                                    <FaRegEye fontSize={18} className="cursor-pointer" />
                                    <span>View </span>
                                  </div>
                                )
                              }
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="pagination navbuttons flex justify-center items-center mt-4">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                    >
                      Previous
                    </button>

                    <span className="px-4">{currentPage}</span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeSalary;
