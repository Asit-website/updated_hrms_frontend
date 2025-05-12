import React, { useState, useEffect } from "react";

import {useMain} from '../../../hooks/UseMain'
import toast from "react-hot-toast";

import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const item = [
  {
    title: "Full-time Employees",
  },
  {
    title: "Intern Employees",
  },
  {
    title: "Part-time Employees",
  },
];


const profile = () => {

  const { user, updateProfile, postActivity,getUsers, getStatisticsByUser, getBranchs, getDepartments, getDesignations, uploadToCloudinaryImg, uploadOwnDocs } = useMain();


  const [value, setValue] = useState({
    ...user,
    mobile: user?.mobile || '',
  });

  let user1 = JSON?.parse(localStorage.getItem("hrms_user"));

  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const navigate = useNavigate();

  const [uploadedProfile, setUploadedProfile] = useState("");

  const getData = async () => {
    let ans = await getBranchs();
    let ans1 = await getDepartments();
    let ans2 = await getDesignations();
    setBranches(ans?.data);
    setDepartments(ans1?.data);
    setDesignations(ans2?.data);
  };

  const [pic, setPic] = useState("");

  const handleChange = async (e) => {
    const { name, value } = e.target;


    if (name === "pan" && value.length > 10) {
      return;
    }
    if (name === "adhar" && value.length > 12) {
      return;
    }
    if (name === "currentPin" && value.length > 6) {
      return;
    }
    if (name === "perPin" && value.length > 6) {
      return
    }
    if (name === "mobile" && value.length > 10) {
      return
    }
    if (name === "pan" && value.length > 10) {
      return
    }
    if (name === "profileImage") {
      let image = e.target.files[0];
      const ans = await uploadToCloudinaryImg({ image });
      setValue((prev) => ({
        ...prev,
        [e.target.name]: ans?.data
      }))
      if (ans.status) {
        setUploadedProfile(ans?.data);
      }
    } else {
      setValue((prev) => ({
        ...prev,
        [name]: value,
      }));

    }
  };


  const [documents, setDocuments] = useState({
    adharCard: "",
    pancard: "",
    tenCert: "",
    twevelCert: "",
    cancelCheque: "",
    LastOrganization: "",
    RelievingLetter: "",
    OfferLetter: "",
    ExperienceLetter: "",
    ITR: "",
    ITR2: ""
  });

  const [documentPreviews, setDocumentPreviews] = useState({
    adharCard: null,
    pancard: null,
    tenCert: null,
    twevelCert: null,
    cancelCheque: null,
    LastOrganization: null,
    RelievingLetter: null,
    OfferLetter: null,
    ExperienceLetter: null,
    ITR: null,
    ITR2: null
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const { name } = event.target;

    if (file) {
      setDocuments((prevDocuments) => ({
        ...prevDocuments,
        [name]: file,
      }));

      if (file.type.includes("image")) {
        const previewURL = URL.createObjectURL(file);
        setDocumentPreviews((prev) => ({
          ...prev,
          [name]: previewURL,
        }));
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");

    const ans = await updateProfile({ ...value });

    const {
      adharCard,
      ITR,
      ITR2,
      pancard,
      tenCert,
      twevelCert,
      cancelCheque,
      LastOrganization,
      RelievingLetter,
      OfferLetter,
      ExperienceLetter,
    } = documents;

    const formData = new FormData();
    if (documents.adharCard) {
      formData.append("adharCard", adharCard);
    }
    if (documents.ITR) {
      formData.append("ITR", ITR);
    }
    if (documents.ITR2) {
      formData.append("ITR2", ITR2);
    }
    if (documents.pancard) {
      formData.append("pancard", pancard);
    }
    if (documents.cancelCheque) {
      formData.append("cancelCheque", cancelCheque);
    }
    if (documents.tenCert) {
      formData.append("tenCert", tenCert);
    }
    if (documents.LastOrganization) {
      formData.append("LastOrganization", LastOrganization);
    }
    if (documents.OfferLetter) {
      formData.append("OfferLetter", OfferLetter);
    }
    if (documents.RelievingLetter) {
      formData.append("RelievingLetter", RelievingLetter);
    }
    if (documents.twevelCert) {
      formData.append("twevelCert", twevelCert);
    }
    if (documents.ExperienceLetter) {
      formData.append("ExperienceLetter", ExperienceLetter);
    }

    if (
      documents.adharCard !== "" ||
      documents.ITR !== "" ||
      documents.ITR2 !== "" ||
      documents.pancard !== "" ||
      documents.tenCert !== "" ||
      documents.twevelCert !== "" ||
      documents.cancelCheque !== "" ||
      documents.LastOrganization !== "" ||
      documents.RelievingLetter !== "" ||
      documents.OfferLetter !== "" ||
      documents.ExperienceLetter !== ""
    ) {
      const uploadans = await uploadOwnDocs({ formData, id: user1?._id });
    }


    if (ans.success) {
      toast.success(ans?.message);
      setValue(ans.data);
    } else {
      toast.error(ans?.message);
    }

    toast.dismiss(toastId);
  };

  const [currEmp, setCurrEmp] = useState(0);

  useEffect(() => {

    const { EmployeeType } = user;
    const index = item.findIndex((emp) => emp.title === EmployeeType);

    if (index !== -1) {
      setCurrEmp(index);
    }


  }, [user])

  useEffect(() => {
    setValue({ ...user }); 
  }, [user]); 

  const fetchCurrentUser = async()=> {
    const res = await getUsers(user1?._id)
    console.log("cuurent",res.data);
  }


  useEffect(() => {
    let user1 = JSON.parse(localStorage.getItem("hrms_user"));
    setValue(user1);
    getData();
    console.log(user1, 'userID')
    fetchCurrentUser();
  }, []);

  const checkdiable = (name) => {
    const ans = user?.document?.filter((doc) => {
      if (doc?.name === name) {
        return true;
      }
    })

    if (ans?.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <>
      <div className="flex relative bg-[#f5f5f5] h-full">
       

        <div className="w-full bg-[#f5f5f5]">
         

          <div className="pt-8 pr-5 pb-8 relative w-full">
            <div className="">
              <div className="flex items-center justify-between mb-6 px-4">
                <h3 className="font-semibold text-[20px]">Update Profile</h3>
                <button onClick={() => navigate(user1?.role === "ADMIN" ? '/adminDash/mySelf' : '/employeeDash/mySelf')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md text-white"><MdKeyboardBackspace /> Back</button>
              </div>
              <form className="w-[90%] mx-auto flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="">
                    <label htmlFor="fullName" className="block text-md font-normal mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                        className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      onChange={handleChange}
                      value={user?.role === "ADMIN" ? user?.fullName : value.fullName}
                      id="fullName"
                 
                      disabled={!!user?.fullName}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="email" className="block text-md font-normal mb-1">
                      Company Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={value.email}
                      id="email"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      disabled={!!user?.email}
                    // required
                    />
                  </div>

                  <div className="">
                    <label htmlFor="fullName" className="block text-md font-normal mb-1">
                      Update Password
                    </label>
                    <input
                      type="text"
                      name="updatePassword"
                      value={value.updatePassword}
                      id="fullName"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      
                      onChange={(e) => setValue((prev) => ({
                        ...prev,
                        updatePassword: e.target.value
                      }))}
                    />
                  </div>

                  <div className="">
                    <label htmlFor="mobile" className="block text-md font-normal mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      name="mobile"
                      onChange={handleChange}
                      value={value.mobile || ''}
                      id="mobile"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      disabled={!!user?.mobile}
                    />
                  </div>

                  <div className="">
                    <label htmlFor="gender" className="block text-md font-normal mb-1">
                      Gender
                    </label>
                    <select disabled={!!user?.gender} className="w-full border rounded p-2 text-sm font-normal text-gray-500" name="gender" id="gender" value={value?.gender}>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  <div className="">
                    <label htmlFor="DOB" className="block text-md font-normal mb-1">
                      DOB
                    </label>

                    <input disabled={!!user?.dob} type="date" name="dob" onChange={handleChange} value={value?.dob} className="w-full border rounded p-2 text-sm font-normal text-gray-500" />
                  </div>

                  <div className="">
                    <label htmlFor="profileImage" className="block text-md font-normal mb-1">
                      Profile Image
                    </label>

                    <input
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      name="profileImage"
                      onChange={handleChange}
                      id="file_input"
                      type="file"
                      value={pic}
                  
                    />

                    {
                      uploadedProfile !== "" &&
                      <div className="uploadedProfile disabled:bg-gray-200 disabled:cursor-text disabled:text-gray-500">



                        <img src={uploadedProfile} alt="" />
                      </div>
                    }
                  </div>

                  <div className="">
                    <label htmlFor="email1" className="block text-md font-normal mb-1">
                      Personal Gmail
                    </label>
                    <input
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      name="email1"
                      value={value.email1}
                      onChange={handleChange}
                      id="email1"
                      required
                      type="email"
                      disabled={!!user?.email1}
                    />
                  </div>


                  <div className="">
                    <label htmlFor="department" className="block text-md font-normal mb-1">
                      Department
                    </label>
                    <select
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      onChange={handleChange}
                      name="department"
                      value={value?.department}
                      id="department"
                      disabled={!!user?.department}

                    >
                      {
                        departments?.map((val, index) => {
                          return <option key={index} value={val?.name}>{val?.name}</option>
                        })
                      }
                    </select>
                  </div>

                  <div className="">
                    <label htmlFor="designation" className="block text-md font-normal mb-1">
                      Designation
                    </label>
                    <select
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      onChange={handleChange}
                      disabled={!!user?.designation}
                      name="designation"
                      value={value.designation}
                      id="designation"
                    >
                      {
                        designations?.map((val, index) => {
                          return <option key={index} value={val?.name}>{val?.name}</option>
                        })
                      }
                    </select>
                  </div>

                  <div className="">
                    <label htmlFor="date" className="block text-md font-normal mb-1">
                      JoiningDate
                    </label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={value.joiningDate}
                      disabled={!!user?.joiningDate}
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      id="date"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="">
                    <label htmlFor="date" className="block text-md font-normal mb-1">
                      PAN Number.
                    </label>
                    <input
                      type="text"
                      id="pan"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      name="pan"
                      disabled={!!user?.pan}
                      value={value.pan}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="">
                    <label htmlFor="adhar" className="block text-md font-normal mb-1">
                      Aadhaar Number.
                    </label>
                    <input
                      type="text"
                      id="adhar"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="adhar"
                      disabled={!!user?.adhar}
                      value={value.adhar}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="">
                    <label htmlFor="father" className="block text-md font-normal mb-1">
                      Father Name
                    </label>
                    <input
                      type="text"
                      id="father"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="father"
                      disabled={!!user?.father}
                      value={value.father}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="">
                    <label htmlFor="currentAddress" className="block text-md font-normal mb-1">
                      Current Residence Address
                    </label>
                    <input
                      type="text"
                      id="currentAddress"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="currentAddress"
                      value={value.currentAddress}
                      disabled={!!user?.currentAddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="currentState" className="block text-md font-normal mb-1">
                      Current state
                    </label>

                    <input
                      type="text"
                      id="currentState"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="currentState"
                      value={value.currentState}
                      onChange={handleChange}
                      disabled={!!user?.currentState}

                    />
                  </div>
                  <div className="">
                    <label htmlFor="currentCity" className="block text-md font-normal mb-1">
                      Current city
                    </label>
                    <input
                      type="text"
                      id="currentCity"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="currentCity"
                      value={value.currentCity}
                      onChange={handleChange}
                      disabled={!!user?.currentCity}

                    />
                  </div>
                  <div className="">
                    <label htmlFor="currentPin" className="block text-md font-normal mb-1">
                      Area Pincode
                    </label>
                    <input
                      type="text"
                      id="currentPin"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="currentPin"
                      value={value.currentPin}
                      onChange={handleChange}
                      disabled={!!user?.currentPin}

                    />
                  </div>
                  <div className="">
                    <label htmlFor="perState" className="block text-md font-normal mb-1">
                      Permanent state
                    </label>
                    <select
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      name="perState"
                      value={value.perState}
                      id="perState"
                      onChange={handleChange}
                      disabled={!!user?.perState}

                    >
                      <option>Permanent State</option>
                      <option>Andhra Pradesh</option>
                      <option>Arunachal Pradesh</option>
                      <option>Assam</option>
                      <option>Bihar</option>
                      <option>Chhattisgarh</option>
                      <option>Goa</option>
                      <option>Gujarat</option>
                      <option>Haryana</option>
                      <option>Himachal Pradesh</option>
                      <option>Jharkhand</option>
                      <option>Karnataka</option>
                      <option>Kerala</option>
                      <option>Maharashtra</option>
                      <option>Madhya Pradesh</option>
                      <option>Manipur</option>
                      <option>Meghalaya</option>
                      <option>Mizoram</option>
                      <option>Nagaland</option>
                      <option>Odisha</option>
                      <option>Punjab</option>
                      <option>Rajasthan</option>
                      <option>Sikkim</option>
                      <option>Tamil Nadu</option>
                      <option>Tripura</option>
                      <option>Telangana</option>
                      <option>Uttar Pradesh</option>
                      <option>Uttarakhand</option>
                      <option>West Bengal</option>
                      <option>Andaman & Nicobar (UT)</option>
                      <option>Chandigarh (UT)</option>
                      <option>Dadra & Nagar Haveli and Daman & Diu (UT)</option>
                      <option>Delhi [National Capital Territory (NCT)]</option>
                      <option>Jammu & Kashmir (UT)</option>
                      <option>Ladakh (UT)</option>
                      <option>Lakshadweep (UT)</option>
                      <option>Puducherry (UT)</option>
                    </select>
                  </div>
                  <div className="">
                    <label htmlFor="perCity" className="block text-md font-normal mb-1">
                      Permanent city
                    </label>
                    <input
                      type="text"
                      id="perCity"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="perCity"
                      disabled={!!user?.perCity}
                      value={value.perCity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="perPin" className="block text-md font-normal mb-1">
                      Permanent Area Pincode
                    </label>
                    <input
                      type="text"
                      id="perPin"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="perPin"
                      disabled={!!user?.perPin}
                      value={value.perPin}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="Martial" className="block text-md font-normal mb-1">
                      Marital status
                    </label>
                    <select
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      name="Martial"
                      id="Martial"
                      disabled={!!user?.Martial}
                      value={value.Martial}
                      onChange={handleChange}
                    >
                      <option>Martial Status</option>
                      <option>Married</option>
                      <option>UnMarried</option>
                    </select>
                  </div>
                  <div className="">
                    <label htmlFor="nationality" className="block text-md font-normal mb-1">
                      Nationality
                    </label>
                    <select
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      name="nationality"
                      id="nationality"
                      disabled={!!user?.nationality}

                      value={value.nationality}
                      onChange={handleChange}
                    >
                      <option>Nationality</option>
                      <option>Indian</option>
                    </select>
                  </div>
                  <div className="">
                    <label htmlFor="Mother" className="block text-md font-normal mb-1">
                      Mother name
                    </label>
                    <input
                      type="text"
                      id="Mother"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      disabled={!!user?.Mother}

                      name="Mother"
                      value={value.Mother}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="qualification" className="block text-md font-normal mb-1">
                      Qualification
                    </label>
                    <input
                      type="text"
                      id="qualification"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-50"
                      // required
                      name="qualification"
                      disabled={!!user?.qualification}

                      value={value.qualification}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="specialization" className="block text-md font-normal mb-1">
                      Specialization
                    </label>
                    <input
                      type="text"
                      id="qualification"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-50"
                      // required
                      name="specialization"
                      value={value.specialization}
                      disabled={!!user?.specialization}

                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="qualificationType" className="block text-md font-normal mb-1">
                      Qualification Type
                    </label>
                    <select
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      name="qualificationType"
                      id="qualificationType"
                      value={value.qualificationType}
                      onChange={handleChange}
                      disabled={!!user?.qualificationType}

                    >
                      <option>Qualification Type</option>
                      <option>M.sc</option>
                      <option>B.sc</option>
                      <option>10th</option>
                      <option>12th</option>
                      <option>BBA</option>
                      <option>BCA</option>
                      <option>B.tech</option>
                      <option>M.tech</option>
                      <option>MBA</option>
                      <option>BCom</option>
                      <option>Others</option>
                    </select>
                  </div>
                  <div className="">
                    <label htmlFor="yearPass" className="block text-md font-normal mb-1">
                      Year of passing •
                    </label>

                    <input name="yearPass"
                      id="yearPass"
                      value={value.yearPass}
                      disabled={!!user?.yearPass}

                      onChange={handleChange} className="w-full border rounded p-2 text-sm font-normal text-gray-500" type="date" />
                  </div>
                  <div className="">
                    <label htmlFor="university" className="block text-md font-normal mb-1">
                      University/Board •
                    </label>
                    <input
                      type="text"
                      id="university"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="university"
                      value={value.university}
                      disabled={!!user?.university}

                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="college" className="block text-md font-normal mb-1">
                      College/School •
                    </label>
                    <input
                      type="text"
                      id="college"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="college"
                      value={value.college}
                      onChange={handleChange}
                      disabled={!!user?.college}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="percentage" className="block text-md font-normal mb-1">
                      Grade/CCPA/Percentage
                    </label>
                    <input
                      type="text"
                      id="percentage"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="percentage"
                      value={value.percentage}
                      disabled={!!user?.percentage}

                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="previousCompany" className="block text-md font-normal mb-1">
                      Previous Company •
                    </label>
                    <input
                      type="text"
                      id="previousCompany"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="previousCompany"
                      value={value.previousCompany}
                      disabled={!!user?.previousCompany}

                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="previousDesignation" className="block text-md font-normal mb-1">
                      Previous Designation •
                    </label>
                    <input
                      type="text"
                      id="previousDesignation"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="previousDesignation"
                      value={value.previousDesignation}
                      disabled={!!user?.previousDesignation}

                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="toDate" className="block text-md font-normal mb-1">
                      To date •
                    </label>
                    <input
                      type="date"
                      id="toDate"
                      className="-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="toDate"
                      value={value.toDate}
                      disabled={!!user?.toDate}

                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="fromDate" className="block text-md font-normal mb-1">
                      From date*
                    </label>
                    <input
                      type="date"
                      id="fromDate"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="fromDate"
                      value={value.fromDate}
                      onChange={handleChange}
                      disabled={!!user?.fromDate}

                    />
                  </div>
                  <div className="">
                    <label htmlFor="numberOfMonth" className="block text-md font-normal mb-1">
                      Number of months *
                    </label>
                    <input
                      type="text"
                      id="numberOfMonth"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="numberOfMonth"
                      value={value.numberOfMonth}
                      disabled={!!user?.numberOfMonth}

                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="Jobdescription" className="block text-md font-normal mb-1">
                      Job description
                    </label>
                    <input
                      type="text"
                      id="Jobdescription"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-50"
                      // required
                      name="Jobdescription"
                      value={value.Jobdescription}
                      disabled={!!user?.Jobdescription}

                      onChange={handleChange}
                    />
                  </div>

                  <div className="">
                    <label htmlFor="SalaryBankName" className="block text-md font-normal mb-1">
                      Salary Bank Name
                    </label>
                    <input
                      type="text"
                      id="SalaryBankName"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-50"
                      // required
                      name="SalaryBankName"
                      value={value.SalaryBankName}
                      disabled={!!user?.SalaryBankName}

                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="BeneficiaryName" className="block text-md font-normal mb-1">
                      Beneficiary Name
                    </label>
                    <input
                      type="text"
                      id="BeneficiaryName"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="BeneficiaryName"
                      value={value.BeneficiaryName}
                      disabled={!!user?.BeneficiaryName}

                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="BankIfsc" className="block text-md font-normal mb-1">
                      Bank IFSC Code
                    </label>
                    <input
                      type="text"
                      id="BankIfsc"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="BankIfsc"
                      value={value.BankIfsc}
                      disabled={!!user?.BankIfsc}

                      onChange={handleChange}
                    />
                  </div>

                  <div className="">
                    <label htmlFor="AccountNumber" className="block text-md font-normal mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      id="AccountNumber"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="AccountNumber"
                      value={value.AccountNumber}
                      onChange={handleChange}
                      disabled={!!user?.AccountNumber}

                    />
                  </div>

                  <div className="">
                    <label htmlFor="confirmAccount" className="block text-md font-normal mb-1">
                      Confirm Account Number
                    </label>
                    <input
                      type="text"
                      id="confirmAccount"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="confirmAccount"
                      value={value.confirmAccount}
                      disabled={!!user?.confirmAccount}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="">
                    <label htmlFor="Branch" className="block text-md font-normal mb-1">
                      Bank Branch
                    </label>
                    <input
                      type="text"
                      id="Branch"
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      // required
                      name="Branch"
                      value={value.Branch}
                      disabled={!!user?.Branch}
                      onChange={handleChange}
                    />
                  </div>

                  {/* this is document upload start  */}


                </div>

                <div className="flex gap-[20px]">

                  <div className="py-[15px] px-0 rounded-[10px] min-w-1/2 mb-4 mt-7">
                    <div className="flex items-center justify-between px-[20px] py-0">
                      <h3 className="text-[#101820] text-[16px] font-bold leading-[24px] tracking-[0.0015em] text-left">Documents </h3>
                    </div>

                    <hr className="mt-[20px] opacity-[0.8]" />

                    <div className="form2-class">

                      <div className=" sfgh mt-6">
                        {/* this is first doc row  */}

                        <div className="flex gap-10">
                          {/* fist   */}
                          <div className="flex flex-col w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Aadhar Card</h4>

                            <div className="w-[250px] h-[62px] py-5 px-3 rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                              {documentPreviews.tenCert ? (
                                <img
                                  src={documentPreviews.tenCert}
                                  alt="aadharCard Certificate Preview"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746794106/upload-file_i7qokk.png"
                                  alt="Upload Placeholder"
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    objectFit: "contain",
                                  }}
                                />
                              )}

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-500"
                                name="tenCert"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("tenCert")}
                              />
                            </div>
                          </div>

                          {/* second */}

                            <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">PAN CARD</h4>

                            <div className="w-[250px] h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                              {documentPreviews.tenCert ? (
                                <img
                                  src={documentPreviews.tenCert}
                                  alt="Pan Certificate Preview"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746794106/upload-file_i7qokk.png"
                                  alt="Upload Placeholder"
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    objectFit: "contain",
                                  }}
                                />
                              )}

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-500"
                                name="tenCert"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("tenCert")}
                              />
                            </div>
                          </div>
                        </div>

                        {/* this is second doc row  */}

                        <div className="flex  mt-6 gap-10">
                          {/* frist   */}
                          <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">10th Certificate</h4>

                            <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                              {documentPreviews.tenCert ? (
                                <img
                                  src={documentPreviews.tenCert}
                                  alt="10th Certificate Preview"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746794106/upload-file_i7qokk.png"
                                  alt="Upload Placeholder"
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    objectFit: "contain",
                                  }}
                                />
                              )}

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-500"
                                name="tenCert"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("tenCert")}
                              />
                            </div>
                          </div>

                          {/* second  */}
                          <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">12th Certificate</h4>

                            <div className="w-[250px] h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                              {documentPreviews.tenCert ? (
                                <img
                                  src={documentPreviews.tenCert}
                                  alt="12th Certificate Preview"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746794106/upload-file_i7qokk.png"
                                  alt="Upload Placeholder"
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    objectFit: "contain",
                                  }}
                                />
                              )}

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-500"
                                name="tenCert"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("tenCert")}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex  mt-6 gap-10">
                          {/* frist   */}

                         <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Cancelled Cheque</h4>

                            <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                              {documentPreviews.tenCert ? (
                                <img
                                  src={documentPreviews.tenCert}
                                  alt="Cancel Preview"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746794106/upload-file_i7qokk.png"
                                  alt="Upload Placeholder"
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    objectFit: "contain",
                                  }}
                                />
                              )}

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-500"
                                name="tenCert"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("tenCert")}
                              />
                            </div>
                          </div>

                          {currEmp === 0 && (
                            <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] ">Last Organization</h4>

                            <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                              {documentPreviews.tenCert ? (
                                <img
                                  src={documentPreviews.tenCert}
                                  alt="Last organization"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746794106/upload-file_i7qokk.png"
                                  alt="Upload Placeholder"
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    objectFit: "contain",
                                  }}
                                />
                              )}

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-500"
                                name="tenCert"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("tenCert")}
                              />
                            </div>
                          </div>
                          )}
                        </div>

                        {currEmp === 0 && (
                          <>

                            <h1 className="lstOrgText !px-0 mt-5 font-semibold">
                              Last Organization Docs
                            </h1>

                            <div className="flex  mt-6 gap-10">
                              {/* first   */}

                              <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Relieving Letter</h4>

                            <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                              {documentPreviews.tenCert ? (
                                <img
                                  src={documentPreviews.tenCert}
                                  alt="Relieving Preview"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746794106/upload-file_i7qokk.png"
                                  alt="Upload Placeholder"
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    objectFit: "contain",
                                  }}
                                />
                              )}

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-500"
                                name="tenCert"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("tenCert")}
                              />
                            </div>
                          </div>

                              {/* second  */}
  <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Offer Letter</h4>

                            <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                              {documentPreviews.tenCert ? (
                                <img
                                  src={documentPreviews.tenCert}
                                  alt="Offer letter"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746794106/upload-file_i7qokk.png"
                                  alt="Upload Placeholder"
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    objectFit: "contain",
                                  }}
                                />
                              )}

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-500"
                                name="tenCert"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("tenCert")}
                              />
                            </div>
                          </div>
                            </div>

                            <div className="flex  mt-6 gap-10">
                              {/* first   */}

                              <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Experience Letter</h4>

                            <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                              {documentPreviews.tenCert ? (
                                <img
                                  src={documentPreviews.tenCert}
                                  alt="Experience letter"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746794106/upload-file_i7qokk.png"
                                  alt="Upload Placeholder"
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    objectFit: "contain",
                                  }}
                                />
                              )}

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-500"
                                name="tenCert"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("tenCert")}
                              />
                            </div>
                          </div>

                           
                            </div>
                          </>
                        )}

                        <div className="flex gap-10 mt-6">

                           <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">ITR(Income Tax Return)</h4>

                            <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                              {documentPreviews.tenCert ? (
                                <img
                                  src={documentPreviews.tenCert}
                                  alt="ITR Certificate Preview"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746794106/upload-file_i7qokk.png"
                                  alt="Upload Placeholder"
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    objectFit: "contain",
                                  }}
                                />
                              )}

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-500"
                                name="tenCert"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("tenCert")}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">ITR(Income Tax Return) 2nd pdf</h4>

                            <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                              {documentPreviews.tenCert ? (
                                <img
                                  src={documentPreviews.tenCert}
                                  alt="ITR Certificate Preview"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746794106/upload-file_i7qokk.png"
                                  alt="Upload Placeholder"
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    objectFit: "contain",
                                  }}
                                />
                              )}

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-500"
                                name="tenCert"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("tenCert")}
                              />
                            </div>
                          </div>
                        </div>
                      </div>


                    </div>

                  </div>

                  <div className="">
                    <div className="basics !px-0 mt-[43px]">
                      <h3>Uploaded Documents </h3>
                    </div>

                    <hr className="upper" />
                    <div className={`grid ${value?.document?.length === 0 ? "grid-cols-1" : "grid-cols-2"}  gap-5 pt-7`}>
                      {
                        value?.document?.length === 0 ? <p className="text-center">No Documents Uploaded !!</p> : (
                          value?.document?.map((item, index) => (
                            <div key={index} className="border border-gray-300 rounded-md p-4" >
                              <img src={item.url} alt="" className="w-full h-32 object-contain" />
                              {/* twevelCert , tenCert , cancelCheque */}
                              <p className="text-center mt-3 font-semibold">{item.name === "twevelCert" ? "twelveth Certificate" : item?.name === "tenCert" ? "Tenth Certicate" : item?.name}</p>
                            </div>
                          ))
                        )

                      }
                    </div>
                  </div>
                </div>


                <button
                  type="submit"
                  className="w-[150px] h-[40px] rounded-[5px] bg-[#0B56E4] text-white font-semibold"
                >
                  Save
                </button>
              </form>
            </div>





          </div>
        </div>
      </div >
    </>
  );
};

export default profile;
