import React from "react";
import { useEffect, useState, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import { confirmAlert } from 'react-confirm-alert';
import toast from "react-hot-toast";
// import "react-profile-avatar/dist/index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useMain } from "../../../hooks/UseMain";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";

import ViewTask from "./ViewTask";
import { useClickOutside } from "../../../hooks/useClickOutside";


const ProjectOverview2 = ({ allTasks, getProjectTaskapi }) => {
  const navigate = useNavigate();
  const {

    getAllProjectApi,
    CreateProjectTask,
    deleteProjectTaskapi22,
    EditProjectTask, postNotifyTask, fetchAllTimesheetapi
  } = useMain();

  const hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"))
  const { addTaskPermission, editTaskPermission, deleteTaskPermission, showTasksDetailPermission } = hrms_permission;
  let valid = Object.keys(hrms_permission).length === 0
  console.log(Object.keys(hrms_permission).length === 0);

  const location = useLocation();
  const data = location?.state;
  const [altimesheet, setTimesheet] = useState([]);

  // console.log(data)
  // console.log("alltask", allTasks);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  const role = hrms_user?.Role

  const [formdata, setFormdata] = useState({
    Title: "",
    Description: "",
    Members: [], // Ensure this is an array
    taskfile: "",
    StartDate: "",
    DueDate: "",
    Priority: "",
    Github: "",
  });
  const [proUser, setProUser] = useState([]);
  const [viewTask, setViewTask] = useState(false);


  const getTask = (id) => {
    setViewTask(true)
    const filter = allTasks?.find(e => e._id === id)
    if (filter) {
      setFormdata({
        Title: filter.taskName,
        Description: filter.description,
        Members: filter.Members,
        StartDate: filter.startDate,
        DueDate: filter.dueDate,
        Github: "",
        taskfile: filter.taskfile,
      });
    }
    filterByTaskId(id)
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeHandler2 = (e) => {
    const selectedEmpId = e.target.value;

    // If "Select" is chosen or selectedEmpId is invalid, return
    if (selectedEmpId === "Select") return;

    // Find the selected employee using the ID
    const selectedEmp = allEmp?.find((emp) => emp?._id === selectedEmpId);

    // If no employee is found or the employee is already in proUser, return
    if (!selectedEmp || proUser?.includes(selectedEmp?.fullName)) return;

    // Update the proUser state by adding the selected employee's fullName
    setProUser((prev) => {
      const updatedProUser = [...prev, selectedEmp?.fullName];

      // Update the Members array with the selected employee's ID and existing IDs from alreadyUsers
      const alreadyUsers = allEmp.filter((emp) => updatedProUser.includes(emp?.fullName));

      setFormdata((prevData) => {
        // Ensure Members is an array
        const prevMembers = Array.isArray(prevData?.Members) ? prevData?.Members : [];

        // Update the Members array with selectedEmpId and alreadyUsers _id
        const newMembers = [
          ...prevMembers,
          selectedEmpId,
          ...alreadyUsers.map((user) => user._id),
        ];

        return {
          ...prevData,
          Members: Array.from(new Set(newMembers)), // Remove duplicates by converting to a Set and back to an array
        };
      });

      return updatedProUser;
    });
  };

  const removeUser = (index) => {
    const newProUser = proUser?.filter((_, i) => i !== index);
    const newMembers = formdata?.Members?.filter((_, i) => i !== index);
    // console.log(newMembers)
    setProUser(newProUser);
    // console.log(newProUser)
    const alreadyUsers = allEmp.filter((emp) => newProUser.includes(emp?.fullName));
    setFormdata({ ...formdata, Members: alreadyUsers.map((user) => user._id) });
  };






  const [addClientPop, setAddClientPop] = useState(false);
  const [allEmp, setAllEmp] = useState([]);
  const [allProject, setAllProject] = useState([]);
  const [allTaskDetail, setAllTaskDetail] = useState([]);
  const [timerPop, setTimerPop] = useState(false);




  const getAllProject = async () => {
    const ans = await getAllProjectApi();
    setAllProject(ans?.data);
    // console.log(allProject)
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading....");
    try {
      const ans = await CreateProjectTask({
        ...formdata,
        projectId: data?._id,
      });
      if (ans?.status) {
        toast.success("Successfully created task");
        getProjectTaskapi(); const result = formdata.Members.map(userId => {
          const user = allEmp.find(e => e._id === userId);
          return user ? user.fullName : null;
        }).filter(fullName => fullName !== null);

        // console.log(result);
        result.forEach((e) =>
          postNotifyTask(e, formdata.Title, `${formdata?.DueDate}`)
        )
        setFormdata({
          Title: "",
          Description: "",
          Members: [], // Reset to an empty array
          StartDate: "",
          DueDate: "",
          Github: "",
          taskfile: "", // Ensure taskfile is also reset
        });
        setAddClientPop(false);
        setProUser([]);

      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
    toast.dismiss(toastId);
  };

  // const [proUser, setProUser] = useState([]);


  const edittaskhandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading....");
    try {
      const ans = await EditProjectTask({
        ...formdata,
        projectId: data?._id,
        taskId: isEdit,
      });
      if (ans?.status) {
        toast.success("Successfully updated task");
        getProjectTaskapi();
        getProjectTaskapi(); const result = formdata.Members.map(userId => {
          const user = allEmp.find(e => e._id === userId);
          return user ? user.fullName : null;
        }).filter(fullName => fullName !== null);

        // console.log(result);
        result.forEach((e) =>
          postNotifyTask(e, formdata.Title, `${formdata?.DueDate}`)
        )
        setFormdata({
          Title: "",
          Description: "",
          Members: [],
          StartDate: "",
          DueDate: "",
          Github: "",


        });
        setAddClientPop(false);
        setProUser([]);
        setisEdit(false);
      }
      toast.dismiss(toastId);
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };

  const ref = useClickOutside(() => {
    setCurrView(-1);
  })

  useEffect(() => {
    getAllProject();
    getProjectTaskapi();
    // console.log(allTaskDetail)
  }, []);

  useEffect(() => {
    if (data) {
      setAllEmp(data?.Members);
    }
  }, [data]);

  const [isEdit, setisEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const totalPages = Math.ceil(allTasks?.length / tasksPerPage);
  const currentTasks = allTasks?.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const [currView, setCurrView] = useState(-1);

  const deleteTasks = async (id) => {
    setCurrView(-1);
    confirmAlert({
      title: `Are you sure you want to delete this task`,
      buttons: [
        {
          label: `Yes, Go Ahead!`,
          style: {
            background: "#DD3409"
          },
          onClick: async () => {
            const resp = await deleteProjectTaskapi22(id);
            if (resp?.status) {
              getProjectTaskapi();
              toast.success("Successfully deleted");
            } else {
              toast.error("Something went wrong");
            }

          }
        },
        {
          label: 'Cancel',
          style: {
            background: "none",
            border: "1px solid #0B56E4",
            color: "#0B56E4",
          },
          onClick: () => null
        }
      ]
    });
  };

  const handleEditClick = (client) => {
    // console.log(client);
    const membersNames = client.Members.map((memberId) => {
      const member = allEmp.find((emp) => emp._id === memberId?._id);
      return member ? member.fullName : "";
    });

    setisEdit(client._id);
    setFormdata({
      Title: client.taskName,
      Description: client.description,
      StartDate: client.startDate,
      DueDate: client.dueDate,
      Priority: client.priority
    });
    setProUser(membersNames);
    setAddClientPop(true);
  };

  // setisEdit(client._id);
  const changeHandler3 = (event) => {
    const file = event.target.files[0];
    setFormdata((prevData) => ({
      ...prevData,
      taskfile: file,
    }));
  };

  const fetchAllTimesheet = async () => {
    const resp = await fetchAllTimesheetapi(data?._id);
    if (resp.status) {
      console.log("res", resp);
      setTimesheet(resp?.taskTimelines);
    }

  }


  useEffect(() => {
    fetchAllTimesheet()
  }, [])

  const wrapperRef = useOutsideClick(() => {
    setAddClientPop(false);
    setViewTask(false)
  });

  const [filterTimelines, setFilterTimelines] = useState()

  const filterByTaskId = (taskId) => {
    if (altimesheet) {

      setFilterTimelines(altimesheet.filter(item => item.taskId._id === taskId))
      console.log(altimesheet)
      return altimesheet.filter(item => item.taskId._id === taskId);
    }
    return
  };
  // console.log(filterByTaskId("67e03be5b424002f7d3884bc"))
  // console.log(altimesheet)
  return (
    <>
      <div className="">
        <div className="w-full ">

          <div style={{ marginTop: '40px' }}>
            <div className="relative flex flex-col gap-5">
              <nav className="flex items-center justify-between">
                <div className="flex flex-col gap-[12px]">
                  <h2 className="text-[24px] font-semibold leading-[32px] text-left">{data?.Name}</h2>
                  <p
                    className={`stapro ${allProject?.Status === "Finished" && "finibg"
                      } ${allProject?.Status === "Ongoing" && "Ongoingbg"} ${allProject?.Status === "OnHold" && "OnHoldbg"
                      }`}
                  >
                    {allProject?.Status}
                  </p>
                </div>


                {(role === "ADMIN" || valid) && role !== "Client" && (
                  <div className="w-[137px] h-[40px] flex items-center justify-center gap-2.5 rounded-[10px] bg-[#0B56E4]">
                    <button
                      onClick={() => {
                        setAddClientPop(true);
                        setisEdit(false);
                      }}
                      className="w-[137px] h-[40px] flex items-center justify-center gap-2.5 rounded-[10px] bg-[#0B56E4]"
                    >
                      <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747201651/pluss_wqvd9q.png" alt="Add Task" /> <span className="text-white">Add Task </span>
                    </button>
                  </div>
                )}

                {(addTaskPermission && role !== "Client")
                  && (
                    <div className="w-[137px] h-[40px] flex items-center justify-center gap-2.5 rounded-[10px] bg-[#0B56E4]">
                      <button
                        onClick={() => {
                          setAddClientPop(true);
                          setisEdit(false);
                        }}
                        className="w-[137px] h-[40px] flex items-center justify-center gap-2.5 rounded-[10px] bg-[#0B56E4]"
                      >
                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747201651/pluss_wqvd9q.png" alt="Add Task" /> <span>Add Task </span>
                      </button>
                    </div>)
                }


              </nav>

              <div className="w-full h-[96px] p-[24px] rounded-[12px] bg-[#DEF8E4] flex items-center justify-between overflow-x-auto whitespace-nowrap">
                <div className="flex items-center gap-[20px] sm:gap-[30px] md:gap-[40px] lg:gap-[60px]">
                  <label className="flex items-center gap-3">
                    <p className="text-[12px] sm:text-[14px] md:text-[15px] font-normal leading-[18px] tracking-[0.0015em] text-left text-[#666D76]">Start Date:</p>
                    <p className="text-[16px] sm:text-[18px] md:text-[18px] font-semibold leading-[24px] tracking-[0.005em] text-left text-[#1B2533]">
                      {new Date(data?.createdAt).toISOString().split('T')[0]}
                    </p>
                  </label>
                  <label className="flex items-center gap-3">
                    <p className="text-[12px] sm:text-[14px] md:text-[15px] font-normal leading-[18px] tracking-[0.0015em] text-left text-[#666D76]">Due Date:</p>
                    <p className="text-[16px] sm:text-[18px] md:text-[18px] font-semibold leading-[24px] tracking-[0.005em] text-left text-[#1B2533]">{data?.deadline}</p>
                  </label>
                  <label className="flex items-center gap-3">
                    <p className="text-[12px] sm:text-[14px] md:text-[15px] font-normal leading-[18px] tracking-[0.0015em] text-left text-[#666D76]">Total Members</p>
                    <p className="text-[16px] sm:text-[18px] md:text-[18px] font-semibold leading-[24px] tracking-[0.005em] text-left text-[#1B2533]">{data.Members?.length}</p>
                  </label>
                </div>
              </div>

              <div className="relative overflow-x-auto min-h-[250px]  rounded-lg">
                <table className="w-max lg:w-full text-sm text-left bg-white rounded-lg">
                  <thead className="bg-white font-semibold">
                    <tr>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        Subject
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        Assign To
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        Start date
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        DueDate
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        Priority
                      </th>

                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        Description
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        Status
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTasks?.map((task, index) => (
                      // console.log(allTasks)
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                      >
                        <td className="border-b px-4 border-gray-200 hover:bg-gray-50 transition duration-150">{task?.taskName}</td>
                        <td style={{ display: "flex", gap: "-2px" }} className="borderNone">
                          {
                            task?.Members?.map((item, index) => (
                              <img key={index}
                                src={`${item?.profileImage ? item?.profileImage : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"}`}
                                className="w-20 h-20"
                                alt="Member Avatar"
                                style={{
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                  transition: "color 0.3s ease, text-decoration 0.3s ease", height: "40px", width: "40px"
                                }}
                              />
                            ))
                          }
                        </td>



                        <td className="px-6 py-4 text-gray-800">{task?.startDate}</td>
                        <td className="px-6 py-4 text-gray-800">{task?.dueDate}</td>
                        <td className="px-6 py-4 text-gray-800">{task?.priority}</td>
                        <td className="px-6 py-4 text-gray-800">
                          {task?.description?.length > 40
                            ? task.description.slice(0, 30) + "..."
                            : task.description}
                        </td>

                        <td className="px-6 py-4 text-gray-800">{task?.Status}</td>

                        <div ref={ref} className="viewOnwWRAP">
                          <td onClick={() => {
                            if (index == currView) {
                              setCurrView(-1);
                            }
                            else {
                              setCurrView(index)
                            }
                          }} className="px-6 py-4 taskAns cursor-pointer">
                            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747216317/actions_qujhzd.png" alt="" />
                          </td>

                          {
                            index == currView &&

                            <div className="absolute top-[34px] right-[75px] min-w-[120px] h-fit border border-[#E3E3E3] flex flex-col shadow-[0px_4px_12px_0px_#1A1A1A33] p-2 gap-[5px] rounded-tl-[8px] z-[1000] bg-white">
                              {/* first  */}
                              <div className="flex gap-1 p-[5px] cursor-pointer" onClick={() => {
                                if (role === "ADMIN" || valid) {
                                  getTask(task?._id)
                                  console.log('this')
                                } else if (showTasksDetailPermission === true) {
                                  getTask(task?._id)
                                } else {
                                  alert("You do not have permission to view the task.");
                                }
                              }}>
                                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747201027/bx-happy-heart-eyes_i8b4bn.png" alt="" />
                                <p>View</p>
                              </div>
                              {(role !== "Client") && <div>
                                <hr />
                                {/* second */}
                                <div className="flex gap-1 p-[5px] cursor-pointer" onClick={() => {
                                  if (role === "ADMIN" || valid) {
                                    handleEditClick(task);
                                    console.log('this')
                                  } else if (editTaskPermission === true) {
                                    handleEditClick(task);
                                  } else {
                                    alert("You do not have permission to view the task.");
                                  }

                                }}>
                                  <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747216501/edit22_xl2ioc.png" alt="" />
                                  <p>Edit</p>
                                </div>
                                <hr />

                                {/* third */}
                                <div className="flex gap-1 p-[5px] cursor-pointer" onClick={() => {
                                  if (role === "ADMIN" || valid) {
                                    deleteTasks(task?._id)
                                    console.log('this')
                                  } else if (deleteTaskPermission === true) {
                                    deleteTasks(task?._id)
                                  } else {
                                    alert("You do not have permission to view the task.");
                                  }

                                }}>
                                  <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747216467/deletedd_vcych3.svg" alt="" />
                                  <p className="deel">Delete</p>
                                </div>
                                <hr />
                              </div>}


                            </div>

                          }
                        </div>
                        {/* <OutsideClickHandler
                          onOutsideClick={() => {
                            if (index == currView) {
                              setCurrView(-1);
                            }
                          }}
                        >
                          
                        </OutsideClickHandler> */}


                      </tr>
                    ))}
                  </tbody>
                </table>
                {totalPages > 1 && (
                  <div className="navbuttons flex justify-between items-center mt-4">
                    <button
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                    >
                      Prev
                    </button>
                    <span className="px-4">{currentPage}</span>
                    <button
                      onClick={handleNext}
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
      {addClientPop && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-5 backdrop-blur-[1px] bg-[#40404066]">
          <div ref={wrapperRef} className="w-[599px] p-6 h-fit flex flex-col gap-4 rounded-[18px] bg-white min-h-[400px] h-fit">
            <nav className="flex items-center justify-between">
              <p className="text-[#1B2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">{isEdit ? "Edit Task" : "Create New Task"}</p>

            </nav>
            <hr />
            <form
              onSubmit={(e) => {
                if (isEdit) {
                  edittaskhandler(e);
                } else {
                  submitHandler(e);
                }
              }}
            >
              <div style={{ overflowY: "auto" }}>
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Add File</p>
                  <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    name="taskfile"
                    // value={formdata.taskfile}
                    onChange={changeHandler3}
                    type="file"
                    placeholder="file"
                  />
                </label>
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Subject</p>
                  <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    name="Title"
                    required
                    value={formdata.Title}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Name"
                  />
                </label>
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Assign To </p>
                  <div className="flex items-center gap-[14px] flex-wrap">
                    {proUser.map((pro, index) => (
                      <div key={index} className="flex items-center gap-[4px]">
                        <p className="text-[#101820] text-md font-noraml leading-8">{pro}</p>
                        <img
                          src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747207613/cutt_g0ckso.png"
                          alt="Remove"
                          onClick={() => removeUser(index)}
                        />
                      </div>
                    ))}
                  </div>

                  <select
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    name="Members"
                    onChange={changeHandler2}
                    disabled={formdata?.Members?.length >= allEmp?.length}  >
                    <option value="Select">Select Employee</option>
                    {allEmp?.map((emp, index) => {
                      // Check if emp._id is already in formdata?.Members
                      const isAlreadySelected = proUser.includes(emp.fullName);
                      console.log(proUser)

                      return (
                        <option value={emp?._id} key={index} disabled={isAlreadySelected}>
                          {emp?.fullName}
                        </option>
                      );
                    })}
                  </select>


                </label>
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Priority </p>
                  <select
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    name="Priority"
                    value={formdata.Priority}
                    onChange={changeHandler}
                  >
                    <option value="Select">Select Priority</option>
                    <option value="Normal">Normal</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </label>
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Start Date</p>
                  <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    name="StartDate"
                    value={formdata.StartDate}
                    onChange={changeHandler}
                    type="date"
                    min={data.startDate}
                    max={data.deadline}
                  />
                </label>
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Due Date</p>
                  <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    name="DueDate"
                    value={formdata.DueDate}
                    onChange={changeHandler}
                    type="date"
                    min={formdata.StartDate || data.startDate}
                    max={data.deadline}
                  />
                </label>
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Description</p>
                  <textarea
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    type="text"
                    name="Description"
                    value={formdata.Description}
                    onChange={changeHandler}
                    placeholder="Description"
                    required
                  />
                </label>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="saveclient">
                  <span className="px-4 py-1.5 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">{isEdit ? "Update" : "Add Task "}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddClientPop(false);
                    setisEdit(false);
                    setProUser([]);
                    setFormdata({
                      Title: "",
                      Description: "",
                      Members: "",
                      StartDate: "",
                      DueDate: "",
                      Priority: "",
                      Github: "",

                    });
                  }}
                  className="cancel"
                >
                  <span className="px-4 py-1.5 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Cancel </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {timerPop && (
        <div className="addCliWrap">
          <div className="addClieCont fitheight">
            <nav>
              <p>Timer Details</p>
              <img
                onClick={() => {
                  setTimerPop(false);
                }}
                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747207613/cutt_g0ckso.png"
                alt="Close"
              />
            </nav>
            <hr />
            <p>
              Time In:
              <input
                type="datetime-local"
                onChange={(e) =>
                  setTimerPop((prev) => ({
                    ...prev,
                    timeIn: new Date(e.target.value).toISOString(),
                  }))
                }
                value={new Date(timerPop.timeIn).toISOString().slice(0, 16)}
              />
            </p>
            <p>
              Time Out:
              <input
                type="datetime-local"
                onChange={(e) =>
                  setTimerPop((prev) => ({
                    ...prev,
                    timeOut: new Date(e.target.value).getTime().toString(),
                  }))
                }
                value={new Date(Number(timerPop.timeOut)).toISOString().slice(0, 16)}
              />
            </p>
            <p>Total Time: <input type="text" value={timerPop?.totalTime} readOnly /> </p>
          </div>
        </div>
      )}


      {viewTask && (<>
        <div className="fixed inset-0 z-[3000] w-full h-full p-5 flex items-center justify-center bg-[#40404066] backdrop-blur-[1px]">
          <div ref={wrapperRef} className="w-[599px] p-6 h-fit flex flex-col gap-4 rounded-[18px] bg-white min-h-[400px] h-fit flex">
            <ViewTask src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747207613/cutt_g0ckso.png" data={formdata} timesheets={filterTimelines} onClick={() => setViewTask(false)} />
          </div>
        </div>
      </>)}
    </>
  );
};

export default ProjectOverview2;