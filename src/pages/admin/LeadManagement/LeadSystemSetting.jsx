import React, { useState, useEffect, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";

import { confirmAlert } from "react-confirm-alert";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useMain } from "../../../hooks/UseMain";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";

const sidebarItem = [
  {
    title: "Industry",
    img: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027400/hub3_v6g6mu.png",
    tableData: [
      {
        title: "INDUSTRY",
      },
      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Lead Source",
    img: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027400/hub3_v6g6mu.png",
    tableData: [
      {
        title: "SOURCE",
      },

      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Lead Status",
    img: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027400/hub3_v6g6mu.png",
    tableData: [
      {
        title: "STATUS",
      },

      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Follow Up",
    img: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027400/hub3_v6g6mu.png",
    tableData: [
      {
        title: "FOLLOW-UP",
      },

      {
        title: "ACTION",
      },
    ],
  },
];

const LeadSystemSetting = () => {
  const {
    getLeadCatgory,
    postLeadCategory,
    user,
    postLeadStatus,
    postLeadSource2,
    AllLeadStatus,
    AllLeadSource,
    deleteIndustry,
    deleteLeadSource,
    updateLeadSource,
    updateIndustry,
    getLeadStat,
    postLeadStat,
    updateLeadStat,
    deleteLeadStat,
    postFollowUp,
    updateLeadCategory,
    updateFollowUp,
    deleteLeadCategory,
    deleteFollowUp,
    getFollowUp,
    getLeadSubCategory,
    postLeadSubCategory,
    updateLeadSubCategory,
    deleteLeadSubCategory,
  } = useMain();

  const [open, setOpen] = useState();

  const [popup, setPopup] = useState(false);
  const [showIndex, setShowIndex] = useState(null);

  const styleing = {
    display: popup ? "block" : "none",
  };

  const [allStatus, setAllStatus] = useState([]);
  const [allSource, setAllSource] = useState([]);
  const [allStat, setAllStat] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [sideBar, setSideBar] = useState([]);
  const [rightSideBar, setRightSideBar] = useState([]);

  // const img =
  const allSideItems = async () => {
    const res = await getLeadCatgory();
    console.log(res?.data);
    setSideBar(res?.data);
    setOpen(res.data[0]);
  };

  const allLeadSubcategory = async () => {
    const res = await getLeadSubCategory();
    console.log(res.data);
    setRightSideBar(res?.data);
  };
  useEffect(() => {
    console.log(open);
  }, [open]);

  useEffect(() => {
    allSideItems();
    allLeadSubcategory();
  }, []);
  const fetchAllStatus = async () => {
    const ans = await AllLeadStatus();
    setAllStatus(ans?.data);
  };
  const fetchAllSource = async () => {
    const ans = await AllLeadSource();
    setAllSource(ans?.data);
  };

  const fetchAllStat = async () => {
    const ans = await getLeadStat();
    setAllStat(ans?.data);
  };

  useEffect(() => {
    fetchAllStatus();
    fetchAllSource();
    fetchAllStat();
  }, [refreshFlag]);

  const [popup5, setPopup5] = useState(false);
  const [popup6, setPopup6] = useState(false);
  const [popup7, setPopup7] = useState(false);
  const [popup8, setPopup8] = useState(false);

  const [id, setId] = useState("");

  const [leadStatus, setLeadStatus] = useState({
    status: "",
  });
  const [leadSource, setLeadSource] = useState({
    status: "",
  });

  const [leadStat, setLeadStat] = useState({
    name: "",
  });

  const handleCreateLeadStatus = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await postLeadStatus({
      status: leadStatus?.status,
    });

    if (ans.status) {
      toast.success("success");
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
      toast.success("success");
      fetchAllSource();
      setLeadSource("");
      setPopup6(false);
    }

    toast.dismiss(toastId);
  };

  const handleCreateLeadStat = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await postLeadStat({
      name: leadStat?.name,
    });

    setRefreshFlag(!refreshFlag);

    if (ans.status) {
      toast.success("success");
      fetchAllStat();
      setLeadStat("");
      setPopup7(false);
    }

    toast.dismiss(toastId);
  };

  const deleteIndustryHandler = async (id) => {
    const ans = await deleteIndustry(id);
    if (ans?.success) {
      toast.success("Delete Succesfuly");
      fetchAllStatus();
    }
  };

  const deleteLeadSourceHandler = async (id) => {
    const ans = await deleteLeadSource(id);
    if (ans?.success) {
      toast.success("Delete Succesfuly");
      fetchAllSource();
    }
  };

  const deleteLeadStatHandler = async (id) => {
    const ans = await deleteLeadStat(id);
    if (ans?.success) {
      toast.success("Delete Succesfuly");
      fetchAllStat();
    }
  };

  const [currView, setCurrView] = useState(-1);

  const [isIndusUpat, setIsInuP] = useState(false);
  const [isLeSrc, setIsLdSrc] = useState(false);
  const [allFollow, setAllFollow] = useState([]);

  const [isStat, setIsStat] = useState(false);

  const getFollow = async () => {
    const ans = await getFollowUp();
    if (ans?.success) {
      setAllFollow(ans?.data);
    }
  };

  const CreateFollow = async () => {
    const ans = await postFollowUp({ name: leadStat.name });
    if (ans?.success) {
      toast.success("Successfuly created");
    }
    getFollow();
    setIsStat(false);
    setLeadStat((prev) => ({
      ...prev,
      name: "",
    }));
    setPopup8(false);
  };

  const deleteFollowHandler = async (id) => {
    const ans = await deleteFollowUp(id);
    if (ans?.success) {
      toast.success("Successfult deleted");
    }
    getFollow();
    setIsStat(false);
    setLeadStat((prev) => ({
      ...prev,
      name: "",
    }));
    setPopup8(false);
  };

  const updateFollow = async () => {
    const ans = await updateFollowUp({ id: isStat, name: leadStat.name });
    if (ans?.success) {
      toast.success("Successfuly updated");
    }
    getFollow();
    setIsStat(false);
    setLeadStat((prev) => ({
      ...prev,
      name: "",
    }));
    setPopup8(false);
  };

  const updateLeadSourceHandler = async () => {
    const ans = await updateLeadSource({
      id: isLeSrc,
      name: leadSource?.status,
    });
    if (ans?.success) {
      toast.success("updated Succesfuly");
      fetchAllSource();
      setIsLdSrc(false);
      setLeadSource((prev) => ({
        ...prev,
        status: "",
      }));
      setPopup6(false);
    }
  };

  const [createCat, setCreateCat] = useState("");
  const [catPop, setCatPop] = useState(false);

  const [editPop, setEditPop] = useState(false);

  const [createForm, setCreateForm] = useState("");
  const [editForm, setEditForm] = useState({
    name: "",
    leadCatgory: "",
    id: "",
  });

  const changeEditHandler = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const updateIndustryHandler = async (id) => {
    const ans = await updateIndustry({
      id: isIndusUpat,
      name: leadStatus?.status,
    });
    if (ans?.success) {
      toast.success("updated Succesfuly");
      fetchAllStatus();
      setIsInuP(false);
      setPopup5(false);
      setLeadStatus((prev) => ({
        ...prev,
        status: "",
      }));
    }
  };

  const updateLeadStatusHandler = async () => {
    const ans = await updateLeadStat({
      id: isStat,
      name: leadStat?.name,
    });
    if (ans?.success) {
      toast.success("updated Succesfuly");
      fetchAllStat();
      setIsStat(false);
      setLeadStat((prev) => ({
        ...prev,
        name: "",
      }));
      setPopup7(false);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editCategory, setEditCategory] = useState(false);
  const [showcategoryaction, setshowcategoryaction] = useState(null);

  useEffect(() => {
    getFollow();
  }, []);

  const createCategory = async () => {
    const toastId = toast.loading("loading..");
    await postLeadCategory(createCat);
    await allSideItems();
    toast.success("Created Successfully");
    toast.dismiss(toastId);
    setCatPop(false);
    setCreateCat("");
  };

  const handleEditCategory = async (categoryData = selectedCategory) => {
    if (!categoryData?._id) return;

    await updateLeadCategory(categoryData._id, createCat);
    await allSideItems();
    toast.success("Updated Successfully");
    setCatPop(false);
    setCreateCat("");
    setEditCategory(false);
    setSelectedCategory(null);
  };

  const deleteCategory = async (id) => {
    confirmAlert({
      title: "Are you sure to delete this category?",
      message: "All related data to this will be deleted",
      buttons: [
        {
          label: "Yes, Go Ahead!",
          style: {
            background: "#FF5449",
          },
          onClick: async () => {
            await deleteLeadCategory(id);
            toast.success("Deleted Successfully");
            allSideItems();
          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });
  };

  const wrapperRef = useRef();

  useOutsideClick(wrapperRef, () => {
    setshowcategoryaction(null);
    setShowIndex(null);
    setCatPop(false);
    setPopup8(false);
    setPopup7(false);
    setPopup6(false);
    setPopup5(false);
    setEditPop(false);
    setLeadStat({});
  });

  return (
    <>
      <div className="flex relative bg-[#f5f5f5] h-full">
        <div className="w-full bg-[#f5f5f5] ">
          <div className="pt-[32px] pr-0 lg:pr-[20px] pb-[32px] pl-0 lg:pl-[20px]  relative w-full">
            <div className="flex-col">
              <div className="min-h-[calc(100vh-80px)] h-auto bg-transparent rounded-[10px] mx-[10px] relative">
                <div className="flex flex-col lg:flex-row w-full items-center justify-between">
                  <h3 className="text-[24px] font-semibold text-[#111827] leading-6">
                    Lead System Setting
                  </h3>
                  <div className="flex flex-col lg:flex-row items-center gap-2">
                    <button
                      className="flex items-center gap-1 text-[16px] font-medium px-4 py-[6px] border border-[#2563eb]  rounded-md bg-[#2563eb] text-white mt-5 lg:mt-0"
                      onClick={() => {
                        setCatPop(true);
                        setCreateCat("");
                        setEditCategory(false);
                      }}
                    >
                      {" "}
                      <img
                        src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027352/Text_Type_yjphsi.png"
                        alt=""
                      />
                      Add Category
                    </button>
                    <button
                      className="flex items-center gap-1 text-[16px] font-medium px-4 py-[6px] border border-[#2563eb]  rounded-md bg-[#2563eb] text-white"
                      onClick={() => {
                        setLeadStat({});
                        if (open?.name === "Industry") {
                          setPopup5(true);
                        } else if (open?.name === "Lead Source") {
                          setPopup6(true);
                        } else if (open?.name === "Lead Status") {
                          setPopup7(true);
                        } else if (open?.name === "Follow Up") {
                          setPopup8(true);
                        } else {
                          console.log("optin", open);
                          setPopup5(true);
                        }
                      }}
                    >
                      <img
                        src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027352/Text_Type_yjphsi.png"
                        alt=""
                      />{" "}
                      Add SubCategory
                    </button>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row w-full gap-[30px] py-5">
                  <div className="max-w-[100%] lg:max-w-[300px] w-full rounded-[12px] bg-white">
                    {sideBar?.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setOpen(item);
                          setShowIndex(null);
                        }}
                        className={`flex items-center justify-between p-5 w-full gap-2 cursor-pointer border-b border-[#E8E9EB] h-16 ${
                          open === index && "openItem"
                        } `}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027400/hub3_v6g6mu.png"
                            alt=""
                          />

                          <span className="text-[16px] font-normal leading-[19px] text-left text-[#060606]">
                            {item.name}
                          </span>
                        </div>

                        <div className="relative">
                          <img
                            src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027065/thredonts_ou496j.png"
                            alt="action"
                            onClick={() =>
                              setshowcategoryaction(
                                showcategoryaction === index ? null : index
                              )
                            }
                          />

                          {showcategoryaction === index && (
                            <div
                              ref={wrapperRef}
                              className="absolute z-[1000] right-[15px] -top-[52px] w-[125px] bg-white border border-gray-200 shadow-lg flex flex-col"
                            >
                              <div
                                onClick={() => {
                                  if (index < 4) {
                                    alert(`you can't Edit this category `);
                                    setshowcategoryaction(null);
                                    return;
                                  }
                                  setSelectedCategory(item);
                                  setCreateCat(item?.name || "");
                                  setEditCategory(true);
                                  setshowcategoryaction(null);
                                  setCatPop(true);
                                }}
                                className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 "
                              >
                                <svg
                                  width="16"
                                  height="13"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.71569 5.51667L10.4824 6.28333L2.93236 13.8333H2.16569V13.0667L9.71569 5.51667ZM12.7157 0.5C12.5074 0.5 12.2907 0.583333 12.1324 0.741667L10.6074 2.26667L13.7324 5.39167L15.2574 3.86667C15.5824 3.54167 15.5824 3.01667 15.2574 2.69167L13.3074 0.741667C13.1407 0.575 12.9324 0.5 12.7157 0.5ZM9.71569 3.15833L0.499023 12.375V15.5H3.62402L12.8407 6.28333L9.71569 3.15833Z"
                                    fill="#383838"
                                  />
                                </svg>
                                <span className="!text-[13px]">Edit</span>
                              </div>
                              <hr />

                              <div
                                onClick={() => {
                                  if (index < 4) {
                                    alert(`you can't Delete this category `);
                                    setshowcategoryaction(null);
                                    return;
                                  }
                                  deleteCategory(item?._id);
                                  setshowcategoryaction(null);
                                }}
                                className="items-center w-full px-4 py-2 text-sm flex gap-2 text-red-600 hover:bg-red-100"
                              >
                                <svg
                                  className="cursor-pointer"
                                  width="12"
                                  height="13"
                                  viewBox="0 0 12 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.33317 5.5V13.8333H2.6665V5.5H9.33317ZM8.08317 0.5H3.9165L3.08317 1.33333H0.166504V3H11.8332V1.33333H8.9165L8.08317 0.5ZM10.9998 3.83333H0.999837V13.8333C0.999837 14.75 1.74984 15.5 2.6665 15.5H9.33317C10.2498 15.5 10.9998 14.75 10.9998 13.8333V3.83333Z"
                                    fill="#DE3730"
                                  />
                                </svg>
                                <span className="!text-[13px]">Delete</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[12px] border border-[#E8E9EB] bg-white px-5 pt-5 pb-0 w-full">
                    <div className="w-full m-auto">
                      <div className="w-full h-[34px] flex items-center gap-2">
                        <span className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">
                          {open?.name}
                        </span>
                      </div>

                      <div className="w-full overflow-x-auto rounded-lg relative">
                        <table className="min-w-full text-sm text-left bg-white rounded-lg">
                          <thead className="bg-white font-semibold">
                            <tr>
                              <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                                Industry
                              </th>
                              <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                                Action
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {open?.name === "Industry" &&
                              (allStatus.length === 0 ? (
                                <tr>
                                  <td
                                    colSpan="2"
                                    className="text-center text-gray-400 px-6 py-4"
                                  >
                                    No Data Found
                                  </td>
                                </tr>
                              ) : (
                                allStatus.map((item, index) => (
                                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 text-gray-800">
                                      {item?.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                      <div
                                        onClick={() => {
                                          if (showIndex === index) {
                                            setShowIndex(null);
                                          } else {
                                            setShowIndex(index);
                                          }
                                        }}
                                        className="navdiv cursor-pointer relative"
                                      >
                                        {" "}
                                        <img
                                          src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027065/thredonts_ou496j.png"
                                          alt=""
                                        />
                                        {showIndex === index && (
                                          <div
                                            ref={wrapperRef}
                                            className="absolute z-[1000] right-[100px] -top-[52px] w-[125px] bg-white border border-gray-200 shadow-lg flex flex-col"
                                          >
                                            {/* Edit Button */}
                                            <div
                                              onClick={() => {
                                                setPopup5(true);
                                                setIsInuP(item?._id);
                                                setLeadStatus((prev) => ({
                                                  ...prev,
                                                  status: item?.name,
                                                }));
                                              }}
                                              className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 "
                                            >
                                              <MdOutlineEdit className="text-[18px]" />
                                              <span className="text-sm font-medium text-gray-700">
                                                Edit
                                              </span>
                                            </div>

                                            <hr className="border-gray-200" />

                                            {/* Delete Button */}
                                            <div
                                              onClick={() => {
                                                setShowIndex(null);
                                                confirmAlert({
                                                  title:
                                                    "Are you sure to delete this data?",
                                                  message:
                                                    "All related data to this will be deleted",
                                                  buttons: [
                                                    {
                                                      label: "Yes, Go Ahead!",
                                                      style: {
                                                        background: "#FF5449",
                                                      },
                                                      onClick: async () => {
                                                        const toastId =
                                                          toast.loading(
                                                            "Loading..."
                                                          );
                                                        const ans =
                                                          await deleteIndustry(
                                                            item?._id
                                                          );
                                                        if (ans?.success) {
                                                          toast.success(
                                                            "Delete Succesfuly"
                                                          );
                                                          toast.dismiss(
                                                            toastId
                                                          );
                                                          await fetchAllStatus();
                                                        } else {
                                                          toast.error(
                                                            "SomeThing Wrong"
                                                          );
                                                          toast.dismiss(
                                                            toastId
                                                          );
                                                        }
                                                      },
                                                    },
                                                    {
                                                      label: "Cancel",
                                                      onClick: () => null,
                                                    },
                                                  ],
                                                });
                                              }}
                                              className="items-center w-full px-4 py-2 text-sm flex gap-2 text-red-600 hover:bg-red-100"
                                            >
                                              {/* <img src={deleted} alt="Delete Icon" className="w-6 h-6" /> */}
                                              <MdDeleteOutline className="text-[18px]" />
                                              <span className="text-sm font-medium ">
                                                Delete
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ))}

                            {open?.name == "Lead Source" &&
                              (allSource?.length === 0 ? (
                                <tr>
                                  <td
                                    colSpan="2"
                                    className="px-6 py-4 text-gray-800"
                                  >
                                    No Data Found
                                  </td>
                                </tr>
                              ) : (
                                allSource?.map((item, index) => (
                                  <tr key={index} className="bg-white ">
                                    <td className="px-6 py-4 text-gray-800">
                                      {item?.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                      <div
                                        onClick={() => {
                                          if (showIndex === index) {
                                            setShowIndex(null);
                                          } else {
                                            setShowIndex(index);
                                          }
                                        }}
                                        className="navdiv cursor-pointer relative"
                                      >
                                        {" "}
                                        <img
                                          src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027065/thredonts_ou496j.png"
                                          alt=""
                                        />
                                        {showIndex === index && (
                                          <div
                                            ref={wrapperRef}
                                            className="absolute z-[1000] right-[100px] -top-[52px] w-[125px] bg-white border border-gray-200 shadow-lg flex flex-col"
                                          >
                                            {/* Edit Button */}
                                            <div
                                              onClick={() => {
                                                setPopup6(true);
                                                setIsLdSrc(item?._id);
                                                setLeadSource((prev) => ({
                                                  ...prev,
                                                  status: item?.name,
                                                }));
                                              }}
                                              className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100"
                                            >
                                              <MdOutlineEdit className="text-[18px]" />
                                              <span className="text-sm font-medium text-gray-700">
                                                Edit
                                              </span>
                                            </div>

                                            <hr className="border-gray-200" />

                                            {/* Delete Button */}
                                            <div
                                              onClick={() => {
                                                setShowIndex(null);
                                                confirmAlert({
                                                  title:
                                                    "Are you sure to delete this data?",
                                                  message:
                                                    "All related data to this will be deleted",
                                                  buttons: [
                                                    {
                                                      label: "Yes, Go Ahead!",
                                                      style: {
                                                        background: "#FF5449",
                                                      },
                                                      onClick: async () => {
                                                        const toastId =
                                                          toast.loading(
                                                            "Loading..."
                                                          );
                                                        const ans =
                                                          await deleteLeadSource(
                                                            item?._id
                                                          );
                                                        if (ans?.success) {
                                                          toast.success(
                                                            "Delete Succesfuly"
                                                          );
                                                          await fetchAllSource();
                                                          toast.dismiss(
                                                            toastId
                                                          );
                                                        } else {
                                                          toast.error(
                                                            "SomeThing Wrong"
                                                          );
                                                          toast.dismiss(
                                                            toastId
                                                          );
                                                        }
                                                      },
                                                    },
                                                    {
                                                      label: "Cancel",
                                                      onClick: () => null,
                                                    },
                                                  ],
                                                });
                                              }}
                                              className="items-center w-full px-4 py-2 text-sm flex gap-2 text-red-600 hover:bg-red-100"
                                            >
                                              <MdDeleteOutline className="text-[18px]" />
                                              <span className="text-sm font-medium ">
                                                Delete
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ))}

                            {open?.name === "Lead Status" &&
                              (allStat?.length === 0 ? (
                                <tr>
                                  <td
                                    colSpan="2"
                                    className="text-center text-gray-400 px-6 py-4"
                                  >
                                    No Data Found
                                  </td>
                                </tr>
                              ) : (
                                allStat?.map((item, index) => (
                                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 text-gray-800">
                                      {item?.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                      <div
                                        onClick={() => {
                                          if (showIndex === index) {
                                            setShowIndex(null);
                                          } else {
                                            setShowIndex(index);
                                          }
                                        }}
                                        className="navdiv cursor-pointer relative"
                                      >
                                        {" "}
                                        <img
                                          src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027065/thredonts_ou496j.png"
                                          alt=""
                                        />
                                        {showIndex === index && (
                                          <div
                                            ref={wrapperRef}
                                            className="absolute z-[1000] right-[100px] -top-[60px] w-[125px] bg-white border border-gray-200 shadow-lg flex flex-col"
                                          >
                                          
                                            <div
                                              onClick={() => {
                                                setPopup7(true);
                                                setIsStat(item?._id);
                                                setLeadStat((prev) => ({
                                                  ...prev,
                                                  name: item?.name,
                                                }));
                                              }}
                                              className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 "
                                            >
                                              <MdOutlineEdit className="text-[18px]" />
                                              <span className="text-sm font-medium text-gray-700">
                                                Edit
                                              </span>
                                            </div>

                                            <hr className="border-gray-200" />

                                            {/* Delete Button */}
                                            <div
                                              onClick={() => {
                                                setShowIndex(null);
                                                confirmAlert({
                                                  title:
                                                    "Are you sure to delete this data?",
                                                  message:
                                                    "All related data to this will be deleted",
                                                  buttons: [
                                                    {
                                                      label: "Yes, Go Ahead!",
                                                      style: {
                                                        background: "#FF5449",
                                                      },
                                                      onClick: async () => {
                                                        const toastId =
                                                          toast.loading(
                                                            "Loading..."
                                                          );
                                                        const ans =
                                                          await deleteLeadStat(
                                                            item?._id
                                                          );
                                                        if (ans?.success) {
                                                          toast.success(
                                                            "Delete Succesfuly"
                                                          );
                                                          await fetchAllStat();
                                                          toast.dismiss(
                                                            toastId
                                                          );
                                                        } else {
                                                          toast.error(
                                                            "SomeThing Wrong"
                                                          );
                                                          toast.dismiss(
                                                            toastId
                                                          );
                                                        }
                                                      },
                                                    },
                                                    {
                                                      label: "Cancel",
                                                      onClick: () => null,
                                                    },
                                                  ],
                                                });
                                              }}
                                              className="items-center w-full px-4 py-2 text-sm flex gap-2 text-red-600 hover:bg-red-100"
                                            >
                                              {/* <img src={deleted} alt="Delete Icon" className="w-6 h-6" /> */}
                                              <MdDeleteOutline className="text-[18px]" />
                                              <span className="text-sm font-medium ">
                                                Delete
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ))}

                            {open?.name === "Follow Up" &&
                              (allFollow?.length === 0 ? (
                                <tr>
                                  <td
                                    colSpan="2"
                                    className="text-center text-gray-400 px-6 py-4"
                                  >
                                    No Data Found
                                  </td>
                                </tr>
                              ) : (
                                allFollow?.map((item, index) => (
                                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 text-gray-800">
                                      {item?.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                      <div
                                        onClick={() => {
                                          if (showIndex === index) {
                                            setShowIndex(null);
                                          } else {
                                            setShowIndex(index);
                                          }
                                        }}
                                        className="navdiv cursor-pointer relative"
                                      >
                                        {" "}
                                        <img
                                          src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027065/thredonts_ou496j.png"
                                          alt=""
                                        />
                                        {showIndex === index && (
                                          <div
                                            ref={wrapperRef}
                                            className="absolute z-[1000] right-[105px] -top-[60px] w-[125px]  bg-white border border-gray-200 shadow-lg flex flex-col"
                                          >
                                            {/* Edit Button */}
                                            <div
                                              onClick={() => {
                                                setPopup8(true);
                                                setIsStat(item?._id);
                                                setLeadStat((prev) => ({
                                                  ...prev,
                                                  name: item?.name,
                                                }));
                                              }}
                                              className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 "
                                            >
                                              <MdOutlineEdit className="text-[18px]" />
                                              <span className="text-sm font-medium text-gray-700">
                                                Edit
                                              </span>
                                            </div>

                                            <hr className="border-gray-200" />

                                            {/* Delete Button */}
                                            <div
                                              onClick={() => {
                                                setShowIndex(null);
                                                confirmAlert({
                                                  title:
                                                    "Are you sure to delete this data?",
                                                  message:
                                                    "All related data to this will be deleted",
                                                  buttons: [
                                                    {
                                                      label: "Yes, Go Ahead!",
                                                      style: {
                                                        background: "#FF5449",
                                                      },
                                                      onClick: async () => {
                                                        const toastId =
                                                          toast.loading(
                                                            "Loading..."
                                                          );
                                                        const ans =
                                                          await deleteFollowUp(
                                                            item?._id
                                                          );
                                                        if (ans?.success) {
                                                          toast.success(
                                                            "Deleted Successfully"
                                                          );
                                                          await getFollow();
                                                          toast.dismiss(
                                                            toastId
                                                          );
                                                        } else {
                                                          toast.error(
                                                            "SomeThing Wrong"
                                                          );
                                                          toast.dismiss(
                                                            toastId
                                                          );
                                                        }
                                                      },
                                                    },
                                                    {
                                                      label: "Cancel",
                                                      onClick: () => null,
                                                    },
                                                  ],
                                                });
                                              }}
                                              className="items-center w-full px-4 py-2 text-sm flex gap-2 text-red-600 hover:bg-red-100"
                                            >
                                              {/* <img src={deleted} alt="Delete Icon" className="w-6 h-6" /> */}
                                              <MdDeleteOutline className="text-[18px]" />
                                              <span className="text-sm font-medium ">
                                                Delete
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ))}

                            {![
                              "Industry",
                              "Follow Up",
                              "Lead Source",
                              "Lead Status",
                            ].includes(open?.name) &&
                              (rightSideBar
                                ?.slice(4)
                                ?.filter(
                                  (e) => e?.category?.name === open?.name
                                )?.length > 0 ? (
                                rightSideBar
                                  ?.slice(4)
                                  ?.filter(
                                    (e) => e?.category?.name === open?.name
                                  )
                                  .map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                                      <td className="px-6 py-4 tabl3Titl">
                                        {item?.name}
                                      </td>
                                      <td className="px-6 py-4 text-gray-800">
                                        <div
                                          onClick={() => {
                                            if (showIndex === index) {
                                              setShowIndex(null);
                                            } else {
                                              setShowIndex(index);
                                            }
                                          }}
                                          className="navdiv cursor-pointer relative"
                                        >
                                          <img
                                            src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027065/thredonts_ou496j.png"
                                            alt=""
                                          />
                                          {showIndex === index && (
                                            <div
                                              ref={wrapperRef}
                                              className="absolute z-[1000] right-[110px] -top-[52px] w-[125px] bg-white border border-gray-200 shadow-lg flex flex-col"
                                            >
                                              {/* Edit Button */}
                                              <div
                                                onClick={() => {
                                                  setShowIndex(null);
                                                  setEditPop(true);
                                                  setEditForm({
                                                    name: item?.name || "",
                                                    leadCatgory:
                                                      item?.category?._id || "",
                                                    id: item?._id || "",
                                                  });
                                                }}
                                                className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100"
                                              >
                                                <MdOutlineEdit className="text-[18px]" />
                                                <span className="text-sm font-medium text-gray-700">
                                                  Edit
                                                </span>
                                              </div>

                                              <hr className="border-gray-200" />

                                              {/* Delete Button */}
                                              <div
                                                onClick={() => {
                                                  setShowIndex(null);
                                                  confirmAlert({
                                                    title:
                                                      "Are you sure to delete this data?",
                                                    message:
                                                      "All related data to this will be deleted",
                                                    buttons: [
                                                      {
                                                        label: "Yes, Go Ahead!",
                                                        style: {
                                                          background: "#FF5449",
                                                        },
                                                        onClick: async () => {
                                                          const toastId =
                                                            toast.loading(
                                                              "Loading..."
                                                            );
                                                          await deleteLeadSubCategory(
                                                            item?._id
                                                          );
                                                          toast.success(
                                                            "Deleted Successfully"
                                                          );
                                                          toast.dismiss(
                                                            toastId
                                                          );
                                                          await allLeadSubcategory();
                                                        },
                                                      },
                                                      {
                                                        label: "Cancel",
                                                        onClick: () => null,
                                                      },
                                                    ],
                                                  });
                                                }}
                                                className="items-center w-full px-4 py-2 text-sm flex gap-2 text-red-600 hover:bg-red-100"
                                              >
                                                {/* <img src={deleted} alt="Delete Icon" className="w-6 h-6" /> */}
                                                <MdDeleteOutline className="text-[18px]" />
                                                <span className="text-sm font-medium ">
                                                  Delete
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                              ) : (
                                <tr>
                                  <td
                                    colSpan="2"
                                    className="text-center text-gray-400 px-6 py-4"
                                  >
                                    No Data Found
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {open === 0 && (
                    <div className="rounded-[12px] border border-[#E8E9EB] bg-white p-[20px] pt-[20px] pb-0 w-full">
                      <div className="w-full m-auto">
                        <div className="w-full h-[34px] flex items-center gap-2">
                          {/* <img src={frame1} alt="" /> */}
                          <span className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Industry</span>
                        </div>

                        <div className="relative overflow-x-auto">
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
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                                      <td className="px-6 py-4 text-gray-800">
                                        {item?.name}
                                      </td>

                                     
                                      <td className="px-6 py-4 text-gray-800">
                                        <div
                                          onClick={() => {
                                            if (showIndex === index) {
                                              setShowIndex(null);
                                            } else {
                                              setShowIndex(index);
                                            }
                                          }}
                                          className="navdiv cursor-pointer"
                                        >
                                          {" "}
                                          <img
                                            src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027065/thredonts_ou496j.png"
                                            alt=""
                                          />
                                        </div>

                                        {showIndex === index && (
                                          <div className="absolute z-[1000] left-[190px] top-[80px] w-[150px] rounded-xl bg-white border border-gray-200 shadow-lg flex flex-col space-y-3">
                                            {/* Edit Button */}
                                            <div
                                              onClick={() => {
                                                setPopup5(true);
                                                setIsInuP(item?._id);
                                                setLeadStatus((prev) => ({
                                                  ...prev,
                                                  status: item?.name,
                                                }));
                                              }}
                                              className="flex items-center gap-3 p-2 rounded-lg  cursor-pointer transition"
                                            >
                                              <img
                                                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027279/edited_bv9sy6.png"
                                                alt="Edit Icon"
                                                className="w-6 h-6"
                                              />
                                              <span className="text-sm font-medium text-gray-700">
                                                Edit
                                              </span>
                                            </div>

                                            <hr className="border-gray-200" />

                                            {/* Delete Button */}
                                            <div
                                              onClick={() => {
                                                deleteIndustryHandler(
                                                  item?._id
                                                );
                                              }}
                                              className="flex items-center gap-3 p-2 rounded-lg  cursor-pointer transition"
                                            >
                                              <img
                                                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027206/deleted_mqpntx.png"
                                                alt="Delete Icon"
                                                className="w-6 h-6"
                                              />
                                              <span className="text-sm font-medium text-red-500">
                                                Delete
                                              </span>
                                            </div>
                                          </div>
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

                  {open === 1 && (
                    <div className="rounded-[12px] border border-[#E8E9EB] bg-white p-[20px] pt-[20px] pb-0 w-full">
                      <div className="w-full m-auto">
                        <div className="w-full h-[34px] flex items-center gap-2">
                          <span className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Lead Source</span>
                        </div>

                        <div className="relative overflow-x-auto">
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
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                                      <td className="px-6 py-4 text-gray-800">
                                        {item?.name}
                                      </td>
                                      <td className="px-6 py-4 text-gray-800">
                                        <div
                                          onClick={() => {
                                            if (showIndex === index) {
                                              setShowIndex(null);
                                            } else {
                                              setShowIndex(index);
                                            }
                                          }}
                                          className="navdiv cursor-pointer"
                                        >
                                          {" "}
                                          <img
                                            src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027065/thredonts_ou496j.png"
                                            alt=""
                                          />
                                        </div>

                                        {showIndex === index && (
                                          <div className="absolute z-[1000] left-[190px] top-[80px] w-[150px] rounded-xl bg-white border border-gray-200 shadow-lg flex flex-col space-y-3">
                                            {/* Edit Button */}
                                            <div
                                              onClick={() => {
                                                setPopup5(true);
                                                setIsInuP(item?._id);
                                                setLeadStatus((prev) => ({
                                                  ...prev,
                                                  status: item?.name,
                                                }));
                                              }}
                                              className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 "
                                            >
                                              <img
                                                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027279/edited_bv9sy6.png"
                                                alt="Edit Icon"
                                                className="w-6 h-6"
                                              />
                                              <span className="text-sm font-medium text-gray-700">
                                                Edit
                                              </span>
                                            </div>

                                            <hr className="border-gray-200" />

                                            {/* Delete Button */}
                                            <div
                                              onClick={() => {
                                                deleteIndustryHandler(
                                                  item?._id
                                                );
                                              }}
                                              className="flex items-center gap-3 p-2 rounded-lg  cursor-pointer transition"
                                            >
                                              <img
                                                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027206/deleted_mqpntx.png"
                                                alt="Delete Icon"
                                                className="w-6 h-6"
                                              />
                                              <span className="text-sm font-medium text-red-500">
                                                Delete
                                              </span>
                                            </div>
                                          </div>
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

                  {open === 2 && (
                    <div className="rounded-[12px] border border-[#E8E9EB] bg-white p-[20px] pt-[20px] pb-0 w-full">
                      <div className="w-full m-auto">
                        <div className="w-full h-[34px] flex items-center gap-2">
                          <span className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Lead Status</span>
                        </div>

                        <div className="w-full overflow-x-auto rounded-lg relative">
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
                              {allStat?.length === 0
                                ? "No data found"
                                : allStat?.map((item, index) => (
                                    <tr key={index} className="bg-white ">
                                      <td className="text-center text-gray-400 px-6 py-4">
                                        {item?.name}
                                      </td>
                                      <td className="text-center text-gray-400 px-6 py-4">
                                        <div
                                          onClick={() => {
                                            if (showIndex === index) {
                                              setShowIndex(null);
                                            } else {
                                              setShowIndex(index);
                                            }
                                          }}
                                          className="navdiv cursor-pointer"
                                        >
                                          {" "}
                                          <img
                                            src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027065/thredonts_ou496j.png"
                                            alt=""
                                          />
                                        </div>

                                        {showIndex === index && (
                                          <div className="absolute z-[1000] left-[190px] top-[80px] w-[150px] rounded-xl bg-white border border-gray-200 shadow-lg flex flex-col space-y-3">
                                            {/* Edit Button */}
                                            <div
                                              onClick={() => {
                                                setPopup5(true);
                                                setIsInuP(item?._id);
                                                setLeadStatus((prev) => ({
                                                  ...prev,
                                                  status: item?.name,
                                                }));
                                              }}
                                              className="flex items-center gap-3 p-2 rounded-lg  cursor-pointer transition"
                                            >
                                              <img
                                                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027279/edited_bv9sy6.png"
                                                alt="Edit Icon"
                                                className="w-6 h-6"
                                              />
                                              <span className="text-sm font-medium text-gray-700">
                                                Edit
                                              </span>
                                            </div>

                                            <hr className="border-gray-200" />

                                            {/* Delete Button */}
                                            <div
                                              onClick={() => {
                                                deleteIndustryHandler(
                                                  item?._id
                                                );
                                              }}
                                              className="flex items-center gap-3 p-2 rounded-lg  cursor-pointer transition"
                                            >
                                              <img
                                                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027206/deleted_mqpntx.png"
                                                alt="Delete Icon"
                                                className="w-6 h-6"
                                              />
                                              <span className="text-sm font-medium text-red-500">
                                                Delete
                                              </span>
                                            </div>
                                          </div>
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

                  {open === 3 && (
                    <div className="rounded-[12px] border border-[#E8E9EB] bg-white p-[20px] pt-[20px] pb-0 w-full">
                      <div className="w-full m-auto">
                        <div className="w-full h-[34px] flex items-center gap-2">
                          <span className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Follow-up</span>
                        </div>

                        <div className="relative w-full overflow-x-auto rounded-lg">
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
                                      {item.title} hello
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {allFollow?.length === 0
                                ? "No data found"
                                : allFollow?.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ">
                                      <td className="px-6 py-4 text-gray-800">
                                        {item?.name}
                                      </td>
                                      <td className="px-6 py-4 text-gray-800">
                                        <div
                                          onClick={() => {
                                            if (showIndex === index) {
                                              setShowIndex(null);
                                            } else {
                                              setShowIndex(index);
                                            }
                                          }}
                                          className="navdiv cursor-pointer"
                                        >
                                          {" "}
                                          <img
                                            src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027065/thredonts_ou496j.png"
                                            alt=""
                                          />
                                        </div>

                                        {showIndex === index && (
                                          <div className="absolute z-[1000] left-[190px] top-[80px] w-[150px] rounded-xl bg-white border border-gray-200 shadow-lg flex flex-col space-y-3">
                                            {/* Edit Button */}
                                            <div
                                              onClick={() => {
                                                setPopup5(true);
                                                setIsInuP(item?._id);
                                                setLeadStatus((prev) => ({
                                                  ...prev,
                                                  status: item?.name,
                                                }));
                                              }}
                                              className="flex items-center gap-3 p-2 rounded-lg  cursor-pointer transition"
                                            >
                                              <img
                                                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027279/edited_bv9sy6.png"
                                                alt="Edit Icon"
                                                className="w-6 h-6"
                                              />
                                              <span className="text-sm font-medium text-gray-700">
                                                Edit
                                              </span>
                                            </div>

                                            <hr className="border-gray-200" />

                                            {/* Delete Button */}
                                            <div
                                              onClick={() => {
                                                deleteIndustryHandler(
                                                  item?._id
                                                );
                                              }}
                                              className="flex items-center gap-3 p-2 rounded-lg  cursor-pointer transition"
                                            >
                                              <img
                                                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027206/deleted_mqpntx.png"
                                                alt="Delete Icon"
                                                className="w-6 h-6"
                                              />
                                              <span className="text-sm font-medium text-red-500">
                                                Delete
                                              </span>
                                            </div>
                                          </div>
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
                          <label>Name:</label>
                          <input type="text" name="" id="" />
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

        {editPop && (
          <div className="z-[3000] backdrop-blur-[1px] fixed inset-0 bg-black/20 flex items-center justify-center h-screen">
            <div ref={wrapperRef} className="popup1 m-5 md:m-0 h-[270px] w-[500px] max-h-[366px] gap-4 p-[20px] rounded-[18px] bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">
                  {editPop ? `Create New ${open?.name}` : `Edit ${open?.name}`}
                </h2>
               
              </div>
              <hr />

              <label className="flex flex-col gap-[12px] mt-[20px]">
                <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">{open?.name}</p>
                <input
                className="border border-black h-[54px] rounded-[5px] px-[20px] text-gray-700"
                  type="text"
                  placeholder="Enter Industry"
                  name="name"
                  value={editForm.name}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setEditForm((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                  }}
                />
              </label>

              <label className="flex flex-col gap-[12px] mt-[20px]">
                <select
                  name="leadCatgory"
                  value={editForm.leadCatgory}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setEditForm((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                  }}
                >
                  <option value="">Select a Category</option>
                  {sideBar?.map((item, index) => (
                    <option key={index} value={item?._id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="w-full flex items-center gap-4 justify-start py-[20px]">
                <button
                  className="w-[86px] h-[40px] rounded-[5px] opacity-[0.5] border border-black"
                  onClick={() => {
                    setEditPop(false);
                    setEditForm({});
                  }}
                >
                  <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left text-[#49515C]">Cancel</span>
                </button>

                <button
                  className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF] text-white"
                  onClick={async () => {
                    const toastId = toast.loading("Loading...");
                    console.log(editForm);
                    await updateLeadSubCategory(
                      editForm.id,
                      editForm.name,
                      editForm.leadCatgory
                    );
                    await allLeadSubcategory();
                    toast.success("Updated Successfully");
                    toast.dismiss(toastId);
                    setEditPop(false);
                    setEditForm({});
                  }}
                >
                  <span>{"Edit"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup5 && (
          <div className="z-[3000] !important backdrop-blur-[1px] fixed inset-0 bg-black/20 flex items-center justify-center h-screen">
            <div ref={wrapperRef} className="popup1 m-5 md:m-0 h-[270px] w-[500px] max-h-[366px] p-[20px] gap-4 rounded-[18px] bg-white">
              {![
                "Industry",
                "Follow Up",
                "Lead Source",
                "Lead Status",
              ].includes(open?.name) ? (
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">{isIndusUpat ? "Edit" : `Create New ${open?.name}`}</h2>
                 
                  </div>
                  <hr />
                  <label className="flex flex-col gap-[12px] mt-[20px]">
                    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">{open?.name}</p>

                    <input
                    className="border border-black h-[54px] rounded-[5px]  px-[20px] text-gray-700"
                      type="text"
                      placeholder="Enter Industry"
                      value={createForm}
                      onChange={(e) => {
                        setCreateForm(e.target.value);
                      }}
                    />
                  </label>

                  <div className="w-full flex items-center gap-4 justify-start py-[20px]">
                    <button
                      className="w-[86px] h-[40px] rounded-[5px]  border border-black"
                      onClick={() => {
                        setPopup5(false);
                        setIsInuP(false);
                        setLeadStatus((prev) => ({
                          ...prev,
                          status: "",
                        }));
                      }}
                    >
                      <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left text-[#49515C]">Cancel</span>
                    </button>

                    <button
                      className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF] text-white"
                      onClick={async () => {
                        const toastId = toast.loading("loading..");
                        await postLeadSubCategory(open?._id, createForm);
                        await allLeadSubcategory();
                        toast.success("Created Successfully");
                        toast.dismiss(toastId);
                        setPopup5(false);
                        setCreateForm("");
                      }}
                    >
                      <span>{isIndusUpat ? "Update" : "Create"}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <h2>Create New Industry</h2>
                   
                  </div>
                  <hr />
                  <label className="flex flex-col gap-[12px] mt-[20px]">
                    <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Industry</p>

                    <input
                      className="border border-black h-[54px] rounded-[5px] px-[20px] text-gray-700"
                      type="text"
                      placeholder="Enter Industry"
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

                  <div className="w-full flex items-center gap-4 justify-start py-[20px]">
                    <button
                      className="w-[86px] h-[40px] rounded-[5px] opacity-[0.5] border border-black"
                      onClick={() => {
                        setPopup5(false);
                        setIsInuP(false);
                        setLeadStatus((prev) => ({
                          ...prev,
                          status: "",
                        }));
                      }}
                    >
                      <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left text-[#49515C]">Cancel</span>
                    </button>

                    <button
                      className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF] text-white"
                      onClick={
                        isIndusUpat
                          ? updateIndustryHandler
                          : handleCreateLeadStatus
                      }
                    >
                      <span>{isIndusUpat ? "Update" : "Create"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {catPop && (
          <div className="z-[3000] !important backdrop-blur-[1px] fixed inset-0 bg-black/20 flex items-center justify-center h-screen">
            <div ref={wrapperRef} className="popup1 m-5 md:m-0 h-[270px] p-[20px] w-[500px] max-h-[366px] gap-4 rounded-[18px] bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">
                  {editCategory ? "Update Category" : "Create New Category"}
                </h2>
                {/* <img
                  onClick={() => {
                    setCatPop(false);
                  }}
                  src={cross1}
                  alt=""
                /> */}
              </div>
              <hr />
              <label className="flex flex-col gap-[12px] mt-[20px]">
                <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Category</p>

                <input
                className="border border-black h-[54px] rounded-[5px] px-[20px] text-gray-700"
                  type="text"
                  placeholder="Enter Category"
                  value={createCat}
                  onChange={(e) => {
                    setCreateCat(e.target.value);
                  }}
                />
              </label>

              <div className="w-full flex items-center gap-4 justify-start py-[20px]">
                <button
                  className="w-[86px] h-[40px] rounded-[5px] opacity-[0.5] border border-black"
                  onClick={() => {
                    setCatPop(false);
                  }}
                >
                  <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left text-[#49515C]">Cancel</span>
                </button>

                <button
                  className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF] text-white"
                  onClick={() => {
                    if (editCategory) {
                      handleEditCategory();
                    } else {
                      createCategory();
                    }
                    setCatPop(false);
                  }}
                >
                  <span>{editCategory ? "Update" : "Create"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup6 && (
          <div className="z-[3000] !important backdrop-blur-[1px] fixed inset-0 bg-black/20 flex items-center justify-center h-screen">
            <div ref={wrapperRef} className="popup1 m-5 md:m-0 h-[270px] w-[500px] max-h-[366px] gap-4 rounded-[18px] bg-white p-[20px]">
              <div className="flex items-center justify-between">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Create New Lead Source</h2>
               
              </div>
              <hr />
              <label className="flex flex-col gap-[12px] mt-[20px]">
                <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Lead Source</p>

                <input
                className="border border-black h-[54px] rounded-[5px] opacity-[0.2] px-[20px] text-gray-700"
                  type="text"
                  placeholder="Enter Lead Source"
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

              <div className="w-full flex items-center gap-4 justify-start py-[20px]">
                <button
                  className="w-[86px] h-[40px] rounded-[5px] opacity-[0.5] border border-black"
                  onClick={() => {
                    setPopup6(false);
                    setIsLdSrc(false);
                    setLeadSource((prev) => ({
                      ...prev,
                      status: "",
                    }));
                  }}
                >
                  <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left text-[#49515C]">Cancel</span>
                </button>

                <button
                  className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF] text-white"
                  onClick={
                    isLeSrc ? updateLeadSourceHandler : handleCreateLeadSource
                  }
                >
                  <span>{isLeSrc ? "Update" : "Create"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup7 && (
          <div className="z-[3000] !important backdrop-blur-[1px] fixed inset-0 bg-black/20 flex items-center justify-center h-screen">
            <div ref={wrapperRef} className="popup1 m-5 md:m-0 h-[270px] w-[500px] max-h-[366px] gap-4 rounded-[18px] p-[20px] bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Create New Lead Status</h2>
                
              </div>
              <hr />
              <label className="flex flex-col gap-[12px] mt-[20px]">
                <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Lead Status</p>

                <input
                className="border border-black h-[54px] rounded-[5px] opacity-[0.2] px-[20px] text-gray-700"
                  type="text"
                  placeholder="Enter Lead Status"
                  name="name"
                  value={leadStat?.name}
                  onChange={(e) => {
                    setLeadStat({
                      ...leadStat,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="w-full flex items-center gap-4 justify-start py-[20px]">
                <button
                  className="w-[86px] h-[40px] rounded-[5px] opacity-[0.5] border border-black"
                  onClick={() => {
                    setPopup7(false);
                    setIsStat(false);
                    setLeadStat((prev) => ({
                      ...prev,
                      name: "",
                    }));
                  }}
                >
                  <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left text-[#49515C]">Cancel</span>
                </button>

                <button
                  className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF] text-white"
                  onClick={
                    isStat ? updateLeadStatusHandler : handleCreateLeadStat
                  }
                >
                  <span
                    onClick={() => {
                      setIsStat(false);
                      setPopup7(false);
                    }}
                  >
                    {isStat ? "Update" : "Create"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup8 && (
          <div className="z-[3000] !important backdrop-blur-[1px] fixed inset-0 bg-black/20 flex items-center justify-center h-screen">
            <div ref={wrapperRef} className="popup1 m-5 md:m-0 h-[270px] w-[500px] max-h-[366px] gap-4 rounded-[18px] p-[20px] bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Create New Follow Up</h2>
               
              </div>
              <hr />
              <label className="flex flex-col gap-[12px] mt-[20px]">
                <p className="text-[#1B2533] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left">Follow-up</p>

                <input
                className="border border-black h-[54px] rounded-[5px] opacity-[0.2] px-[20px] text-gray-700"
                  type="text"
                  placeholder="Enter FollowUp"
                  name="name"
                  value={leadStat?.name}
                  onChange={(e) => {
                    setLeadStat({
                      ...leadStat,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </label>

              <div className="w-full flex items-center gap-4 justify-start py-[20px]">
                <button
                  className="w-[86px] h-[40px] rounded-[5px] opacity-[0.5] border border-black"
                  onClick={() => {
                    setPopup8(false);
                    setIsStat(false);
                    setLeadStat((prev) => ({
                      ...prev,
                      name: "",
                    }));
                  }}
                >
                  <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left text-[#49515C]">Cancel</span>
                </button>

                <button
                  className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF] text-white"
                  onClick={isStat ? updateFollow : CreateFollow}
                >
                  <span
                    onClick={() => {
                      setIsStat(false);
                      setPopup8(false);
                    }}
                  >
                    {isStat ? "Update" : "Create"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default LeadSystemSetting;
