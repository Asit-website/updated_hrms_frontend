import { RefreshCw, User, Settings, Clock, Users, Gift } from "lucide-react";
import CommonTable from "../../components/CommonTable";
import TimerTable from "../../components/DashBoard/TimerTable";
import { MdCalendarToday, MdEventAvailable } from "react-icons/md";
import TimeLog from "../../components/DashBoard/TimeLog";
import ActionMenu from "../../components/ActionMenu";
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useMain } from "../../hooks/UseMain";
import Calendar from "react-calendar";
// import { useWindowSize } from 'react-use';

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

  const stats = [
    {
      title: "Active Employee",
      value: 0,
      icon: <User className="text-white" size={20} />,
      bg: "bg-green-700",
      card: "bg-green-50 border-green-300",
      link: "/adminDash/HRM/activeEmployee"
    },
    {
      title: "Half Day Request",
      value: 2,
      icon: <User className="text-white" size={20} />,
      bg: "bg-blue-700",
      card: "bg-blue-100 border-blue-300",
      link: "/adminDash/HRM/halfDayRequest"
    },
    {
      title: "Leave Request",
      value: 6,
      icon: <Settings className="text-white" size={20} />,
      bg: "bg-red-600",
      card: "bg-red-50 border-red-200",
      link: "/adminDash/HRM/leaveRequest"
    },
    {
      title: "Employee on Leave",
      value: 0,
      icon: <Clock className="text-white" size={20} />,
      bg: "bg-yellow-500",
      card: "bg-yellow-50 border-yellow-200",
      link: "/adminDash/HRM/LeaveEmployee"
    },
    {
      title: "Total Employee",
      value: 14,
      icon: <Users className="text-white" size={20} />,
      bg: "bg-blue-600",
      card: "bg-blue-50 border-blue-200",
      link: "/adminDash/HRM/totalEmployee"
    },
    {
      title: "Deactivated Employee",
      value: 2,
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
    holidaylistPermission
  } = hrms_permission;

  const [announce, setAnnounce] = useState([]);
  const [holiday, setHoliday] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [value, onChange] = useState(new Date());
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);

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

  useEffect(() => {
    getallUpcomingBirthdays();
    getAnnoucement();
    getAllHolidays();
    fetchTasks();
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Hi {user?.fullName}</h1>
          <p className="text-gray-500 text-sm">
            Real-time insights and performance overview
          </p>
        </div>

      </div>

      {
        user?.role === "ADMIN" && (
          <div className="flex items-center overflow-x-scroll sm:grid grid-cols-2 sm:overflow-hidden md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
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
        <div className="bg-grey rounded-xl border-2 order-3 md:order-1">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Announcement Lists</h3>
            </div>

            <div className="mt-2 sm:mt-0 sm:self-end self-end">
              <NavLink to="/adminDash/announcement">
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
                  announce?.slice(0, 5).map((val, i) => (
                    <tr
                      key={i}
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
                      <td className="px-3 py-4 text-gray-800">
                        <div>
                          <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png" alt="action" />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

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
                        <img src={data.profileImage} className="w-[60px] rounded-full" />
                        {isBirthday ? <img src={cap} alt="" className="absolute -top-5 -left-5" /> : null}
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
                  placeholder="Today's task"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex sm:flex-row gap-2.5 sm:gap-5 text-center justify-center mb-5">
                  <div className="bg-gray-100 p-4 rounded-md w-full sm:w-24 max-w-full sm:max-w-24">
                    <p className="text-2xl font-bold">00</p>
                    <p className="text-gray-600 text-sm">Hours</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md w-full sm:w-24 max-w-full sm:max-w-24">
                    <p className="text-2xl font-bold">00</p>
                    <p className="text-gray-600 text-sm">Minutes</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md w-full sm:w-24 max-w-full sm:max-w-24">
                    <p className="text-2xl font-bold">00</p>
                    <p className="text-gray-600 text-sm">Seconds</p>
                  </div>
                </div>


                {/* Buttons */}
                <div className="flex justify-center gap-4">

                  <button className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 rounded-md text-sm sm:text-base font-medium transition-all text-center">
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
                    <span className="truncate">Check-in</span>
                  </button>

                  <button className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-3 rounded-md text-sm sm:text-base font-medium transition-all text-center">
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
                    <span className="truncate">Check-out</span>
                  </button>

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

          <TimeLog />
        </div>


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
                      tasks?.map((val, i) => (
                        <tr
                          key={i}
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
                            <div>
                              <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png" alt="action" />
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
      </div>
    </div>
  );
};

export default Dashboard;