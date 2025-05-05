import { Filter, Search, Plus, Upload, CalendarDays, ChevronDown } from "lucide-react";
import CommonTableLead from "../../components/CommonTableLead";
import ActionMenu from "../../components/ActionMenu";
import { useEffect, useRef, useState } from "react";

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
    

      const [isOpen, setIsOpen] = useState(false);
      const dropdownRef = useRef();
    
      const toggleDropdown = () => setIsOpen(!isOpen);
    
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);

      const [isFilterOpen, setIsFilterOpen] = useState(false);
      const filterRef = useRef();
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            dropdownRef.current && !dropdownRef.current.contains(event.target)
          ) {
            setIsOpen(false);
          }
          if (
            filterRef.current && !filterRef.current.contains(event.target)
          ) {
            setIsFilterOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);
      
  return (
  <div>
    <div className="flex flex-col md:flex-row md:items-start md:justify-between px-6 py-5 bg-white border-b gap-4">
  {/* Left Side */}
  <div>
    <h2 className="text-xl font-semibold text-gray-900">Lead Management</h2>
    <p className="text-sm text-gray-500 mt-0.5">Real-time insights and performance overview</p>

    <div className="flex flex-wrap items-center mt-4 gap-2">
    
<div className="relative" ref={filterRef}>
  <button
    className="p-2 border rounded-lg text-blue-600 border-blue-600 hover:bg-blue-50"
    onClick={() => setIsFilterOpen(!isFilterOpen)}
  >
    <Filter className="w-4 h-4" />
  </button>

  {isFilterOpen && (
    <div className="absolute z-20 top-2 left-1 w-72 bg-white border border-gray-200 rounded-lg shadow-md p-4">
      <p className="text-md text-gray-800 font-medium mb-2">Filter Leads by</p>
      <hr/>
      <div className="space-y-2 text-sm mt-2">
        <label className="flex items-center space-x-2">
          <input type="checkbox" defaultChecked />
          <span className="text-md text-gray-900 font-medium">Touched Records</span>
        </label>

        <div className="ml-5 space-y-2">
          <div className="flex gap-2 items-center text-gray-600 font-thin"> 
          <span> By</span>
          <select className="border rounded px-2 py-1 text-sm w-52">
            <option>User & system</option>
            <option>User only</option>
            <option>System only</option>
          </select>
            </div> 

          <div className="flex items-center justify-around space-x-2">
         
            <input
              type="type"
             placeholder="In the last"
              className="w-24 border rounded px-1 py-1 text-sm"
            />
            <input
              type="number"
              defaultValue={2}
              className="w-11 border rounded px-1 py-1 text-sm"
            />
            <select className="border rounded px-2 py-1 text-sm w-16">
              <option>Days</option>
              <option>Weeks</option>
              <option>Months</option>
            </select>
          </div>
    
        </div>
        <hr/>

      <div className="overflow-y-scroll max-h-[250px]">
      {[
          "Untouched Records",
          "Activities",
          "Notes",
          "Annual Revenue",
          "Country",
          "Untouched Records",
          "Activities",
          "Notes",
          "Annual Revenue",
          "Country",
         
        ].map((label) => (
          <label key={label} className="flex items-center space-x-4 border-b-2  pt-2 pb-2">
          
            <input type="checkbox" />
         
            <span>{label}</span>
      
          </label>
        ))}
      </div>

        <div className="flex justify-between pt-3">
          <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">
            Apply
          </button>
          <button className="border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-50 text-sm">
            Clear
          </button>
        </div>
      </div>
    </div>
  )}
</div>
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
      <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        onClick={toggleDropdown}
      >
        Actions
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-4 z-10 top-3 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-blue-100 hover:text-blue-700  cursor-pointer">Mass Delete</li>
            <li className="px-4 py-2 hover:bg-blue-100 hover:text-blue-700 cursor-pointer">Mass Update</li>
            <li className="px-4 py-2 hover:bg-blue-100 hover:text-blue-700  cursor-pointer">Mass Convert</li>
            <li className="px-4 py-2 hover:bg-blue-100 hover:text-blue-700 cursor-pointer">Mass Email</li>
          </ul>
        </div>
      )}
    </div>

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
 