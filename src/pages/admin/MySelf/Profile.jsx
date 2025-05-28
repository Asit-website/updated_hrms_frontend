 import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useMain } from "../../../hooks/UseMain";

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


const AdminProfile = () => {

  const { user, updateProfile, postActivity, getUsers, getBranchs, getDepartments, getDesignations, uploadToCloudinaryImg, uploadOwnDocs } = useMain();


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
      fetchCurrentUser();
      setDocuments({
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
      })
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
    setValue({ ...user }); // Update the state when `user` changes
  }, [user]); // Run only when `user` updates

  const fetchCurrentUser = async () => {
    const res = await getUsers(user1?._id)
    console.log("cuurent", res.data);
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
      <div className="employee-dash h-full">
      

        <div className="w-full bg-[#f5f5f5]">
         

          <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full">
            <div className="">
              <div className="flex items-center justify-between mb-6 px-4">
                <h3 className="font-semibold text-[20px]">Update Profile</h3>
                <button onClick={() => navigate(user1?.role === "ADMIN" ? '/adminDash/mySelf' : '/employeeDash/mySelf')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md text-white"><MdKeyboardBackspace /> Back</button>
              </div>
              <form className="w-full mx-auto flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-5">

                  <div className="bg-white p-4">
                    <h2 className="font-semibold">Employee Detail</h2>
                    <hr className="my-3" />
                    <div className="grid grid-cols-2 gap-3">
                      <label htmlFor="fullName" className="block mb-1 col-span-2">
                        <p className="mb-1 text-[14px]">Full Name</p>
                        <input
                          type="text"
                          name="fullName"
                          onChange={handleChange}
                          value={user?.role === "ADMIN" ? user?.fullName : value.fullName}
                          id="fullName"
                          className=" block  disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          disabled={!!user?.fullName}
                        />
                      </label>

                      <label htmlFor="email" className="block mb-1 col-span-2">
                        <p className="mb-1 text-[14px]">Company Email </p>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          value={value.email}
                          id="email"
                          className=" block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          disabled={!!user?.email}
                        // required
                        />
                      </label>

                      <label htmlFor="fullName" className="block mb-1 ">
                        <p className="mb-1 text-[14px]">Update Password</p>

                        <input
                          type="text"
                          name="updatePassword"
                          value={value.updatePassword}
                          id="fullName"
                          className=" block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          onChange={(e) => setValue((prev) => ({
                            ...prev,
                            updatePassword: e.target.value
                          }))}
                        />
                      </label>

                      <label htmlFor="mobile" className="block mb-1">
                        <p className="mb-1 text-[14px]"> Mobile Number</p>
                        <input
                          type="number"
                          name="mobile"
                          onChange={handleChange}
                          value={value.mobile || ''}
                          id="mobile"
                          className=" block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          disabled={!!user?.mobile}
                        // required
                        />
                      </label>

                      <label htmlFor="gender" className="block mb-1 disabled:bg-gray-200 disabled:cursor-text disabled:text-gray-500">
                        <p className="mb-1 text-[14px]"> Gender</p>
                        <select disabled={!!user?.gender} className="disabled:bg-gray-200 disabled:cursor-text disabled:text-gray-500" name="gender" id="gender" value={value?.gender}>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </label>

                      <label htmlFor="DOB" className="block mb-1 ">
                        <p className="mb-1 text-[14px]"> DOB</p>
                        <input disabled={!!user?.dob} type="date" name="dob" onChange={handleChange} value={value?.dob} className=" block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full" />
                      </label>

                      <div className="col-span-2">
                        <label htmlFor="profileImage" className="block mb-1 ">
                          <p className="mb-1 text-[14px]"> Profile Image</p>
                          <input
                            className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                            name="profileImage"
                            onChange={handleChange}
                            id="file_input"
                            type="file"
                            value={pic}
                          //  disabled={!!user?.profileImage}
                          />
                        </label>

                        {
                          uploadedProfile !== "" &&
                          <div className="uploadedProfile disabled:bg-gray-200 disabled:cursor-text disabled:text-gray-500">



                            <img src={uploadedProfile} alt="" />
                          </div>
                        }
                      </div>
                      <label htmlFor="email1" className="block mb-1 col-span-2">
                        <p className="mb-1 text-[14px]">  Personal Gmail</p>

                        <input
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          name="email1"
                          value={value.email1}
                          onChange={handleChange}
                          id="email1"
                          required
                          type="email"
                          // required
                          disabled={!!user?.email1}
                        />
                      </label>

                      <label htmlFor="designation" className="block mb-1 col-span-2">
                        <p className="mb-1 text-[14px]">
                          Designation
                        </p>
                        <select
                          className=" block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
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
                      </label>

                      <label htmlFor="department" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Department
                        </p>
                        <select
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
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
                      </label>



                      <label htmlFor="date" className="block mb-1 ">
                        <p className="mb-1 text-[14px]">
                          JoiningDate
                        </p>
                        <input
                          type="date"
                          name="joiningDate"
                          value={value.joiningDate}
                          disabled={!!user?.joiningDate}
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          id="date"
                          onChange={handleChange}
                        />
                      </label>

                      <label htmlFor="date" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          PAN Number
                        </p>
                        <input
                          type="text"
                          id="pan"
                          className="  block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          name="pan"
                          disabled={!!user?.pan}
                          value={value.pan}
                          onChange={handleChange}
                        />
                      </label>

                      <label htmlFor="adhar" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Aadhaar Number
                        </p>
                        <input
                          type="text"
                          id="adhar"
                          className=" block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="adhar"
                          disabled={!!user?.adhar}
                          value={value.adhar}
                          onChange={handleChange}
                        />
                      </label>

                      <label htmlFor="father" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Father Name
                        </p>
                        <input
                          type="text"
                          id="father"
                          className=" block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="father"
                          disabled={!!user?.father}
                          value={value.father}
                          onChange={handleChange}
                        />
                      </label>

                      <label htmlFor="Mother" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Mother name
                        </p>

                        <input
                          type="text"
                          id="Mother"
                          className=" block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          disabled={!!user?.Mother}

                          name="Mother"
                          value={value.Mother}
                          onChange={handleChange}
                        />
                      </label>

                      <label htmlFor="Martial" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Marital status
                        </p>
                        <select
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
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
                      </label>

                      <label htmlFor="nationality" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Nationality
                        </p>
                        <select
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          name="nationality"
                          id="nationality"
                          disabled={!!user?.nationality}

                          value={value.nationality}
                          onChange={handleChange}
                        >
                          <option>Nationality</option>
                          <option>Indian</option>
                        </select>
                      </label>




                      <label htmlFor="qualification" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Qualification
                        </p>

                        <input
                          type="text"
                          id="qualification"
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="qualification"
                          disabled={!!user?.qualification}

                          value={value.qualification}
                          onChange={handleChange}
                        />
                      </label>


                      <label htmlFor="specialization" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Specialization
                        </p>
                        <input
                          type="text"
                          id="qualification"
                          className=" block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="specialization"
                          value={value.specialization}
                          disabled={!!user?.specialization}

                          onChange={handleChange}
                        />
                      </label>

                      <label htmlFor="qualificationType" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Qualification Type
                        </p>
                        <select
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
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
                      </label>


                      <label htmlFor="yearPass" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Year of passing
                        </p>

                        <input name="yearPass"
                          id="yearPass"
                          value={value.yearPass}
                          disabled={!!user?.yearPass}

                          onChange={handleChange} className=" block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full" type="date" />
                      </label>

                      <label htmlFor="university" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          University/Board
                        </p>
                        <input
                          type="text"
                          id="university"
                          className=" block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="university"
                          value={value.university}
                          disabled={!!user?.university}

                          onChange={handleChange}
                        />
                      </label>

                      <label htmlFor="college" className="block mb-1 ">
                        <p className="mb-1 text-[14px]">
                          College/School
                        </p>
                        <input
                          type="text"
                          id="college"
                          className=" block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="college"
                          value={value.college}
                          onChange={handleChange}
                          disabled={!!user?.college}
                        />
                      </label>

                      <label htmlFor="percentage" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Grade/CCPA/Percentage
                        </p>
                        <input
                          type="text"
                          id="percentage"
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="percentage"
                          value={value.percentage}
                          disabled={!!user?.percentage}

                          onChange={handleChange}
                        />
                      </label>


                      <label htmlFor="previousCompany" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Previous Company
                        </p>
                        <input
                          type="text"
                          id="previousCompany"
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="previousCompany"
                          value={value.previousCompany}
                          disabled={!!user?.previousCompany}

                          onChange={handleChange}
                        />
                      </label>

                      <label htmlFor="previousDesignation" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Previous Designation
                        </p>
                        <input
                          type="text"
                          id="previousDesignation"
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="previousDesignation"
                          value={value.previousDesignation}
                          disabled={!!user?.previousDesignation}

                          onChange={handleChange}
                        />
                      </label>

                      <label htmlFor="toDate" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          To date
                        </p>
                        <input
                          type="date"
                          id="toDate"
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="toDate"
                          value={value.toDate}
                          disabled={!!user?.toDate}

                          onChange={handleChange}
                        />
                      </label>


                      <label htmlFor="fromDate" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          From date
                        </p>
                        <input
                          type="date"
                          id="fromDate"
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="fromDate"
                          value={value.fromDate}
                          onChange={handleChange}
                          disabled={!!user?.fromDate}

                        />
                      </label>

                      <label htmlFor="numberOfMonth" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Number of months
                        </p>
                        <input
                          type="text"
                          id="numberOfMonth"
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="numberOfMonth"
                          value={value.numberOfMonth}
                          disabled={!!user?.numberOfMonth}

                          onChange={handleChange}
                        />
                      </label>

                      <label htmlFor="Jobdescription" className="block mb-1 col-span-2">
                        <p className="mb-1 text-[14px]">
                          Job description
                        </p>
                        <input
                          type="text"
                          id="Jobdescription"
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="Jobdescription"
                          value={value.Jobdescription}
                          disabled={!!user?.Jobdescription}

                          onChange={handleChange}
                        />
                      </label>

                    </div>
                  </div>


                  <div className="bg-white p-4">
                    <h2 className="font-semibold">Address Detail</h2>
                    <hr className="my-3" />
                    <div className="flex flex-col gap-3">
                      <label htmlFor="currentAddress" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Current Residence Address
                        </p>
                        <input
                          type="text"
                          id="currentAddress"
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full "
                          // required
                          name="currentAddress"
                          value={value.currentAddress}
                          disabled={!!user?.currentAddress}
                          onChange={handleChange}
                        />
                      </label>

                      <label htmlFor="currentState" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Current state
                        </p>
                        <input
                          type="text"
                          id="currentState"
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="currentState"
                          value={value.currentState}
                          onChange={handleChange}
                          disabled={!!user?.currentState}

                        />
                      </label>

                      <label htmlFor="currentCity" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Current city
                        </p>
                        <input
                          type="text"
                          id="currentCity"
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="currentCity"
                          value={value.currentCity}
                          onChange={handleChange}
                          disabled={!!user?.currentCity}

                        />
                      </label>

                      <label htmlFor="currentPin" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Current Area Pincode
                        </p>
                        <input
                          type="text"
                          id="currentPin"
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="currentPin"
                          value={value.currentPin}
                          onChange={handleChange}
                          disabled={!!user?.currentPin}

                        />
                      </label>

                      <label htmlFor="perState" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Permanent state
                        </p>
                        <select
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
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
                      </label>


                      <label htmlFor="perCity" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Permanent city
                        </p>
                        <input
                          type="text"
                          id="perCity"
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="perCity"
                          disabled={!!user?.perCity}
                          value={value.perCity}
                          onChange={handleChange}
                        />
                      </label>

                      <label htmlFor="perPin" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Permanent Area Pincode
                        </p>
                        <input
                          type="text"
                          id="perPin"
                          className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                          // required
                          name="perPin"
                          disabled={!!user?.perPin}
                          value={value.perPin}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                  </div>

                </div>

                <div className="bg-white p-4">

                  <h2 className="font-semibold">Bank Detail</h2>
                  <hr className="my-3" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="">
                      <label htmlFor="BeneficiaryName" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Beneficiary Name
                        </p>
                      </label>
                      <input
                        type="text"
                        id="BeneficiaryName"
                        className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                        // required
                        name="BeneficiaryName"
                        value={value.BeneficiaryName}
                        disabled={!!user?.BeneficiaryName}

                        onChange={handleChange}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="BankIfsc" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Bank IFSC Code
                        </p>
                      </label>
                      <input
                        type="text"
                        id="BankIfsc"
                        className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                        // required
                        name="BankIfsc"
                        value={value.BankIfsc}
                        disabled={!!user?.BankIfsc}

                        onChange={handleChange}
                      />
                    </div>

                    <div className="">
                      <label htmlFor="AccountNumber" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Account Number
                        </p>
                      </label>
                      <input
                        type="text"
                        id="AccountNumber"
                        className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                        // required
                        name="AccountNumber"
                        value={value.AccountNumber}
                        onChange={handleChange}
                        disabled={!!user?.AccountNumber}

                      />
                    </div>

                    <div className="">
                      <label htmlFor="confirmAccount" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Confirm Account Number
                        </p>
                      </label>
                      <input
                        type="text"
                        id="confirmAccount"
                        className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                        // required
                        name="confirmAccount"
                        value={value.confirmAccount}
                        disabled={!!user?.confirmAccount}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="">
                      <label htmlFor="Branch" className="block mb-1">
                        <p className="mb-1 text-[14px]">
                          Bank Branch
                        </p>
                      </label>
                      <input
                        type="text"
                        id="Branch"
                        className="block disabled:cursor-text border border-[#d3d2d2 bg-white outline-none rounded-[5px] p-[10px] w-full"
                        // required
                        name="Branch"
                        value={value.Branch}
                        disabled={!!user?.Branch}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-10 p-[10px]">

                  <div className="py-[15px] px-0 rounded-[10px] min-w-[50%] mb-4 mt-7">
                    <div className="basics !px-0">
                      <h3 className="font-semibold">Documents </h3>
                    </div>

                    <hr className="my-3" />

                    <div className="form2-class">

                      <div className=" sfgh mt-6">
                        {/* this is first doc row  */}

                        <div className="flex ">
                          {/* fist   */}
                          <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Aadhar Card</h4>

                            <div className={`max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try ${checkdiable("adharCard") ? "bg-gray-200" : ""}`}>
                              {documentPreviews.adharCard ? (
                                <img
                                  className="max-w-[29px] max-h-[29px] rounded-[5px]"
                                  src={documentPreviews.adharCard}
                                  alt="Aadhar Preview"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748430057/upload-file_hps0cs.png"
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
                                className="absolute opacity-0 "
                                name="adharCard"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("adharCard")}
                              />
                            </div>
                          </div>

                          {/* second */}

                          <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">PAN Card</h4>

                            <div className={`max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try ${checkdiable("pancard") ? "bg-gray-200" : ""}`}>
                              {documentPreviews.pancard ? (
                                <img
                                  className="max-w-[29px] max-h-[29px] rounded-[5px]"
                                  src={documentPreviews.pancard}
                                  alt="PAN Card Preview"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748430057/upload-file_hps0cs.png"
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
                                className="absolute opacity-0"
                                name="pancard"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("pancard")}
                              />
                            </div>
                          </div>
                        </div>

                        {/* this is second doc row  */}

                        <div className="flex  mt-6">
                          {/* frist   */}
                          <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">10th Certificate</h4>

                            <div className={`max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try ${checkdiable("tenCert") ? "bg-gray-200" : ""}`}>
                              {documentPreviews.tenCert ? (
                                <img
                                  className="max-w-[29px] max-h-[29px] rounded-[5px]"
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
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748430057/upload-file_hps0cs.png"
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
                                className="absolute opacity-0"
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

                            <div className={`max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try ${checkdiable("twevelCert") ? "bg-gray-200" : ""}`}>
                              {documentPreviews.twevelCert ? (
                                <img
                                  className="max-w-[29px] max-h-[29px] rounded-[5px]"
                                  src={documentPreviews.twevelCert}
                                  alt="12th Certificate Preview"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748430057/upload-file_hps0cs.png"
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
                                className="absolute opacity-0"
                                name="twevelCert"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("twevelCert")}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex  mt-6">
                          {/* frist   */}

                          <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Cancelled Cheque</h4>
                            <div className={`max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try ${checkdiable("cancelCheque") ? "bg-gray-200" : ""}`}>
                              {documentPreviews.cancelCheque ? (
                                <img
                                  className="max-w-[29px] max-h-[29px] rounded-[5px]"
                                  src={documentPreviews.cancelCheque}
                                  alt="Cancelled Cheque Preview"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748430057/upload-file_hps0cs.png"
                                  alt="Upload Placeholder"
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    objectFit: "contain",
                                  }}
                                />
                              )}

                              <p>Click to upload</p>

                              <input
                                className="absolute opacity-0"
                                name="cancelCheque"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("cancelCheque")}
                              />
                            </div>
                          </div>

                          {currEmp === 0 && (
                            <div className="flex flex-col gap-[5px] w-full">
                              <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Last Organization</h4>

                              <div className={`max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try ${checkdiable("LastOrganization") ? "bg-gray-200" : ""}`}>
                                {documentPreviews.LastOrganization ? (
                                  <img
                                    className="max-w-[29px] max-h-[29px] rounded-[5px]"
                                    src={documentPreviews.LastOrganization}
                                    alt="Last Organization Preview"
                                    style={{
                                      height: "150px",
                                      width: "auto",
                                      objectFit: "contain",
                                    }}
                                  />
                                ) : (
                                  <img
                                    src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748430057/upload-file_hps0cs.png"
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
                                  className="absolute opacity-0"
                                  name="LastOrganization"
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                  disabled={checkdiable("LastOrganization")}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {currEmp === 0 && (
                          <>

                            <h1 className="lstOrgText !px-0">
                              Last Organization Docs
                            </h1>

                            <div className="flex  mt-6">
                              {/* first   */}

                              <div className="flex flex-col gap-[5px] w-full">
                                <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Relieving Letter</h4>

                                <div className={`max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try ${checkdiable("RelievingLetter") ? "bg-gray-200" : ""}`}>
                                  {documentPreviews.RelievingLetter ? (
                                    <img
                                      className="max-w-[29px] max-h-[29px] rounded-[5px]"
                                      src={documentPreviews.RelievingLetter}
                                      alt="Relieving Letter Preview"
                                      style={{
                                        height: "150px",
                                        width: "auto",
                                        objectFit: "contain",
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748430057/upload-file_hps0cs.png"
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
                                    className="absolute opacity-0 disabled:bg-gray-200 disabled:cursor-text disabled:text-gray-500"
                                    type="file"
                                    name="RelievingLetter"
                                    onChange={handleFileChange}
                                    disabled={checkdiable("RelievingLetter")}
                                  />
                                </div>
                              </div>

                              {/* second  */}

                              <div className="flex flex-col gap-[5px] w-full">
                                <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Offer letter</h4>


                                <div className={`max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try ${checkdiable("OfferLetter") ? "bg-gray-200" : ""}`}>
                                  {documentPreviews.OfferLetter ? (
                                    <img
                                      className="max-w-[29px] max-h-[29px] rounded-[5px]"
                                      src={documentPreviews.OfferLetter}
                                      alt="Offer Letter Preview"
                                      style={{
                                        height: "150px",
                                        width: "auto",
                                        objectFit: "contain",
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748430057/upload-file_hps0cs.png"
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
                                    className="absolute opacity-0"
                                    name="OfferLetter"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    disabled={checkdiable("OfferLetter")}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex  mt-6">
                              {/* first   */}

                              <div className="flex flex-col gap-[5px] w-full">
                                <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Experience letter</h4>

                                <div className={`max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try ${checkdiable("ExperienceLetter") ? "bg-gray-200" : ""}`}>
                                  {documentPreviews.ExperienceLetter ? (
                                    <img
                                      className="max-w-[29px] max-h-[29px] rounded-[5px]"
                                      src={documentPreviews.ExperienceLetter}
                                      alt="Experience Letter Preview"
                                      style={{
                                        height: "150px",
                                        width: "auto",
                                        objectFit: "contain",
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748430057/upload-file_hps0cs.png"
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
                                    className="absolute opacity-0"
                                    name="ExperienceLetter"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    disabled={checkdiable("ExperienceLetter")}
                                  />
                                </div>
                              </div>

                            
                            </div>
                          </>
                        )}

                        <div className="flex  ">

                          <div className="flex flex-col gap-[5px] w-full mt-4">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">ITR(Income Tax Return)</h4>

                            <div className={`max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try ${checkdiable("ITR") ? "bg-gray-200" : ""}`}>
                              {documentPreviews.ITR ? (
                                <img
                                  className="max-w-[29px] max-h-[29px] rounded-[5px]"
                                  src={documentPreviews.ITR}
                                  alt="ITR Preview"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748430057/upload-file_hps0cs.png"
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
                                className="absolute opacity-0"
                                name="ITR"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("ITR")}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-[5px] w-full mt-4">
                            <h4 className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">ITR(Income Tax Return) Pdf2</h4>

                            <div className={`max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try ${checkdiable("ITR2") ? "bg-gray-200" : ""}`}>
                              {documentPreviews.ITR2 ? (
                                <img
                                className="max-w-[29px] max-h-[29px] rounded-[5px]"
                                  src={documentPreviews.ITR2}
                                  alt="ITR2 Preview"
                                  style={{
                                    height: "150px",
                                    width: "auto",
                                    objectFit: "contain",
                                  
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748430057/upload-file_hps0cs.png"
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
                                className="absolute opacity-0"
                                name="ITR2"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={checkdiable("ITR2")}
                              />
                            </div>
                          </div>
                        </div>
                      </div>


                    </div>

                  </div>

                  <div className="">
                    <div className="basics !px-0 mt-[43px]">
                      <h3 className="font-semibold">Uploaded Documents </h3>
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
                  className=" w-[150px] h-[40px] rounded-[5px] bg-[#0B56E4] text-white font-semibold "
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

export default AdminProfile;
