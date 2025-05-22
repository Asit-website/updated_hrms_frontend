
import CommonTable from "../../../components/CommonTable";

import ActionMenu from "../../../components/ActionMenu";
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useMain } from "../../../hooks/UseMain";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ModalForm from "../../../components/ModalForm";

const Promotion = () => {


  const { getPromotion,allEmp, promotion, updatePromotion,  createPromotion } = useMain();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
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
    if (!promotion?.length) {
      getPromotion()
    }
  }, []);
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
    // {
    //   name: "Designation",
    //   label: "Designation",
    //   type: "select",
    //  options: allEmp?.map((emp) => ({
    //     value: emp?.fullName,
    //     label: emp?.fullName,
    //   })),
    
    //   ...(isEdit && { defaultValue: editData?.Designation }),
    // },
      {
      name: "promotionTitle",
      label: "Promotion Title",
      type: "text",
     
      ...(isEdit && { defaultValue: editData?.promotionTitle}),
    },
    {
      name: "date",
      label: "Promotion date",
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
  const theadData2 = [
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
      console.log(editData?._id)
      res = await updatePromotion({
        id: editData._id,
        employee: data.employee,
      promotionTitle:data.promotionTitle,
        date: data.date,
      Designation:data.Designation,
        description: data.description,
       
      })
    } else {
      res = await  createPromotion(data);
    }

    if (res.status) {
      await getPromotion();
      toast.success(`Promotion ${isEdit ? "updated" : "created"} for ${data.employee}`);
    } else {
      toast.error(`Failed to ${isEdit ? "update" : "create"} Promotion for ${data.employee}`);
    }

    setIsEdit(false);
    setEditData(null);
    toast.dismiss(toastId);
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
                  promotion?.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                    >
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
                      <td key={i} className="px-6 py-4 text-gray-800">
                        <ActionMenu options={buttonOptions}/>
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
              title={isEdit ? 'Edit Award' : 'Create New Award'}
      
            />
    </div>
  );
};

export default Promotion;