import React, { useState } from "react";
import ActionMenu from "../../../components/ActionMenu";
import { useMain } from "../../../hooks/UseMain";
import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { useClickOutside } from "../../../hooks/useClickOutside";


const Termination = () => {
  const { getTermination, allActiveEmployee, termination, deleteTermination, updateTermination, createTermination, allEmployee } = useMain();

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 5;
  const totalPages = Math?.ceil(termination?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, termination?.length);
  const currentItems = termination?.slice(startIndex, endIndex);

  const filteredData = termination.filter((item) =>
    item.Employee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate filtered announcements
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const theadData2 = [
    "SR/NO.",
    "EMPLOYEE NAME",
    "TERMINATION TYPE",
    "NOTICE DATE",
    "TERMINATION DATE",
    "DESCRIPTION",
    "ACTION"
  ];

  const [refreshFlag, setRefreshFlag] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [viewPop, setViewPop] = useState(false);

  const [formdata, setFormdata] = useState({
    Employee: "",
    type: "",
    noticeDate: "",
    terminationDate: "",
    description: "",
  })

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        Employee: editData.Employee,
        type: editData.type,
        noticeDate: editData.noticeDate,
        terminationDate: editData.terminationDate,
        description: editData.description
      })
    }
  }, [editData])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      if (onEdit) {
        await updateTermination({ ...formdata });
        toast.success("update successfully");
        getTermination();
        setRefreshFlag(!refreshFlag);
      }
      else {
        await createTermination({ ...formdata });
        toast.success("Successfuly Created");
        getTermination();
        setRefreshFlag(!refreshFlag);
      }
      setViewPop(false);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProject = async (id) => {
    confirmAlert({
      title: 'Are you sure to delete this data?',
      message: 'All related data to this will be deleted',
      buttons: [
        {
          label: 'Yes, Go Ahead!',
          style: {
            background: "#FF5449"
          },
          onClick: async () => {
            await deleteTermination(id);
            toast.success("Deleted Successfully");
            setRefreshFlag(!refreshFlag);
            getTermination();
          }
        },
        {
          label: 'Cancel',

          onClick: () => null
        }
      ]
    });

  };

  const popupRef = useClickOutside(() => {
    setViewPop(false);
  })

  useEffect(() => {
    if (!termination.length) {
      getTermination();
    }
    if (!allActiveEmployee.length) {
      allEmployee();
    }
  }, []);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row sm:flex-item justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Manage Termination</h1>
        </div>
        <button
          onClick={() => {
            setOnEdit(false);
            setFormdata({})
            setViewPop(true);
          }}
          type="button"
          className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-fit mt-2"
        >


          Create Termination
        </button>
      </div>

      <div className="w-60">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-4 text-gray-700 bg-white border-2 border-[#D0D4DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        />

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
                {termination.length === 0 ? (
                  <tr>
                    <td
                      colSpan={theadData2.length}
                      className="text-center text-gray-400 px-6 py-4"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  paginatedData?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-6 py-4 text-gray-800">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {item?.Employee}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {item?.type}
                      </td>

                      <td className="px-6 py-4 text-gray-800">
                        {item?.noticeDate
                        }
                      </td>

                      <td className="px-6 py-4 text-gray-800">
                        {item?.terminationDate}
                      </td>


                      <td className="px-6 py-4 text-gray-800">
                        {item?.
                          description
                          ?.length > 30 ? item?.
                            description
                            ?.slice(0, 30) : item?.
                          description
                        }
                      </td>
                      <td className="px-6 py-4 text-gray-800 absolute">
                        <ActionMenu options={[
                          {
                            label: 'Edit',
                            icon: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260260/Vector_zah5tt.svg',
                            onClick: () => {
                              setOnEdit(true);
                              setEditData(item);
                              setViewPop(true);
                            },
                          },
                          {
                            label: 'Delete',
                            icon: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260280/delete_sgefhv.png',
                            danger: true,
                            onClick: () => deleteProject(item._id),
                          },
                        ]} className="relative" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {viewPop && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <form
            onSubmit={(e) => {
              submitHandler(e);
              setViewPop(false);
            }}
            ref={popupRef}
            className="bg-white max-w-2xl w-full rounded-xl shadow-lg p-6 overflow-y-auto max-h-[90vh] space-y-6"
          >
            <div className="text-left">
              <h2 className="text-2xl font-semibold text-gray-800">
                {onEdit ? 'Edit' : 'Create New'} Termination
              </h2>
              <hr className="mt-4 border-gray-300" />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-1">Employee</span>
                  <select
                    name="Employee"
                    value={formdata?.Employee}
                    required
                    onChange={changeHandler}
                    className="border rounded-md px-3 py-2 text-sm"
                  >
                    <option>Select Employee</option>
                    {allActiveEmployee?.map((val, index) => (
                      <option key={index} value={val.fullName}>
                        {val.fullName}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-1">Termination Type</span>
                  <select
                    name="type"
                    value={formdata?.type}
                    required
                    onChange={changeHandler}
                    className="border rounded-md px-3 py-2 text-sm"
                  >
                    <option>Voluntary</option>
                    <option>Involuntary</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-1">Notice Date</span>
                  <input
                    type="date"
                    name="noticeDate"
                    required
                    value={formdata?.noticeDate}
                    onChange={changeHandler}
                    className="border rounded-md px-3 py-2 text-sm"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-1">Termination Date</span>
                  <input
                    type="date"
                    name="terminationDate"
                    required
                    value={formdata?.terminationDate}
                    onChange={changeHandler}
                    className="border rounded-md px-3 py-2 text-sm"
                  />
                </label>
              </div>
              <div>
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-1">Description</span>
                  <textarea
                    name="description"
                    value={formdata?.description}
                    onChange={changeHandler}
                    required
                    rows="5"
                    className="border rounded-md px-3 py-2 text-sm resize-none"
                    placeholder="Enter Description"
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setViewPop(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    Employee: "",
                    type: "",
                    noticeDate: "",
                    terminationDate: "",
                    description: "",
                  });
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                {onEdit ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}


      {totalPages > 1 && (<div className="flex items-center gap-[10px] justify-center mt-[20px]">
        <button
          className={`w-[100px] h-[40px] gap-[10px] rounded-[10px] border border-[#D8D8D8] bg-white text-[#2B2B2B] text-[12px] font-medium leading-[16px] tracking-[0.004em] text-center ${currentPage !== 1 && "transition-all duration-300 hover:bg-[#2B2B2B] hover:text-white"
            } disabled:bg-gray-200`}
          onClick={() => {
            handlePageChange(currentPage - 1);
            scrollToTop();
          }}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-[#2B2B2B] font-inter text-[12px] font-normal leading-[16px] tracking-[0.004em] text-left">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`w-[100px] h-[40px] gap-[10px] rounded-[10px] border border-[#D8D8D8] bg-white text-[#2B2B2B] text-[12px] font-medium leading-[16px] tracking-[0.004em] text-center ${currentPage !== totalPages && "transition-all duration-300 hover:bg-[#2B2B2B] hover:text-white"
            } disabled:bg-gray-200`}
          onClick={() => {
            handlePageChange(currentPage + 1);
            scrollToTop();
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>)}
    </div>
  );
};

export default Termination;