import React from "react";
import CommonTable from "../../../components/CommonTable";
import ActionMenu from "../../../components/ActionMenu";
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useMain } from "../../../hooks/UseMain";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalForm from "../../../components/ModalForm";
import { confirmAlert } from "react-confirm-alert";

const Promotion = () => {


  const { getPromotion, allActiveEmployee, promotion,deletePromotion, updatePromotion, createPromotion, getDesignations, allDesignations } = useMain();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 5;
  const totalPages = Math?.ceil(promotion?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, promotion?.length);
  const currentItems = promotion?.slice(startIndex, endIndex);

  const filteredData = promotion.filter((item) =>
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

  useEffect(() => {
    if (!promotion?.length) {
      getPromotion()
    }
    if (!allDesignations.length) {
      getDesignations();
    }
  }, []);

  const fields = [
    {
      name: "Employee",
      label: "Employee",
      type: "select",
      options: allActiveEmployee?.map((emp) => ({
        value: emp?.fullName,
        label: emp?.fullName,
      })),
      ...(isEdit && { defaultValue: editData?.Employee })
    },
    {
      name: "Designation",
      label: "Designation",
      type: "select",
      options: allDesignations?.map((item) => ({
        value: item?.name,
        label: item?.name,
      })),
      ...(isEdit && { defaultValue: editData?.Designation })
    },
    {
      name: "title",
      label: "Promotion Title",
      type: "text",

      ...(isEdit && { defaultValue: editData?.title }),
    },
    {
      name: "promotionDate",
      label: "Promotion date",
      type: "date",
      ...(isEdit && { defaultValue: editData?.promotionDate }),
    }, {
      name: "description",
      label: "Description",
      type: "textarea",
      fullWidth: true,
      placeholder: "Enter Description",
      ...(isEdit && { defaultValue: editData?.description }),
    }
  ];

  const theadData2 = [
    "SR/NO.",
    "EMPLOYEE",
    "DESIGNATION",
    "PROMOTION TITLE",
    "PROMOTION DATE",
    "DESCRIPTION",
    "ACTION"
  ];

  const handleFormSubmit = async (data) => {
    const toastId = toast.loading("Loading...");
    let res;

    if (isEdit && editData?._id) {
      res = await updatePromotion({
        id: editData._id,
        Employee: data.Employee,
        title: data.title,
        promotionDate: data.promotionDate,
        Designation: data.Designation,
        description: data.description,

      })
    } else {
      res = await createPromotion(data);
    }

    if (res?.success || res?.status === 200 || res?.data?.success) {
      await getPromotion();
      toast.success(`Promotion ${isEdit ? "updated" : "created"} for ${data.employee}`);
    } else {
      toast.error(`Failed to ${isEdit ? "update" : "create"} Promotion for ${data.employee}`);
    }

    setIsEdit(false);
    setEditData(null);
    toast.dismiss(toastId);
  };

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
            await deletePromotion(id);
            toast.success("Deleted Successfully");
            getPromotion();
          }
        },
        {
          label: 'Cancel',

          onClick: () => null
        }
      ]
    });

  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Manage Promotion</h1>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-fit mt-2"
        >

          Create Promotion
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
                {promotion.length === 0 ? (
                  <tr>
                    <td
                      colSpan={theadData2.length}
                      className="text-center text-gray-400 px-6 py-4"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  paginatedData?.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                    >
                      <td key={i} className="px-6 py-4 text-gray-800">
                        {(currentPage - 1) * itemsPerPage + i + 1}
                      </td>
                      <td key={i} className="px-6 py-4 text-gray-800">
                        {row?.Employee}
                      </td>
                      <td key={i} className="px-6 py-4 text-gray-800">
                        {row?.Designation}
                      </td>

                      <td key={i} className="px-6 py-4 text-gray-800">
                        {row?.
                          title
                        }
                      </td>

                      <td key={i} className="px-6 py-4 text-gray-800">
                        {row?.promotionDate}
                      </td>


                      <td key={i} className="px-6 py-4 text-gray-800">
                        {row?.
                          description
                          ?.length > 30 ? row?.
                            description
                            ?.slice(0, 30) : row?.
                          description
                        }
                      </td>
                      <td key={i} className="px-6 py-4 text-gray-800 absolute">
                        <ActionMenu
                          options={[
                            {
                              label: 'Edit',
                              icon: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260260/Vector_zah5tt.svg',
                              onClick: () => {
                                setEditData(row);
                                setIsEdit(true);
                                setIsModalOpen(true);
                              },
                            },
                            {
                              label: 'Delete',
                              icon: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260280/delete_sgefhv.png',
                              danger: true,
                              onClick: () => deleteProject(row?._id),
                            },
                          ]}
                        />

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

      {/* ModalForm call */}
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditData(null); setIsEdit(false)
        }}
        onSubmit={handleFormSubmit}
        fields={fields}
        title={isEdit ? 'Edit Promotion' : 'Create Promotion'}

      />
    </div>
  );
};

export default Promotion;