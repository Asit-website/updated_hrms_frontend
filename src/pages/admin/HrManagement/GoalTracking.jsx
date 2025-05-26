
import { useEffect, useRef, useState } from "react";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import toast from "react-hot-toast";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

import { useMain } from "../../../hooks/UseMain";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";

const GoalTracking = () => {
  const {

    createTracks,
    getBranchs,
    getTracks,
    deleteTracks,
    updateTracks,
  } = useMain();

  const [openForm, setOpenForm] = useState(false);

  const [data, setData] = useState([]);

  const [branch, setBranch] = useState([]);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [showIndex, setShowIndex] = useState(null);

  const [formdata, setFormdata] = useState({
    Branch: "",
    GoalType: "",
    startDate: "",
    endDate: "",
    subject: "",
    target: "",
    description: "",
    status: "",
    rating: "",
    progress: "",
  });

  useEffect(() => {
    getData();
    getData1();
  }, [refreshFlag]);

  const getData1 = async () => {
    const ans = await getBranchs();
    setBranch(ans?.data);
  };

  const getData = async () => {
    const ans = await getTracks();
    setData(ans?.data?.reverse());
  };

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        Branch: editData.Branch,
        GoalType: editData.GoalType,
        startDate: editData.startDate,
        endDate: editData.endDate,
        subject: editData.subject,
        target: editData.target,
        description: editData.description,
        status: editData.status,
        rating: editData.rating,
        progress: editData.progress,
      });
    }
  }, [editData]);

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    if (formdata.Branch === "") {
      return toast.error("Please Select a Branch")
    }
    if (formdata.GoalType === "") {
      return toast.error("Please Select a GoalType")
    }
    if (formdata.startDate === "") {
      return toast.error("Please Select Start Date")
    }
    if (formdata.endDate === "") {
      return toast.error("Please Select End Date")
    }
    if (formdata.subject.trim() === "") {
      return toast.error("Please Write Subject")
    }
    if (formdata.target.trim() === "") {
      return toast.error("Please Write Your Target")
    }
    if (formdata.status === "") {
      return toast.error("Please Select Status")
    }
    if (formdata.progress === "") {
      setFormdata({
        ...formdata,
        progress: 0
      })
    }
    try {
      if (onEdit) {
        await updateTracks({ ...formdata });
        toast.success("update successfully");
        setFormdata({
          Branch: "",
          GoalType: "",
          startDate: "",
          endDate: "",
          subject: "",
          target: "",
          description: "",
          status: "",
          rating: "",
          progress: "",
        })
        setRefreshFlag(!refreshFlag);
      } else {
        await createTracks({ ...formdata });
        toast.success("Successfuly Created");
        setFormdata({
          Branch: "",
          GoalType: "",
          startDate: "",
          endDate: "",
          subject: "",
          target: "",
          description: "",
          status: "",
          rating: "",
          progress: "",
        })
        setRefreshFlag(!refreshFlag);
      }
      setOpenForm(false);
    } catch (error) {
      console.log(error);
    }
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
            await deleteTracks(id);
            toast.success("Delete Successfully");
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
  //Implementing search functionality
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item =>
    item.GoalType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.target.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Pagination states
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
      GoalType: "",
      startDate: "",
      endDate: "",
      subject: "",
      target: "",
      description: "",
      status: "",
      rating: "",
      progress: "",
    });
  });

  useOutsideClick(openpopwrapper, () => {
    setShowIndex(null);
  })
  return (
    <>
      <div className="annDash relative h-full">
      
        <div className="w-full bg-[#f5f5f5]">
       
          <div className="pt-8 pb-8 pr-5 pl-5 relative w-full">
            <div className="w-full flex flex-col sm:flex-row items-center justify-between">
              {/* left sie */}
              <div className="flex flex-col gap-2">
                <h2 className="text-[24px] font-semibold leading-[32px] text-left text-[#101820]">Manage Goal Tracking</h2>
                <p className="text-[12px] font-medium leading-[16px] text-left">
                  Dashboard <span>Goal Tracking</span>{" "}
                </p>
              </div>
              <button
                onClick={() => setOpenForm(true)}
                className="flex items-center bg-[#0B56E4] w-[65px] h-[40px] gap-[10px] rounded-[10px] justify-center min-w-fit"
                style={{
                  color: "white",
                  padding: "10px 20px",
                  fontSize: "16px",
                  width: "10rem",
                }}
              >
                Create Goal
              </button>
            </div>

            <main className="bg-white flex flex-col mt-5 py-2.5 px-5">
              {/* top */}
              <div className="flex items-center justify-between">
                {/* left side */}
                <div className="anMLef">
                
                </div>

                {/* right side  */}
                <div className="p-2 px-4 gap-2 rounded-lg bg-white border border-[#D0D4DC] flex items-center">
                  <input type="text" placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                </div>
              </div>

              <div class="relative overflow-x-auto rounded-lg">
                <table class="min-w-full text-sm text-left bg-white rounded-lg">
                  <thead class="bg-white font-semibold">
                    <tr>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        GOAL TYPE
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        SUBJECT
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        BRANCH
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        TARGET ACHIEVEMENT
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        START DATE
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        END DATE
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        RATING
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        PROGRESS
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.slice(indexOfFirstEntry, indexOfLastEntry).map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 text-gray-800">
                        <td class="px-6 py-4 text-gray-800">{item.GoalType}</td>
                        <td class="px-6 py-4">{item.subject}</td>
                        <td class="px-6 py-4">{item.Branch}</td>
                        <td class="px-6 py-4 text-gray-800">{item.target}</td>

                        <td class="px-6 py-4 text-gray-800">{item.startDate}</td>
                        <td class="px-6 py-4 text-gray-800">{item.endDate}</td>
                        <td class="px-6 py-4 text-gray-800">{item.rating}</td>
                        <td class="px-6 py-4 text-gray-800">{item.progress}%</td>

                        <td class="px-6 py-4 text-gray-800">
                          <div className="flex items-center sk relative">
                            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747634200/acy_ah4jhd.svg" className="cursor-pointer" onClick={() => setShowIndex(showIndex === index ? null : index)} alt="" />
                            {
                              showIndex === index && (
                                <div ref={openpopwrapper} className="absolute bg-white p-2 rounded-md border border-gray-300 right-9 -top-12">
                                  <div className="flex items-center gap-3 p-1 cursor-pointer" onClick={() => {
                                    setOnEdit(true);
                                    setEditData(item);
                                    setOpenForm(true);
                                  }}>
                                    {/* <i
                                      className="fa-solid fa-pen-to-square"
                                    ></i> */}
                                    <MdOutlineEdit className="text-[18px]" />
                                    <span>Edit</span>
                                  </div>
                                  <hr />
                                  <div onClick={() => {
                                    deleteProject(item?._id);
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
                  <div className="pagination flex justify-center items-center mt-4 gap-1.25 w-full">
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
          <div className="fixed inset-0 w-full h-screen bg-black bg-opacity-30 backdrop-blur-[1px] flex items-center justify-center z-[3000]">
            <form
              onSubmit={() => {
                submitHandler();
                setOpenForm(false);
              }}
              className="flex flex-col bg-white max-w-[650px] max-h-[550px] w-full p-4 py-8 rounded-[20px] gap-4"
              ref={openFormWrapper}
            >
              <nav className="flex items-center justify-between">
                {/* left  */}
                <h2>{onEdit ? "Update Goal Tracking" : "Create New Goal Tracking"}</h2>
              </nav>

              <hr />

              <div className="flex flex-col gap-5 overflow-y-scroll pr-2.5">
                <div className="flex flex-wrap gap-y-5 gap-x-12 overflow-y-auto h-[400px]">
                  <label htmlFor="" className="w-1/2 flex flex-col gap-2">
                    <p className="text-[#1B2533] text-sm font-normal leading-5 tracking-[0.0025em] text-left">Branch <span className="text-red-600">*</span></p>
                    <select
                    className="h-11 rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"
                      name="Branch"
                      id="Branch"
                      onChange={changeHandler}
                      value={formdata.Branch}
                    >
                      <option>Select Branch</option>
                      {branch?.map((val, index) => {
                        return (
                          <option key={index} value={val.name}>
                            {val.name}
                          </option>
                        );
                      })}
                    </select>
                  </label>

                  <label className="w-1/2 flex flex-col gap-2">
                    <p className="text-[#1B2533] text-sm font-normal leading-5 tracking-[0.0025em] text-left">GoalTypes <span className="text-red-600">*</span></p>
                    <select
                    className="h-11 rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"
                      name="GoalType"
                      id="GoalType"
                      value={formdata.GoalType}
                      onChange={changeHandler}
                    >
                      <option>Select Goal Type</option>
                      <option>Short term goal</option>
                      <option>Long term goal</option>
                    </select>
                  </label>

                  <label className="w-1/2 flex flex-col gap-2">
                    <p className="text-[#1B2533] text-sm font-normal leading-5 tracking-[0.0025em] text-left">Start Date <span className="text-red-600">*</span></p>
                    <input
                    className="h-11 rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"
                      value={formdata.startDate}
                      name="startDate"
                      onChange={changeHandler}
                      type="date"
                    />
                  </label>

                  <label className="w-1/2 flex flex-col gap-2">
                    <p className="text-[#1B2533] text-sm font-normal leading-5 tracking-[0.0025em] text-left">End Date <span className="text-red-600">*</span></p>
                    <input
                    className="h-11 rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"
                      value={formdata.endDate}
                      name="endDate"
                      onChange={changeHandler}
                      type="date"
                    />
                  </label>

                  <label className="w-full flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-5 tracking-[0.0025em] text-left">Subject <span className="text-red-600">*</span></p>
                    <input
                    className="h-11 rounded-sm border border-[#293240] p-2.5"
                      value={formdata.subject}
                      onChange={changeHandler}
                      name="subject"
                      type="text"
                    />
                  </label>

                  <label className="w-full flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-5 tracking-[0.0025em] text-left">Target Achievement <span className="text-red-600">*</span></p>
                    <input
                    className="h-11 rounded-sm border border-[#293240] p-2.5"
                      value={formdata.target}
                      name="target"
                      onChange={changeHandler}
                      type="text"
                    />
                  </label>
                  <label htmlFor="description" className="w-full flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-5 tracking-[0.0025em] text-left">Description</p>
                    <textarea
                    className="h-11 rounded-sm border border-[#293240] p-2.5"
                      value={formdata.description}
                      name="description"
                      id="description"
                      onChange={changeHandler}
                      cols="20"
                      rows="8"
                    ></textarea>
                  </label>

                  <label htmlFor="status" className="w-full flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-5 tracking-[0.0025em] text-left">Status <span className="text-red-600">*</span></p>
                    <select
                    className="h-11 rounded-sm border border-[#293240] p-2.5"
                      value={formdata.status}
                      id="status"
                      name="status"
                      onChange={changeHandler}
                    >
                      <option>Not Started</option>
                      <option>In progress</option>
                      <option>Completed</option>
                    </select>
                  </label>

                  <div className="w-full h-11 flex gap-2.5 items-center">
                   
                    <p className="text-[12px] font-medium leading-4 text-left">Rating</p>
                    <input
                      className="w-full border border-gray-300 p-2 rounded-sm "
                      value={formdata.rating}
                      name="rating"
                      onChange={changeHandler}
                      type="number"
                      placeholder="rating out of 5"
                    />
                  </div>

                  <div className="w-full h-11 flex gap-2.5 items-center">
                    <p className="text-[12px] font-medium leading-4 text-left">Progress</p>
                    <input
                      className="w-full"
                      value={formdata.progress}
                      name="progress"
                      onChange={changeHandler}
                      type="range"
                      placeholder="Progress"
                    />
                  </div>
                </div>
              </div>

              <hr />

              <div className="w-full flex gap-7 justify-start">
                <button
                  type="button"
                  onClick={() => {
                    setOpenForm(false);
                    setOnEdit(false);
                    setEditData({});
                    setFormdata({
                      Branch: "",
                      GoalType: "",
                      startDate: "",
                      endDate: "",
                      subject: "",
                      target: "",
                      description: "",
                      status: "",
                      rating: "",
                      progress: "",
                    });
                  }}
                  className="w-[86px] h-[37px] rounded-[5px] flex justify-center items-center border border-[#B8BBC0] text-[16px] font-medium leading-6 tracking-[0.005em] text-[#666D76]"
                >
                  Cancel
                </button>
                <button type="submit" className="w-[76px] h-[37px] flex justify-center items-center rounded-[10px] bg-[#0B56E4] text-white text-[16px] font-medium leading-6 tracking-[0.005em]">
                  {onEdit ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default GoalTracking;
