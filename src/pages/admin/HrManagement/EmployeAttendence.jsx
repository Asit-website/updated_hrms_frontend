import React from "react";
import "react-calendar/dist/Calendar.css";

import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMain } from "../../../hooks/UseMain";

const EmployeAttendence = () => {
  const {allEmployee  , getAttendence} = useMain();

  const [allEmp , setAllEmp] = useState([]);
  const [value, onChange] = useState(new Date());

  const [userData , setUserData] = useState({});


  const [formdata , setFormdata] = useState({
    Employee:"Select Employee",
    id:"" ,
    date:""

})

const fetchEmp = async()=>{
    const ans = await allEmployee();
    setAllEmp(ans?.emp);
}

const handleCalendar = (e) => {
    let date = new Date(e).toLocaleDateString('en-GB');
    setFormdata((prev)=>({
        ...prev ,
        date: date
    }))
  };

const changeHandler = (e)=>{
    const {name , value} = e.target;
    setFormdata((prev)=>({
        ...prev ,
        [name]:value
    }))

    const filterData = allEmp.filter((user)=>user.fullName === value);

    setFormdata((prev)=>({
        ...prev ,
        id: filterData[0]?._id
    }))

}

const submitHandler = async()=>{
     if(formdata.Employee == "Select Employee"){
        return toast.error("Please select the Employee");
     }

      const ans = await getAttendence({...formdata });
      setUserData(ans?.data);

}

useEffect(()=>{
    fetchEmp();
    const currentDate = new Date();
    let date = new Date(currentDate).toLocaleDateString('en-GB');
 setFormdata((prev)=>({
    ...prev ,
    date:date
 }))
},[])


  return (
    <>
   
      <div className="employee-dash h-full bg-[#f5f5f5]">
        
        <div className="w-full bg-[#f5f5f5]">
          
          <div className="pt-7.5 pr-5 pb-2.5 pl-8 relative w-full">
            <div className="flex flex-col gap-6">
              {/* first  */}
              <div className="flex flex-col gap-2 w-full mx-auto">

              <label htmlFor="Employee" className="block text-md font-normal mb-1">
                                    <p className="text-[#1B2533] text-[18px] font-semibold leading-[20px] tracking-[0.0025em] mt-5">Employee</p>
                                    <select onChange={changeHandler} name="Employee" id="Employee" value={formdata?.Employee}
                                     className="w-full border rounded p-2 text-sm font-normal text-gray-500 mt-2">
                                        <option>Select Employee</option>
                                        {
                                            allEmp?.map((val, index) => {
                                                return <option key={index} value={val?.fullName}>{val?.fullName}</option>
                                            })
                                        }
                                    </select>
                                </label>

                                <div className="bg-white rounded-[10px] py-6 calend1">
                    <div className="flex items-center justify-between px-7.5">
                   
                    </div>

                    <Calendar onChange={handleCalendar} value={value}/>

                  </div>

                  <button onClick={submitHandler} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>

       
              </div>

              {/* second  */}
              <div style={{gap:"20px"}} className="flex flex-col lg:flex-row items-center">


                {/*clock in  */}
<a href="#" class=" h-[100px] flex flex-col items-center max-w-[300px] pt-5 w-full  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Clock In</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">{userData?.clockIn ? userData?.clockIn : "none"}</p>
</a>

{/* break  */}

<a href="#" class=" h-[100px] flex flex-col items-center max-w-[300px] w-full pt-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Break</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">{userData?.breakTime ? userData?.breakTime : "none"}</p>
</a>


{/* clock out  */}

<a href="#" class=" h-[100px] flex flex-col  items-center max-w-[300px] w-full pt-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Clock Out</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">{userData?.clockOut ? userData?.clockOut : "none"}</p>
</a>



              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeAttendence;
