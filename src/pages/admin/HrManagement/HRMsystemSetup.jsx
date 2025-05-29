import React, { useState, useEffect, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useMain } from "../../../hooks/UseMain";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";
import Selectmultidropdown from "./MultiSelect";

const sidebarItem = [
  {
    title: "Branch",
    img:"https://res.cloudinary.com/dd9tagtiw/image/upload/v1747717440/hub_FILL0_wght400_GRAD0_opsz24_1_niqu9q.png",
    tableData: [
      {
        title: "TYPE",
      },
      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Department",
    img: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747717374/hub2_bch96f.png",
    tableData: [
      {
        title: "BRANCH",
      },
      {
        title: "DEPARTMENT",
      },
      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Designation",
    img: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747717337/work_FILL0_wght400_GRAD0_opsz24_1_f1trib.png",
    tableData: [
      {
        title: "DEPARTMENT",
      },
      {
        title: "DESIGNATION",
      },
      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Leave Type",
    img: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747717291/hub3_u6ldbk.png",
    class: "syss",
    tableData: [
      {
        title: "LEAVE TYPE",
      },
      {
        title: "DAYS/YEAR",
      },
      {
        title: "ACTION",
      },
    ],
  },
 
];

const HRMsystemSetup = ({ setAlert, pop, setPop }) => {
  const {
    user,
    getBranchs,
    postBranch,
    updateBranch,
    deleteBranch,
    getDepartments,
    postDepartment,
    updateDepartment,
    deleteDepartment,
    getDesignations,
    postDesignation,
    updateDesignation,
    deleteDesignation,
    postLeaveType,
    updateLeaveType,
    getLeaveTypes,
    deleteLeaveType,
    postDocSetup,
    fetchAllDocs,
    deleteDocSetup,
    updateDocSetup,
    postLeadStatus,
    postLeadSource2,
    AllLeadStatus,
    AllLeadSource,
  } = useMain();

  const [open, setOpen] = useState(0);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));

  const { role } = hrms_user;

  const {
    hrmsSetupEditPermission,
    hrmsSetupDeletePermission,
    hrmsSetupCreatePermission,
  } = hrms_permission;

  const [popup, setPopup] = useState(false);

  const styleing = {
    display: popup ? "block" : "none",
  };

  const [allStatus, setAllStatus] = useState([]);
  const [allSource, setAllSource] = useState([]);
  const wrapperRef = useRef();

  const fetchAllStatus = async () => {
    const ans = await AllLeadStatus();
    setAllStatus(ans?.data);
  };
  const fetchAllSource = async () => {
    const ans = await AllLeadSource();
    setAllSource(ans?.data);
  };

  useEffect(() => {
    fetchAllStatus();
    fetchAllSource();
  }, []);

  const [popup1, setPopup1] = useState(false);
  const [popup11, setPopup11] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [popup21, setPopup21] = useState(false);
  const [popup3, setPopup3] = useState(false);
  const [popup31, setPopup31] = useState(false);
  const [popup4, setPopup4] = useState(false);
  const [popup5, setPopup5] = useState(false);
  const [popup6, setPopup6] = useState(false);
  const [popup41, setPopup41] = useState(false);

  const [docPop, setDocPop] = useState(false);

  const [id, setId] = useState("");
  const [branches, setBranches] = useState([]);
  const [branches1, setBranches1] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departments1, setDepartments1] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [designations1, setDesignations1] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveTypes1, setLeaveTypes1] = useState([]);
  const [branch, setBranch] = useState("");
  const [branch1, setBranch1] = useState("");
  const [showIndex, setShowIndex] = useState(null);
  const [showIndex1, setShowIndex1] = useState(null);

  const [departmentValue, setDepartmentValue] = useState({
    branch: "",
    name: "",
  });
  const [leaveTypeValue, setLeaveTypeValue] = useState({
    name: "",
    days: "",
  });
  const [leadStatus, setLeadStatus] = useState({
    status: "",
  });
  const [leadSource, setLeadSource] = useState({
    status: "",
  });
  const [designationValue, setDesignationValue] = useState({
    department: "",
    name: "",
  });
  const [departmentValue1, setDepartmentValue1] = useState({
    branch: "",
    name: "",
  });
  const [designationValue1, setDesignationValue1] = useState({
    department: "",
    name: "",
  });
  const [leaveTypeValue1, setLeaveTypeValue1] = useState({
    name: "",
    days: "",
  });
  const [refreshFlag, setRefreshFlag] = useState(false);

  const getData = async () => {
    const ans1 = await getBranchs();
    const ans2 = await getDepartments();
    const ans3 = await getDesignations();
    const ans4 = await getLeaveTypes();
    setBranches(ans1?.data);
    setBranches1(ans1?.data);
    setDepartments(ans2?.data);
    setDepartments1(ans2?.data);
    setDesignations(ans3?.data);
    setDesignations1(ans3?.data);
    setLeaveTypes(ans4?.data);
    setLeaveTypes1(ans4?.data);
  };

  useEffect(() => {
    getData();
  }, [refreshFlag]);

  const handleCreateBranch = async () => {
    const toastId = toast.loading("Loading...");

    const ans = await postBranch({ name: branch });
    if (ans.success) {
      toast.success("Successfully Added !!");
      setBranch("");
      setRefreshFlag(!refreshFlag);
      setPopup1(false);
    } else {
      toast.error("Branch name is alreday exist");
    }

    toast.dismiss(toastId);
  };

  const handleUpdateBranch = async () => {
    const toastId = toast.loading("Loading...");

    const ans = await updateBranch({ name: branch1, id });
    if (ans.success) {
      toast.success("Updated Successfully!!");
      setBranch1("");
      setRefreshFlag(!refreshFlag);
      setPopup11(false);
    } else {
      toast.error("something went wrong");
    }

    toast.dismiss(toastId);
  };

  const handleCreateDepartment = async () => {
    // Validation to check if both fields are filled
    if (!departmentValue.name || !departmentValue.branch) {
      toast.error("Both department name and branch are required!");
      return;
    }
    const toastId = toast.loading("Loading...");
    const ans = await postDepartment({
      name: departmentValue.name,
      branch: branches.find((x) => x._id === departmentValue.branch),
    });

    if (ans.status) {
      toast.success("Successfully Added !!");
      setBranch("");
      setRefreshFlag(!refreshFlag);
      setPopup1(false);
    }
    if (ans.success) {
      setDepartmentValue({
        name: "",
        branch: "",
      });
      toast.success(ans.message);
      setRefreshFlag(!refreshFlag);
      setPopup2(false);
    } else {
      toast.error("Department name alreday exist");
    }

    toast.dismiss(toastId);
  };

  const handleCreateLeadStatus = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await postLeadStatus({
      status: leadStatus?.status,
    });

    if (ans.status) {
      toast.success("Successfully Added !!");
      fetchAllStatus();
      setLeadStatus("");
      setPopup5(false);
    }

    toast.dismiss(toastId);
  };

  const handleCreateLeadSource = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await postLeadSource2({
      status: leadSource?.status,
    });

    if (ans.status) {
      toast.success("Successfully Added !!");
      fetchAllSource();
      setLeadSource("");
      setPopup6(false);
    }

    toast.dismiss(toastId);
  };

  const handleCreateDesignation = async () => {
    const toastId = toast.loading("Loading...");

    const ans = await postDesignation({
      name: designationValue.name,
      department: departments.find(
        (x) => x._id === designationValue.department
      ),
    });
    if (ans.success) {
      toast.success("Successfully Added !!");
      setDesignationValue({
        name: "",
        department: "",
      });
      setRefreshFlag(!refreshFlag);
      setPopup3(false);
    } else {
      toast.error("something went wrong");
    }

    toast.dismiss(toastId);
  };

  const handleCreateLeaveType = async () => {
    const toastId = toast.loading("Loading...");

    const ans = await postLeaveType({
      days: leaveTypeValue?.days,
      name: leaveTypeValue?.name,
    });
    if (ans.success) {
      toast.success("Successfully Added !!");
      setLeaveTypeValue({
        name: "",
        days: "",
      });
      setRefreshFlag(!refreshFlag);
      setPopup4(false);
    } else {
      toast.error("Leave Name already exist");
    }

    toast.dismiss(toastId);
  };

  const handleUpdateDepartment = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await updateDepartment({
      id,
      name: departmentValue1?.name,
      // branch: branches?.find((x) => x?._id === departmentValue1?.branch),
      branch: departmentValue1?.branch,
    });
    if (ans.success) {
      setDepartmentValue1({
        name: "",
        branch: "",
      });
      toast.success("Successfully Updated !!");
      setRefreshFlag(!refreshFlag);
      setPopup21(false);
    } else {
      toast.error("something went wrong");
    }

    toast.dismiss(toastId);
  };

  const handleUpdateDesignation = async () => {
    const toastId = toast.loading("Loading...");

    const ans = await updateDesignation({
      id,
      name: designationValue1?.name,
      department: departments?.find(
        (x) => x?._id === designationValue1?.department
      ),
    });
    if (ans.success) {
      toast.success("Successfully Updated !!");
      setDesignationValue1({
        name: "",
        department: "",
      });
      setRefreshFlag(!refreshFlag);
      setPopup31(false);
    } else {
      toast.error("something went wrong");
    }

    toast.dismiss(toastId);
  };

  const handleUpdateLeaveType = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await updateLeaveType({
      id,
      days: leaveTypeValue1?.days,
      name: leaveTypeValue1?.name,
    });
    if (ans.success) {
      toast.success("Successfully Updated !!");
      setLeaveTypeValue1({
        name: "",
        days: "",
      });
      setRefreshFlag(!refreshFlag);
      setPopup41(false);
    } else {
      toast.error("something went wrong");
    }

    toast.dismiss(toastId);
  };

  const handleDelete = async (id, type) => {

    confirmAlert({
      title: "Are you sure to delete this data?",
      message: "All related data to this will be deleted",
      buttons: [
        {
          label: "Yes, Go Ahead!",
          style: {
            background: "#FF5449",
          },
          onClick: async () => {
            let ans;
            if (type === "branch") {
              ans = await deleteBranch(id);
            } else if (type === "department") {
              ans = await deleteDepartment(id);
            } else if (type === "designation") {
              ans = await deleteDesignation(id);
            } else if (type === "leaveType") {
              ans = await deleteLeaveType(id);
            }

            if (ans.success) {
              toast.success(ans.message);
              setRefreshFlag(!refreshFlag);
            } else {
              toast.error("something went wrong");
            }

          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });



  };

  const [allDocs, setAllDocs] = useState([]);

  const [docData, setDocdata] = useState({
    id: "",
    name: "",
    requiredField: [],
  });
  const getDocs = async () => {
    const ans = await fetchAllDocs();
    setAllDocs(ans?.data);
  };

  const handleDocSave = async () => {
    let toastId 
    if(docData.name === ''){
      return toast.error('Please Enter Document Name')
    }
    if(docData.requiredField.length === 0){
      return toast.error('Please Select Employee Role')
    }
    try {
      toast.loading("Loding...");
      const ans = await postDocSetup({
        name: docData?.name,
        requiredField: docData?.requiredField,
      });
      console.log(ans);
      toast.success("Successfuly created ");
      if (ans?.status) {
        setDocPop(false);
        setDocdata({
          name: "",
          requiredField: [],
        });
        setIsUpdate(false);

        getDocs();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

    toast.dismiss(toastId);
  };

  const deleteDoc = async (id) => {
    // const toastId = toast.loading("Loading...");

    confirmAlert({
      title: "Are you sure to delete this data?",
      message: "All related data to this will be deleted",
      buttons: [
        {
          label: "Yes, Go Ahead!",
          style: {
            background: "#FF5449",
          },
          onClick: async () => {
            const toastId = toast.loading("Loading...");
            const ans = await deleteDocSetup({ id });
            if (ans?.status) {
              toast.success("Successfuly deleted");
              getDocs();
            } else {
              toast.error("Something went wrong");
            }

            toast.dismiss(toastId);

          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });

  };

  const [isUpdate, setIsUpdate] = useState(false);

  const docUpdateHandler = async () => {
    const toastId = toast.loading("Loading...");

    const ans = await updateDocSetup({
      id: docData?.id,
      name: docData?.name,
      requiredField: docData?.requiredField,
    });

    if (ans?.status) {
      toast.success("Successfuly updated");
      setDocPop(false);
      setDocdata({
        name: "",
        requiredField: [],
      });

      getDocs();
      setIsUpdate(false);
    } else {
      toast.error("Something went wrong ");
    }

    toast.dismiss(toastId);
  };

  useOutsideClick(wrapperRef, () => {
    setPopup1(false);
    setShowIndex(null);
    setShowIndex1(null);

  });

  useEffect(() => {
    getDocs();
  }, []);

  const popup1wrapper = useRef();
  const popup2wrapper = useRef();
  const popup3wrapper = useRef();
  const popup4wrapper = useRef();
  const popup11wrapper = useRef();
  const popup21wrapper = useRef();
  const popup31wrapper = useRef();
  const popup41wrapper = useRef();
  const docPopwrapper = useRef();

  useOutsideClick(popup1wrapper, () => {
    setPopup1(false)
  })
  useOutsideClick(popup2wrapper, () => {
    setPopup2(false)
  })
  useOutsideClick(popup3wrapper, () => {
    setPopup3(false)
  })
  useOutsideClick(popup4wrapper, () => {
    setPopup4(false)
  })
  useOutsideClick(popup11wrapper, () => {
    setPopup11(false)
  })
  useOutsideClick(popup21wrapper, () => {
    setPopup21(false)
  })
  useOutsideClick(popup31wrapper, () => {
    setPopup31(false)
  })
  useOutsideClick(popup41wrapper, () => {
    setPopup41(false)
  })
  useOutsideClick(docPopwrapper, () => {
    setDocPop(false);
    setIsUpdate(false);
    setDocdata({
      name: "",
      requiredField: [],
    });
  })

  return (
    <>
      <div className="employee-dash h-full">
      

        <div className="w-full ">
         

          <div className="pt-8 pr-5 pb-8 pl-[20px] relative w-full">
            <div className="flex-col">
              <div className="flex flex-col gap-2 bg-transparent">
                <div className="flex w-full items-center justify-between flex-col lg:flex-row">
                  <h3 className="text-[#101820] text-[24px] font-semibold leading-[32px] text-left">HRM System Setup</h3>

                  {(hrmsSetupCreatePermission || role === "ADMIN") && (
                    <button
                    className="flex items-center h-[40px] px-4 pr-[16px] pl-[12px] py-[10px] gap-[10px] rounded-[10px] bg-[#0B56E4] min-w-fit mt-3 lg:mt-0"
                      onClick={() => {
                        if (open === 0) {
                          setPopup1(true);
                        } else if (open === 1) {
                          setPopup2(true);
                        } else if (open === 2) {
                          setPopup3(true);
                        } else if (open === 3) {
                          setPopup4(true);
                        } else if (open === 4) {
                          setPopup5(true);
                        } else if (open === 5) {
                          setPopup6(true);
                        }
                      }}
                    >
                      <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747717407/Text_Type_lnlrye.png" alt="" />
                      <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left text-white">Add New</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row w-full gap-[30px] py-5 px-0">
                  <div className="max-w-[300px] w-full rounded-[12px] bg-white">
                    {sidebarItem.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => setOpen(index)}
                        className={`p-5 w-full gap-2 flex cursor-pointer items-center border-b border-[#E8E9EB] h-16 ${open === index && "border-b-2 border-[#0B56E4]"
                          } `}
                      >
                        <img
                          className={`${item?.class}`}
                          src={item.img}
                          alt=""
                        />
                        <span className="text-[16px] font-normal leading-[19px] tracking-normal text-left text-[#060606]">{item.title}</span>
                      </div>
                    ))}
                  </div>

                  {open === 0 && (
                    <div className="rounded-[12px] border border-[#E8E9EB] bg-white pt-5 px-5 pb-0 w-full">
                      <div className="w-full mx-auto">
                        <div className="w-full h-[34px] flex items-center gap-2">
                          {/* <img src={frame1} alt="" /> */}
                          <span className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Branch</span>
                        </div>

                        <div className="relative overflow-x-auto rounded-lg">
                          <table className="min-w-full text-sm text-left bg-white rounded-lg">
                            <thead className="bg-white font-semibold">
                              <tr>
                                {sidebarItem[open].tableData.map(
                                  (item, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                                    >
                                      {item.title}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {branches?.length === 0
                                ? "No Branches Added"
                                : branches.map((item, index) => (
                                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 text-gray-800">
                                    <td className="px-6 py-4 text-gray-800">
                                      {item?.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-800">
                                      <div className="relative">
                                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747634200/acy_ah4jhd.svg" alt="" className="cursor-pointer" onClick={() => setShowIndex(showIndex === index ? null : index)} />
                                        {
                                          showIndex === index && (
                                            <div ref={wrapperRef} className="absolute bg-white p-2 rounded-md border border-gray-300 right-52 -top-14">
                                              {(hrmsSetupEditPermission ||
                                                role === "ADMIN") && (
                                                  <>
                                                    <div className="cursor-pointer flex items-center gap-3 p-1"
                                                      onClick={() => {
                                                        setId(item?._id);
                                                        setBranch1(item?.name);
                                                        setPopup11(true);
                                                      }}>
                                                      {/* <i
                                                        className="fa-solid fa-pen-to-square"
                                                      ></i> */}
                                                      <MdOutlineEdit className="text-[18px]" />
                                                      <span>Edit</span>
                                                    </div>
                                                    <hr />
                                                  </>
                                                )}
                                              {(hrmsSetupDeletePermission ||
                                                role === "ADMIN") && (
                                                  <div onClick={() => {
                                                    handleDelete(item._id, "branch");
                                                  }} className="flex items-center gap-3 p-1 cursor-pointer">
                                                    {/* <i

                                                      className="fa-solid fa-trash"
                                                    ></i> */}
                                                    <MdDeleteOutline className="text-[18px]" />
                                                    <span>Delete</span>
                                                  </div>
                                                )}
                                            </div>
                                          )
                                        }
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {open === 1 && (
                    <div className="rounded-[12px] border border-[#E8E9EB] bg-white pt-5 px-5 pb-0 w-full">
                      <div className="w-full mx-auto">
                        <div className="w-full h-[34px] flex items-center gap-2">
                          {/* <img src={frame1} alt="" /> */}
                          <span className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Department</span>
                        </div>

                        <div className="relative overflow-x-auto rounded-lg">
                          <table className="min-w-full text-sm text-left bg-white rounded-lg">
                            <thead className="bg-white font-semibold">
                              <tr>
                                {sidebarItem[open].tableData.map(
                                  (item, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                                    >
                                      {item.title}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {departments.length === 0
                                ? "No Departments Added"
                                : departments.map((item, index) => (
                                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 text-gray-800">
                                    <td className="px-6 py-4 text-gray-800">
                                      {item?.branch?.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800 ">
                                      {item?.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                      <div className="relative">
                                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747634200/acy_ah4jhd.svg" alt="" className="cursor-pointer" onClick={() => setShowIndex(showIndex === index ? null : index)} />
                                        {
                                          showIndex === index && (
                                            <div ref={wrapperRef} className="absolute bg-white p-2 rounded-md border border-gray-300 right-28 -top-14">
                                              {(hrmsSetupEditPermission ||
                                                role === "ADMIN") && (
                                                  <> <div className="cursor-pointer flex items-center gap-3 p-1" onClick={() => {
                                                    setDepartmentValue1({
                                                      branch: item?.branch?._id,
                                                      name: item?.name,
                                                    });
                                                    setId(item?._id);
                                                    setPopup21(true);
                                                  }}>
                                                    <MdOutlineEdit className="text-[18px]" />
                                                    <span>Edit</span>
                                                  </div>
                                                    <hr />
                                                  </>
                                                )}
                                              {(hrmsSetupDeletePermission ||
                                                role === "ADMIN") && (
                                                  <div onClick={() => {
                                                    handleDelete(
                                                      item._id,
                                                      "department"
                                                    );
                                                  }} className="flex items-center gap-3 p-1 cursor-pointer">
                                                   
                                                    <MdDeleteOutline className="text-[18px]" />
                                                    <span>Delete</span>
                                                  </div>
                                                )}
                                            </div>
                                          )
                                        }
                                      </div>


                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {open === 2 && (
                    <div className="rounded-[12px] border border-[#E8E9EB] bg-white pt-5 px-5 pb-0 w-full">
                      <div className="w-full mx-auto">
                        <div className="w-full h-[34px] flex items-center gap-2">
                          {/* <img src={frame1} alt="" /> */}
                          <span className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Designation</span>
                        </div>

                        <div className="relative overflow-x-auto rounded-lg">
                          <table className="min-w-full text-sm text-left bg-white rounded-lg">
                            <thead className="bg-white font-semibold">
                              <tr>
                                {sidebarItem[open].tableData.map(
                                  (item, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                                    >
                                      {item.title}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {designations.length === 0
                                ? "No Designations Added"
                                : designations.map((item, index) => (
                                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 text-gray-800">
                                    <td className="px-6 py-4 text-gray-800">
                                      {item?.department?.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-800">
                                      {item?.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-800">
                                      <div className="relative">
                                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747634200/acy_ah4jhd.svg" alt="" className="cursor-pointer" onClick={() => setShowIndex(showIndex === index ? null : index)} />
                                        {
                                          showIndex === index && (
                                            <div ref={wrapperRef} className="absolute bg-white p-2 rounded-md border border-gray-300 right-16 -top-14">
                                              {(hrmsSetupEditPermission ||
                                                role === "ADMIN") && (
                                                  <> <div className="cursor-pointer flex items-center gap-3 p-1" onClick={() => {
                                                    setDesignationValue1({
                                                      department:
                                                        item?.department?._id,
                                                      name: item?.name,
                                                    });
                                                    setId(item?._id);
                                                    setPopup31(true);
                                                  }}>
                                                    <MdOutlineEdit className="text-[18px]" />
                                                    <span>Edit</span>
                                                  </div>
                                                    <hr />
                                                  </>
                                                )}
                                              {(hrmsSetupDeletePermission ||
                                                role === "ADMIN") && (
                                                  <div onClick={() => {
                                                    handleDelete(
                                                      item._id,
                                                      "designation"
                                                    );
                                                  }} className="flex items-center gap-3 p-1 cursor-pointer">
                                                    <MdDeleteOutline className="text-[18px]" />
                                                    <span>Delete</span>
                                                  </div>
                                                )}
                                            </div>
                                          )
                                        }
                                      </div>
                                     
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {open === 3 && (
                    <div className="rounded-[12px] border border-[#E8E9EB] bg-white pt-5 px-5 pb-0 w-full">
                      <div className="w-full mx-auto">
                        <div className="w-full h-[34px] flex items-center gap-2">
                          {/* <img src={frame1} alt="" /> */}
                          <span className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Leave Type</span>
                        </div>

                        <div className="relative overflow-x-auto rounded-lg">
                          <table className="min-w-full text-sm text-left bg-white rounded-lg">
                            <thead className="bg-white font-semibold">
                              <tr>
                                {sidebarItem[open].tableData.map(
                                  (item, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                                    >
                                      {item.title}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {leaveTypes.length === 0
                                ? "No data found"
                                : leaveTypes.map((item, index) => (
                                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 text-gray-800 ">
                                    <td className="px-6 py-4 text-gray-800">
                                      {item?.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                      {item?.days}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                      <div className="relative">
                                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747634200/acy_ah4jhd.svg" alt="" className="cursor-pointer" onClick={() => setShowIndex(showIndex === index ? null : index)} />
                                        {
                                          showIndex === index && (
                                            <div ref={wrapperRef} className="absolute bg-white p-2 rounded-md border border-gray-300 right-44 -top-14">
                                              {(hrmsSetupEditPermission ||
                                                role === "ADMIN") && (
                                                  <> <div className="cursor-pointer flex items-center gap-3 p-1" onClick={() => {
                                                    setLeaveTypeValue1({
                                                      days: item?.days,
                                                      name: item?.name,
                                                    });
                                                    setId(item?._id);
                                                    setPopup41(true);
                                                  }}>
                                                    <MdOutlineEdit className="text-[18px]" />
                                                    <span>Edit</span>
                                                  </div>
                                                    <hr />
                                                  </>
                                                )}
                                              {(hrmsSetupDeletePermission ||
                                                role === "ADMIN") && (
                                                  <div onClick={() => {
                                                    handleDelete(
                                                      item._id,
                                                      "leaveType"
                                                    );
                                                  }} className="flex items-center gap-3 p-1 cursor-pointer">
                                                    <MdDeleteOutline className="text-[18px]" />
                                                    <span>Delete</span>
                                                  </div>
                                                )}
                                            </div>
                                          )
                                        }
                                      </div>
                                    
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {open === 4 && (
                    <div className="rounded-[12px] border border-[#E8E9EB] bg-white pt-5 px-5 pb-0 w-full">
                      <div className="w-full mx-auto">
                        <div className="w-full h-[34px] flex items-center gap-2">
                          <span className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Lead Status</span>
                        </div>

                        <div className="relative overflow-x-auto rounded-lg">
                          <table className="min-w-full text-sm text-left bg-white rounded-lg">
                            <thead className="bg-white font-semibold">
                              <tr>
                                {sidebarItem[open].tableData.map(
                                  (item, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                                    >
                                      {item.title}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {allStatus.length === 0
                                ? "No data found"
                                : allStatus.map((item, index) => (
                                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 text-gray-800 ">
                                    <td className="px-6 py-4 text-gray-800">
                                      {item?.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                      {(hrmsSetupEditPermission ||
                                        role === "ADMIN") && (
                                          <img
                                            className="cursor-pointer"
                                            onClick={() => {
                                              setLeaveTypeValue1({
                                                days: item?.days,
                                                name: item?.name,
                                              });
                                              setId(item?._id);
                                              setPopup41(true);
                                            }}
                                            src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747470053/edit22_n1cyzn.png"
                                            alt=""
                                          />
                                        )}

                                      {(hrmsSetupDeletePermission ||
                                        role === "ADMIN") && (
                                          <img
                                            className="cursor-pointer"
                                            onClick={() => {
                                              handleDelete(
                                                item._id,
                                                "leaveType"
                                              );
                                            }}
                                            src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747481374/frema_ayb4lq.svg"
                                            alt=""
                                          />
                                        )}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {open === 5 && (
                    <div className="rounded-[12px] border border-[#E8E9EB] bg-white pt-5 px-5 pb-0 w-full">
                      <div className="w-full mx-auto">
                        <div className="w-full h-[34px] flex items-center gap-2">
                          <span className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Industry</span>
                        </div>

                        <div className="relative overflow-x-auto rounded-lg">
                          <table className="min-w-full text-sm text-left bg-white rounded-lg">
                            <thead className="bg-white font-semibold">
                              <tr>
                                {sidebarItem[open].tableData.map(
                                  (item, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                                    >
                                      {item.title}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {allSource?.length === 0
                                ? "No data found"
                                : allSource?.map((item, index) => (
                                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 text-gray-800">
                                    <td className="px-6 py-4 text-gray-800">
                                      {item?.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                      {(hrmsSetupEditPermission ||
                                        role === "ADMIN") && (
                                          <img
                                            className="cursor-pointer"
                                            onClick={() => {
                                              setLeaveTypeValue1({
                                                days: item?.days,
                                                name: item?.name,
                                              });
                                              setId(item?._id);
                                              setPopup41(true);
                                            }}
                                            src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747470053/edit22_n1cyzn.png"
                                            alt=""
                                          />
                                        )}
                                      {(hrmsSetupDeletePermission ||
                                        role === "ADMIN") && (
                                          <img
                                            className="cursor-pointer"
                                            onClick={() => {
                                              handleDelete(
                                                item._id,
                                                "leaveType"
                                              );
                                            }}
                                            src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747481374/frema_ayb4lq.svg"
                                            alt=""
                                          />
                                        )}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full flex flex-col gap-4">
                  <nav className="flex items-center justify-between flex-col lg:flex-row">
                    <h2 className="text-[#101820] font-inter text-2xl font-semibold leading-8 text-left">Documents Type</h2>
                    <button onClick={() => setDocPop(true)} className="flex items-center justify-center w-[123px] h-[40px] rounded-[10px] bg-[#0B56E4] mt-3 lg:mt-0">
                      <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747717020/pluss_mq4vay.png" alt="" /> <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em]">Add New</span>
                    </button>
                  </nav>

                  <div className="rounded-[12px] border border-[#E8E9EB] bg-white pt-5 px-5 pb-0 w-full">
                    <div className="w-full mx-auto">
                      <div className="w-full h-[34px] flex items-center gap-2">
                        {/* <img src={frame1} alt="" /> */}
                        <span className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Documents Type</span>
                      </div>

                      <div className="relative overflow-x-auto rounded-lg">
                        <table className="min-w-full text-sm text-left bg-white rounded-lg">
                          <thead className="bg-white font-semibold">
                            <tr>
                              <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                                {" "}
                                Documents{" "}
                              </th>
                              <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                                {" "}
                                Required Field{" "}
                              </th>
                              <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                                {" "}
                                Action{" "}
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {allDocs?.map((item, index) => (
                              <tr className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 text-gray-800 " key={index}>
                                <td className="px-6 py-4 text-gray-800">
                                  {item?.name}{" "}
                                </td>

                                <td className="px-6 py-4 text-gray-800">
                                  <div className="seri">
                                    {item?.requiredField?.map((fi, index) => (
                                      <div
                                        className="px-6 py-4 requiFild"
                                        key={index}
                                      >
                                        {" "}
                                        <span>{fi}</span>{" "}
                                      </div>
                                    ))}
                                  </div>
                                </td>

                                <td className="px-6 py-4 text-gray-800">
                                  <div className="relative">
                                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747634200/acy_ah4jhd.svg" alt="" className="cursor-pointer" onClick={() => setShowIndex1(showIndex1 === index ? null : index)} />
                                    {
                                      showIndex1 === index && (
                                        <div ref={wrapperRef} className="absolute bg-white p-2 rounded-md border border-gray-300 right-32 -top-14">

                                          <div className="cursor-pointer flex items-center gap-3 p-1" onClick={() => {
                                            setDocPop(true);
                                            setDocdata({
                                              name: item?.name,
                                              requiredField: item?.requiredField,
                                              id: item?._id,
                                            });
                                            setIsUpdate(true);
                                          }}>
                                            <MdOutlineEdit className="text-[18px]" />
                                            <span>Edit</span>
                                          </div>
                                          <hr />


                                          <div onClick={() => {
                                            deleteDoc(item?._id);
                                          }} className="flex items-center gap-3 p-1 cursor-pointer">
                                            <MdDeleteOutline className="text-[18px]" />
                                            <span>Delete</span>
                                          </div>
                                        </div>
                                      )
                                    }
                                  </div>
                                  
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <>
                  {/* Main modal */}

                  <div
                    style={styleing}
                    tabIndex={-1}
                    aria-hidden="true"
                    className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                  >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                      ={" "}
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        =
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Terms of Service
                          </h3>

                          
                        </div>
                        {/* Modal body */}
                        <div className="p-4 md:p-5 space-y-4">
                          <label className="block text-md font-normal mb-1">Name:</label>
                          <input type="text" name="" id=""    className="w-full border rounded p-2 text-sm font-normal text-gray-500" />
                        
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                          <button
                            onClick={() => setPopup(false)}
                            data-modal-hide="default-modal"
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => setPopup(false)}
                            data-modal-hide="default-modal"
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>

        {popup1 && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center h-screen z-[3000] backdrop-blur-[1px]">
            <div className="popup1 max-h-[256px] gap-4 rounded-[18px] bg-white h-auto max-w-[500px] p-5 w-full" ref={popup1wrapper}>
              <div className="py-[10px] px-0">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">New Branch</h2>
              
              </div>
              <hr />

              <label className="block text-md font-normal mb-1">
                <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Branch</p>
                <input
                   className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  type="text"
                  name="branch"
                  onChange={(e) => {
                    setBranch(e.target.value);
                  }}
                  value={branch}
                  placeholder="Enter Branch Name"
                />
              </label>

              <div className="w-full flex items-center gap-4 justify-start py-5">
                <button className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF]" onClick={handleCreateBranch}>
                  <span className="text-[#49515C] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Save</span>
                </button>

                <button className="w-[86px] h-10 rounded-[5px] opacity-50 border border-black" onClick={() => setPopup1(false)}>
                  <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Cancel</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {docPop && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center h-screen z-[3000] backdrop-blur-[1px]">
            <div ref={docPopwrapper} className="popup1 max-w-[500px] max-h-[426px] gap-4 rounded-[18px] bg-white h-auto p-5 w-full m-3">
              <div className="py-[10px] px-0">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">{isUpdate ? "Update Document" :  "Create New Document"}</h2>
               
              </div>
              <hr />
              <div style={{ overflowY: "auto" }}>

                <label className="block text-md font-normal mb-1">
                  <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Document Name</p>
                  <input
                     className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    type="text"
                    name="name"
                    onChange={(e) => {
                      setDocdata((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
                    value={docData.name}
                  />
                </label>

                <label className="block text-md font-normal mb-1">
                  <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2" >
                    Required Field
                  </p>
                  <div style={{ position: "relative" }}>
                    <Selectmultidropdown
                      setDocdata={setDocdata}
                      docData={docData}
                    />
                  </div>
                </label>
              </div>

              <div className="w-full flex items-center gap-4 justify-start py-5">
                <button
                  className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF]"
                  onClick={() => {
                    if (isUpdate) {
                      docUpdateHandler();
                    } else {
                      handleDocSave();
                    }
                  }}
                >
                  <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">{isUpdate ? "Update" : "Save"}</span>
                </button>

                <button
                  className="w-[86px] h-10 rounded-[5px] opacity-50 border border-black"
                  onClick={() => {
                    setDocPop(false);
                    setIsUpdate(false);
                    setDocdata({
                      name: "",
                      requiredField: [],
                    });
                  }}
                >
                  <span className="text-[#49515C] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Cancel</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup11 && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center h-screen z-[3000] backdrop-blur-[1px]">
            <div ref={popup11wrapper} className="popup1 max-h-[256px] gap-4 rounded-[18px] bg-white h-auto max-w-[500px] p-5 w-full">
              <div className="py-[10px] px-0">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Edit Branch</h2>
                
              </div>

              <hr />

              <label htmlFor="" className="block text-md font-normal mb-1">
                <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Name</p>
                <input
                   className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  type="text"
                  name="branch1"
                  onChange={(e) => {
                    setBranch1(e.target.value);
                  }}
                  value={branch1}
                  placeholder="Enter Branch Name"
                />
              </label>

              <div className="w-full flex items-center gap-4 justify-start py-5">
                <button className="w-[86px] h-10 rounded-[5px] opacity-50 border border-black" onClick={() => setPopup11(false)}>
                  <span className="text-[#49515C] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Cancel</span>
                </button>

                <button className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF]" onClick={handleUpdateBranch}>
                  <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Update</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup2 && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center h-screen z-[3000] backdrop-blur-[1px]">
            <div ref={popup2wrapper} className="popup1 max-w-[500px] max-h-[366px] gap-4 rounded-[18px] bg-white h-auto max-w-[500px] p-5 w-full">
              <div className="py-[10px] px-0">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left"> New Department</h2>
           
              </div>

              <hr />

              <select
                 className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                value={departmentValue.branch}
                onChange={(e) => {
                  setDepartmentValue({
                    ...departmentValue,
                    branch: e.target.value,
                  });
                }}
                name="branch1"
                id="branch1"
              >
                <option value="">select Branch</option>

                {branches.map((e, index) => {
                  return (
                    <option key={index} value={e._id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>

              <label className="block text-md font-normal mb-1">
                <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Name</p>
                <input
                   className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  type="text"
                  name="department1"
                  value={departmentValue.name}
                  onChange={(e) => {
                    setDepartmentValue({
                      ...departmentValue,
                      name: e.target.value,
                    });
                  }}
                  placeholder="Enter Department Name"
                />
              </label>

              <div className="w-full flex items-center gap-4 justify-start py-5">
                <button className="w-[86px] h-10 rounded-[5px] opacity-50 border border-black" onClick={() => setPopup2(false)}>
                  <span className="text-[#49515C] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Cancel</span>
                </button>

                <button className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF]" onClick={handleCreateDepartment}>
                  <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Create</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup21 && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center h-screen z-[3000] backdrop-blur-[1px]">
            <div ref={popup21wrapper} className="popup1  max-h-[366px] gap-4 rounded-[18px] bg-white h-auto max-w-[500px] p-5 w-full">
              <div className="py-[10px] px-0">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Edit Department</h2>
        
              </div>
              <hr />
              <select
                 className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                value={departmentValue1.branch}
                onChange={(e) => {
                  setDepartmentValue1({
                    ...departmentValue1,
                    branch: e.target.value,
                  });
                }}
                name="branch1"
                id="branch1"
              >
                <option value="">select Branch</option>

                {branches.map((e, index) => {
                  return (
                    <option key={index} value={e._id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>

              <label className="block text-md font-normal mb-1">
                <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Name</p>
                <input
                   className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  type="text"
                  name="department1"
                  value={departmentValue1.name}
                  onChange={(e) => {
                    setDepartmentValue1({
                      ...departmentValue1,
                      name: e.target.value,
                    });
                  }}
                  placeholder="Enter Department Name"
                />
              </label>

              <div className="w-full flex items-center gap-4 justify-start py-5">
                <button className="w-[86px] h-10 rounded-[5px] opacity-50 border border-black" onClick={() => setPopup21(false)}>
                  <span className="text-[#49515C] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Cancel</span>
                </button>

                <button className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF]" onClick={handleUpdateDepartment}>
                  <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Update</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup3 && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center h-screen z-[3000] backdrop-blur-[1px]">
            <div ref={popup3wrapper} className="popup1 max-w-[500px] max-h-[366px] gap-4 rounded-[18px] bg-white h-auto max-w-[500px] p-5 w-full">
              <div className="py-[10px] px-0">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Create New Designation</h2>
         
              </div>

              <hr />
              <label className="block text-md font-normal mb-1">
                <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Department</p>
                <select
                   className="selectBRANCH w-full border rounded p-2 text-sm font-normal text-gray-500"
              
                  value={designationValue?.department}
                  onChange={(e) => {
                    setDesignationValue({
                      ...designationValue,
                      department: e.target.value,
                    });
                  }}
                >
                  <option value="" disabled>
                    Choose Department
                  </option>
                  {departments?.map((e, index) => {
                    return (
                      <option key={index} value={e?._id}>
                        {e?.name}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label htmlFor="" className="block text-md font-normal mb-1">
                <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Name</p>
                <input
                                className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  type="text"
                  placeholder="Enter Designation Name"
                  value={designationValue?.name}
                  onChange={(e) => {
                    setDesignationValue({
                      ...designationValue,
                      name: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="w-full flex items-center gap-4 justify-start py-5">
                <button className="w-[86px] h-10 rounded-[5px] opacity-50 border border-black" onClick={() => setPopup3(false)}>
                  <span className="text-[#49515C] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Cancel</span>
                </button>

                <button className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF]" onClick={handleCreateDesignation}>
                  <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Create</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup31 && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center h-screen z-[3000] backdrop-blur-[1px]">
            <div ref={popup31wrapper} className="popup1 max-w-[500px] max-h-[366px] gap-4 rounded-[18px] bg-white h-auto max-w-[500px] p-5 w-full">
              <div className="py-[10px] px-0">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Edit Designation</h2>
          
              </div>

              <hr />
              <label htmlFor="" className="block text-md font-normal mb-1">
                <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Department</p>
                <select
              className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  value={designationValue1?.department}
                  onChange={(e) => {
                    setDesignationValue1({
                      ...designationValue1,
                      department: e.target.value,
                    });
                  }}
                >
                  <option value="" disabled>
                    Choose Department
                  </option>
                  {departments?.map((e, index) => {
                    return (
                      <option key={index} value={e?._id}>
                        {e?.name}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label htmlFor="" className="block text-md font-normal mb-1">
                <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Name</p>
                <input
                 className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  type="text"
                  placeholder="Enter Designation Name"
                  value={designationValue1?.name}
                  onChange={(e) => {
                    setDesignationValue1({
                      ...designationValue1,
                      name: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="w-full flex items-center gap-4 justify-start py-5">
                <button className="w-[86px] h-10 rounded-[5px] opacity-50 border border-black" onClick={() => setPopup31(false)}>
                  <span className="text-[#49515C] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Cancel</span>
                </button>

                <button className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF]" onClick={handleUpdateDesignation}>
                  <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Update</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup4 && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center h-screen z-[3000] backdrop-blur-[1px]">
            <div ref={popup4wrapper} className="popup1 max-w-[500px] max-h-[366px] gap-4 rounded-[18px] bg-white h-auto max-w-[500px] p-5 w-full">
              <div className="py-[10px] px-0">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Create New Leave Type</h2>
             
              </div>
              <hr />
              <label htmlFor="" className="block text-md font-normal mb-1">
                <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Leave Type</p>
                <input
                                className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  type="text"
                  placeholder="Enter Leave Type Name"
                  name="name"
                  value={leaveTypeValue?.name}
                  onChange={(e) => {
                    setLeaveTypeValue({
                      ...leaveTypeValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <label htmlFor="" className="block text-md font-normal mb-1">
                <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Days Per Year</p>
                <input
                                className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  type="text"
                  placeholder="Enter Days / Year"
                  name="days"
                  value={leaveTypeValue?.days}
                  onChange={(e) => {
                    setLeaveTypeValue({
                      ...leaveTypeValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="w-full flex items-center gap-4 justify-start py-5">
                <button className="w-[86px] h-10 rounded-[5px] opacity-50 border border-black" onClick={() => setPopup4(false)}>
                  <span className="text-[#49515C] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Cancel</span>
                </button>

                <button className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF]" onClick={handleCreateLeaveType}>
                  <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Create</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup41 && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center h-screen z-[3000] backdrop-blur-[1px]">
            <div ref={popup41wrapper} className="popup1 max-w-[500px] max-h-[366px] gap-4 rounded-[18px] bg-white h-auto max-w-[500px] p-5 w-full">
              <div className="py-[10px] px-0">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Edit Leave Type </h2>
         
              </div>

              <hr />
              <label htmlFor="" className="block text-md font-normal mb-1">
                <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Leave Type</p>
                <input
                                className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  type="text"
                  placeholder="Enter Leave Type Name"
                  name="name"
                  value={leaveTypeValue1?.name}
                  onChange={(e) => {
                    setLeaveTypeValue1({
                      ...leaveTypeValue1,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <label htmlFor="" className="block text-md font-normal mb-1">
                <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Days Per Year</p>
                <input
                                className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  type="text"
                  placeholder="Enter Days / Year"
                  name="days"
                  value={leaveTypeValue1?.days}
                  onChange={(e) => {
                    setLeaveTypeValue1({
                      ...leaveTypeValue1,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="w-full flex items-center gap-4 justify-start py-5">
                <button className="w-[86px] h-10 rounded-[5px] opacity-50 border border-black" onClick={() => setPopup41(false)}>
                  <span className="text-[#49515C] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Cancel</span>
                </button>

                <button className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF]" onClick={handleUpdateLeaveType}>
                  <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Update</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup5 && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center h-screen z-[3000] backdrop-blur-[1px]">
            <div className="popup1 popup5 max-w-[500px] max-h-[366px] gap-4 rounded-[18px] bg-white h-auto p-5 w-full">
              <div className="py-[10px] px-0">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Create New Lead Status</h2>
                <img onClick={() => setPopup5(false)} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747717164/cross1_welfvn.png" alt="" />
              </div>
              <hr />
              <label className="block text-md font-normal mb-1">
                <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Lead Status</p>

                <input
                                className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  type="text"
                  placeholder="Enter Leave Type Name"
                  name="status"
                  value={leadStatus?.status}
                  onChange={(e) => {
                    setLeadStatus({
                      ...leadStatus,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="w-full flex items-center gap-4 justify-start py-5">
                <button className="w-[86px] h-10 rounded-[5px] opacity-50 border border-black" onClick={() => setPopup5(false)}>
                  <span className="text-[#49515C] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Cancel</span>
                </button>

                <button className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF]" onClick={handleCreateLeadStatus}>
                  <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Create</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup6 && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center h-screen z-[3000] backdrop-blur-[1px]">
            <div className="popup1 popup5 max-w-[500px] max-h-[366px] gap-4 rounded-[18px] bg-white h-auto max-w-[500px] p-5 w-full">
              <div className="py-[10px] px-0">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Create New Lead Source</h2>
                <img onClick={() => setPopup6(false)} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747717164/cross1_welfvn.png" alt="" />
              </div>
              <hr />
              <label className="block text-md font-normal mb-1">
                <p className="popTitl text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] py-2">Lead Source</p>

                <input
                 className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  type="text"
                  placeholder="Enter Leave Type Name"
                  name="status"
                  value={leadSource?.status}
                  onChange={(e) => {
                    setLeadSource({
                      ...leadSource,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="w-full flex items-center gap-4 justify-start py-5">
                <button className="w-[86px] h-10 rounded-[5px] opacity-50 border border-black" onClick={() => setPopup6(false)}>
                  <span className="text-[#49515C] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Cancel</span>
                </button>

                <button className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF]" onClick={handleCreateLeadSource}>
                  <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Create</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default HRMsystemSetup;
