import React, { useEffect, useState } from 'react'
import { useMain } from '../../../hooks/UseMain';
import "react-calendar/dist/Calendar.css";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
const CloseLeads = () => {
    const { closeLeadApiFetch } = useMain();

    const [Filter1, setFilter1] = useState("Select");
    const [originalCloseLead, setOriginalCloseLead] = useState([]);
    const [allCloseLead, setAllCloseLead] = useState([]);
    const [searchText, setSrchText] = useState("");
    const [sortDate, setSortDate] = useState("");
    const [sortDate2, setSortDate2] = useState("");

    const closeLead = async () => {
        const ans = await closeLeadApiFetch();
        if (ans?.status) {
            setOriginalCloseLead(ans.status);
            setAllCloseLead(ans.status);
        }
    };

    useEffect(() => {
        closeLead();
    }, []);

    useEffect(() => {
        let filtered = [...originalCloseLead];
        const today = new Date();

  
        if (searchText.trim() !== "") {
            filtered = filtered.filter((lead) => {
                const leadName = `${lead.FirstName} ${lead.LastName}`.toLowerCase();
                return leadName.includes(searchText.toLowerCase());
            });
        }

       
        if (Filter1 === "Per Day") {
            const start = new Date(today.setHours(0, 0, 0, 0));
            const end = new Date(start);
            end.setDate(end.getDate() + 1);

            filtered = filtered.filter((ld) => {
                const createdAt = new Date(ld.createAt);
                return createdAt >= start && createdAt < end;
            });
        } else if (Filter1 === "This Week") {
            const start = new Date();
            start.setDate(today.getDate() - 7);

            filtered = filtered.filter((ld) => {
                const createdAt = new Date(ld.createAt);
                return createdAt >= start && createdAt <= today;
            });
        } else if (Filter1 === "Last 14 Days") {
            const start = new Date();
            start.setDate(today.getDate() - 14);

            filtered = filtered.filter((ld) => {
                const createdAt = new Date(ld.createAt);
                return createdAt >= start && createdAt <= today;
            });
        } else if (Filter1 === "This Month") {
            const start = new Date(today.getFullYear(), today.getMonth(), 1);
            const end = new Date(today.getFullYear(), today.getMonth() + 1, 1);

            filtered = filtered.filter((ld) => {
                const createdAt = new Date(ld.createAt);
                return createdAt >= start && createdAt < end;
            });
        }

       
        if (sortDate && sortDate2) {
            const start = new Date(sortDate);
            const end = new Date(sortDate2);
            end.setHours(23, 59, 59, 999);

            filtered = filtered.filter((ld) => {
                const createdAt = new Date(ld.createAt);
                return createdAt >= start && createdAt <= end;
            });
        }

        setAllCloseLead(filtered);
    }, [searchText, Filter1, sortDate, sortDate2, originalCloseLead]);

  return (
    <div className="flex relative  h-full ">

    <div className="w-full "
    >
       

        <div className="w-full relative  pr-[15px] pl-[15px] py-[32px]">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className='text-[24px] font-semibold text-[#111827] leading-6'>All Close Deals</h2>
                    <p className='text-[12px] text-[#6B7280] mt-1'>Real-time insights and performance overview</p>
                </div>
                <div>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                        <NavLink to="/adminDash/leadDash">
                            <button className="flex gap-2 items-center bg-[#2563eb] text-white text-[16px] font-medium px-4 py-[6px] rounded-md hover:bg-blue-700">
                                <BiArrowBack /> Back
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row items-center justify-between">
                <div>
                    <div className="my-5 flex gap-5 items-center">
                        <div className="flex items-center gap-4 w-[285px] h-12 px-4 py-2 rounded-[15px] bg-white border-2 border-[#D0D4DC]">
                         
                           <input
                           className='outline-none '
                                value={searchText}
                                onChange={(e) => setSrchText(e.target.value)}
                                type="text"
                                placeholder="Search leads"
                            />
                          
                            <span className='flex items-center gap-4'>
                                <img className="cursor-pointer" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746530595/bx-search_sxotf2.png" alt="" />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-[10px] ">
                    <span className='text-[#666D76] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left'>Sort by</span>

                    <input
                    className="text-[12px] w-[265px] h-[48px] p-[8px_16px] gap-[8px]  rounded-[10px] text-[#1B2533] border border-[#D0D4DC] "
                        type="date"
                        value={sortDate}
                        onChange={(e) => setSortDate(e.target.value)}
                        
                    />

                    <span className='text-[#666D76] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left'>TO</span>

                    <input
                    className="text-[12px] w-[265px] h-[48px] p-[8px_16px] gap-[8px] rounded-[10px] text-[#1B2533] border border-[#D0D4DC] "
                        type="date"
                        value={sortDate2}
                        onChange={(e) => setSortDate2(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center justify-end p-5">
                <select
               
                    onChange={(e) => setFilter1(e.target.value)}
                    value={Filter1}
                    name="thisFilter"
                    id="fentar"
                    className="select-wrapper p-2 border border-black rounded-md"  >
                    <option value="Select" disabled>
                        Select
                    </option>
                    <option value="Per Day">Per Day</option>
                    <option value="This Week">This Week</option>
                    <option value="Last 14 Days">Last 14 Days</option>
                    <option value="This Month">This Month</option>
                </select>
                {/* <img className="doqn" width="30" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746530550/downis_yfkfau.png" alt="downis" /> */}
            </div>

            <div className="bg-grey rounded-xl border-2 overflow-hidden">
                <div className="w-full overflow-x-auto bg-white  border border-gray-200 shadow-sm px-2">
                    <table className="w-full text-sm text-gray-700">
                        <thead className="bg-white font-semibold">
                            <tr>
                                <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Company</th>
                                <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Email</th>
                                <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">FirstName</th>
                                <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">LastName</th>
                                <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Close Date</th>
                                <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allCloseLead?.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                                    <td className="px-4 py-4 text-gray-800">{item?.Company}</td>
                                    <td className="px-4 py-4 text-gray-800">{item?.Email}</td>
                                    <td className="px-4 py-4 text-gray-800">{item?.FirstName}</td>
                                    <td className="px-4 py-4 text-gray-800">{item?.LastName}</td>
                                    <td className="px-4 py-4 text-gray-800">
                                        {new Date(item?.closeDate).toLocaleDateString('en-GB')}
                                    </td>
                                    <td className=" text-gray-800">
                                        <div
                                            className={`text-gray-800 flex items-center justify-center rounded-[27px] h-[28px] text-[12px] font-inter font-normal
                                            ${item?.LeadStatus === "Connected" && "connected"}
                                            ${item?.LeadStatus === "Nurturing" && "Nurturing"}
                                            ${item?.LeadStatus === "Qualified" && "Qualified"}
                                            ${item?.LeadStatus === "Unqualified" && "Unqualified"}
                                            ${item?.LeadStatus === "Converted" && "Converted"}
                                            ${item?.LeadStatus === "Not Converted" && "Converteds"}
                                            ${item?.LeadStatus === "Junk" && "Junk"}
                                            ${item?.LeadStatus === "New" && "Newleadstatus"}
                                            `}
                                        >
                                            {item?.LeadStatus}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default CloseLeads;