import React from "react";
import { RefreshCw, User, Settings, Clock, Users, Gift } from "lucide-react";
import { MdCalendarToday, MdEventAvailable, MdOutlineEdit } from "react-icons/md";
import TimeLog from "../../components/DashBoard/TimeLog";
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useMain } from "../../hooks/UseMain";
import Calendar from "react-calendar";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { format, isValid, parse } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { useClickOutside } from "../../hooks/useClickOutside";
import { DescriptionModal } from "../../components/DescriptionModal";
// import { useWindowSize } from 'react-use';

var tc3;
var tc4;

const Dashboard = () => {
  const { user } = useAuth();
  const {
    getUsers,
    fetchUserOwnDetailApi,
    getActiveUsersCount,
    postActivity,
    getTotalLeavesCount,
    fetchAnnoucement,
    getHoliday,
    getHolidays,
    postAttendence,
    fetchTodayLeave,
    postLeave,
    postNotification,
    postNotification2,
    getLeaveTypes,
    getTodayBirthday,
    changeStatusBreak,
    allEmployee,
    LeaveAllowApihandler,
    leaveTypeApi,
    postHalfDay,
    CreateExpense,
    getAllProjectApi, getMonthlyWorkingHours,
    getUpcomingBirthdays,
    FetchMyLeave,
  } = useMain();

  const [counts, setCounts] = useState({
    activeEmployees: 0,
    leaveRequest: 0,
    employeesLeaves: 0,
    totalEmployees: 0,
    totalDeactivated: 0,
    halfDayRequest: 0,
  });

  const stats = [
    {
      title: "Active Employee",
      value: counts.activeEmployees,
      icon: <User className="text-white" size={20} />,
      bg: "bg-green-700",
      card: "bg-green-50 border-green-300",
      link: "/adminDash/HRM/activeEmployee"
    },
    {
      title: "Half Day Request",
      value: counts.halfDayRequest,
      icon: <User className="text-white" size={20} />,
      bg: "bg-blue-700",
      card: "bg-blue-100 border-blue-300",
      link: "/adminDash/HRM/halfDayRequest"
    },
    {
      title: "Leave Request",
      value: counts.leaveRequest,
      icon: <Settings className="text-white" size={20} />,
      bg: "bg-red-600",
      card: "bg-red-50 border-red-200",
      link: "/adminDash/HRM/leaveRequest"
    },
    {
      title: "Employee on Leave",
      value: counts.employeesLeaves,
      icon: <Clock className="text-white" size={20} />,
      bg: "bg-yellow-500",
      card: "bg-yellow-50 border-yellow-200",
      link: "/adminDash/HRM/LeaveEmployee"
    },
    {
      title: "Total Employee",
      value: counts.totalEmployees,
      icon: <Users className="text-white" size={20} />,
      bg: "bg-blue-600",
      card: "bg-blue-50 border-blue-200",
      link: "/adminDash/HRM/totalEmployee"
    },
    {
      title: "Deactivated Employee",
      value: counts.totalDeactivated,
      icon: <Users className="text-white" size={20} />,
      bg: "bg-red-600",
      card: "bg-red-50 border-red-200",
      link: "/adminDash/HRM/deactivate"
    },
  ];

  let hrms_permission = JSON?.parse(localStorage.getItem("hrms_permission"));

  const {
    activeEmployeePermission,
    halfDayPermission,
    leaveRequestPermission,
    employeeOnLeavePermission,
    totalEmployeePermission,
    holidaylistPermission,
    userAllowCrtPermission
  } = hrms_permission;

  const [announce, setAnnounce] = useState([]);
  const [holiday, setHoliday] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [value, onChange] = useState(new Date());
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  var [clock, setClock] = useState(0);
  var [breakClock, setBreakClock] = useState(0);
  const [totalHours, setTotalaHours] = useState();
  const [mount, setMount] = useState(false);
  const [todayTask, setTodayTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [clockoutLoading, setClockOutLoading] = useState(false);
  const [showPrevCheckout, setShowPrevCheckout] = useState(false);
  const [prevCheckoutTime, setPrevCheckoutTime] = useState("");
  const [prevdayTask, setPrevdayTask] = useState("");
  const [formType, setFormType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [announceIndex, setAnnounceIndex] = useState(null);
  const [taskAssignIndex, setTaskAssignIndex] = useState(null);
  const [showAnnounceAction, setShowAnnounceAction] = useState(false);
  const navigate = useNavigate();
  const [textData, setTextData] = useState({
    title: "",
    Branch: "",
    Department: "",
    Employee: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  const [formdata, setFormdata] = useState({
    employeeName: "",
    leaveType: "",
    start: "",
    end: "",
    reason: "",
  });

  const [formdata2, setFormdata2] = useState({
    employeeName: "",
    start: "",
    reason: "",
  });

  const handleDateChange = (date, field, isHalfDay = false) => {
    console.log(date)
    if (!date) return;
    const formattedDate = format(date, 'dd/MM/yyyy');

    if (isHalfDay) {
      setFormdata2((prev) => ({
        ...prev,
        [field]: formattedDate,
      }));
    } else {
      setFormdata((prev) => ({
        ...prev,
        [field]: formattedDate,
      }));
    }
  };


  const handleChange = (e, isHalfDay = false) => {
    const { name, value } = e.target;
    if (isHalfDay) {
      setFormdata2((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");

    if (formType === "full") {
      const { leaveType, start, end, reason, employeeName } = formdata;

      if (!leaveType || !start || !end || !reason.trim()) {
        toast.dismiss(toastId);
        return toast.error("Please fill all required fields");
      }

      const startDate = parse(start, "dd/MM/yyyy", new Date());
      const endDate = parse(end, "dd/MM/yyyy", new Date());

      if (!isValid(startDate) || !isValid(endDate)) {
        console.error("Invalid dates:", start, end);
        return;
      }

      const timeDifference = endDate.getTime() - startDate.getTime();
      const daysGap = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;

      const ans = await postLeave({
        type: leaveType,
        from: start,
        to: end,
        days: daysGap,
        reason,
      });

      await postNotification(daysGap, employeeName, user?.fullName);

      if (ans.success) {
        toast.success("Successfully applied");
        setShowModal(false);
      }

      setFormdata({
        employeeName: "",
        leaveType: "",
        start: "",
        end: "",
        reason: "",
      });
    } else {
      const { start, reason, employeeName } = formdata2;

      if (!start || !reason.trim()) {
        toast.dismiss(toastId);
        return toast.error("Please fill all required fields");
      }

      const ans = await postHalfDay({
        from: start,
        reason,
      });

      await postNotification2(start, employeeName, user?.fullName);

      if (ans.success) {
        toast.success("Successfully applied");
        setShowModal(false);
      }

      setFormdata2({
        employeeName: "",
        start: "",
        reason: "",
      });
    }

    toast.dismiss(toastId);
  };

  const getallUpcomingBirthdays = async () => {
    const data = await getUpcomingBirthdays();

    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const upcomingBirthdays = data.filter((user) => {
      const dob = new Date(user.dob);
      const birthMonth = dob.getMonth();
      const birthDate = dob.getDate();

      return (
        birthMonth > todayMonth ||
        (birthMonth === todayMonth && birthDate >= todayDate)
      );
    });

    setUpcomingBirthdays(upcomingBirthdays.sort((a, b) => {
      const dobADay = new Date(a.dob).getDate();
      const dobBDay = new Date(b.dob).getDate();
      const dobAMonth = new Date(a.dob).getMonth();
      const dobBMonth = new Date(b.dob).getMonth();
      return dobAMonth - dobBMonth || dobADay - dobBDay;

    }));
  };

  const today = new Date();
  // const { width, height } = useWindowSize();

  const hasBirthdayToday = upcomingBirthdays.some((data) => {
    const dob = new Date(data.dob);
    return (
      dob.getDate() === today.getDate() &&
      dob.getMonth() === today.getMonth()
    );
  });

  const sortedBirthdays = [...upcomingBirthdays].sort((a, b) => {
    const aDob = new Date(a.dob);
    const bDob = new Date(b.dob);

    const aIsBirthday =
      aDob.getDate() === today.getDate() && aDob.getMonth() === today.getMonth();
    const bIsBirthday =
      bDob.getDate() === today.getDate() && bDob.getMonth() === today.getMonth();

    if (aIsBirthday && !bIsBirthday) return -1;
    if (!aIsBirthday && bIsBirthday) return 1;
    return 0;
  });

  const getAnnoucement = async () => {
    const ans = await fetchAnnoucement();
    const reversedArray = ans?.data?.reverse();
    setAnnounce(reversedArray);
  };

  const getAllHolidays = async () => {
    try {
      const ans = user?.role === "ADMIN" ? await getHoliday() : await getHolidays();
      const today = new Date();
      const todayDateStr = today.toISOString().split("T")[0];

      const todayHolidays = [];
      const upcomingHolidays = [];

      ans?.data?.forEach(holiday => {
        const holidayDateStr = new Date(holiday.startDate).toISOString().split("T")[0];

        if (holidayDateStr === todayDateStr) {
          todayHolidays.push({ ...holiday, status: "Today" });
        } else if (holidayDateStr > todayDateStr) {
          upcomingHolidays.push({ ...holiday, status: "Upcoming" });
        }
      });

      setHoliday([...todayHolidays, ...upcomingHolidays]);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const tasksData = await getAllProjectApi();

      if (tasksData && tasksData.projects) {
        const reversedTasks = tasksData.projects.reverse().slice(0, 6);
        setTasks(reversedTasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleVisibilityChange = () => {
    if (!document.hidden) {
      initializeTimer();
    }
  };

  const initializeTimer = () => {
    let t = localStorage.getItem("clock-in");
    let t1 = localStorage.getItem("clock-status");
    let t2 = localStorage.getItem("break-seconds");
    clearInterval(tc3);
    clearInterval(tc4);

    if (t1) {
      if (t2) {
        setBreakClock(t2);
      }

      if (t1 !== "out") {
        let t5 = Math.floor((new Date().getTime() - t) / 1000);
        setClock(t5);

        tc4 = setInterval(() => {
          setClock(++t5);
        }, 1000);

        if (t1 === "resume") {
          tc3 = setInterval(() => {
            setBreakClock(++t2);
          }, 1000);
        }
      } else {
        let t7 = localStorage.getItem("clock-out-time");
        let t5 = Math.floor((t7 - t) / 1000);
        setClock(t5);
      }
    }
  };

  const breakchangeapi = async (isBreakIn) => {
    let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

    const resp = await changeStatusBreak({ isBreakIn, userId: hrms_user?._id });
  };

  const clockIn = async () => {
    setLoading(true);

    let t = localStorage.getItem("clock-status");

    localStorage.setItem("date1", new Date().toLocaleDateString("en-GB"));

    if (!t) {
      localStorage.setItem(
        "clockInTime",
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );

      let ans = await postActivity({
        clockIn: localStorage.getItem("clock-in")
          ? localStorage.getItem("clock-in")
          : new Date().getTime(),
        clockOut: 0,
        late: 0,
        date1: localStorage.getItem("date1"),
        overtime: 0,
        total: 0,
        message: "",
        clockInTime: localStorage.getItem("clockInTime")
      });

      if (ans?.success) {
        localStorage.setItem("clock-in", new Date().getTime());
        localStorage.setItem("clock-status", "break");

        let currentDate = new Date().toLocaleDateString("en-GB");
        localStorage.setItem("clock-in-date", currentDate);

        tc4 = setInterval(() => {
          setClock(++clock);
        }, 1000)
      }
      else {
        alert(ans.message)
      }
    } else {
      if (t === "break") {
        localStorage.setItem(
          "breakInTime",
          new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        );

        await breakchangeapi(true);

        localStorage.setItem("break-time", new Date().getTime());
        localStorage.setItem("clock-status", "resume");

        let t3 = localStorage.getItem("break-seconds");

        tc3 = setInterval(() => {
          setBreakClock(++t3);
        }, 1000);
      } else if (t === "resume") {
        localStorage.setItem(
          "breakOutTime",
          new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        );

        await breakchangeapi(false);

        let t1 = localStorage.getItem("break-time");
        if (t1) {
          let t2 = localStorage.getItem("break-seconds");
          if (t2) {
            localStorage.setItem(
              "break-seconds",
              Math.floor((new Date() - t1) / 1000) + Number(t2)
            );
          } else {
            localStorage.setItem(
              "break-seconds",
              Math.floor((new Date() - t1) / 1000)
            );
          }
        }
        localStorage.setItem("clock-status", "break");
        clearInterval(tc3);
      } else if (t === "out") {
        let ans = await postActivity({
          clockIn: localStorage.getItem("clock-in"),
          clockOut: 0,
          late: 0,
          date1: new Date().toLocaleDateString("en-GB"),
          overtime: 0,
          total: 0,
          message: "",
        });

        localStorage.setItem("clock-status", "break");
        localStorage.removeItem("clock-out-time");
        localStorage.removeItem("break-seconds");
        localStorage.removeItem("break-time");

        let t8 = 0;
        tc4 = setInterval(() => {
          setClock(++t8);
        }, 1000);
      }
    }
    setMount(!mount);
    setLoading(false);
  };

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes, seconds] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return new Date(
      `${new Date().toDateString()} ${hours}:${minutes}:${seconds}`
    );
  };

  const clockOut = async () => {
    if (todayTask === "") {
      return alert("Please Enter Your Task");
    }
    setClockOutLoading(true);

    localStorage.setItem("clock-status", "out");
    localStorage.setItem("clock-out-time", new Date().getTime());
    localStorage.setItem(
      "clockOutTime",
      new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    );

    clearInterval(tc3);
    clearInterval(tc4);
    setMount(!mount);
    setClock(0);

    const breakIn = localStorage.getItem("breakInTime");
    const breakOut = localStorage.getItem("breakOutTime");

    await breakchangeapi(false);

    let date1, date2;
    if (breakIn !== null) {
      date1 = parseTime(breakIn);
    }
    if (breakOut !== null) {
      date2 = parseTime(breakOut);
    }

    let differenceMs, hours, minutes, seconds, differenceText;

    if (breakIn !== null && breakOut !== null) {
      differenceMs = date2.getTime() - date1.getTime();

      hours = Math.floor(differenceMs / (1000 * 60 * 60));
      minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((differenceMs % (1000 * 60)) / 1000);

      differenceText = `${hours}:${minutes}:${seconds}`;
    }

    let ans = await postActivity({
      clockIn: localStorage.getItem("clock-in"),
      clockOut: localStorage.getItem("clock-out-time"),
      late: breakClock,
      date1: localStorage.getItem("date1"),
      overtime: clock - 32400 > 0 ? clock - 32400 : 0,
      total: clock,
      message: "",
      todayTask: todayTask,
    });

    const userDataString = localStorage.getItem("hrms_user");

    const userData = JSON.parse(userDataString);

    const clockInDate = localStorage.getItem("clock-in-date");

    const attendence = await postAttendence({
      clockInDetail: localStorage.getItem("clockInTime"),
      breakTime: differenceText,
      clockOutDetail: localStorage.getItem("clockOutTime"),
      id: userData?._id,
      clockInDate: clockInDate,
      todayTask: todayTask,
    });
    toast.success('Checked Out Successfully !!')
    setTodayTask("");

    localStorage.removeItem("clock-in");
    localStorage.removeItem("clock-status");
    localStorage.removeItem("clock-out-time");
    localStorage.removeItem("clockOutTime");
    localStorage.removeItem("clockInTime");
    localStorage.removeItem("breakInTime");
    localStorage.removeItem("breakOutTime");
    localStorage.removeItem("clock-in-date");
    localStorage.removeItem("break-time");
    localStorage.removeItem("break-seconds");
    localStorage.removeItem("date1");

    setClockOutLoading(false);
  };

  const getTotalHours = async () => {
    const date = new Date().toLocaleDateString('en-GB');
    const [day, month, year] = date.split('/');
    const user = user?._id
    const data = await getMonthlyWorkingHours(month, year, user)
    setTotalaHours(data?.totalHours)
  }

  const [userFullDayLeaves, setUserFullDayLeaves] = useState(0);
  const [userHalfDayLeaves, setUserHalfDayLeaves] = useState(0);
  const [userPendingLeaves, setUserPendingLeaves] = useState(0);
  const [userLeaveTaken, setUserLeaveTaken] = useState(0);
  const [userCasualLeaves, setUserCasualLeaves] = useState(0);
  const [userPaidLeaves, setUserPaidLeaves] = useState(0);
  const fetchUserLeaves = async () => {
    const res = await FetchMyLeave();

    const filteredfulldayleaves = res?.data?.fullDayLeaves?.filter((item) => item?.status === "Accepted");
    const filteredfulldaycasualleaves = res?.data?.fullDayLeaves?.filter((item) => item?.leaveType === "casual");
    const filteredfulldaypaidleaves = res?.data?.fullDayLeaves?.filter((item) => item?.leaveType === "");
    const filteredfulldaypendingleaves = res?.data?.fullDayLeaves?.filter((item) => item?.status === "");
    const filteredhalfdayleaves = res?.data?.halfDayLeaves?.filter((item) => item?.status === "Accepted");
    const filteredhalfdaypendingleaves = res?.data?.halfDayLeaves?.filter((item) => item?.status === "");
    const fullleaves = filteredfulldayleaves?.map((item) => item?.days)?.reduce((acc, pre) => Number(acc) + Number(pre), 0);
    setUserFullDayLeaves(fullleaves);
    setUserHalfDayLeaves(filteredhalfdayleaves.length);
    setUserPendingLeaves(filteredfulldaypendingleaves.length + filteredhalfdaypendingleaves.length);
    setUserLeaveTaken(userFullDayLeaves + (userHalfDayLeaves * 0.5));
    setUserCasualLeaves(filteredfulldaycasualleaves.length);
    setUserPaidLeaves(filteredfulldaypaidleaves.length)
  }

  const remainingLeave = Math.max(
    parseInt(user?.userAllowance) - userFullDayLeaves - (userHalfDayLeaves * 0.5),
    0
  );

  const leaveWrap = useClickOutside(() => {
    setShowModal(false);
  });

  const onEmployeeLogin = () => {
    const clockInTime = localStorage.getItem("clock-in");
    if (clockInTime !== null) {
      const currentTimestamp = Date.now();
      const diff = currentTimestamp - clockInTime;

      if (diff < 0) {
        return "Check-in time future mein hai, invalid data";
      }

      const totalMinutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(totalMinutes / 60);

      if (hours >= 16) {
        setShowPrevCheckout(true);
      }
    }
  };

  const storePrevCheckInCheckout = async () => {
    if (prevdayTask.trim() === "") {
      return toast.error("Please Enter your Previous Day Task.")
    }
    if (prevCheckoutTime === "") {
      return toast.error("Please Choose your Previous Date checkout time.")
    }

    setClockOutLoading(true);

    localStorage.setItem("clock-status", "out");
    localStorage.setItem("clock-out-time", prevCheckoutTime);
    localStorage.setItem(
      "clockOutTime",
      prevCheckoutTime
    );

    clearInterval(tc3);
    clearInterval(tc4);
    setMount(!mount);

    const breakIn = localStorage.getItem("breakInTime");
    const breakOut = localStorage.getItem("breakOutTime");

    await breakchangeapi(false);

    let date1, date2;
    if (breakIn !== null) {
      date1 = parseTime(breakIn);
    }
    if (breakOut !== null) {
      date2 = parseTime(breakOut);
    }

    let differenceMs, hours, minutes, seconds, differenceText;

    if (breakIn !== null && breakOut !== null) {
      differenceMs = date2.getTime() - date1.getTime();

      hours = Math.floor(differenceMs / (1000 * 60 * 60));
      minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((differenceMs % (1000 * 60)) / 1000);

      differenceText = `${hours}:${minutes}:${seconds}`;
    }

    let ans = await postActivity({
      clockIn: localStorage.getItem("clockInTime"),
      clockOut: prevCheckoutTime,
      late: breakClock,
      date1: localStorage.getItem("date1"),
      overtime: clock - 32400 > 0 ? clock - 32400 : 0,
      total: clock,
      message: "",
      todayTask: prevdayTask,
    });
    const userDataString = localStorage.getItem("hrms_user");
    const userData = JSON.parse(userDataString);
    const attendence = await postAttendence({
      clockInDetail: localStorage.getItem("clockInTime"),
      breakTime: differenceText,
      clockOutDetail: prevCheckoutTime,
      id: userData?._id,
      clockInDate: localStorage.getItem("date1"),
      todayTask: prevdayTask,
    });
    console.log("prev day response", ans);
    console.log("attendence", attendence);
    toast.success('Saved Successfully !!')
    setPrevdayTask("");
    setPrevCheckoutTime("");
    setShowPrevCheckout(false);

    localStorage.removeItem("clock-in");
    localStorage.removeItem("clock-status");
    localStorage.removeItem("clock-out-time");
    localStorage.removeItem("clockOutTime");
    localStorage.removeItem("clockInTime");
    localStorage.removeItem("breakInTime");
    localStorage.removeItem("breakOutTime");
    localStorage.removeItem("clock-in-date");
    localStorage.removeItem("break-time");
    localStorage.removeItem("break-seconds");
    localStorage.removeItem("date1");
    setClock(0);
    setClockOutLoading(false);

    if (onRemount) {
      onRemount();
    }
  }

  const getData = async () => {
    const ans = await getUsers();
    const totalactiveEmployees = ans?.data?.filter(
      (emp) => emp?.isDeactivated === "No"
    );
    const totalDeactivated = ans?.data?.filter(
      (emp) => emp?.isDeactivated !== "No"
    );

    const ans1 = await getActiveUsersCount();
    const ans2 = await getTotalLeavesCount();
    const ans3 = await fetchTodayLeave();
    setCounts({
      ...counts,
      totalEmployees: totalactiveEmployees?.length,
      totalDeactivated: totalDeactivated?.length,
      activeEmployees: ans1?.data,
      leaveRequest: ans2?.totalLeave,
      halfDayRequest: ans2?.halfDay,
      employeesLeaves: ans3?.data?.length
    });
  };

  const announceActionPopRef = useClickOutside(() => {
    setShowAnnounceAction(false);
    setAnnounceIndex(null)
  })
  const taskAssignActionPopRef = useClickOutside(() => {
    setTaskAssignIndex(null);
  })


  useEffect(() => {
    initializeTimer();
    getallUpcomingBirthdays();
    getAnnoucement();
    getAllHolidays();
    fetchTasks();
    getTotalHours();
    getData();
    fetchUserLeaves();
    onEmployeeLogin();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Hi {user?.fullName}</h1>
          <p className="text-gray-500 text-sm">
            Real-time insights and performance overview
          </p>
        </div>

      </div>

      {
        user?.role === "ADMIN" && (
          <div className="flex items-center mt-5 overflow-x-scroll sm:grid grid-cols-2 sm:overflow-hidden md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const card = (
                <div
                  className={`border rounded-lg p-4 ${stat.card} min-w-[160px] flex flex-col justify-between h-28 shadow-sm hover:shadow-md transition`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-md ${stat.bg}`}>
                      {stat.icon}
                    </div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      {stat.title}
                    </h2>
                  </div>
                  <div className="text-right text-2xl font-bold text-gray-800">
                    {stat.value}

                  </div>
                </div>
              );

              return stat.link ? (
                <Link to={stat.link} key={index}>
                  {card}
                </Link>
              ) : (
                <div key={index}>{card}</div>
              );
            })}
          </div>
        )
      }


      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-8">
        <div className={`bg-grey rounded-xl border-2 ${user?.role === "ADMIN" ? "order-3 md:order-1" : "order-last col-span-2"}`}>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Announcement Lists</h3>
            </div>

            <div className="mt-2 sm:mt-0 sm:self-end self-end">
              <NavLink to={user?.role === "ADMIN" ? "/adminDash/announcement" : "/employeeDash/announcement"}>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  View All
                </button>
              </NavLink>
            </div>
          </div>

          <hr />

          <div className="w-full overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-left bg-white rounded-lg">
              <thead className="bg-white font-semibold">
                <tr>
                  <th className="text-left font-bold text-gray-900 py-3 px-3 border-b border-gray-200 whitespace-nowrap">
                    TITLE
                  </th>
                  <th className="text-left font-bold text-gray-900 py-3 px-3 border-b border-gray-200 whitespace-nowrap">
                    START DATE
                  </th>
                  <th className="text-left font-bold text-gray-900 py-3 px-3 border-b border-gray-200 whitespace-nowrap">
                    END DATE
                  </th>
                  <th className="text-left font-bold text-gray-900 py-3 px-3 border-b border-gray-200 whitespace-nowrap">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {announce.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center text-gray-400 px-3 py-4"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  announce?.slice(0, 5).map((val, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-3 py-4 text-[#0B56E4]">
                        {val?.title}
                      </td>
                      <td className="px-3 py-4 text-gray-800">
                        {val?.startDate}
                      </td>
                      <td className="px-3 py-4 text-gray-800">
                        {val?.endDate}
                      </td>
                      <td className="px-3 py-4 flex items-center justify-center max-w-[75px] text-gray-800">
                        <div className="relative w-fit" >
                          <img onClick={() => setAnnounceIndex(announceIndex === index ? null : index)} className="cursor-pointer" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png" alt="action" />

                          {
                            announceIndex === index && (
                              <div
                                ref={announceActionPopRef}
                                className="absolute z-[1000] right-[15px] -top-[15px] w-[100px] cursor-pointer bg-white border border-gray-200 shadow-lg flex flex-col"
                              >
                                <div
                                  onClick={() => {
                                    setShowAnnounceAction(true);
                                    setAnnounceIndex(null)
                                    setTextData({
                                      title: val?.title,
                                      Branch: val?.Branch,
                                      Department: val?.Department,
                                      Employee: val?.Employee,
                                      startDate: val?.startDate,
                                      endDate: val?.endDate,
                                      description: val?.description,
                                    });
                                  }}
                                  className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 "
                                >
                                  <MdOutlineEdit fontSize={18} />
                                  <span className="!text-[14px] font-semibold">View</span>
                                </div>

                              </div>
                            )
                          }
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>



        </div>

        {showAnnounceAction && (
          <DescriptionModal
            title="Details"
            data={Object.fromEntries(
              Object.entries(textData).filter(([key]) => key !== "id")
            )}
            onClose={() => {
              setShowAnnounceAction(false);
              setTextData({});
            }}
          />
        )}

        {/* Upcoming BirthDays Only For Employee */}
        {
          user?.role === "EMPLOYEE" && (
            <div className="w-full overflow-hidden border-2 border-gray-200 bg-white rounded-[10px]">
              <nav className="flex items-center gap-2 bg-white py-3 px-4 font-semibold">
                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748293785/cel1_j85yut.png" alt="" />
                <span>Upcoming Birthday's</span>
              </nav>

              <div className="flex flex-col gap-2 p-3">
                {sortedBirthdays.slice(0, 4).map((data, index) => {
                  const dob = new Date(data.dob);
                  const isBirthday =
                    dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth();

                  return (
                    <div
                      className="p-3 flex items-center gap-3 rounded-md shadow-md"
                      key={index}
                      style={{
                        backgroundColor: isBirthday ? "rgb(196 238 227)" : "white",
                        border: isBirthday ? "2px solid rgb(96 222 189)" : "1px solid #ddd",
                      }}
                    >
                      <div className="relative">
                        <img src={data.profileImage ? data.profileImage : "https://res.cloudinary.com/dd9tagtiw/image/upload/v1748461184/25fddc28ee996b0edb37a8f08e577c61dadbc58d_l2quyh.png"} className="w-[60px] rounded-full" />
                        {isBirthday ? <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748461086/cap_xipxw6.png" alt="" className="absolute -top-5 -left-5" /> : null}
                      </div>
                      <div>
                        <h3 className="text-blue-600 font-semibold text-[16px]">{data?.fullName}</h3>
                        <p className="text-gray-600 font-medium text-[14px]">{data?.designation}</p>
                        <p className="text-gray-600 font-medium text-[14px]">DOB : {new Date(data?.dob).toLocaleDateString("en-in")}</p>

                      </div>
                    </div>
                  );
                })}


              </div>
            </div>
          )
        }


        <div className="bg-grey rounded-xl border-2 p-4 order-1 md:order-2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center mb-6 gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-md shadow-md">
                <MdEventAvailable className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">Mark Attendance</h2>
            </div>
          </div>
          {/* <TimerTable /> */}
          <div className="w-full bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <div>

                {/* Input */}
                <input
                  type="text"
                  value={todayTask}
                  onChange={(e) => setTodayTask(e.target.value)}
                  placeholder="Today's task"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex sm:flex-row gap-2.5 sm:gap-5 text-center justify-center mb-5">
                  <div className="bg-gray-100 p-4 rounded-md w-full sm:w-24 max-w-full sm:max-w-24">
                    <p className="text-2xl font-bold">{(Math.floor(clock / 3600)).toString().padStart(2, "0")}</p>
                    <p className="text-gray-600 text-sm">Hours</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md w-full sm:w-24 max-w-full sm:max-w-24">
                    <p className="text-2xl font-bold">{Math.floor((clock % 3600) / 60).toString().padStart(2, "0")}</p>
                    <p className="text-gray-600 text-sm">Minutes</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md w-full sm:w-24 max-w-full sm:max-w-24">
                    <p className="text-2xl font-bold">{(clock % 60).toString().padStart(2, "0")}</p>
                    <p className="text-gray-600 text-sm">Seconds</p>
                  </div>
                </div>


                {/* Buttons */}
                <div className="flex justify-center gap-4">
                  {
                    (mount || !mount) && (
                      <button onClick={clockIn} className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 rounded-md text-sm sm:text-base font-medium transition-all text-center">
                        <svg
                          className="w-5 h-5 mb-1 sm:mb-0 sm:mr-2 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 16h-1v-4h-1m4 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {loading ? (
                          <span className="loader"></span>
                        ) : (
                          <span className="truncate">
                            {!localStorage.getItem("clock-status")
                              ? "Check-in"
                              : localStorage.getItem("clock-status") ===
                                "break"
                                ? "Break"
                                : localStorage.getItem("clock-status") ===
                                  "resume"
                                  ? "Resume"
                                  : localStorage.getItem("clock-status") ===
                                    "out"
                                    ? "Check-in"
                                    : null}
                          </span>
                        )}
                        {/* <span className="truncate">Check-in</span> */}
                      </button>
                    )
                  }

                  {(mount || !mount) && (
                    <button disabled={
                      !localStorage.getItem("clock-status") ||
                      localStorage.getItem("clock-status") === "out"
                    }
                      onClick={clockOut} className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-3 rounded-md text-sm sm:text-base font-medium transition-all text-center">
                      <svg
                        className="w-5 h-5 mb-1 sm:mb-0 sm:mr-2 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 16h-1v-4h-1m4 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {clockoutLoading ? (
                        <span class="loader2"></span>
                      ) : (
                        <span className="truncate">Check-out</span>
                      )}

                    </button>
                  )}


                </div>
              </div>
            </div>
          </div>
        </div>

        {
          user?.role === "EMPLOYEE" && (
            <div className="bg-grey rounded-xl border-2 p-4 order-2 md:order-4">
              <div className="items-center">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 text-white p-2 rounded-md shadow mr-3">
                    <MdCalendarToday className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-semibold">Attendence Calendar</h2>
                </div>
              </div>

              <hr />
              <div className="px-5 relative">
                <NavLink to="/employeeDash/atten">
                  <Calendar onChange={onChange} value={value} />
                </NavLink>
              </div>
            </div>
          )
        }

        {/* Holiday Permission and Employee */}

        {
          holidaylistPermission || user?.role === "ADMIN" && (
            <div className="bg-grey rounded-xl border-2 order-4 md:order-3">
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Holiday Lists</h3>
                </div>
                <NavLink to={user?.role === "ADMIN" ? "/adminDash/HRM/holiday" : "/employeeDash/HRM/holiday"}>
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-fit"
                  >
                    View All
                  </button>
                </NavLink>
              </div>
              <hr />
              <div className="w-full overflow-x-auto rounded-lg">
                <table className="min-w-full text-sm text-left bg-white rounded-lg">
                  <thead className="bg-white font-semibold">
                    <tr>
                      <th className="text-left font-bold text-gray-900 py-3 px-3 border-b border-gray-200 whitespace-nowrap">
                        OCCASION
                      </th>
                      <th className="text-left font-bold text-gray-900 py-3 px-3 border-b border-gray-200 whitespace-nowrap">
                        START DATE
                      </th>
                      <th className="text-left font-bold text-gray-900 py-3 px-3 border-b border-gray-200 whitespace-nowrap">
                        END DATE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {holiday.length === 0 ? (
                      <tr>
                        <td
                          colSpan='3'
                          className="text-center text-gray-400 px-3 py-4"
                        >
                          No data available
                        </td>
                      </tr>
                    ) : (
                      holiday?.slice(0, 5).map((val, i) => (
                        <tr
                          key={i}
                          className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                        >
                          <td className="px-3 py-4 text-[#0B56E4]">
                            <div className="flex items-center space-x-2 relative min-w-48">
                              <p className="whitespace-pre-line max-w-[110px]">
                                {val?.holidayName?.split(" ").reduce((acc, word) => {
                                  const line = acc.length > 0 ? acc[acc.length - 1] : "";
                                  if (line.length + word.length + 1 <= 10 || acc.length === 0) {
                                    acc[acc.length - 1] = line ? line + " " + word : word;
                                  } else {
                                    acc.push(word);
                                  }
                                  return acc;
                                }, [""]).map((line, idx) => (
                                  <React.Fragment key={idx}>
                                    {idx !== 0 && <br />}
                                    {line}
                                  </React.Fragment>
                                ))}
                              </p>

                              <p className={`text-xs px-2 py-1 rounded-full absolute right-0 top-1/2 -translate-y-1/2 transform ${val?.status === "Today" ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                {val?.status}
                              </p>
                            </div>
                          </td>
                          <td className="px-3 py-4 text-gray-800">
                            {val?.startDate}
                          </td>
                          <td className="px-3 py-4 text-gray-800">
                            {val?.endDate}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )
        }



        <div className="bg-grey rounded-xl border-2 p-4 order-2 md:order-4">
          <div className="items-center">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 text-white p-2 rounded-md shadow mr-3">
                <MdCalendarToday className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">Time Log</h2>
            </div>
          </div>

          <hr />
          <h3 className="text-m font-medium text-gray-500 pt-3 pb-3">Today</h3>
          <hr />

          <TimeLog clock={clock} breakClock={breakClock} totalHours={totalHours} />
        </div>


        {/* leaves */}
        {
          user?.role === "EMPLOYEE" && (
            <div className="bg-white w-full rounded-md my-9 border border-gray-200 order-6 col-span-2">
              <div className="flex justify-between p-4">
                <div className="flex items-center gap-2.5 p-2.5">
                  <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748383770/download_11_xirwci.png" alt="Leaves" />
                  <h3 className="text-lg font-semibold">Leaves</h3>
                </div>

                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    onClick={() => {
                      setFormType("half");
                      setShowModal(true);
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Get Half Day
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormType("full");
                      setShowModal(true);
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Get Leave
                  </button>

                  {(userAllowCrtPermission) && (
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => {
                        setLeaveAllow(true);
                      }}
                    >
                      <span>Leave Allowance</span>
                    </button>
                  )}
                </div>
              </div>

              <hr />

              <div className="flex p-5 gap-5">
                <div className="flex justify-between p-7 bg-gray-100 w-1/2">
                  <div>
                    <h5>{user?.userAllowance}</h5>
                    <p>Total leave allowance</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-1">
                      <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748383775/download_12_pfwnec.png" alt="casual" />
                      <span>casual - {userCasualLeaves}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748383770/download_13_gm4ix0.png" alt="paid" />
                      <span>Paid - {userPaidLeaves}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748383770/download_13_gm4ix0.png" alt="half" />
                      <span>Half Days - {userHalfDayLeaves}</span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-between p-7 bg-gray-100 w-1/2">
                  <div>
                    <h5>{userLeaveTaken}</h5>
                    <p>Total leave taken</p>
                  </div>
                </div>
              </div>

              <div className="flex p-5 gap-5">
                <div className="flex justify-between p-7 bg-gray-100 w-1/2">
                  <div>
                    <h5>{remainingLeave === 0 ? 'N/A' : remainingLeave}</h5>
                    <p>Total leave available</p>
                  </div>
                </div>

                <div className="flex justify-between p-7 bg-gray-100 w-1/2">
                  <div>
                    <h5>{userPendingLeaves}</h5>
                    <p>Total request pending</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }


        {showModal && (
          <div className="fixed inset-0 z-50 backdrop-blur-[1px] flex items-center justify-center bg-black bg-opacity-50">
            <div ref={leaveWrap} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
              <h2 className="text-lg font-semibold">
                {formType === "full" ? "Apply for Full Day Leave" : "Apply for Half Day Leave"}
              </h2>
              <hr className="my-3" />

              <form onSubmit={handleSubmit} className="space-y-4">
                {formType === "full" && (
                  <>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="fullday-leaveType" className="font-medium">Leave Type :</label>
                      <select
                        name="leaveType"
                        value={formdata.leaveType}
                        onChange={(e) => handleChange(e)}
                        className="w-full border border-gray-300 p-2 rounded"
                      >
                        <option value="">Select Leave Type</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="start" className="font-medium">Start Date :</label>
                      <DatePicker
                        selected={formdata.start ? parse(formdata.start, "dd/MM/yyyy", new Date()) : null}
                        onChange={(date) => handleDateChange(date, "start", false)}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        name="start"
                        placeholderText="Start Date"
                        className="!w-full border border-gray-300 p-2 rounded"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="end" className="font-medium">End Date :</label>
                      <DatePicker
                        selected={formdata.end ? parse(formdata.end, "dd/MM/yyyy", new Date()) : null}
                        onChange={(date) => handleDateChange(date, "end", false)}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        name="end"
                        placeholderText="End Date"
                        className="!w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="reason" className="font-medium">Reason :</label>
                      <textarea
                        name="reason"
                        placeholder="Reason"
                        value={formdata.reason}
                        onChange={(e) => handleChange(e)}
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                  </>
                )}

                {formType === "half" && (
                  <>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="start" className="font-medium">Date :</label>
                      <DatePicker
                        selected={formdata2.start ? parse(formdata2.start, "dd/MM/yyyy", new Date()) : null}
                        onChange={(date) => handleDateChange(date, "start", true)}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        name="start"
                        placeholderText="Start Date"
                        className="!w-full border border-gray-300 p-2 rounded"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="reason" className="font-medium">Reason :</label>
                      <textarea
                        name="reason"
                        placeholder="Reason"
                        value={formdata2.reason}
                        onChange={(e) => handleChange(e, true)}
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}



        {
          user?.role === "ADMIN" && (
            <div className="bg-grey rounded-xl border-2  xl:col-span-2 order-5 md:order-5">
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Task Assign</h3>
                </div>
                <NavLink to="/adminDash/HRM/taskProjects">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-fit"
                  >
                    View All
                  </button>
                </NavLink>

              </div>
              <hr />
              <div className="w-full overflow-x-auto rounded-lg">
                <table className="min-w-full text-sm text-left bg-white rounded-lg">
                  <thead className="bg-white font-semibold">
                    <tr>
                      <th className="text-left font-bold text-gray-900 py-3 px-3 border-b border-gray-200 whitespace-nowrap">
                        Project Name
                      </th>
                      <th className="text-left font-bold text-gray-900 py-3 px-3 border-b border-gray-200 whitespace-nowrap">
                        Assign Date
                      </th>
                      <th className="text-left font-bold text-gray-900 py-3 px-3 border-b border-gray-200 whitespace-nowrap">
                        End Date
                      </th>
                      <th className="text-left font-bold text-gray-900 py-3 px-3 border-b border-gray-200 whitespace-nowrap">
                        Status
                      </th>
                      <th className="text-left font-bold text-gray-900 py-3 px-3 border-b border-gray-200 whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.length === 0 ? (
                      <tr>
                        <td
                          colSpan={tasks.length}
                          className="text-center text-gray-400 px-3 py-4"
                        >
                          No data available
                        </td>
                      </tr>
                    ) : (
                      tasks?.map((val, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                        >
                          <td className="px-3 py-4 text-[#0B56E4]">
                            {val?.projectName || "N/A"}
                          </td>
                          <td className="px-3 py-4 text-gray-800">
                            {val?.startDate || "N/A"}
                          </td>
                          <td className="px-3 py-4 text-gray-800">
                            {val?.deadline || "N/A"}
                          </td>
                          <td className="px-3 py-4 text-gray-800">
                            {val?.Status || "N/A"}
                          </td>
                          <td className="px-3 py-4 text-gray-800">
                            <div className="relative w-fit" >
                              <img onClick={() => setTaskAssignIndex(taskAssignIndex === index ? null : index)} className="cursor-pointer" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png" alt="action" />

                              {
                                taskAssignIndex === index && (
                                  <div
                                    ref={taskAssignActionPopRef}
                                    className="absolute z-[1000] right-[15px] -top-[15px] w-[100px] cursor-pointer bg-white border border-gray-200 shadow-lg flex flex-col"
                                  >
                                    <div
                                      onClick={() => {
                                        setTaskAssignIndex(null);
                                        navigate('/adminDash/HRM/projectOverview', { state: val })
                                      }}
                                      className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 "
                                    >
                                      <MdOutlineEdit fontSize={18} />
                                      <span className="!text-[14px] font-semibold">View</span>
                                    </div>

                                  </div>
                                )
                              }
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )
        }




        {
          showPrevCheckout && (
            <div className="w-full h-screen fixed top-0 left-0 backdrop-blur-[1px] bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-[3000]">
              <div className="bg-white p-5 rounded-md shadow-md max-w-[40%]">
                <h3 className="font-medium">You didn't check out on <span className="font-semibold">{localStorage.getItem("clock-in-date")}</span>. Please update your checkout time to continue.</h3>
                <hr className="my-2" />
                <label htmlFor="prevDayTask"> Task of <span className="font-medium">{localStorage.getItem("clock-in-date")}</span> :</label>
                <br />
                <input value={prevdayTask} onChange={(e) => setPrevdayTask(e.target.value)} type="text" name="prevDayTask" placeholder="Enter Your Task" className="border border-gray-300 p-2 rounded-sm my-3 w-full" />
                <label htmlFor="checkoutTime" className="w-full">
                  Select Your Checkout time for <span className="font-medium">{localStorage.getItem("clock-in-date")}</span> :
                </label>
                <br />
                <input value={prevCheckoutTime} onChange={(e) => setPrevCheckoutTime(e.target.value)} type="time" name="checkoutTime" id="" className="border border-gray-300 p-2 rounded-sm my-3" />

                <div className="flex items-center gap-3">
                  <button onClick={storePrevCheckInCheckout} className="py-2 px-5 bg-blue-600 text-white rounded-sm">Save</button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Dashboard;