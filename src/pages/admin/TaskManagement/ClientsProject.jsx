import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import { useMain } from "../../../hooks/UseMain";

const AdminClientDashboard = () => {
    const { getClientProject, createProjectapi, allEmployee, editProjectapi, deleteTaskProject, getAllProjectApi } = useMain();
    const navigate = useNavigate();
    const location = useLocation();
    const data = location?.state;
    let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
    const role = hrms_user?.role;
    const hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"))
    const { showProjectPermission, projectEditPermission, projectDeletePermission, projectCreatePermission } = hrms_permission;

    const [formdata, setFormdata] = useState({
        Name: "",
        Description: "",
        Members: [],
        startDate: "",
        Status: "Ongoing",
        DueDate: "",
        client: data && data._id,
        projectOwner: data && data._id
    });
    const [projects, setProjects] = useState([])

    const [proUser, setProUser] = useState([]);
    const [showIndex, setShowIndex] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [addClientPop, setAddClientPop] = useState(false);
    const [optIndex, setOptIndex] = useState(0);
    const [allProjects, setAllProjects] = useState([]);
    const [storeProject, setStorePro] = useState([]);
    const [allEmp, setAllEmp] = useState([]);
    const [loading, setLoading] = useState(false)
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
        console.log(newMembers)
        setProUser(newProUser);
        console.log(newProUser)
        const alreadyUsers = allEmp.filter((emp) => newProUser.includes(emp?.fullName));
        setFormdata({ ...formdata, Members: alreadyUsers.map((user) => user._id) });
    };

    const getAllProject = async (clientId) => {
        setLoading(true)
        const ans = await getAllProjectApi();
        if (ans?.status) {
            const res = ans?.projects.filter(e => e.client === clientId);
            setProjects(res);
        }
        setLoading(false)
    };

    const fetchClientProjects = async (clientId) => {
        try {
            const data = await getClientProject(clientId);
            if (data?.projects) {
                setProjects(data.projects);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const editHandler = async (e) => {
        e.preventDefault({ ...formdata, projectId: isEdit });
        const toastId = toast.loading("Loading...");
        console.log("here is data", { ...formdata, projectId: isEdit })
        try {
            const ans = await editProjectapi({ ...formdata, projectId: isEdit });
            if (ans?.status) {
                toast.success("Successfully updated");
                fetchClientProjects(data._id);
                setFormdata({
                    Name: "",
                    Description: "",
                    Members: [],
                    Status: "Ongoing",
                    DueDate: "",
                    Members: "",
                });
                setAddClientPop(false);
                setProUser([]);
                setIsEdit(false);
                setShowIndex(null);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong, please try again");
        }

        toast.dismiss(toastId);
        return window.location.reload();
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setShowIndex(null);
        const toastId = toast.loading("Loading...");
        try {
            const ans = await createProjectapi({
                ...formdata,
                projectOwner: data._id,
                client: data._id
            });

            if (ans?.status) {
                toast.success("Successfully created project");
                fetchClientProjects(data._id);

                setFormdata({
                    Name: "",
                    Description: "",
                    Members: "",
                    Status: "Ongoing",
                    DueDate: "",
                    startDate: "",
                    client: "",
                    projectOwner: ""
                });

                setAddClientPop(false);
                setProUser([]);
                fetchClientProjects(data._id);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong, please try again");
        }

        toast.dismiss(toastId);
        return window.location.reload();
    };


    const handleEditClick = (client) => {
        console.log(client)
        const membersNames = client.Members.map((memberId) => {
            const member = allEmp.find((emp) => emp._id === memberId?._id);
            return member ? member.fullName : "";
        });

        setIsEdit(client._id);
        setFormdata({
            Name: client?.projectName,
            DueDate: client.deadline,

            ...client,
        });
        setProUser(membersNames);
        setAddClientPop(true);
    };

    const fetchemp = async () => {
        const ans = await allEmployee();
        // Filter active employees
        const activeEmployees = ans?.emp?.filter(
            (emp) => emp.isDeactivated === "No"
        );

        setAllEmp(activeEmployees);
    };

    const deleteApi = async (id) => {
        confirmAlert({
            title: "Are you sure to delete this project?",
            message: "All related data to this will be deleted",
            buttons: [
                {
                    label: "Yes, Go Ahead!",
                    style: {
                        background: "#FF5449",
                    },
                    onClick: async () => {
                        const toastId = toast.loading("Loading...");
                        setShowIndex(null);
                        const ans = await deleteTaskProject(id);
                        toast.success("Successfully deleted");
                        toast.dismiss(toastId);
                        await fetchClientProjects(data._id);
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
        const client = JSON.parse(localStorage.getItem("hrms_user"));
        data && getAllProject(data._id);
        fetchemp()
    }, []);

    return (
        <>
           
               
         
                  <div className="pt-8 pr-5 pb-8 pl-[24px] relative w-full bg-[#f5f5f5] ">
                        <div className="relative flex flex-col gap-[10px]">
                            <nav className="flex flex-col md:flex-row justify-between items-center">
                                <h1 className="my-5 text-3xl font-bold">{role === "Client" ? 'My Projects' : `${data?.Name} Projects`}</h1>
                                {(projectCreatePermission === true || role === "ADMIN") && <div className="w-[137px] h-[40px] flex items-center justify-center gap-[10px] rounded-[10px] bg-[#0B56E4]">
                                    <button
                                        onClick={() => {
                                            setAddClientPop(true);
                                        }}
                                        className="w-[137px] h-[40px] flex items-center justify-center gap-[10px] rounded-[10px] bg-[#0B56E4]"
                                    >
                                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747201651/pluss_wqvd9q.png" />
                                        <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em]">Add Project</span>
                                    </button>
                                </div>}


                            </nav>

                            <nav>
                                <h1 className="my-5 text-3xl font-bold">
                                    {role === "Client" && 'My Projects'}
                                </h1>
                            </nav>

                            <div className="relative w-full bg-white overflow-x-scroll md:overflow-visible">
                                <table className="w-full text-sm text-gray-700">
                                    <thead className="bg-white font-semibold">
                                        <tr>
                                            <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">S.No</th>
                                            <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Project Name</th>
                                            <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Start Date</th>
                                            <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Deadline</th>
                                            <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Members</th>
                                            <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {loading ? (
                                            <div className="flex justify-center items-center relative left-[400px] top-[100px] ">
                                                <div className="w-16 h-16 border-t-4 border-black border-solid rounded-full animate-spin"></div>
                                            </div>
                                        ) : (
                                            projects?.map((project, index) => (
                                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                                                    <td className="px-3 py-3">{index + 1}</td>
                                                    <t  className="px-6 py-4 text-gray-800"d>
                                                        <span>{project.projectName}</span>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                gap: "10px",
                                                                marginTop: "2px",
                                                                fontSize: "0.875rem",
                                                                color: "#2563eb",
                                                            }}
                                                        >
                                                            <p
                                                                style={{ margin: 0, cursor: "pointer" }}
                                                                onClick={() => {
                                                                    if (showProjectPermission === true || role === "ADMIN") {
                                                                        navigate(
                                                                            role === "EMPLOYEE" ? "/employeeDash/HRM/projectOverview" : "/adminDash/HRM/projectOverview",
                                                                            {
                                                                                state: project,
                                                                            }
                                                                        )
                                                                    } else {
                                                                        alert("You do not have permission to view the project.");
                                                                    }
                                                                }
                                                                }
                                                                className="underline text-blue-600"
                                                            >
                                                                View
                                                            </p>
                                                            <span>|</span>
                                                            <p
                                                                onClick={() => {
                                                                    if (projectDeletePermission === true || role === "ADMIN") {
                                                                        handleEditClick(project);
                                                                    } else {
                                                                        alert("You do not have permission to edit the project.");
                                                                    }
                                                                }}

                                                                style={{ margin: 0, cursor: "pointer" }}
                                                                className="underline text-blue-600"
                                                            >
                                                                Edit
                                                            </p>
                                                            <span>|</span>
                                                            <p
                                                                onClick={() => {
                                                                    if (projectEditPermission === true || role === "ADMIN") {
                                                                        deleteApi(project?._id)
                                                                    } else {
                                                                        alert("You do not have permission to edit the project.");
                                                                    }
                                                                }}
                                                                style={{ margin: 0, cursor: "pointer" }}
                                                                className="underline text-blue-600"
                                                            >
                                                                Delete
                                                            </p>
                                                        </div>
                                                    </t>
                                                    <td  className="px-6 py-4 text-gray-800">{project.startDate}</td>
                                                    <td  className="px-6 py-4 text-gray-800">{project.deadline}</td>
                                                    <td className="flex px-6 py-4 text-gray-800">
                                                        {project?.Members?.map((member, index) => (
                                                            <img
                                                                src={
                                                                    member?.profileImage
                                                                        ? member?.profileImage
                                                                        : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                                                                }
                                                                className="w-10 h-10 rounded-full cursor-pointer transition-colors duration-300 ease-in-out"
                                                                alt="Member Avatar"
                                                                key={index}
                                                                onClick={() =>
                                                                    navigate("/adminDash/EmployeeDetails", {
                                                                        state: member?._id,
                                                                    })
                                                                }
                                                            />
                                                        ))}
                                                    </td>
                                                    <td    className="px-6 py-4 text-gray-800">{project.Status}</td>
                                                </tr>
                                            ))
                                        )}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    
            </div>

            {addClientPop && (
                <div className="bg-[#40404066] fixed inset-0 z-[3000] w-full h-full py-[20px] flex items-center justify-center backdrop-blur-[1px]">
                    <div className="w-[599px] p-[24px] h-auto flex flex-col gap-[16px] rounded-[18px] bg-white addheight">
                        <nav className="flex items-center justify-between">
                            <p className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">{!isEdit ? 'Create New Project' : "Edit Project"}</p>
                            <img
                                onClick={() => {
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
                                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747207613/cutt_g0ckso.png"
                                alt=""
                            />
                        </nav>

                        <hr />

                        <form onSubmit={isEdit ? editHandler : submitHandler}>
                            <div style={{ overflowY: "auto" }}>
                                <label className="block text-md font-normal mb-1">
                                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Name</p>
                                    <input
                                       className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                                        name="Name"
                                        value={formdata.Name}
                                        onChange={changeHandler}
                                        type="text"
                                        placeholder="Name"
                                    />
                                </label>

                                <label className="block text-md font-normal mb-1">
                                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Employee </p>

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
                                        <option value="Select">Select Employee</option>
                                        {allEmp?.map((emp, index) => (
                                            <option value={emp?._id} key={index}
                                                disabled={proUser.includes(emp.fullName)}>
                                                {emp?.fullName} {formdata.Members.includes(emp._id) ? "(Selected)" : ""}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="block text-md font-normal mb-1">
                                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Status </p>
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

                                <label  className="block text-md font-normal mb-1">
                                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Start Date</p>
                                    <input
                                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                                        name="startDate"
                                        value={formdata.startDate}
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
                                        min={formdata.startDate}
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
                                    />
                                </label>
                            </div>
                            <div className="flex gap-3">
                                <button type="submit" className="saveclient">
                                    <span className="px-4 py-1.5 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">{isEdit ? "Update" : 'Add Project'} </span>
                                </button>
                                <button
                                    onClick={() => {
                                        setAddClientPop(false);
                                        setIsEdit(false)
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

export default AdminClientDashboard;
