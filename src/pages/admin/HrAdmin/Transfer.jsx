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
    allEmp,
    allBranch,
    allDep
  } = useMain();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const fields = [
    {
      name: "Employee",
      label: "Employee",
      type: "select",
      options: allEmp?.map((emp) => ({
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

    if (res.status) {
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

  const theadData = ["EMPLOYEE", "BRANCH", "DEPARTMENT", "TRANSFER DATE", "DESCRIPTION", "ACTION"];

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
                  transfer.map((row, i) => (
                    <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">{row?.Employee}</td>
                      <td className="px-6 py-4">{row?.branch}</td>
                      <td className="px-6 py-4">{row?.Department}</td>
                      <td className="px-6 py-4">{row?.TransferDate}</td>
                      <td className="px-6 py-4">
                        {row?.Description?.length > 30
                          ? row.Description.slice(0, 30) + "..."
                          : row.Description}
                      </td>
                      <td className="px-6 py-4">
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
