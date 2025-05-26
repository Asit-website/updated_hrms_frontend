import React, { useState, useEffect, useRef } from "react";

import { useLocation } from "react-router-dom";

import toast from "react-hot-toast";
import ProgressBar from "@ramonak/react-progress-bar";
import { FaFileAlt } from "react-icons/fa";
import { useMain } from "../../hooks/UseMain";
import CircularProgress from "../admin/TaskManagement/CircularProgress";
import ProjectOverview2 from "../admin/TaskManagement/ProjectOverview2";


const ClientProjectOverview = () => {

  const { getProjectTask, UploadFileProjectapi, allfilesproject, deleteProjectFile } = useMain();
  const location = useLocation();
  const data = location?.state;
  // console.log(data)
  const projectOpt = ["Overview", "Task", "Files"];
  const [optIndex, setOptIndex] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [openTask, setOpenTask] = useState(0);
  const [OpenTaskper, setOpenTaskper] = useState(0);


  const [selectedFile, setSelectedFile] = useState(null);
  const [allfiles, setAllFiles] = useState([]);
  const fileInputRef = useRef(null);


  const fetchAllFile = async () => {
    const resp = await allfilesproject(data?._id);
    setAllFiles(resp?.files?.reverse());
  };

  const handleFileChange = (event) => {
    const toastId = toast.loading("Loading...");
    const files = event.target.files; // Get all selected files
    setSelectedFile(files); // Store the files in state
    toast.dismiss(toastId);
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


  const deleteFile = async (id, uploadedBy) => {
    const hrms_user = localStorage.getItem("hrms_user")
    console.log(id)
    if (uploadedBy && uploadedBy !== hrms_user?.id) {
      alert("you can't delete it")
      return
    }
    const ans = await deleteProjectFile(id);
    await fetchAllFile()
    return ans;
  }
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

  const [allTasks, setAllTasks] = useState([]);
  const getProjectTaskapi = async () => {
    const ans = await getProjectTask(data?._id);
    setAllTasks(ans?.tasks);
  };
  useEffect(() => {
    getProjectTaskapi();
    fetchAllFile();
  }, [])

  useEffect(() => {
    const totalTasks = allTasks?.length;
    const completedTasks = allTasks?.filter(
      (task) => task?.Status === "Completed"
    )?.length;

    const openTaskse = allTasks?.filter(
      (task) => task?.Status !== "Completed"
    )?.length;

    setOpenTask(openTaskse);
    const completedPercentage = (completedTasks / totalTasks) * 100;
    const opentaskper = ((openTaskse / totalTasks) * 100)?.toFixed(0);

    if (isNaN(opentaskper)) {
      console.log("opentaskper is NaN");

      setOpenTaskper(0);
    } else {
      setOpenTaskper(opentaskper);

      console.log("opentaskper is not NaN");
    }

    setPercentage(completedPercentage);
    // gettAllClients();
  }, [allTasks]);
  useEffect(() => { }, [selectedFile])

  return (
    <>
      {/* <h1>hello</h1> */}
      <div className="employee-dash h-full">
      
        <div className="w-full bg-[#f5f5f5]">
      

          <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full">
            <div
              className="w-[338px] h-[42px] flex items-center"
            
            >
              {projectOpt.map((pr, index) => (

<div
  onClick={() => setOptIndex(index)}
  key={index}
  className={`cursor-pointer w-fit h-full px-[16px] py-[10px] border ${
    index === 0 ? "rounded-l-[8px]" : ""
  } ${index === 2 ? "addBorder rounded-r-[8px]" : ""}
    ${optIndex === index ? "bg-[#3C78E9] border-[#0B56E4]" : "bg-white border-[#E8E9EB]"}
  `}
>
  <span
    className={`font-medium text-[16px] leading-[24px] tracking-[0.005em] text-center ${
      optIndex === index ? "text-white" : "text-[#777777]"
    }`}
  >
    {pr}
  </span>
</div>

              ))}
            </div>


            {optIndex === 0 && (
              <div className="relative flex flex-col md:flex-row gap-5 mt-[40px]">
                <div className="bg-white p-[24px] flex flex-col gap-[24px] rounded-[10px] max-w-[650px] w-full
">
                  <nav>
                    <div className="pronaheading">
                      <h2>OVERVIEW {data?.projectName}</h2>
                    </div>
                  </nav>

                  <div className="flex flex-col md:flex-row items-center w-full justify-between
">
                    <div className="grid grid-cols-2 gap-[30px]
">
                      <p className="text-[#2B2B2B] font-medium text-[14px] leading-[20px] tracking-[0.0025em] text-left
">Project</p>
                      <p className="text-[#2B2B2B] font-medium text-[14px] leading-[20px] tracking-[0.0025em] text-left
">{data?.projectName}</p>
                      <p className="text-[#2B2B2B] font-medium text-[14px] leading-[20px] tracking-[0.0025em] text-left
">Status</p>
                      <p className="text-[#2B2B2B] font-medium text-[14px] leading-[20px] tracking-[0.0025em] text-left
">{data?.Status}</p>
                      <p className="text-[#2B2B2B] font-medium text-[14px] leading-[20px] tracking-[0.0025em] text-left
">Date Created </p>
                      <p className="text-[#2B2B2B] font-medium text-[14px] leading-[20px] tracking-[0.0025em] text-left
">
                        {new Date(data?.createdAt).toISOString().split("T")[0]}
                      </p>
                      <p className="text-[#2B2B2B] font-medium text-[14px] leading-[20px] tracking-[0.0025em] text-left
">Deadline</p>
                      <p className="text-[#2B2B2B] font-medium text-[14px] leading-[20px] tracking-[0.0025em] text-left
">{data?.deadline}</p>
                    </div>

                    <div className="flex flex-col gap-[3px] items-center
">
                      <h4 className="w-full text-[#101820] font-medium text-[20px] leading-[32px]
">Project Progress</h4>
                      <CircularProgress
                        percentage={(data?.Status === "Finished") ? 100 : (percentage || 0)}
                        color={"#4caf50"}
                      />
                    </div>
                  </div>{/* left  */}

                  <hr />

                  <div className="flex flex-col gap-5
">
                    <h3 className="text-[#2B2B2B] font-medium text-[22px] leading-[20px] tracking-[0.0025em] text-left
">DESCRIPTION</h3>
                    <p className="text-[#2B2B2B] font-normal text-[16px] leading-[20px] tracking-[0.0025em] text-left
">{data?.Description}</p>
                  </div>


                </div>

                <div className="bg-white w-full md:w-1/2 p-5
">
                  <div className="flex flex-col items-start gap-2.5 w-full
">
                    <nav className="flex flex-col gap-5 max-w-[300px] w-full
">
                      <p>{openTask}/{allTasks?.length} Open TASKS</p>
                      <ProgressBar completed={OpenTaskper} />
                    </nav>
                    <hr className="my-5" />
                    <div className="flex flex-col gap-5
">
                      <h3 className="text-[#2B2B2B] font-medium text-[22px] leading-[20px] tracking-[0.0025em] text-left
">MEMBERS</h3>

                      <div className="flex flex-col gap-[30px]
">
                        {data?.Members?.map((mem, index) => (
                          <div key={index} className="flex items-center gap-4
    ">
                            <img className="w-[50px] h-[50px] rounded-full
" src={mem?.profileImage ? mem?.profileImage : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"} alt="" />
                            <p className="text-[14px] font-medium leading-[20px] text-left text-[#2B2B2B] tracking-[0.0025em]">{mem?.fullName}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {optIndex === 1 && (
              <>
                <div style={{ marginTop: "-1px", paddingTop: "-20px" }}>
                  <ProjectOverview2
                    getProjectTaskapi={getProjectTaskapi}
                    allTasks={allTasks}
                    setAllTasks={setAllTasks}
                    data={data}
                  />
                </div>
              </>
            )}

            {optIndex === 2 && (
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
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">All Files</h4>
                  <div className="space-y-6">
                    {allfiles?.map((file, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-600">
                              <strong>File Name:</strong> {file?.fileName}
                            </p>
                            {/* <p className="text-gray-600">
                              <strong>Download Link:</strong>{" "}
                              <a
                                target="_blank"
                                href={`${file?.filePath}`}
                                className="text-blue-500 hover:underline"
                              >
                                {file?.filePath}
                              </a>
                            </p> */}
                            <p className="text-gray-600">
                              <strong>Uploaded by:</strong> {file?.uploadedBy?.fullName || JSON.parse(localStorage.getItem("hrms_user")).Name}
                            </p>
                            <p className="text-gray-600">
                              <strong>Uploaded On:</strong> {new Date(file?.createdAt).toLocaleDateString()}
                            </p>
                            <button onClick={() => deleteFile(file?._id, file?.uploadedBy?._id)} className="bg-red-500 text-white px-2 rounded py-1">Delete</button>
                          </div>

                          {/* Image or file preview */}
                          <div className="flex flex-col items-center justify-center">
                            {file?.filePath && /\.(jpg|jpeg|png|gif|webp)$/i.test(file?.filePath) ? (
                              // Show Image Preview
                              <a
                                target="_blank"
                                href={`${file?.filePath}`}
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

    </>
  )
}

export default ClientProjectOverview;