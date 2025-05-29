import React from 'react';
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMain } from '../../../hooks/UseMain';




const Indicator = () => {

  const user1 = JSON.parse(localStorage.getItem("hrms_user"));

  const { user, createIndicator, getIndicator, deleteIndicator, updateIndicator, getBranchs, getDepartments, getDesingation } = useMain();

  const [openForm, setOpenForm] = useState(false);


  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const [branch, setBranch] = useState([]);
  const [department, setDepartment] = useState([]);
  const [designation, setDesignation] = useState([]);

  const [formdata, setFormdata] = useState({
    Branch: "",
    Department: "",
    Designation: "",
    businessProcessRating: "",
    projectManagemntRating: ""
  });


  const getData = async () => {
    const ans = await getIndicator();
    setData(ans?.data);
    setRefreshFlag(!refreshFlag);
  }

  useEffect(() => {
    getData();
  }, [refreshFlag])

  useEffect(() => {
    getData1();
  }, [refreshFlag])

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const getData1 = async () => {
    const ans = await getBranchs();
    const ans1 = await getDepartments();
    setBranch(ans?.data);
    setDepartment(ans1?.data);
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
            await deleteIndicator(id);
            toast.success("delete Successfully");
            setRefreshFlag(!refreshFlag);
            getData();
          }
        },
        {
          label: 'Cancel',

          onClick: () => null
        }
      ]
    });

  };

  const changeHandler = (e) => {
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
        Branch: editData.Branch,
        Department: editData.Department,
        Designation: editData.Designation,
        businessProcessRating: editData.businessProcessRating,
        projectManagemntRating: editData.projectManagemntRating
      })
    }
  }, [editData])

  const submitHandler = async (e) => {
    // e.preventDefault();
    try {
      if (onEdit) {
        const ans = await updateIndicator({ ...formdata });
        console.log(ans.data);
        toast.success("update successfully");
        setRefreshFlag(!refreshFlag);
      }
      else {
        const ans = await createIndicator({ ...formdata });
        toast.success("Successfuly Created");
        setRefreshFlag(!refreshFlag);
      }
      setOpenForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  const getDepartmentId = (name) => {
    const depart = department.find(dep => dep.name === name);
    return depart ? depart._id : null; // Return department ID if found, otherwise null
  };


  const [currView, setCurrView] = useState(-1);


  const designationFetch = async () => {

    const departmentId = getDepartmentId(formdata.Department);

    const ans2 = await getDesingation({ id: departmentId });

    setDesignation(ans2?.data);

  }

  useEffect(() => {

    if (formdata.Department !== "" && formdata.Department !== "Select Department")
      designationFetch();
  }, [formdata.Department])

  return (
    <>
      <div className="annDash relative bg-[#f5f5f5] h-full">

        <div className="w-full bg-[#f5f5f5]">
        
          <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full">

            <div className='w-full flex items-center justify-between'>

              {/* left sie */}
              <div className='flex flex-col gap-2'>

                <h2 className='text-[24px] font-semibold leading-[32px] text-left text-[#101820]'>Performance Setup</h2>

              </div>

            </div>


            <main className='bg-white flex flex-col mt-5 px-5 py-[10px]'>

              {/* top */}
              <div className='flex items-center justify-between overflow-x-scroll gap-2 xl:overflow-x-hidden'>
                {/* left side */}
                <div className='text-[#1B2533] text-[16px] font-medium leading-[24px] tracking-[0.0015em] text-left flex items-center gap-[10px] min-w-fit'>
                  Manage Indicator
                </div>

                {/* right side  */}
                <div className='p-[8px_16px] gap-2 rounded-[10px] bg-white border border-[#D0D4DC] flex items-center min-w-fit'>
                  <input className='text-[#666D76] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left' type="text" placeholder='Search Employee' />
                  <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748516357/bx-search_rjqqfr.png" alt="" />
                </div>
              </div>


              <div className="w-full overflow-x-auto rounded-lg">

                <table className="min-w-full text-sm text-left bg-white rounded-lg">

                  <thead className="bg-white font-semibold">
                    <tr>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        BRANCH
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        DEPARTMENT
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        DESIGNATION
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        OVERALL RATING
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        ADDED BY
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        CREATED AT
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {
                      data?.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">

                          <td className="px-6 py-4 inditd">
                            {item.Branch}
                          </td>
                          <td className="px-6 py-4 inditd">
                            {item.Department}
                          </td>
                          <td className="px-6 py-4 inditd">
                            {item.Designation}
                          </td>
                          <td className="px-6 py-4 inditd">
                            {(item?.businessProcessRating) + (item?.projectManagemntRating)}
                          </td>

                          <td className="px-6 py-4 inditd">
                            {user1?.createdBy}
                          </td>
                          <td className="px-6 py-4 inditd">
                            {new Date(Number(item?.ts)).toLocaleDateString()}
                          </td>

                        
                          <td onClick={() => {
                            if (index == currView) {
                              setCurrView(-1);
                            }
                            else {
                              setCurrView(index)
                            }
                          }} className="px-6 py-4 relative taskAns cursor-pointer">
                            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747813854/actions_nwb36s.png" alt="" />

                            {
                              index == currView &&

                              <div className="viewOne2">

                                {/* second */}
                                <div onClick={() => {
                                  setOnEdit(true);
                                  setEditData(item);
                                  setOpenForm(true)
                                }} className="subView">
                                  <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748516393/edit22_mcmt66.png" alt="" />
                                  <p>Edit </p>
                                </div>

                                <hr />


                                {/* third */}
                                <div onClick={() => {
                                  deleteProject(item?._id)
                                }} className="subView">
                                  <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748516421/deletedd_thxu0o.svg" alt="" />
                                  <p className="deel">Delete </p>
                                </div>
                              </div>

                            }
                          </td>



                        </tr>
                      ))
                    }



                  </tbody>

                </table>


              </div>


            </main>

          </div>
        </div>

        {/* form  */}
        {
          openForm &&
          <div className='annFormwrap'>

            <form onSubmit={() => {
              submitHandler();
              setOpenForm(false);
            }} className='openform' >

              <nav>
                {/* left  */}
                <h2>Create New Indicator</h2>
                <img onClick={() => {
                  setOpenForm(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    Branch: "",
                    Department: "",
                    Designation: "",
                    businessProcessRating: "",
                    projectManagemntRating: ""
                  })
                }} className='cursor-pointer' src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748516524/crossAn_mqvfca.png" alt="" />
              </nav>

              <hr />

              <div className="allInputFileds">

                <label htmlFor="" className='fullLabel' >
                  <p>Branch</p>
                  <select name="Branch" value={formdata.Branch} onChange={changeHandler} id="">
                    <option value="Select Branch" >Select Branch</option>
                    {
                      branch?.map((val, index) => {
                        return <option key={index} value={val?.name}>{val?.name}</option>
                      })
                    }
               
                  </select>
                </label>

                <label className='halfLabel' >
                  <p>Department</p>
                  <select name="Department" value={formdata.Department} onChange={(e) => {
                    changeHandler(e);

                  }} >

                    <option value="Select Department" >Select Department</option>
                   
                    {
                      department?.map((val, index) => {
                        return <option key={index} value={val?.name}>{val?.name}</option>
                      })
                    }

                  </select>
                </label>

                <label className='halfLabel' >
                  <p>Designation</p>
                  <select name="Designation" value={formdata.Designation} onChange={changeHandler} id="">
                    <option value="Select Designation" >Select Designation</option>
                   
                    {
                      designation?.map((val, index) => {
                        return <option key={index} value={val?.name}>{val?.name}</option>
                      })
                    }
                  </select>
                </label>

                <label className='anotheLabel' >
                  <h2>Behavioural Competencies</h2>
                  <hr />
                  <div className='anWrap'>
                    {/* left  */}
                    <p>Business Process</p>
                    <div className='rating'>
                      

                      <input name='businessProcessRating' value={formdata.businessProcessRating} className='overall' onChange={changeHandler} type="number" placeholder='Overall rating out of 5' />

                    </div>
                  </div>
                </label>

                <label className='anotheLabel' >
                  <h2>Organizational Competencies</h2>
                  <hr />
                  <div className='anWrap'>
                    {/* left  */}
                    <p>Project Management</p>
                    <div className='rating'>
                     
                      <input name='projectManagemntRating' value={formdata.projectManagemntRating} className='overall' onChange={changeHandler} type="number" placeholder='Overall rating out of 5' />

                    </div>
                  </div>
                  
                </label>



              </div>

              <hr />

              <div className="createBtn">
                <button type='button' onClick={() => {
                  setOpenForm(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    Branch: "",
                    Department: "",
                    Designation: "",
                    businessProcessRating: "",
                    projectManagemntRating: ""
                  })
                }} className='cancelBtn'>Cancel</button>
                <button type='submit' className='creteBtn'>{onEdit ? "Update" : "Create"}</button>
              </div>


            </form>
          </div>
        }

      </div>
    </>
  )
}

export default Indicator;