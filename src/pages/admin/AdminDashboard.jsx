import { RefreshCw, User, Settings, Clock, Users, Gift } from "lucide-react";
import CommonTable from "../../components/CommonTable";
import TimerTable from "../../components/DashBoard/TimerTable";
import { MdCalendarToday, MdEventAvailable } from "react-icons/md";
import TimeLog from "../../components/DashBoard/TimeLog";

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
  const tbodyData = [];
  const theadData1 = ["OCCASION", "START DATE", "END DATE"];
  const tbodyData1 = [];

  const theadData2 = [
    "POJECT NAME",
    "	ASSIGN DATE",
    "END DATE",
    "STATUS",
    "ACTION",
  ];
  const tbodyData2 = [];
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Hi shubham gupta</h1>
          <p className="text-gray-500 text-sm">
            Real-time insights and performance overview
          </p>
        </div>
        <button className="bg-blue-100 text-blue-600 font-medium px-4 py-2 rounded-lg flex items-center gap-1.5 space-x-1">
          <span>Refresh</span>
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 ${stat.card} flex flex-col justify-between h-28 shadow-sm`}
          >
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-md ${stat.bg} shadow-md`}>
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
        <div className="bg-grey rounded-xl border-2 p-4 order-3 md:order-1">
         
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
  <div className="flex items-center gap-2">
    <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
      <Gift className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-semibold">Announcement Lists</h3>
  </div>

  <div className="mt-2 sm:mt-0 sm:self-end self-end">
    <button
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      View All
    </button>
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

        <div className="bg-grey rounded-xl border-2 p-4 order-4 md:order-3">
          <div className="flex justify-between items-center mb-4">
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
          <div className="items-center mb-4">
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
        <div className="bg-grey rounded-xl border-2 p-4 xl:col-span-2 order-5 md:order-5">
          <div className="flex justify-between items-center mb-4">
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