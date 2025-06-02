import React, { useEffect, useRef, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { useMain } from "../../../hooks/UseMain";


const EditLead = () => {
  const {
    updateLead,
    getEmployees,
    AllLeadSource,
    AllLeadStatus,
    getLeadStat,
    uploadToCloudinaryImg, getLeadCatgory, getLeadSubCategory,
  } = useMain();

  let userDetail = JSON.parse(localStorage.getItem("hrms_user"));
  const [pop1, setPop1] = useState(false);

  const location = useLocation();

  const item = location?.state;

  const stylePeer = {
    display: pop1 ? "block" : "none",
  };

  const [emp, setEmp] = useState([]);
  const [addCat, setAddCat] = useState(false);

  const [leadCategory, setLeadCategory] = useState([]);
  const [subLeadCategory, setSubLeadCategory] = useState([]);

  const getAllLeadCategory = async () => {
    const res = await getLeadCatgory();
    setLeadCategory(res?.data)
    console.log(res?.data)
  }

  const getAllLeadSubCategory = async () => {
    const res = await getLeadSubCategory();
    setSubLeadCategory(res?.data)
  }

  useEffect(() => {
    getAllLeadCategory();
    getAllLeadSubCategory();
  }, []);

  const [formdata, setFormdata] = useState({
    image: "",
    LeadOwner: "",
    LeadCreator: "",
    Company: "",
    FirstName: "",
    LastName: "",
    Title: "",
    Email: "",
    Phone: "",
    Fax: "",
    Mobile: "",
    Website: "",
    LeadSource: "",
    NoOfEmployee: "",
    Industry: "",
    LeadStatus: "",
    AnnualRevenue: "",
    Rating: "",
    EmailOptOut: "",
    SkypeID: "",
    SecondaryEmail: "",
    Twitter: "",
    Street: "",
    City: "",
    State: "",
    ZipCode: "",
    Country: "",
    DescriptionInfo: "",
    date: "",
    dynamicFields: item?.dynamicFields
  });

  const handleDynamicChange = (key, value) => {
    setFormdata(prev => {
      const updatedDynamicFields = {
        ...prev.dynamicFields,
        [key]: value,
      };
      console.log(`Dynamic field "${key}" changed to:`, value);
      console.log('All dynamicFields now:', updatedDynamicFields);

      return {
        ...prev,
        dynamicFields: updatedDynamicFields,
      };
    });
  };

  const [selectedCategories, setSelectedCategories] = useState([]);


  const navigate = useNavigate();

  const handleImageChange = async (event) => {
    const imageFile = event.target.files[0];

    if (!imageFile || !imageFile.type.match("image/*")) {
      return toast.error("Please select a valid image file.");
    }

    setFormdata((prev) => ({
      ...prev,
      image: imageFile,
    }));

    const resp = await uploadToCloudinaryImg({ image: imageFile });
    setLeadUpLdPro(resp?.data);
  };

  const changeHandler = async (e) => {
    const { name, value } = e.target;

    if (name === "Phone" && value.length > 10) {
      return
    }

    if (name === "Mobile" && value.length > 10) {
      return
    }

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitHandler = async () => {
    const ans = await updateLead({ ...formdata, id: item?._id });
    if (ans?.status) {
      toast.success("Successful Updated");
      navigate("/adminDash/myLead");
    }
  };

  const getOwner = async () => {
    const ans = await getEmployees();
    setEmp(ans?.data);
  };

  const [allLeadStatus, setAllLeadStatus] = useState([]);
  const [allLeadSource, setAllLeadSource] = useState([]);
  const [allleadStat, setAllLeadStat] = useState([]);
  const [leadUpldProf, setLeadUpLdPro] = useState("");
  const fileInputRef = useRef(null);

  const fetchStatus = async () => {
    const ans = await AllLeadStatus();
    setAllLeadStatus(ans?.data);
  };

  const fetchSource = async () => {
    const ans = await AllLeadSource();
    setAllLeadSource(ans?.data);
  };

  const fetchStat = async () => {
    const ans = await getLeadStat();
    setAllLeadStat(ans?.data);
  };

  useEffect(() => {
    fetchStatus();
    fetchSource();
    fetchStat();
  }, []);

  useEffect(() => {
    getOwner();
    setFormdata({
      image: item?.image,
      LeadOwner: item?.LeadOwner?._id,
      LeadCreator: item?.LeadCreator,
      Company: item?.Company,
      FirstName: item?.FirstName,
      LastName: item?.LastName,
      Title: item?.Title,
      Email: item?.Email,
      Phone: item?.Phone,
      Fax: item?.Fax,
      Mobile: item?.Mobile,
      Website: item?.Website,
      LeadSource: item?.LeadSource,
      NoOfEmployee: item?.NoOfEmployee,
      Industry: item?.Industry,
      LeadStatus: item?.LeadStatus,
      AnnualRevenue: item?.AnnualRevenue,
      Rating: item?.Rating,
      EmailOptOut: item?.EmailOptOut,
      SkypeID: item?.SkypeID,
      SecondaryEmail: item?.SecondaryEmail,
      Twitter: item?.Twitter,
      Street: item?.Street,
      City: item?.City,
      State: item?.State,
      ZipCode: item?.ZipCode,
      Country: item?.Country,
      DescriptionInfo: item?.DescriptionInfo,
      date: item?.date,
      dynamicFields: item?.dynamicFields


    });
    if (item?.image) {
      setLeadUpLdPro(item?.image);
    }
  }, [item]);

  const [showAdditionalSetting, setShowAdditionalSetting] = useState(8);

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };
  return (
    <>
      <div className="employee-dash h-full">
       

        <div className="tm">
          <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full">
            <h2 className="font-semibold text-[25px] text-black">Edit Lead</h2>
            <form action="">
              <div
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                className="flex flex-col gap-5 mt-[5px]"
              >
                <div className="w-[80px] h-[80px] flex items-center justify-center border border-[#B3CBF7] rounded-full ml-[11px] bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)]">
                  {leadUpldProf ? (
                    <img src={leadUpldProf.secure_url} alt="" className="leadUpldProf" />
                  ) : (
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748689181/usit_xstnup.png" alt="" onClick={() => setPop1(!pop1)} />
                  )}
                </div>
                <p onClick={triggerFileSelect} className="cursor-pointer text-[16px] font-medium leading-[24px] tracking-[0.0015em] text-left text-blue underline">
                  {" "}
                  {formdata.image ? "Change Image" : "Upload Image"}{" "}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </div>

              <>
              
                  <div
                    id="default-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="hidden tikra overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                    style={stylePeer}
                  >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                      {/* Modal content */}
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className=" p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-xl sini  font-semibold text-gray-900 dark:text-white">
                            Select Image
                          </h3>
                        </div>

                        <div className="selct_div">
                          <div className="upload_io">
                            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748689214/upload_udwuov.svg" alt="" />
                          </div>
                          <div className="upload_an mt-4">
                            <p>Upload an image here</p>
                          </div>
                          <div className="opd mt-4">
                            <div className="browse">
                              <h3>Browse Local Files</h3>
                            </div>
                            <input
                              type="file"
                              onChange={(e) => {
                                handleImageChange(e);
                                setPop1(false);
                              }}
                            />
                          </div>
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"></div>
                      </div>
                    </div>
                  </div>
                {/* </OutsideClickHandler> */}
              </>

              <div className="lead_information bg-white rounded-lg shadow p-2 mt-6">
                <h2 className="text-[18px] font-semibold text-black">Lead Information</h2>

                
                   
                               <div className="flex flex-col xl:flex-row items-start xl:items-center w-full xl:w-[48%] justify-between gap-[8px]">
                                        <label className="min-w-[136px] text-md font-normal" htmlFor="">Lead Owner <span className="text-red-600">*</span></label>
                                        <input 
                                          className="w-full border rounded p-3 text-sm font-normal "
                                        required 
                                        type="LeadOwner" value={userDetail?.fullName} disabled onChange={changeHandler} />
                                    </div>
                   
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 py-5">
                 

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Lead Creator <span className="text-red-600">*</span></label>
                    <input
                      required
                      type="text"
                      value={formdata.LeadCreator}
                      name="LeadCreator"
                      onChange={changeHandler}
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Company <span className="text-red-600">*</span></label>
                    <input
                      required
                      type="text"
                      value={formdata.Company}
                      name="Company"
                      onChange={changeHandler}
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">First Name <span className="text-red-600">*</span></label>
                    <input
                      value={formdata.FirstName}
                      name="FirstName"
                      onChange={changeHandler}
                      type="text"
                     className="w-full border rounded p-3 text-sm font-normal"
                   
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Last Name</label>
                    <input
                      value={formdata.LastName}
                      name="LastName"
                      onChange={changeHandler}
                      type="text"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Title</label>
                    <input
                      value={formdata.Title}
                      name="Title"
                      onChange={changeHandler}
                      type="text"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Email <span className="text-red-600">*</span></label>
                    <input
                      required
                      value={formdata.Email}
                      name="Email"
                      onChange={changeHandler}
                      type="email"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Phone <span className="text-red-600">*</span></label>
                    <PhoneInput
                      inputClass="w-full"
                      country={"in"}
                      id="Phone"
                      value={item?.Phone}
                      name="Phone"
                      className="!w-full"
                      placeholder="Enter your phone"
                      onChange={(phone) => {
                        console.log("phohen", phone);
                        setFormdata((prevState) => ({
                          ...prevState,
                          Phone: phone,
                        }));
                      }}


                      inputProps={{
                        required: true,
                      }}
                      countryCodeEditable={false}
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Fax</label>
                    <input
                      value={formdata.Fax}
                      name="Fax"
                      onChange={changeHandler}
                      type="text"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Mobile</label>
                    <input
                      value={formdata.Mobile}
                      name="Mobile"
                      onChange={changeHandler}
                      type="text"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Lead Source</label>
                    <select name="LeadSource" onChange={changeHandler} id=""  className="w-full border rounded p-3 text-sm font-normal ">
                      <option disabled>Select lead source</option>
                      {allLeadSource?.map((item, index) => (
                        <option key={index} value={item?.name}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">No. of Employees</label>
                    <input
                      value={formdata.NoOfEmployee}
                      name="NoOfEmployee"
                      onChange={changeHandler}
                      type="number"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="Industry" className="min-w-[136px] text-md font-normal">Industry</label>
                    <select
                      value={formdata?.Industry}
                      name="Industry"
                      onChange={changeHandler}
                      id="Industry"
                       className="w-full border rounded p-3 text-sm font-normal "
                    >
                      <option disabled>Select Industry</option>
                      {allLeadStatus?.map((item, index) => (
                        <option key={index} value={item?.name}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Lead Status <span className="text-red-600">*</span></label>
                    <select
                      required
                      value={formdata?.LeadStatus}
                      name="LeadStatus"
                      onChange={changeHandler}
                      id=""
                       className="w-full border rounded p-3 text-sm font-normal "
                    >
                      <option>Select Status</option>
                      {allleadStat?.map((val, index) => {
                        return (
                          <option key={index} value={val?.name}>
                            {val?.name}
                          </option>
                        );
                      })}

                    </select>
                  </div>

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Annual Revenue</label>
                    <input
                      value={formdata.AnnualRevenue}
                      name="AnnualRevenue"
                      onChange={changeHandler}
                      placeholder="$"
                      type="number"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Rating</label>
                    <select name="Rating" onChange={changeHandler} id=""  className="w-full border rounded p-3 text-sm font-normal ">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>


                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px] lead_inp111">
                    <div className="flex items-center gap-2">
                      <label className="jpo min-w-[136px] text-md font-normal" htmlFor="" >
                        Email Opt Out
                      </label>
                      <input
                        value={formdata.EmailOptOut}
                        name="EmailOptOut"
                        onChange={changeHandler}
                     
                        type="checkbox"
                         className="w-full border rounded p-3 text-sm font-normal "
                      />
                    </div>
                  </div>


                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Secondary Email</label>
                    <input
                      value={formdata.SecondaryEmail}
                      name="SecondaryEmail"
                      onChange={changeHandler}
                      type="email"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Date</label>
                    <input
                      value={formdata.date}
                      name="date"
                      onChange={changeHandler}
                      type="date"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>
                </div>

              </div>

              <div className="lead_information bg-white rounded-lg shadow p-2 mt-6">
                <h2 className="text-[18px] font-semibold text-black">Social Links</h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 py-5">
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Twitter</label>
                    <input
                      value={formdata.Twitter}
                      name="Twitter"
                      onChange={changeHandler}
                      type="text"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">LinkedIn Url</label>
                    <input
                      value={formdata?.SkypeID}
                      name="SkypeID"
                      type="text"
                      onChange={changeHandler}
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Website</label>
                    <input
                      value={formdata.Website}
                      name="Website"
                      onChange={changeHandler}
                      type="text"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>
                </div>

              </div>

              <div className="lead_information bg-white rounded-lg shadow p-2 mt-6">
                <h2 className="text-[18px] font-semibold text-black">Address Information</h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 py-5">
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Street</label>
                    <input
                      value={formdata.Street}
                      name="Street"
                      onChange={changeHandler}
                      type="text"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">City</label>
                    <input
                      value={formdata.City}
                      name="City"
                      onChange={changeHandler}
                      type="text"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">State</label>
                    <input
                      value={formdata.State}
                      name="State"
                      onChange={changeHandler}
                      type="text"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Zip Code</label>
                    <input
                      value={formdata.ZipCode}
                      name="ZipCode"
                      onChange={changeHandler}
                      type="Number"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>

                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Country</label>
                    <input
                      value={formdata.Country}
                      name="Country"
                      onChange={changeHandler}
                      type="text"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>
                  <div style={{ visibility: "hidden" }} className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Zip Code</label>
                    <input
                      value={formdata.ZipCode}
                      name="ZipCode"
                      onChange={changeHandler}
                      type="Number"
                       className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>
                </div>

              </div>

              <div className="lead_information bg-white rounded-lg shadow p-2 mt-6">
                <h2 className="text-[18px] font-semibold text-black">Description Information</h2>

                <div className="grid  gap-3 py-5">
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[8px]">
                    <label htmlFor="" className="min-w-[136px] text-md font-normal">Description</label>
                    <input
                      value={formdata.DescriptionInfo}
                      name="DescriptionInfo"
                      onChange={changeHandler}
                      type="text"
                      
                        className="w-full border rounded p-3 text-sm font-normal "
                    />
                  </div>
                </div>
              </div>


              {
                leadCategory.length > 4 && (
                  <div className="lead_information bg-white rounded-lg shadow p-2 mt-6">
                    <h2 className="text-[18px] font-semibold text-black">Additional Fields</h2>
                
                    <div className="border grid grid-cols-4 gap-4 p-4 rounded shadow mt-4">
                      {leadCategory?.slice(4, showAdditionalSetting)?.map((item) => (
                        <div key={item._id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={item?.name}
                            checked={formdata?.dynamicFields?.hasOwnProperty(item?.name)}
                            onChange={(e) => {
                              const { value, checked } = e.target;

                              setFormdata(prev => {
                                if (checked) {
                                  return {
                                    ...prev,
                                    dynamicFields: {
                                      ...prev?.dynamicFields,
                                      [value]: ""
                                    }
                                  };
                                } else {
                                  const { [value]: _, ...rest } = prev?.dynamicFields;
                                  return {
                                    ...prev,
                                    dynamicFields: rest
                                  };
                                }
                              });
                            }}
                          />
                          <label>{item?.name}</label>
                        </div>
                      ))}
                    </div>
                    {/* )} */}
                    {
                      leadCategory.length > 8 ? (
                        showAdditionalSetting === 8 ? <span className="bg-blue-600 cursor-pointer mt-3 inline-block m-auto rounded-md text-white py-1 px-2" onClick={() => setShowAdditionalSetting()}>View All</span> : <span className="bg-blue-600 inline-block mt-3 m-auto cursor-pointer rounded-md text-white py-1 px-2" onClick={() => setShowAdditionalSetting(8)}>View Less</span>
                      ) : null
                    }
                  </div>
                )
              }

              {
                formdata?.dynamicFields && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object?.keys(formdata?.dynamicFields)?.map((key) => (
                      <div key={key} className="flex flex-col space-y-2 mt-4">
                        <label className="font-medium">{key}</label>

                        {subLeadCategory?.filter(sub => sub?.category?.name === key)?.length > 0 ? (

                          <select
                            value={formdata?.dynamicFields[key]}
                            onChange={(e) => handleDynamicChange(key, e.target.value)}
                            className="border p-2 rounded"
                          >
                            <option value="">Select {key}</option>
                            {subLeadCategory
                              .filter(sub => sub?.category?.name === key)
                              .map((sub) => (
                                <option key={sub._id} value={sub.name}>
                                  {sub.name}
                                </option>
                              ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            placeholder={`Enter ${key}`}
                            value={formdata?.dynamicFields[key]}
                            onChange={(e) => handleDynamicChange(key, e.target.value)}
                            className="border p-2 rounded"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )
              }

              <div>
                <button
                  type="button"
                  onClick={submitHandler}
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium mt-3 rounded-md text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditLead;
