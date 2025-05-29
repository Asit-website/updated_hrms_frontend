import React from "react";
import { useState, useEffect, useRef } from "react";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useLocation, NavLink } from "react-router-dom";
import { FaEye, FaRegEye } from "react-icons/fa";

import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useMain } from "../../../hooks/UseMain";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";

const AdminProfile = () => {
  const {
  
    createAnnouncement,
    fetchAnnoucement,
    allEmployee,
    getBranchs,
    getDepartments,
    deleteAnnouncements,
    updateAnnouncements,
    departmentEmployee,
  } = useMain();

  const [openForm, setOpenForm] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [department, setDepartment] = useState([]);
  const [branch, setBranch] = useState([]);

  const [searchTerm, setSearchTerm] = useState('')
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const [formdata, setFormdata] = useState({
    title: "",
    Branch: "",
    Department: "",
    Employee: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const location = useLocation();
  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [allAnnoucement, setAllAnouce] = useState([]);
  const [announcementList, setAnnouncementList] = useState([]);
  const [AnnoucSearch, setAnnounceSearch] = useState([]);
  const fromRef = useRef();
  useOutsideClick(fromRef, () => {
    setOpenForm(false);
  });
  const popRef = useRef();
  useOutsideClick(popRef, () => {
    setLeavePopup(false);
  })

    const wrapperRef = useRef();
  
    useOutsideClick(wrapperRef, () => {
      setShowIndex(null)

    });
  


  const getAnnoucement = async () => {
    const ans = await fetchAnnoucement();
    const reversedData = ans?.data?.slice().reverse();

    setAllAnouce(reversedData);
  };

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        title: editData.title,
        Branch: editData.Branch,
        Department: editData.Department,
        Employee: editData.Employee,
        startDate: editData.startDate,
        endDate: editData.endDate,
        description: editData.description,
      });
    }
  }, [editData]);

  const submitHandler = async () => {
    const toastId = toast.loading("Loading...");
    try {
      if (onEdit) {
        await updateAnnouncements({ ...formdata });
        toast.success("update successfully");
        setRefreshFlag(!refreshFlag);
      } else {
        await createAnnouncement({ ...formdata });
        toast.success("Successfuly Created");
        setRefreshFlag(!refreshFlag);
      }

      getAnnoucement();
      setOpenForm(false);
    } catch (error) {
      console.log(error);
    }
    toast.dismiss(toastId);

  };

  const getData1 = async () => {
    const ans = await getBranchs();
    const ans1 = await getDepartments();
    setBranch(ans?.data);
    setDepartment(ans1?.data);
  };

  useEffect(() => {
    getData1();
  }, [refreshFlag]);

  const employeeFetch = async () => {
    const ans2 = await allEmployee();
    setEmployee(ans2?.emp);
  };

  const [showIndex, setShowIndex] = useState(null);

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
            const toastId = toast.loading('Loading...')
            await deleteAnnouncements(id);
            toast.success("delete Successfully");
            setRefreshFlag(!refreshFlag);
            toast.dismiss(toastId)
            // getData();
          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });
  };

  const fetchDepartEmploye = async () => {
    const ans = await departmentEmployee(formdata?.Department);
    if (ans?.status) {
      setEmployee(ans?.allUser);
    }
  };

  useEffect(() => {
    if (formdata.Department === "All Department") {
      employeeFetch();
    } else if (
      formdata.Department !== "" &&
      formdata.Department !== "Select Department"
    ) {
      fetchDepartEmploye();
    }
  }, [formdata.Department]);

  useEffect(() => {
    getAnnoucement();
  }, [refreshFlag]);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const [leavePopup, setLeavePopup] = useState(false);

  const { role } = hrms_user;

  const [currentPage, setCurrentPage] = useState(1);

  let itemsPerPage = 10;

  const totalPages = Math?.ceil(allAnnoucement?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = Math.min(startIndex + itemsPerPage, allAnnoucement?.length);

  const currentItems = allAnnoucement?.slice(startIndex, endIndex);

  const filteredAnnoucements = allAnnoucement.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate filtered announcements
  const paginatedAnnouncements = filteredAnnoucements.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (
    <>
      <div className="annDash relative h-full">
       
        <div className="w-full bg-[#f5f5f5]">
         
          <div className="pt-8 pr-5 pb-8 pl-[20px] relative w-full">

            <div className="w-full flex flex-col lg:flex-row items-center justify-between">

              {location.state ? (
                <div className="flex gap-3 justify-center items-center">
                  <NavLink to={`/adminDash/HRM`}>
                    <span className="hover:text-[#1567FF] cursor-pointer text-xl">Dashboard</span>
                  </NavLink>
                  <span>
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747743027/chevron_right_ztbdvq.png" alt="" />
                  </span>{" "}
                  <span className="text-[#1567FF] cursor-pointer">Manage Announcement</span>
                </div>
              ) : (<div className="flex flex-col items-center lg:items-start gap-2">
                <h2 className="text-[24px] text-center font-semibold leading-[32px] lg:text-left text-[#101820]">Manage Announcement</h2>
                <p>
                  Dashboard <span> Announcement</span>{" "}
                </p>
              </div>)}
              <div onClick={() => setOpenForm(true)} className="flex items-center justify-center bg-[#0B56E4] h-[40px] gap-[10px] rounded-[10px] px-[10px] py-[5px] cursor-pointer" >
                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747742991/annPlus_l61eqo.png" alt="" />  <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-white">Create Announcement</span>
              </div>
            </div>

            <main className="bg-white flex flex-col mt-[20px] px-[20px] py-[10px] rounded-[20px] border-b border-[#D8D8D8]">
              {/* top */}
              <div className="anmainTop">


                {/* right side  */}
                <div className="w-60">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 pl-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  />

                </div>

              </div>

              <div className="relative overflow-x-auto md:overflow-visible min-h-[250px] rounded-lg">
                <table className="w-max lg:w-full text-sm text-left bg-white rounded-lg">
                  <thead className="bg-white font-semibold">
                    <tr>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        TITLE
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        START DATE
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        END DATE
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        DESCRIPTION
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-700">
                    {paginatedAnnouncements?.map((item, index) => (
                      <tr key={index}  className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 text-gray-800">{item.title?.slice(0, 30)}...</td>
                        <td className="px-6 py-4 text-gray-800">{item.startDate}</td>
                        <td className="px-6 py-4 text-gray-800">{item.endDate}</td>
                        <td className="px-6 py-4 text-gray-800">{item.description?.slice(0, 50)}...</td>

                        <td className="px-6 py-4 text-gray-800">
                          <div className="flex items-center relative">
                            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747634200/acy_ah4jhd.svg" alt="" className="cursor-pointer" onClick={() => setShowIndex(showIndex === index ? null : index)} />
                            {
                              showIndex === index && (
                                <div ref={wrapperRef} className="absolute right-28 flex flex-col -top-20 bg-white border border-gray-300">
                                  <div onClick={() => setLeavePopup(item)} className="items-center w-[128px] px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 cursor-pointer" >
                                     <FaRegEye className="text-[18px]"/>
                                    <span>View</span>
                                  </div>
                                  <hr />
                                  <div onClick={() => {
                                    setOnEdit(true);
                                    setEditData(item);
                                    setOpenForm(true);
                                  }} className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                   <MdOutlineEdit className="text-[18px]"/>
                                    <span>Edit</span>
                                  </div>
                                  <hr />
                                  <div onClick={() => {
                                    deleteProject(item?._id);
                                  }} className="items-center w-full px-4 py-2 text-sm flex gap-2 text-red-600 hover:bg-red-100 cursor-pointer">
                                  <MdDeleteOutline className="text-[18px]"/>
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
              </div>
            </main>

            {totalPages > 1 && (
              <div className="emPaginate">
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
              </div>
            )}



          </div>


          {
            leavePopup &&
            <div className=" flex items-center justify-center fixed inset-0 bg-black bg-opacity-40 z-[3000] backdrop-blur-[1px]">
              <div
                ref={popRef}
                className="relative w-full md:max-w-3xl h-[65vh] overflow-y-scroll overflow-x-hidden  p-6 bg-white rounded-2xl shadow-2xl space-y-4"
              >
                {/* Close Button */}
                <nav className="absolute top-4 right-4">
                  <RxCross2
                    fontSize={24}
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setLeavePopup(false)}
                  />
                </nav>

                {/* Title */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Title</h4>
                  <p className="text-lg font-medium text-blue-600">{leavePopup?.title}</p>
                </div>

                {/* From Date */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">From</h4>
                  <p className="text-base text-gray-700">{leavePopup?.startDate}</p>
                </div>

                {/* To Date */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">To</h4>
                  <p className="text-base text-gray-700">{leavePopup?.endDate}</p>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Description</h4>
                  <p className="text-base text-gray-700 whitespace-pre-wrap">{leavePopup?.description}</p>
                </div>
              </div>
            </div>

          }

        </div>

        {/* form  */}
        {openForm && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center h-screen z-[3000] backdrop-blur-[1px]">
            <form
              ref={fromRef}
              onSubmit={(e) => {
                e.preventDefault();
                submitHandler();
                setOpenForm(false);
              }}
              className="relative w-full h-[567px] custom-scroll-hidden overflow-auto max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                  {onEdit ? "Edit Announcement" : "Create New Announcement"}
                </h2>
            
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1">Announcement Title</label>
                  <input
                    id="title"
                    name="title"
                    onChange={changeHandler}
                    value={formdata?.title}
                    type="text"
                    placeholder="Enter Announcement Title"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Branch</label>
                  <select
                    id="Branch"
                    name="Branch"
                    onChange={changeHandler}
                    value={formdata?.Branch}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Select Branch</option>
                    {branch?.map((val, index) => (
                      <option key={index} value={val.name}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Department</label>
                  <select
                    id="Department"
                    name="Department"
                    onChange={changeHandler}
                    value={formdata?.Department}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Select Department</option>
                    <option value="All Department">All Department</option>
                    {department?.map((val, index) => (
                      <option key={index} value={val.name}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Employee</label>
                  <select
                    id="Employee"
                    name="Employee"
                    onChange={changeHandler}
                    value={formdata?.Employee}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Select Employee</option>
                    <option value="All Employee">All Employee</option>
                    {employee?.map((val, index) => (
                      <option key={index} value={val.fullName}>
                        {val.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Announcement Start Date</label>
                  <input
                    id="startDate"
                    name="startDate"
                    value={formdata.startDate}
                    onChange={changeHandler}
                    type="date"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Announcement End Date</label>
                  <input
                    id="endDate"
                    name="endDate"
                    value={formdata.endDate}
                    onChange={changeHandler}
                    type="date"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Announcement Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formdata?.description}
                  onChange={changeHandler}
                  rows="4"
                  placeholder="Enter Announcement Description"
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="absolute bottom-0 left-0 w-full bg-white p-4 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpenForm(false);
                    setOnEdit(false);
                    setEditData({});
                    setFormdata({
                      title: "",
                      Branch: "",
                      Department: "",
                      Employee: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    });
                  }}
                  className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
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

export default AdminProfile;
