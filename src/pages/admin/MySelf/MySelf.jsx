import React, { useEffect, useRef, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useReactToPrint } from "react-to-print";
import { NavLink } from "react-router-dom";
import { useMain } from "../../../hooks/UseMain";

const MySelf = ({ setAlert, pop1, setPop1 }) => {
  // =================punch in punch out concept==========
  const { postActivity, getStatisticsByUser, getMyOfferLetter } = useMain();

  const [user, setUser] = useState();
  const [curenpage, setCurrPage] = useState("Document");
  let user1 = JSON?.parse(localStorage.getItem("hrms_user"));
  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  let role = (JSON.parse(localStorage.getItem('hrms_token')))?.role

  const [offerContent, setOfferContent] = useState(``);
  const [reliveContent, setReliveContent] = useState(``);
  const [internOffer, setInternOffer] = useState(``);
  const [experienceContent, setExperienceContent] = useState(``);
  const [internshipContent, setinternshipContent] = useState(``);

  const contonentPDF = useRef();
  const contonentPDF2 = useRef();
  const contonentPDF3 = useRef();
  const contonentPDF4 = useRef();

  const generatePdf = useReactToPrint({
    content: () => contonentPDF.current,
    documentTitle: "Quotation",
    parentContainer: {
      "@media print": {
        display: "block",
      },
    },
  });

  const generatePdf2 = useReactToPrint({
    content: () => contonentPDF2.current,
    documentTitle: "Quotation",
    parentContainer: {
      "@media print": {
        display: "block",
      },
    },
  });
  const generatePdf3 = useReactToPrint({
    content: () => contonentPDF3.current,
    documentTitle: "Quotation",
    parentContainer: {
      "@media print": {
        display: "block",
      },
    },
  });
  const generatePdf4 = useReactToPrint({
    content: () => contonentPDF4.current,
    documentTitle: "Quotation",
    parentContainer: {
      "@media print": {
        display: "block",
      },
    },
  });

  const getOfferletter = async () => {
    const ans = await getMyOfferLetter(user1?._id);
    if (ans?.status) {
      setOfferContent(ans?.data?.createletter[0]?.content);
      setReliveContent(ans?.data?.relivingLetter[0]?.content);
      setExperienceContent(ans?.data?.expeletter[0]?.content);
      setinternshipContent(ans?.data?.internLetter[0]?.content);
    }
  };

  useEffect(() => {
    setUser(hrms_user);
    getOfferletter();

  }, []);

  useEffect(() => {
    const removeYellowBackground = (content) => {
      // Use a regular expression to remove the background: yellow; style
      return content?.replace(/background:\s*yellow\s*;?/gi, "");
    };

    if (offerContent) {
      setOfferContent(removeYellowBackground(offerContent));
    }

    if (reliveContent) {
      setReliveContent(removeYellowBackground(reliveContent));
    }

    if (experienceContent) {
      setExperienceContent(removeYellowBackground(experienceContent));
    }
  }, [offerContent, reliveContent, experienceContent]);

  return (
    <>
      <div className="flex relative bg-[#f5f5f5] h-full">

        <div className="w-full bg-[#f5f5f5] relative">

          <nav className="w-full lg:w-full flex flex-col md:flex-row items-start md:items-center justify-between bg-white md:sticky top-0 right-0 left-0 px-5 md:px-[40px] py-[18px] md:py-[25px] z-20 gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 w-full md:w-auto">
              <h2 className="text-[#101820] text-[20px] sm:text-[24px] font-semibold leading-[32px] whitespace-nowrap px-[5px]">
                My self
              </h2>
              <select
                className="w-full sm:w-[170px] h-[40px] border border-[#0B56E4] 
      bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)] 
      text-[#0B56E4] text-[16px] font-medium leading-[24px] tracking-[0.005em] 
      outline-none rounded-[8px] px-[5px]"
                value={curenpage}
                onChange={(e) => setCurrPage(e.target.value)}
              >
                <option value="Document">Document</option>
                <option value="Offer Letter">Offer Letter</option>
                <option value="Relieving Letter">Relieving Letter</option>
                <option value="Experience Letter">Experience Letter</option>
                <option value="Internship Letter">Internship Letter</option>
              </select>
            </div>

            <NavLink
              to={`${user1?.role === "ADMIN" ? "/adminDash/profile" : "/employeeDash/profile"}`}
              className="bg-blue-700 text-white py-2 px-4 rounded-md flex justify-center items-center self-start md:self-center"
            >
              Edit Profile
            </NavLink>
          </nav>

          <div className="w-full relative  md:mt-[0px] pt-[32px] pr-[20px] pb-[32px] pl-[27px] md:pl-[20px] flex flex-col gap-[20px]">

            {curenpage === "Document" && (
              <>

                <div
                  id="marginTop"
                  className="w-full px-5 pt-5 pb-[30px] rounded-[18px] bg-white border border-[#E8E9EB] flex flex-col gap-5"
                >
                  <h3 className="text-[#101820] text-base md:text-lg font-bold leading-6 tracking-[0.0015em] text-left">
                    Employee Detail
                  </h3>

                  <hr />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="text-[#1B2533] text-sm font-normal leading-5 tracking-[0.0025em] w-full sm:w-[140px] text-left">
                        Employee ID :
                      </p>
                      <span className="text-[#1B2533] text-sm font-medium leading-6 tracking-[0.005em] text-left">
                        KDS{user1?.employeeCode || 'N/A'}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="text-[#1B2533] text-sm font-normal leading-5 tracking-[0.0025em] w-full sm:w-[140px] text-left">
                        Name :
                      </p>
                      <span className="text-[#1B2533] text-sm font-medium leading-6 tracking-[0.005em] text-left">
                        {user1?.fullName}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="text-[#1B2533] text-sm font-normal leading-5 tracking-[0.0025em] w-full sm:w-[140px] text-left">
                        Department :
                      </p>
                      <span className="text-[#1B2533] text-sm font-medium leading-6 tracking-[0.005em] text-left">
                        {user1?.department}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="text-[#1B2533] text-sm font-normal leading-5 tracking-[0.0025em] w-full sm:w-[140px] text-left">
                        Designation :
                      </p>
                      <span className="text-[#1B2533] text-sm font-medium leading-6 tracking-[0.005em] text-left">
                        {user1?.designation}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="text-[#1B2533] text-sm font-normal leading-5 tracking-[0.0025em] w-full sm:w-[140px] text-left">
                        Date of Joining :
                      </p>
                      <span className="text-[#1B2533] text-sm font-medium leading-6 tracking-[0.005em] text-left">
                        {user1?.joiningDate}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="text-[#1B2533] text-sm font-normal leading-5 tracking-[0.0025em] w-full sm:w-[140px] text-left">
                        Date of Birth :
                      </p>
                      <span className="text-[#1B2533] text-sm font-medium leading-6 tracking-[0.005em] text-left">
                        {user1?.dob}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="text-[#1B2533] text-sm font-normal leading-5 tracking-[0.0025em] w-full sm:w-[140px] text-left">
                        Office Email :
                      </p>
                      <span className="text-[#1B2533] text-sm font-medium leading-6 tracking-[0.005em] text-left">
                        {user1?.email}
                      </span>
                    </div>
                  </div>
                </div>


                <div className="w-full px-5 pt-5 pb-[30px] rounded-[18px] bg-white border border-[#E8E9EB] flex flex-col gap-5">
                  <h3 className="text-[#101820] text-base md:text-lg font-bold leading-6 tracking-[0.0015em] text-left">
                    Other Detail
                  </h3>

                  <hr />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    {[
                      ['Address', user1?.currentAddress],
                      ['Mobile', user1?.mobile],
                      ['Personal ID', user1?.email1],
                      ['Gender', user1?.gender],
                      ['Pan Number', user1?.pan],
                      ['Adhar Number', user1?.adhar],
                      ['Father Name', user1?.father],
                      ['Current Address', user1?.currentAddress],
                      ['Current State', user1?.currentState],
                      ['Current City', user1?.currentCity],
                      ['Area Pincode', user1?.currentPin],
                      ['Permanent Address', user1?.residence],
                      ['Permanent State', user1?.perState],
                      ['Permanent City', user1?.perCity],
                      ['Permanent Pin', user1?.perPin],
                      ['Marital status', user1?.Martial],
                      ['Nationality', user1?.nationality],
                      ['Mother name', user1?.Mother]
                    ].map(([label, value]) => (
                      <div key={label} className="flex flex-col sm:flex-row sm:items-center">
                        <p className="text-[#1B2533] text-sm font-normal leading-5 tracking-[0.0025em] w-full sm:w-[140px] text-left">
                          {label} :
                        </p>
                        <span className="text-[#1B2533] text-sm font-medium leading-6 tracking-[0.005em] text-left">
                          {value || 'N/A'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full px-5 pt-5 pb-[30px] rounded-[18px] bg-white border border-[#E8E9EB] flex flex-col gap-5">
                  <h3 className="text-[#101820] text-base md:text-lg font-bold leading-6 tracking-[0.0015em] text-left">
                    Document Upload
                  </h3>

                  <hr />

                  <div className="w-full flex flex-wrap gap-6">
                    {user1?.document?.map((item, index) => (
                      <div key={index} className="w-full sm:max-w-[48%] md:max-w-[45%] lg:max-w-[32%] flex flex-col gap-5 border border-[#E8E9EB] p-4 rounded-[12px]">
                        {/* Document Info */}
                        <div className="flex items-start gap-4">
                          <a target="_blank" href={item?.url} rel="noopener noreferrer">
                            <img
                              src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746787207/docu_dn5g3q.png"
                              alt="document icon"
                              className="w-[40px] h-[40px] object-contain"
                            />
                          </a>

                          <div className="flex flex-col gap-1">
                            <a target="_blank" href={item?.url} rel="noopener noreferrer">
                              <p className="text-[#101820] font-semibold text-[14px] leading-[20px] tracking-wide">
                                {item.name === "twevelCert"
                                  ? "Twelfth Certificate"
                                  : item?.name === "tenCert"
                                    ? "Tenth Certificate"
                                    : item?.name}
                              </p>
                            </a>
                            <a target="_blank" href={item?.url} rel="noopener noreferrer">
                              <p className="text-[#666D76] text-sm font-normal leading-[24px] tracking-[0.005em] break-all">
                                {(item?.url)?.slice(50, 80)}
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full p-5 rounded-[18px] bg-white border border-[#E8E9EB] flex flex-col gap-5">
                  <h3 className="text-[#101820] text-[16px] md:text-[18px] font-bold leading-[24px] tracking-[0.0015em]">
                    Bank Account Detail
                  </h3>

                  <hr />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <p className="w-[140px] text-[#1B2533] text-[14px] font-normal leading-[20px]">
                        Salary Pay Mode:
                      </p>
                      <span className="text-[#1B2533] text-[14px] font-medium leading-[24px]">
                        {user1?.SalaryPay}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <p className="w-[140px] text-[#1B2533] text-[14px] font-normal leading-[20px]">
                        Account No:
                      </p>
                      <span className="text-[#1B2533] text-[14px] font-medium leading-[24px]">
                        {user1?.AccountNumber}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <p className="w-[140px] text-[#1B2533] text-[14px] font-normal leading-[20px]">
                        Bank Name:
                      </p>
                      <span className="text-[#1B2533] text-[14px] font-medium leading-[24px]">
                        {user1?.SalaryBankName}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <p className="w-[140px] text-[#1B2533] text-[14px] font-normal leading-[20px]">
                        Beneficiary Name:
                      </p>
                      <span className="text-[#1B2533] text-[14px] font-medium leading-[24px]">
                        {user1?.BeneficiaryName}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <p className="w-[140px] text-[#1B2533] text-[14px] font-normal leading-[20px]">
                        Branch IFSC Code:
                      </p>
                      <span className="text-[#1B2533] text-[14px] font-medium leading-[24px]">
                        {user1?.BankIfsc}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <p className="w-[140px] text-[#1B2533] text-[14px] font-normal leading-[20px]">
                        Bank Branch Name:
                      </p>
                      <span className="text-[#1B2533] text-[14px] font-medium leading-[24px]">
                        {user1?.Branch}
                      </span>
                    </div>
                  </div>
                </div>

              </>
            )}

            {curenpage === "Offer Letter" && (
              <div>
                <div ref={contonentPDF} className="w-[95%] bg-white rounded-[18px] p-[20px] mt-[65px]">
                  <img className="offer_header11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png" alt="" />
                  <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px] text-center">OFFER LETTER</h2>

                  <div className="font-wrapper p-4">
                    <div
                      className="py-2 px-7"
                      dangerouslySetInnerHTML={{ __html: offerContent }}
                    />
                    <img className="offer_footer11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png" alt="" />
                  </div>


                </div>

                <div className="w-full flex mt-[20px] mb-0 ml-[-20px] justify-end gap-[20px]">
                  <button className="w-[80px] h-[40px] rounded-[10px] bg-[#0B56E4]" onClick={() => generatePdf()}>
                    <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-white">Print</span>
                  </button>
                </div>

              </div>
            )}
            {curenpage === "Relieving Letter" && (
              <div>
                <div ref={contonentPDF2} >
                  <div className="w-[95%] bg-white rounded-[18px] p-[20px] mt-[65px]">
                    <img className="offer_header11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png" alt="" />
                    <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px] text-center">RELIEVING LETTER</h2>

                    <div className=" p-4">
                      <div className="py-2 px-7" dangerouslySetInnerHTML={{ __html: reliveContent }} />
                    </div>
                    <img className="offer_footer11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png" alt="" />


                  </div>


                </div>

                <div className="w-full flex mt-[20px] mb-0 ml-[-20px] justify-end gap-[20px]">
                  <button className="w-[80px] h-[40px] rounded-[10px] bg-[#0B56E4]" onClick={() => generatePdf2()}>
                    <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-white">Print</span>
                  </button>
                </div>
              </div>
            )}

            {curenpage === "Experience Letter" && (
              <div>
                <div ref={contonentPDF3} className="w-[95%] bg-white rounded-[18px] p-[20px] mt-[65px]">
                  <img className="offer_header11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png" alt="" />
                  <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px] text-center">EXPERIENCE LETTER</h2>

                  <div className="p-4">
                    <div className="py-2 px-7"
                      dangerouslySetInnerHTML={{ __html: experienceContent }}
                    />
                  </div>
                  <img className="offer_footer11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png" alt="" />


                </div>

                <div className="w-full flex mt-[20px] mb-0 ml-[-20px] justify-end gap-[20px]">
                  <button className="w-[80px] h-[40px] rounded-[10px] bg-[#0B56E4]" onClick={() => generatePdf3()}>
                    <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-white">Print</span>
                  </button>
                </div>
              </div>
            )}

            {curenpage === "Internship Letter" && (
              <div>
                <div ref={contonentPDF4} className="w-[95%] bg-white rounded-[18px] p-[20px] mt-[65px]">
                  <img className="offer_header11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png" alt="" />
                  <h2>INTERNSHIP LETTER</h2>

                  <div className="p-4">
                    <div className="py-2 px-7"
                      dangerouslySetInnerHTML={{ __html: internshipContent }}
                    />
                  </div>
                  <img className="offer_footer11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png" alt="" />


                </div>

                <div className="w-full flex mt-[20px] mb-0 ml-[-20px] justify-end gap-[20px]">
                  <button className="w-[80px] h-[40px] rounded-[10px] bg-[#0B56E4]" onClick={() => generatePdf4()}>
                    <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-white">Print</span>
                  </button>
                </div>
              </div>
            )}

            {
              setCurrPage === "Intenship Offer Letter" &&
              (
                <div>

                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default MySelf;
