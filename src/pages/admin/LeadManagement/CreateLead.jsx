import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useNavigate, NavLink } from "react-router-dom";

import OutsideClickHandler from "react-outside-click-handler";

import toast from "react-hot-toast";
import * as EmailValidator from "email-validator";
import validator from 'validator';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useMain } from "../../../hooks/UseMain";


const CreateLead2 = ({ setAlert, pop, setPop }) => {
    const { user, createLead, getEmployees, AllLeadSource, AllLeadStatus, getLeadStat, uploadToCloudinaryImg } = useMain();
    const [pop1, setPop1] = useState(false);
    const stylePeer = {
        display: pop1 ? "block" : "none"
    }

    let userDetail = JSON.parse(localStorage.getItem("hrms_user"));

    const [emp, setEmp] = useState([]);

    const [formdata, setFormdata] = useState({
        image: "",
        LeadOwner: userDetail?._id,
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
        date:""
    });

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

    const [leadUpldProf, setLeadUpLdPro] = useState("");


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
        console.log(resp)
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
        const toastId = toast.loading("Loading...");
        if (emailisValid === false && formdata.Email !== "") {
            toast.dismiss(toastId);
            return toast.error("Please Enter Correct Email")
        }
        if (emailisValid1 === false && formdata.SecondaryEmail !== "") {
            toast.dismiss(toastId);
            return toast.error("Please Enter Correct Gmail")
        }
        if (isUrlValid === false && formdata.Website !== "") {
            toast.dismiss(toastId);
            return toast.error("Please Enter Correct Website Link")
        }
        if (isUrlValid1 === false && formdata.SkypeID !== "") {
            toast.dismiss(toastId);
            return toast.error("Please Enter Correct Linkedin Url")
        }

        if (isUrlValid2 === false && formdata.Twitter !== "") {
            toast.dismiss(toastId);
            return toast.error("Please Enter Correct Twitter Url")
        }
        const ans = await createLead({ ...formdata });
        if (ans?.status) {
            navigate("/employeeDash/myLead")
            setFormdata({
                LeadOwner: userDetail?._id,
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
                DescriptionInfo: "" , 
                date:""
            })

            toast.success("Successfuly submit");
        }

        toast.dismiss(toastId);
    }

    const getOwner = async () => {
        const ans = await getEmployees();
        console.log(ans?.data);
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
    }, [])

    return (
        <>
            <div className="flex relative bg-gray-100 h-full">
             

                <div className="w-full bg-gray-100">
             

                    <div className="pt-8 pr-5 pb-8 pl-14 mt-17 relative w-full">

                       

<div className="items-center justify-between fixed top-20 left-0 w-full h-20 bg-white z-10 flex justify-end p-2">  
                            <div className="flex items-center gap-2 mr-5">
                                <NavLink to="/adminDash/myLead"><button className="bg-[#E8E9EB] border border-[#B8BBC0] w-16 h-10 font-medium text-[#666D76] rounded-sm text-base">Back</button></NavLink>

                                <button onClick={submitHandler} type="button" className="bg-[#0B56E4] text-white font-inter font-medium text-lg w-[120px] border-none">Submit</button>

                            </div>

                        </div>

                        <form action="" className="mt-24">
                            <div data-modal-target="default-modal"
                                data-modal-toggle="default-modal" className="flex flex-col gap-5 mt-1">
                                <div className="w-20 h-20 flex items-center justify-center border border-[#B3CBF7] rounded-full bg-gradient-to-r from-[#D1E8FD] via-[#EDEFFF] ml-3">

                                    {
                                        leadUpldProf ? <img src={leadUpldProf} alt="" className="w-full h-full rounded-full" /> :
                                         
                                            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746601296/usit_psm4or.png" alt="usit" />
                                    }

                                </div>
                                <p onClick={() => setPop1(!pop1)} className="cursor-pointer text-base font-medium leading-6 tracking-tighter text-blue-700 underline"> {formdata.image ? "Change Image" : "Upload Image"} </p>

                            </div>

                            <>

                                {/* Main modal */}
                                <OutsideClickHandler
                                    onOutsideClick={() => {
                                        setPop1(false);
                                    }}
                                >
                                    <div
                                        id="default-modal"

                                        tabIndex={-1}
                                        aria-hidden="true"
                                        className="hidden fixed top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[800px] w-full overflow-y-auto overflow-x-hidden right-0 left-0 z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
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
                                                <div className="!max-w-[736px] !w-full !h-[176px] !border-2 !border-dashed !border-[#8FB1F3] !flex !flex-col !items-center !justify-center !bg-[#F8F9FB] !rounded-lg mx-auto">
                                                    <div className="upload_io">
                                                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746601348/upload_iicz0b.svg" alt="" />
                                                    </div>
                                                    <div className="mt-4">
                                                        <p className="text-[#1B2533] text-base font-medium">Upload an image here</p>
                                                    </div>
                                                    <div className="flex items-center justify-center flex-col relative mt-4">
                                                        <div className="w-[175px] h-[40px] rounded-lg flex items-center justify-center">
                                                            <h3 className="!text-base !text-black !underline !font-medium ">Browse Local Files</h3>
                                                        </div>
                                                        <input type="file" onChange={(e) => {
                                                            handleImageChange(e);
                                                            setPop1(false);
                                                        }} />
                                                    </div>

                                                </div>
                                            
                                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </OutsideClickHandler>
                            </>

                            <div className="mt-6">
                                <h2 className="text-[18px] !font-semibold !text-black">Lead Information</h2>

                                <div className="lead_input mt-5">

                                    <div className="flex items-center gap-10">
                                        <div className="flex items-center gap-10">
                                            <label htmlFor="" className="block">Lead Owner *</label>
                                            <input className="w-full !h-[48px] !outline-none border border-[#D0D4DC] !text-[#666D76] !font-normal !font-inter px-[10px] py-0 rounded-[10px] my-[5px]" required type="LeadOwner" value={userDetail?.fullName} disabled onChange={changeHandler} />

                                        </div>
                                        <div className="max-w-[50%] w-full">
                                            <label htmlFor="">Company *</label>
                                            <input className="w-full !h-[48px] !outline-none border border-[#D0D4DC] !text-[#666D76] !font-normal !font-inter px-[10px] py-0 rounded-[10px] my-[5px]" required type="text" value={formdata.Company} name="Company" onChange={changeHandler} />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-10">
                                    <div className="max-w-[50%] w-ful makeitflexcol">

<div className="lead_inp11">
    <label htmlFor="">First Name *</label>
    <select required className="selr" name="" id="">
        <option>None</option>
        <option>Mr</option>
        <option>Mrs</option>
    </select>
</div>

<div className=" exceptionwidht">
    <label style={{ visibility: "hidden" }} htmlFor="">hidden</label>
    <input value={formdata.FirstName} name="FirstName" onChange={changeHandler} type="text" />
</div>

</div>

                                        <div className="lead_inp1">
                                            <label htmlFor="">Last Name</label>
                                            <input value={formdata.LastName} name="LastName" onChange={changeHandler} type="text" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-10">
                                        <div className="lead_inp1">
                                            <label htmlFor="" className="block">Title</label>
                                            <input value={formdata.Title} name="Title" onChange={changeHandler} type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Email *</label>
                                            <input required value={formdata.Email} name="Email"
                                                onChange={(e) => {
                                                    changeHandler(e);
                                                    handleValidation(e.target.value);
                                                }}
                                                type="email" className={`${(emailisValid === false && formdata.Email !== "") && "emailvalidinput"}`} />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-10">
                                        <div className="lead_inp1">
                                            <label htmlFor="" className="block">Phone *</label>
                                            {/* <input required value={formdata.Phone} name="Phone" onChange={changeHandler} type="number" /> */}
                                            <PhoneInput
                                            
                                            inputClass="hjj"
                                            country={'in'}
                                            id="Phone"
                                            value={formdata?.Phone}
                                            name="Phone"
                                            placeholder="Enter your phone"

                                            onChange={Phone => changeHandler({ target: { value: Phone, name: 'Phone' } })}

                                            inputProps={{
                                                required: true,
                                            }}
                                            countryCodeEditable={false}
                                        />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Fax</label>
                                            <input value={formdata.Fax} name="Fax" onChange={changeHandler} type="text" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-10">
                                        <div className="lead_inp1">
                                            <label htmlFor="" className="block">Mobile</label>
                                            <input value={formdata.Mobile} name="Mobile" onChange={changeHandler} type="number" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Website</label>
                                            <input value={formdata.Website} name="Website" onChange={(e) => {
                                                changeHandler(e);
                                                handleInputUrlChange(e.target.value);
                                            }} type="text" className={`${(isUrlValid === false && formdata.Website !== "") && "emailvalidinput"}`} />
                                        </div>
                                    </div>

                     

                                    <div className="flex items-center gap-10">
                                        <div className="lead_inp1">
                                            <label htmlFor="Industry" className="block">Industry</label>
                                            <select value={formdata?.Industry} name="Industry" onChange={changeHandler} id="Industry">
                                                <option disabled>Select Industry</option>
                                                <option value="Other">Other</option>
                                                {
                                                    allLeadStatus?.map((item, index) => (
                                                        <option key={index} value={item?.name}>{item?.name}</option>
                                                    ))
                                                }

                                            </select>
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Lead Status *</label>
                                            <select required value={formdata?.LeadStatus} name="LeadStatus" onChange={changeHandler} id="">
                                                <option >Select Status</option>
                                                {
                                                    allleadStat?.map((val, index) => {
                                                        return (
                                                            <option key={index} value={val?.name}>{val?.name}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-10">
                                        <div className="lead_inp1">
                                            <label htmlFor="" className="block">Annual Revenue </label>
                                            <input value={formdata.AnnualRevenue} name="AnnualRevenue" onChange={changeHandler} placeholder="$" type="number" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Rating</label>
                                            <select name="Rating" onChange={changeHandler} id="">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div className="flex items-center gap-10">
                                        <div className="lead_inp1 lead_inp111">
                                            <label className="jpo" htmlFor="">Email Opt Out</label>
                                            <input value={formdata.EmailOptOut} name="EmailOptOut" onChange={changeHandler} className="seng" type="checkbox" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">LinkedIn URL</label>
                                            <input className={`${(isUrlValid1 === false && formdata.SkypeID !== "") && "emailvalidinput"}`} value={formdata?.SkypeID} name="SkypeID" type="text" onChange={(e) => {
                                                changeHandler(e);
                                                handleInputUrlChange1(e.target.value);
                                            }} />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-10">
                                        <div className="lead_inp1">
                                            <label htmlFor="" className="block">Secondary Email</label>
                                            <input className={`${(emailisValid1 === false && formdata.SecondaryEmail !== "") && "emailvalidinput"}`} value={formdata.SecondaryEmail} name="SecondaryEmail" onChange={(e) => {
                                                changeHandler(e);
                                                handleValidation1(e.target.value);
                                            }} type="email" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Twitter</label>
                                            <input className={`${(isUrlValid2 === false && formdata.Twitter !== "") && "emailvalidinput"}`} value={formdata.Twitter} name="Twitter" onChange={(e) => {
                                                changeHandler(e);
                                                handleInputUrlChange2(e.target.value);
                                            }} type="text" />
                                        </div>

                                    </div>

                                    <div className="flex items-center gap-10">
                                        <div className="lead_inp1">
                                            <label htmlFor="" className="block">Date</label>
                                            <input value={formdata.date} name="date" onChange={changeHandler} type="date" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Lead Source</label>
                                            <select name="LeadSource" onChange={changeHandler} id="">
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

                            </div>

                            <div className="mt-6">
                                <h2 className="text-[18px] !font-semibold !text-black">Address Information</h2>
                                <div className="w-full flex flex-col gap-5 mt-5">

                                    <div className="flex items-center gap-10">
                                        <div className="lead_inp1">
                                            <label htmlFor="" className="block">Street</label>
                                            <input value={formdata.Street} name="Street" onChange={changeHandler} type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">City</label>
                                            <input value={formdata.City} name="City" onChange={changeHandler} type="text" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-10">
                                        <div className="lead_inp1">
                                            <label htmlFor="" className="block">State</label>
                                            <input value={formdata.State} name="State" onChange={changeHandler} type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Zip Code</label>
                                            <input value={formdata.ZipCode} name="ZipCode" onChange={changeHandler} type="Number" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-10">
                                        <div className="lead_inp1">
                                            <label htmlFor="" className="block">Country</label>
                                            <input value={formdata.Country} name="Country" onChange={changeHandler} type="text" />
                                        </div>
                                        <div style={{ visibility: "hidden" }} className="lead_inp1">
                                            <label htmlFor="">Zip Code</label>
                                            <input value={formdata.ZipCode} name="ZipCode" onChange={changeHandler} type="Number" />
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="mt-6">
                                <h2 className="text-[18px] !font-semibold !text-black">Description Information</h2>
                                <div className="lead_input mt-5">
                                    <div className="flex items-center gap-10">
                                        <div className="max-w-[50%] w-full">
                                            <label htmlFor="" className="block">Description</label>
                                            <input className="w-full !h-[48px] !outline-none border border-[#D0D4DC] !text-[#666D76] !font-normal !font-inter px-[10px] py-0 rounded-[10px] my-[5px]" value={formdata.DescriptionInfo} name="DescriptionInfo" onChange={changeHandler} type="text" />
                                        </div>
                                    </div>

                                </div>
                            </div>



                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateLead2;
