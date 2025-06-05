import React from "react";
import { FaPlus, FaRegEye, FaSearch } from 'react-icons/fa';
import { useMain } from "../../../hooks/UseMain";
import { useEffect, useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { toast } from "react-toastify";
import { DescriptionModal } from "../../../components/DescriptionModal";

const Assets = () => {
  const { getAssets, createAssets, allEmployee, updateAssets, getDepartments, getDesignations } = useMain();

  const [assets, setAsset] = useState([]);
  const [assetSearch, setAssetSearch] = useState("");
  const [showAction, setShowAction] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [department, setDepartment] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [editData, setEditData] = useState({});
  const [viewPop, setViewPop] = useState(false)
  const [formdata, setFormdata] = useState({
    Employee: "",
    designation: "",
    department: "",
    product: "",
    purchaseDate: "",
    description: "",
    id: "",
    status: ""
  })

  const getAllAsset = async () => {
    const ans = await getAssets();
    if (ans?.success) {
      setAsset(ans?.data);
    }
  };

  const fetchEmployee = async () => {
    const ans = await allEmployee();
    const activeEmployees = ans?.emp?.filter(emp => emp.isDeactivated === "No");
    setEmployee(activeEmployees);

  }

  const departmentCollect = async () => {
    const ans2 = await getDepartments();
    setDepartment(ans2?.data);

  }
  const designationCollect = async () => {
    const ans3 = await getDesignations();
    setDesignation(ans3?.data);

  }

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  const filterAssets = assets.filter((asset) => asset?.Employee?.toLowerCase()?.includes(assetSearch.toLowerCase()))

  const submitHandler = async (e) => {
    let toastId;
    if (formdata.Employee === '') {
      return toast.error('Please select the employee');
    }
    if (formdata.designation === '') {
      return toast.error('Please fill the designation');
    }
    if (formdata.department === '') {
      return toast.error('Please fill the department');
    }
    if (formdata.product.trim() === '') {
      setOpenForm(false);
      return toast.error('Please write the product name');
    }
    if (formdata.purchaseDate === '') {
      return toast.error('Please write the purchase date');
    }
    if (formdata.description.trim() === '') {
      setOpenForm(false);
      return toast.error('Please write the description');
    }
    toast.loading("Loading...");
    try {
      if (onEdit) {
        await updateAssets({ ...formdata });
        toast.success("update successfully");
        getAllAsset();
        setFormdata({})
        setOnEdit(false)
      }
      else {
        await createAssets({ ...formdata });
        toast.success("Successfuly Created");
        getAllAsset();
        setFormdata({})

      }
      setOpenForm(false);
    } catch (error) {
      console.log(error);
    }
    toast.dismiss(toastId);
  }

  const handleViewItem = (item) => {
    setFormdata({
      Employee: item?.Employee,
      designation: item?.designation,
      department: item?.department,
      product: item?.product,
      purchaseDate: item?.purchaseDate,
      description: item?.description,
      id: item?._id,
      status: item?.status
    });
    setViewPop(true);
  };

  const actionRef = useClickOutside(() => {
    setShowAction(null)
  })
  const popupForm = useClickOutside(() => {
    setOpenForm(false);
  })

  useEffect(() => {
    getAllAsset();
    fetchEmployee();
    departmentCollect();
    designationCollect();
  }, []);

  const theadData2 = [
    "EMPLOYEE",
    "DESIGNATION",
    "DEPARTMENT",
    "PRODUCT",
    "ASSIGNED DATE",
    "DESCRIPTION",
    "STATUS",
    "ACTION"
  ];


  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Assets Management</h1>
        </div>
        <button
          type="button"
          onClick={() => {
            setOpenForm(true)
            setOnEdit(false)
            setFormdata({
              Employee: "",
              designation: "",
              department: "",
              product: "",
              purchaseDate: "",
              description: "",
              id: "",
              status: ""
            })
          }}
          className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-fit"
        >
          <FaPlus className="text-white text-sm" />
          Add New
        </button>
      </div>



      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-4">

        <div className="bg-grey rounded-xl border-2  xl:col-span-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4">

            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">Assets</h3>
            </div>
            <div className="flex items-center border-2 border-[#D0D4DC] rounded-md px-4 py-2 w-full md:w-fit">
              <input
                type="text"
                value={assetSearch} onChange={(e) => setAssetSearch(e.target.value)}
                placeholder="Search Employee"
                className="flex-1 outline-none text-gray-600 placeholder-gray-400 bg-transparent pr-2"
              />
              <FaSearch className="text-gray-500" />
            </div>
          </div>
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
                {assets.length === 0 ? (
                  <tr>
                    <td
                      colSpan={theadData2.length}
                      className="text-center text-gray-400 px-6 py-4"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  filterAssets?.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                    >
                      <td key={i} className="px-6 py-4 text-gray-800">
                        {row?.Employee}
                      </td>
                      <td key={i} className="px-6 py-4 text-gray-800">
                        {row?.designation}
                      </td>

                      <td key={i} className="px-6 py-4 text-gray-800">
                        {row?.
                          department
                        }
                      </td>

                      <td key={i} className="px-6 py-4 text-gray-800">
                        {row?.product}
                      </td>

                      <td key={i} className="px-6 py-4 text-gray-800">
                        {row?.purchaseDate}
                      </td>
                      <td key={i} className="px-6 py-4 text-gray-800">
                        {row?.status}
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
                        <div className="relative">
                          <img className="cursor-pointer" onClick={() => setShowAction(showAction === i ? null : i)} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747027065/thredonts_ou496j.png" alt="" />

                          {
                            showAction === i && (
                              <div ref={actionRef}
                                className="absolute z-[1000] right-[15px] -top-[52px] w-[125px] bg-white border border-gray-200 shadow-lg flex flex-col"
                              >
                                <div onClick={() => handleViewItem(row)}
                                  className="items-center cursor-pointer w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 "                           >
                                  <FaRegEye />
                                  <span className="!text-[13px]">View</span>
                                </div>
                                <hr />

                                <div onClick={() => {
                                  setOnEdit(true);
                                  setEditData(row);
                                  setOpenForm(true);
                                  setShowAction(null);
                                  setFormdata({
                                    Employee: row?.Employee,
                                    designation: row?.designation,
                                    department: row.department,
                                    product: row.product,
                                    purchaseDate: row.purchaseDate,
                                    description: row.description,
                                    id: row?._id,
                                    status: row?.status
                                  })
                                }}
                                  className="items-center cursor-pointer w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 "                           >
                                  <svg
                                    width="16"
                                    height="13"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.71569 5.51667L10.4824 6.28333L2.93236 13.8333H2.16569V13.0667L9.71569 5.51667ZM12.7157 0.5C12.5074 0.5 12.2907 0.583333 12.1324 0.741667L10.6074 2.26667L13.7324 5.39167L15.2574 3.86667C15.5824 3.54167 15.5824 3.01667 15.2574 2.69167L13.3074 0.741667C13.1407 0.575 12.9324 0.5 12.7157 0.5ZM9.71569 3.15833L0.499023 12.375V15.5H3.62402L12.8407 6.28333L9.71569 3.15833Z"
                                      fill="#383838"
                                    />
                                  </svg>
                                  <span className="!text-[13px]">Edit</span>
                                </div>
                              </div>
                            )
                          }
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {viewPop && <DescriptionModal
        title="Details"
        data={Object.fromEntries(
          Object.entries(formdata).filter(([key]) => key !== "id")
        )}
        onClose={() => {
          setViewPop(false);
          setFormdata({});
        }}
      />}

      {openForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
              setOpenForm(false);
            }}
            ref={popupForm}
            className="bg-white max-w-3xl w-full p-6 rounded-2xl shadow-2xl space-y-6 relative"
          >
            <nav>
              <h2 className="text-2xl font-semibold text-gray-800">
                {onEdit ? "Edit Assets" : "Create New Assets"}
              </h2>
            </nav>

            <hr className="border-gray-300" />

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <label className="flex-1">
                  <p className="mb-1 text-sm font-medium text-gray-700">Employee</p>
                  <select
                    name="Employee"
                    id="Employee"
                    value={formdata.Employee}
                    onChange={changeHandler}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    {employee?.map((val, index) => (
                      <option key={index} value={val?.fullName}>
                        {val?.fullName}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex-1">
                  <p className="mb-1 text-sm font-medium text-gray-700">Designation</p>
                  <select
                    name="designation"
                    value={formdata.designation}
                    onChange={changeHandler}
                    required
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option>Select</option>
                    {designation?.map((val, index) => (
                      <option key={index} value={val?.name}>
                        {val?.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <label className="flex-1">
                  <p className="mb-1 text-sm font-medium text-gray-700">Department</p>
                  <select
                    name="department"
                    value={formdata.department}
                    onChange={changeHandler}
                    required
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option>Select</option>
                    {department?.map((val, index) => (
                      <option key={index} value={val?.name}>
                        {val?.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex-1">
                  <p className="mb-1 text-sm font-medium text-gray-700">Status</p>
                  <select
                    name="status"
                    value={formdata.status}
                    onChange={changeHandler}
                    required
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="Assigned">Assigned</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Returned">Returned</option>
                    <option value="Damaged">Damaged</option>
                  </select>
                </label>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <label className="flex-1">
                  <p className="mb-1 text-sm font-medium text-gray-700">Product</p>
                  <input
                    type="text"
                    name="product"
                    value={formdata.product}
                    onChange={changeHandler}
                    required
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </label>

                <label className="flex-1">
                  <p className="mb-1 text-sm font-medium text-gray-700">To Date</p>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={formdata.purchaseDate}
                    onChange={changeHandler}
                    required
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </label>
              </div>

              <label className="block">
                <p className="mb-1 text-sm font-medium text-gray-700">Description</p>
                <textarea
                  name="description"
                  value={formdata.description}
                  onChange={changeHandler}
                  rows="3"
                  required
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                ></textarea>
              </label>
            </div>

            <hr className="border-gray-300" />

            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {onEdit ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenForm(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    Employee: "",
                    designation: "",
                    department: "",
                    product: "",
                    purchaseDate: "",
                    description: "",
                  });
                }}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default Assets;