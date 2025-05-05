import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
const CreateLead = () => {
  return (
  <div className='bg-[#f9fbfc]'>
   <div>
   <div className="flex items-center justify-between px-7 py-5 pt-5">
      <h2 className="text-[24px] font-semibold text-[#111827]">Create Lead</h2>
      <div className="flex gap-2">
        <button className="px-4 py-1.5 text-md border rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium">
          Back
        </button>
        <button className="px-4 py-1.5 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Save New
        </button>
      </div>
    </div>
   </div>
    <div className="max-w-7xl mx-auto px-6 pb-6">
     
      <div className="bg-white rounded-lg shadow mb-6">
      <div className="flex items-center justify-between border-b-2 p-5">
        <div>
        <MdAccountCircle size={48} color="#3b3b3b"/>
        </div>
    
      </div>
        <h2 className="text-lg font-semibold pl-6 border-b-2 p-5">Lead Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div>
            <label className="block text-md font-normal mb-1">Lead Owner</label>
            <select className="w-full border rounded p-2 text-sm font-normal text-gray-500 ">
              <option>Info</option>
        
            </select>
          </div>
          <div>
            <label className="block text-md font-normal mb-1">Company</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-md font-normal mb-1">First Name</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-md font-normal mb-1">Last Name</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-md font-normal mb-1">Title</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>
          <div>

            <label className="block text-md font-normal mb-1">Email</label>
            <input type="email" className="w-full border rounded p-2" />
          </div>

        
          <div>
            <label className="block text-md font-normal mb-1">Phone</label>
            <input type="number" maxLength="10" className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-md font-normal mb-1">Fax</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-md font-normal mb-1">Mobile</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-md font-normal mb-1">Website</label>
            <input type="url" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Lead Source</label>
            <select className="w-full border rounded p-2">
              <option>Cold Call</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Industry</label>
            <select className="w-full border rounded p-2">
              <option>IT-B2B</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">No. of Employees</label>
            <input type="number" className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Annual Revenue</label>
            <div className="flex items-center">
              <span className="border border-r-0 rounded-l px-3 py-2 bg-gray-100">$</span>
              <input type="number" className="w-full border rounded-r p-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Lead Status</label>
            <select className="w-full border rounded p-2">
              <option>Cold Email</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <select className="w-full border rounded p-2">
              <option>Cold Email</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Skype ID</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4" />
            <label className="text-sm">Email Opt-Out</label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Secondary Email</label>
            <input type="email" className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Twitter</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Address Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Street</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Zip Code</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Country</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Description Information</h2>
        <textarea className="w-full border rounded p-2" rows="4" placeholder="Description"></textarea>
      </div>
    </div>
  </div>
  );
};

export default CreateLead;
