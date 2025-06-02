import React, { useState, useEffect } from "react";

import "react-calendar/dist/Calendar.css"; 
import { NavLink, useFetcher, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import * as EmailValidator from "email-validator";
import { useMain } from "../../../hooks/UseMain";

const item = [
  {
    title: "Full-time Employees",
  },
  {
    title: "Intern Employees",
  },
  {
    title: "Freelancer Employees",
  },
];

const EmployeeManage = ({
  isHr = false,
}) => {
  const { id } = useParams();

  const [currEmp, setCurrEmp] = useState(0);

  const navigate = useNavigate();

  let hrms_user = JSON?.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const {
    user,
    createEmployee1,
    AllRolesapi,
    getUsers,
    updateUser,
    getBranchs,
    getDepartments,
    getDesignations,
    uploadDocuments,
    allEmployee,
    uploadToCloudinaryImg,
  } = useMain();

  const [employee, setEmployee] = useState([]);

  const getEmployee = async () => {
    const ans = await allEmployee();

    setEmployee(ans?.emp);
  };
  useEffect(() => {
    getEmployee();
  }, []);

  const [value1, setValue1] = useState({
    status: false,
    fullName: "",
    password: "",
    department: "",
    email: "",
    reportingManager: "",
    designation: "",
    joiningDate: "",
    PermissionRole: "",
    employeeCode: "",
  });

  const [emailisValid, setIsemailValid] = useState(null);
  const [emailisValid1, setIsemailValid1] = useState(null);

  const handleValidation = () => {
    const valid = EmailValidator.validate(value1.email);
    setIsemailValid(valid);
  };

  const [value2, setValue2] = useState({
    status: false,
    // gmail: "",
    email1: "",
    mobile: "",
    gender: "",
    dob: "",
    leaveNumber: "",
  });

  const handleValidation1 = () => {
    const valid = EmailValidator.validate(value2.email1);
    setIsemailValid1(valid);
  };

  const [value3, setValue3] = useState({
    status: false,
    currentAddressStatus: false,
    pan: "",
    adhar: "",
    father: "",
    currentAddress: "",
    currentState: "",
    currentCity: "",
    currentPin: "",
    residence: "",
    perState: "",
    perCity: "",
    perPin: "",
    Martial: "",
    nationality: "",
    Mother: "",
  });

  const [value4, setValue4] = useState({
    status: false,
    qualification: "",
    specialization: "",
    qualificationType: "",
    yearPass: "",
    university: "",
    college: "",
    percentage: "",
    previousCompany: "",
    previousDesignation: "",
    toDate: "",
    fromDate: "",
    numberOfMonth: "",
    Jobdescription: "",
  });

  const [value5, setValue5] = useState({
    status: false,
    SalaryPay: "",
    SalaryBankName: "",
    BeneficiaryName: "",
    BankIfsc: "",
    AccountNumber: "",
    confirmAccount: "",
    Branch: "",
  });

  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [PermRole, setPermRole] = useState([]);

  const fetchAllRoles = async () => {
    const ans = await AllRolesapi();
    setPermRole(ans?.data);
  };

  useEffect(() => {
    let form1 = localStorage.getItem("form1");
    if (form1) {
      form1 = JSON.parse(form1);
      setValue1(form1);
    }
    let form2 = localStorage.getItem("form2");
    if (form2) {
      form2 = JSON.parse(form2);
      setValue2(form2);
    }
    let form3 = localStorage.getItem("form3");
    if (form3) {
      form3 = JSON.parse(form3);
      setValue3(form3);
    }
    let form4 = localStorage.getItem("form4");
    if (form4) {
      form4 = JSON.parse(form4);
      setValue4(form4);
    }
    let form5 = localStorage.getItem("form5");
    if (form5) {
      form5 = JSON.parse(form5);
      setValue5(form5);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id, PermRole]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let ans = await getBranchs();
    let ans1 = await getDepartments();
    let ans2 = await getDesignations();
    setBranches(ans?.data);
    setDepartments(ans1?.data);
    setDesignations(ans2?.data);
  };

  const getUser = async () => {
    const ans = await getUsers(id);
    console.log("user",ans?.data)

    const { EmployeeType } = ans?.data || {};

    if (EmployeeType) {
      const index = item.findIndex((i) => i.title === EmployeeType);
      if (index !== -1) {
        setCurrEmp(index);
      }
    }

    let perm = "";

    if (ans?.data?.PermissionRole) {
      const foundRole = PermRole?.find(
        (role) => role?._id === ans.data.PermissionRole
      );
      if (foundRole) {
        perm = foundRole._id;
      }
    }

    setValue1({
      status: false,
      fullName: ans.data.fullName,
      department: ans.data.department,
      email: ans.data.email,
      reportingManager: ans.data.reportingManager,
      designation: ans.data.designation,
      joiningDate: ans.data.joiningDate,
      password: "",
      PermissionRole: perm,
      employeeCode:ans.data.employeeCode
    });
    setValue2({
      status: false,
      // gmail: ans.data.gmail,
      email1: ans.data.email1,
      mobile: ans.data.mobile,
      gender: ans.data.gender,
      leaveNumber: ans.data.leaveNumber,
      dob: ans.data.dob,
    });
    setValue3({
      status: false,
      pan: ans.data.pan,
      adhar: ans.data.adhar,
      father: ans.data.father,
      currentAddress: ans.data.currentAddress,
      currentState: ans.data.currentState,
      currentCity: ans.data.currentCity,
      currentPin: ans.data.currentPin,
      residence: ans.data.residence,
      perState: ans.data.perState,
      perCity: ans.data.perCity,
      perPin: ans.data.perPin,
      Martial: ans.data.Martial,
      nationality: ans.data.nationality,
      Mother: ans.data.Mother,
    });
    setValue4({
      status: false,
      qualification: ans.data.qualification,
      specialization: ans.data.specialization,
      qualificationType: ans.data.qualificationType,
      yearPass: ans.data.yearPass,
      university: ans.data.university,
      college: ans.data.college,
      percentage: ans.data.percentage,
      previousCompany: ans.data.previousCompany,
      previousDesignation: ans.data.previousDesignation,
      toDate: ans.data.toDate,
      fromDate: ans.data.fromDate,
      numberOfMonth: ans.data.numberOfMonth,
      Jobdescription: ans.data.Jobdescription,
    });
    setValue5({
      status: false,
      SalaryPay: ans.data.SalaryPay,
      SalaryBankName: ans.data.SalaryBankName,
      BeneficiaryName: ans.data.BeneficiaryName,
      BankIfsc: ans.data.BankIfsc,
      AccountNumber: ans.data.AccountNumber,
      confirmAccount: ans.data.confirmAccount,
      Branch: ans.data.Branch,
    });
  };

  const handleChange = (e, type) => {
    if (type === "form1") {
      setValue1({ ...value1, [e.target.name]: e.target.value });
    } else if (type === "form2") {
      if (e.target.name === "mobile" && e.target.value.length > 10) {
        return;
      }
      if (e.target.name === "leaveNumber" && e.target.value.length > 0) {
        const numericValue = parseInt(e.target.value, 10);
        if (isNaN(numericValue) || numericValue > 15) {
          return;
        }
      }
      setValue2({ ...value2, [e.target.name]: e.target.value });
    } else if (type === "form3") {
      if (e.target.name === "pan" && e.target.value.length > 10) {
        return;
      }
      if (e.target.name === "adhar" && e.target.value.length > 12) {
        return;
      }
      if (e.target.name === "currentPin" && e.target.value.length > 6) {
        return;
      }
      if (e.target.name === "perPin" && e.target.value.length > 6) {
        return;
      }
      setValue3({ ...value3, [e.target.name]: e.target.value });
    } else if (type === "form4") {
      setValue4({ ...value4, [e.target.name]: e.target.value });
    } else if (type === "form5") {
      setValue5({ ...value5, [e.target.name]: e.target.value });
    }
  };

  const [documents, setDocuments] = useState({
    adharCard: "",
    pancard: "",
    tenCert: "",
    twevelCert: "",
    highestquali:"",
    cancelCheque: "",
    LastOrganization: "",
    RelievingLetter: "",
    OfferLetter: "",
    ExperienceLetter: "",
  });

  const [previewImages, setPreviewImages] = useState({});

  const handleFileChange = async (event, name) => {
    const file = event.target.files[0];
    if (file) {
      setDocuments((prevDocuments) => ({
        ...prevDocuments,
        [name]: file,
      }));
    }

    const toastId = toast.loading("Wait...");
    const ans = await uploadToCloudinaryImg({ image: file });

    if (ans?.status) {
      toast.success("Successfuly");
      setPreviewImages((prev) => ({
        ...prev,
        [name]: ans?.data,
      }));
    }
    toast.dismiss(toastId);
  };

  const validateFields = () => {
    const missingFields = [];

    if (!value1.fullName) missingFields.push('Full Name');
    if (!value1.password) missingFields.push('Password');
    if (!value1.department) missingFields.push('Department');
    if (!value1.email) missingFields.push('Company Email');
    if (!value1.reportingManager) missingFields.push('Reporting Manager');
    if (!value1.designation) missingFields.push('Designation');
    if (!value1.joiningDate) missingFields.push('Joining Date');
    if (!value1.PermissionRole) missingFields.push('Permission Role');
    if (!value1.employeeCode) missingFields.push('Employee Code');


    if (!value3.pan) missingFields.push('PAN');
    if (!value3.adhar) missingFields.push('Aadhar');
   
    if (!value2.email1) missingFields.push('Personal Email');
    // if (!value2.mobile) missingFields.push('Mobile');
    if (!value2.gender) missingFields.push('Gender');
    if (!value2.dob) missingFields.push('Date of Birth');
    if (!value2.leaveNumber) missingFields.push('Leave Number');

    if (missingFields.length > 0) {
      // return `Please fill all the required fields`;
      return `Please fill the following required fields: ${missingFields.join(', ')}`
    }

    return true;
  };


  const handleSubmit = async (e, type) => {
    e.preventDefault();

    if (emailisValid === false && value1?.email !== "") {
      toast.dismiss(toastId);
      return toast.error("Please Enter Correct Gmail");
    }

    if (emailisValid1 === false && value2?.email1 !== "") {
      toast.dismiss(toastId);
      return toast.error("Please Enter Correct Gmail");
    }

    if (value1.fullName === "") {
      return toast.error("Please Enter Full Name");
    }

    if (value1.department === "") {
      return toast.error("Please Select Department");
    }

    if (value1.employeeCode === "") {
      return toast.error("Please Enter Employee Code");
    }

    if (value2.leaveNumber > 15) {
      return toast.error("Annual Employee Leaves cannot be more than 15.")
    }

    const isDuplicateCode = employee?.some(
      (emp) => emp?.employeeCode?.toLowerCase() === value1.employeeCode?.toLowerCase()
    );

    if (id === null) {
      if (isDuplicateCode) {
        return toast.error("Employee Code already exists. Please use a unique code.");
      }
    }



    const validationResult = validateFields();
    if (validationResult !== true) {
      return toast.error(validationResult);
    }


    const toastId = toast.loading("Loading...");

    if (!id) {
      const {
        adharCard,
        pancard,
        tenCert,
        twevelCert,
        highestquali,
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
      if (documents.highestquali) {
        formData.append("highestquali", highestquali);
      }
      if (documents.ExperienceLetter) {
        formData.append("ExperienceLetter", ExperienceLetter);
      }
      // Log form data to console
      console.log("Form Data being sent:", {
        ...value1,
        ...value2,
        ...value3,
        ...value4,
        ...value5,
        leaveNumber: value2.leaveNumber,
      });
      if (
        documents.adharCard !== "" ||
        documents.pancard !== "" ||
        documents.tenCert !== "" ||
        documents.twevelCert !== "" ||
        documents.highestquali !== "" ||
        documents.cancelCheque !== "" ||
        documents.LastOrganization !== "" ||
        documents.RelievingLetter !== "" ||
        documents.OfferLetter !== "" ||
        documents.ExperienceLetter !== ""
      ) {
        const ans = await createEmployee1({
          ...value1,
          ...value2,
          ...value3,
          ...value4,
          ...value5,
          formData,
          employeeType: item[currEmp].title,
        });
      } else {
        const ans = await createEmployee1({
          ...value1,
          ...value2,
          ...value3,
          ...value4,
          ...value5,
          employeeType: item[currEmp].title,
        });
      }

      localStorage.removeItem("form1");
      localStorage.removeItem("form2");
      localStorage.removeItem("form3");
      localStorage.removeItem("form4");
      localStorage.removeItem("form5");

      setValue1({
        status: false,
        fullName: "",
        password: "",
        department: "",
        email: "",
        reportingManager: "",
        designation: "",
        joiningDate: "",
        PermissionRole: "",
      });
      setValue2({
        status: false,
        // gmail: "",
        email1: "",
        mobile: "",
        gender: "",
        leaveNumber: "",
        dob: "",
      });
      setValue3({
        status: false,
        pan: "",
        adhar: "",
        father: "",
        currentAddress: "",
        currentState: "",
        currentCity: "",
        currentPin: "",
        residence: "",
        perState: "",
        perCity: "",
        perPin: "",
        Martial: "",
        nationality: "",
        Mother: "",
      });
      setValue4({
        status: false,
        qualification: "",
        specialization: "",
        qualificationType: "",
        yearPass: "",
        university: "",
        college: "",
        percentage: "",
        previousCompany: "",
        previousDesignation: "",
        toDate: "",
        fromDate: "",
        numberOfMonth: "",
        Jobdescription: "",
      });
      setValue5({
        status: false,
        SalaryPay: "",
        SalaryBankName: "",
        BeneficiaryName: "",
        BankIfsc: "",
        AccountNumber: "",
        confirmAccount: "",
        Branch: "",
      });
      setPreviewImages({});

      toast.success("Successfuly created");
    } else {
      const {
        adharCard,
        pancard,
        tenCert,
        twevelCert,
        highestquali,
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
      if (documents.pancard) {
        formData.append("pancard", pancard);
      }
      if (documents.tenCert) {
        formData.append("tenCert", tenCert);
      }
      if (documents.twevelCert) {
        formData.append("twevelCert", twevelCert);
      }
      if (documents.highestquali) {
        formData.append("highestquali", highestquali);
      }
      if (documents.LastOrganization) {
        formData.append("LastOrganization", LastOrganization);
      }
      if (documents.RelievingLetter) {
        formData.append("RelievingLetter", RelievingLetter);
      }
      if (documents.OfferLetter) {
        formData.append("OfferLetter", OfferLetter);
      }
      if (documents.ExperienceLetter) {
        formData.append("ExperienceLetter", ExperienceLetter);
      }

      if (
        adharCard !== "" ||
        pancard !== "" ||
        tenCert !== "" ||
        twevelCert !== "" ||
        highestquali !== "" ||
        cancelCheque !== "" ||
        LastOrganization !== "" ||
        RelievingLetter !== "" ||
        OfferLetter !== "" ||
        ExperienceLetter !== ""
      ) {
        const ans = await uploadDocuments(id, formData);
        if (ans?.success) {
          toast.success("Successfuly updated the documents");
          setPreviewImages({});
        }
      }

      const ans = await updateUser(id, value1, value2, value3, value4, value5);

      toast.success("success", "Profile updated Successfully");

      if (!isHr) {
        navigate("/adminDash/HRM/EmployeeManagement");
      } else {
        navigate("/hrDash/EmployeeMan");
      }
    }

    toast.dismiss(toastId);
  };


  useEffect(() => {
    fetchAllRoles();
  }, []);

  return (
    <>
      <div className="employee-dash h-full">
        <div className="w-full ">
         
          <div className="relative w-full p-[32px_20px_32px_20px]">
            {/* first  */}
            <section className="flex flex-col lg:flex-row items-center justify-between">
              {/* left side  */}
              <h2 className="text-[#101820] font-inter text-2xl font-semibold leading-8 text-left">{id ? "Edit" : "Add"} Employee </h2>

              {/* right side  */}
              <div className="flex gap-4 items-center">
                <NavLink to="/adminDash/HRM/employeeManagement">
                  <button className="w-[102px] h-[40px] flex gap-[10px] rounded-[10px] border mt-2 lg:mt-0">
                    <span className="w-[102px] h-[40px] flex gap-[10px] rounded-[10px] border border-[#0B56E4] bg-gradient-to-br from-[#D1E8FD] via-[#EDEFFF] to-[#EDEFFF] items-center justify-center text-[#0B56E4]">Cancel</span>
                  </button>
                </NavLink>
              
                <button
                  onClick={(f) => {
                    handleSubmit(f, "submit");
                  }}
                  type="submit"
                  className=" text-white text-base font-medium leading-5 ctext-white outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  font-semibold rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                 {id ? "Save Changes" : "Register"}
                </button>
              </div>
            </section>

            <div className="flex-col">
              {/* first sec */}
              <div className="flex items-center gap-6 border-gray-200 rounded-lg mt-10 bg-white p-3 overflow-x-scroll lg:overflow-x-hidden mr-2">
                {item.map((e, index) => (
                  <div
                    onClick={() => setCurrEmp(index)}
                    className="flex items-center gap-2 cursor-pointer min-w-fit"
                    key={index}
                  >
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747395339/bx-user-pin_mfhhlq.png" alt="" />

                    <p className={`${currEmp == index ? "text-[14px] font-normal leading-[24px] text-left text-[#0B56E4]" : "text-[14px] font-normal leading-[24px] text-left text-[#0F141C]"}`}>
                      {e.title}
                    </p>
                  </div>
                ))}
              </div>

              <form
                className="mt-[30px]"
              >
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col lg:flex-row gap-5 w-full justify-between">
                    <div className="bg-white max-w-[100%] lg:max-w-[48%] w-full p-4 rounded-lg shadow">
                    
                      <div className="flex items-center justify-between ">
                        <h3 className="text-[#101820] text-[16px] font-bold leading-[24px] tracking-[0.0015em] text-left">Personal Detail</h3>
                      </div>
                      <hr className="mt-5 opacity-80" />
                      <div className="form-section">
                        <div>
                          <div className="flex flex-col gap-[20px] mt-[10px] mb-[10px]">
                            <label className="block text-md font-normal mb-1">
                              <p>Full Name <span className="text-red-600">*</span></p>
                              <input
                              className="w-full border rounded p-2 text-sm font-normal "
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                name="fullName"
                                value={value1?.fullName}
                                type="text"
                                placeholder="Full Name"
                                disabled={value1.status}
                              />
                            </label>

                            <label htmlFor="password" className="block text-md font-normal mb-1">
                              <p>Password <span className="text-red-600">*</span></p>

                              <input
                              className="w-full border rounded p-2 text-sm font-normal "
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                name="password"
                                value={value1?.password}
                                type="text"
                                placeholder="Password"
                                disabled={value1.status}
                              />
                            </label>

                            <label htmlFor="dob" className="block text-md font-normal mb-1">
                              <p>Date of Birth <span className="text-red-600">*</span></p>

                              <input
                              className="w-full border rounded p-2 text-sm font-normal "
                                onChange={(e) => {
                                  handleChange(e, "form2");
                                }}
                                name="dob"
                                value={value2?.dob}
                                type="date"
                                placeholder="Date of Birth"
                                disabled={value2.status}
                              />
                            </label>

                            <div className="makethisflex1">
                              <div className=" w-full try">
                                <label
                                  for="pan"
                                  className="block text-md font-normal mb-1"
                                >
                                  PAN No. <span className="text-red-600">*</span>
                                </label>
                                <input
                                  type="text"
                                  id="pan"
                                  className="w-full border rounded p-2 text-sm font-normal "
                                  // required
                                  name="pan"
                                  value={value3?.pan}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>

                              <div className=" w-full try">
                                <label
                                  for="adhar"
                                  className="block text-md font-normal mb-1 pt-4"
                                >
                                  Aadhaar No. <span className="text-red-600">*</span>
                                </label>
                                <input
                                  type="text"
                                  id="adhar"
                                  className="w-full border rounded p-2 text-sm font-normal "
                             
                                  // required
                                  name="adhar"
                                  value={value3?.adhar}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>
                            </div>

                            <div className="makethisflex1">


                              <div className=" w-full try">
                                <label
                                  for="father"
                                  className="block text-md font-normal mb-1"
                                >
                                  Father Name
                                </label>
                                <input
                                  type="text"
                                  id="father"
                                 className="w-full border rounded p-2 text-sm font-normal "
                                  // required
                                  name="father"
                                  value={value3?.father}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>

                              <div className=" w-full pt-5 try">
                                <label
                                  for="Mother"
                                  className="block text-md font-normal mb-1"
                                >
                                  Mother name
                                </label>
                                <input
                                  type="text"
                                  id="Mother"
                                 className="w-full border rounded p-2 text-sm font-normal "
                                  // required
                                  name="Mother"
                                  value={value3?.Mother}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>
                            </div>

                            <div className="makethisflex1">
                              <div className=" w-full try">
                                <label
                                  for="currentAddress"
                                  className="block text-md font-normal mb-1"
                                >
                                  Mobile Number
                                </label>
                                <input
                                  type="number"
                                  id="mobile"
                                className="w-full border rounded p-2 text-sm font-normal "
                                  // required
                                  name="mobile"
                                  value={value2?.mobile}
                                  onChange={(e) => {
                                    handleChange(e, "form2");
                                  }}
                                  disabled={value2.status}
                                />
                              </div>

                              <div className=" w-full pt-5 try">
                                <label
                                  for="Martial"
                                  className="block text-md font-normal mb-1"
                                >
                                  Marital status
                                </label>
                                <select
                                  className="w-full border rounded p-2 text-sm font-normal"
                                  name="Martial"
                                  id="Martial"
                                  value={value3?.Martial}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                >
                                  <option>Martial Status</option>
                                  <option>Married</option>
                                  <option>UnMarried</option>
                                </select>
                              </div>
                            </div>

                            <label htmlFor="" className="block text-md font-normal mb-1">
                              <p>Department <span className="text-red-600">*</span></p>

                              <select
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                name="department"
                                value={value1?.department}
                                disabled={value1.status}
                                className="department_test w-full border rounded p-2 text-sm font-normal "
                              >
                                <option value={""}>Select Department</option>
                                {departments?.map((e, index) => {
                                  return (
                                    <option key={index} value={e?.name}>
                                      {e?.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </label>

                            <label htmlFor="" className="block text-md font-normal mb-1">
                              <p>Employee Code <span className="text-red-600">*</span></p>

                              <input
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                type="text"
                                name="employeeCode"
                                value={value1?.employeeCode}
                                disabled={id ? true : false}
                                placeholder="Enter Employee Code"
                                className="w-full border rounded p-2 text-sm font-normal "
                              />
                            </label>
                            <label htmlFor="" className="block text-md font-normal mb-1">
                              <p>Company Email <span className="text-red-600">*</span></p>

                              <input
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                  handleValidation(e.target.value);
                                }}
                              
                                className={`w-full border rounded p-2 text-sm font-normal  ${
  emailisValid === false && value1.email !== "" ? "border-red-500" : ""
}`}

                                type="email"
                                // name="gmail"
                                name="email"
                                // value={value1?.gmail}
                                value={value1?.email}
          
                                placeholder="Company Email Address"
                                disabled={value1.status}
                              />
                            </label>

                            <label htmlFor="" className="block text-md font-normal mb-1">
                              <p>Reporting Manager <span className="text-red-600">*</span></p>

                              <select
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                name="reportingManager"
                                value={value1?.reportingManager}
                                disabled={value1.status}
                                className="department_test w-full border rounded p-2 text-sm font-normal "
                              >
                                <option>Reporting Manager</option>
                                {employee?.map((val, index) => {
                                  return (
                                    <option key={index} value={val?.fullName}>
                                      {val?.fullName}
                                    </option>
                                  );
                                })}
                                {/* <option value="Chirag">Chirag Negi</option> */}
                              </select>
                            </label>

                            <label htmlFor="" className="block text-md font-normal mb-1">
                              <p>Designation <span className="text-red-600">*</span></p>

                              <select
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                name="designation"
                                value={value1?.designation}
                                disabled={value1.status}
                                className="department_test w-full border rounded p-2 text-sm font-normal "
                              >
                                <option>Designation</option>
                                {designations?.map((e, index) => {
                                  return (
                                    <option key={index} value={e?._name}>
                                      {e?.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </label>

                            <label htmlFor="" className="block text-md font-normal mb-1">
                              <p>Role <span className="text-red-600">*</span></p>

                              <select
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                name="PermissionRole"
                                value={value1?.PermissionRole}
                                disabled={value1.status}
                                className="department_test w-full border rounded p-2 text-sm font-normal "
                              >
                                <option selected>Select Role</option>
                                {PermRole?.map((e, index) => {
                                  return (
                                    <option key={index} value={e?._id}>
                                      {e?.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </label>

                            <label htmlFor="" className="block text-md font-normal mb-1">
                              <p>Joining Date <span className="text-red-600">*</span></p>

                              <input
                                onChange={(e) => {
                                  handleChange(e, "form1");
                                }}
                                type="date"
                                name="joiningDate"
                                value={value1?.joiningDate}
                                disabled={value1.status}
                                className="w-full border rounded p-2 text-sm font-normal "
                              />
                            </label>

                            <label
                              for="email1"
                              className="block text-md font-normal mb-1"
                            >
                              <p> Personal Email Address <span className="text-red-600">*</span></p>
                              <input
                                type="email"
                                id="email1"
                            className={`w-full rounded-lg p-2 text-sm font-normal ${
    emailisValid1 === false && value2.email1 !== ""
      ? "emailvalidinput border "
      : "border "
  }`}
                                // required
                                name="email1"
                                value={value2?.email1}
                                onChange={(e) => {
                                  handleChange(e, "form2");
                                  handleValidation1(e.target.value);
                                }}
                                disabled={value2.status}
                              />
                            </label>

                            <label
                              for="gender"
                              className="block text-md font-normal mb-1 "
                            >
                              <p> Gender <span className="text-red-600">*</span></p>
                              <select
                                onChange={(e) => {
                                  handleChange(e, "form2");
                                }}
                                name="gender"
                                value={value2?.gender}
                                disabled={value2.status}
                                className="w-full border rounded p-2 text-sm font-normal "
                              >
                                <option>gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                onChange=
                                {(e) => {
                                  handleChange(e, "form2");
                                }}
                                disabled={value2.status}
                              </select>
                            </label>

                            <div className="flex w-full">
                              <div className=" w-full try">
                                <label
                                  htmlFor="leaveNumber"
                                  className="block text-md font-normal mb-1"
                                >
                                  Total Leaves <span className="text-red-600">*</span>
                                </label>
                                <input
                                  type="number"
                                  id="leaveNumber"
                                  className="w-full border rounded p-2 text-sm font-normal "
                                  name="leaveNumber"
                                  value={value2?.leaveNumber}
                                  max="15"
                                  min="0"
                                  onChange={(e) => handleChange(e, "form2")}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-[15px] rounded-[10px] max-w-[100%] lg:max-w-[49%] w-full shadow">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[#101820] text-[16px] font-bold leading-[24px] tracking-[0.0015em] text-left">Address Detail</h3>
                      </div>
                      <hr className="mt-5 opacity-80" />

                      <div className="form2-class">
                        <div className="w-full mt-2 flex flex-col gap-5">
                        
                          <div className="flex w-full">
                            <div className=" w-full try">
                              <label
                                for="currentState"
                                className="block text-md font-normal mb-1 "
                              >
                                Current Residence Address
                              </label>
                              <input
                                type="text"
                                id="currentAddress"
                                name="currentAddress"
                                value={value3.currentAddress}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setValue3((prev) => ({
                                    ...prev,
                                    currentAddress: val,
                                    residence: prev.status ? val : prev.residence,
                                  }));
                                }}
                                className="w-full border rounded p-2 text-sm font-normal "
                              />


                            </div>
                          </div>
                          <div className="flex w-full flex-col">
                            <div className=" w-full try">
                              <label
                                for="currentState"
                                className="block text-md font-normal mb-1 "
                              >
                                Current state
                              </label>

                            
                              <select
                                className="w-full border rounded p-2 text-sm font-normal "
                                name="currentState"
                                value={value3?.currentState}
                                id="currentState"
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              >
                                <option>Current State</option>
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
                                <option>
                                  Dadra & Nagar Haveli and Daman & Diu (UT)
                                </option>
                                <option>
                                  Delhi [National Capital Territory (NCT)]
                                </option>
                                <option>Jammu & Kashmir (UT)</option>
                                <option>Ladakh (UT)</option>
                                <option>Lakshadweep (UT)</option>
                                <option>Puducherry (UT)</option>
                              </select>
                            </div>
                           
                          </div>

                          <div className="flex w-full gap-2">
                            <div className=" w-full try">
                              <label
                                for="currentCity"
                                className="block text-md font-normal mb-1"
                              >
                                Current city
                              </label>
                              <input
                                type="text"
                                id="currentCity"
                                className="w-full border rounded p-2 text-sm font-normal "
                                // required
                                name="currentCity"
                                value={value3?.currentCity}
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              />
                            </div>
                            <div className=" w-full try">
                              <label
                                for="currentPin"
                                className="block text-md font-normal mb-1"
                              >
                                Area Pincode
                              </label>
                              <input
                                type="text"
                                id="currentPin"
                                className="w-full border rounded p-2 text-sm font-normal "
                                // required
                                name="currentPin"
                                value={value3?.currentPin}
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              />
                            </div>
                          </div>

                       <div className="pt-5 pb-5">
                           <label className="text-md font-normal mb-1">
                            <input
                              type="checkbox"
                              checked={value3.currentAddressStatus}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setValue3((prev) => ({
                                  ...prev,
                                  currentAddressStatus: checked,
                                  residence: checked ? prev.currentAddress : "",
                                  perState: checked ? prev.currentState : "",
                                  perCity: checked ? prev.currentCity : "",
                                  perPin: checked ? prev.currentPin : "",
                                }));
                              }}
                              className="border rounded p-2 text-sm font-normal "
                            />
                            <span className="p-4">Permanent address same as current</span>
                          </label>
                       </div>

                          <div className="flex w-full">
                            <div className=" w-full try">
                              <div className="flex items-center">
                               
                                <label htmlFor="residence" className="block text-md font-normal mb-1">
                                  Permanent Residence Address
                                </label>
                                <div className="flex items-center"></div>
                              </div>
                             
                              <input
                                type="text"
                                name="residence"
                                id="residence"
                                className="w-full border rounded p-2 text-sm font-normal "
                                value={value3?.residence}
                                disabled={value3?.currentAddressStatus}
                                onChange={(e) => handleChange(e, "form3")}
                              />
                            </div>
                          </div>

                          <div className=" try">
                            <label
                              for="currentAddress"
                              className="block text-md font-normal mb-1"
                            >
                              Permanent state
                            </label>
                            <select
                              className="w-full border rounded p-2 text-sm font-normal "
                              name="perState"
                              value={value3?.perState}
                              id="perState"
                              onChange={(e) => {
                                handleChange(e, "form3");
                              }}
                              disabled={value3.currentAddressStatus}
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
                              <option>
                                Dadra & Nagar Haveli and Daman & Diu (UT)
                              </option>
                              <option>
                                Delhi [National Capital Territory (NCT)]
                              </option>
                              <option>Jammu & Kashmir (UT)</option>
                              <option>Ladakh (UT)</option>
                              <option>Lakshadweep (UT)</option>
                              <option>Puducherry (UT)</option>
                            </select>
                          </div>

                          <div className=" try">
                            <label
                              for="perCity"
                              className="block text-md font-normal mb-1"
                            >
                              Permanent city
                            </label>
                            
                            <input
                              type="text"
                              id="perCity"
                              name="perCity"
                              className="w-full border rounded p-2 text-sm font-normal "
                              value={value3?.perCity}
                              disabled={value3?.currentAddressStatus}
                              onChange={(e) => handleChange(e, "form3")}
                            />
                          </div>

                          <div className=" try">
                            <label
                              for="perPin"
                              className="block text-md font-normal mb-1"
                            >
                              Permanent Area Pincode
                            </label>
                            <input
                              type="text"
                              id="perPin"
                              className="w-full border rounded p-2 text-sm font-normal "
                              // required
                              name="perPin"
                              value={value3?.perPin}
                              onChange={(e) => {
                                handleChange(e, "form3");
                              }}
                              disabled={value3?.currentAddressStatus}
                            />
                          </div>

                          <div className="flex w-full makethisflex1">

                            <div className=" w-full try">
                              <label
                                for="nationality"
                                className="block text-md font-normal mb-1"
                              >
                                Nationality
                              </label>
                              <select
                                className="w-full border rounded p-2 text-sm font-normal "
                                name="nationality"
                                id="nationality"
                                value={value3?.nationality}
                                onChange={(e) => {
                                  handleChange(e, "form3");
                                }}
                                disabled={value3.status}
                              >
                                <option>Nationality</option>
                                <option>Indian</option>
                              </select>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row w-full gap-5 justify-between">
                    {/* this is doc side  */}

                    <div className="bg-white max-w-[100%] lg:max-w-[48%] w-full p-4 rounded-lg shadow">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[#101820] text-[16px] font-bold leading-[24px] tracking-[0.0015em] text-left">Documents</h3>
                      </div>

                      <hr className="mt-5 opacity-80" />

                      <div className="w-full alldocwwrap">
                        {/* this is first doc row  */}

                        <div className="flex w-full gap-[10px] justify-between flex-col xl:flex-row">
                          {/* fist   */}
                          <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="pt-2">Aadhar Card </h4>

                            <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly cursor-pointer">
                              <img className="h-full w-full object-cover rounded-[5px] max-w-[29px] max-h-[29px]" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747395640/upload-file_eeafaw.png" alt="" />

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline cursor-pointer">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-600 w-full border rounded p-2 text-sm font-normal  cursor-pointer"
                                name="adharCard"
                                type="file"
                                onChange={(e) =>
                                  handleFileChange(e, "adharCard")
                                }
                              />
                            </div>

                            {previewImages?.adharCard && (
                              <div className="previewiamges">
                                <nav>
                                  {" "}
                                  <ImCross
                                    onClick={() => {
                                      setPreviewImages((prev) => {
                                        const updatedPreviewImages = {
                                          ...prev,
                                        };
                                        delete updatedPreviewImages.adharCard;
                                        return updatedPreviewImages;
                                      });

                                      setDocuments((prev) => ({
                                        ...prev,
                                        adharCard: "",
                                      }));
                                    }}
                                    className="cursor-pointer"
                                  />{" "}
                                </nav>
                                <img src={previewImages?.adharCard?.secure_url} alt="" />
                              </div>
                            )}
                          </div>

                          {/* second */}

                          <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="pt-2">PAN Card</h4>

                            <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                              <img className="h-full w-full object-cover rounded-[5px] max-w-[29px] max-h-[29px]" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747395640/upload-file_eeafaw.png" alt="" />

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-600 w-full border rounded p-2 text-sm font-normal "
                                type="file"
                                name="pancard"
                                onChange={(e) => handleFileChange(e, "pancard")}
                              />
                            </div>

                            {previewImages?.pancard && (
                              <div className="previewiamges">
                                <nav>
                                  {" "}
                                  <ImCross
                                    onClick={() => {
                                      setPreviewImages((prev) => {
                                        const updatedPreviewImages = {
                                          ...prev,
                                        };
                                        delete updatedPreviewImages?.pancard;
                                        return updatedPreviewImages;
                                      });

                                      setDocuments((prev) => ({
                                        ...prev,
                                        pancard: "",
                                      }));
                                    }}
                                    className="cursor-pointer"
                                  />{" "}
                                </nav>
                                <img src={previewImages?.pancard?.secure_url} alt="" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* this is second doc row  */}

                        <div className="flex w-full gap-[10px] justify-between flex-col xl:flex-row">
                          {/* frist   */}
                          <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="pt-2">10th Certificate</h4>

                            <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly ">
                              <img className="h-full w-full object-cover rounded-[5px] max-w-[29px] max-h-[29px]" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747395640/upload-file_eeafaw.png" alt="" />

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-600 w-full border rounded p-2 text-sm font-normal "
                                type="file"
                                name="tenCert"
                                onChange={(e) => handleFileChange(e, "tenCert")}
                              />
                            </div>
                            {previewImages?.tenCert && (
                              <div className="previewiamges">
                                <nav>
                                  {" "}
                                  <ImCross
                                    onClick={() => {
                                      setPreviewImages((prev) => {
                                        const updatedPreviewImages = {
                                          ...prev,
                                        };
                                        delete updatedPreviewImages?.tenCert;
                                        return updatedPreviewImages;
                                      });

                                      setDocuments((prev) => ({
                                        ...prev,
                                        tenCert: "",
                                      }));
                                    }}
                                    className="cursor-pointer"
                                  />{" "}
                                </nav>
                                <img src={previewImages?.tenCert?.secure_url} alt="" />
                              </div>
                            )}
                          </div>

                          {/* second  */}
                          <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="pt-2">12th Certificate</h4>

                            <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly">
                              <img className="h-full w-full object-cover rounded-[5px] max-w-[29px] max-h-[29px]" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747395640/upload-file_eeafaw.png" alt="" />

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                name="twevelCert w-full border rounded p-2 text-sm font-normal "
                                onChange={(e) =>
                                  handleFileChange(e, "twevelCert")
                                }
                                className="absolute opacity-0 bg-red-600"
                                type="file"
                              />
                            </div>
                            {previewImages?.twevelCert && (
                              <div className="previewiamges">
                                <nav>
                                  {" "}
                                  <ImCross
                                    onClick={() => {
                                      setPreviewImages((prev) => {
                                        const updatedPreviewImages = {
                                          ...prev,
                                        };
                                        delete updatedPreviewImages?.twevelCert;
                                        return updatedPreviewImages;
                                      });

                                      setDocuments((prev) => ({
                                        ...prev,
                                        twevelCert: "",
                                      }));
                                    }}
                                    className="cursor-pointer"
                                  />{" "}
                                </nav>
                                <img src={previewImages?.twevelCert?.secure_url} alt="" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex w-full gap-[10px] justify-between flex-col xl:flex-row">
                          

                          <div className="flex flex-col gap-[5px] w-full">
                            <h4 className="pt-2">Cancelled Cheque</h4>
                            <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly ">
                              <img className="h-full w-full object-cover rounded-[5px] max-w-[29px] max-h-[29px]" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747395640/upload-file_eeafaw.png" alt="" />

                              <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                              <input
                                className="absolute opacity-0 bg-red-600 w-full border rounded p-2 text-sm font-normal "
                                type="file"
                                name="cancelCheque"
                                onChange={(e) =>
                                  handleFileChange(e, "cancelCheque")
                                }
                              />
                            </div>
                            {previewImages?.cancelCheque && (
                              <div className="previewiamges">
                                <nav>
                                  {" "}
                                  <ImCross
                                    onClick={() => {
                                      setPreviewImages((prev) => {
                                        const updatedPreviewImages = {
                                          ...prev,
                                        };
                                        delete updatedPreviewImages?.cancelCheque;
                                        return updatedPreviewImages;
                                      });

                                      setDocuments((prev) => ({
                                        ...prev,
                                        cancelCheque: "",
                                      }));
                                    }}
                                    className="cursor-pointer"
                                  />{" "}
                                </nav>
                                <img src={previewImages?.cancelCheque?.secure_url} alt="" />
                              </div>
                            )}
                          </div>

                 
                            
                         
                        </div>

                        {currEmp === 0 && (
                          <>
                            <h1 className="text-[#101820] pt-20px pr-20px pb-0 pl-20px text-[16px] font-bold leading-[24px] tracking-[0.0015em] text-left mt-3">
                              Last Organization Docs
                            </h1>

                            <div className="flex w-full gap-[10px] justify-between flex-col xl:flex-row">
                              {/* first   */}

                              <div className="flex flex-col gap-[5px] w-full">
                                <h4 className="pt-2">Relieving Letter</h4>

                                <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                                  <img className="h-full w-full object-cover rounded-[5px] max-w-[29px] max-h-[29px]" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747395640/upload-file_eeafaw.png" alt="" />

                                  <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                                  <input
                                    className="absolute opacity-0 bg-red-600 w-full border rounded p-2 text-sm font-normal "
                                    type="file"
                                    name="RelievingLetter"
                                    onChange={(e) =>
                                      handleFileChange(e, "RelievingLetter")
                                    }
                                  />
                                </div>
                                {previewImages?.RelievingLetter && (
                                  <div className="previewiamges">
                                    <nav>
                                      {" "}
                                      <ImCross
                                        onClick={() => {
                                          setPreviewImages((prev) => {
                                            const updatedPreviewImages = {
                                              ...prev,
                                            };
                                            delete updatedPreviewImages?.RelievingLetter;
                                            return updatedPreviewImages;
                                          });

                                          setDocuments((prev) => ({
                                            ...prev,
                                            RelievingLetter: "",
                                          }));
                                        }}
                                        className="cursor-pointer"
                                      />{" "}
                                    </nav>
                                    <img
                                      src={previewImages?.RelievingLetter}
                                      alt=""
                                    />
                                  </div>
                                )}
                              </div>

                              {/* second  */}

                              <div className="flex flex-col gap-[5px] w-full">
                                <h4 className="pt-2">Offer letter</h4>

                                <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                                  <img className="h-full w-full object-cover rounded-[5px] max-w-[29px] max-h-[29px]" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747395640/upload-file_eeafaw.png" alt="" />

                                  <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                                  <input
                                    name="OfferLetter"
                                    className="absolute opacity-0 bg-red-600 w-full border rounded p-2 text-sm font-normal "
                                    type="file"
                                    onChange={(e) =>
                                      handleFileChange(e, "OfferLetter")
                                    }
                                  />
                                </div>
                                {previewImages?.OfferLetter && (
                                  <div className="previewiamges">
                                    <nav>
                                      {" "}
                                      <ImCross
                                        onClick={() => {
                                          setPreviewImages((prev) => {
                                            const updatedPreviewImages = {
                                              ...prev,
                                            };
                                            delete updatedPreviewImages?.OfferLetter;
                                            return updatedPreviewImages;
                                          });

                                          setDocuments((prev) => ({
                                            ...prev,
                                            OfferLetter: "",
                                          }));
                                        }}
                                        className="cursor-pointer"
                                      />{" "}
                                    </nav>
                                    <img
                                      src={previewImages?.OfferLetter}
                                      alt=""
                                    />
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex w-full gap-[10px] justify-between flex-col xl:flex-row">
                              {/* first   */}

                              <div className="flex flex-col gap-[5px] w-full">
                                <h4 className="pt-2">Experience letter</h4>

                                <div className="max-w-[252px] w-full h-[62px] rounded-[12px] border border-[#B7B7B7] flex items-center justify-evenly try">
                                  <img className="h-full w-full object-cover rounded-[5px] max-w-[29px] max-h-[29px]" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747395640/upload-file_eeafaw.png" alt="" />

                                  <p className="text-[14px] font-medium leading-[24px] tracking-[0.005em] text-[#1B2533] underline">Click to upload</p>

                                  <input
                                    className="absolute opacity-0 bg-red-600 w-full border rounded p-2 text-sm font-normal "
                                    type="file"
                                    name="ExperienceLetter"
                                    onChange={(e) =>
                                      handleFileChange(e, "ExperienceLetter")
                                    }
                                  />
                                </div>
                                {previewImages?.ExperienceLetter && (
                                  <div className="previewiamges">
                                    <nav>
                                      {" "}
                                      <ImCross
                                        onClick={() => {
                                          setPreviewImages((prev) => {
                                            const updatedPreviewImages = {
                                              ...prev,
                                            };
                                            delete updatedPreviewImages?.ExperienceLetter;
                                            return updatedPreviewImages;
                                          });

                                          setDocuments((prev) => ({
                                            ...prev,
                                            ExperienceLetter: "",
                                          }));
                                        }}
                                        className="cursor-pointer"
                                      />{" "}
                                    </nav>
                                    <img
                                      src={previewImages?.ExperienceLetter}
                                      alt=""
                                    />
                                  </div>
                                )}
                              </div>

                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* this is backend acc side  */}
                    <div className="bg-white p-[15px] rounded-[10px] max-w-[100%] lg:max-w-[49%] w-full shadow">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[#101820] text-[16px] font-bold leading-[24px] tracking-[0.0015em] text-left">Bank Account Information</h3>
                      </div>

                      <hr className="mt-5 opacity-80" />

                      <div className="form2-class">
                        <div className="w-full flex flex-col gap-[20px] mt-2">
                          <div className="flex flex flex-col gap-5 w-full">
                            <div className=" w-full try">
                              <label
                                for="SalaryPay"
                                className="block text-md font-normal mb-1"
                              >
                                Salary Pay Mode
                              </label>
                              <input
                                type="text"
                                id="SalaryPay"
                                className="w-full border rounded p-2 text-sm font-normal "
                                name="SalaryPay"
                                value={value5?.SalaryPay}
                                onChange={(e) => {
                                  handleChange(e, "form5");
                                }}
                                disabled={value5.status}
                              />
                            </div>

                            <div className=" w-full try">
                              <label
                                for="SalaryBankName"
                                className="block text-md font-normal mb-1"
                              >
                                Salary Bank Name
                              </label>
                              <input
                                type="text"
                                id="SalaryBankName"
                                className="w-full border rounded p-2 text-sm font-normal "
                                name="SalaryBankName"
                                value={value5?.SalaryBankName}
                                onChange={(e) => {
                                  handleChange(e, "form5");
                                }}
                                disabled={value5.status}
                              />
                            </div>

                            <div className=" w-full try">
                              <label
                                for="BeneficiaryName"
                                className="block text-md font-normal mb-1"
                              >
                                Beneficiary Name
                              </label>

                              <input
                                type="text"
                                id="BeneficiaryName"
                                className="w-full border rounded p-2 text-sm font-normal "
                                name="BeneficiaryName"
                                value={value5?.BeneficiaryName}
                                onChange={(e) => {
                                  handleChange(e, "form5");
                                }}
                                disabled={value5.status}
                              />
                            </div>
                          </div>

                          <div className="flex flex flex-col gap-5 w-full">
                            <div className=" w-full try">
                              <label
                                for="BankIfsc"
                                className="block text-md font-normal mb-1"
                              >
                                Bank IFSC Code
                              </label>
                              <input
                                type="text"
                                id="BankIfsc"
                                className="rounded-lg  w-full"
                                name="BankIfsc"
                                value={value5?.BankIfsc}
                                onChange={(e) => {
                                  handleChange(e, "form5");
                                }}
                                disabled={value5.status}
                              />
                            </div>

                            <div className=" w-full try">
                              <label
                                for="AccountNumber"
                                className="block text-md font-normal mb-1"
                              >
                                Account Number
                              </label>
                              <input
                                type="text"
                                id="AccountNumber"
                                className="w-full border rounded p-2 text-sm font-normal "
                                name="AccountNumber"
                                value={value5?.AccountNumber}
                                onChange={(e) => {
                                  handleChange(e, "form5");
                                }}
                                disabled={value5.status}
                              />
                            </div>

                            <div className=" w-full try">
                              <label
                                for="confirmAccount"
                                className="block text-md font-normal mb-1"
                              >
                                Confirm Account Number
                              </label>
                              <input
                                type="text"
                                id="confirmAccount"
                                className="w-full border rounded p-2 text-sm font-normal "
                                // required
                                name="confirmAccount"
                                value={value5?.confirmAccount}
                                onChange={(e) => {
                                  handleChange(e, "form5");
                                }}
                                disabled={value5.status}
                              />
                            </div>
                          </div>

                          <div className="flex w-full flex flex-col gap-5">
                            <div className=" w-full  try">
                              <label
                                for="Branch"
                                className="block text-md font-normal mb-1"
                              >
                                Bank Branch
                              </label>

                              <input
                                type="text"
                                id="Branch"
                                className="w-full border rounded p-2 text-sm font-normal "
                                // required
                                name="Branch"
                                value={value5?.Branch}
                                onChange={(e) => {
                                  handleChange(e, "form5");
                                }}
                                disabled={value5.status}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* this is button  */}

                  <div className=" flex items-center justify-center mt-5">
                  
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeManage;
