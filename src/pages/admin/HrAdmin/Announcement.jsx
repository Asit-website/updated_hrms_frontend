
import CommonTable from "../../../components/CommonTable";

import ActionMenu from "../../../components/ActionMenu";
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useMain } from "../../../hooks/UseMain";
import { useEffect, useState } from "react";

const Announcement = () => {
  const { fetchAnnoucement, announcement, setAnnouncement } = useMain();
  const buttonOptions = [
    {
      label: 'Edit',
      icon: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260260/Vector_zah5tt.svg',
      onClick: () => console.log('Edit clicked'),
    },
    {
      label: 'Delete',
      icon: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260280/delete_sgefhv.png',
      danger: true,
      onClick: () => console.log('Delete clicked'),
    },
  ]
  useEffect(() => {
    if (!announcement?.length) {
      fetchAnnoucement()
    }
  }, []);
  const theadData2 = [
    "TITLE",
    "	START DATE",
    "END DATE",

    "DESCRIPTION",
    "ACTION"
  ];


  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Manage Announcement</h1>
          <p className="text-sm">
            Dashboard Announcement
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-fit"
        >
          <FaPlus className="text-white text-sm" />
          Create Announcement
        </button>
      </div>



      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-4">






        <div className="bg-grey rounded-xl border-2  xl:col-span-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4">


            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 w-full md:w-fit">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 outline-none text-gray-600 placeholder-gray-400 bg-transparent pr-2"
              />
              <FaSearch className="text-gray-500" />
            </div>
          </div>
          <hr />
          <div className="w-full overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-left bg-white rounded-lg">
              <thead className="bg-white font-semibold">
                <tr>
                  {theadData2.map((head, idx) => (
                    <th
                      key={idx}
                      className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {announcement.length === 0 ? (
                  <tr>
                    <td
                      colSpan={theadData2.length}
                      className="text-center text-gray-400 px-6 py-4"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  announcement?.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-6 py-4 text-gray-800">
                        {row?.title}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {row?.startDate}
                      </td>

                      <td className="px-6 py-4 text-gray-800">
                        {row?.endDate}
                      </td>




                      <td className="px-6 py-4 text-gray-800">
                        {row?.
                          description
                          ?.length > 30 ? row?.
                            description
                            ?.slice(0, 30) : row?.
                          description
                        }
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        <ActionMenu options={buttonOptions} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;