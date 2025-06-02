import React, { useEffect, useRef, useState } from "react";

import "react-calendar/dist/Calendar.css";

import { NavLink, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import * as EmailValidator from "email-validator";
import validator from 'validator';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useMain } from "../../hooks/UseMain";




const CreateLead = () => {
    const {createLead, getEmployees, AllLeadSource, AllLeadStatus, getLeadStat, uploadToCloudinaryImg, getLeadCatgory, getLeadSubCategory, } = useMain();
    const [pop1, setPop1] = useState(false);
    const stylePeer = {
        display: pop1 ? "block" : "none"
    }

    let userDetail = JSON.parse(localStorage.getItem("hrms_user"));
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

    const [addCat, setAddCat] = useState(false);

    const [
        formdata, setFormdata] = useState({
            image: null,
            LeadOwner: userDetail?._id,
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
            dynamicFields: {}
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

    const [emp, setEmp] = useState([]);
    const [emailisValid, setIsemailValid] = useState(null);
    const [emailisValid1, setIsemailValid1] = useState(null);

    const handleValidation = () => {
        const valid = EmailValidator.validate(formdata.Email);
        setIsemailValid(valid);
    };

    const handleValidation1 = () => {
        const valid = EmailValidator.validate(formdata.SecondaryEmail);
        setIsemailValid1(valid);
    }
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [isUrlValid, setIsUrlValid] = useState(null);
    const [isUrlValid1, setIsUrlValid1] = useState(null);
    const [isUrlValid2, setIsUrlValid2] = useState(null);

    const handleInputUrlChange = (value) => {
        if (validator.isURL(value)) {
            setIsUrlValid(true);
        } else {
            setIsUrlValid(false);
        }
    };

    const handleInputUrlChange1 = (value) => {
        if (validator.isURL(value)) {
            setIsUrlValid1(true);
        } else {
            setIsUrlValid1(false);
        }
    };

    const handleInputUrlChange2 = (value) => {
        if (validator.isURL(value)) {
            setIsUrlValid2(true);
        } else {
            setIsUrlValid2(false);
        }
    };

    const navigate = useNavigate();

    const [leadUpldProf, setLeadUpLdPro] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = async (event) => {
        const imageFile = event.target.files[0];

        if (!imageFile || !imageFile.type.match('image/*')) {
            return toast.error('Please select a valid image file.');
        }

        setFormdata((prev) => ({
            ...prev,
            image: imageFile
        }))

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
        let toastId;
       
        if (!formdata.Company || !formdata.FirstName || !formdata.Email || !formdata.Phone) {
            toast.dismiss(toastId);
            return toast.error("Please fill in all required fields.");
        }




        if (emailisValid === false && formdata.Email !== "") {
            toast.dismiss(toastId);
            return toast.error("Please Enter Correct Gmail")
        }
       
        console.log(formdata)
        const ans = await createLead({ ...formdata });
        toastId = toast.loading("Loading...");
        if (ans?.status) {
            toast.success("Successful created");
            navigate("/adminDash/myLead")
            setFormdata({
                LeadOwner: userDetail?._id,
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
                date: ""
            })
        }

        toast.dismiss(toastId);
    }

    const getOwner = async () => {
        const ans = await getEmployees();
        setEmp(ans?.data);

    }

    useEffect(() => {
        getOwner();
    }, [])


    const [allLeadStatus, setAllLeadStatus] = useState([]);
    const [allLeadSource, setAllLeadSource] = useState([]);
    const [allleadStat, setAllLeadStat] = useState([]);

    const fetchStatus = async () => {
        const ans = await AllLeadStatus();
        setAllLeadStatus(ans?.data);
    }

    const fetchSource = async () => {
        const ans = await AllLeadSource();
        setAllLeadSource(ans?.data);
    }

    const fetchStat = async () => {
        const ans = await getLeadStat();
        setAllLeadStat(ans?.data);
    }

    useEffect(() => {
        fetchStatus();
        fetchSource();
        fetchStat();
    }, []);

    const [showAdditionalSetting, setShowAdditionalSetting] = useState(8);

    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        console.log("leaddddddd", leadUpldProf)
    }, [leadUpldProf])

    return (
        <>
            <div className="employee-dash h-full">
              

                <div className="tm">
                   

                    <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full">

                        <div className="py-[10px] fixed bg-white w-full justify-end left-0 top-[81px] h-[81px] flex">
                            <div className="flex items-center gap-[10px] mr-[20px]">
                                <NavLink to={`${userDetail?.role === "ADMIN" ? "/adminDash/myLead" : "/employeeDash/myLead"} `}><button className="bg-[#E8E9EB] border border-[#B8BBC0] w-[70px] h-[40px] font-[500] text-[16px] text-[#666D76] rounded-[5px]">Back</button></NavLink>

                                <button onClick={submitHandler} type="button" className="bg-[#0B56E4] text-white font-[500] font-inter text-[18px] w-[120px] h-[40px] rounded-[5px]">Submit</button>

                            </div>

                        </div>

                        <form className="mt-[55px] " action="">

                            <div data-modal-target="default-modal"
                                data-modal-toggle="default-modal" className="flex flex-col gap-[20px] mt-[5px]">
                                <div className="w-[80px] h-[80px] flex items-center justify-center border border-[#B3CBF7] rounded-full bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)] ml-[11px]">

                                   
                                    {leadUpldProf ? (
                                        <img src={leadUpldProf.secure_url} alt="Preview" className="leadUpldProf" onClick={triggerFileSelect} />
                                    ) : (
                                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748689181/usit_xstnup.png" alt="Placeholder" onClick={triggerFileSelect} />
                                    )}

                                </div>

                                <p onClick={triggerFileSelect} className="cursor-pointer text-[16px] font-[500] leading-[24px] tracking-[0.0015em] text-left text-blue-500 underline">
                                    {formdata.image ? "Change Image" : "Upload Image"}
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
                                                {/* Modal header */}
                                                <div className=" p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                    <h3 className="text-xl sini  font-semibold text-gray-900 dark:text-white">
                                                        Select Image
                                                    </h3>
                                                </div>
                                                {/* Modal body */}
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
                                                        <input type="file" onChange={(e) => {
                                                            handleImageChange(e);
                                                            setPop1(false);
                                                        }} />
                                                    </div>

                                                </div>
                                                {/* Modal footer */}
                                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                             
                            </>

                            <div className="lead_information mt-6 bg-white rounded-lg shadow p-2">
                                <h2 className="text-[18px] font-semibold text-black">Lead Information</h2>

                               <div className="flex flex-col xl:flex-row items-start xl:items-center w-full xl:w-[48%] justify-between gap-[8px]">
                                        <label className="min-w-[136px] text-md font-normal" htmlFor="">Lead Owner <span className="text-red-600">*</span></label>
                                        <input 
                                          className="w-full border rounded p-3 text-sm font-normal "
                                        required 
                                        type="LeadOwner" value={userDetail?.fullName} disabled onChange={changeHandler} />
                                    </div>
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 py-5">

                                    

                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">Lead Creator <span className="text-red-600">*</span></label>
                                        <input  className="w-full border rounded p-3 text-sm font-normal" required type="text" value={formdata.LeadCreator} name="LeadCreator" onChange={changeHandler} />
                                    </div>
                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">Company <span className="text-red-600">*</span></label>
                                        <input className="w-full border rounded p-3 text-sm font-normal" required type="text" value={formdata.Company} name="Company" onChange={changeHandler} />
                                    </div>

                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">First Name <span className="text-red-600">*</span></label>

                                        <input value={formdata.FirstName} name="FirstName" onChange={changeHandler} type="text" className="w-full border rounded p-3 text-sm font-normal" />

                                    </div>


                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">Last Name</label>
                                        <input className="w-full border rounded p-3 text-sm font-normal" value={formdata.LastName} name="LastName" onChange={changeHandler} type="text" />
                                    </div>

                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">Title</label>
                                        <input className="w-full border rounded p-3 text-sm font-normal" value={formdata.Title} name="Title" onChange={changeHandler} type="text" />
                                    </div>
                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">Email <span className="text-red-600">*</span></label>
                                      <input
  className={`w-full border rounded p-3 text-sm font-normal ${
    emailisValid === false && formdata.Email !== "" ? "emailvalidinput" : ""
  }`}
  required
  value={formdata.Email}
  name="Email"
  onChange={(e) => {
    changeHandler(e);
    handleValidation(e.target.value);
  }}
  type="email"
/>

                                    </div>

                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor=""  className="text-md font-normal min-w-[136px]">Phone <span className="text-red-600">*</span></label>
                                        <PhoneInput
                                            inputClass="hjj"
                                            country={'in'}
                                            id="Phone"
                                            value={formdata?.Phone}
                                            name="Phone"
                                            placeholder="Enter your phone"
                                            onChange={Phone => changeHandler({ target: { value: Phone, name: 'Phone' } })}
                                            className="!w-[100%]"
                                            inputProps={{
                                                required: true,
                                            }}
                                            countryCodeEditable={false}
                                           
                                        />
                                    </div>

                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">Fax</label>
                                        <input value={formdata.Fax} name="Fax" onChange={changeHandler} type="text" className="w-full border rounded p-3 text-sm font-normal"/>
                                    </div>


                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor=""  className="text-md font-normal min-w-[136px]">Mobile</label>
                                        <input
                                            value={formdata.Mobile}
                                            name="Mobile"
                                            onChange={changeHandler}
                                            type="text"
                                            className="w-full border rounded p-3 text-sm font-normal"
                                        />
                                    </div>

                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor=""  className="text-md font-normal min-w-[136px]">Annual Revenue</label>
                                        <input value={formdata.AnnualRevenue} name="AnnualRevenue" onChange={changeHandler} placeholder="$" type="number"className="w-full border rounded p-3 text-sm font-normal" />
                                    </div>
                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor=""  className="text-md font-normal min-w-[136px]">Rating</label>
                                        <select name="Rating" onChange={changeHandler} id="" className="w-full border rounded p-3 text-sm font-normal">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px] lead_inp111">
                                        <div className="flex items-center gap-2">
                                            <label className="jpo text-md font-normal min-w-[136px]" htmlFor="">Email Opt Out</label>
                                            <input value={formdata.EmailOptOut} name="EmailOptOut" onChange={changeHandler} className="seng w-full border rounded p-3 text-sm font-normal" type="checkbox" />
                                        </div>
                                    </div>
                                   <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                 <label htmlFor="" className="text-md font-normal min-w-[136px]">Secondary Email</label>
        <input
    type="email"
    name="SecondaryEmail"
    value={formdata.SecondaryEmail}
    onChange={(e) => {
      changeHandler(e);
      handleValidation1(e.target.value);
    }}
    className={`w-full border rounded p-3 text-sm font-normal ${
      emailisValid1 === false && formdata.SecondaryEmail !== "" ? "emailvalidinput" : ""
    }`}
  />
</div>


                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">Date</label>
                                        <input value={formdata.date} name="date" onChange={changeHandler} type="date"   className="w-full border rounded p-3 text-sm font-normal"/>
                                    </div>

                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="Industry" className="jpo text-md font-normal min-w-[136px]">Industry</label>
                                        <select value={formdata?.Industry} name="Industry" onChange={changeHandler} id="Industry"   className="w-full border rounded p-3 text-sm font-normal">
                                            <option disabled>Select Industry</option>
                                            {
                                                allLeadStatus?.map((item, index) => (
                                                    <option key={index} value={item?.name}>{item?.name}</option>
                                                ))
                                            }

                                        </select>
                                    </div>

                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">Lead Status <span className="text-red-600">*</span></label>
                                        <select required value={formdata?.LeadStatus} name="LeadStatus" onChange={changeHandler} id="" className="w-full border rounded p-3 text-sm font-normal">
                                            <option >Select Status</option>
                                            {
                                                allleadStat?.map((val, index) => {
                                                    return <option key={index} value={val?.name}>{val?.name}</option>
                                                })
                                            }
                                           


                                        </select>
                                    </div>

                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">Lead Source</label>
                                        <select name="LeadSource" onChange={changeHandler} id="" className="w-full border rounded p-3 text-sm font-normal">
                                            <option>Select lead source</option>
                                            {
                                                allLeadSource?.map((item, index) => (
                                                    <option key={index} value={item?.name}>{item?.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                </div>

                            </div>

                            <div className="lead_information bg-white rounded-lg shadow p-2 mt-6">
                                <h2 className="text-[18px] font-semibold text-black">Social Links</h2>

                                <div className="grid grid-cols xl:grid-cols-2 gap-3 py-5">
                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">LinkedIn URL</label>
                                    <input
  value={formdata?.SkypeID}
  name="SkypeID"
  type="text"
  onChange={(e) => {
    changeHandler(e);
    handleInputUrlChange1(e.target.value);
  }}
  className={`w-full border rounded p-3 text-sm font-normal min-w-[136px] ${
    isUrlValid1 === false && formdata.SkypeID !== "" ? "emailvalidinput" : ""
  }`}
/>


                                    </div>
                                   <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
  <label htmlFor="" className="text-md font-normal min-w-[136px]">Twitter</label>
  <input
    type="text"
    name="Twitter"
    value={formdata.Twitter}
    onChange={(e) => {
      changeHandler(e);
      handleInputUrlChange2(e.target.value);
    }}
    className={`w-full border rounded p-3 text-sm font-normal ${isUrlValid2 === false && formdata.Twitter !== "" ? "emailvalidinput" : ""}`}
  />
</div>


                                   <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
  <label htmlFor="" className="text-md font-normal min-w-[136px]">Website</label>
  <input
    value={formdata.Website}
    name="Website"
    onChange={(e) => {
      changeHandler(e);
      handleInputUrlChange(e.target.value);
    }}
    type="text"
    className={`w-full border rounded p-3 text-sm font-normal ${isUrlValid === false && formdata.Website !== "" ? "emailvalidinput" : ""}`}
  />
</div>

                                </div>
                            </div>

                            <div className="lead_information mt-6  bg-white rounded-lg shadow p-2">
                                <h2 className="text-[18px] font-semibold text-black">Address Information</h2>

                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 py-5">
                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">Street</label>
                                        <input value={formdata.Street} name="Street" onChange={changeHandler} type="text" className="w-full border rounded p-3 text-sm font-normal"/>
                                    </div>
                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">City</label>
                                        <input value={formdata.City} name="City" onChange={changeHandler} type="text" className="w-full border rounded p-3 text-sm font-normal"/>
                                    </div>
                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">State</label>
                                        <input value={formdata.State} name="State" onChange={changeHandler} type="text" className="w-full border rounded p-3 text-sm font-normal"/>
                                    </div>
                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">Zip Code</label>
                                        <input value={formdata.ZipCode} name="ZipCode" onChange={changeHandler} type="Number" className="w-full border rounded p-3 text-sm font-normal"/>
                                    </div>
                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">Country</label>
                                        <input value={formdata.Country} name="Country" onChange={changeHandler} type="text" className="w-full border rounded p-3 text-sm font-normal"/>
                                    </div>
                                    <div style={{ visibility: "hidden" }} className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="" className="text-md font-normal min-w-[136px]">Zip Code</label>
                                        <input value={formdata.ZipCode} name="ZipCode" onChange={changeHandler} type="Number" className="w-full border rounded p-3 text-sm font-normal"/>
                                    </div>
                                </div>

                            </div>

                            <div className="lead_information mt-6 bg-white rounded-lg shadow p-2">
                                <h2 className="text-[18px] font-semibold text-black">Description Information</h2>

                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 py-5">
                                    <div className="flex flex-col xl:flex-row items-start xl:items-center  justify-between gap-[8px]">
                                        <label htmlFor="">Description</label>
                                        <input value={formdata.DescriptionInfo} name="DescriptionInfo" onChange={changeHandler} type="text" className="w-full border rounded p-3 text-sm font-normal" />
                                    </div>
                                </div>

                            </div>


                            {
                                leadCategory.length > 4 && (
                                    <div className="lead_information mt-6 bg-white rounded-lg shadow p-2">
                                        <h2 className="text-[18px] font-semibold text-black">Additional Fields</h2>
                                  
                                        <div className="border grid grid-cols-4 gap-4 p-4 rounded shadow mt-4">
                                            {leadCategory.slice(4, showAdditionalSetting).map((item) => (
                                                <div key={item._id} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        value={item.name}
                                                        checked={selectedCategories.includes(item?.name)}
                                                        onChange={(e) => {
                                                            const { value, checked } = e.target;

                                                            if (checked) {
                                                                setSelectedCategories(prev => [...prev, value]);
                                                            } else {
                                                                setSelectedCategories(prev => prev.filter(name => name !== value));
                                                            }


                                                            setFormdata(prev => {
                                                                if (checked) {
                                                                    return {
                                                                        ...prev,
                                                                        dynamicFields: {
                                                                            ...prev.dynamicFields,
                                                                            [value]: ""
                                                                        }
                                                                    };
                                                                } else {
                                                                    const { [value]: _, ...rest } = prev.dynamicFields;
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
                                        {
                                            leadCategory.length > 8 ? (
                                                showAdditionalSetting === 8 ? <span className="bg-blue-600 cursor-pointer mt-3 inline-block m-auto rounded-md text-white py-1 px-2" onClick={() => setShowAdditionalSetting()}>View All</span> : <span className="bg-blue-600 inline-block mt-3 m-auto cursor-pointer rounded-md text-white py-1 px-2" onClick={() => setShowAdditionalSetting(8)}>View Less</span>
                                            ) : null
                                        }



                                        {/* )} */}
                                    </div>
                                )
                            }

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {(Object.keys(formdata.dynamicFields))?.map((key) => (
                                    <div key={key} className="flex flex-col space-y-2 mt-4">
                                        <label className="font-semibold text-lg">{key}</label>
                                        {subLeadCategory.filter(sub => sub?.category?.name === key).length > 0 ? (
                                            <select
                                                value={formdata.dynamicFields[key]}
                                                onChange={(e) => handleDynamicChange(key, e.target.value)}
                                                className="border p-2 rounded"
                                            >
                                                <option value="">Select {key}</option>
                                                {subLeadCategory
                                                    .filter(sub => sub?.category?.name === key)
                                                    .map((sub) => (
                                                        <option key={sub._id} value={sub?.name}>
                                                            {sub.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                placeholder={`Enter ${key}`}
                                                value={formdata.dynamicFields[key]}
                                                onChange={(e) => handleDynamicChange(key, e.target.value)}
                                                className="border p-2 rounded"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>





                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateLead;