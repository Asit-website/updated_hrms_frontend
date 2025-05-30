import { useEffect, useState, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { BsStopFill, BsStopwatch } from "react-icons/bs";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
// import ViewTask from "./ViewTask";

import { confirmAlert } from 'react-confirm-alert';
import { useOutsideClick } from "../../../hooks/UseOutsideClick";
import { useMain } from "../../../hooks/UseMain";



const ProjectDetails2 = () => {
  const {
    user,
    getAllProjectApi,
    CreateProjectTask,
    getMyProjectTask,
    timerHandlerapi,
    getProjectTask,
    statuschangeapi, fetchAllTimesheetapi,
    deleteProjectTaskapi22, EditProjectTask,
    UploadFileProjectapi, allfilesproject, deleteProjectFile
  } = useMain();

  const location = useLocation();

  const data = location?.state;
  const projectOpt = ["MyTask", "Files"];
  const [optIndex, setOptIndex] = useState(0);


  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));

  const { role, } = hrms_user;
  const { showTasksDetailPermission, showAllProjectPermission, addTaskPermission, deleteTaskPermission, editTaskPermission, } = hrms_permission;

  const [formdata, setFormdata] = useState({
    Title: "",
    Description: "",
    Members: [],
    taskfile: "",
    StartDate: "",
    DueDate: "",
    Priority: "",
    Github: "",
  });
  const [proUser, setProUser] = useState([]);
  const [viewTask, setViewTask] = useState(false);
  const [showIndex, setShowIndex] = useState(null);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const changeHandler2 = (e) => {
    const selectedEmpId = e.target.value;
    if (selectedEmpId === "Select" || formdata.Members.includes(selectedEmpId))
      return;

    const selectedEmp = allEmp.find((emp) => emp._id === selectedEmpId);
    setProUser([...proUser, selectedEmp.fullName]);
    setFormdata({ ...formdata, Members: [...formdata.Members, selectedEmpId] });
  };

  const removeUser = (index) => {
    const newProUser = proUser.filter((_, i) => i !== index);
    const newMembers = formdata.Members.filter((_, i) => i !== index);
    setProUser(newProUser);
    setFormdata({ ...formdata, Members: newMembers });
  };
  const [addClientPop, setAddClientPop] = useState(false);

  const [allEmp, setAllEmp] = useState([]);
  const [altimesheet, setTimesheet] = useState([]);


  const [allProject, setAllProject] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const getProjectTaskapi = async () => {
    const ans = await getMyProjectTask(data?._id, hrms_user?._id);
    setAllTasks(ans?.tasks);
  };

  const getProjectTaskapiPermi = async () => {
    const ans = await getProjectTask(data?._id);
    setAllTaskDetail(ans?.tasks);
    setAllTasks(ans?.tasks.reverse());
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

  const [filterTimelines, setFilterTimelines] = useState()

  const filterByTaskId = (taskId) => {
    if (altimesheet) {

      setFilterTimelines(altimesheet.filter(item => item.taskId._id === taskId))
      console.log(altimesheet)
      return altimesheet.filter(item => item.taskId._id === taskId);
    }
    return
  };
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
  const getAllProject = async () => {
    const ans = await getAllProjectApi();
    setAllProject(ans?.data);
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
        setFormdata({
          Title: "",
          Description: "",
          Members: "",
          StartDate: "",
          DueDate: "",
          Github: "",
          
        });
        setAddClientPop(false);
        setProUser([]);
        getProjectTaskapi();


      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
    toast.dismiss(toastId);
  };

  useEffect(() => {
    if (data) {
      setAllEmp(data?.Members);
    }
  }, [data]);


  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(allTasks?.length / tasksPerPage);

  // Get the tasks for the current page
  const currentTasks = allTasks?.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  // Handle click for previous button
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle click for next button
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  const [timerPop, setTimerPop] = useState(false);
  const [timerNote, setTimerNote] = useState();
  const [isEdit, setisEdit] = useState(false);
  const active = JSON.parse(localStorage.getItem("task"))





  const [startTimer, setStartTimer] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [pauseCount, setPauseCount] = useState(0);
  const timerIdRef = useRef(null);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  useEffect(()=>{},[])
  // Timer metadata
  const [clockStart, setClockStart] = useState(null);
  const [pausedDuration, setPausedDuration] = useState(0);
  const [pauseStart, setPauseStart] = useState(null);
  
  // Load from localStorage on mount
  useEffect(() => {
    const savedStart = localStorage.getItem("startTimer") === "true";
    const savedClockStart = Number(localStorage.getItem("clockStart")) || null;
    const savedPausedDuration = Number(localStorage.getItem("pausedDuration")) || 0;
    const savedPauseStart = Number(localStorage.getItem("pauseStart")) || null;
  
    setClockStart(savedClockStart);
    setPausedDuration(savedPausedDuration);
    setPauseStart(savedPauseStart);
    setStartTimer(savedStart && !savedPauseStart); // don't resume if pauseStart is set
  }, []);
  
  // Persist values
  useEffect(() => {
    localStorage.setItem("clockStart", clockStart?.toString() || "");
    localStorage.setItem("pausedDuration", pausedDuration.toString());
    localStorage.setItem("pauseStart", pauseStart?.toString() || "");
    localStorage.setItem("startTimer", startTimer.toString());
  }, [clockStart, pausedDuration, pauseStart, startTimer]);
  
  // Timer tick effect
  useEffect(() => {
    if (startTimer && clockStart && !pauseStart) {
      timerIdRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - clockStart - pausedDuration) / 1000);
        setTotalSeconds(elapsed);
      }, 1000);
    }
  
    return () => clearInterval(timerIdRef.current);
  }, [startTimer, clockStart, pausedDuration, pauseStart]);
  
  const clockIn = async (task) => {
    const existing = localStorage.getItem("taskTimer");
    const active = JSON.parse(localStorage.getItem("task"));
  
    if (active && active._id !== task._id) {
      toast("Stop the first timer before starting another.");
      return;
    }
  
    if (!existing) {
      const now = Date.now();
      localStorage.setItem("task", JSON.stringify(task));
      localStorage.setItem("taskTimer", now.toString());
      localStorage.setItem("timeIn", new Date(now).toISOString());
  
      if (task?.Status === "Not Started") await statuschangehadler(task, "Started");
  
      setClockStart(now);
      setPausedDuration(0);
      setPauseStart(null);
      setStartTimer(true);
    } else {
      confirmAlert({
        title: 'Are you sure?',
        buttons: [
          {
            label: startTimer ? "Pause" : "Resume",
            onClick: () => {
              const now = Date.now();
              if (startTimer) {
                setPauseStart(now);
                localStorage.setItem("pauseStart", now.toString());
                setStartTimer(false);
                setPauseCount(p => p + 1);
              } else {
                const pauseTime = now - pauseStart;
                const newTotalPause = pausedDuration + pauseTime;
                setPausedDuration(newTotalPause);
                setPauseStart(null);
                localStorage.setItem("pausedDuration", newTotalPause.toString());
                localStorage.removeItem("pauseStart");
                setStartTimer(true);
              }
            },
            style: { background: "#DD3409", color: "#fff" },
          },
          {
            label: 'Stop',
            style: { background: "none", border: "1px solid #0B56E4", color: "#0B56E4" },
            onClick: () => setTimerPop(true),
          }
        ]
      });
    }
  };
  
  const closeTimer = () => {
    setStartTimer(false);
    clearInterval(timerIdRef.current);
    setTotalSeconds(0);
    setPauseCount(0);
    setClockStart(null);
    setPausedDuration(0);
    setPauseStart(null);
  
    localStorage.removeItem("taskTimer");
    localStorage.removeItem("timerClockIn");
    localStorage.removeItem("timeIn");
    localStorage.removeItem("startTimer");
    localStorage.removeItem("totalSeconds");
    localStorage.removeItem("pausedDuration");
    localStorage.removeItem("pauseStart");
    localStorage.removeItem("clockStart");
    localStorage.removeItem("task");
  };
  
  const timerHandler = async (e) => {
    e.preventDefault();
    const end = Date.now();
    const realElapsedSeconds = Math.floor((end - clockStart - pausedDuration) / 1000);
  
    function convertTimestampToTime(timestamp) {
      const date = new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
    function convertToIST(utcDate) {
      const date = new Date(utcDate);
      // Add 5 hours and 30 minutes (IST is UTC +5:30)
      const istOffsetInMs = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
      const istTime = new Date(date.getTime() + istOffsetInMs); // Convert to IST
      // Format the date in 'YYYY-MM-DDTHH:mm:ss.sss+05:30' format (IST)
      const formattedDate = istTime.toISOString().slice(0, 19) + "." + istTime.getMilliseconds().toString().padStart(3, '0') + "+05:30";
      return istTime;  // Return the Date object in IST
    }
    const formatTime = (seconds) => {
      const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
      const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      return `${h}:${m}:${s}`;
    };
    
    const res = await timerHandlerapi({
      Note: timerNote,
      taskId: JSON.parse(localStorage.getItem("task"))?._id,
      clockIn: convertToIST(clockStart),
      clockOut: convertTimestampToTime(end),
      totalTime: formatTime(realElapsedSeconds),
      projectId: data?._id,
      submitedBy: hrms_user?._id
    });
  
    if (res?.status) {
      closeTimer();
      toast.success("Submitted successfully");
      setTimerPop(false);
    } else {
      toast.error("Something went wrong");
    }
  };
  


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

  const handleEditClick = (client) => {
    const membersNames = client.Members.map((memberId) => {
      const member = allEmp.find((emp) => emp._id === memberId?._id);
      return member ? member.fullName : "";
    });

    setisEdit(client._id);
    setFormdata({
      Name: client?.projectName,
      DueDate: client.deadline,
      ...client,
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

  const [allTaskDetail, setAllTaskDetail] = useState([]);

  const [timerPop2, setTimerPop2] = useState(false);


  // THIS IS FOR PERMISSION


  const deleteTasks = async (id) => {

    confirmAlert({
      title: `Are you sure you want to delete this task`,
      buttons: [
        {
          label: `Yes, Go Ahead!`,
          style: {
            background: "#DD3409"
          },
          onClick: async () => {
            const toastId = toast.loading("Loading...");
            const resp = await deleteProjectTaskapi22(id);
            if (resp?.status) {
              getProjectTaskapi();
              getProjectTaskapiPermi();
              toast.success("Succesfuly Deleted");
            } else {
              toast.error("Something went wrong");
            }
            toast.dismiss(toastId);

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

  const [selectedFile, setSelectedFile] = useState(null);
  const [allfiles, setAllFiles] = useState([]);
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const toastId = toast.loading("Loading...");
    const files = event.target.files; // Get all selected files
    setSelectedFile(files); // Store the files in state
    toast.dismiss(toastId);
  };
  const fetchAllFile = async () => {
    const resp = await allfilesproject(data?._id);
    setAllFiles(resp?.files?.reverse());
  };

  const uploadFileProject = async () => {
    if (selectedFile === null) return toast.error('Please Choose a file !!')
    if (selectedFile && selectedFile.length > 0) {
      const toastId = toast.loading("Uploading...");

      // Loop through the selected files and upload each one
      for (let i = 0; i < selectedFile.length; i++) {
        const file = selectedFile[i];
        await UploadFileProjectapi(file, data?._id);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("Successfully uploaded");
      toast.dismiss(toastId);
      fetchAllFile();
    }
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", filename || "download");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  useEffect(() => {
    if (showAllProjectPermission) {
      getProjectTaskapiPermi();
      // console.log(true)

    }
    else {
      getProjectTaskapi();
    }
  }, [addClientPop])

  useEffect(() => {
    if (showAllProjectPermission) {
      getProjectTaskapiPermi();
      // console.log(true)

    }
    else {
      getProjectTaskapi();
    }
    getAllProject();
    fetchAllFile();
  }, []);

  const deleteFile = async (id, uploadedBy) => {
    // const hrms_user = localStorage.getItem("hrms_user")
    console.log(id, uploadedBy, hrms_user?._id)
    console.log(uploadedBy === hrms_user?._id)

    if (uploadedBy === hrms_user?.id) {
      console.log(uploadedBy === hrms_user?.id)
      alert("you can't delete it")
      return

    }
    const ans = await deleteProjectFile(id);
    await fetchAllFile()
    if (ans.status) {
      toast.success("successfully Deleted")
    }
    return ans


  }

  const statuschangehadler = async (taskId, status) => {
    const toastId = toast.loading("Loading...");
    const resp = await statuschangeapi(taskId, status);
    toast.success("Successfuly done");
    toast.dismiss(toastId);
    if (showAllProjectPermission) {
      getProjectTaskapiPermi();
    }
    else {
      getProjectTaskapi();
    }
  }

  const wrapperRef = useRef()

  useOutsideClick(wrapperRef, () => {
    setShowIndex(null)
  });
  return (
    <>
      <div className="employee-dash h-full">
      

        <div className="w-full ">
         

          <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full">
            <div
              className=""
              style={{
                width: "338px",
                height: "42px",
                display: "flex",
                alignItems: "center",
              }}
            >
          {projectOpt.map((pr, index) => (
                <div
  onClick={() => setOptIndex(index)}
  key={index}
  className={`cursor-pointer w-fit h-full px-4 py-2 
    ${index === 0 ? "rounded-l-[8px] rounded-r-none" : ""}
    ${index === 1 ? "addBorder rounded-r-[8px]" : ""}
    ${optIndex === index ? "bg-[#3C78E9] border border-[#0B56E4]" : "bg-white border border-[#E8E9EB]"}
    ${(role === "Client" && index === 1) ? "hide" : ""}
  `}
>
  <span
    className={`font-medium text-[16px] leading-[24px] tracking-[0.005em] text-center
      ${optIndex === index ? "text-white" : "text-black"}
    `}
  >
    {pr}
  </span>
</div>

              ))} 
              
            </div>

  <div className="relative flex flex-col gap-5">
              {optIndex === 0 && (
                <>
                  <nav>
                    <div className="pronaheading">
                      <h2>{data?.Name}</h2>
                      <p
                        className={`stapro ${allProject?.Status === "Finished" && "finibg"
                          } ${allProject?.Status === "Ongoing" && "Ongoingbg"} ${allProject?.Status === "OnHold" && "OnHoldbg"
                          }`}
                      >
                        {allProject?.Status}
                      </p>
                    </div>


                    {

                      addTaskPermission &&

                      <div className="clibtns">
                        <NavLink to="/employeeDash/HRM/myProjects">
                          <button className="backpro">
                            <span>Back</span>
                          </button>
                        </NavLink>
                        <button
                          onClick={() => {
                            setAddClientPop(true);
                          }}
                          className="newcli"
                        >
                          <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747201651/pluss_wqvd9q.png" /> <span>Add Task</span>
                        </button>
                      </div>

                    }

                  </nav>

                  <div className="w-full h-24 p-6 rounded-xl bg-[#DEF8E4] flex items-center justify-between">
                    {/* left side */}
                    <div className="flex items-center gap-[60px]">
                      <label>
                        <p className="filn">Start Date:</p>
                        <p className="proand">
                          {new Date(data?.createdAt).toLocaleDateString("en-in").split("T")[0]}
                        </p>
                      </label>
                      <label>
                        <p className="filn">Due Date:</p>
                        <p className="proand">{data?.deadline}</p>
                      </label>
                      <label>
                        <p className="filn">Total Members</p>
                        <p className="proand">{data?.Members?.length}</p>
                      </label>
                    </div>

                    {/* right side */}
                    <div className="righprodetail">
                      <div className="timerdives items-center">
                        <p>{hours.toString().padStart(2, '0')}</p>:
                        <p>{minutes.toString().padStart(2, '0')}</p>:
                        <p>{seconds.toString().padStart(2, '0')}</p>
                      </div>


                      {/* {allTasks?.length > 0 && (
                        <div>
                          <BsStopwatch onClick={clockIn} className="cursor-pointer" />
                        </div>
                      )} */}

                      {/* <div>
                    <img src={predit} alt="" />
                  </div>
                  <div>
                    <img src={predel} alt="" />
                  </div> */}
                    </div>
                  </div>

                  {/* this is all tasks now  */}

                  <div className="relative w-full bg-white overflow-x-scroll md:overflow-visible">
                    <table className="w-full text-sm text-gray-700">
                      <thead className="bg-white font-semibold">
                        <tr>
                          <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                            Subject
                          </th>
                          <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                            Assign To
                          </th>
                          <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                            StartDate
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
                          {showTasksDetailPermission && (
                            <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                              Actions
                            </th>
                          )}
                          {allTasks.length > 0 && (
                            <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                              Timer
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {currentTasks?.map((task, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                          >
                            <td className="px-3 py-3">
                              <p> {task?.taskName}</p>
                              <p className="cursor-pointer underline text-blue-600" onClick={() => getTask(task?._id)}>View</p>

                            </td>
                            <td className="px-3 py-3 flex items-center justify-center borderNone ">
                              {
                                task?.Members?.map((member) => (
                                  <img
                                    src={`${member?.profileImage
                                      ? member?.profileImage
                                      : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                                      }`}
                                    className="w-20 h-20"
                                    alt="Member Avatar "
                                    key={member._id}

                                    style={{
                                      borderRadius: "50%",
                                      cursor: "pointer",
                                      transition:
                                        "color 0.3s ease, text-decoration 0.3s ease",
                                      height: "40px",
                                      width: "40px",
                                    }}
                                  />
                                ))
                              }
                            </td>
                            <td className="px-3 py-3">{task?.startDate}</td>
                            <td className="px-3 py-3">{task?.dueDate}</td>
                            <td className="px-3 py-3">{task?.priority}</td>
                          
                            <td className="px-3 py-3">{task?.description}</td>
                            <td className="px-3 py-3">

                              {task.Members.some(item => String(item._id) === String(hrms_user._id)) ? (
                                <select
                                  name="status"
                                  onChange={(e) => statuschangehadler(task?._id, e.target.value)}
                                  value={task?.Status}
                                >
                                  <option value="Not Started">Not Started</option>
                                  <option value="Started">Started</option>
                                  <option value="Pending">Pending</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              ) : (
                                task?.Status
                              )}

                            </td>

                            {showTasksDetailPermission && (
                              <td className="px-3 py-3 adddsomflex relative">
                                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png" className="cursor-pointer" alt="" onClick={() => setShowIndex(showIndex === index ? null : index)} />
                                {
                                  showIndex === index && (
                                    <div ref={wrapperRef} className="absolute w-[100px] right-20 -top-16 bg-white rounded-md border border-gray-300 p-2">
                                      {
                                        showTasksDetailPermission &&
                                        <div onClick={() => {
                                          getTask(task?._id)
                                        }} className="flex items-center gap-2 p-1 cursor-pointer">
                                          <FaEye

                                            className="iconsss"
                                          />
                                          <span>View</span>
                                        </div>
                                      }
                                      <hr />


                                      {
                                        editTaskPermission &&
                                        <div onClick={() => {
                                          setAddClientPop(true);
                                          setFormdata(task);
                                          setisEdit(task?._id);
                                        }} className="flex items-center gap-2 p-1 cursor-pointer">
                                          <MdOutlineEdit

                                            className="iconsss2"
                                          />
                                          <span>Edit</span>
                                        </div>
                                      }
                                      <hr />
                                      {
                                        deleteTaskPermission &&
                                        <div onClick={() => deleteTasks(task?._id)} className="flex items-center gap-2 p-1 cursor-pointer">
                                          <MdDelete

                                            className="iconsss"
                                          />
                                          <span>Delete</span>
                                        </div>
                                      }
                                    </div>
                                  )
                                }


                              </td>
                            )}

                            {allTasks.length > 0 && (
                              <td className="px-3 py-3">

                                {task.Members.some(item => item._id === hrms_user._id) ? (<BsStopwatch
                                  onClick={() => {
                                    if (active?._id === task._id) {
                                      clockIn(task);
                                    }
                                    else {
                                      clockIn(task);
                                    }
                                  }}
                                  className={`cursor-pointer h-5 w-5 ${active?._id === task?._id ? 'text-red-500' : ''} ${localStorage.getItem("taskTimer") && active?._id !== task?._id ? 'opacity-50 cursor-not-allowed' : ''} `}
                                />) : (<BsStopwatch className={`cursor-pointer h-5 w-5 text-green-400 `}
                                />)}

                              </td>)}


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
                </>
              )}

              {optIndex === 1 && (
                <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-10">
                  {/* Upload File Section */}
                  <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Upload File or Folder</h4>
                    <input
                      type="file"
                      webkitdirectory
                      directory="true"
                      multiple
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />
                    <button
                      onClick={uploadFileProject}
                      className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      Upload
                    </button>
                  </div>

                  {/* All Files Section */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">{allfiles?.length > 0 ? "All Files" : "No Files"}</h4>
                    <div className="space-y-6">
                      {allfiles?.map((file, index) => (
                        <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-gray-600">
                                <strong>File Name:</strong> {file?.fileName}
                              </p>
                              <p className="text-gray-600">
                                <strong>Uploaded by:</strong> {file?.uploadedBy?.fullName || "Client"}
                              </p>
                              <p className="text-gray-600">
                                <strong>Uploaded On:</strong> {new Date(file?.createdAt).toLocaleDateString()}
                              </p>
                              <button onClick={() => deleteFile(file?._id, file?.uploadedBy?._id)} className="bg-red-500 text-white px-2 rounded py-1">Delete</button>

                            </div>

                            {/* Image or file preview */}
                            <div className="flex flex-col justify-center items-center">
                              {file?.filePath && /\.(jpg|jpeg|png|gif|webp)$/i.test(file?.filePath) ? (
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={file?.filePath}
                                  className="text-blue-500 hover:underline"
                                >
                                  <img
                                    src={file?.filePath}
                                    alt={file?.fileName}
                                    className="h-20 w-20 object-cover rounded-md"
                                  />
                                </a>
                              ) : (
                                <FaFileAlt onClick={() => handleDownload(file?.filePath, file?.fileName)} className="h-10 w-10" />
                              )}
                              <button onClick={() => handleDownload(file?.filePath, file?.fileName)} className="text-blue-500">Download</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}


            </div>
          </div>
        </div>
      </div>

      {addClientPop && (
        <div className="addCliWrap">
          <div className="addClieCont addheight">
            <nav>
              <p>Create New Task</p>
              <img
                onClick={() => {
                  setAddClientPop(false);
                  // setisEdit(false);
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
                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747207613/cutt_g0ckso.png"
                alt="Close"
              />
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
                  <p  className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Add File</p>
                  <input
                   className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    name="taskfile"
            
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
                    value={formdata.Title}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Name"
                  />
                </label>
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Assign To </p>
                  <div className="allempid">
                    {proUser.map((pro, index) => (
                      <div key={index} className="sinproid">
                        <p >{pro}</p>
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
                    disabled={formdata.Members.length >= allEmp.length} 
                  >
                    <option value="Select">Select Employee</option>
                    {allEmp?.map((emp, index) => {
                    
                      const isAlreadySelected = formdata.Members.includes(emp._id);

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
                    name="Priority"
                    value={formdata.Priority}
                    onChange={changeHandler}
                   className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  >
                    <option value="Select">Select Priority</option>
                    <option value="Normal">Normal</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </label>
                <label className="block text-md font-normal mb-1">
              
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Start Date </p>
                  <input
                   className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    name="StartDate"
                    value={formdata.StartDate}
                    onChange={changeHandler}
                    type="date"
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
                    min={formdata.StartDate}
                  />
                </label>
                <label  className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Description</p>
                  <textarea
                    type="text"
                    name="Description"
                    value={formdata.Description}
                    onChange={changeHandler}
                    placeholder="Description"
                     className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  />
                </label>
              </div>
              <div className="btnsss">
                <button type="submit" className="saveclient">
                  <span>{isEdit ? "Update" : "Add Task "}</span>
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
                  <span>Cancel </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* {alert('yes....')} */}

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
              />
            </nav>

            <hr />

            <form className="time-stop-form" onSubmit={timerHandler}>
            

              <input
                name="Note"
                onChange={(e) => setTimerNote(e.target.value)}
                value={timerNote}
                type="text"
                placeholder="Enter Note..."
                className="noteInput"
              />

              <div className="btnsss">
                <button type="submit" className="saveclient">
                  <span>Add</span>
                </button>
                <button
                  onClick={() => {
                    setTimerPop(false);
                  }}
                  className="cancel"
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewTask && (<>
        {/* <div className="addCliWrap">
          <div className="addClieCont addheight flex">
            <ViewTask src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747207613/cutt_g0ckso.png" data={formdata} onClick={() => setViewTask(false)} />
          </div>
        </div> */}
      </>)}

      {timerPop2 && (
        <div className="addCliWrap">
          <div className="addClieCont fitheight">
            <nav>
              <p>Timer Details</p>
              <img
                onClick={() => {
                  setTimerPop2(false);
                }}
                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747207613/cutt_g0ckso.png"
              />
            </nav>

            <hr />

            <p>
              Time In:{" "}
              {new Date(timerPop2?.timeIn).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
            </p>

            <p>
              Time Out:{" "}
              {new Date(Number(timerPop2?.timeOut)).toLocaleTimeString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                }
              )}
            </p>

            <p>Total Time: {timerPop2?.totalTime} </p>
          </div>
        </div>
      )}
    </>
  );
};
export default ProjectDetails2;