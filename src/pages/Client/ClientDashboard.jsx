import React, { useState, useEffect } from "react";

import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useMain } from "../../hooks/UseMain";



const ClientDashboard = () => {
    const { getClientProject, getAllProjectApi } = useMain
    ();
    const navigate = useNavigate();
    const location = useLocation();
    const data = location?.state
    let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

    const role = hrms_user?.Role || hrms_user?.role;

    const [projects, setProjects] = useState([]);
    const [storeProject,setStorePro] = useState([]);

    const [optIndex,setOptIndex] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    let itemsPerPage = 5
    const totalPages = Math?.ceil(projects?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = Math.min(startIndex + itemsPerPage, projects?.length);

  const currentItems = projects?.slice(startIndex, endIndex);
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


    const getAllProject = async (clientId) => {
        const ans = await getAllProjectApi();
        if (ans?.status) {
            const res = ans?.projects.filter(e => e.client === clientId);
            // console.log(res)
            setStorePro(res);
            setProjects(res);
        }
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


    useEffect(() => {
        const client = JSON.parse(localStorage.getItem("hrms_user"));
        getAllProject(client._id);

    }, []);
      useEffect(() => {
        if (optIndex === 0) {
          setProjects([...storeProject]);
        } else if (optIndex === 1) {
          const fitlerdata = storeProject.filter((pro) => pro.Status === "Ongoing");
          setProjects(fitlerdata);
        } else if (optIndex === 2) {
          const fitlerdata = storeProject.filter(
            (pro) => pro.Status === "Finished"
          );
          setProjects(fitlerdata);
        } else if(optIndex===3) {
          const fitlerdata = storeProject.filter((pro) => pro.Status === "OnHold");
          setProjects(fitlerdata);
        } else{
          const fitlerdata = storeProject.filter((pro) => pro.Status === "Canceled");
          setProjects(fitlerdata);
        }
      }, [optIndex]);



    return (
        <>
            <div className="employee-dash h-full pb-40 bg-[#f5f5f5]">
              

                <div className="w-full bg-[#f5f5f5]">
                  
                    <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full
">
                        <div className="flex-col">
                            <div className="flex items-center justify-between w-full">
                                {/* left side */}
                                <div className="flex flex-col gap-[5px]
">
                                    <h2 className="text-[24px] font-semibold leading-[32px] text-left
">Hi {hrms_user?.Name}</h2>
                                    <p className="text-[12px] font-normal leading-[16px] text-left text-[#666D76]
">Welcome to your project management dashboard! Here, you can track your total, ongoing, and completed projects with real-time insights.</p>
                                </div>

                                {/* right side  */}
                                <button
                                    onClick={() => {
                                        window.location.href = "/client";
                                    }}
                                    className="w-[136px] h-[40px] px-[24px] py-[10px] rounded-[10px] 
    bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)] 
    border border-[#0B56E4] flex items-center gap-[4px] 
    text-[#0B56E4] text-[16px] font-medium leading-[24px] 
    tracking-[0.005em] text-left"
                                >
                                    Refresh{" "}
                                    <span>
                                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748248672/bx-refresh_fwpxwq.png" alt="" />
                                    </span>
                                </button>
                            </div>
                            <div className="flex gap-3 items-center mt-4">
                                <NavLink
                                    className={`w-full ${optIndex === 0 ? 'border rounded' : 'bg-gray-200 text-black'}`}
                                    onClick={()=>setOptIndex(0)}

                                >
                                    <div className={`flex justify-between gap-[12px] p-[12px] rounded-[10px] border cursor-pointer
 bg-[#DEF2EB] border border-[#B7DFD5]
  `}>
                                        <img className="max-w-[35px] max-h-[35px] rounded-[8px]
" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748248539/projects_zzsjjo.svg" alt="" />

                                        <div className="flex flex-col gap-2
">
                                            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[0.0015em] text-left text-[#1B2533]
">Total Projects</h3>
                                            <p className="
text-[24px] font-semibold leading-[32px] text-right text-[#293240]
">{storeProject.length}</p>
                                        </div>
                                    </div>
                                </NavLink>
                                <NavLink
                                    className="w-full"
                                    onClick={()=>setOptIndex(1)}

                                >                                    <div className="flex justify-between gap-[12px] p-[12px] rounded-[10px] border cursor-pointer
 bg-[#FCEFEC] border border-[#F4C0B3]
">

                                        <img className="max-w-[35px] max-h-[35px] rounded-[8px]
" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748248539/projects_zzsjjo.svg" alt="" />

                                        <div className="flex flex-col gap-2
">
                                            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[0.0015em] text-left text-[#1B2533]
">Ongoing Projects</h3>
                                            <p className="
text-[24px] font-semibold leading-[32px] text-right text-[#293240]
">{storeProject.filter((pro) => pro.Status === "Ongoing").length}</p>
                                        </div>
                                    </div>
                                </NavLink>
                                <NavLink
                                    className="w-full"
                                    onClick={()=>setOptIndex(2)}

                                >
                                    <div className="flex justify-between gap-[12px] p-[12px] rounded-[10px] border cursor-pointer
 bg-[#DEF2EB] border border-[#B7DFD5]
 ">
                                        <img className="max-w-[35px] max-h-[35px] rounded-[8px]
" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748248539/projects_zzsjjo.svg" alt="" />

                                        <div className="flex flex-col gap-2
">
                                            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[0.0015em] text-left text-[#1B2533]
">Finished Projects</h3>
                                            <p className="
text-[24px] font-semibold leading-[32px] text-right text-[#293240]
">{storeProject.filter((pro) => pro.Status === "Finished").length}</p>
                                        </div>
                                    </div>
                                </NavLink>
                                <NavLink
                                    className="w-full"
                                    onClick={()=>setOptIndex(3)}

                                >
                                    <div className="flex justify-between gap-[12px] p-[12px] rounded-[10px] border cursor-pointer
 bg-[#FCEFEC] border border-[#F4C0B3]
 ">
                                        <img className="max-w-[35px] max-h-[35px] rounded-[8px]
" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748248539/projects_zzsjjo.svg" alt="" />

                                        <div className="flex flex-col gap-2
">
                                            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[0.0015em] text-left text-[#1B2533]
">OnHold Projects</h3>
                                            <p className="
text-[24px] font-semibold leading-[32px] text-right text-[#293240]
">{storeProject.filter((pro) => pro.Status === "OnHold").length}</p>
                                        </div>
                                    </div>
                                </NavLink>
                                <NavLink
                                    className="w-full"
                                    onClick={()=>setOptIndex(4)}

                                >
                                    <div className="flex justify-between gap-[12px] p-[12px] rounded-[10px] border cursor-pointer
 bg-[#D7E5FF] border border-[#B3CBF7]
">
                                        <img className="max-w-[35px] max-h-[35px] rounded-[8px]
" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748248539/projects_zzsjjo.svg" alt="" />

                                        <div className="flex flex-col gap-2
">
                                            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[0.0015em] text-left text-[#1B2533]
">Canceled Projects</h3>
                                            <p className="
text-[24px] font-semibold leading-[32px] text-right text-[#293240]
">{storeProject.filter((pro) => pro.Status === "Canceled").length}</p>
                                        </div>
                                    </div>
                                </NavLink>

                            </div>
                        </div>
                        <div className="relative flex flex-col gap-5
">


                            <nav>
                                <h1 className="my-5 text-3xl font-bold">
                                    {role === "Client" && (
                                        optIndex === 0 ? ('All Projects') : (optIndex === 1 ? ('Ongoing Projects') : (optIndex === 2 ? ("Finished Projects") : (optIndex === 3 ? ("OnHold Projects") : ("Canceled Projects"))))
                                    )}
                                </h1>
                            </nav>

                            <div className="flex flex-wrap gap-[15px]
">
                                {projects.length > 0 ? (
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                                            <tr>
                                                <th className="px-4 py-3 text-center">SR/No</th>
                                                <th className="px-4 py-3 text-center">Project Name</th>
                                                <th className="px-4 py-3 text-center">Start Date</th>
                                                <th className="px-4 py-3 text-center">Deadline</th>
                                                <th className="px-4 py-3 text-center">Members</th>
                                                <th className="px-4 py-3 text-center">Status</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {currentItems.map((project, index) => (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                                    <td className="px-4 py-3 text-center">{startIndex+index + 1}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span>{project.projectName}</span>
                                                        <div
                                                            style={{
                                                             
                                                                gap: "10px",
                                                                marginTop: "2px",
                                                                fontSize: "0.875rem",
                                                                color: "#2563eb",
                                                            }}
                                                        >
                                                            <p style={{ margin: 0, cursor: "pointer" }}
                                                                onClick={() => navigate("/client/task", {
                                                                    state: project,
                                                                })}
                                                                className="underline text-blue-600"
                                                            >
                                                                View
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">{project.startDate}</td>
                                                    <td className="px-4 py-3 text-center">{project.deadline}</td>
                                                    <td className="flex">
                                                        {project?.Members?.map((member, index) => {
                                                            return <>
                                                                <img
                                                                    src={`${member?.profileImage
                                                                        ? member?.profileImage
                                                                        : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                                                                        }`}
                                                                    className="w-10 h-10 rounded-full cursor-pointer transition-colors duration-300 ease-in-out"
                                                                    alt="Member Avatar "
                                                                    key={member?._id}


                                                                /></>
                                                        })}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">{project.Status}</td>


                                                </tr>

                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <h1>No have any project</h1>
                                )}

                            </div>
                            {totalPages >1 && (
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
                    </div>
                </div>
            </div>

        </>
    );
};

export default ClientDashboard;
