import React from "react";
const CommonTable = ({ theadData = [], tbodyData = [] }) => {
  // console.log(tbodyData)
  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table className="min-w-full text-sm text-left bg-white rounded-lg">
        <thead className="bg-white font-semibold">
          <tr>
            {theadData.map((head, idx) => (
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
          {tbodyData.length === 0 ? (
            <tr>
              <td
                colSpan={theadData.length}
                className="text-center text-gray-400 px-6 py-4"
              >
                No data available
              </td>
            </tr>
          ) : (
            tbodyData?.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
              >
                {console.log(row)}
                {Object.values(row).map((cell, j) => (
                  <td key={j} className="px-6 py-4 text-gray-800">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
