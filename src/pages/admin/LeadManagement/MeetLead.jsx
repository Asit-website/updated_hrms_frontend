import React from "react";
import "react-calendar/dist/Calendar.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { NavLink, useLocation } from "react-router-dom";
import { useMain } from "../../../hooks/UseMain";
const MeetLead = () => {
  const {  user } = useMain();

  const location = useLocation();

  const { state } = location;

  console.log("staete ", state);

  const user1 = JSON.parse(localStorage.getItem("hrms_user"));



  return (
    <div className="imprtleadCont">
      <div className="employee-dash h-full">
        
        <div className="w-full ">
          


          <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full">

            {/* first  */}

            <section className="flex items-center justify-between pr-[5px] flex-col md:flex-row">
              {/* /left side  */}
              <div className="flex items-center gap-[10px]">
                <div className="lTITL">
                  <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px] text-left">Webinar</h2>
                </div>
              </div>

              {/* right side  */}
              <div className="flex items-center gap-[16px] mt-2 md:mt-0">
                <NavLink to={`${user1?.designation === "CEO" || user1?.designation === "Manager" ? "/adminDash/leadDash" : "/employeeDash/leadDash"}`}><button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className=" border border-[#B8BBC0] bg-[#E8E9EB] text-[#6C737F] rounded-[5px] font-inter font-medium h-[40px] text-[16px]  px-5 py-2.5 text-center inline-flex items-center"
                  type="button"
                >
                  Back
                </button></NavLink>

                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-[24px] leading-[24px] tracking-[0.005em] h-[40px] w-[144px]"
                >
                  Close Meeting
                </button>
              </div>
            </section>

            {/* second sect */}

            {/* third secttion  */}
            <div className="flex flex-col gap-4">

              {/* first ka first  part  */}
              <div className="flex flex-col gap-6 mt-[20px] bg-white py-[20px] px-[30px]">


                <div className="w-1/2 flex flex-col gap-[20px]">


                  <div className="flex gap-[20px] items-center">
                    <h3 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-right">Date :</h3>
                    <p className="text-[#1B2533] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">{state?.meetDateFrom}</p>
                  </div>

                  <div className="flex gap-[20px] items-center">
                    <h3 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-right">Time :</h3>
                    <p className="text-[#1B2533] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">{state?.meetTimeFrom} - {state?.meetTimeTo}</p>
                  </div>

                  <div className="flex gap-[20px] items-center">
                    <h3 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-right">Status :</h3>
                    <p className="text-[#1B2533] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">{state?.Status}</p>
                  </div>

                  <div className="flex gap-[20px] items-center">
                    <h3 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-right">Related To :</h3>
                    <p className="text-[#1B2533] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">{state?.RelatedTo}</p>
                  </div>

                  <div className="flex gap-[20px] items-center">
                    <h3 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-right">Host :</h3>
                    <p className="text-[#1B2533] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">{state?.Host}</p>
                  </div>

                </div>


              </div>

              {/* first second part  */}
              <div className="flex flex-col gap-6 mt-[20px] bg-white py-[20px] px-[30px]">

                <div className="flex items-center justify-between">
                  <h2 className="text-[#101820] text-[16px] font-bold leading-[24px] tracking-[0.0015em] text-left">Participants</h2>

                  <button className="w-[103px] h-[40px] rounded-[10px] border border-[#0B56E4] bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)]"><span className="text-[#0B56E4] text-[16px] font-medium leading-[24px] tracking-[0.005em]">Add New</span></button>
                </div>

                <hr />

                <div className="flex justify-between">
                  <p className="text-[12px] font-medium leading-[16px] text-left">No records found</p>
                </div>

              </div>

              {/* third third  */}
              <div className="flex flex-col gap-6 mt-[20px] bg-white py-[20px] px-[30px]">

                <div className="flex flex-col w-full gap-6">
                  <h2 className="text-[#101820] text-[16px] font-bold leading-[24px] tracking-[0.0015em] text-left">Note</h2>

                </div>

                <hr />

                <div className="flex flex-col gap-4">

                  <textarea name="" id="" placeholder="Add a note..." className="h-[76px] px-4 py-2 rounded-[10px] bg-white border border-[#D0D4DC] resize-none text-[#969BA1] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left"> </textarea>

                  <div className="flex items-center justify-end gap-4 max-w-[709px] w-full">

                    <button className="w-[86px] h-[40px] rounded-[10px] border border-[#B8BBC0]"><span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-[#666D76]">Cancel</span></button>
                    <button className="w-[70px] h-[40px] rounded-[10px] bg-[#0B56E4]"><span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-white">Save</span></button>

                  </div>
                </div>

              </div>

              {/* fourth  */}
              <div className="flex flex-col gap-6 mt-[20px] bg-white py-[20px] px-[30px]">

                <div className="flex items-center justify-between">
                  <h2 className="text-[#101820] text-[16px] font-bold leading-[24px] tracking-[0.0015em] text-left">Attachment</h2>
                  <div className="flex items-center justify-evenly border border-[#0B56E4] w-[147px] rounded-[8px] h-[40px] bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)]">
                    <p className="text-[16px] font-medium text-[#0B56E4]">Upload File</p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 19V15H16L12 10L8 15H11V19H13Z"
                        fill="#0B56E4"
                      />
                      <path
                        d="M7 19H9V17H7C5.346 17 4 15.654 4 14C4 12.596 5.199 11.244 6.673 10.985L7.254 10.883L7.446 10.325C8.149 8.274 9.895 7 12 7C14.757 7 17 9.243 17 12V13H18C19.103 13 20 13.897 20 15C20 16.103 19.103 17 18 17H15V19H18C20.206 19 22 17.206 22 15C21.9985 14.1036 21.6966 13.2336 21.1427 12.5288C20.5888 11.8241 19.8147 11.3253 18.944 11.112C18.507 7.67 15.56 5 12 5C9.244 5 6.85 6.611 5.757 9.15C3.609 9.792 2 11.82 2 14C2 16.757 4.243 19 7 19Z"
                        fill="#0B56E4"
                      />
                    </svg>
                  </div>
                </div>

                <hr />

                <div className="flex justify-start">
                  <p className="text-center text-[#1B2533] text-[14px] ">No Attachment</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default MeetLead;
