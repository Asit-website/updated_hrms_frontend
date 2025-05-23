
import CommonTable from "../../../components/CommonTable";

import ActionMenu from "../../../components/ActionMenu";
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useMain } from "../../../hooks/UseMain";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ModalForm from "../../../components/ModalForm";
import { confirmAlert } from "react-confirm-alert";

const Resignation = () => {

  const { getResignation,allEmp, resignation, createResignation,deleteResignation, updateResignation } = useMain();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const buttonOptions =(item) => [
    {
      label: 'Edit',
      icon: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260260/Vector_zah5tt.svg',
      onClick: () => {
        console.log(item);
        setIsEdit(true);
        setEditData(item);
        setIsModalOpen(true);
      },
    },
    {
      label: 'Delete',
      icon: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260280/delete_sgefhv.png',
      danger: true,
          onClick: () => {
            console.log(item);
            confirmAlert({
              title: "Are you sure to delete this data?",
              message: "All related data to this will be deleted",
              buttons: [
                {
                  label: "Yes, Go Ahead!",
                  style: {
                    background: "#FF5449",
                  },
                  onClick: async () => {
                    let res = await deleteResignation(item?._id);
                    if (res.success) {
                      await getResignation();
                      toast.success("Deleted successfully");
                      setRefreshFlag(!refreshFlag);
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
        }
  ]
  const handleFormSubmit = async (data) => {
    const toastId = toast.loading("Loading...");
    let res;

    if (isEdit && editData?._id) {
      console.log(editData?._id)
      res = await updateResignation({
        id: editData._id,
        employee: data.employee,
        NoticeDate: data.NoticeDate,
        date: data.date,
        description: data.description,

      })
    } else {
      res = await createResignation(data);
    }

    if (res.status) {
      await getResignation();
      toast.success(`Resignation ${isEdit ? "updated" : "created"} for ${data.employee}`);
    } else {
      toast.error(`Failed to ${isEdit ? "update" : "create"} Resignation for ${data.employee}`);
    }

    setIsEdit(false);
    setEditData(null);
    toast.dismiss(toastId);
  };

   const fields = [
    {
      name: "employee",
      label: "Employee",
      type: "select",
      options: allEmp?.map((emp) => ({
        value: emp?.fullName,
        label: emp?.fullName,
      })),
      ...(isEdit && { defaultValue: editData?.employee })
    }

    ,
    {
      name: "NoticeDate",
      label: "Notice-date",
      type: "date",
      disabled: false,
      ...(isEdit && { defaultValue: editData?.NoticeDate }),
    },
    {
      name: "date",
      label: "Resignation Date",
      type: "date",
      ...(isEdit && { defaultValue: editData?.date }),
    },
  
    {
      name: "description",
      label: "Description",
      type: "textarea",
      fullWidth: true,
      placeholder: "Enter Description",
      ...(isEdit && { defaultValue: editData?.description }),
    },
  ];

  useEffect(() => {
    if (!resignation.length) {
      getResignation()
    }
    // getAllAResignation();
  }, []);
  const theadData2 = [
    "EMPLOYEE",
    "RESIGNATION DATE",
    "LAST WORKING DAY",

    "DESCRIPTION",
    "ACTION"
  ];


  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Manage Resignation</h1>
        </div>
        <button
          type="button"
           onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-fit mt-2"
        >

          Create Resignation
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
                {resignation.length === 0 ? (
                  <tr>
                    <td
                      colSpan={theadData2.length}
                      className="text-center text-gray-400 px-6 py-4"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  resignation?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                    >
                      <td  className="px-6 py-4 text-gray-800">
                        {item?.Employee}
                      </td>
                      <td  className="px-6 py-4 text-gray-800">
                        {item?.resignationDate}
                      </td>

                      <td  className="px-6 py-4 text-gray-800">
                        {item?.noticeDate}
                      </td>



                      <td  className="px-6 py-4 text-gray-800">
                        {item?.description?.length > 30 ? item?.description?.slice(0, 30) : item?.description}
                      </td>
                      <td  className="px-6 py-4 text-gray-800">
                        <ActionMenu options={buttonOptions(item)}/>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
            {/* ModalForm call */}
            <ModalForm
              isOpen={isModalOpen}
              onClose={() => {setIsModalOpen(false)
                setEditData(null); setIsEdit(false)
              }}
              onSubmit={handleFormSubmit}
              fields={fields}
              title={isEdit ? 'Edit Resignation' : 'Create New Resignation'}
      
            />
    </div>
  );
};

export default Resignation;