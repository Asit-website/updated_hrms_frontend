import React from "react";
import "react-calendar/dist/Calendar.css";
// import "react-profile-avatar/dist/index.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMain } from "../../../hooks/UseMain";


const projectOpt = ["All", "Ongoing", "Finished", "OnHold"];

const Tasks = () => {

  const { user , allEmployee , getAllProjectApi , CreateProjectTask , getAllProjectAllTaskApi } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [formdata, setFormdata] = useState({
    Title: "",
    Description: "",
    Members: "",
    StartDate:"" ,
    DueDate: "",
    Project:"" , 
    Priority:"" , 
    Github:""

  });

  const [setProUser] = useState([]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const [addClientPop, setAddClientPop] = useState(false);

  const [allEmp, setAllEmp] = useState([]);

  const [allProject , setAllProject] = useState([]);
  const [allTasks , setAllTasks] = useState([]);

  const allEmpapi = async()=>{
     const ans = await allEmployee();
     setAllEmp(ans?.emp);
  } 

  const getAllProjectAllTask = async()=>{
    const ans = await getAllProjectAllTaskApi();
    console.log("getAllProjectAllTaskApi",ans)
     setAllTasks(ans?.data);

 }

  const getAllProject = async()=>{
    const ans = await getAllProjectApi();
    setAllProject(ans?.data);
  } 

  const submitHandler = async(e)=>{
    e.preventDefault();
    try{

      const toastId = toast.loading("Loading....");

       const ans = await CreateProjectTask({...formdata});
        if(ans?.status){
          toast.success("Successfuly created task");
        }

        setAddClientPop(false);
        getAllProjectAllTask();
        setFormdata({
          Title: "",
          Description: "",
          Members: "",
          StartDate:"" ,
          DueDate: "",
          Project:"" , 
          Github:""
      
        })

       toast.dismiss(toastId);

    } catch(error){
      console.log(error);
      toast.error("Something went wrong , please try again")
    }
  }

  useEffect(()=>{
    allEmpapi();
    getAllProject();
    getAllProjectAllTask();
  },[])

  return (
    <>
      <div className="employee-dash h-full">
       

        <div className="w-full bg-[#f5f5f5]">
          

          <div className="p-[30px_20px_10px_20px] relative w-full">

            <div className="relative flex flex-col gap-[20px]">

              <nav className="flex flex-col lg:flex-row items-center justify-between">
              
                <h2 className="text-[24px] font-semibold leading-[32px] text-left">Tasks</h2>

                <div className="flex items-center gap-[16px]">
                  <button
                    onClick={() => {
                      setAddClientPop(true);
                    }}
                    className="w-[137px] h-[40px] flex items-center justify-center gap-[10px] rounded-[10px] bg-[#0B56E4]"
                  >
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748340240/pluss_ia03lu.png" /> <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-white
">Add Tasks</span>
                  </button>
                  <button className="w-[133px] h-[40px] rounded-[10px] border border-[#0B56E4] bg-gradient-to-br from-[#D1E8FD] to-[#EDEFFF]"
                  >
                    <span className="text-[#0B56E4] text-[16px] font-medium leading-[24px] tracking-[0.005em]">Import Tasks</span>
                  </button>
                  <button className="w-[133px] h-[40px] bg-[#E8E9EB] rounded-[8px] border border-[#B8BBC0]">
                    <span className="text-[#1B2533] text-[16px] font-medium leading-[24px] tracking-[0.005em]">Export Tasks</span>
                  </button>
                </div>
              </nav>

            </div>

            {/* ALL TASKS  */}
            

<div class="relative overflow-x-auto min-h-[250px]">
    <table class="min-w-full text-sm text-left bg-white rounded-lg mt-[20px]">
        <thead class="bg-white font-semibold">
            <tr>

                <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                    Subject
                </th>
                <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                Assign To
                </th>
                <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                StartDate
                </th>
                <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                DueDate
                </th>
                <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                Project
                </th>
                <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                Priority
                </th>
                <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                Github
                </th>
                <th scope="col" class="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                Description
                </th>
            </tr>
        </thead>
        <tbody>

  {
    allTasks?.map((task ,index)=>(
      <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
     
      <td class="px-4 py-3">
          {task.Title}
      </td>
      <td class="px-4 py-3">
          {task?.Members?.fullName}
      </td>
      <td class="px-4 py-3">
          {task?.StartDate}
      </td>
      <td class="px-4 py-3">
          {task?.DueDate}
      </td>
      <td class="px-4 py-3">
          {task?.Project?.Name}
      </td>
      <td class="px-4 py-3">
          {task?.Priority}
      </td>
      <td class="px-4 py-3">
          {task?.Github}
      </td>
      <td class="px-4 py-3">
          {task?.Description}
      </td>
  </tr>

    ))
  }
          
        </tbody>
    </table>
</div>


          </div>

        </div>
      </div>

      {addClientPop && (
        <div className="fixed inset-0 z-[3000] w-full h-full p-5 flex items-center justify-center bg-[#40404066] backdrop-blur-[1px]">
          <div className="w-[599px] p-6 flex flex-col gap-4 rounded-[18px] bg-white min-h-[400px] h-fit
">

            <nav className="flex items-center justify-between">
              <p className="text-[#1B2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Create New Task</p>
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
               
                  })
                }}
                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747813803/cancell_izt3hj.png"
                alt=""
              />
            </nav>

            <hr />

            <form onSubmit={submitHandler} className="flex flex-col gap-3 overflow-y-auto h-[450px]">

              <label className="block text-md font-normal mb-1">
                <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Subject</p>
                <input
                  name="Title"
                  value={formdata.Title}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Name"
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                />
              </label>

              <label className="block text-md font-normal mb-1">
                <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Assign To </p>

                <select
                  name="Members"
                  value={formdata.Members}
                  onChange={changeHandler}
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                >
                  <option value="Select">Select Employee</option>
                  {allEmp?.map((emp, index) => (
                    <option value={emp?._id} key={index}>
                      {emp?.fullName}
                    </option>
                  ))}
                </select>

              </label>

              <label className="block text-md font-normal mb-1">
                <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Project </p>

                <select
                  name="Project"
                  value={formdata.Project}
                  onChange={changeHandler}
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                >
                  <option value="Select">Select Employee</option>
                  {allProject?.map((emp, index) => (
                    <option value={emp?._id} key={index}>{emp?.Name}</option>
                  ))}
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
                  name="StartDate"
                  value={formdata.StartDate}
                  onChange={changeHandler}
                  type="date"
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                />
               
              </label>

              <label className="block text-md font-normal mb-1">
                <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Due Date</p>
                <input
                  name="DueDate"
                  value={formdata.DueDate}
                  onChange={changeHandler}
                  type="date"
                  min={formdata.StartDate}
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                />
              </label>

              <label className="block text-md font-normal mb-1">
                <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Github</p>
                <input
                  name="Github"
                  value={formdata.Github}
                  onChange={changeHandler}
                  type="text"
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                />
              </label>

              <label className="block text-md font-normal mb-1">
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

              <div className="flex items-center gap-[16px]">
                <button type="submit" className="w-[119px] h-10 rounded-[10px] bg-[#0B56E4]">
                  <span className="text-[16px] font-medium leading-6 tracking-[0.005em] text-white">Add Task</span>
                </button>
                <button
                
                  onClick={() => {
                    setAddClientPop(false);
                    setProUser([]);
                     setFormdata({
                      Name: "",
                      Description: "",
                      Members: "",
                      Status: "Ongoing",
                      DueDate: "",
                    
                     })
                  }}
                  className="w-[86px] h-10 rounded-[10px] border border-[#B8BBC0]"
                >
                  <span className="text-[16px] font-medium leading-6 tracking-[0.005em] text-[#666D76]">Cancel</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </>
  );
};
export default Tasks;
