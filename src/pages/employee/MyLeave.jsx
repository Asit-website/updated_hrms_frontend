import React from "react";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useMain } from "../../hooks/UseMain";


const MyLeaves = () => {

  const [star1] = useState(false);


  const styleThing = {
    display: star1 ? "block" : "none",
  };

  const { FetchMyLeave } = useMain();


  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));

  const { role } = hrms_user;
  const { leaveReqestEditPermission } = hrms_permission;


  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return formattedDate;
  };

  const [data, setData] = useState([]);

  const getData = async () => {
    let ans = await FetchMyLeave();
    console.log("my leaves data ", ans);
    const fullDayLeaves = ans?.data?.fullDayLeaves.map(leave => ({ ...leave, isHalfDay: false })) || [];
    const halfDayLeaves = ans?.data?.halfDayLeaves.map(leave => ({ ...leave, isHalfDay: true })) || [];
    const combinedLeaves = [...fullDayLeaves, ...halfDayLeaves];
    const sortedLeaves = combinedLeaves.sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn));


    setData(sortedLeaves);
  };

  useEffect(() => {
    getData();
  }, []);

  const [showPlay, setShowPlay] = useState(-1);

  const [leavePopup, setLeavePopup] = useState(false);

  return (
    <>
      <div className="employee-dash h-full">
      
        <div className="w-full ">
        

          <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full
">
            <div className="flex-col">
              {/* first  */}

              <div className="hrmDasTxtFir">
                <p className="text-2xl font-semibold">My Leaves</p>
                     </div>

          <main className="pt-[20px] px-0 pb-[30px]">
                <div className="relative w-full overflow-x-auto rounded-lg">
                  <table className="min-w-full text-sm text-left bg-white rounded-lg">

                    <thead className="bg-white font-semibold">
                      <tr className="gfg">

                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap ">
                          LEAVE TYPES
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          APPLIED ON
                        </th>

                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          START DATE
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          END DATE
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          TOTAL DAYS
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          LEAVE REASON
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          STATUS
                        </th>

                      </tr>
                    </thead>
                    
                    <tbody>
                      {data?.map((e, index) => {
                        return (
                          <tr onClick={() => setLeavePopup(e)} key={index} className="bg-white trtextalltr cursor-pointer gfg border-b">
                           
                            <td className="px-4 py-3"> {e?.isHalfDay ? "Half Day" : e?.leaveType || "Full Day"}</td>
                            <td className="px-4 py-3">{formatDate(e?.appliedOn)}</td>
                            <td className="px-4 py-3">{e?.from}</td>
                            <td className="px-4 py-3">{e?.to}</td>
                            <td className="px-4 py-3">
                              {e?.isHalfDay ? 0.5 : (Number(e?.days) || 1)}
                            </td>
                            <td className="px-4 py-3">{e?.reason?.slice(0, 34)}...</td>
                            <td className="px-4 py-3">
                              <div className="ACTIVITYsss">{e?.status === "" ? "Pending" : e?.status}</div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>

                  </table>
                </div>
              </main>

            </div>
          </div>


          {
            leavePopup &&
            <div className="leavePopupwrap2">
              <div className="leavepopconta2">

                <nav><RxCross2 fontSize={24} className="cursor-pointer" onClick={() => setLeavePopup(false)} /></nav>

                <label htmlFor="" className="w-[45%] flex flex-col gap-2">
                  <h4>FullName: </h4>
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left">{leavePopup?.user?.fullName}</p>
                </label>


                <label htmlFor="" className="w-[45%] flex flex-col gap-2">
                  <h4>From: </h4>
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left">{leavePopup?.from}</p>
                </label>
                <label htmlFor="" className="w-[45%] flex flex-col gap-2">
                  <h4>To: </h4>
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left">{leavePopup?.to}</p>
                </label>

                <label htmlFor="" className="w-[45%] flex flex-col gap-2">
                  <h4>Reason: </h4>
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left">{leavePopup?.reason}</p>
                </label>


              </div>
            </div>
          }


        </div>
      </div>
    </>
  );
};

export default MyLeaves;
