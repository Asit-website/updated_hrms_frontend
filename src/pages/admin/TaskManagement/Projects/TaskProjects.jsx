import React from "react";

// import "react-profile-avatar/dist/index.css";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../../hooks/UseMain";
import { useOutsideClick } from "../../../../hooks/UseOutsideClick";

const projectOpt = ["All", "Ongoing", "Finished", "OnHold", "Canceled"];

const TaskProjects = () => {
  const {

    allEmployee,
    editProjectapi,
    getAllProjectApi,
    createProjectapi,
    deleteTaskProject,
    getClientapi,
    postNotifyProject, postClientNotification
  } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user")) || '';

  const { role } = hrms_user;
  const hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"))
  const { showProjectPermission, projectEditPermission, projectDeletePermission, projectCreatePermission } = hrms_permission;

  const [formdata, setFormdata] = useState({
    Name: "",
    Description: "",
    Members: [],
    startDate: "",
    Status: "Ongoing",
    DueDate: "",
  });
  const [clientInfo, setClientInfo] = useState("")
  const [proUser, setProUser] = useState([]);
  const [allClient, setAllClient] = useState([]);
  const getAllClient = async () => {
    try {
      const ans = await getClientapi();

      if (ans?.status) {
        setAllClient(ans?.data);

      }
    } catch (error) {
      // console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }
  };

  useEffect(() => {
    // console.log(clientInfo)
  }, [clientInfo])

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeHandler2 = (e) => {
    const selectedEmpId = e.target.value;
    if (selectedEmpId === "Select") return;
    const selectedEmp = allEmp?.find((emp) => emp?._id === selectedEmpId);
    if (!selectedEmp || proUser?.includes(selectedEmp?.fullName)) return;
    setProUser((prev) => {
      const updatedProUser = [...prev, selectedEmp?.fullName];
      const alreadyUsers = allEmp.filter((emp) => updatedProUser.includes(emp?.fullName));
      setFormdata((prevData) => {
        const prevMembers = Array.isArray(prevData?.Members) ? prevData?.Members : [];
        // Update the Members array with selectedEmpId
        const newMembers = [
          ...prevMembers,
          selectedEmpId,
        ];

        return {
          ...prevData,
          Members: Array.from(new Set(newMembers)),
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


  const [showIndex, setShowIndex] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const [addClientPop, setAddClientPop] = useState(false);

  const [optIndex, setOptIndex] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const [allProjects, setAllProjects] = useState([]);

  const [storeProject, setStorePro] = useState([]);

  const [allEmp, setAllEmp] = useState([]);
  const [selected1, setSelected] = useState();

  const getAllProject = async () => {
    const ans = await getAllProjectApi();
    if (ans?.status) {
      setAllProjects(ans?.projects?.reverse());
      setStorePro(ans?.projects);
    }
  };

  const editHandler = async (e) => {
    e.preventDefault();
    if (formdata.Name === "") {
      return toast.error("Please Enter Project Name");
    }
    if (formdata.Members.length === 0) {
      return toast.error("Please Select Employee");
    }
    // if (clientInfo === "") {
    //   return toast.error("Please Select any Client");
    // } 
    if (formdata.startDate === "") {
      return toast.error("Please Enter Start Date");
    }
    if (formdata.DueDate === "") {
      return toast.error("Please Enter Due Date");
    }
    if (formdata.Description === "") {
      return toast.error("Please Enter Project Description");
    }
    const toastId = toast.loading("Loading...");
    try {
      const ans = await editProjectapi({
        ...formdata, ...formdata, projectOwner: clientInfo || hrms_user._id,
        client: clientInfo || hrms_user._id, projectId: isEdit
      });
      if (ans?.status) {
        toast.success("Successfuly updated");
        getAllProject();
        const result = formdata.Members.map(userId => {
          const user = allEmp.find(e => e._id === userId);
          return user ? user.fullName : null;
        }).filter(fullName => fullName !== null);
        result.forEach((e) =>
          postNotifyProject(e, formdata.Name)
        )
        let validClient = allClient.find((e) => e._id === clientInfo)
        if (validClient) {
          postClientNotification(validClient.Name, formdata.Name);
        }
        setFormdata({
          Name: "",
          Description: "",
          Members: [],
          Status: "Ongoing",
          DueDate: "",

          projectOwner: clientInfo || hrms_user._id,
          client: clientInfo || hrms_user._id
        });
        setAddClientPop(false);
        setProUser([]);
        setIsEdit(false);
        setShowIndex(null);
      }
    } catch (error) {
      // console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }

    toast.dismiss(toastId);
  };

  const [currView, setCurrView] = useState(-1);


  const submitHandler = async (e) => {
    e.preventDefault();
    setShowIndex(null);
    if (formdata.Name === "") {
      return toast.error("Please Enter Project Name");
    }
    if (formdata.Members.length === 0) {
      return toast.error("Please Select Employee");
    }
    // if (clientInfo === "") {
    //   return toast.error("Please Select any Client");
    // } 
    if (formdata.startDate === "") {
      return toast.error("Please Enter Start Date");
    }
    if (formdata.DueDate === "") {
      return toast.error("Please Enter Due Date");
    }
    if (formdata.Description === "") {
      return toast.error("Please Enter Project Description");
    }
    const toastId = toast.loading("Loading...");
    try {
      const ans = await createProjectapi({
        ...formdata, projectOwner: clientInfo || hrms_user._id,
        client: clientInfo || hrms_user._id
      });
      if (ans?.status) {
        toast.success("Successfuly created");
        getAllProject();
        const result = formdata.Members.map(userId => {
          const user = allEmp.find(e => e._id === userId);
          return user ? user.fullName : null;
        }).filter(fullName => fullName !== null);

        // console.log(result);
        result.forEach((e) =>
          postNotifyProject(e, formdata.Name)
        )
        let validClient = allClient.find((e) => e._id === clientInfo)
        if (validClient) {
          postClientNotification(validClient.Name, formdata.Name);
        }
        setFormdata({
          Name: "",
          Description: "",
          Members: "",
          Status: "Ongoing",
          DueDate: "",
          startDate: "",

        });
        setAddClientPop(false);
        setProUser([]);
      }
    } catch (error) {
      // console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }

    toast.dismiss(toastId);
  };

  // const fetchemp = async () => {
  //   const ans = await allEmployee();

  //   setAllEmp(ans?.emp);
  // };

  const fetchemp = async () => {
    const ans = await allEmployee();
    // Filter active employees
    const activeEmployees = ans?.emp?.filter(
      (emp) => emp.isDeactivated === "No"
    );
    // console.log("activeEmployee",activeEmployees)
    setAllEmp(activeEmployees);
  };

  // const deleteApi = async (id) => {
  //   const toastId = toast.loading("Loading...");
  //   setShowIndex(null);
  //   const ans = await deleteTaskProject(id);
  //   toast.success("Successfuly deleted");
  //   toast.dismiss(toastId);
  //   getAllProject();
  // };

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
            await deleteTaskProject(id);
            toast.success("delete Successfully");
            await getAllProject();

          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });
  };

  const handleEditClick = (client) => {
    // console.log(client)
    const membersNames = client.Members.map((memberId) => {
      const member = allEmp.find((emp) => emp._id === memberId?._id);
      return member ? member.fullName : "";
    });
    const clientStatus = allClient.find((e) => e._id === client.client)
    // console.log(clientStatus?._id)
    setClientInfo(clientStatus?._id)
    setIsEdit(client._id);
    setFormdata({
      Name: client?.projectName,
      DueDate: client.deadline,

      ...client,
    });
    setProUser(membersNames);
    setAddClientPop(true);
  };

  useEffect(() => {
    fetchemp();
    getAllProject();
    getAllClient()
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  };


  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const projectsPerPage = 5;


  const filteredProjects = allProjects?.filter((project) => {
    const searchWords = searchInput.toLowerCase().trim().split(/\s+/);
    const name = project.projectName.toLowerCase();
    return searchWords.every((word) => name.includes(word));
  });

  const totalPages = Math.ceil(filteredProjects?.length / projectsPerPage);
  const paginatedProjects = filteredProjects?.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);


  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput]);

  useEffect(() => {
    if (optIndex === 0) {
      setAllProjects([...storeProject]);
    }
    else if (optIndex === 1) {
      const fitlerdata = storeProject.filter((pro) => pro.Status === "Ongoing");
      setAllProjects(fitlerdata);
    }
    else if (optIndex === 2) {
      const fitlerdata = storeProject.filter(
        (pro) => pro.Status === "Finished"
      );
      setAllProjects(fitlerdata);
    }
    else if (optIndex === 3) {
      const fitlerdata = storeProject.filter((pro) => pro.Status === "OnHold");
      setAllProjects(fitlerdata);
    }
    else {
      const fitlerdata = storeProject.filter((pro) => pro.Status === "Canceled");
      setAllProjects(fitlerdata);
    }
  }, [optIndex]);

  const popupWrapper = useRef();

  useOutsideClick(popupWrapper, () => {
    setAddClientPop(false);
  });

  return (
    <>
      <div className="flex relative  h-full">


        <div className="w-full  ">

          <div className="pt-[32px] pl-[20px] pr-[20px] pb-[32px] relative w-full">
            <div className="rlative flex flex-col gap-[20px]">
              <nav className="flex items-center justify-between">
                {location.state ? (<div className="flex flex-row items-center gap-3">

                  <NavLink to={`/adminDash/HRM`}>
                    <span className="hover:text-[#1567FF] cursor-pointer text-xl">Dashboard</span>
                  </NavLink>
                  <span>
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747295264/chevron_right_tg8uy4.png" alt="" />
                  </span>{" "}
                  <span className="text-[#1567FF] cursor-pointer">Projects</span>
                </div>) : (
                  <h2 className="text-[24px] font-semibold leading-[32px] text-left">Projects</h2>


                )}

                {(projectCreatePermission === true || role === "ADMIN") && <div className="clibtns">
                  <button
                    onClick={() => {
                      setAddClientPop(true);
                      setIsEdit(false);
                    }}
                    className="w-[137px] h-[40px] flex items-center justify-center gap-[10px] rounded-[10px] bg-[#0B56E4]"
                  >
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747201651/pluss_wqvd9q.png" />
                    <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-white">Add Project</span>
                  </button>
                </div>}
              </nav>


              <div className="flex flex-col xl:flex-row justify-between items-center">
                <div className="w-full lg:w-[500px] h-[42px] flex overflow-x-scroll lg:overflow-x-hidden">
                  {projectOpt.map((pr, index) => (
                    <div
                      onClick={() => setOptIndex(index)}
                      key={index}
                      className={`cursor-pointer w-fit h-full px-4 py-2 
          border 
          ${index === 0 ? "rounded-l-[8px] rounded-r-none" : ""}
          ${index === projectOpt.length - 1 ? "rounded-r-[8px] rounded-l-none" : ""}
          ${optIndex === index ? "bg-[#3C78E9] border-[#0B56E4]" : "bg-white border-[#E8E9EB]"}`}
                    >
                      <span
                        className={`font-inter text-base font-medium leading-6 tracking-[0.005em] text-center 
            ${optIndex === index ? "text-white" : "text-[#777777]"}`}
                      >
                        {pr}
                      </span>
                    </div>
                  ))}
                </div>

                <input

                  type="text"
                  className="h-[35px] mt-3 xl:md-0 p-4 rounded border border-gray-300"
                  placeholder="Search Project"
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                />
              </div>



              <div className="relative overflow-x-auto min-h-[250px]  rounded-lg">
                <table className="w-max lg:w-full text-sm text-left bg-white rounded-lg">
                  <thead className="bg-white font-semibold">
                    <tr>
                      <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">SR</th>
                      <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Project Name</th>
                      <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Start Date</th>
                      <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Deadline</th>
                      <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Members</th>
                      <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedProjects?.map((client, index) => (
                      <tr key={client._id || index}>
                        <td className="px-6 py-4 text-gray-800">{(currentPage - 1) * projectsPerPage + index + 1}</td>
                        <td className="px-6 py-4 text-gray-800">
                          <span>{client.projectName}</span>
                          <div className="flex gap-2 mt-1 text-sm text-blue-600">
                            <p className="underline cursor-pointer text-blue-600" onClick={() => {
                              if (showProjectPermission === true || role === "ADMIN") {
                                navigate(
                                  role === "EMPLOYEE" ? "/employeeDash/HRM/projectOverview" : "/adminDash/HRM/projectOverview",
                                  {
                                    state: client,
                                  }
                                )
                              } else {
                                alert("You do not have permission to view the project.");
                              }
                            }
                            }>View</p>
                            <span>|</span>
                            <p className="underline cursor-pointer text-blue-600" onClick={() => {
                              if (projectEditPermission === true || role === "ADMIN") {
                                handleEditClick(client);
                                setSelected(client);
                              } else {
                                alert("You do not have permission to edit the project.");
                              }
                            }}>Edit</p>
                            <span>|</span>
                            <p className="underline cursor-pointer text-blue-600" onClick={() => {
                              if (projectDeletePermission === true || role === "ADMIN") {
                                deleteProject(client?._id)
                              } else {
                                alert("You do not have permission to delete the project.");
                              }
                            }}>Delete</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-800">{new Date(client?.createdAt).toISOString().split("T")[0]}</td>
                        <td className="px-6 py-4 text-gray-800">{client?.deadline}</td>
                        <td className="flex">
                          {client?.Members?.map((member) => (
                            <img
                              key={member._id}
                              src={member?.profileImage || "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"}
                              className="w-10 h-10 mt-5 rounded-full cursor-pointer"
                              alt="Member Avatar"
                              onClick={() => navigate("/adminDash/EmployeeDetails", { state: member?._id })}
                            />
                          ))}
                        </td>
                        <td className="px-6 py-4 text-gray-800">
                          <span className="text-blue-600 border border-blue-200 bg-blue-50 flex items-center rounded-md text-xs font-medium leading-4 px-2 py-1">
                            {client.Status}
                          </span>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>

                {totalPages > 1 && (
                  <div className="flex gap-[5px] w-full items-center mt-5 justify-center">
                    <button
                      onClick={() => {
                        handlePrev();
                        scrollToTop();
                      }}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                    >
                      Prev
                    </button>
                    <span className="px-4"> {currentPage}</span>
                    <button
                      onClick={() => {
                        handleNext();
                        scrollToTop();
                      }}
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
        <div className="fixed inset-0 z-[3000] w-full h-full px-0 py-5 flex items-center justify-center bg-[#40404066] backdrop-blur-[1px]">
          <div ref={popupWrapper} className="w-[599px] p-6 flex flex-col gap-2 rounded-[18px] bg-white min-h-[400px] h-fit m-3">
            <nav>
              <p className="font-semibold">{isEdit ? "Edit Project" : "Create New Project"}</p>
            </nav>

            <hr />

            <form onSubmit={isEdit ? editHandler : submitHandler}>
              <div style={{ overflowY: "auto" }} className="flex flex-col gap-2">
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-semibold leading-[20px] tracking-[0.0025em]">Name <span className="text-red-600">*</span></p>
                  <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    name="Name"
                    required
                    value={formdata.Name}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Name"
                  />
                </label>

                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-semibold leading-[20px] tracking-[0.0025em]">Employee <span className="text-red-600">*</span></p>

                  <div className="flex items-center flex-wrap gap-[14px]">
                    {proUser.map((pro, index) => (
                      <div key={index} className="flex items-center gap-[4px]">
                        <p className="text-[#101820] text-[15px] font-normal leading-[32px]">{pro}</p>
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
                    value=''
                    onChange={changeHandler2}
                  >
                    <option value="Select">Select Employee <span className="text-red-600">*</span></option>
                    {allEmp?.map((emp, index) => (
                      <option value={emp?._id} key={index}
                        disabled={proUser.includes(emp.fullName)}>
                        {emp?.fullName} {formdata.Members.includes(emp._id) ? "(Selected)" : ""}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-semibold leading-[20px] tracking-[0.0025em]">Status <span className="text-red-600">*</span></p>
                  <select
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    name="Status"
                    value={formdata.Status}
                    onChange={changeHandler}
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="OnHold">OnHold</option>
                    <option value="Finished">Finished</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </label>

                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-semibold leading-[20px] tracking-[0.0025em]">Client</p>
                  <select
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    value={clientInfo}
                    onChange={(e) => setClientInfo(e.target.value)}  // Update state with the selected client
                  >
                    <option value={hrms_user._id}>Select</option>
                    {allClient.map((e, index) => (
                      <option value={e._id} key={index}>
                        {e.Name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-semibold leading-[20px] tracking-[0.0025em]">Start Date <span className="text-red-600">*</span></p>
                  <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    name="startDate"
                    value={formdata.startDate}
                    onChange={changeHandler}
                    type="date"
                  />
                </label>
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-semibold leading-[20px] tracking-[0.0025em]">Due Date <span className="text-red-600">*</span></p>
                  <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    name="DueDate"
                    value={formdata.DueDate}
                    onChange={changeHandler}
                    type="date"
                    min={formdata.startDate}
                  />
                </label>

                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-semibold leading-[20px] tracking-[0.0025em]">Description <span className="text-red-600">*</span></p>
                  <textarea
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    type="text"
                    name="Description"
                    value={formdata.Description}
                    onChange={changeHandler}
                    placeholder="Description"
                  />
                </label>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="saveclient">
                  <span className="px-4 py-1.5 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">{isEdit ? "Update" : "Add Project"} </span>
                </button>
                <button
                  onClick={() => {
                    setClientInfo()
                    setAddClientPop(false);
                    setProUser([]);
                    setFormdata({
                      Name: "",
                      Description: "",
                      Members: "",
                      Status: "Ongoing",
                      DueDate: "",

                    });
                  }}
                  className="cancel"
                >
                  <span className="px-4 py-1.5 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default TaskProjects;
