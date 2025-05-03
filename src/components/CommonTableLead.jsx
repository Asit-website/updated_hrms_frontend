
// import React from "react";

// const CommonTableLead = ({ theadData = [], tbodyData = [] }) => {
//   return (
//     <div className="w-full overflow-x-auto">
//       <table className=" w-full  border-gray-200 rounded-xl">
//         {/* Table Head */}
//         <thead className="bg-[white] text-gray-900 font-semibold text-sm">
//           <tr>
//             {theadData.map((head, idx) => (
//               <th key={idx} className="text-left py-3 px-4 border-b border-gray-200">
//                 {head}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         {/* Table Body */}
//         <tbody>
//           {tbodyData.length === 0 ? (
//             <tr>
//               <td colSpan={theadData.length} className="text-center py-4 text-gray-400">
//                 No data available
//               </td>
//             </tr>
//           ) : (
//             tbodyData.map((row, i) => (
//               <tr
//                 key={i}
//                 className={`hover:bg-[#f3f4f6] ${
//                   i % 2 === 1 ? "bg-white" : "bg-white"
//                 }`}
//               >
//                 {row.map((cell, j) => (
//                   <td key={j} className="py-3 px-4 text-gray-700 whitespace-nowrap">
//                     {theadData[j] === "Contact Name" ? (
//                       <div className="flex items-center gap-2">
//                         <img
//                           src={`https://i.pravatar.cc/40?img=${i + 10}`}
//                           alt="avatar"
//                           className="w-8 h-8 rounded-full object-cover"
//                         />
//                         <span>{cell}</span>
//                       </div>
//                     ) : (
//                       <span
//                         className={
//                           theadData[j] === "Subject"
//                             ? "text-green-600 font-medium"
//                             : theadData[j] === "Related To"
//                             ? "text-orange-500 font-medium"
//                             : ""
//                         }
//                       >
//                         {cell}
//                       </span>
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           )}
//         </tbody>
        
//       </table>
//       <div className="flex items-center justify-center gap-2 py-4">
//         {[1, 2, "...", 6, 7].map((num, idx) => (
//          <button
//            key={idx}
//            className={`px-3 py-1 rounded border text-sm ${
//              num === 1
//                ? "bg-blue-50 border-blue-500 text-blue-600 font-medium"
//                : "border-gray-300 text-gray-600 hover:bg-gray-100"
//           }`}
//          >
//            {num}
//          </button>
//      ))}
//       <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
//          Next &gt;        </button>
//       </div>   
//     </div>
//   );
// };

// export default CommonTableLead;

import React from "react";

const CommonTableLead = ({ theadData = [], tbodyData = [] }) => {
  return (
    <div className="w-full overflow-x-auto bg-white  border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-gray-700">
        {/* Table Head */}
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
                className="text-center py-4 text-gray-400"
              >
                No data available
              </td>
            </tr>
          ) : (
            tbodyData.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-gray-100 transition-colors"
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="py-3 px-4 border-b border-gray-100 whitespace-nowrap"
                  >
                    {theadData[j] === "Contact Name" ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://i.pravatar.cc/40?img=${i + 10}`}
                          alt="avatar"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{cell}</span>
                      </div>
                    ) : (
                      <span
                        className={
                          theadData[j] === "Subject"
                            ? "text-green-600 font-medium"
                            : theadData[j] === "Related To"
                            ? "text-orange-500 font-medium"
                            : ""
                        }
                      >
                        {cell}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 py-4">
        {[1, 2, "...", 6, 7].map((num, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 rounded border text-sm ${
              num === 1
                ? "bg-blue-50 border-blue-500 text-blue-600 font-medium"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {num}
          </button>
        ))}
        <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default CommonTableLead;

