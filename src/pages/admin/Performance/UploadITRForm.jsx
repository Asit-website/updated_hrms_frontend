import React from "react";
import "react-calendar/dist/Calendar.css";


import { useNavigate } from "react-router-dom";
import { useMain } from "../../../hooks/UseMain";

const UploadITRForm = () => {
  const { user } = useMain();
  const navigate = useNavigate();


  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  const { role } = hrms_user;

  

  return (
    <>
      <div className="employee-dash  h-full">
       

        <div className="w-full ">
          
          <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full
">
            <div className="flex flex-col gap-[10px] items-center
">
              <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px]
">UPLOAD FORM 16 </h2>

               <div className="bg-white rounded-[10px] p-[20px] flex flex-col gap-[20px] w-[1000px] h-[300px]">

                <div className="border border-[#B7DFD5] bg-[#DEF2EB] p-[10px] rounded-[10px]
">
                    <p className="text-[14px] font-semibold leading-[24px] tracking-[0.0015em] text-[#1B2533] text-center
">Income Tax Return Filing is easy with Tax2win and the smartest way to online file your taxes return is to just upload your form 16 and get your ITR prepared automatically.
                    </p>
                </div>

                <div className="flex items-center w-full gap-[20px] justify-center
">
                    <button onClick={()=>navigate("/adminDash/HRM/ITRReturn")} className="bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)] border border-[#0B56E4] w-[230px] h-[40px] rounded-[10px] text-[#0B56E4]  text-[14px] font-medium leading-[24px] tracking-[0.005em]
">CONTINUE  WITHOUT FORM 16</button>
                    <span className="text-[22px] font-bold leading-[58.09px] tracking-[0.004em] text-[#0B56E4]
">OR</span>
                    <button className="bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)] border border-[#0B56E4] w-[230px] h-[40px] rounded-[10px] text-[#0B56E4] text-[14px] font-medium leading-[24px] tracking-[0.005em]">UPLOAD FORM 16</button>
                </div>

               </div>


            </div>

          </div>
        </div>
      </div>
    </>
  );
};
export default UploadITRForm;
