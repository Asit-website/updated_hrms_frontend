import React, { useState } from "react";

import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/UseMain";



const item = [
  {
    title: "Full-time Employees",
  },
  {
    title: "Part-time Employees",
  },
  {
    title: "Trainee Employees",
  },
];

const AddEmployee = () => {
  const { user } = useMain();

  const [currEmp, setCurrEmp] = useState(0);

  const [formdata , setFormdata] = useState({
    employeeId:"" ,
    firstName:"",
    lastName:"" ,
    dateOfJoin:"",
    mobile:"" , 
    personalEmail:"",
    password:"",
    email:"",
    gender:""
  })


  const changeHandler = async(e)=>{
    const {name , value} = e.target;

     setFormdata((prev)=>({
        ...prev ,
        [name]:value
     }))
  }

  return (
    <>
      <div className="employee-dash h-full">
       

        <div className="w-full bg-[#f5f5f5]">
        

          <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full">
            {/* first  */}
            <section className="flex items-center justify-between">
              {/* left side  */}
              <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px] text-left">Add Employee</h2>

              {/* right side  */}
              <div className="flex gap-[16px] items-center">
                <button className="w-[102px] h-[40px] flex items-center justify-center gap-[10px] rounded-[10px] border border-[#0B56E4] bg-gradient-to-br from-[#D1E8FD] via-[#D1E8FD] to-[#EDEFFF]">
                  <span className="text-[#0B56E4] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Cancel</span>
                </button>
                <button className="w-[132px] h-[40px] flex items-center justify-center gap-[10px] rounded-[10px] bg-[#0B56E4] text-white">
                  <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Register New</span>
                </button>
              </div>
            </section>

            {/* /main section  */}
            <main className="w-full mt-[20px] p-[20px] flex flex-col gap-[20px]">
              {/* first sec */}

              <div className="flex items-center gap-6 border border-[#E8E9EB] rounded-[12px] mt-[40px] bg-white p-[12px]">
                {item.map((e, index) => (
                  <div
                    onClick={() => setCurrEmp(index)}
                    className="flex items-center gap-[8px] cursor-pointer "
                    key={index}
                  >
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748431794/bx-user-pin_w3ekjo.png" alt="" />

                    <p className={`${currEmp == index ? "text-[14px] font-normal leading-[24px] text-left text-[#0B56E4]" : "text-[14px] font-normal leading-[24px] text-left text-[#0F141C]"}`}>
                      {e.title}
                    </p>
                  </div>
                ))}
              </div>

                     {/* four forms   */}
              <div className="flex flex-col gap-4">

{/* first row form  */}

 <div className="flex items-center gap-6">

   {/* first form  */}
   <div className="bg-white w-[572px] border border-[#E8E9EB] p-6 rounded-[18px] flex flex-col gap-[5px]">

    <h2 className="text-[#101820] text-[16px] font-bold leading-[24px] tracking-[0.0015em] text-left">Personal Detail</h2>

    <label htmlFor="" className="fullLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">EMPLOYEE ID**</p>
        <input type="text" value={formdata.employeeId} name="employeeId"  onChange={changeHandler}  className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>

     <div className="flex items-center gap-8 w-full">

     <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">First Name*</p>
        <input type="text" value={formdata.firstName} name="firstName"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>

     <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Last Name*</p>
        <input type="text" value={formdata.lastName} name="lastName"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>
    
     </div>

     <div className="flex items-center gap-8 w-full">

<label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Date of Joining*</p>
        <input type="text" value={formdata.dateOfJoin} name="dateOfJoin"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>

     <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Mobile*</p>
        <input type="text" value={formdata.mobile} name="mobile"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>


    
     </div>

     <div className="flex items-center gap-8 w-full">

     <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Personal Email ID*</p>
        <input type="text" value={formdata.personalEmail} name="personalEmail"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>

  <div className="flex items-center justify-center gap-[42px]">

     <label htmlFor="" className="checkLabel flex items-center gap-[6px]">
        <input type="checkbox" name="gender" value={formdata.gender} onChange={changeHandler} />

        <span>Male</span>
        
     </label>

     <label htmlFor="" className="checkLabe flex items-center gap-[6px]">
        <input type="checkbox" onChange={changeHandler} value={formdata.gender} name="gender" />
        <span>Female</span>
     </label>

  </div>

     </div>

     <div className="flex items-center gap-8 w-full">

     <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Password*</p>
        <input type="text" value={formdata.password} name="password"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>

     <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Email*</p>
        <input type="email" value={formdata.email} name="email"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>


    
     </div>

   </div>

     {/* second form  */}
     <div className="bg-white w-[572px] h-[545px] border border-[#E8E9EB] p-6 rounded-[18px] flex flex-col gap-2">

<h2 className="text-[#101820] text-[16px] font-bold leading-[24px] tracking-[0.0015em] text-left">Address Detail</h2>

<label htmlFor="" className="fullLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">EMPLOYEE ID**</p>
    <input type="text" value={formdata.employeeId} name="employeeId"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
</label>

 <div className="flex items-center gap-8 w-full">

 <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">First Name*</p>
    <input type="text" value={formdata.firstName} name="firstName"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
</label>

 <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Last Name*</p>
    <input type="text" value={formdata.lastName} name="lastName"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
</label>

 </div>

 <div className="flex items-center gap-8 w-full">

 <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Date of Joining*</p>
    <input type="text" value={formdata.dateOfJoin} name="dateOfJoin"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
</label>

 <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Mobile*</p>
    <input type="text" value={formdata.mobile} name="mobile"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
</label>



 </div>

 <div className="flex items-center gap-8 w-full">

 <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Personal Email ID*</p>
    <input type="text" value={formdata.personalEmail} name="personalEmail"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
</label>

<div className="flex items-center justify-center gap-[42px]">

 <label htmlFor="" className="checkLabel flex gap-[12px]">
    <input type="checkbox" name="gender" value={formdata.gender} onChange={changeHandler} />

    <span>Male</span>
    
 </label>

 <label htmlFor="" className="checkLabel flex items-center gap-[6px]">
    <input type="checkbox" onChange={changeHandler} value={formdata.gender} name="gender"/>
    <span>Female</span>
 </label>

</div>

 </div>

 <div className="flex items-center gap-8 w-full">

 <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Password*</p>
    <input type="text" value={formdata.password} name="password"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
</label>

 <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Email*</p>
    <input type="email" value={formdata.email} name="email"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700" />
</label>



 </div>

</div>

 </div>

{/* second row form  */}

 <div className="flex items-center gap-6">

   {/* first form  */}
   <div className="bg-white w-[572px] border  h-[545px] border-[#E8E9EB] p-6 rounded-[18px] flex flex-col gap-2">

    <h2 className="text-[#101820] text-[16px] font-bold leading-[24px] tracking-[0.0015em] text-left">Personal Detail</h2>

    <label htmlFor="" className="fullLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">EMPLOYEE ID**</p>
        <input type="text" value={formdata.employeeId} name="employeeId"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>

     <div className="flex items-center gap-8 w-full">

     <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">First Name*</p>
        <input type="text" value={formdata.firstName} name="firstName"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>

     <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Last Name*</p>
        <input type="text" value={formdata.lastName} name="lastName"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>
    
     </div>

     <div className="flex items-center gap-8 w-full">

     <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Date of Joining*</p>
        <input type="text" value={formdata.dateOfJoin} name="dateOfJoin"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700" />
    </label>

     <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Mobile*</p>
        <input type="text" value={formdata.mobile} name="mobile"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>


    
     </div>

     <div className="flex items-center gap-8 w-full">

     <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Personal Email ID*</p>
        <input type="text" value={formdata.personalEmail} name="personalEmail"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>

  <div className="flex items-center justify-center gap-[42px]">

     <label htmlFor="" className="checkLabel flex gap-[12px] mt-[20px]">
        <input type="checkbox" name="gender" value={formdata.gender} onChange={changeHandler} />

        <span>Male</span>
        
     </label>

     <label htmlFor="" className="checkLabel flex  gap-[12px] mt-[20px]">
        <input type="checkbox" onChange={changeHandler} value={formdata.gender} name="gender" />
        <span>Female</span>
     </label>

  </div>

     </div>

     <div className="flex items-center gap-8 w-full">

     <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Password*</p>
        <input type="text" value={formdata.password} name="password"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>

     <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
        <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Email*</p>
        <input type="email" value={formdata.email} name="email"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
    </label>


    
     </div>

   </div>

     {/* second form  */}
     <div className="bg-white w-[572px] border  h-[545px] border-[#E8E9EB] p-6 rounded-[18px] flex flex-col gap-2">

<h2 className="text-[#101820] text-[16px] font-bold leading-[24px] tracking-[0.0015em] text-left">Address Detail</h2>

<label htmlFor="" className="fullLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">EMPLOYEE ID**</p>
    <input type="text" value={formdata.employeeId} name="employeeId"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700" />
</label>

 <div className="flex items-center gap-8 w-full">

 <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">First Name*</p>
    <input type="text" value={formdata.firstName} name="firstName"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
</label>

 <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Last Name*</p>
    <input type="text" value={formdata.lastName} name="lastName"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
</label>

 </div>

 <div className="flex items-center gap-8 w-full">

 <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Date of Joining*</p>
    <input type="text" value={formdata.dateOfJoin} name="dateOfJoin"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
</label>

 <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Mobile*</p>
    <input type="text" value={formdata.mobile} name="mobile"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
</label>



 </div>

 <div className="flex items-center gap-8 w-full">

 <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Personal Email ID*</p>
    <input type="text" value={formdata.personalEmail} name="personalEmail"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
</label>

<div className="flex items-center justify-center gap-[42px]">

 <label htmlFor="" className="checkLabel flex gap-[12px] mt-[20px]">
    <input type="checkbox" name="gender" value={formdata.gender} onChange={changeHandler}/>

    <span>Male</span>
    
 </label>

 <label htmlFor="" className="checkLabel flex gap-[12px] mt-[20px]">
    <input type="checkbox" onChange={changeHandler} value={formdata.gender} name="gender" />
    <span>Female</span>
 </label>

</div>

 </div>

 <div className="flex items-center gap-8 w-full">

 <label htmlFor="" className="halfLabe flex flex-col gap-[12px] mt-[20px]l">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Password*</p>
    <input type="text" value={formdata.password} name="password"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
</label>

 <label htmlFor="" className="halfLabel flex flex-col gap-[12px] mt-[20px]">
    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Email*</p>
    <input type="email" value={formdata.email} name="email"  onChange={changeHandler} className="border border-black h-[38px] rounded-[5px] px-[20px] text-gray-700"/>
</label>



 </div>

</div>

 </div>

              </div>

            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
