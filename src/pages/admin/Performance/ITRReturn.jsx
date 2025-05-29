import React from "react";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/UseMain";


const ITRReturn = () => {
  const { user } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  const { role } = hrms_user;

  

  return (
    <>
      <div className="employee-dash h-full">
       

        <div className="w-full ">
         

          <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full">
            <div className="flex flex-col gap-[10px] items-center
">
              <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px]
">START YOUR INCOME TAX RETURN FILING  </h2>

               <div className="bg-white rounded-[10px] p-[20px] grid grid-cols-2 gap-[20px] items-center w-[1000px] h-[300px]">

                 <label className="label max-w-[400px] w-full flex flex-col gap-[5px]" >
                    <p className="text-[15px] font-medium leading-[16px] text-left">Financial Year *</p>
                      <input type="date" className="w-[295px] h-[48px] px-[16px] py-[8px] rounded-[10px] bg-white border border-[#D0D4DC]"/>
                 </label>

                 <label  className="label max-w-[400px] w-full flex flex-col gap-[5px]" >
                    <p className="text-[15px] font-medium leading-[16px] text-left">PAN Number</p>
                      <input type="text"  className="w-[295px] h-[48px] px-[16px] py-[8px] rounded-[10px] bg-white border border-[#D0D4DC]"/>
                 </label>

                 <label  className="label max-w-[400px] w-full flex flex-col gap-[5px]" >
                    <p className="text-[15px] font-medium leading-[16px] text-left">Date of Birth *</p>
                      <input type="date" className="w-[295px] h-[48px] px-[16px] py-[8px] rounded-[10px] bg-white border border-[#D0D4DC]
" />
                 </label>

                 <div className="flex items-center gap-[10px]">
                    <span className="text-[14px] font-semibold leading-[24px] tracking-[0.0015em] text-[#1B2533] text-center">Do you want to pre-fill data?</span>
                    <label className="radiolabel">
                          <input
                            type="radio"
                            value="yes"
                            name="prefill"
                          />
                          <span> Yes</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="no"
                            name="prefill"
                          />
                          <span> No</span>
                        </label>
                 </div>

               </div>

              <div className="">
                <button className="w-[143px] h-[40px] rounded-[10px] bg-[#0B56E4]"><span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-white
">CONTINUE</span></button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};
export default ITRReturn;
