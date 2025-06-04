import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import CommonTable from "../../../components/CommonTable";
import ModalForm from "../../../components/ModalForm";
import ActionMenu from "../../../components/ActionMenu";
import { useMain } from "../../../hooks/UseMain";

const Transfer = () => {
  const {
    getTransfer,
    createTransfer,
    deleteTransfer,
    updateTransfer,
    transfer,
    allActiveEmployee,
    allBranch,
    allDep
  } = useMain();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 5;
  const totalPages = Math?.ceil(transfer?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, transfer?.length);
  const currentItems = transfer?.slice(startIndex, endIndex);

  const filteredData = transfer.filter((item) =>
    item?.Employee.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const fields = [
    {
      name: "Employee",
      label: "Employee",
      type: "select",
      options: allActiveEmployee?.map((emp) => ({
        value: emp?.fullName,
        label: emp?.fullName,
      })),
      ...(isEdit && { defaultValue: editData?.Employee }),
    },
    {
      name: "branch",
      label: "Branch",
      type: "select",
      options: allBranch?.map((b) => ({
        value: b?.name,
        label: b?.name,
      })),
      ...(isEdit && { defaultValue: editData?.branch }),
    },
    {
      name: "Department",
      label: "Department",
      type: "select",
      options: allDep?.map((d) => ({
        value: d?.name,
        label: d?.name,
      })),
      ...(isEdit && { defaultValue: editData?.Department }),
    },
    {
      name: "TransferDate",
      label: "Transfer Date",
      type: "date",
      ...(isEdit && { defaultValue: editData?.TransferDate }),
    },
    {
      name: "Description",
      label: "Description",
      type: "textarea",
      fullWidth: true,
      placeholder: "Enter Description",
      ...(isEdit && { defaultValue: editData?.Description }),
    },
  ];

  const handleFormSubmit = async (data) => {
    const toastId = toast.loading("Loading...");
    let res;

    if (isEdit && editData?._id) {
      res = await updateTransfer({
        id: editData._id,
        ...data
      });
    } else {
      res = await createTransfer(data);
    }

    if (res?.success || res?.status === 200 || res?.data?.success) {
      await getTransfer();
      toast.success(`Transfer ${isEdit ? "updated" : "created"} for ${data.Employee}`);
    } else {
      toast.error(`Failed to ${isEdit ? "update" : "create"} transfer for ${data.Employee}`);
    }

    setIsEdit(false);
    setEditData(null);
    setIsModalOpen(false);
    toast.dismiss(toastId);
  };

  useEffect(() => {
    if (!transfer?.length) {
      getTransfer();
    }
  }, []);

  const theadData = ["SR/NO.", "EMPLOYEE", "BRANCH", "DEPARTMENT", "TRANSFER DATE", "DESCRIPTION", "ACTION"];

  const buttonOptions = (item) => [
    {
      label: "Edit",
      icon: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260260/Vector_zah5tt.svg",
      onClick: () => {
        setIsEdit(true);
        setEditData(item);
        setIsModalOpen(true);
      },
    },
    {
      label: "Delete",
      icon: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260280/delete_sgefhv.png",
      danger: true,
      onClick: () => {
        confirmAlert({
          title: "Are you sure to delete this data?",
          message: "All related data to this will be deleted",
          buttons: [
            {
              label: "Yes, Go Ahead!",
              style: { background: "#FF5449" },
              onClick: async () => {
                let res = await deleteTransfer(item?._id);
                if (res.success) {
                  await getTransfer();
                  toast.success("Deleted successfully");
                }
              },
            },
            {
              label: "Cancel",
              onClick: () => null,
            },
          ],
        });
      },
    },
  ];

  return (
    <div className="p-6">
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

      <div className="flex flex-col sm:flex-row justify-between items-start">
        <h1 className="text-2xl font-semibold">Manage Transfer</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
        >
          Create Transfer
        </button>
      </div>

      <div className="w-60">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-4">
        <div className="bg-grey rounded-xl border-2 xl:col-span-2">
          <hr />
          <div className="w-full overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-left bg-white rounded-lg">
              <thead className="bg-white font-semibold">
                <tr>
                  {theadData.map((head, idx) => (
                    <th key={idx} className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transfer?.length === 0 ? (
                  <tr>
                    <td colSpan={theadData.length} className="text-center text-gray-400 px-6 py-4">
                      No data available
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((row, i) => (
                    <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                      <td className="px-6 py-4">{row?.Employee}</td>
                      <td className="px-6 py-4">{row?.branch}</td>
                      <td className="px-6 py-4">{row?.Department}</td>
                      <td className="px-6 py-4">{row?.TransferDate}</td>
                      <td className="px-6 py-4">
                        {row?.Description?.length > 30
                          ? row.Description.slice(0, 30) + "..."
                          : row.Description}
                      </td>
                      <td className="px-6 py-4 absolute">
                        <ActionMenu options={buttonOptions(row)} className="relative" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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

      <ModalForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
          setIsEdit(false);
        }}
        onSubmit={handleFormSubmit}
        fields={fields}
        title={isEdit ? "Edit Transfer" : "Create New Transfer"}
      />
    </div>
  );
};

export default Transfer;
