import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  allLead,
  allowancePerms,
  assetPerms,
  dashboardPerms,
  expensePerms,
  hrmsSetupPerms,
  leadSystem,
  otherPerms,
  payrollPerms,
  payslipPerms,
  ProjectCreate,
  taskPerms,
  permissionProvide,
} from "./data";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useMain } from "../../../hooks/UseMain";

const PermissionDetail = () => {
  const { AllRolesapi, ProvidePermission, UpdatePermission } = useMain();

  let hrms_user = JSON?.parse(localStorage.getItem("hrms_user"));
  const { role } = hrms_user;

  const navigate = useNavigate();

  const [roleName, setRoleName] = useState({
    name: "",
  });

  const [ setAllRoles] = useState([]);

  const fetchAllRoles = async () => {
    const ans = await AllRolesapi();
    setAllRoles(ans?.data);
  };

  const location = useLocation();

  const item = location.state;

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setRoleName((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [selectLead, setSelectLead] = useState([]);

  const applyPermission = async () => {
    console.log("click");

    const ans = await ProvidePermission({
      name: roleName?.name,
      Service: selectLead,
    });
    console.log("anssss",ans)

    // toast.success("Successfuly done");
    navigate("/adminDash/Permission");
    // toast.dismiss(toastId);
  };

  const udpatePermision = async () => {
    if (roleName?.name === "") {
      return toast.error("Please Enter the name");
    }
    const toastId = toast.loading("Loading...");

    const ans = await UpdatePermission({
      name: roleName?.name,
      Service: selectLead,
      roleId: item?._id,
    });

    if (ans?.status) {
      toast.success("Successfuly Updated");
      navigate("/adminDash/Permission");
    }

    toast.dismiss(toastId);
  };

  useEffect(() => {
    fetchAllRoles();
  }, []);

  const handleSelect = (id) => {
    setSelectLead((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((leadId) => leadId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event, categoryArray) => {
    if (event.target.checked) {
      setSelectLead((prevSelected) => [
        ...prevSelected,
        ...categoryArray
          .map((item) => item.id)
          .filter((id) => !prevSelected.includes(id)),
      ]);
    } else {
      setSelectLead((prevSelected) =>
        prevSelected.filter(
          (id) => !categoryArray.some((item) => item.id === id)
        )
      );
    }
  };

  const renderCategory = (category, title) => (
    <div className="flex flex-col w-full max-w-[325px] h-[260px] overflow-y-scroll relative gap-[10px] rounded-[10px] border border-t-[3px] border-t-[#3595F6] bg-white pl-4 pr-4 pb-4">
      <div className="flex items-center justify-start gap-[10px] sticky top-0 left-0 py-2 w-full bg-white">
        <input
          type="checkbox"
          checked={category.every((item) => selectLead.includes(item.id))}
          onChange={(e) => handleSelectAll(e, category)}
        />
        <h2 className="text-[20px] font-semibold leading-[24px] tracking-[0.0015em] text-left text-[#1B2533]">
          {title}
        </h2>
        <hr />
      </div>

      <div className="flex flex-col gap-[10px]">
        {category.map((item) => (
          <div key={item.id} className="flex !items-center gap-[20px]">
            <input
              type="checkbox"
              checked={selectLead.includes(item.id)}
              onChange={() => handleSelect(item.id)}
            />
            <span className="text-[16px] font-normal leading-[24px] tracking-[0.0015em] text-left text-[#1B2533]">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    if (item) {
      setRoleName({ name: item.name });

      const truePermissions = Object.keys(item).filter(
        (key) => item[key] === true
      );
      setSelectLead(truePermissions);
    }
  }, [item]);

  return (
    <>
      <div className="flex bg-[#f0f6ff] min-h-screen relative h-full">
        <div className="w-full bg-[#f5f5f5]">
          <div className="w-full relative pt-[32px] pr-[20px] pb-[32px] pl-[20px] flex flex-col gap-[30px]">
            <div className="flex items-center justify-between sticky left-0 top-0">
              <h1 className="text-[24px] font-semibold text-[#111827] leading-6">
                {item ? "Edit Role" : "Create Role"}
              </h1>

              <div className="flex items-center gap-[10px] mr-[20px]">
                <NavLink to="/adminDash/Permission">
                  <button className="flex gap-2 items-center bg-[#2563eb] text-white text-[16px] font-medium px-4 py-[6px] rounded-md hover:bg-blue-700">
                    Back
                  </button>
                </NavLink>
              </div>
            </div>

            <label htmlFor="" className="block text-md font-normal mb-1">
              <p className="text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left text-[#1B2533]">
                Name
              </p>
              <input
                className="w-full border rounded p-2 text-sm font-normal "
                type="text"
                value={roleName.name}
                name="name"
                onChange={changeHandler}
              />
            </label>

            <div className="flex flex-wrap gap-[20px]">
              {renderCategory(allLead, "Lead")}
              {renderCategory(ProjectCreate, "Project")}
              {renderCategory(leadSystem, "Lead System")}
              {renderCategory(taskPerms, "Task")}
              {renderCategory(hrmsSetupPerms, "HRMS setup")}
              {renderCategory(assetPerms, "Assets")}
              {renderCategory(allowancePerms, "Allowance")}
              {renderCategory(expensePerms, "Expense")}
              {renderCategory(payrollPerms, "Payroll")}
              {renderCategory(dashboardPerms, "Dashboard ")}
              {renderCategory(payslipPerms, "Payslip ")}
              {renderCategory(otherPerms, "Others")}
              {renderCategory(permissionProvide, "Permission Page")}
            </div>

            <button
              onClick={() => {
                if (item) {
                  udpatePermision();
                } else {
                  applyPermission();
                }
              }}
              className="w-fit mx-auto px-[10px] py-[5px] bg-[#0B56E4] border border-[#0B56E4] rounded-[10px]"
            >
              <span className="text-[16px] font-medium leading-[24px] tracking-[0.005em] text-white">
                {item ? "Update" : "Create"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PermissionDetail;
