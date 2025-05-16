import React, { useEffect, useState, useRef } from "react";
import "react-calendar/dist/Calendar.css";


import { useLocation } from "react-router-dom";

import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";
import { useMain } from "../../../hooks/UseMain";

const EmployeeSelf = ({ setAlert, pop1, setPop1 }) => {
  const {
    user,
    deleteOfferLetter,
    deleteRelievingLetter,
    deleteExperienceLetter,
    deleteInternshipOfferLetter,
    postActivity,
    getStatisticsByUser,
    getUsers,
    changeOfferLetterPer,
    changeRelivingLetterPer,
    changeExperienceLetterPer,
    getThisMonthLeave,
    getMyOfferLetter,
  } = useMain();

  const [user1, setUser1] = useState({});

  const location = useLocation();
  const state = location.state;
  const [curenpage, setCurrPage] = useState("Document");
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  const [showIndex, setShowIndex] = useState(null);

  const [offerContent, setOfferContent] = useState(``);
  const [reliveContent, setReliveContent] = useState(``);
  const [internOffer, setInternOffer] = useState(``);
  const [experienceContent, setExperienceContent] = useState(``);
  const [internshipContent, setinternshipContent] = useState(``);

  const [offerLetter, setOfferLetter] = useState([]);
  const [reliveLetter, setReliveLetter] = useState([]);
  const [experienceLetter, setExperienceLetter] = useState([]);
  const [internshipLetter, setinternshipLetter] = useState([]);

  const [viewOfferLetter, setViewOfferLetter] = useState(0);
  const [viewReliveLetter, setViewReliveLetter] = useState(0);
  const [viewExperienceLetter, setViewExperienceLetter] = useState(0);
  const [viewInternshipLetter, setViewInternshipLetter] = useState(0);

  const contonentPDF = useRef();
  const contonentPDF2 = useRef();
  const contonentPDF3 = useRef();
  const contonentPDF4 = useRef();

  const generatePdf = useReactToPrint({
    content: () => contonentPDF.current,
    documentTitle: "Offer Letter",
    parentContainer: {
      "@media print": {
        display: "block",
      },
    },
  });

  const generatePdf2 = useReactToPrint({
    content: () => contonentPDF2.current,
    documentTitle: "Relieving Letter",
    parentContainer: {
      "@media print": {
        display: "block",
      },
    },
  });
  const generatePdf3 = useReactToPrint({
    content: () => contonentPDF3.current,
    documentTitle: "Experience Letter",
  });
  const generatePdf4 = useReactToPrint({
    content: () => contonentPDF4.current,
    documentTitle: "Internship Letter",
    parentContainer: {
      "@media print": {
        display: "block",
      },
    },
  });

  const [thisMonthLeave, setThisMonthLeave] = useState(0);

  const getOfferletter = async () => {
    const ans = await getMyOfferLetter(state);
    if (ans?.status) {
      setOfferLetter(ans?.data?.createletter);
      setReliveLetter(ans?.data?.relivingLetter);
      setExperienceLetter(ans?.data?.expeletter);
      setinternshipLetter(ans?.data?.internLetter);

      setOfferContent(ans?.data?.createletter[0]?.content);
      setReliveContent(ans?.data?.relivingLetter[0]?.content);
      setExperienceContent(ans?.data?.expeletter[0]?.content);
      setinternshipContent(ans?.data?.internLetter[0]?.content);
    }
  };

  useEffect(() => {
    getOfferletter();
  }, []);

  const handleCheckboxChange = async (event) => {
    const toastId = toast.loading("Loading...");
    const checked = event.target.checked;
    setIsChecked(checked);

    try {
      const ans = await changeOfferLetterPer({ userId: state });
      toast.success("Succesfuly updated");
    } catch (error) {
      console.error("Error calling API:", error);
    }
    toast.dismiss(toastId);
  };

  const handleCheckboxChange2 = async (event) => {
    const toastId = toast.loading("Loading...");
    const checked = event.target.checked;
    setIsChecked2(checked);

    try {
      const ans = await changeRelivingLetterPer({ userId: state });
      toast.success("Succesfuly updated");
    } catch (error) {
      console.error("Error calling API:", error);
    }
    toast.dismiss(toastId);
  };

  const handleCheckboxChange3 = async (event) => {
    const toastId = toast.loading("Loading...");
    const checked = event.target.checked;
    setIsChecked3(checked);

    try {
      const ans = await changeExperienceLetterPer({ userId: state });
      toast.success("Succesfuly updated");
    } catch (error) {
      console.error("Error calling API:", error);
    }
    toast.dismiss(toastId);
  };

  const fetchUserDetails = async () => {
    const ans = await getUsers(state);
    const resp = await getThisMonthLeave(state);
    setThisMonthLeave(resp?.totalDays);
    setUser1(ans?.data);
    console.log("user", ans?.data);
  };

  useEffect(() => {
    if (user1?.offerLetterPermission) {
      setIsChecked(true);
    }
    if (user1?.RelievingLetterPermission) {
      setIsChecked2(true);
    }
    if (user1?.ExperienceLetterPermission) {
      setIsChecked3(true);
    }
  }, [user1]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const wrapperRef = useRef();

  useOutsideClick(wrapperRef, () => {
    setShowIndex(null);
  });

  const deleteOfferLetterFunc = async (id) => {
    confirmAlert({
      title: "Are you sure to Delete this offer letter ?",
      // message: "All related data to this will be deleted",
      buttons: [
        {
          label: "Yes, Go Ahead!",
          style: {
            background: "#FF5449",
          },
          onClick: async () => {
            const toastId = toast.loading("Loading...");
            setShowIndex(null);
            const ans = await deleteOfferLetter(id);
            toast.success("Successfully Deleted");
            toast.dismiss(toastId);
            getOfferletter();
          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });
  };

  const deleteRelievingLetterFunc = async (id) => {
    confirmAlert({
      title: "Are you sure to Delete this relieving letter ?",
      // message: "All related data to this will be deleted",
      buttons: [
        {
          label: "Yes, Go Ahead!",
          style: {
            background: "#FF5449",
          },
          onClick: async () => {
            const toastId = toast.loading("Loading...");
            setShowIndex(null);
            const ans = await deleteRelievingLetter(id);
            toast.success("Successfully Deleted");
            toast.dismiss(toastId);
            getOfferletter();
          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });
  };

  const deleteExperienceLetterFunc = async (id) => {
    confirmAlert({
      title: "Are you sure to Delete this experience letter ?",
      // message: "All related data to this will be deleted",
      buttons: [
        {
          label: "Yes, Go Ahead!",
          style: {
            background: "#FF5449",
          },
          onClick: async () => {
            const toastId = toast.loading("Loading...");
            setShowIndex(null);
            const ans = await deleteExperienceLetter(id);
            toast.success("Successfully Deleted");
            toast.dismiss(toastId);
            getOfferletter();
          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });
  };
  const deleteInternshipLetterFunc = async (id) => {
    confirmAlert({
      title: "Are you sure to Delete this internship letter ?",
      // message: "All related data to this will be deleted",
      buttons: [
        {
          label: "Yes, Go Ahead!",
          style: {
            background: "#FF5449",
          },
          onClick: async () => {
            const toastId = toast.loading("Loading...");
            setShowIndex(null);
            const ans = await deleteInternshipOfferLetter(id);
            toast.success("Successfully Deleted");
            toast.dismiss(toastId);
            getOfferletter();
          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });
  };

  return (
    <>
      <div className="employee-dash h-full">
      

        <div className="w-full bg-[#f5f5f5]">
          

          <div className="px-[20px] pr-[54px] py-[32px] mt-[69px] relative w-full flex flex-col gap-[20px]">
            <nav className="fixed top-[78px] right-0 w-[81%] flex items-center justify-between bg-white px-[40px] pr-[20px] pt-[18px] pb-[15px] z-[20]">
              <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px] text-left">{user1?.fullName} Details</h2>

              <select
              className="w-[170px] h-[40px] border border-[#0B56E4] bg-gradient-to-r from-[#D1E8FD] via-[#D1E8FD] to-[#EDEFFF] text-[#0B56E4] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left outline-none rounded-lg px-[5px]"
                value={curenpage}
                onChange={(e) => setCurrPage(e.target.value)}
                name=""
                id=""
              >
                <option value="Document">Document</option>
                <option value="Offer Letter">Offer Letter</option>
                <option value="Relieving Letter">Relieving Letter</option>
                <option value="Experience Letter">Experience Letter</option>
                <option value="Internship Letter">Internship Letter</option>
              </select>
            </nav>

            {curenpage === "Document" && (
              <>
                {/* first section  */}
                <div className="w-full p-[20px] pb-[30px] rounded-[18px] bg-white border border-[#E8E9EB] flex flex-col gap-[18px]">
                  <h3 className="text-[#101820] text-base font-bold leading-6 tracking-[0.0015em] text-left">Employee Detail</h3>

                  <hr />

                  <div className="grid grid-cols-2 gap-[22px]">
                    <div className="flex items-center">
                      <p className="text-[#1B2533] text-sm font-normal leading-[20px] tracking-[0.0025em] w-[140px] text-left">Employee ID :</p>
                      <span className="text-[#1B2533] text-sm font-medium leading-6 tracking-[0.005em] text-left">KDS{user1?.employeeCode}</span>
                    </div>

                    <div className="flex items-center">
                      <p className="text-[#1B2533] text-sm font-normal leading-[20px] tracking-[0.0025em] w-[140px] text-left">Name :</p>
                      <span className="text-[#1B2533] text-sm font-medium leading-6 tracking-[0.005em] text-left">{user1?.fullName}</span>
                    </div>

                    <div className="flex items-center">
                      <p className="text-[#1B2533] text-sm font-normal leading-[20px] tracking-[0.0025em] w-[140px] text-left">Department :</p>
                      <span className="text-[#1B2533] text-sm font-medium leading-6 tracking-[0.005em] text-left">{user1?.department}</span>
                    </div>

                    <div className="flex items-center">
                      <p className="text-[#1B2533] text-sm font-normal leading-[20px] tracking-[0.0025em] w-[140px] text-left">Designation :</p>
                      <span className="text-[#1B2533] text-sm font-medium leading-6 tracking-[0.005em] text-left">{user1?.designation}</span>
                    </div>

                    <div className="flex items-center">
                      <p className="text-[#1B2533] text-sm font-normal leading-[20px] tracking-[0.0025em] w-[140px] text-left">Date of Joining :</p>
                      <span className="text-[#1B2533] text-sm font-medium leading-6 tracking-[0.005em] text-left">{user1?.joiningDate}</span>
                    </div>

                    <div className="flex items-center">
                      <p className="text-[#1B2533] text-sm font-normal leading-[20px] tracking-[0.0025em] w-[140px] text-left">Office Email :</p>
                      <span className="text-[#1B2533] text-sm font-medium leading-6 tracking-[0.005em] text-left">{user1?.email}</span>
                    </div>
                  </div>
                </div>

                {/* second section  */}
                <div className="w-full p-[20px_20px_30px_20px] rounded-[18px] bg-white border border-[#E8E9EB] flex flex-col gap-[18px]">
                  <h3 className="text-[#101820] text-base font-bold leading-6 tracking-[0.0015em] text-left">Other Detail</h3>

                  <hr />

                  <div className="grid grid-cols-2 gap-[22px]">
                    <div className="singfirst1">
                      <p>Address :</p>
                      <span>{user1?.currentAddress}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Mobile :</p>
                      <span>{user1?.mobile}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Personal ID :</p>
                      <span>{user1?.email1}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Gender :</p>
                      <span>{user1?.gender}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Pan Number :</p>
                      <span>{user1?.pan}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Adhar Number :</p>
                      <span>{user1?.adhar}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Father Name :</p>
                      <span>{user1?.father}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Current Address :</p>
                      <span>{user1?.currentAddress}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Current State :</p>
                      <span>{user1?.currentState}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Current City :</p>
                      <span>{user1?.currentCity}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Area Pincode :</p>
                      <span>{user1?.currentPin}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Permanent Address :</p>
                      <span>{user1?.residence}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Permanent State :</p>
                      <span>{user1?.perState}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Permanent City :</p>
                      <span>{user1?.perCity}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Permanent Pin :</p>
                      <span>{user1?.perPin}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Marital status :</p>
                      <span>{user1?.Martial}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Nationality :</p>
                      <span>{user1?.nationality}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Mother name :</p>
                      <span>{user1?.Mother}</span>
                    </div>
                  </div>
                </div>

                {/* thid  section  */}
                <div className="w-full p-[20px_20px_30px_20px] rounded-[18px] bg-white border border-[#E8E9EB] flex flex-col gap-[18px]">
                  <h3 className="text-[#101820] text-base font-bold leading-6 tracking-[0.0015em] text-left">Document Upload</h3>

                  <hr />

                  <div className="w-full flex flex-wrap gap-6">
                    {user1?.document?.map((item, index) => (
                      <div className="singleDoc" key={index}>
                        {/* left */}
                        <div className="sidocLeft">
                          <a target="_blank" href={`${item?.url}`}>
                            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392355/docu_ewkuie.png" alt="" />
                          </a>

                          <div className="ffwrap">
                            <a target="_blank" href={`${item?.url}`}>
                              <p className="ff">
                                {" "}
                                {item.name === "twevelCert"
                                  ? "twelveth Certificate"
                                  : item?.name === "tenCert"
                                  ? "Tenth Certicate"
                                  : item?.name}
                              </p>
                            </a>
                            <a target="_blank" href={`${item?.url}`}>
                              {" "}
                              <p className="dd">{(item?.url).slice(50, 80)}</p>
                            </a>
                          </div>
                        </div>

                        {/* right  */}
                        {/* <p className="singDocRight">{new Date().now()}</p> */}
                      </div>
                    ))}
                  </div>
                </div>

                {/* fourth section  */}
                <div className="w-full p-[20px_20px_30px_20px] rounded-[18px] bg-white border border-[#E8E9EB] flex flex-col gap-[18px]">
                  <h3 className="text-[#101820] text-base font-bold leading-6 tracking-[0.0015em] text-left">Bank Account Detail</h3>

                  <hr />

                  <div className="grid grid-cols-2 gap-[22px]">
                    <div className="singfirst1">
                      <p>Salary Pay Mode</p>
                      <span>{user1?.SalaryPay}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Account No :</p>
                      <span>{user1?.AccountNumber}</span>
                    </div>

                    <div className="singfirst1">
                      <p> Bank Name :</p>
                      <span>{user1?.SalaryBankName}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Beneficiary Name :</p>
                      <span>{user1?.BeneficiaryName}</span>
                    </div>

                    <div className="singfirst1">
                      <p>Branch Ifsc Code :</p>
                      <span>{user1?.BankIfsc}</span>
                    </div>
                    <div className="singfirst1">
                      <p>Bank Branch Name :</p>
                      <span>{user1?.Branch}</span>
                    </div>
                  </div>
                </div>

                {/* fivth section  */}
                <div className="w-full p-[20px_20px_30px_20px] rounded-[18px] bg-white border border-[#E8E9EB] flex flex-col gap-[18px]">
                  <h3 className="text-[#101820] text-base font-bold leading-6 tracking-[0.0015em] text-left">Leave Details</h3>

                  <hr />

                  <div className="grid grid-cols-2 gap-[22px]">
                    <div className="singfirst2">
                      <p>This Month Leave:</p>
                      <span>{thisMonthLeave ? thisMonthLeave : 0}</span>
                    </div>

                    <div className="singfirst2">
                      <p>Total Leave taken:</p>
                      <span>{user1?.totalLeaves}</span>
                    </div>

                    <div className="singfirst2">
                      <p>This Month Paid Leave Remaining:</p>
                      <span>
                        {2 - parseInt(thisMonthLeave) >= 0
                          ? 2 - parseInt(thisMonthLeave)
                          : 0}
                      </span>
                    </div>

                    <div className="singfirst2">
                      <p>Year paid leave remaining:</p>
                      <span>
                        {12 - parseInt(user1?.totalLeaves) >= 0
                          ? 12 - parseInt(user1?.totalLeaves)
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full p-[20px_20px_30px_20px] rounded-[18px] bg-white border border-[#E8E9EB] flex flex-col gap-[18px]">
                  <h3 className="text-[#101820] text-base font-bold leading-6 tracking-[0.0015em] text-left">Document Permission</h3>

                  <hr />

                  <div className="grid grid-cols-2 gap-[22px] sinoid">
                    <div className="flex items-center adwwith">
                      <p className="text-[#1B2533] text-sm font-normal leading-[20px] tracking-[0.0025em] w-[140px] text-left">Offer Letter :</p>

                      <input
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="inpo1"
                        type="checkbox"
                      />
                    </div>

                    <div className="flex items-center adwwith">
                      <p className="text-[#1B2533] text-sm font-normal leading-[20px] tracking-[0.0025em] w-[140px] text-left">Relieving Letter :</p>

                      <input
                        checked={isChecked2}
                        onChange={handleCheckboxChange2}
                        className="inpo1"
                        type="checkbox"
                      />
                    </div>

                    <div className="flex items-center adwwith">
                      <p className="text-[#1B2533] text-sm font-normal leading-[20px] tracking-[0.0025em] w-[140px] text-left">Experience Letter :</p>

                      <input
                        checked={isChecked3}
                        onChange={handleCheckboxChange3}
                        className="inpo2"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-end"></div>
              </>
            )}
            {curenpage === "Offer Letter" && (
              <div className="pt-20">
                <div className="flex flex-col gap-3">
                  {offerLetter.map((item, index) => (
                    <div
                      className={`flex items-center justify-between bg-white border border-gray-300 rounded-md p-5 ${
                        viewOfferLetter === index &&
                        "bg-blue-100 border-blue-700"
                      }`}
                    >
                      <h2>
                        Offer Letter {viewOfferLetter === index && "(Viewing)"}
                      </h2>

                      <div className="relative z-10 cursor-pointer">
                        <img
                          onClick={() =>
                            setShowIndex(showIndex === index ? null : index)
                          }
                          src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png"
                          alt="action-btn"
                        />

                        {showIndex === index && (
                          <div
                            ref={wrapperRef}
                            className="absolute right-6 flex flex-col -top-14 bg-white rounded-md border border-gray-300 p-2"
                          >
                            <div
                              onClick={() => {
                                setOfferContent(item.content);
                                setViewOfferLetter(index);
                                setShowIndex(null);
                              }}
                              className="flex cursor-pointer items-center gap-3 p-1"
                            >
                              <FaRegEye className="text-[18px]" />
                              <span>View</span>
                            </div>

                            <hr />
                            <div
                              onClick={() => deleteOfferLetterFunc(item._id)}
                              className="flex cursor-pointer items-center gap-3 p-1"
                            >
                              <MdDeleteOutline className="text-[18px]" />
                              <span>Delete</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {offerLetter.length === 0 ? (
                  <div>
                    <p className="text-center font-medium text-xl">
                      No Offer Letter Found !!
                    </p>
                  </div>
                ) : (
                  <>
                    <div ref={contonentPDF} className="print-root">
                      <img
                        className="offer_header11 print-header"
                        src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png"
                        alt="Header"
                      />
                      <div className="print-content">
                        <div className="offer-preview font-wrapper p-4">
                          <h1 className="text-center font-bold text-xl">
                            OFFER LETTER
                          </h1>
                          <div
                            className="addfont py-2 px-7"
                            dangerouslySetInnerHTML={{
                              __html: offerContent
                                .replace(
                                  /<div class="break"><\/div>/g,
                                  '<div class="page-break"></div>'
                                )
                                .replace(
                                  /<\/p>\s*<p>/g,
                                  '</p><div class="page-break-helper"></div><p>'
                                ),
                            }}
                          />
                        </div>
                      </div>
                      <img
                        className="offer_footer11 print-footer"
                        src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png"
                        alt="Footer"
                      />
                    </div>

                    <div className="prntBtn">
                      <button onClick={() => generatePdf()}>
                        <span>Print</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            {curenpage === "Relieving Letter" && (
              <div className="pt-20">
                <div className="flex flex-col gap-3">
                  {reliveLetter.map((item, index) => (
                    <div
                      className={`flex items-center justify-between bg-white border border-gray-300 rounded-md p-5 ${
                        viewReliveLetter === index &&
                        "bg-blue-100 border-blue-700"
                      }`}
                    >
                      <h2>
                        RELIEVING LETTER{" "}
                        {viewReliveLetter === index && "(Viewing)"}
                      </h2>

                      <div className="relative z-10 cursor-pointer">
                        <img
                          onClick={() =>
                            setShowIndex(showIndex === index ? null : index)
                          }
                          src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png"
                          alt="action-btn"
                        />

                        {showIndex === index && (
                          <div
                            ref={wrapperRef}
                            className="absolute right-6 flex flex-col -top-14 bg-white rounded-md border border-gray-300 p-2"
                          >
                            <div
                              onClick={() => {
                                setReliveContent(item.content);
                                setViewReliveLetter(index);
                                setShowIndex(null);
                              }}
                              className="flex cursor-pointer items-center gap-3 p-1"
                            >
                              <FaRegEye className="text-[18px]" />
                              <span>View</span>
                            </div>

                            <hr />
                            <div
                              onClick={() =>
                                deleteRelievingLetterFunc(item._id)
                              }
                              className="flex cursor-pointer items-center gap-3 p-1"
                            >
                              <MdDeleteOutline className="text-[18px]" />
                              <span>Delete</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {reliveLetter.length === 0 ? (
                  <div>
                    <p className="text-center font-medium text-xl">
                      No Relieving Letter Found !!
                    </p>
                  </div>
                ) : (
                  <>
                    <div ref={contonentPDF2}>
                      <div className="showoffercont">
                        <img
                          className="offer_header11"
                          src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png"
                          alt=""
                        />
                        <h2>RELIEVING LETTER</h2>

                        <div className=" p-4">
                          <div
                            className="py-2 px-7"
                            dangerouslySetInnerHTML={{ __html: reliveContent }}
                          />
                        </div>
                        <img
                          className="offer_footer11"
                          src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="prntBtn">
                      <button onClick={() => generatePdf2()}>
                        <span>Print</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
              // <div>
              //    <div ref={contonentPDF2} >
              //       <div className="showoffercont">
              //          <img className="offer_header11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png" alt="" />
              //          <h2>RELIEVING LETTER</h2>

              //          <div className=" p-4">
              //             <div className="py-2 px-7" dangerouslySetInnerHTML={{ __html: reliveContent }} />
              //          </div>
              //          <img className="offer_footer11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png" alt="" />

              //       </div>

              //    </div>

              //    <div className="prntBtn">
              //       <button onClick={() => generatePdf2()}>
              //          <span>Print</span>
              //       </button>
              //    </div>
              // </div>
            )}

            {curenpage === "Experience Letter" && (
              <div className="pt-20">
                <div className="flex flex-col gap-3">
                  {experienceLetter.map((item, index) => (
                    <div
                      className={`flex items-center justify-between bg-white border border-gray-300 rounded-md p-5 ${
                        viewExperienceLetter === index &&
                        "bg-blue-100 border-blue-700"
                      }`}
                    >
                      <h2>
                        EXPERIENCE LETTER{" "}
                        {viewExperienceLetter === index && "(Viewing)"}
                      </h2>

                      <div className="relative z-10 cursor-pointer">
                        <img
                          onClick={() =>
                            setShowIndex(showIndex === index ? null : index)
                          }
                          src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png"
                          alt="action-btn"
                        />

                        {showIndex === index && (
                          <div
                            ref={wrapperRef}
                            className="absolute right-6 flex flex-col -top-14 bg-white rounded-md border border-gray-300 p-2"
                          >
                            <div
                              onClick={() => {
                                setExperienceContent(item.content);
                                setViewExperienceLetter(index);
                                setShowIndex(null);
                              }}
                              className="flex cursor-pointer items-center gap-3 p-1"
                            >
                              <FaRegEye className="text-[18px]" />
                              <span>View</span>
                            </div>

                            <hr />
                            <div
                              onClick={() =>
                                deleteExperienceLetterFunc(item._id)
                              }
                              className="flex cursor-pointer items-center gap-3 p-1"
                            >
                              <MdDeleteOutline className="text-[18px]" />
                              <span>Delete</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {experienceLetter.length === 0 ? (
                  <div>
                    <p className="text-center font-medium text-xl">
                      No Experience Letter Found !!
                    </p>
                  </div>
                ) : (
                  <>
                    <div ref={contonentPDF3} className="showoffercont">
                      <img
                        className="offer_header11"
                        src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png"
                        alt=""
                      />
                      <h2>EXPERIENCE LETTER</h2>

                      <div className="p-4">
                        <div
                          className="py-2 px-7"
                          dangerouslySetInnerHTML={{
                            __html: experienceContent,
                          }}
                        />
                      </div>

                      <img
                        className="offer_footer11"
                        src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png"
                        alt=""
                      />
                    </div>

                    <div className="prntBtn">
                      <button onClick={() => generatePdf3()}>
                        <span>Print</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
              // <div>
              //    <div ref={contonentPDF3} className="showoffercont">
              //       <img className="offer_header11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png" alt="" />
              //       <h2>EXPERIENCE LETTER</h2>

              //       <div className="p-4">
              //          <div className="py-2 px-7" dangerouslySetInnerHTML={{ __html: experienceContent }} />
              //       </div>

              //       <img className="offer_footer11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png" alt="" />
              //    </div>

              //    <div className="prntBtn">
              //       <button onClick={() => generatePdf3()}>
              //          <span>Print</span>
              //       </button>
              //    </div>
              // </div>
            )}

            {curenpage === "Internship Letter" && (
              <div className="pt-20">
                <div className="flex flex-col gap-3">
                  {internshipLetter.map((item, index) => (
                    <div
                      className={`flex items-center justify-between bg-white border border-gray-300 rounded-md p-5 ${
                        viewInternshipLetter === index &&
                        "bg-blue-100 border-blue-700"
                      }`}
                    >
                      <h2>
                        INTERNSHIP LETTER{" "}
                        {viewInternshipLetter === index && "(Viewing)"}
                      </h2>

                      <div className="relative z-10 cursor-pointer">
                        <img
                          onClick={() =>
                            setShowIndex(showIndex === index ? null : index)
                          }
                          src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png"
                          alt="action-btn"
                        />

                        {showIndex === index && (
                          <div
                            ref={wrapperRef}
                            className="absolute right-6 flex flex-col -top-14 bg-white rounded-md border border-gray-300 p-2"
                          >
                            <div
                              onClick={() => {
                                setinternshipContent(item.content);
                                setViewInternshipLetter(index);
                                setShowIndex(null);
                              }}
                              className="flex cursor-pointer items-center gap-3 p-1"
                            >
                              <FaRegEye className="text-[18px]" />
                              <span>View</span>
                            </div>

                            <hr />
                            <div
                              onClick={() =>
                                deleteInternshipLetterFunc(item._id)
                              }
                              className="flex cursor-pointer items-center gap-3 p-1"
                            >
                              <MdDeleteOutline className="text-[18px]" />
                              <span>Delete</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {internshipLetter.length === 0 ? (
                  <div>
                    <p className="text-center font-medium text-xl">
                      No Internship Letter Found !!
                    </p>
                  </div>
                ) : (
                  <>
                    <div ref={contonentPDF4} className="showoffercont">
                      <img
                        className="offer_header11"
                        src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png"
                        alt=""
                      />

                      <div className="p-4">
                        <h2>INTERNSHIP LETTER</h2>
                        <div
                          className="py-2 px-7"
                          dangerouslySetInnerHTML={{
                            __html: internshipContent,
                          }}
                        />
                      </div>
                      <img
                        className="offer_footer11"
                        src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png"
                        alt=""
                      />
                    </div>

                    <div className="prntBtn">
                      <button onClick={() => generatePdf4()}>
                        <span>Print</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeSelf;