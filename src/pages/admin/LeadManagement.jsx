import {
  Briefcase,
  Settings,
  Phone,
  Users,
  RefreshCcw,
  Gift,
} from "lucide-react";
import CommonTableLead from "../../components/CommonTableLead";
import CommonTable from "../../components/CommonTable";
import ActionMenu from "../../components/ActionMenu";

const stats = [
  {
    img: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746188858/Frame_9688_zhh0hh.png",
    label: "My Open Deals",
    value: 120,
  },
  {
    img: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746188839/Frame_9688_ddpeva.png",
    label: "My Untouched Deals",
    value: 450,
  },
  {
    img: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746188816/Frame_9688_tazycu.png",
    label: "My Calls Today",
    value: 30,
  },
  {
    img: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746188803/Frame_9688_kd3ksu.png",
    label: "My Leads",
    value: 8240,
  },
];

export default function LeadManagement() {
  const theadData = [
    "Subject",
    "Due Date",
    "Status",
    "Priority",
    "Related To",
    "Contact Name",
  ];
  const tbodyData = [
    [
      "Follow up WhatsApp Message",
      "31/05/2023",
      "Not Started",
      "High",
      "Machi Gulinski",
      "Kris Marrier",
    ],
    [
      "Follow up WhatsApp Message",
      "31/05/2023",
      "Not Started",
      "High",
      "Machi Gulinski",
      "Kris Marrier",
    ],
    [
      "Follow up WhatsApp Message",
      "31/05/2023",
      "Not Started",
      "High",
      "Machi Gulinski",
      "Kris Marrier",
    ],
    [
      "Follow up WhatsApp Message",
      "31/05/2023",
      "Not Started",
      "High",
      "Machi Gulinski",
      "Kris Marrier",
    ],
    [
      "Follow up WhatsApp Message",
      "31/05/2023",
      "Not Started",
      "High",
      "Machi Gulinski",
      "Kris Marrier",
    ],
  ];

  const theadData1 = [
    "Title",
    "Due Date",
    "Status",
    "Priority",
    "Related To",
    "Contact Name",
  ];
  const tbodyData1 = [
    [
      "Webinar",
      "31/05/2023",
      "Not Started",
      "High",
      "Machi Gulinski",
      "Kris Marrier",
    ],
    [
      "Webinar",
      "31/05/2023",
      "Not Started",
      "High",
      "Machi Gulinski",
      "Kris Marrier",
    ],
    [
      "Webinar",
      "31/05/2023",
      "Not Started",
      "High",
      "Machi Gulinski",
      "Kris Marrier",
    ],
    [
      "Webinar",
      "31/05/2023",
      "Not Started",
      "High",
      "Machi Gulinski",
      "Kris Marrier",
    ],
    [
      "Webinar",
      "31/05/2023",
      "Not Started",
      "High",
      "Machi Gulinski",
      "Kris Marrier",
    ],
  ];
  const theadData2 = [
   
  ];
  const tbodyData2 = [
    
  ];
  return (
    <div className="p-6 bg-[#f9fbfc]">
      <div className="flex flex-col md:flex-row justify-between items-start mb-5">
        <div>
          <h2 className="text-[24px] font-semibold text-[#111827] leading-6">
            Lead Management
          </h2>
          <p className="text-[12px] text-[#6B7280] mt-1">
            Real-time insights and performance overview
          </p>
        </div>
        <div className="flex space-x-3 pt-4 md:pt-0">
          <button className="flex items-center gap-1 text-[16px] font-medium px-4 py-[6px] border border-[#2563eb] text-[#2563eb] rounded-md hover:bg-blue-50">
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </button>
          <button className="bg-[#2563eb] text-white text-[16px] font-medium px-4 py-[6px] rounded-md hover:bg-blue-700">
            My Leads
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-4 shadow-sm border border-[#f3f4f6]"
          >
            <div className="flex  items-center justify-between">
              <div>
                <img src={stat.img} alt="icon" />
              </div>
              <p className="text-[17px] text-[#374151] font-medium">
                {stat.label}
              </p>
            </div>

            <p className="text-[24px] text-[#111827] font-semibold mt-1 text-end">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-8">
        <div className="bg-grey rounded-xl border-2 overflow-hidden">
          <div className="flex justify-between p-4 sm:items-center bg-white">
            <div className="flex items-center gap-2 ">
              <h3 className="text-xl font-semibold ">My Open Task</h3>
            </div>

            <div className="mt-2 sm:mt-0 sm:self-end self-end">
              <button>
               <ActionMenu/>
              </button>
            </div>
          </div>

          <hr />

          <CommonTableLead theadData={theadData} tbodyData={tbodyData} />
        </div>
        <div className="bg-grey rounded-xl border-2 overflow-hidden">
          <div className="flex p-4 justify-between sm:items-center bg-white">
            <div className="flex items-center gap-2 ">
              <h3 className="text-xl font-semibold ">My Meeting</h3>
            </div>

            <div className="mt-2 sm:mt-0 sm:self-end self-end">
            <button>
               <ActionMenu/>
              </button>
            </div>
          </div>

          <hr />

          <CommonTableLead theadData={theadData1} tbodyData={tbodyData1} />
        </div>
        <div className="bg-grey rounded-xl border-2 overflow-hidden">
          <div className="flex p-4 justify-between sm:items-center bg-white">
            <div className="flex items-center gap-2 ">
              <h3 className="text-xl font-semibold ">Today Leads</h3>
            </div>

            <div className="mt-2 sm:mt-0 sm:self-end self-end">
              
            <button>
               <ActionMenu/>
              </button>
            </div>
          </div>

          <hr />

          <CommonTable theadData={theadData2} tbodyData={tbodyData2} />
        </div>
        <div className="bg-grey rounded-xl border-2 overflow-hidden">
          <div className="flex  p-4 justify-between sm:items-center bg-white">
            <div className="flex items-center gap-2 ">
              <h3 className="text-xl font-semibold ">My Deals Closing This Month</h3>
            </div>

            <div className="mt-2 sm:mt-0 sm:self-end self-end">
            <button>
               <ActionMenu/>
              </button>
            </div>
          </div>

          <hr />

          <CommonTable theadData={theadData2} tbodyData={tbodyData2} />
        </div>
        
      </div>
      
    </div>
  );
}
