import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import { useMain } from "../../../hooks/UseMain";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";



const Permission = () => {
  const { AllRolesapi, DeleteRoleApi } = useMain();

  let hrms_user = JSON?.parse(localStorage.getItem("hrms_user"));
  const { role } = hrms_user;


  const navigate = useNavigate();

  const [allRoles, setAllRoles] = useState([]);

  const fetchAllRoles = async () => {
    const ans = await AllRolesapi();
    setAllRoles(ans?.data);
  }

  const [showIndex, setShowIndex] = useState(null);
  const deleteProject = async (id) => {
    setShowIndex(null);
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
            await await DeleteRoleApi(id);
            toast.success("delete Successfully");
            await fetchAllRoles();


          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });
  };

  const wrapperRef = useRef();
  
  useOutsideClick(wrapperRef, () => {
    setShowIndex(null)

  });
  useEffect(() => {
    fetchAllRoles();
  }, [])

  return (
    <>
      <div className="flex bg-[#f0f6ff] relative min-h-screen h-full">
       
        <div className="w-full bg-[#f5f5f5]">
          

          <div className="w-full relative mt-[40px] px-[20px]  pb-[32px] pl-[20px] flex flex-col gap-[30px]">

            <div className="flex items-center justify-between sticky left-0 top-0">
              <h1 className="text-[24px] font-semibold text-[#111827] leading-6">Roles</h1>
             
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 sm:mr-[20px]">
  <NavLink to="/adminDash/HRM">
    <button className="w-[138px] h-[40px] rounded-[10px] bg-[#0B56E4] border border-[#0B56E4]">
      <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-white">
        Back
      </span>
    </button>
  </NavLink>

  <button
    className="w-[150px] h-[40px] rounded-[10px] bg-[#0B56E4] border border-[#0B56E4]"
    onClick={() => {
      if (role === "ADMIN") {
        navigate("/adminDash/PermissionDetail");
      } else {
        navigate("/employeeDash/PermissionDetail");
      }
    }}
  >
    <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-white">
      Create New Role
    </span>
  </button>
</div>


            </div>

            <div className="relative overflow-x-auto  w-full border rounded-xl border-gray-300 shadow-sm overflow-hidden">

              <table className="w-full text-sm text-gray-700 bg-white">

                <thead className="font-semibold">
                  <tr>

                    <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                      SN.
                    </th>
                    <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                      NAME
                    </th>
                    <th scope="col" className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                      ACTION
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {
                    allRoles?.map((roles, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">

                        <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                        <td className="px-6 py-4 text-gray-800">{roles?.name}</td>
                        <td className="px-6 py-4 text-gray-800">
                          <div
                            onClick={() => {
                              if (showIndex === index) {
                                setShowIndex(null);
                              } else {
                                setShowIndex(index);
                              }
                            }}
                            className="navdiv cursor-pointer relative"
                          >
                            {" "}
                            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746769960/thredonts_lnqxqd.png" alt="action" />
                            {showIndex === index && (
                            <div ref={wrapperRef} className="absolute z-[1000] right-[335px] -top-[55px] w-[140px] bg-white border border-gray-200 shadow-lg flex flex-col">

                              {/* Edit Button */}
                              <div
                                onClick={() => navigate("/adminDash/PermissionDetail", { state: roles })}
                                className="items-center w-full px-4 py-2 text-sm flex gap-2 text-gray-700 hover:bg-gray-100 "
                              >
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260260/Vector_zah5tt.svg"
                                  alt="Edit Icon"
                                 

                                />
                                <span className="text-sm font-medium text-gray-700">Edit</span>
                              </div>

                              <hr className="border-gray-200" />

                              {/* Delete Button */}
                              <div
                                onClick={() => {
                                  deleteProject(roles?._id);
                                }}
                                className="items-center w-full px-4 py-2 text-sm flex gap-2 text-red-600 hover:bg-red-100"
                              >
                                <img
                                  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260280/delete_sgefhv.png"
                                  alt="Delete Icon"
                                
                                />
                                <span className="text-sm font-medium">Delete</span>
                              </div>
                            </div>
                          )}
                          </div>
                          

                        </td>



                      </tr>

                    ))
                  }


                </tbody>

              </table>
            </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default Permission;


