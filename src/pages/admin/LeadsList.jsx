import { Filter, Search, Plus, Upload, CalendarDays, ChevronDown } from "lucide-react";
import CommonTableLead from "../../components/CommonTableLead";
import ActionMenu from "../../components/ActionMenu";

export default function LeadManagementHeader() {
    const theadData = [
      "S.No",
        "Lead Name",
        "Company",
        "Email",
        "Phone",
        "First Name",
        "Last Name",
        "Lead Status",
      "Industry"
      ];
      const tbodyData = [
        [
          "1.",
          "Adrian Kirk",
          "Design Pro Web Solutions, LLC",

          "sales@designprowebsolutions.com",
          "1 901-275-2749",
          "Gulinski",
          "Adrian Kirk",
          "Cold",
          "Adrian Kirk"
          
        ],
        [
          "2.",
          "Adrian Kirk",
          "Design Pro Web Solutions, LLC",

          "sales@designprowebsolutions.com",
          "1 901-275-2749",
          "Gulinski",
          "Adrian Kirk",
          "Cold",
          "Adrian Kirk"
        
        ],
        [
          "3.",
          "Adrian Kirk",
          "Design Pro Web Solutions, LLC",

          "sales@designprowebsolutions.com",
          "1 901-275-2749",
          "Gulinski",
          "Adrian Kirk",
          "Cold",
         "Adrian Kirk"
        ],
        [
          "4.",
          "Adrian Kirk",
          "Design Pro Web Solutions, LLC",

          "sales@designprowebsolutions.com",
          "1 901-275-2749",
          "Gulinski",
          "Adrian Kirk",
          "Cold",
          "Adrian Kirk"
        
        ],
        [
          "5.",
          "Adrian Kirk",
          "Design Pro Web Solutions, LLC",

          "sales@designprowebsolutions.com",
          "1 901-275-2749",
          "Gulinski",
          "Adrian Kirk",
          "Cold",
          "Adrian Kirk"
         
        ],
      ];
    
  return (
  <div>
    <div className="flex flex-col md:flex-row md:items-start md:justify-between px-6 py-5 bg-white border-b gap-4">
  {/* Left Side */}
  <div>
    <h2 className="text-xl font-semibold text-gray-900">Lead Management</h2>
    <p className="text-sm text-gray-500 mt-0.5">Real-time insights and performance overview</p>

    <div className="flex flex-wrap items-center mt-4 gap-2">
      <button className="p-2 border rounded-lg text-blue-600 border-blue-600 hover:bg-blue-50">
        <Filter className="w-4 h-4" />
      </button>

      <div className="relative w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search leads"
          className="w-full sm:w-64 pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
      </div>
    </div>
  </div>

  {/* Right Side */}
  <div className="flex flex-col md:items-end gap-2">
    <div className="flex flex-wrap gap-3">
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        <Plus className="w-4 h-4" />
        Create New Lead
      </button>

      <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
        <Upload className="w-4 h-4" />
        Import Leads
      </button>

      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
        Actions
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>

    <div className="flex items-center gap-2 mt-1 flex-wrap">
      <span className="text-sm text-gray-500">Sort by</span>
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
        <CalendarDays className="w-4 h-4 text-gray-600" />
        <input
          type="date"
          className="text-sm text-gray-700 bg-transparent outline-none"
        />
        <span className="text-gray-500 text-sm">-</span>
        <input
          type="date"
          className="text-sm text-gray-700 bg-transparent outline-none"
        />
      </div>
    </div>
  </div>
</div>

   <div className="p-5 grid grid-cols-1 xl:grid-cols-1">
   <div className="p-3 font-medium">
        <p>Total Records 00</p>
    </div>
   <div className="bg-grey rounded-xl border-2 overflow-hidden" >
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
   </div>
  </div>
  );
}
 