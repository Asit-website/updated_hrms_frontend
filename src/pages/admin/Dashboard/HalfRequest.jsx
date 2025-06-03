import React from "react";
import "react-calendar/dist/Calendar.css";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { CiPlay1 } from "react-icons/ci";
import { useMain } from "../../../hooks/UseMain"
import { useClickOutside } from "../../../hooks/useClickOutside";

const HalfRequest = () => {

  const [star1, setStar1] = useState(false);

  const styleThing = {
    display: star1 ? "flex" : "none",
  };

  const { user, getUserHalfDay, updateLeave, acceptHalf, rejectHalfDay, postNotifyLeavereq } = useMain();

  const [data, setData] = useState([]);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));

  const { role } = hrms_user;
  const { leaveReqestEditPermission } = hrms_permission;
  const location = useLocation();

  const [accept, setAccept] = useState("reject", user);

  const getData = async () => {
    let ans = await getUserHalfDay();
    const reverseArray = ans?.data?.reverse();
    console.log("half day", reverseArray);
    setData(reverseArray);
  };

  useEffect(() => {
    getData();
  }, []);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return formattedDate;
  };


  const [formdata, setFormdata] = useState({
    employeeName: "", leaveType: "", start: "", end: "", reason: "", id: ""
  })

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const [showPlay, setShowPlay] = useState(-1);

  const submitHandler = async () => {
    const toastId = toast.loading("Loading...");
    const startDate = new Date(formdata.start);
    const endDate = new Date(formdata.end);
    const timeDifference = Math.abs(endDate - startDate);
    const daysGap = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const ans = await updateLeave({ employeeName: formdata.employeeName, id: formdata.id, type: formdata.leaveType, from: formdata.start, to: formdata.end, days: daysGap, reason: formdata.reason });

    if (ans.success) {
      toast.success("Successfuly updated");
      setStar1(false);
      getData();
    }

    toast.dismiss(toastId);

  }

  const rejectHandler = async (form) => {

    const toastId = toast.loading("Loading...");
    const { user, _id } = form;

    const userName = user.fullName;

    const ans = await rejectHalfDay(form, _id);

    const notify = await postNotifyLeavereq(userName, "Rejected");

    if (ans?.status) {
      toast.success("Successfuly reject the Half Day");
      setShowPlay(-1);
      getData();

      if (userName) {
        setAccept(!accept);
      }

    }

    toast.dismiss(toastId);
  }

  const acceptHandler = async (form) => {

    const toastId = toast.loading("Loading...");
    const { user, _id, from, to } = form;
    const userId = form?.user?._id;
    const userName = user.fullName;

    const ans = await acceptHalf(form, _id, userId, from, to);

    const notify = await postNotifyLeavereq(userName, "Accepted");

    window.prompt("notification reached successfully");

    if (ans?.status) {

      toast.success("Successfuly Accepted the leave");
      setShowPlay(-1);
      getData();
      if (userName) {
        setAccept(!accept);
      }
    }
    toast.dismiss(toastId);

  }

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

  const [currView, setCurrView] = useState(-1);

  const wrapperRef = useClickOutside(() => {
    setShowPlay(-1)
  });

  const formRef = useClickOutside(() => {
    setStar1(false);
  });

  const ref = useClickOutside(() => {
    setCurrView(-1);
  })


  return (
    <>
      <div className="employee-dash h-full">

        <div className="w-full ">


          <div className="w-full relative pt-8 pb-8 pr-5 pl-[20px]">
            <div className="flex-col">
              {/* first  */}

              <div className="hrmDasTxtFir">
                {/* <p className="hrmHed">Dashboard</p> */}
                {location.state ? (<div className="hrDsPa">

                  <NavLink to={`/adminDash/HRM`}>
                    <span className="hover:text-[#1567FF] cursor-pointer text-xl">Dashboard</span>
                  </NavLink>
                  <span>
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747743027/chevron_right_ztbdvq.png" alt="" />
                  </span>{" "}
                  <span className="text-[#1567FF] cursor-pointer">manage Leave</span>
                </div>) : (
                  <p className="hrFirDs text-[24px] font-semibold leading-[32px] text-left text-[#101820] ml-5">Dashboard</p>

                )}



              </div>
              <main className="pt-[10px] pb-[30px] px-0">
                <input className="border border-black w-[200px] h-[38px] px-[10px] rounded-[10px] mb-5 ml-4" onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput} placeholder="Search Employee" />


                {/* second  */}

                <div className="w-full overflow-x-auto  md:overflow-x-scroll md:overflow-y-auto bg-grey rounded-xl border-2">
                  <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-white border-b text-gray-700 uppercase text-md leading-normal">
                      <tr >

                        <th scope="col" className="py-3 px-6 min-w-36 text-left w-full md:w-auto bg-white">
                          EMPLOYEE
                        </th>
                        {/* <th scope="col" className="px-3 py-3 uppercase">
                          LEAVE TYPES
                        </th> */}
                        <th scope="col" className="py-3 px-6 min-w-36 text-left w-full md:w-auto bg-white">
                          APPLIED ON
                        </th>

                        <th scope="col" className="py-3 px-6 min-w-36 text-left w-full md:w-auto bg-white">
                          START DATE
                        </th>

                        <th scope="col" className="py-3 px-6 min-w-36 text-left w-full md:w-auto bg-white">
                          TOTAL DAYS
                        </th>
                        <th scope="col" className="py-3 px-6 min-w-36 text-left w-full md:w-auto bg-white">
                          LEAVE REASON
                        </th>
                        <th scope="col" className="py-3 px-6 min-w-36 text-left w-full md:w-auto bg-white">
                          STATUS
                        </th>
                        <th scope="col" className="py-3 px-6 min-w-36 text-center w-full md:w-auto bg-white">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-gray-700 bg-[white]">
                      {paginatedProjects?.map((e, index) => {
                        return (
                          <tr key={index} className="border-b hover:bg-gray-50 transition-all">

                            <td className="py-4 px-6">  {e?.user?.fullName}</td>
                            {/* <td className="px-3 py-3 taskAns">{e?.leaveType}</td> */}
                            <td className="py-4 px-6">{formatDate(e?.appliedOn)}</td>
                            <td className="py-4 px-6">  {e?.from}</td>
                            <td className="py-4 px-6"> {(e?.days)} </td>

                            <td className="py-4 px-6">{e?.reason}</td>

                            <td className="py-4 px-6">
                              <div className="ACTIVITYsss">{
                                e?.status === "" ? "Pending" : e?.status
                              }</div>
                            </td>

                            <div className="relative">
                              <td
                                onClick={() => {
                                  setCurrView(currView === index ? -1 : index);
                                  setShowPlay(-1);
                                }}
                                className="px-3 py-3 flex items-center justify-center hiii_gap cursor-pointer"
                              >
                                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747813854/actions_nwb36s.png" alt="" />
                              </td>

                              {index === currView && (
                                <div  ref={ref} className=" absolute right-[68px] top-[-5px] -mt-8 mr-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-[999] ">
                                  {/* Update Button */}
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

                                      {/* Dropdown (Accept/Reject) */}


                                      <hr />

                                      {/* Edit */}
                                      <div
                                        className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                          setCurrView(-1);
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
                                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747814038/edit22_gcmjla.png" alt="" />
                                        <p>Edit</p>
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>

                            <div style={{ position: "relative", bottom: "7px" }} >


                              {/* Accept/Reject Buttons - Side by Side */}
                              {showPlay === index && (
                                <div ref={wrapperRef}
                                className="absolute top-full -right-[5px] p-[6px_8px] rounded-lg flex flex-row gap-[10px] z-[1000]"
                                 
                                >
                                  <p
                                    onClick={() => acceptHandler(e)}
                                    className="bg-green-500 text-white px-3 py-[6px] rounded cursor-pointer whitespace-nowrap"
                                    
                                  >
                                    Accept
                                  </p>
                                  <p
                                    onClick={() => rejectHandler(e)}
                                    className="bg-red-500 text-white px-3 py-[6px] rounded cursor-pointer whitespace-nowrap"
                                  >
                                    Reject
                                  </p>
                                </div>
                              )}
                            </div>

                          </tr>
                        )
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


          {/* this is edit form of leave rqeuest  */}

          <div
            style={styleThing}
            className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center h-screen z-[3000] backdrop-blur-[1px]"
          >
            <div
              className="w-full custom-scroll-hidden overflow-auto max-w-2xl p-4 bg-white rounded-2xl shadow-lg space-y-6" ref={formRef}
            >
              {/* <!-- Modal content --> */}
              <div

              >
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between py-2 px-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="editLeadreq">
                    Edit Leave Request
                  </h3>

                </div>
                {/* <!-- Modal body --> */}
                <div className="p-4 md:p-5">

                  <form className="space-y-4 fkl" action="#">

                    <div className="grid grid-cols-2 gap-3">
                      <div className="mt-2 user_class_input">
                      <label
                        className="Resig-employ block text-gray-700 mb-1 w-full"
                      >
                        Employee Name
                      </label>

                      <input
                        value={formdata.employeeName}
                        onChange={changeHandler}

                        type="text"
                        name="employeeName"
                        id="text"

                        placeholder="Enter the name"
                        required
                        className="ml-[3px] w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mt-2 user_class_input">
                      <label
                        className="Resig-employ block text-gray-700 mb-1 w-full"  >
                        Leave type
                      </label>
                      <input
                        value={formdata.leaveType}

                        onChange={changeHandler}
                        type="text"
                        name="leaveType"
                        id="text"
                        placeholder="Enter your leave type"
                        className="ml-[3px] w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                      <div className="user_class_input w-full mt-2 ">
                        <label
                          for="text"
                          className="Resig-employ block text-gray-700 mb-1 w-full"
                        >
                          Start
                        </label>
                        <input
                          value={formdata.start}
                          onChange={changeHandler}
                          type="date"
                          name="start"
                          id="text"
                          className="ml-[3px] w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div className="user_class_input w-full ml-2  mt-2">
                        <label
                          for="text"
                          className="Resig-employ block text-gray-700 mb-1 w-full"
                        >
                          End
                        </label>
                        <input
                          value={formdata.end}
                          onChange={changeHandler}
                          type="date"
                          name="end"
                          id="text"
                          className="ml-[3px] w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                    </div>

                    <div className="user_class_input">
                      <label
                        for="message"
                        className="Resig-employ block text-gray-700 mb-1 w-full"
                      >
                        Reason
                      </label>
                      <textarea
                        className="ml-[3px] w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        required
                        name="reason"
                        onChange={changeHandler}
                        value={formdata.reason}
                        id="message"
                        rows="4"

                        placeholder="Enter your reason..."
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-center gap-5">

                      <button
                        onClick={(e) => {

                          e.preventDefault();

                          submitHandler(e);
                        }}
                        type="button"
                        className=" mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[200px] max-w-full"
                      >
                        send
                      </button>

                      <button
                        onClick={(e) => {

                          setStar1(false);
                        }}
                        type="button"
                        className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[200px] max-w-full"
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

export default HalfRequest;
