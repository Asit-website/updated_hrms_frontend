import React, { useState, useEffect, useRef } from "react";

import "react-calendar/dist/Calendar.css";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import toast from "react-hot-toast";
import { useLocation, NavLink } from "react-router-dom";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useMain } from "../../../hooks/UseMain";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";


const HolidayHRM = () => {
  const {createHoliday, getHoliday, deleteHolidays, updateHolidays } = useMain();
  const [popup1, setPopup1] = useState(false);

  const [refreshFlag, setRefreshFlag] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [data, setData] = useState([]);
  const [showIndex, setShowIndex] = useState(null);
  const location = useLocation();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [formdata, setFormdata] = useState({
    holidayName: "",
    startDate: "",
    endDate: ""
  })


  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  const getData = async () => {
    const ans = await getHoliday();
    const reversedData = ans?.data?.slice().reverse();
    setData(reversedData);
  }

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        holidayName: editData.holidayName,
        startDate: editData.startDate,
        endDate: editData.endDate,
      })
    }
  }, [editData])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const toastId = toast.loading('Loading...')
      if (onEdit) {
        await updateHolidays({ ...formdata });
        setFormdata({});
        toast.success("update successfully");
        toast.dismiss(toastId);
        setRefreshFlag(!refreshFlag);

      }
      else {
        await createHoliday({ ...formdata });
        setEditData({});
        toast.success("Successfuly Created");
        setRefreshFlag(!refreshFlag);
        toast.dismiss(toastId);
      }
      setPopup1(false);
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
            const toastId = toast.loading('Loading...')
            await deleteHolidays(id);
            toast.success("Deleted Successfully");
            setRefreshFlag(!refreshFlag);
            getData();
            toast.dismiss(toastId);
          }
        },
        {
          label: 'Cancel',

          onClick: () => null
        }
      ]
    });

  };

  const wrapperRef = useRef();

  useOutsideClick(wrapperRef, () => {
    setShowIndex(null)
    setPopup1(false);
    setOnEdit(false);
    setEditData({});
    setFormdata({
      holidayName: "",
      startDate: "",
      endDate: ""
    })
  });

  useEffect(() => {
    getData();
  }, [refreshFlag])


  return (
    <>
      <div className="employee-dash h-full">
       

        <div className="w-full bg-[#f5f5f5] awardtm">
         

          <div className="relative w-full">
            <div className="flex-col">
              <div className="p-5 flex flex-col gap-5 bg-transparent adminmain">

            
                <div className="w-full flex justify-between items-center">
                  <div className="flex flex-col gap-[10px]">

                    {location.state ? (
                      <div className="flex gap-3 justify-center items-center">
                        <NavLink to={`/adminDash/HRM`}>
                          <span className="hover:text-[#1567FF] cursor-pointer text-xl">Dashboard</span>
                        </NavLink>
                        <span>
                          <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747743027/chevron_right_ztbdvq.png" alt="" />
                        </span>{" "}
                        <span className="text-[#1567FF] cursor-pointer">Manage Holiday</span>
                      </div>
                    ) : (<div className="anNavLeft">

                      <h2 className="text-[24px] text-center font-semibold mb-[6px]leading-[32px] lg:text-left text-[#101820]">Manage Holiday</h2>
                    </div>)}
                  </div>

                  <button
                    onClick={() => {
                      setPopup1(true);
                    }}
                    className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-fit mt-2"
                  >
                    Create Holiday
                  </button>
                </div>


                <div className="relative overflow-x-auto min-h-[250px] rounded-lg">
                  <table className="w-max lg:w-full text-sm text-left bg-white rounded-lg">

                    <thead className="bg-white font-semibold mb-[6px]">
                      <tr>

                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          OCCASION
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          START DATE
                        </th>
                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                          END DATE
                        </th>


                        <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap ">
                          ACTION
                        </th>

                      </tr>
                    </thead>

                    <tbody className="text-gray-700">
                      {data.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">

                          <td className="px-6 py-4 text-gray-800">{item?.holidayName}</td>
                          <td className="px-6 py-4 text-gray-800">
                            {item?.startDate}
                          </td>
                          <td className="px-6 py-4 text-gray-800">{item?.endDate}</td>

                          <div className="viewOnwWRAP">
                            <td

                              className="px-6 py-4 text-gray-800 cursor-pointer"
                            >
                              <div className="testok relative">
                                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747634200/acy_ah4jhd.svg" alt="" onClick={() => setShowIndex(showIndex === index ? null : index)} />

                                {
                                  showIndex === index && (
                                    <div ref={wrapperRef} className="absolute right-7 -top-12 bg-white border border-gray-400">
                                      <div onClick={() => {
                                        setOnEdit(true);
                                        setEditData(item);
                                        setPopup1(true)
                                      }} className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100">
                                        <MdOutlineEdit className="text-[18px]"/>
                                        <span>Edit</span>
                                      </div>
                                      <hr />

                                      <div onClick={() => {
                                        deleteProject(item?._id)
                                      }} className="items-center w-full px-4 py-2 text-sm flex gap-2 text-red-600 hover:bg-red-100">
                                        <MdDeleteOutline className="text-[18px]"/>
                                        <span>Delete</span>
                                      </div>
                                    </div>
                                  )
                                }

                              </div>
                            </td>



                          </div>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>


              </div>
            </div>
          </div>
        </div>

        {popup1 && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center h-screen z-[3000] backdrop-blur-[1px] py-[50px">
            <form onSubmit={(e)=>{
              submitHandler(e);
              setPopup1(false);
            }} ref={wrapperRef} className="max-w-[700px] w-full bg-white p-5 flex max-h-[550px] flex-col gap-[6px] rounded-[10px]">

              <div className="flex items-center justify-between" >

                <h2 className="text-[20px] font-medium leading-[30px] text-left text-black">{onEdit ? 'Edit Holiday' : 'Create New Holiday'}</h2>
               
              </div>



              <hr />

              <div className="flex flex-col gap-5 pr-2.5 mt-3">

               <div className="flex items-center gap-5 w-full">

                  <label htmlFor="holidayName" className="Resig-employ block text-gray-700 mb-1 w-full">
                    <p className="text-[12px] sm:text-[14px] md:text-[16px] font-semibold mb-[6px]  leading-[18px] tracking-[0.0015em] text-left ">Occasion</p>
                    <input
                    className="ml-[3px] w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text" name="holidayName" required value={formdata?.holidayName} onChange={changeHandler} />
                  </label>


                </div>

                <div className="flex items-center gap-5 w-full">
                  <label htmlFor="startDate" className="block text-gray-700 mb-1 w-[50%]">
                    <p className="text-[12px] sm:text-[14px] md:text-[16px] font-semibold mb-[6px]  leading-[18px] tracking-[0.0015em] text-left ">Start Date</p>
                    <input
                      type="date"
                      name="startDate"
                      value={formdata?.startDate}
                      required
                      onChange={changeHandler}
                      className="ml-[3px] w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label htmlFor="endDate" className="block text-gray-700 mb-1 w-[50%]">
                    <p className="text-[12px] sm:text-[14px] md:text-[16px] font-semibold mb-[6px]  leading-[18px] tracking-[0.0015em] text-left ">End Date</p>
                    <input
                      type="date"
                      name="endDate"
                      value={formdata?.endDate}
                      required
                      onChange={changeHandler}
                      min={formdata?.startDate}
                      className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>

                </div>

              </div>


              <div className="w-full flex items-center gap-4 justify-start py-5 Award-popup-btn">
                <button onClick={() => {
                  setPopup1(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    holidayName: "",
                    startDate: "",
                    endDate: ""
                  })
                  console.log(formdata, editData)
                }} className="w-[86px] h-[40px] rounded-[5px] opacity-50 border border-black awd-cancel">
                  Cancel
                </button>

                <button type="submit" className="w-[70px] h-[40px] rounded-[5px] bg-[#1566FF] text-white awd-create" >
                  <span>{onEdit ? "Update" : "Create"}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </>
  );
};

export default HolidayHRM;
