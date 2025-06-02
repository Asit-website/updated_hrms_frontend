import React from "react";
import { useEffect, useRef, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import { CiPlay1 } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { NavLink, useLocation } from "react-router-dom";
import { useMain } from "../../../hooks/UseMain";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useAuth } from "../../../Context/AuthContext";

const LeaveRequest = () => {
  const [star1, setStar1] = useState(false);

  const styleThing = {
    display: star1 ? "flex" : "none",
  };

  const {
    getUserLeaves,
    updateLeave,
    acceptLeave,
    rejectLeave,
    postNotifyLeavereq,
  } = useMain();

  const { user } = useAuth();

  const [data, setData] = useState([]);
  const location = useLocation();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));

  const { role } = hrms_user;
  const { leaveReqestEditPermission } = hrms_permission;

  const [accept, setAccept] = useState("reject", user);

  const getData = async () => {
    let ans = await getUserLeaves();
    const reverseArray = ans?.data?.reverse();
    setData(reverseArray);
  };

  useEffect(() => {
    getData();
  }, []);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };

  const [formdata, setFormdata] = useState({
    employeeName: "",
    leaveType: "",
    start: "",
    end: "",
    reason: "",
    id: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showPlay, setShowPlay] = useState(-1);

  const [leavePopup, setLeavePopup] = useState(false);

  const submitHandler = async () => {
    const toastId = toast.loading("Loading...");
    const startDate = new Date(formdata.start);
    const endDate = new Date(formdata.end);
    const timeDifference = Math.abs(endDate - startDate);
    const daysGap = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const ans = await updateLeave({
      employeeName: formdata.employeeName,
      id: formdata.id,
      type: formdata.leaveType,
      from: formdata.start,
      to: formdata.end,
      days: daysGap,
      reason: formdata.reason,
    });

    if (ans.success) {
      toast.success("Successfuly updated");
      setStar1(false);
      getData();
    }

    toast.dismiss(toastId);
  };
  const acceptHandler = async (form) => {
    const toastId = toast.loading("Loading...");
    const { user, _id, from, to } = form;
    const userId = form?.user?._id;
    const userName = user.fullName;

    try {
      const ans = await acceptLeave(form, _id, userId, from, to);
      const notify = await postNotifyLeavereq(userName, "Accepted");

      if (ans?.status) {
        toast.success("Successfully Accepted the leave");
        setShowPlay(-1); // Reset the dropdown visibility
        getData();
        if (userName) {
          setAccept((prev) => !prev);
        }
      }
    } catch (error) {
      console.error("Error accepting leave:", error);
      toast.error("Failed to accept the leave");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const rejectHandler = async (form) => {
    const toastId = toast.loading("Loading...");
    const { user, _id } = form;
    const userName = user.fullName;

    try {
      const ans = await rejectLeave(form, _id);
      const notify = await postNotifyLeavereq(userName, "Rejected");

      if (ans?.status) {
        toast.success("Successfully Rejected the leave");
        setShowPlay(-1); // Reset the dropdown visibility
        getData();
        if (userName) {
          setAccept((prev) => !prev);
        }
      }
    } catch (error) {
      console.error("Error rejecting leave:", error);
      toast.error("Failed to reject the leave");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const [currView, setCurrView] = useState(-1);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const leavesPerPage = 7;
  const filteredLeaves = data?.filter((emp) => {
    const searchWords = searchInput.toLowerCase().trim().split(/\s+/);
    const name = emp.user?.fullName.toLowerCase();
    return searchWords.every((word) => name?.includes(word));
  });

  const totalPages = Math.ceil(filteredLeaves?.length / leavesPerPage);
  const paginatedProjects = filteredLeaves?.slice(
    (currentPage - 1) * leavesPerPage,
    currentPage * leavesPerPage
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput]);

 const wrapperRef = useClickOutside(() => {
    setShowPlay(-1)
  });
 const leaveActionPop = useClickOutside(() => {
     setCurrView(-1);
  });
  const desRef = useClickOutside( () => {
    setLeavePopup(false);

  })
  const formRef = useClickOutside(() => {
    setStar1(false);
  });

  return (
    <>
      <div className="employee-dash h-full">
        <div className="w-full ">
          <div className="pt-[32px] pr-[20px] pb-[32px] pl-[20px] relative w-full">
            <div className="flex-col">
              {/* first  */}
              <div className="text-[20px] font-normal leading-[24px] tracking-normal text-left text-[#060606]">
                {location.state ? (<div className="hrDsPa">
                  <NavLink to={`/adminDash/HRM`}>
                    <span className="hover:text-[#1567FF] cursor-pointer text-xl">Dashboard</span>
                  </NavLink>
                  <span>
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747467924/chevron_right_wyiame.png" alt="" />
                  </span>{" "}
                  <span className="text-[#1567FF] cursor-pointer">Leave Request</span>
                </div>) : (<div>
                  <p className="text-[20px] font-normal leading-[24px] tracking-normal text-left text-[#060606]">Leave Requests</p>
                </div>
                )}

              </div>
              <main className="pt-[10px] pr-0 pb-[30px] pl-0">
                <input className="border border-[#D0D4DC] w-[200px] px-[10px] h-[38px] rounded-[10px]" onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput} placeholder="Search Employee" />

                {/* second  */}

                <div className="w-full overflow-x-auto  md:overflow-x-scroll md:overflow-y-auto bg-[white] mt-10 bg-grey rounded-xl border-2 ">
                  <table className="min-w-full text-gray-700">
                    <thead className="bg-white border-b text-gray-700 uppercase text-[13px] leading-normal">
                      <tr>
                        <th scope="col" className="py-3 px-6 min-w-36 md:min-w-max text-left w-full md:w-auto bg-white">
                          EMPLOYEE
                        </th>
                        <th scope="col" className="py-3 px-6 min-w-36 md:min-w-max text-left w-full md:w-auto bg-white">
                          LEAVE TYPES
                        </th>
                        <th scope="col" className="py-3 px-6 min-w-36 md:min-w-max text-left w-full md:w-auto bg-white">
                          APPLIED ON
                        </th>

                        <th scope="col" className="py-3 px-6 min-w-36 md:min-w-max text-left w-full md:w-auto bg-white">
                          START DATE
                        </th>
                        <th scope="col" className="py-3 px-6 min-w-36 md:min-w-max text-left w-full md:w-auto bg-white">
                          END DATE
                        </th>
                        <th scope="col" className="py-3 px-6 min-w-36 md:min-w-max text-left w-full md:w-auto bg-white">
                          TOTAL DAYS
                        </th>
                        <th scope="col" className="py-3 px-6 min-w-36 md:min-w-max text-left w-full md:w-auto bg-white">
                          LEAVE REASON
                        </th>
                        <th scope="col" className="py-3 px-6 min-w-36 md:min-w-max text-left w-full md:w-auto bg-white">
                          STATUS
                        </th>
                        <th scope="col" className="py-3 px-6 min-w-36 text-center w-full md:w-auto bg-white">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-gray-700 text-[12px]">
                      {paginatedProjects?.map((e, index) => {
                        return (
                          <tr

                            key={index}
                            className="border-b hover:bg-gray-50 transition-all"
                          >
                            <td className="py-4 px-6 text-blue-500" onClick={() => setLeavePopup(e)}> {e?.user?.fullName}</td>
                            <td className="py-4 px-6">{e?.leaveType}</td>
                            <td className="py-4 px-6">
                              {formatDate(e?.appliedOn)}
                            </td>
                            <td className="py-4 px-6"> {e?.from}</td>
                            <td className="py-4 px-6"> {e?.to} </td>
                            <td className="py-4 px-6"> {e?.days} </td>

                            <td className="py-4 px-6">
                              {e?.reason?.slice(0, 34)}...
                            </td>

                            <td className="py-4 px-6">
                              <div className="ACTIVITYsss">
                                {e?.status === "" ? "Pending" : e?.status}
                              </div>
                            </td>


                            <div className="relative">
                              <td
                                onClick={() => {
                                  setCurrView(currView === index ? -1 : index);
                                  setShowPlay(-1);
                                }}
                                className="px-3 py-3 flex items-center justify-center hiii_gap cursor-pointer"
                              >
                                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747469952/actions_afomli.png" alt="" />
                              </td>

                              {index === currView && (
                                <div ref={leaveActionPop} className=" absolute right-[60px] top-[-5px] -mt-8 mr-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-[999] ">

                                  {(leaveReqestEditPermission || role === "ADMIN") && (
                                    <>
                                      <div
                                        className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                          setShowPlay(showPlay === index ? -1 : index);
                                          setCurrView(-1);

                                        }}
                                      >
                                        <CiPlay1 className="h-5 w-5 text-black font-bold" />
                                        <p>Update</p>
                                      </div>

                                      <hr />

                                      <div
                                        className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                          setFormdata((prev) => ({
                                            ...prev,
                                            reason: e.reason,
                                            leaveType: e.leaveType,
                                            employeeName: e?.user?.fullName,
                                            start: e.from,
                                            end: e.to,
                                            id: e._id,
                                          }));
                                          setStar1((prev) => !prev);
                                        }}
                                      >
                                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747470053/edit22_n1cyzn.png" alt="" />
                                        <p>Edit</p>
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>

                            <div style={{ position: "relative", bottom: "7px" }} >

                              {showPlay === index && (
                                <div ref={wrapperRef} className="absolute top-full right-[-5px] p-[6px_8px] rounded-lg flex flex-row gap-[5px] z-[1000]">
                                  <span
                                    onClick={() => acceptHandler(e)}
                                    className="bg-green-500 text-white px-3 py-[6px] rounded cursor-pointer whitespace-nowrap">
                                    Accept
                                  </span>
                                  <hr />
                                  <span
                                    onClick={() => rejectHandler(e)}
                                    className="bg-red-500 text-white px-3 py-[6px] rounded-[6px] cursor-pointer whitespace-nowrap">
                                    Reject
                                  </span>
                                </div>
                              )}
                            </div>
                         </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </main>
            </div>
            {totalPages > 1 && (
              <div className="navbuttons flex justify-center items-center mt-4">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                >
                  Prev
                </button>
                <span className="px-4"> {currentPage}</span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {leavePopup && (
            <div className="leavePopupwrap2" >
              <div className="leavepopconta2" ref={desRef}>
                <nav>
                  <RxCross2
                    fontSize={24}
                    className="cursor-pointer"
                    onClick={() => setLeavePopup(false)}
                  />
                </nav>

                <label htmlFor="">
                  <h4>FullName: </h4>
                  <p>{leavePopup?.user?.fullName}</p>
                </label>

                <label htmlFor="">
                  <h4>From: </h4>
                  <p>{leavePopup?.from}</p>
                </label>
                <label htmlFor="">
                  <h4>To: </h4>
                  <p>{leavePopup?.to}</p>
                </label>

                <label htmlFor="">
                  <h4>Reason: </h4>
                  <p>{leavePopup?.reason}</p>
                </label>
              </div>
            </div>
          )}

          {/* this is edit form of leave rqeuest  */}

          <div
            style={styleThing}
            className="fixed z-[3000] inset-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center h-screen"
          >
            <div className="relative w-full mt-8 custom-scroll-hidden overflow-auto max-w-2xl p-4 bg-white rounded-2xl shadow-lg space-y-6" ref={formRef}>
              {/* <!-- Modal content --> */}
              <div className="">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between py-2 px-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Edit Leave Request</h3>

                </div>
                {/* <!-- Modal body --> */}
                <div className="p-4">
                  <form className="space-y-4 fkl" action="#" >
        
                    <div className="grid grid-cols-2 gap-3">
                      <div className="mt-2 user_class_input">
                      <label className="block text-md font-normal mb-1">Employee Name</label>

                      <input
                        value={formdata.employeeName}
                        className="border rounded p-2 text-sm font-normal  w-full"
                        onChange={changeHandler}
                        type="text"
                        name="employeeName"
                        id="text"

                        placeholder="Enter the name"
                        required
                      />
                    </div>

                    <div className="mt-2 user_class_input">
                      <label className="block text-md font-normal mb-1">Leave type</label>
                      <input
                        value={formdata.leaveType}
                        onChange={changeHandler}
                        type="text"
                        name="leaveType"
                        id="text"
                        placeholder="Enter your leave type"
                        className="border rounded p-2 text-sm font-normal  w-full"
                        required
                      />
                    </div>

                      <div className="user_class_input w-full mt-2 ">
                        <label
                          for="text"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Start
                        </label>
                        <input
                          className="w-[271.5px] border rounded p-2 text-sm font-normal "
                          value={formdata.start}
                          onChange={changeHandler}
                          type="date"
                          name="start"
                          id="text"
                          required
                        />
                      </div>

                      <div className="user_class_input w-full ml-2  mt-2">
                        <label
                          for="text"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          End
                        </label>
                        <input
                          className="w-[271.5px] border rounded p-2 text-sm font-normal "
                          value={formdata.end}
                          onChange={changeHandler}
                          type="date"
                          name="end"
                          id="text"
                          required
                        />
                      </div>
                    </div>

                    <div className="user_class_input">
                      <label
                        for="message"
                        className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Reason
                      </label>
                      <textarea
                        className="border rounded p-2 text-sm font-normal  w-full"
                        required
                        name="reason"
                        onChange={changeHandler}
                        value={formdata.reason}
                        id="message"
                        rows="4"
                        placeholder="Enter your reason..."
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-center gap-[20px]">
                      <button
                        onClick={(e) => {
                          e.preventDefault();

                          //  submitHandler(e);
                          const confirmAction = window.confirm(
                            "Are you sure you want to edit the leave again?"
                          );
                          if (confirmAction) {
                            submitHandler(e);
                          }
                        }}
                        type="button"
                        className="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        update
                      </button>

                      <button
                        onClick={(e) => {
                          setStar1(false);
                        }}
                        type="button"
                        class="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* } */}
        </div>
      </div>
    </>
  );
};

export default LeaveRequest;
