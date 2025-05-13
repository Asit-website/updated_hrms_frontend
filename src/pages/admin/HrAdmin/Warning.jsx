
import CommonTable from "../../../components/CommonTable";

import ActionMenu from "../../../components/ActionMenu";
import { useMain } from "../../../hooks/UseMain";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import ModalForm from "../../../components/ModalForm";
import { confirmAlert } from "react-confirm-alert";


const Warning = () => {


  const { getWarning, warning, updateWarning, deleteWarning, createWarning, allEmp } = useMain();
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
                let res = await deleteWarning(item?._id);
                if (res.success) {
                  await getWarning();
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
  ]
  const fields = [
    {
      name: "warningBy",
      label: "Warning By",
      type: "select",
      options: allEmp?.map((emp) => ({
        value: emp?.fullName,
        label: emp?.fullName,
      })),
      ...(isEdit && { defaultValue: editData?.warningBy })
    },
    {
      name: "warningTo",
      label: "Warning To",
      type: "select",
      options: allEmp?.map((emp) => ({
        value: emp?.fullName,
        label: emp?.fullName,
      })),
      ...(isEdit && { defaultValue: editData?.warningTo })
    }

    ,
    {
      name: "subject",
      label: "Subject",
      type: "text",
      disabled: false,
      ...(isEdit && { defaultValue: editData?.subject }),
    },
    {
      name: "warningDate",
      label: "Warning Date",
      type: "date",
      ...(isEdit && { defaultValue: editData?.warningDate }),
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
  const handleFormSubmit = async (data) => {
    const toastId = toast.loading("Loading...");
    let res;

    if (isEdit && editData?._id) {
      console.log(editData?._id)
      res = await updateWarning({
        id: editData._id,
        subject: data.subject,
        warningBy: data.warningBy,
        warningTo: data.warningTo,
        warningDate: data.warningDate,
        description: data.description,
      })
    } else {
      res = await createWarning(data);
    }

    if (res.statusCode === 200) {
      await getWarning();
      toast.success(`Award ${isEdit ? "updated" : "created"} for ${data.Employee}`);
    } else {
      toast.error(`Failed to ${isEdit ? "update" : "create"} award for ${data.Employee}`);
    }

    setIsEdit(false);
    setEditData(null);
    toast.dismiss(toastId);
  };

  useEffect(() => {
    if (!warning.length) {
      getWarning()
    }
  }, []);
  const theadData2 = [
    "WARNING BY",
    "WARNING TO",
    "SUBJECT",
    "WARNING DATE",
    "DESCRIPTION",


    "ACTION"
  ];


  return (
    <div className="p-6">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        closeButton
      />
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Manage Warning</h1>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-fit"
        >

          Create Warning
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
                {warning.length === 0 ? (
                  <tr>
                    <td
                      colSpan={theadData2.length}
                      className="text-center text-gray-400 px-6 py-4"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  warning?.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-6 py-4 text-gray-800">
                        {row?.warningBy}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {row?.warningTo}
                      </td>

                      <td className="px-6 py-4 text-gray-800">
                        {row?.subject
                        }
                      </td>

                      <td className="px-6 py-4 text-gray-800">
                        {row?.warningDate}
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
                      <td className="px-6 py-4 text-gray-800">
                        <ActionMenu options={buttonOptions(row)} />
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
        onClose={() => {
          setIsModalOpen(false)
          setEditData(null); setIsEdit(false)
        }}
        onSubmit={handleFormSubmit}
        fields={fields}
        title={isEdit ? 'Edit Award' : 'Create New Award'}

      />
    </div>
  );
};

export default Warning;