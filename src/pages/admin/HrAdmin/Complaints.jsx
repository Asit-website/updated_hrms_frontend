import React from "react";
import { toast } from "react-toastify";
import ActionMenu from "../../../components/ActionMenu";
import { useMain } from "../../../hooks/UseMain";
import { useEffect, useState } from "react";
import ModalForm from "../../../components/ModalForm";
import { confirmAlert } from "react-confirm-alert";


const Complaints = () => {
    const { getComplain, complain, updateComplain,allEmp,deleteComplain } = useMain();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const buttonOptions = (item) => [
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
                let res = await deleteComplain(item?._id);
                if (res.success) {
                  await getComplain();
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

  ];

  const fields = [
    {
      name: "complaintForm",
      label: "Complaint Form",
      type: "select",
      options: allEmp?.map((emp) => ({
        value: emp?.fullName,
        label: emp?.fullName,
      })),
      ...(isEdit && { defaultValue: editData?.complaintForm })
    }

    ,
    {
          name: " complainAgain",
      label: "Complaint Against",
      type: "select",
      options: allEmp?.map((emp) => ({
        value: emp?.fullName,
        label: emp?.fullName,
      })),
      ...(isEdit && { defaultValue: editData?. complainAgain })
    },
 {
      name: "title",
      label: "Title",
      type: "text",
     
      ...(isEdit && { defaultValue: editData?.title}),
    },
    
    {
      name: " complainDate",
      label: "Complaint Date",
      type: "date",
      ...(isEdit && { defaultValue: editData?. complainDate}),
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
    if (!complain.length) {
      getComplain();
    }
  }, []);

  const theadData2 = [
    "COMPLAIN FROM",
    "COMPLAIN TO",
    "TITLE",
    "	COMPLAIN DATE",
    "DESCRIPTION",
    "ACTION"
  ];
  const handleFormSubmit = async (data) => {
    const toastId = toast.loading("Loading...");
    let res;

    if (isEdit && editData?._id) {
      console.log(editData?._id)
      res = await updateComplain({
        id: editData._id,
       complaintForm: data.complaintForm,
        complainAgain: data. complainAgain,
        complainDate: data. complainDate,
       
        description: data.description,
       
      })
    } else {
      res = await  updateComplain(data);
    }

    if (res.status) {
      await getComplain();
      toast.success(`complain ${isEdit ? "updated" : "created"} for ${data.employee}`);
    } else {
      toast.error(`Failed to ${isEdit ? "update" : "create"} Complain for ${data.employee}`);
    }

    setIsEdit(false);
    setEditData(null);
    toast.dismiss(toastId);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Manage Complain</h1>
        </div>
        <button
          type="button"
             onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-fit mt-2"
        >

          Create Complain
        </button>
      </div>



      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-4">



        <div className="bg-grey rounded-xl border-2  xl:col-span-2">
          <hr />
          <div className="w-full overflow-x-scroll xl:overflow-x-hidden rounded-lg">
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
                {complain.length === 0 ? (
                  <tr>
                    <td
                      colSpan={theadData2.length}
                      className="text-center text-gray-400 px-6 py-4"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  complain?.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-6 py-4 text-gray-800">
                        {row?.complainFrom}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {row?.complainAgain}
                      </td>

                      <td className="px-6 py-4 text-gray-800">
                        {row?.
                          title
                        }
                      </td>

                      <td className="px-6 py-4 text-gray-800">
                        {row?.complainDate}
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
                      <td className="px-6 py-4 text-gray-800 absolute">
                        <ActionMenu options={buttonOptions(row)} className="relative"/>
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
              title={isEdit ? 'Edit Award' : 'Create New Complain'}
      
            />
    </div>
  );
};

export default Complaints;