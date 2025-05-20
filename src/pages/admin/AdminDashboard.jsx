import { RefreshCw, User, Settings, Clock, Users, Gift } from "lucide-react";
import CommonTable from "../../components/CommonTable";
import TimerTable from "../../components/DashBoard/TimerTable";
import { MdCalendarToday, MdEventAvailable } from "react-icons/md";
import TimeLog from "../../components/DashBoard/TimeLog";
import ActionMenu from "../../components/ActionMenu";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Employee",
      value: 0,
      icon: <User className="text-white" size={20} />,
      bg: "bg-green-700",
      card: "bg-green-50 border-green-300",
    },
    {
      title: "Half Day Request",
      value: 2,
      icon: <User className="text-white" size={20} />,
      bg: "bg-blue-700",
      card: "bg-blue-100 border-blue-300",
    },
    {
      title: "Leave Request",
      value: 6,
      icon: <Settings className="text-white" size={20} />,
      bg: "bg-red-600",
      card: "bg-red-50 border-red-200",
    },
    {
      title: "Employee on Leave",
      value: 0,
      icon: <Clock className="text-white" size={20} />,
      bg: "bg-yellow-500",
      card: "bg-yellow-50 border-yellow-200",
    },
    {
      title: "Total Employee",
      value: 14,
      icon: <Users className="text-white" size={20} />,
      bg: "bg-blue-600",
      card: "bg-blue-50 border-blue-200",
    },
    {
      title: "Deactivated Employee",
      value: 2,
      icon: <Users className="text-white" size={20} />,
      bg: "bg-red-600",
      card: "bg-red-50 border-red-200",
    },
  ];
  const theadData = ["TITLE", "START DATE", "END DATE", "ACTION"];
  const tbodyData = []
  const theadData1 = ["OCCASION", "START DATE", "END DATE"];
  const tbodyData1 = [];
  const theadData2= [
    "Project Name",
    "Assign Date",
    "End Date",
    "Status",
    "Action",
  ];
  const tbodyData2 = [
    ["apk", "2025-05-03", "2025-10-10", "Ongoing",<ActionMenu/>],
    ["Aman", "2025-04-30", "2025-05-01", "Ongoing",<ActionMenu/>],
    ["Kapil Choudhary", "2025-04-30", "2025-05-01", "OnHold",<ActionMenu/>],
    ["HomePageBanner", "2025-04-23", "2025-04-30", "OnHold",<ActionMenu/>],
    ["Nirviex2", "2025-03-31", "2025-05-01", "Ongoing",<ActionMenu/>],
    ["inderpal", "2025-04-16", "2025-04-30", "Ongoing",<ActionMenu/>],

  ];
 
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Hi shubham gupta</h1>
          <p className="text-gray-500 text-sm">
            Real-time insights and performance overview
          </p>
        </div>
     
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 ${stat.card} flex flex-col justify-between h-28 shadow-sm`}
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
        ))}
      </div>

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
  <a href="/adminDash/announcement">
      <button
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      View All
    </button>
  </a>
  </div>
</div>

   <hr />

          <CommonTable theadData={theadData} tbodyData={tbodyData} />
        </div>

        <div className="bg-grey rounded-xl border-2 p-4 order-1 md:order-2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center mb-6 gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-md shadow-md">
                <MdEventAvailable className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">Mark Attendance</h2>
            </div>
          </div>
          <TimerTable />
        </div>

        <div className="bg-grey rounded-xl border-2 order-4 md:order-3">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Holiday Lists</h3>
            </div>
            <button
    type="button"
    className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-fit"
  >
    View All
  </button>
          </div>
          <hr />
          <CommonTable theadData={theadData1} tbodyData={tbodyData1} />
        </div>

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
        <div className="bg-grey rounded-xl border-2  xl:col-span-2 order-5 md:order-5">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Task Assign</h3>
            </div>
            <button
    type="button"
    className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-fit"
  >
    View All
  </button>
          </div>
          <hr />
          <CommonTable theadData={theadData2} tbodyData={tbodyData2} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;