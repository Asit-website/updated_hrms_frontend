import React, { useEffect, useRef, useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import * as EmailValidator from "email-validator";
import validator from 'validator';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { useMain } from '../../hooks/UseMain';
import toast from 'react-hot-toast';

const CreateLead = () => {
  const { user, createLead, getEmployees, AllLeadSource, AllLeadStatus, getLeadStat, uploadToCloudinaryImg, getLeadCatgory, getLeadSubCategory, } = useMain();
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
          Company: "",
          FirstName: "",
          LastName: "",
          Title: "",
          Email: "",
          Phone: "",
          Fax: "",
          // Mobile: "",
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
      // Check all required fields are filled
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
              Company: "",
              FirstName: "",
              LastName: "",
              Title: "",
              Email: "",
              Phone: "",
              Fax: "",
              // Mobile: "",
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

  const [showAdditionalSetting, setShowAdditionalSetting] = useState(4);

  const triggerFileSelect = () => {
      fileInputRef.current.click();
  };
  return (
    <div className='bg-[#f9fbfc]'>
      <div>
        <div className="flex items-center justify-between px-7 py-5 pt-5">
          <h2 className="text-[24px] font-semibold text-[#111827]">Create Lead</h2>
          <div className="flex gap-2">
          <NavLink to="/adminDash/myLead">
            <button className="px-4 py-1.5 text-md border rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium">
              Back
            </button>
            </NavLink>
            <button  onClick={submitHandler} type="button" className="px-4 py-1.5 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b-2 p-5">
            {/* <MdAccountCircle size={48} color="#3b3b3b" /> */}
            <div className="w-[80px] h-[80px] items-center justify-center border border-[#B3CBF7] rounded-full bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)] ml-[11px]">

                                
{leadUpldProf ? (
    <img src={leadUpldProf} alt="Preview" className="leadUpldProf" onClick={triggerFileSelect} />
) : (
    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746601296/usit_psm4or.png" alt="Placeholder" onClick={triggerFileSelect} />
)}

</div>
            <p onClick={triggerFileSelect} className="cursor-pointer text-base font-medium leading-6 tracking-[0.0015em] text-left text-blue-600 underline">
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


          <h2 className="text-lg font-semibold pl-6 border-b-2 p-5">Lead Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div>
              <label htmlFor='' className="block text-md font-normal mb-1">Lead Owner <span className="text-red-600">*</span></label>
              <input
                className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                name="LeadOwner"
                required type="LeadOwner"
                value={userDetail?.fullName}
                disabled
                onChange={changeHandler}
              />
            </div>

            <div>
              <label htmlFor='' className="block text-md font-normal mb-1">Company <span className="text-red-600">*</span></label>
              <input
               required type="text"
                className="w-full border rounded p-2"
                name="Company"
                value={formdata.Company}
                onChange={changeHandler}
              />
            </div>

            <div>
              <label htmlFor='' className="block text-md font-normal mb-1">First Name <span className="text-red-600">*</span></label>
              <input
                type="text"
                className="w-full border rounded p-2"
                name="FirstName"
                value={formdata.FirstName}
                onChange={changeHandler}
              />
            </div>

            <div>
              <label htmlFor='' className="block text-md font-normal mb-1">Last Name</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                name="LastName"
                value={formdata.LastName}
                onChange={changeHandler}
              />
            </div>

            <div>
              <label htmlFor='' className="block text-md font-normal mb-1">Title</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                name="Title"
                value={formdata.Title}
                onChange={changeHandler}
              />
            </div>

            <div>
  <label htmlFor='' className="block text-md font-normal mb-1">
    Email <span className="text-red-600">*</span>
  </label>
  <input
    required
    type="email"
    name="Email"
    value={formdata.Email}
    onChange={(e) => {
      changeHandler(e);
      handleValidation(e.target.value);
    }}
    className={`w-full border rounded p-2 ${emailisValid === false && formdata.Email !== "" ? "emailvalidinput" : ""}`}
  />
</div>

            <div>
              <label htmlFor='' className="block text-md font-normal mb-1">Phone <span className="text-red-600">*</span></label>
              <input
                 className="w-full border rounded p-2"
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

            <div>
              <label className="block text-md font-normal mb-1">Fax</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                name="Fax"
                value={formdata.Fax}
                onChange={changeHandler}
              />
            </div>
            <div>
  <label htmlFor='' className="block text-md font-normal mb-1">
    Website
  </label>
  <input
    type="text"
    name="Website"
    value={formdata.Website}
    onChange={(e) => {
      changeHandler(e);
      handleInputUrlChange(e.target.value);
    }}
    className={`w-full border rounded p-2 ${isUrlValid === false && formdata.Website !== "" ? "emailvalidinput" : ""}`}
  />
</div>
<div>
  <label htmlFor='' className="block text-md font-normal mb-1">
Annual Revenue
  </label>
  <input
  
  className="w-full border rounded p-2"
  value={formdata.AnnualRevenue} name="AnnualRevenue" onChange={changeHandler} placeholder="$" type="number" 
  />
</div>
<div>
  <label htmlFor='' className="block text-md font-normal mb-1">
Rating 
  </label>
  <select className="w-full h-12 outline-none border border-[#D0D4DC]  font-normal px-[10px] rounded-[10px] my-[5px]" name="Rating" onChange={changeHandler} id="">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
</div>

<div>
  <label htmlFor='' className="block text-md font-normal mb-1">
  Email Otp
  </label>
  <input className="w-full border rounded p-2" value={formdata.EmailOptOut} name="EmailOptOut" onChange={changeHandler} type="checkbox" />
</div>

            <div>
               <label htmlFor='' className="block text-md font-normal mb-1">
    LinkedIn URL 
          </label>
  <input
    type="text"
    name="SkypeID"
    value={formdata?.SkypeID}
    onChange={(e) => {
      changeHandler(e);
      handleInputUrlChange1(e.target.value);
    }}
    className={`w-full border rounded p-2 ${isUrlValid1 === false && formdata?.SkypeID !== "" ? "emailvalidinput" : ""}`}
  />
</div>
<div>
  <label htmlFor='' className="block text-md font-normal mb-1">Twitter</label>
  <input
    type="text"
    className={`w-full border rounded p-2 ${isUrlValid2 === false && formdata.Twitter !== "" ? "emailvalidinput" : ""}`}
    value={formdata.Twitter}
    name="Twitter"
    onChange={(e) => {
      changeHandler(e);
      handleInputUrlChange2(e.target.value);
    }}
  />
</div>
<div>
  <label htmlFor='' className="block text-md font-normal mb-1">
Date
  </label>
  <input className="w-full border rounded p-2" value={formdata.date} name="date" onChange={changeHandler} type="date" />
</div>
           
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="bg-white rounded-lg shadow mb-6">
          

          <h2 className="text-lg font-semibold pl-6 border-b-2 p-5">Description Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div>
              <label htmlFor='' className="block text-md font-normal mb-1">Description</label>
              <input
                className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                value={formdata.DescriptionInfo} name="DescriptionInfo" onChange={changeHandler}
                type='text'
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="bg-white rounded-lg shadow mb-6">
          

          <h2 className="text-lg font-semibold pl-6 border-b-2 p-5">Additional Fields</h2>
       
                                <div className="border grid grid-cols-4 gap-4 p-4 rounded shadow mt-4 m-5">
                                    {leadCategory.slice(0, showAdditionalSetting).map((item) => (
                                        <div key={item._id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value={item.name}
                                                checked={selectedCategories.includes(item.name)}
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
                                            <label>{item.name}</label>
                                        </div>
                                    ))}
                                </div>
                                {
                                    leadCategory.length > 4 ? (
                                        showAdditionalSetting === 4 ? <span className="bg-blue-600 cursor-pointer mt-3 inline-block  rounded-md text-white py-1 px-2 m-7" onClick={() => setShowAdditionalSetting()}>View All</span> : <span className="bg-blue-600 inline-block mt-3 cursor-pointer rounded-md text-white py-1 px-2 m-7" onClick={() => setShowAdditionalSetting(4)}>View Less</span>
                                    ) : null
                                }



                             
                           

         
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Object.keys(formdata.dynamicFields).map((key) => (
                                    <div key={key} className="flex flex-col space-y-2 mt-4">
                                        <label className="font-semibold text-lg">{key}</label>
                                        {subLeadCategory.filter(sub => sub.category.name === key).length > 0 ? (
                                            <select
                                                value={formdata.dynamicFields[key]}
                                                onChange={(e) => handleDynamicChange(key, e.target.value)}
                                                className="border p-2 rounded"
                                            >
                                                <option value="">Select {key}</option>
                                                {subLeadCategory
                                                    .filter(sub => sub.category.name === key)
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
                                                value={formdata.dynamicFields[key]}
                                                onChange={(e) => handleDynamicChange(key, e.target.value)}
                                                className="border p-2 rounded"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
      </div>
    </div>
  );
};

export default CreateLead;
