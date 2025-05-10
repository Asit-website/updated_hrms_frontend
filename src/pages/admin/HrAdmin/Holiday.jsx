import CommonTable from "../../../components/CommonTable";

import ActionMenu from "../../../components/ActionMenu";
import { useMain } from "../../../hooks/UseMain";
import { useEffect, useState } from "react";

const Holiday = () => {
  const { getHoliday } = useMain();
  const [holiday, setHoliday] = useState([]);
  const getAllHoliday = async () => {
    const ans = await getHoliday();
    if (ans?.status === 200) {
      setHoliday(ans?.data);
      console.log(ans?.status);
    }
  };

  useEffect(() => {
    getAllHoliday();
  }, []);
  const theadData2 = ["OCCASION", "START DATE", "END DATE", "ACTION"];

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Manage Holiday</h1>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-fit"
        >
          Create Holiday
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-4">
        <div className="bg-grey rounded-xl border-2  xl:col-span-2">
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
                {holiday.length === 0 ? (
                  <tr>
                    <td
                      colSpan={theadData2.length}
                      className="text-center text-gray-400 px-6 py-4"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  holiday?.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                    >
                      <td key={i} className="px-6 py-4 text-gray-800">
                        {row?.holidayName}
                      </td>
                      <td key={i} className="px-6 py-4 text-gray-800">
                        {row?.startDate}
                      </td>

                      <td key={i} className="px-6 py-4 text-gray-800">
                        {row?.endDate}
                      </td>

                      <td key={i} className="px-6 py-4 text-gray-800">
                        <ActionMenu />
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

export default Holiday;
