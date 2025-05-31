import React, { useEffect, useRef, useState } from "react";

import "react-calendar/dist/Calendar.css";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useLocation } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useMain } from "../../../hooks/UseMain";
import useOnClickOutside from "../../../hooks/UseOnClickOutside";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";


const ImportLead = () => {
  const {
 
    getLead2,
    allEmployee,
    updateLeadStatus,
    CreateNoteApi,
    taskCreateApi,
    meetCreateApi,
    taskEditApi,
    meetEditApi,
    GetNoteApi,
    ShareLeadApi,
    DeleteNoteApi,
    updateNoteApi,
    FetchFollowApi,
    getLeadStat,
    getFollowUp,
    getUserByDesignation1,
    getQuotationApi,
    deleteQuotationapi,
    deleteQproapi,
    getSaveTempalte
  } = useMain();

  const { id } = useParams();

  const location = useLocation();

  const [shareOpen, setShareOpen] = useState(false);

  const [shareList, setShareList] = useState([]);
  const { type, data1 } = location.state || {};

  const [data, setData] = useState({});
  const [shareSrch, setShareSrch] = useState("");
  const [shareemp, setShareEmp] = useState([]);

  const [LeadStatus, setLeadStatus] = useState("");

  const handleCheckboxChange = (empId) => {
    setShareList((prevList) =>
      prevList.includes(empId)
        ? prevList.filter((id) => id !== empId)
        : [...prevList, empId]
    );
  };

  const [leadStat, setLeadStat] = useState([]);

  const [userDeg, setUserDeg] = useState([]);

  const [Note, setNote] = useState("");

  const proNavRef2 = useRef(null);
  useOnClickOutside(proNavRef2, () => setShareOpen(false));

  const navigate = useNavigate();

  const [allFollowUp, setAllFollowUp] = useState([]);

  const [allEmple, setAllEmple] = useState([]);

  const fetchAllEmp = async () => {
    const ans = await allEmployee();
    setAllEmple(ans?.emp);
    setShareEmp(ans?.emp);
  }

  useEffect(() => {
    fetchAllEmp();
  }, [])

  const fetchFollowUp = async () => {
    const ans = await FetchFollowApi(id);
    if (ans?.status) {
      setAllFollowUp(ans?.data);
    }
  };

  useEffect(() => {

    if (shareSrch === "") {
      setShareEmp([...allEmple]);
    }
    else {
      const data = allEmple.filter((emp) => emp?.fullName?.toLowerCase()?.includes(shareSrch.toLowerCase()));
      setShareEmp(data);

    }

  }, [shareSrch])

  const fetchUserDesignation = async () => {
    const ans = await getUserByDesignation1();
    setUserDeg(ans?.data);
  };

  useEffect(() => {
    fetchUserDesignation();
  }, []);

  const fetchLeadStat = async () => {
    const ans = await getLeadStat();
    setLeadStat(ans?.data);
  };

  useEffect(() => {
    fetchLeadStat();
  }, []);

  const getData = async () => {
    let ans = await getLead2(id, "", "", "");
    setData(ans.data[0]);
    const leadOwnerIds = ans?.data[0]?.LeadOwner.map(owner => owner._id);
    setShareList(leadOwnerIds);
  };

  const [allFollow2, setAllFollow2] = useState([]);

  const getFollow = async () => {
    const ans = await getFollowUp();
    if (ans?.success) {
      setAllFollow2(ans?.data);
    }
  };

  useEffect(() => {
    getFollow();
  }, []);

  const updatingLeadStatus = async (leading) => {
    const { _id } = data;
    const ans = await updateLeadStatus(_id, leading);
  };

  const [isNoteEdit, setIsNoteEdit] = useState(false);
  const [allNote, setAllNote] = useState([]);

  const getNotes = async () => {
    const ans = await GetNoteApi(id);
    if (ans?.status) {
      setAllNote(ans?.data);
    }
  };

  const createNote = async () => {
    if (LeadStatus === "") {
      return toast.error('Please Select any Lead Status')
    };
    if (Note === "") {
      return toast.error('Please Write any Note')
    };
    const ans = await CreateNoteApi(id, Note, LeadStatus);
    if (ans?.status) {
      toast.success("Successfuly created");
      getNotes();
      setNote("");
      setLeadStatus("Status");
    }
  };

  const updatingNote = async () => {
    if (LeadStatus === "") {
      return toast.error('Please Select any Lead Status')
    };
    if (Note === "") {
      return toast.error('Please Write any Note')
    };
    const ans = await updateNoteApi(isNoteEdit, Note, LeadStatus);
    if (ans?.status) {
      toast.success("Successfuly created");
      getNotes();
      setNote("");
      setIsNoteEdit(false);
      setLeadStatus("Status");
    }
  };

  const deleteNote = async (id) => {
    confirmAlert({
      title: 'Are you sure to Delete this Note?',
      message: 'All related data to this will be deleted',
      buttons: [
        {
          label: 'Yes, Go Ahead!',
          style: {
            background: "#FF5449"
          },
          onClick: async () => {
            const toastId = toast.loading("Loading...");
            const ans = await DeleteNoteApi(id);
            if (ans?.status) {
              toast.success("Successfuly deleted");
              getNotes();
            } else {
              toast.error("Something went wrong");
            }
            toast.dismiss(toastId);

          }
        },
        {
          label: 'Cancel',

          onClick: () => null
        }
      ]
    });

  };


  const shareleads = async () => {
    const toastId = toast.loading("Loading...");
    const resp = await ShareLeadApi(id, shareList);
    toast.success("Successfuly shared");
    toast.dismiss(toastId);
    getData();
  }

  const [openCreateTask, setOpenCreateTask] = useState(false);
  const [openCreateMeet, setOpenCreateMeet] = useState(false);
  const [opnAdNew, setOpenAdNew] = useState(false);

  const [taskData, setTaskData] = useState({
    LeadName: `${data?.FirstName || ""} ${data?.LastName || ""}`,
    FollowUpType: "",
    Date: "",
    Time: "",
    Remark: "",
    LeadId: id,
    userId: data?.LeadOwner?._id,
  });

  const [meetData, setMeetData] = useState({
    title: "",
    meetDateFrom: "",
    meetDateTo: "",
    Status: "",
    LeadId: id,
    meetTimeFrom: "",
    meetTimeTo: "",
    Host: "",
    RelatedTo: "",
    Participant: "",
    Note: "",
    userId: data?.LeadOwner?._id,
    MeetingLink: "",
  });

  const taskHandler = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const meetHandler = (e) => {
    const { name, value } = e.target;
    setMeetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const TaskSubmitHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");

    const ans = await taskCreateApi({ ...taskData });

    if (ans?.status) {
      toast.success("Successfuly created");
      setTaskData({
        LeadName: `${data?.FirstName || ""} ${data?.LastName || ""}`,
        FollowUpType: "",
        Status: "",
        Date: "",
        Time: "",
        Remark: "",
        LeadId: id,
        userId: data?.LeadOwner?._id,
      });
      fetchFollowUp();
      setOpenCreateTask(false);
    }

    toast.dismiss(toastId);
  };

  const taskUpdateHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");

    const ans = await taskEditApi({ ...taskData, taskId: data1?._id });

    if (ans?.status) {
      toast.success("Successfuly updated");
      setTaskData({
        LeadName: `${data?.FirstName || ""} ${data?.LastName || ""}`,
        FollowUpType: "",
        Status: "",
        Date: "",
        Time: "",
        Remark: "",
        LeadId: id,
        userId: data?.LeadOwner?._id,
      });
      setOpenCreateTask(false);
    }

    toast.dismiss(toastId);
  };

  const meetSubmitHandler = async (e) => {
    e.preventDefault();
    if (meetData.title === '') {
      return toast.error('Please enter title');
    }
    if (meetData.Status === '') {
      return toast.error('Please enter Status');
    }
    if (meetData.meetDateFrom === '') {
      return toast.error('Please enter meet date from');
    }
    if (meetData.meetDateTo === '') {
      return toast.error('Please enter meet date to');
    }

    if (meetData.meetTimeFrom === '') {
      return toast.error('Please enter meet time from');
    }
    if (meetData.meetTimeTo === '') {
      return toast.error('Please enter meet time to');
    }
    if (meetData.Host === '') {
      return toast.error('Please enter Host name');
    }
    if (meetData.RelatedTo === '') {
      return toast.error('Please enter Related To');
    }
    if (meetData.Participant === '') {
      return toast.error('Please enter Participent Mail Address');
    }
    if (meetData.Note === '') {
      return toast.error('Please enter Note');
    }
    if (meetData.MeetingLink === '') {
      return toast.error('Please enter Meeting Link');
    }

    const toastId = toast.loading("Loading...");

    const ans = await meetCreateApi({ ...meetData });

    if (ans?.status) {
      toast.success("Successfuly created");
      setOpenCreateMeet(false);
      setMeetData({
        title: "",
        meetDateFrom: "",
        meetDateTo: "",
        Status: "",
        meetTimeFrom: "",
        meetTimeTo: "",
        Host: "",
        RelatedTo: "",
        Participant: "",
        Note: "",
        userId: data?.LeadOwner?._id,
        MeetingLink: "",
      });
    }

    toast.dismiss(toastId);
  };

  const meetUpdateHandler = async (e) => {
    e.preventDefault();
    if (meetData.title === '') {
      return toast.error('Please enter title');
    }
    if (meetData.Status === '') {
      return toast.error('Please enter Status');
    }
    if (meetData.meetDateFrom === '') {
      return toast.error('Please enter meet date from');
    }
    if (meetData.meetDateTo === '') {
      return toast.error('Please enter meet date to');
    }

    if (meetData.meetTimeFrom === '') {
      return toast.error('Please enter meet time from');
    }
    if (meetData.meetTimeTo === '') {
      return toast.error('Please enter meet time to');
    }
    if (meetData.Host === '') {
      return toast.error('Please enter Host name');
    }
    if (meetData.RelatedTo === '') {
      return toast.error('Please enter Related To');
    }
    if (meetData.Participant === '') {
      return toast.error('Please enter Participent Mail Address');
    }
    if (meetData.Note === '') {
      return toast.error('Please enter Note');
    }
    if (meetData.MeetingLink === '') {
      return toast.error('Please enter Meeting Link');
    }

    const toastId = toast.loading("Loading...");

    const ans = await meetEditApi({ ...meetData, meetId: data1?._id });

    if (ans?.status) {
      toast.success("Successfuly created");
      setOpenCreateMeet(false);
      setMeetData({
        title: "",
        meetDateFrom: "",
        meetDateTo: "",
        Status: "",
        meetTimeFrom: "",
        meetTimeTo: "",
        Host: "",
        RelatedTo: "",
        Participant: "",
        Note: "",
        userId: data?.LeadOwner?._id,
      });
    }

    toast.dismiss(toastId);
  };

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const intHours = parseInt(hours, 10);
    const amPm = intHours >= 12 ? "PM" : "AM";
    const adjustedHours = intHours % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${adjustedHours}:${minutes} ${amPm}`;
  };

  const [allQuota, setAllQuota] = useState([]);
  const [allPropo, setAllPropo] = useState([]);

  const [openDrops, setOpenDrops] = useState(null);

  const proNavRef = useRef(null);
  useOnClickOutside(proNavRef, () => setOpenDrops(null));

  const [saveTemplate, setSaveTemplate] = useState([]);

  const fetchSaveTemplates = async () => {
    try {

      const ans = await getSaveTempalte(id);
      console.log("savetemplate ", ans);
      if (ans?.status) {
        setSaveTemplate(ans?.data);
      }

    } catch (error) {
      toast.error("Something went wrong , Please try again");
    }
  }

  const getQuotationOfLead = async () => {
    const ans = await getQuotationApi(id);
    setAllQuota(ans?.quotations);
    setAllPropo(ans?.proposals);
  };

  const deleteQuotationApi = async (id) => {
    confirmAlert({
      title: 'Are you sure to Delete this Quotation?',
      message: 'All related data to this will be deleted',
      buttons: [
        {
          label: 'Yes, Go Ahead!',
          style: {
            background: "#FF5449"
          },
          onClick: async () => {
            const toastId = toast.loading("Loading...");
            const ans = await deleteQuotationapi(id);
            if (ans?.status) {
              getQuotationOfLead();
              fetchSaveTemplates();
              toast.success("Successfuly deleted");
            } else {
              toast.error("Something went wrong");
            }
            toast.dismiss(toastId);
          }
        },
        {
          label: 'Cancel',

          onClick: () => null
        }
      ]
    });
  };

  const deletePropsalApi = async (id) => {
    confirmAlert({
      title: 'Are you sure to Delete this Propsal?',
      message: 'All related data to this will be deleted',
      buttons: [
        {
          label: 'Yes, Go Ahead!',
          style: {
            background: "#FF5449"
          },
          onClick: async () => {
            const toastId = toast.loading("Loading...");
            const ans = await deleteQproapi(id);
            if (ans?.status) {
              getQuotationOfLead();
              toast.success("Successfuly deleted");
            } else {
              toast.error("Something went wrong");
            }
            toast.dismiss(toastId);
          }
        },
        {
          label: 'Cancel',

          onClick: () => null
        }
      ]
    });
  };

  useEffect(() => {
    if (type === "meet" && data1) {
      setMeetData(data1);
      setOpenCreateMeet(true);
    }
  }, [type, data1]);

  useEffect(() => {
    if (type === "task" && data1) {
      setTaskData(data1);
      setOpenCreateTask(true);
    }
  }, [type, data1]);

  useEffect(() => {
    if (data) {
      setMeetData((prevMeetData) => ({
        ...prevMeetData,
        userId: data?.LeadOwner?._id,
      }));

      setTaskData((prev) => ({
        ...prev,
        userId: data?.LeadOwner?._id,
      }));
    }
  }, [data]);

  useEffect(() => {
    setTaskData((prev) => ({
      ...prev,
      LeadName: `${data?.FirstName || ""} ${data?.LastName || ""}`,
    }));
  }, [data]);

  useEffect(() => {
    const size = allNote.length;
    if (size) {
      let lastNote = allNote[size - 1];
      const { Status } = lastNote;
      setLeadStatus(Status);
    }
  }, [allNote]);

  useEffect(() => {
    getData();
    getNotes();
    fetchFollowUp();
    getQuotationOfLead();
    fetchSaveTemplates();
  }, []);

  const [showIndex, setShowIndex] = useState(null);
  const [showPropsalIndex, setShowPropsalIndex] = useState(null);
  const [showNoteIndex, setShowNoteIndex] = useState(null);

  const meetingpopref = useRef();
  const followpopref = useRef();
  const addnewpopref = useRef();
  const showactionref = useRef();
  const showpurposalactionref = useRef();
  const deletenoteref = useRef();

  useOutsideClick(meetingpopref, () => {
    setOpenCreateMeet(false);
  })
  useOutsideClick(followpopref, () => {
    setOpenCreateTask(false);
  })
  useOutsideClick(addnewpopref, () => {
    setOpenAdNew(false)
  })
  useOutsideClick(showactionref, () => {
    setShowIndex(null);
  })
  useOutsideClick(showpurposalactionref, () => {
    setShowPropsalIndex(null);
  })
  useOutsideClick(deletenoteref, () => {
    setShowNoteIndex(null);
  })

  useEffect(() => {
    getData();
  }, [LeadStatus])

  return (
    <div className="relative ">
      <div className="flex relative  h-full">
      

        <div className="w-full ">
         

          <div className="px-[20px] pt-[32px] pb-[32px] relative w-full">
            {/* first  */}
            <section className="flex items-center justify-between">
              {/* /left side  */}
              <div className="flex items-center gap-[10px]">
              

                <div className="lTITL">
                  <h2 className="text-[#101820] text-2xl font-semibold leading-8 text-left pl-6">
                    {data?.FirstName} {data?.LastName}
                  </h2>
                 
                </div>
              </div>

              {/* right side  */}
              <div className="flex items-center gap-[16px]">

              

                <button
                  onClick={() =>
                    navigate("/adminDash/editLead", { state: data })
                  }
                  className="flex items-center justify-evenly w-[80px] h-10 border border-[#0B56E4] rounded-[10px] bg-[linear-gradient(131.78deg,#D1E8FD_6.87%,#EDEFFF_91.67%)"
                >
                  <span className="text-[#0B56E4] font-medium text-[16px] ">Edit</span>
                </button>

              </div>

            </section>

            {/* second sect */}

            {/* third secttion  */}
            <div className="flex flex-col gap-4">
              {/* first part  */}
              <div className="flex flex-col gap-6 mt-5 bg-white px-[30px] py-5 bg-white rounded-lg shadow p-2">
                <h2 className="text-[16px] font-bold leading-6 tracking-[0.0015em] text-left text-[#101820]">Lead Information</h2>

                <div className="flex  flex-col lg:flex-row justify-between overflow-x-scroll lg:overflow-x-hidden">
                  {/* left side  */}
                  <div className="w-full lg:w-1/2 flex flex-col gap-5">
                    <div className="flex  gap-5 items-center">
                      <h3 className="text-[14px] min-w-fit font-normal leading-5 tracking-[0.0025em] text-right text-[#1B2533]">Lead Owner :</h3>
                      <div className="leanwlonwers">
                        {
                          data?.LeadOwner?.map((own, index) => (
                            <p className="min-w-max" key={index}>{own?.fullName} , </p>
                          ))
                        }
                      </div>
                    </div>


                    <div className="flex gap-5 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] text-right text-[#1B2533]">Phone :</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{data?.Phone}</p>
                    </div>
                    <div className="flex gap-5 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] text-right text-[#1B2533]">Industry :</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{data?.Industry}</p>
                    </div>

                    <div className="flex gap-5 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] min-w-fit text-[#1B2533]">Annual Revenue :</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">${data?.AnnualRevenue}</p>
                    </div>

                    <div className="flex gap-5 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] text-right text-[#1B2533]">Lead Status :</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{data?.LeadStatus}</p>
                    </div>
                  </div>

                  {/* right side  */}
                  <div className="w-full lg:w-1/2 flex flex-col gap-5 mt-5 lg:mt-0">
                    <div className="flex gap-5 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] text-right text-[#1B2533]">Company :</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{data?.Company}</p>
                    </div>

                    <div className="flex gap-5 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] min-w-fit text-[#1B2533]">Lead Name :</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left min-w-max text-[#1B2533]">
                        {data?.FirstName} {data?.LastName}
                      </p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] text-right text-[#1B2533]">Email :</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{data?.Email}</p>
                    </div>

                    <div className="flex gap-5 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] text-right text-[#1B2533]">Fax :</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{data?.Fax}</p>
                    </div>
                    <div className="flex gap-5 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] text-right text-[#1B2533]">No. of Employees :</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{data?.NoOfEmployee}</p>
                    </div>
                    <div className="flex gap-5 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] min-w-fit text-[#1B2533]">Lead Source :</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{data?.LeadSource}</p>
                    </div>
                  </div>
                </div>
              </div>

              {data.dynamicFields && (
                <div className="flex flex-col gap-6 mt-5 bg-white px-[30px] py-5 ">
                  <h2 className="text-[16px] font-bold leading-6 tracking-[0.0015em] text-left text-[#101820]">Additional Fields</h2>

                  <div className="flex justify-between">
                    {/* left side  */}
                    <div className="w-1/2 flex flex-col gap-5">
                      {Object.entries(data.dynamicFields)
                        .filter((_, idx) => idx % 2 === 0)
                        .map(([field, value]) => (
                          <div className="flex gap-5 items-center" key={field}>
                            <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] text-right text-[#1B2533]">{field} :</h3>
                            <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{value}</p>
                          </div>
                        ))
                      }
                    </div>

                    {/* right side  */}
                    <div className="w-1/2 flex flex-col gap-5">
                      {Object.entries(data.dynamicFields)
                        .filter((_, idx) => idx % 2 === 1)
                        .map(([field, value]) => (
                          <div className="flex gap-5 items-center" key={field}>
                            <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] text-right text-[#1B2533]">{field} :</h3>
                            <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{value}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              )}



              {/* second part  */}
              <div className="flex flex-col gap-6 mt-5 bg-white px-[30px] py-5 rounded-lg shadow p-2">
                <h2 className="text-[16px] font-bold leading-6 tracking-[0.0015em] text-left text-[#101820]">Address Information</h2>

                <div className="flex flex-col lg:flex-row justify-between">
                  {/* left side  */}
                  <div className="w-full lg:w-1/2 flex flex-col gap-5">
                    <div className="flex gap-5 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] text-right text-[#1B2533]">Street :</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{data?.Street}</p>
                    </div>

                    <div className="flex gap-5 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] text-right text-[#1B2533]">State</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{data?.State}</p>
                    </div>

                    <div className="flex gap-5 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] text-right text-[#1B2533]">Country :</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{data?.Country}</p>
                    </div>
                  </div>

                  {/* right side  */}
                  <div className="w-full lg:w-1/2 flex flex-col gap-5 mt-5 lg:mt-0">
                    <div className="flex gap-5 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] text-right text-[#1B2533]">city :</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{data?.City}</p>
                    </div>

                    <div className="flex gap-5 items-center">
                      <h3 className="text-[14px] font-normal leading-5 tracking-[0.0025em] text-[#1B2533]">zip code :</h3>
                      <p className="text-[16px] font-medium leading-6 tracking-[0.005em] text-left text-[#1B2533]">{data?.ZipCode}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* third  */}
              <div className="flex flex-col gap-6 mt-5 bg-white px-[30px] py-5  rounded-lg shadow p-2">
                <h2 className="text-[16px] font-bold leading-6 tracking-[0.0015em] text-left text-[#101820]">Descriptive Information</h2>

                <div className="flex justify-between secondWRap">
                  <p>
                   <span className="font-semibold"> Description:</span> <span>{data?.DescriptionInfo}</span>
                  </p>
                </div>
              </div>

              {/* second  third  */}
              <div className="flex flex-col gap-6 mt-5  px-[30px] py-5 bg-white rounded-lg shadow p-2">
                <div className="flex flex-col w-full gap-6">
                  <h2 className="text-[16px] font-bold leading-6 tracking-[0.0015em] text-left text-[#101820]">Lead Status</h2>

                  <hr />

                  <select
                    onChange={(e) => {
                      setLeadStatus(e.target.value);
                      updatingLeadStatus(e.target.value);
                    }}
                    value={LeadStatus}
                    className="w-[140px] h-10 rounded-[10px] border border-[#0B56E4] bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)] text-black text-[16px] font-medium leading-6 tracking-[0.005em] text-left font-inter sewidfls"
                    name="LeadStatus"
                    id=""
                  >
                    <option> Status</option>
                    {leadStat?.map((val, index) => {
                      return (
                        <option key={index} value={val?.name}>
                          {val?.name}
                        </option>
                      );
                    })}
                  </select>

                  <label className="flex flex-col gap-2">
                    <p>Note:</p>
                    <textarea
                    className="w-full border-black border"
                      value={Note}
                      onChange={(e) => {
                        setNote(e.target.value);
                      }}
                      type="text"
                    />
                  </label>

                  <div className="flex justify-end gap-5 max-w-[709px]">
                    <button
                      onClick={() => {
                        setNote("");
                        setIsNoteEdit(false);
                      }}
                      className="w-[86px] h-10 rounded-[10px] border border-[#B8BBC0] bg-white text-[#666D76] text-[16px] font-medium leading-6 tracking-[0.005em]"
                    >
                      Cancel
                    </button>

                    <button
                      className="w-[118px] h-10 px-4 rounded-[10px] flex justify-center items-center bg-[#0B56E4] text-white"
                      onClick={isNoteEdit ? updatingNote : createNote}
                    >
                      <span>{isNoteEdit ? "Update" : "Save"}</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-[14px]">
                    {allNote?.map((note, index) => (
                      <div key={index} className="singlNoteDe">
                        <div className="line_danda"></div>

                        <div className="noteStaus">
                          <p>{note?.Status}</p>
                        </div>

                        <p className="notedate">
                          {new Date(note?.Date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>

                        <p className="noteTExt">{note?.Note}</p>

                        
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* secoond third   third  */}
              <div className="flex flex-col gap-6 mt-5 bg-white px-[30px] py-5  rounded-lg shadow p-2">
                <div className="flex flex-col w-full gap-6 !flex-row !justify-between !items-center">
                  <h2 className="text-[16px] font-bold leading-6 tracking-[0.0015em] text-left text-[#101820]">Open Activities</h2>

                  <div className="relative">
                    <div
                      onClick={() => setOpenAdNew((prev) => !prev)}
                      className="w-[131px] h-10 rounded-[10px] bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)] border border-[#0B56E4] flex items-center justify-center cursor-pointer"
                    >
                      <p className="text-[#0B56E4] text-[16px] font-medium tracking-[0.005em] text-left">Add New</p>
                    </div>

                    {opnAdNew && (
                      <div ref={addnewpopref} className="w-[199px] h-[104px] p-2 rounded-md bg-white absolute border border-[#E3E3E3] shadow-[0_4px_12px_0_rgba(26,26,26,0.2)] flex flex-col right-[1px] gap-5 -translate-y-2.5">
                        <p onClick={() => {
                          setOpenCreateTask(true)
                          setOpenAdNew(false)
                        }} className="text-[#495D71] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left cursor-pointer">Follow Up</p>
                        <hr />
                        <p onClick={() => {
                          setOpenCreateMeet(true)
                          setOpenAdNew(false)
                        }} className="text-[#495D71] text-[14px] font-medium leading-[20px] tracking-[0.0025em] text-left cursor-pointer">Meeting</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <h2 className="text-[14px] font-medium leading-8">My Next Follow Up : </h2>

                  {allFollowUp?.map((fol, index) => (
                    <div key={index} className="singFol">
                      <p className="notedate">
                        {new Date(fol?.Date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p>{fol?.time}</p>

                      <p>{fol?.Time && convertTo12HourFormat(fol.Time)}</p>

                      <p>{fol?.FollowUpType}</p>

                      <p>{fol?.Remark}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* quotation */}
              <div className="flex flex-col gap-6 mt-5 bg-white px-[30px] py-5  rounded-lg shadow p-2">
                <div className="flex flex-col w-full gap-6  !flex-row !justify-between !items-center overflow-x-scroll xl:overflow-x-hidden">
                  <h2 className="text-[16px] font-bold leading-6 tracking-[0.0015em] text-left text-[#101820]">Quotation</h2>

                  <button
                    onClick={() =>
                      navigate("/adminDash/HRM/QuotationForm", {
                        state: { id },
                      })
                    }
                    className="w-[165px] h-10 rounded-[10px] bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)] border border-[#0B56E4] text-[#0B56E4] text-[16px] font-medium leading-6 tracking-[0.005em] text-center min-w-fit"
                  >
                    <span className="font-medium !text-[16px] !text-[#0B56E4]">Create Quotation</span>
                  </button>
                </div>

                <hr />

                {allQuota?.length > 0 ? (
                  <div className="flex flex-col gap-5 overflow-x-scroll xl:overflow-x-hidden">
                    {allQuota?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-5 border-l-2 border-green-500 pl-4" key={index}>
                          <p className="text-[#666D76] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-right">
                            customer ID: {item?.customerId}
                          </p>
                          <p className="text-[#101820] text-[16px] font-bold leading-6 tracking-[0.0015em] text-right">{item?.customerName}</p>
                          <p className="text-[#666D76] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-right">
                            {new Date(item?.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                        </div>

                        <div className="flex items-center relative">
                          <img onClick={() => setShowIndex(showIndex === index ? null : index)} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747310515/thredonts_a1qk6s.png" alt="action-btn" className="cursor-pointer" />
                          {
                            showIndex === index && (
                              <div ref={showactionref} className="absolute w-[110px] right-5 -top-14  bg-white border border-gray-300">
                                <div onClick={() => {
                                  navigate("/adminDash/HRM/QuotationForm", {
                                    state: { item },
                                  });
                                }} className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                  <img
                                    className="cursor-pointer"
                                    src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747310255/veci_acxe9c.svg"
                                    alt="veci"
                                  />
                                  <span className="text-[14px]">Edit</span>
                                </div>
                                <hr />
                                <div onClick={() => {
                                  deleteQuotationApi(item?._id);
                                }}
                                  className="items-center w-full px-4 py-2 text-sm flex gap-2 text-red-600 hover:bg-red-100 cursor-pointer">
                                  <img
                                    className=" cursor-pointer"
                                    src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747310323/deli_bn0fs6.svg"
                                    alt="deli"
                                  />
                                  <span className="text-[14px]">Delete</span>
                                </div>
                              </div>
                            )
                          }

                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">No records found</span>
                )}
              </div>

              {/* Quotation cards is here  */}

               <div className="flex flex-col gap-6 mt-5 bg-white px-[30px] py-5  rounded-lg shadow p-2">
                <div className="flex flex-row justify-between items-center w-full gap-6">
                  <h2 className="text-[#101820] text-base font-bold leading-6 tracking-tight text-left">Recent Templates</h2>
                </div>

                <hr />
                <div className="flex flex-wrap  gap-[20px]">
                  {saveTemplate?.length > 0 ? (
                    saveTemplate.map((item, index) => (
                      <div

                        key={index} className="w-[300px] rounded-lg max-h-[400px] h-full shadow-md overflow-hidden bg-white p-5 relative ">
                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1735558409/WhatsApp_Image_2024-12-30_at_17.02.43_160b7501_fg2z1u.jpg" alt={`Card ${item?.customerName}`} />


                        <div className="flex items-center justify-between">


                          <div className="pt-4">

                            <h3 className="text-[18px] font-bold m-0">Name: {item?.customerName}</h3>
                            <p className="text-sm text-[#888] mt-1">
                              Quotation Date: {new Date(item?.createdAt).toLocaleDateString("en-GB")}
                            </p>
                          </div>

                          <BsThreeDotsVertical onClick={() => {
                            setOpenDrops(index);
                          }} className="threedot_lead" />

                          {
                            openDrops === index &&
                            <div className="absolute right-5 -mt-8 mr-2 w-28 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-20" ref={proNavRef} >
                              <p className="flex items-center px-[5px] py-[10px] gap-2 cursor-pointer border-b border-[#ccc]  text-gray-700 hover:bg-gray-100" onClick={() => {
                                navigate("/adminDash/HRM/QuotationForm", {
                                  state: { item },
                                });
                              }}><MdEdit className="text-[20px]" />     <span className="">Edit</span>  </p>
                              <p
                              className="flex items-center px-[5px] py-[10px] gap-2 cursor-pointer border-b border-[#ccc] text-red-600 hover:bg-red-100"
                                onClick={() => {
                                  deleteQuotationApi(item?._id);
                                }}
                              >  <MdDelete className="text-[20px]" /> <span className="">Delete</span>  </p>
                            </div>
                          }

                        </div>


                      </div>
                    ))
                  ) : (
                    <span className="norecord">No records found</span>
                  )}
                </div>
              </div>



              {/* fourth third  */}
              <div className="flex flex-col gap-6 mt-5 bg-white px-[30px] py-5 rounded-lg shadow p-2">
                <div className="flex flex-col w-full gap-6 flex !flex-row !justify-between !items-center">
                  <h2 className="text-[16px] font-bold leading-6 tracking-[0.0015em] text-left text-[#101820]">Proposal</h2>

                  <button
                    onClick={() =>
                      navigate("/adminDash/HRM/ProposalForm", {
                        state: { id },
                      })
                    }
                    className="w-[165px] h-10 rounded-[10px] bg-[linear-gradient(131.78deg,_#D1E8FD_6.87%,_#EDEFFF_91.67%)] border border-[#0B56E4] text-[#0B56E4] text-[16px] font-medium leading-6 tracking-[0.005em] text-center min-w-fit"
                  >
                    <span className="font-medium !text-[16px] !text-[#0B56E4]">Create Proposal</span>
                  </button>
                </div>

                <hr />

                {allPropo?.length > 0 ? (
                  <div className="flex flex-col gap-5">
                    {allPropo?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-10 border-l-2 border-green-500 pl-4" key={index}>
                          <p className="text-[#666D76] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-right">
                            Proposal For: {item?.proposalFor}
                          </p>
                          <p className="text-[#666D76] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-right">Created By: {item?.createdBy}</p>
                          <p className="date">
                            {new Date(item?.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                        </div>
                        {/* showPropsalIndex, setShowPropsalIndex */}

                        <div className="flex items-center relative">

                          <img onClick={() => setShowPropsalIndex(showIndex === index ? null : index)} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747310515/thredonts_a1qk6s.png" alt="action-btn" className="cursor-pointer" />

                          {
                            showPropsalIndex === index && (
                              <div ref={showpurposalactionref} className="absolute w-[110px] right-5 -top-14 p-2 bg-white border border-gray-300 rounded-md">
                                <div onClick={() => {
                                  navigate("/adminDash/HRM/ProposalForm", {
                                    state: { item },
                                  });
                                }} className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                  <img
                                    className="cursor-pointer"
                                    src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747310255/veci_acxe9c.svg"
                                    alt="veci"
                                  />
                                  <span className="text-[14px]">Edit</span>
                                </div>
                                <hr />
                                <div onClick={() => {
                                  deletePropsalApi(item?._id);
                                }}
                                  className="items-center w-full px-4 py-2 text-sm flex gap-2 text-red-600 hover:bg-red-100">
                                  <img
                                    className=" cursor-pointer"
                                    src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747310323/deli_bn0fs6.svg"
                                    alt="deli"
                                  />
                                  <span className="text-[14px]">Delete</span>
                                </div>
                              </div>
                            )
                          }
                         
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">No records found</span>
                )}
              </div>

             
            </div>
          </div>
        </div>
      </div>

      {openCreateTask && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#4040404D] z-[3001] backdrop-blur-[1px]">
          <div ref={followpopref} className="w-[599px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-[18px] bg-white flex flex-col gap-3">
            <nav className="flex items-center justify-between">
              <p className="text-[#1B2533] text-[16px] font-semibold leading-6 tracking-[0.0015em] text-left">Create Follow Up</p>
              
            </nav>

            <form className="flex flex-col gap-4 mt-[14px]">
              <label className="block text-md font-normal mb-1">
                <p className="text-[#1B2533] text-[16px] font-semibold leading-6 tracking-[0.0015em] text-left">LeadName</p>
                <input
                 className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  name="LeadName"
                  value={taskData?.LeadName}
                  onChange={taskHandler}
                  type="text"
                  placeholder="Subject"
                />
              </label>

              <label className="block text-md font-normal mb-1">
                <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Follow-Up type</p>

                <select
                 className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  name="FollowUpType"
                  value={taskData?.FollowUpType}
                  onChange={taskHandler}
                  id=""
                >
                  <option value="select one">Select One</option>

                  {allFollow2?.map((f, index) => (
                    <option key={index} value={f?.name}>
                      {f?.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="twoTask">
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[16px] font-semibold leading-6 tracking-[0.0015em] text-left">Date</p>
                  <input
                   className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    name="Date"
                    value={taskData?.Date}
                    onChange={taskHandler}
                    type="date"
                  />
                </label>

                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[16px] font-semibold leading-6 tracking-[0.0015em] text-left">Time</p>
                  <input
                   className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    name="Time"
                    value={taskData?.Time}
                    onChange={taskHandler}
                    type="time"
                  />
                </label>
              </div>

              <label className="block text-md font-normal mb-1">
                <p className="text-[#1B2533] text-[16px] font-semibold leading-6 tracking-[0.0015em] text-left">Remark</p>
                <input
                 className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  name="Remark"
                  value={taskData?.Remark}
                  onChange={taskHandler}
                  type="text"
                />
              </label>

              <div className="flex items-center gap-5">
                <button
                  onClick={data1 ? taskUpdateHandler : TaskSubmitHandler}
                  className="creattk px-4 py-1.5 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {data1 ? "Update " : "Submit"}
                </button>
                <button
                  onClick={() => setOpenCreateTask(false)}
                  className="tkCnacel px-4 py-1.5 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Cancel
                </button>
              </div>
            </form>

            <hr />
          </div>
        </div>
      )}

      {openCreateMeet && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#4040404D] z-[3001] backdrop-blur-[1px]">
          <div ref={meetingpopref} className="w-[599px] h-[520px] overflow-y-scroll overflow-x-hidden p-[12px_20px] rounded-[18px] bg-white flex flex-col gap-3 scrollbar-none">
            <nav>
              <p>Create Meeting</p>
             
            </nav>

            <form className="flex flex-col gap-4 mt-[14px]">
              <label className="block text-md font-normal mb-1">
                <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Title <span className="text-red-500">*</span></p>
                <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  value={meetData.title}
                  onChange={meetHandler}
                  name="title"
                  type="text"
                  placeholder="Title"
                />
              </label>

              <label className="block text-md font-normal mb-1">
                <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Status <span className="text-red-500">*</span></p>
                <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  type="text"
                  value={meetData.Status}
                  onChange={meetHandler}
                  name="Status"
                  placeholder="Online"
                />
              </label>

              <div className="twoTask">
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Meeting Date From <span className="text-red-500">*</span></p>
                  <input
                  className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    value={meetData.meetDateFrom}
                    onChange={meetHandler}
                    name="meetDateFrom"
                    type="date"
                  />
                </label>

                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Meeting Date To <span className="text-red-500">*</span></p>
                  <input
                  className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    value={meetData.meetDateTo}
                    onChange={meetHandler}
                    name="meetDateTo"
                    type="date"
                  />
                </label>
              </div>

              <div className="twoTask">
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Meeting Time From <span className="text-red-500">*</span></p>
                  <input
                  className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    value={meetData.meetTimeFrom}
                    onChange={meetHandler}
                    name="meetTimeFrom"
                    type="time"
                  />
                </label>

                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Meeting Time To <span className="text-red-500">*</span></p>
                  <input
                  className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    value={meetData.meetTimeTo}
                    onChange={meetHandler}
                    name="meetTimeTo"
                    type="time"
                  />
                </label>
              </div>

              <div className="twoTask">
                <label className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Host <span className="text-red-500">*</span></p>
                  <select
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    value={meetData.Host}
                    onChange={meetHandler}
                    name="Host"
                    id=""
                  >
                    <option value="Host">Chose Host</option>
                    {userDeg?.map((val, index) => {
                      return (
                        <option key={index} value={val?._id}>
                          {val?.fullName}
                        </option>
                      );
                    })}
                    {/* <option value="Host1">Host1</option>
                    <option value="Host2">Host2</option> */}
                  </select>
                </label>

                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Related To <span className="text-red-500">*</span></p>
                  <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    value={meetData.RelatedTo}
                    onChange={meetHandler}
                    name="RelatedTo"
                    type="text"
                  />
                </label>
              </div>

              <div className="twoTask">
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Participants Email Address With , Separated <span className="text-red-500">*</span></p>
                  <input
                     className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    value={meetData.Participant}
                    onChange={meetHandler}
                    name="Participant"
                    type="text"
                  />
                </label>
              </div>

              <label className="block text-md font-normal mb-1">
                <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Meeting Link <span className="text-red-500">*</span></p>
                <input
                   className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  value={meetData.MeetingLink}
                  onChange={meetHandler}
                  name="MeetingLink"
                  type="text"
                />
              </label>

              <label className="block text-md font-normal mb-1">
                <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Note <span className="text-red-500">*</span></p>
                <input
                 className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                  value={meetData.Note}
                  onChange={meetHandler}
                  name="Note"
                  type="text"
                />
              </label>

              <div className="flex items-center gap-5">
                <button
                  onClick={data1 ? meetUpdateHandler : meetSubmitHandler}
                  className="creatmt px-4 py-1.5 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {data1 ? "Update meeting" : "Create Meeting"}
                </button>
                <button
                  onClick={() => setOpenCreateMeet(false)}
                  className="tkCnacel px-4 py-1.5 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Cancel
                </button>
              </div>
            </form>

            <hr />
          </div>
        </div>
      )}
    </div>
  );

}


export default ImportLead;
