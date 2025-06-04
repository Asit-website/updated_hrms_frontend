import React from "react";
import { useEffect, useRef, useState } from "react";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useMain } from "../../../hooks/UseMain";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";

const   Appraisal = () => {
  const {

    getAppraisal,
    createAppraisal,
    allEmployee,
    getBranchs,
    deleteApprisal,
    updateApprisal,
  } = useMain();

  const [openForm, setOpenForm] = useState(false);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [data, setData] = useState([]);

  const [employee, setEmployee] = useState([]);

  const [branch, setBranch] = useState([]);

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [showIndex, setShowIndex] = useState(null);

  const [formdata, setFormdata] = useState({
    Branch: "",
    Employee: "",
    SelectMonth: "",
    remarks: "",
  });

  const getData = async () => {
    const ans = await getAppraisal();
    const sortedData = ans?.data?.sort((a, b) =>
      new Date(b.SelectMonth) - new Date(a.SelectMonth)
    );
    setData(sortedData);
  };

  useEffect(() => {
    getData1();
  }, []);

  const getData1 = async () => {
    const ans = await getBranchs();
    setBranch(ans?.data);
  };

  const fetchEmployee = async () => {
    const ans = await allEmployee();
    const activeEmployees = ans?.emp?.filter(emp => emp.isDeactivated === "No");
    console.log("active employees", activeEmployees);
    setEmployee(activeEmployees);
  };

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
            await deleteApprisal(id);
            toast.success("Deleted Successfully");
            setRefreshFlag(!refreshFlag);
            getData();
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
    getData();
    fetchEmployee();
  }, [refreshFlag]);

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        Branch: editData.Branch,
        SelectMonth: editData.SelectMonth,
        Employee: editData.Employee,
        remarks: editData.remarks,
      });
    }
  }, [editData]);

  const submitHandler = async () => {
    if (formdata.Branch === "") {
      return toast.error("Please select Branch");
    }
    if (formdata.Employee === "") {
      return toast.error("Please select Employee");
    }
    if (formdata.SelectMonth === "") {
      return toast.error("Please select Month");
    }
    try {
      if (onEdit) {
        await updateApprisal({ ...formdata });
        toast.success("update successfully");
        setFormdata({
          Branch: "",
          Employee: "",
          SelectMonth: "",
          remarks: "",
        })
        setRefreshFlag(!refreshFlag);
      } else {
        await createAppraisal({ ...formdata });
        toast.success("Successfuly Created");
        setFormdata({
          Branch: "",
          Employee: "",
          SelectMonth: "",
          remarks: "",
        })
        setRefreshFlag(!refreshFlag);
      }
      setOpenForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = data.filter((item) =>
    (item.Employee?.toLowerCase() || "").includes(searchTerm.toLowerCase().trim()) ||

    (item.Branch?.toLowerCase() || "").includes(searchTerm.toLowerCase().trim())

  );

  useEffect(() => {
    console.log("Search Term:", searchTerm);
    console.log("Filtered Data Length:", filteredData.length);
  }, [searchTerm, data]);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const openFormWrapper = useRef();
  const openpopwrapper = useRef();

  useOutsideClick(openFormWrapper, () => {
    setOpenForm(false);
    setOnEdit(false);
    setEditData({});
    setFormdata({
      Branch: "",
      Employee: "",
      SelectMonth: "",
      remarks: "",
    });
  })

  useOutsideClick(openpopwrapper, () => {
    setShowIndex(null)
  })

  return (
    <>
      <div className="annDash relative h-full">
       

        <div className=" w-full">
          
          <div className="pt-8 pb-8 pr-5 pl-5 relative w-full">
            <div className="w-full flex items-center justify-between flex-col lg:flex-row">
              {/* left sie */}
              <div className="anNavLeft">
                <h2 className="text-2xl font-semibold leading-8 text-left text-[#101820]">Manage Appraisal</h2>
                <p className="text-xs font-medium leading-4 lg:text-left mt-1 text-center">
                  Dashboard <span> Appraisal</span>{" "}
                </p>
              </div>

              {/* rogth side  */}
              {/* <div onClick={() => setOpenForm(true)} className='plusImg'>
                <img src={annPlus} alt="" />

              </div> */}
              <button
                onClick={() => setOpenForm(true)}
                className="flex items-center justify-center bg-[#0B56E4] w-[65px] h-[40px] gap-2.5 rounded-[10px] min-w-fit mt-4 lg:mt-0"
                style={{
                  color: "white",
                  padding: "10px 20px",
                  fontSize: "16px",
                  width: "11rem",
                }}
              >
                Create Appraisal
              </button>
            </div>

            <main className="bg-white flex flex-col mt-5 py-2.5 rounded-[20px] border-gray-300">
              {/* top */}
              <div className="flex items-center justify-between">
                {/* left side */}
                <div className="flex items-center gap-2.5 text-[#1B2533] text-base font-medium leading-6 tracking-[0.0015em] text-left">
                 
                </div>

                {/* right side  */}
                <div className="px-4 py-2 gap-2 flex items-center rounded-[10px] bg-white border border-[#D0D4DC]">
                  <input type="text" 
                  className="text-[#666D76] text-sm font-normal leading-5 tracking-[0.0025em] text-left outline-none"
                  placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div class="relative overflow-x-auto bg-grey rounded-xl border-2 mt-3 pb-2">
                <table class="min-w-full text-sm text-left bg-white ">
                  <thead class="bg-white font-semibold">
                    <tr>
                      <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        BRANCH
                      </th>
                      <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        DEPARTMENT
                      </th>
                      <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        DESIGNATION
                      </th>
                      <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        EMPLOYEE
                      </th>
                      <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        TARGET RATING
                      </th>
                      <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        OVERALL RATING
                      </th>
                      <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        APPRAISAL DATE
                      </th>
                      <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentEntries.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 text-gray-800">{item.Branch}</td>
                        <td className="px-6 py-4 text-gray-800">{item.department}</td>
                        <td className="px-6 py-4 text-gray-800">{item.designation}</td>
                        <td className="px-6 py-4 text-gray-800">{item.Employee}</td>
                        <td className="px-6 py-4 text-gray-800">{item.targetRating}</td>
                        <td className="px-6 py-4 text-gray-800">{item.overallRating}</td>
                        <td className="px-6 py-4 text-gray-800">{item.SelectMonth}</td>
                        <td className="px-6 py-4 text-gray-800">
                          <div className="flex items-center sk relative">
                            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png" className="cursor-pointer" alt="" onClick={() => setShowIndex(showIndex === index ? null : index)} />
                            {
                              showIndex === index && (
                                <div ref={openpopwrapper} className="absolute bg-white p-2 rounded-md border border-gray-300 right-9 -top-12">
                                  <div onClick={() => {
                                    setOnEdit(true);
                                    setEditData(item);
                                    setOpenForm(true);
                                    setShowIndex(null);
                                  }} className="flex items-center gap-3 p-1 cursor-pointer">
                                    {/* <i
                             
                               className="fa-solid fa-pen-to-square"
                             ></i> */}
                                    <MdOutlineEdit className="text-[18px]" />
                                    <span>Edit</span>
                                  </div>
                                  <hr />
                                  <div onClick={() => {
                                    deleteProject(item?._id);
                                    setShowIndex(null);
                                  }} className="flex items-center gap-3 p-1 cursor-pointer">
                                    {/* <i
                              
                               className="fa-solid fa-trash"
                             ></i> */}
                                    <MdDeleteOutline className="text-[18px]" />
                                    <span>Delete</span>
                                  </div>
                                </div>
                              )
                            }
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {totalPages > 1 && (
                  <div className="pagination navbuttons gap-[5px] w-full flex justify-center items-center mt-4">
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

                {/* <p className="showText">Showing 1 to 1 of 1 entries</p> */}
              </div>
            </main>
          </div>
        </div>

        {/* form  */}
        {openForm && (
          <div className="fixed inset-0 w-full min-h-screen h-full bg-black bg-opacity-30 flex items-center justify-center z-[3000] backdrop-blur-[1px]">
            <form
              onSubmit={() => {
                submitHandler();
                setOpenForm(false);
              }}
              className="flex flex-col bg-white max-w-[600px] w-full px-7 py-4 rounded-[20px] gap-4 marginTop"
              ref={openFormWrapper}
            >
              <nav className="flex items-center justify-between">
                {/* left  */}
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-6 tracking-[0.0015em] text-left">{onEdit ? "Update Appraisal" : "Create New Appraisal"} </h2>
              
              </nav>

              <hr />

              <div className="flex flex-wrap gap-y-5 gap-x-12 overflow-y-auto h-[400px]">
                <label htmlFor="" className="w-full flex flex-col gap-2">
                  <p className="text-[#1B2533] text-sm font-normal leading-5 tracking-[0.0025em] text-left">Branch <span className="text-red-600">*</span></p>
                  <select
                  className="h-11 rounded-sm border border-[#293240] p-2.5"
                    onChange={changeHandler}
                    value={formdata.Branch}
                    name="Branch"
                  >
                    <option value="Select Branch">Select Branch</option>
                    {branch?.map((val, index) => {
                      return (
                        <option key={index} value={val?.name}>
                          {val?.name}
                        </option>
                      );
                    })}
                  </select>
                </label>

                <label className="w-[45%] flex flex-col gap-2">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left">Employee <span className="text-red-600">*</span></p>
                  <select
                  className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"
                    onChange={changeHandler}
                    value={formdata.Employee}
                    name="Employee"
                  >
                    <option value="Select Employee">Select Employee</option>
                    {employee.map((item, index) => (
                      <option value={item.fullName} key={index}>
                        {item.fullName}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="w-[45%] flex flex-col gap-2">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left">Select Date <span className="text-red-600">*</span></p>
                  <input
                  className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"
                    name="SelectMonth"
                    value={formdata.SelectMonth}
                    onChange={changeHandler}
                    type="date"
                  />
                </label>

                <label htmlFor="remarks" className="w-full flex flex-col gap-2">
                  <p className="text-[#1B2533] text-sm font-normal leading-5 tracking-[0.0025em] text-left">Remarks</p>
                  <textarea
                  className="p-2.5 border border-black h-[130px]"
                    onChange={changeHandler}
                    value={formdata.remarks}
                    name="remarks"
                    placeholder="Enter remark"
                    id="remarks"
                    cols="20"
                    rows="3"
                  ></textarea>
                </label>
              </div>

              <hr />

              <div className="w-full flex gap-8 justify-start">
                <button
                  type="button"
                  onClick={() => {
                    setOpenForm(false);
                    setOnEdit(false);
                    setEditData({});
                    setFormdata({
                      Branch: "",
                      Employee: "",
                      SelectMonth: "",
                      remarks: "",
                    });
                  }}
                  className="w-[86px] h-[37px] rounded-[5px] flex justify-center items-center border border-[#B8BBC0] text-[16px] font-medium leading-6 tracking-[0.005em] text-[#666D76]"
                >
                  Cancel
                </button>
                <button type="submit" className="w-[76px] h-[37px] flex justify-center items-center rounded-[10px] bg-[#0B56E4] font-inter text-[16px] font-medium leading-6 tracking-[0.005em] text-white">
                  {onEdit ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Appraisal;
