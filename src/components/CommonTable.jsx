import React from "react";
import { Gift } from 'lucide-react';
const CommonTable = ({ theadData = [], tbodyData = [] }) => {
  return (
   <>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm min-h-72">
          <thead>
            <tr className="border-b border-gray-200 flex justify-between">
              {theadData.map((head, idx) => (
                <th
                  key={idx}
                  className="text-left font-bold text-gray-900 py-2 px-4 min-w-fit"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="min-h-10">
            {tbodyData.length === 0 ? (
              <tr>
                <td
                  colSpan={theadData.length}
                  className="text-center text-gray-400"
                >
                  No data available
                </td>
              </tr>
            ) : (
              tbodyData.map((row, i) => (
                <tr key={i} className="border-b border-gray-100">
                  {row.map((cell, j) => (
                    <td key={j} className="py-2 px-4 text-gray-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
          </table>
      </div>
   </>
  );
};

export default CommonTable;
