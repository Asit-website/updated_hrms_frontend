import React, { useState, useEffect } from 'react';
import { deleteReq, get, post, postDocuments, put } from '../Api/api';
import MainContext from './MainContext';

const baseUrl = "https://my-backend-blond.vercel.app";
const MainState = (props) => {
   const [user, setUser] = useState(null);
   const [flag, setFlag] = useState(false);
   const [chatUser, setChatUser] = useState({});
   const [loading, setLoading] = useState(false);
   const [awards, setAwards] = useState(null);
   const [transfer, setTransfer] = useState([]);
   const [resignation, setResignation] = useState([]);
   const [promotion, setPromotion] = useState([]);
   const [complain, setComplain] = useState([]);
   const [warning, setWarning] = useState([]);
   const [termination, setTermination] = useState([]);
   const [holiday, setHoliday] = useState([]);
   const [announcement, setAnnouncement] = useState([]);
   const [allEmp, setAllEmp] = useState([]);
   const [allDep, setAllDep] = useState([]);
   const [allBranch, setBranch] = useState([]);


   const login = async ({ email, employeeCode, password }) => {
      setLoading(true)

      const data = await post(`${baseUrl}/auth/login`, { email, employeeCode, password }, false);
      setUser(data?.user)
      setLoading(false)
      return data;
   };

    const getUpcomingBirthdays = async () => {
      const data = await get(`${baseUrl}/task/getUpcomingBirthdays`, true);
      console.log("Upcoming Birthdays:", data);
      return data;
   }

   const employeeLogin = async ({ email, password }) => {
      const data = await post(`${baseUrl}/user/login`, { email, password }, false);
      return data;
   };

   const clientLogin = async (email, password) => {
      setLoading(true);
      const data = await post(`${baseUrl}/task/clientLogin`, {
         Email: email,
         Password: password
      }, false);

      console.log("Login Response:", data);
      setLoading(false)
      return data;
   }

   const getClientProject = async (id) => {
      const data = await get(`${baseUrl}/latest_project/getProjectsByClientId/${id}`, true); // Pass true if authentication is needed
      console.log("Client Projects:", data);
      return data;
   }

   // todo
   const employeeResetPassword = async ({ email, password }) => {
      const data = await post(`${baseUrl}/user/resetPassword`, {}, false);
      return data;
   };

   const hrLogin = async ({ email, password }) => {
      const data = await post(`${baseUrl}/hr/login`, { email, password }, false);
      return data;
   };

   const createHr = async ({ fullName, password, department, gmail, reportingManager, designation, joiningDate, email, email1, mobile, gender, dob, pan, adhar, father, currentAddress, currentState, currentCity, currentPin, residence, perState, perCity, perPin, Martial, nationality, Mother, qualification, specialization, qualificationType, yearPass, university, college, percentage, previousCompany, previousDesignation, toDate, fromDate, numberOfMonth, Jobdescription, SalaryPay, SalaryBankName, BeneficiaryName, BankIfsc, AccountNumber, confirmAccount, Branch, employeeCode, }) => {
      const data = await post(`${baseUrl}/admin/createHr`, {
         fullName,
         password,
         department,
         gmail,
         reportingManager,
         designation,
         joiningDate,
         email,
         email1,
         mobile,
         gender,
         dob,
         pan,
         adhar,
         father,
         currentAddress,
         currentState,
         currentCity,
         currentPin,
         residence,
         perState,
         perCity,
         perPin,
         Martial,
         nationality,
         Mother,
         employeeCode,
         qualification,
         specialization,
         qualificationType,
         yearPass,
         university,
         college,
         percentage,
         previousCompany,
         previousDesignation,
         toDate,
         fromDate,
         numberOfMonth,
         Jobdescription,
         SalaryPay,
         SalaryBankName,
         BeneficiaryName,
         BankIfsc,
         AccountNumber,
         confirmAccount,
         Branch
      }, true);
      return data;
   };

   const getHrs = async () => {
      const data = await post(`${baseUrl}/hr/getHrs`, true);
      return data;
   };

   const deleteHr = async () => {
      const data = await deleteReq(`${baseUrl}/hr/deleteHr`, true);
      return data;
   };

   const createEmployee = async ({ fullName, password, department, employeeId, gmail, reportingManager, designation, joiningDate, email, email1, mobile, gender, dob, pan, adhar, father, currentAddress, currentState, currentCity, currentPin, residence, perState, perCity, perPin, Martial, nationality, Mother, employeeCode, qualification, specialization, qualificationType, yearPass, university, college, percentage, previousCompany, previousDesignation, toDate, fromDate, numberOfMonth, Jobdescription, SalaryPay, SalaryBankName, BeneficiaryName, BankIfsc, AccountNumber, confirmAccount, Branch }) => {
      const data = await post(`${baseUrl}/hr/createUser`, {
         fullName,
         password,
         department,
         employeeId,
         gmail,
         reportingManager,
         designation,
         joiningDate,
         email,
         email1,
         mobile,
         gender,
         dob,
         pan,
         adhar,
         father,
         currentAddress,
         currentState,
         currentCity,
         currentPin,
         residence,
         perState,
         perCity,
         perPin,
         Martial,
         nationality,
         Mother,
         employeeCode,
         qualification,
         specialization,
         qualificationType,
         yearPass,
         university,
         college,
         percentage,
         previousCompany,
         previousDesignation,
         toDate,
         fromDate,
         numberOfMonth,
         Jobdescription,
         SalaryPay,
         SalaryBankName,
         BeneficiaryName,
         BankIfsc,
         AccountNumber,
         confirmAccount,
         Branch
      }, true);
      return data;
   };

   const createEmployee1 = async ({ fullName, password, department, employeeId, gmail, reportingManager, designation, joiningDate, email, email1, mobile, gender, dob, pan, adhar, father, currentAddress, currentState, currentCity, currentPin, residence, perState, perCity, perPin, Martial, nationality, Mother, employeeCode, qualification, specialization, qualificationType, yearPass, university, college, percentage, previousCompany, previousDesignation, toDate, fromDate, numberOfMonth, Jobdescription, SalaryPay, SalaryBankName, BeneficiaryName, BankIfsc, AccountNumber, confirmAccount, Branch, adharCard, formData, employeeType, PermissionRole }) => {


      const data = await post(`${baseUrl}/admin/createUser1`, { fullName, password, department, employeeId, gmail, reportingManager, designation, joiningDate, email, email1, mobile, gender, dob, pan, adhar, father, currentAddress, currentState, currentCity, currentPin, residence, perState, perCity, perPin, Martial, nationality, Mother, employeeCode, qualification, specialization, qualificationType, yearPass, university, college, percentage, previousCompany, previousDesignation, toDate, fromDate, numberOfMonth, Jobdescription, SalaryPay, SalaryBankName, BeneficiaryName, BankIfsc, AccountNumber, confirmAccount, Branch, adharCard, employeeType, PermissionRole }, true);

      const id = data?.data?._id;

      if (formData) {

         const resp = await postDocuments(`${baseUrl}/user/uploadDocument/${id}`, formData);

      }

      return data;

   };

   const uploadSingleImage = async (formData) => {
      const resp = await postDocuments(`${baseUrl}/user/uploadSingleImg`, formData);
      return resp;

   }

   const getUsers = async (userId) => {
      const data = await get(`${baseUrl}/user/getUsers?userId=${userId}`, true);

      return data;
   };

   const getActiveUsers = async (userId) => {
      const data = await get(`${baseUrl}/user/getActiveUsers`, true);
      return data;
   };

   const changeStatusBreak = async ({ isBreakIn, userId }) => {
      const data = await post(`${baseUrl}/user/changeBreakin`, { isBreakIn, userId }, true);
      return data;
   }

   const getActiveUsersCount = async (userId) => {
      const data = await get(`${baseUrl}/user/getActiveUsersCount?userId=${userId}`, true);
      // console.log(data);
      return data;
   };

   const getEmployees = async (userId) => {
      const data = await get(`${baseUrl}/hr/getUsers?userId=${userId}`, true);
      return data;
   };

   const getAdminEmployees = async (userId) => {
      const data = await get(`${baseUrl}/admin/getAdminEmployees?userId=${userId}`, true);
      return data;
   };

   const getEmployeesByEmployee = async () => {
      const data = await get(`${baseUrl}/user/getEmployeesByEmployee`, true);
      return data;
   };

   const getAllActivities = async () => {

      const data = await get(`${baseUrl}/clock/allAttendence`, true);

      return data;



   };

   const getMonthlyWorkingHours = async (month, year, user) => {
      // console.log(month, year, user);
      const query = `?month=${month}&year=${year}&user=${user}`;
      const data = await get(`${baseUrl}/clock/getMonthlyWorkingHours${query}`, false);
      return data;
   }



   const getAllActivities2 = async (type, date, month, userId, department, year) => {

      const data = await post(`${baseUrl}/clock/attendencedetail`, { type, date, month, userId, department, year }, true);

      return data;
   };
   const getCheckInActivity = async (userId) => {
      const data = await get(`${baseUrl}/activity/getActivity/${userId}`, true);
      return data;
   };

   const postActivity = async ({ clockIn, clockOut, late, overtime, total, message = '', date1, todayTask, clockInTime }) => {

      const data = await post(`${baseUrl}/activity/postActivity`, { clockIn, clockOut, date1, late, overtime, total, message, todayTask, clockInTime }, true);
      return data;
   };

   const postActivityHr = async ({ date, activity, breaks, overtime, hours }) => {
      const data = await post(`${baseUrl}/activity/postActivityHr`, { date, activity, breaks, overtime, hours }, true);
      return data;
   };

   const getActivitiesByUser = async (date, month, year, page, perPage, userId) => {
      if (date && date.includes('undefined')) {
         date = '';
      }

      const data = await get(`${baseUrl}/activity/getActivitiesByUser?date=${date}&month=${month}&year=${year}&perPage=${perPage}&page=${page}&userId=${userId}`, true);
      return data;
   };

   const getStatisticsByUser = async (userId) => {
      const data = await get(`${baseUrl}/activity/getStatisticsByUser?userId=${userId}`, true);
      return data;
   };

   const getAllTaskUser = async () => {
      const data = await get(`${baseUrl}/task/FetchAllTask`, true);
      return data;
   };

   // this is  for leave post

   const postLeave = async ({ type, from, to, days, reason }) => {

      const data = await post(`${baseUrl}/leave/postLeave`, { type, from, to, days, reason }, true);
      return data;
   };
   const postHalfDay = async ({ from, to, days, reason }) => {

      const data = await post(`${baseUrl}/leave/halfday`, { from, to, days, reason }, true);
      return data;
   };


   // end 

   const updateLeave = async ({ id, type, from, to, days, reason, employeeName }) => {

      const data = await put(`${baseUrl}/leave/updateLeave/${id}`, { type, from, to, days, reason, employeeName }, true);
      return data;
   };

   const getUserLeaves = async () => {
      const data = await get(`${baseUrl}/leave/getUserLeaves`, true);
      return data;
   };
   const FetchMyLeave = async () => {
      let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
      const data = await get(`${baseUrl}/leave/fetchUserLeaves/${hrms_user?._id}`, true);
      return data;
   };
   const getUserHalfDay = async () => {
      const data = await get(`${baseUrl}/leave/getUserHalfDay`, true);
      return data;
   };

   const getUserLeaveById = async (id) => {
      const data = await get(`${baseUrl}/leave/getUserLeaveById/${id}`, true);
      return data;
   };

   const deleteLeave = async (id) => {

      const data = await deleteReq(`${baseUrl}/leave/deleteLeave/${id}`, true);
      return data;
   };

   const getTotalLeaves = async () => {
      const data = await get(`${baseUrl}/totalLeave/getTotalLeaves`, true);
      return data;
   };

   const getTotalLeavesCount = async () => {
      const data = await get(`${baseUrl}/leave/getToalLeaveCount`, true);
      return data;
   }

   const postTotalLeaves = async ({ totalLeaves }) => {
      const data = await post(`${baseUrl}/totalLeave/postTotalLeaves`, { totalLeaves }, true);
      return data;
   };

   const getProjects = async (projectName, employeeName, page, perPage, id) => {
      const data = await get(`${baseUrl}/project/getProjects?projectName=${projectName}&employeeName=${employeeName}&page=${page}&perPage=${perPage}&projectId=${id}`, true);
      return data;
   };

   const getProjectsByEmployee = async (page, perPage, query) => {
      const data = await get(`${baseUrl}/project/getProjectsByEmployee?page=${page}&perPage=${perPage}&query=${query}`, true);
      return data;
   };

   const postProject = async ({ projectName, client, startDate, endDate, price, priority, projectLeader, teamMembers, description }) => {
      const data = await post(`${baseUrl}/project/postProject`, { projectName, client, startDate, endDate, price, priority, projectLeader, teamMembers, description }, true);
      return data;
   };

   const updateProject = async ({ _id, projectName, client, startDate, endDate, price, priority, projectLeader, teamMembers, status, description }) => {
      const data = await put(`${baseUrl}/project/updateProject/${_id}`, { projectName, client, startDate, endDate, price, priority, projectLeader, teamMembers, status, description }, true);
      return data;
   };

   const deleteProject = async ({ id }) => {
      const data = await deleteReq(`${baseUrl}/project/deleteProject/${id}`, true);
      return data;
   };

   const getHolidays = async () => {
      const data = await get(`${baseUrl}/holiday/getHolidays`, true);
      return data;
   };

   const postHoliday = async ({ holidayName, holidayDate }) => {
      const data = await post(`${baseUrl}/holiday/postHoliday`, { holidayName, holidayDate }, true);
      return data;
   };

   const updateHoliday = async ({ _id, holidayName, holidayDate }) => {
      console.log(_id, holidayName, holidayDate);
      const data = await put(`${baseUrl}/holiday/updateHoliday/${_id}`, { holidayName, holidayDate }, true);
      console.log(data);
      return data;
   };

   const deleteHoliday = async ({ id }) => {
      const data = await post(`${baseUrl}/holiday/deleteHoliday/${id}`, true);
      return data;
   };

   const verify = async (role) => {
      const data = await post(`${baseUrl}/verify`, { role }, true);
      return data;
   };

   const verifyEmployee = async () => {
      const data = await post(`${baseUrl}/verify/employee`, {}, true);
      return data;
   };

   const verifyHr = async () => {
      const data = await post(`${baseUrl}/verify/hr`, {}, true);
      return data;
   };

   const verifyAdmin = async () => {
      const data = await post(`${baseUrl}/verify/admin`, {}, true);
      return data;
   };
   const acceptassetsapi = async (assetId) => {
      const data = await post(`${baseUrl}/admin/acceptassetsapi`, { assetId }, true);
      return data;
   };

   const getTasks = async () => {
      const data = await get(`${baseUrl}/task/getTasks`, true);
      return data;
   };

   const postTask = async ({ name, time }) => {
      const data = await post(`${baseUrl}/task/postTask`, { name, time }, true);
      return data;
   };

   const updateTask = async ({ id, status }) => {
      const data = await put(`${baseUrl}/task/updateTask/${id}`, { status }, true);
      return data;
   };

   const deleteTask = async ({ id }) => {
      const data = await deleteReq(`${baseUrl}/task/deleteTask/${id}`, true);
      return data;
   };

   const forgetPassword = async ({ email, employeeCode }) => {
      setLoading(true);
      const data = await post(`${baseUrl}/user/forgetPassword`, { email, employeeCode }, false);
      setLoading(false);
      return data;
   };

   const forgetPassword1 = async ({ email, otp }) => {
      setLoading(true);
      const data = await post(`${baseUrl}/user/forgetPasswordVerifyOTP`, { email, otp }, false);
      setLoading(false);
      return data;
   };

   const forgetPassword2 = async ({ email, password, otp }) => {
      setLoading(true);
      const data = await post(`${baseUrl}/user/resetPassword`, { email, newPassword: password, otp }, false);
      setLoading(false);
      return data;
   };

   const changePassword = async ({ oldPassword, currentPassword }) => {
      const data = await post(`${baseUrl}/user/changePassword`, { oldPassword, currentPassword }, true);
      return data;
   };

   const changePassword1 = async ({ oldPassword, currentPassword }) => {
      const data = await post(`${baseUrl}/auth/changePassword`, { oldPassword, currentPassword }, true);
      return data;
   };

   const updateProfile = async (
      {
         fullName,
         mobile,
         email,
         email1,
         password,
         gmail,
         department,
         designation,
         joiningDate,
         pan,
         adhar,
         father,
         currentAddress,
         currentState,
         currentCity,
         qualification,
         currentPin,
         residence,
         perState,
         perCity,
         perPin,
         Martial,
         nationality,
         Mother,
         specialization,
         qualificationType,
         yearPass,
         university,
         college,
         percentage,
         previousCompany,
         previousDesignation,
         toDate,
         fromDate,
         numberOfMonth,
         Jobdescription,
         SalaryPay,
         SalaryBankName,
         BeneficiaryName,
         BankIfsc,
         AccountNumber,
         confirmAccount,
         Branch,
         profileImage,
         _id,
         dob,
         updatePassword


      }) => {

      const data = await put(`${baseUrl}/user/updateProfile`, {
         fullName,
         mobile,
         email,
         email1,
         password,
         gmail,
         department,
         designation,
         joiningDate,
         pan,
         adhar,
         father,
         currentAddress,
         currentState,
         currentCity,
         qualification,
         currentPin,
         residence,
         perState,
         perCity,
         perPin,
         Martial,
         nationality,
         Mother,
         specialization,
         qualificationType,
         yearPass,
         university,
         college,
         percentage,
         previousCompany,
         previousDesignation,
         toDate,
         fromDate,
         numberOfMonth,
         Jobdescription,
         SalaryPay,
         SalaryBankName,
         BeneficiaryName,
         BankIfsc,
         AccountNumber,
         confirmAccount,
         Branch,
         profileImage,
         dob,
         updatePassword
      }, true);

      // if (image) {
      //    const formdata = new FormData();
      //    const resp = await postDocuments(`${baseUrl}/user/updateProfile/${_id}`, formdata);

      // }

      return data;

   };


   const updateAdminProfile = async ({ fullName, dob, mobile, email, password, employeeCode }) => {
      const data = await put(`${baseUrl}/admin/updateAdmin`, { fullName, dob, mobile, email, password, employeeCode }, true);
      return data;
   };

   const getChats = async () => {
      const data = await get(`${baseUrl}/chat/getChats`, true);
      return data;
   };

   const getChat = async ({ id }) => {
      const data = await get(`${baseUrl}/chat/getChat/${id}`, true);
      return data;
   };

   const getChatByUser = async ({ userId }) => {
      const data = await get(`${baseUrl}/chat/getChatByUser?userId=${userId}`, true);
      return data;
   };

   const createNewChat = async ({ user, message }) => {
      const data = await post(`${baseUrl}/chat/createNewChat`, { user, message }, true);
      return data;
   };

   const postMessage = async ({ id, message }) => {
      const data = await put(`${baseUrl}/chat/postMessage/${id}`, { message }, true);
      return data;
   };

   const deleteChat = async ({ id }) => {
      const data = await deleteReq(`${baseUrl}/chat/deleteChat/${id}`, true);
      return data;
   };

   const adminLogin = async ({ email, password }) => {
      const data = await post(`${baseUrl}/admin/loginAdmin`, { email, password }, false);
      return data;
   };

   const topDash = async () => {
      const data = await get(`${baseUrl}/admin/topDash`, true);
      return data;
   };

   const postAnnouncement = async ({ image, message, date }) => {
      const data = await post(`${baseUrl}/announcement/postAnnouncement`, { image, message, date }, true);
      return data;
   };

   const updateAnnouncement = async ({ image, message, date, _id }) => {
      const data = await put(`${baseUrl}/announcement/updateAnnouncement/${_id}`, { image, message, date }, true);
      return data;
   };

   const getAnnouncements = async (page, perPage, date) => {
      const data = await get(`${baseUrl}/announcement/getAnnouncements?page=${page}&perPage=${perPage}&date=${date}`, true);
      return data;
   };

   const getAnnouncementDates = async () => {
      const data = await get(`${baseUrl}/announcement/getAnnouncementDates`, true);
      return data;
   };

   const deleteAnnouncement = async ({ id }) => {
      const data = await deleteReq(`${baseUrl}/announcement/deleteAnnouncement/${id}`, true);
      return data;
   };

   const getAttendance = async () => {
      const data = await get(`${baseUrl}/attendance/getAttendance`, true);
      return data;
   };

   const getAttendanceByUser = async (userId, date, month, year, page, perPage) => {
      const data = await get(`${baseUrl}/attendance/getAttendanceByUser?userId=${userId}&date=${date}&month=${month}&year=${year}&page=${page}&perPage=${perPage}`, true);
      return data;
   };

   const updateUser = async (userId, value1, value2, value3, value4, value5) => {
      console.log({ ...value2 });
      const data = await put(`${baseUrl}/user/updateUser/${userId}`, { ...value1, ...value2, ...value3, ...value4, ...value5 }, true);
      return data;
   };

   // , adharCard ,   cancelCheque, pancard,educationCert, prevOrgOffer

   const uploadDocuments = async (id, formData) => {

      const data = await postDocuments(`${baseUrl}/user/uploadDocument/${id}`, formData, true);
      return data;

   }

   const getLeaveTypes = async () => {
      const data = await get(`${baseUrl}/system/getLeaveTypes`, true);
      return data;
   };

   const postLeaveType = async ({ name, days }) => {
      const data = await post(`${baseUrl}/system/postLeaveType`, { name, days }, true);
      return data;
   };

   const updateLeaveType = async ({ id, status, days, name }) => {
      const data = await put(`${baseUrl}/system/updateLeaveType/${id}`, { name, days, status }, true);
      return data;
   };

   const deleteLeaveType = async (id) => {
      const data = await deleteReq(`${baseUrl}/system/deleteLeaveType/${id}`, true);
      return data;
   };

   const getBranchs = async () => {
      const data = await get(`${baseUrl}/system/getBranchs`, true);
      if(data?.statusCode===200){
         setBranch(data?.data)
      }
      return data;
   };

   const postBranch = async ({ name }) => {
      const data = await post(`${baseUrl}/system/postBranch`, { name }, true);
      return data;
   };

   const updateBranch = async ({ id, status, name }) => {
      const data = await put(`${baseUrl}/system/updateBranch/${id}`, { name, status }, true);
      return data;
   };

   const deleteBranch = async (id) => {
      const data = await deleteReq(`${baseUrl}/system/deleteBranch/${id}`, true);
      return data;
   };

   const getDepartments = async () => {
      const data = await get(`${baseUrl}/system/getDepartments`, true);
      if (data?.statusCode === 200) {
         setAllDep(data?.data);
      }
      return data;
   };

   const postDepartment = async ({ name, branch }) => {
      const data = await post(`${baseUrl}/system/postDepartment`, { name, branch }, true);
      return data;
   };

   const updateDepartment = async ({ id, status, name }) => {
      const data = await put(`${baseUrl}/system/updateDepartment/${id}`, { status, name }, true);
      return data;
   };

   const deleteDepartment = async (id) => {
      const data = await deleteReq(`${baseUrl}/system/deleteDepartment/${id}`, true);
      return data;
   };

   const getDesingation = async ({ id }) => {
      const data = await get(`${baseUrl}/system/getDesignations/${id}`, true);
      return data;
   };

   const getEmp = async ({ id }) => {
      const data = await get(`${baseUrl}/system/getEmployeess/${id}`, true);
      return data;
   };


   const getDesignations = async () => {
      const data = await get(`${baseUrl}/system/getDesignation`, true);
      return data;
   }

   const postDesignation = async ({ name, department }) => {
      console.log(department);
      const data = await post(`${baseUrl}/system/postDesignation`, { name, department }, true);
      return data;
   };

   const updateDesignation = async ({ id, status, name }) => {
      const data = await put(`${baseUrl}/system/updateDesignation/${id}`, { status, name }, true);
      return data;
   };

   const deleteDesignation = async (id) => {
      const data = await deleteReq(`${baseUrl}/system/deleteDesignation/${id}`, true);
      return data;
   };



   const createIndicator = async ({ Branch, Department, Designation, businessProcessRating, projectManagemntRating }) => {
      const data = await post(`${baseUrl}/admin/postIndi`, { Branch, Department, Designation, businessProcessRating, projectManagemntRating }, true);

      return data;
   }


   const departmentEmployee = async (department) => {
      const data = await post(`${baseUrl}/admin/departmentEmployee`, { department }, true);

      return data;
   }
   const createAppraisal = async ({ Branch,
      SelectMonth,
      Employee,
      remarks }) => {
      const data = await post(`${baseUrl}/admin/postapp`, {
         Branch,
         SelectMonth,
         Employee,
         remarks
      }, true);

      console.log("resp ", data);
      return data;
   }

   const getIndicator = async () => {
      const data = await get(`${baseUrl}/admin/getIndicator`, true);
      return data;
   };

   const getAppraisal = async () => {
      const data = await get(`${baseUrl}/admin/getApp`, true);
      return data;
   };

   const deleteIndicator = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteIndicator/${id}`, true);
      return data;
   };

   const updateIndicator = async ({ id, Branch, Department, Designation, businessProcessRating, projectManagemntRating }) => {
      const data = await put(`${baseUrl}/admin/updateIndicator/${id}`, { Branch, Department, Designation, businessProcessRating, projectManagemntRating }, true);
      return data;
   };

   const allEmployee = async () => {
      const data = await get(`${baseUrl}/admin/fetchEmployee`, true);
      if (data?.status) {
         setAllEmp(data?.emp)
      }
      return data;

   }
   const allEmployeebyDep = async () => {
      const data = await get(`${baseUrl}/admin/fetchEmployee`, true);
      return data;

   }

   const deleteApprisal = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteApp/${id}`, true);
      return data;
   };

   const updateApprisal = async ({ id, Branch, SelectMonth, Employee, remarks }) => {
      const data = await put(`${baseUrl}/admin/updateApp/${id}`, { Branch, SelectMonth, Employee, remarks }, true);
      return data;
   };

   const createAssets = async ({ Employee,
      designation,
      department,
      product,
      purchaseDate,
      additonal,
      description
   }) => {
      const data = await post(`${baseUrl}/admin/postAsset`, {
         Employee,
         designation,
         department,
         product,
         purchaseDate,
         additonal,
         description
      }, true);

      console.log("resp ", data);
      return data;
   }

   const getAssets = async () => {
      const data = await get(`${baseUrl}/admin/getAsset`, true);
      return data;
   };

   const deleteAssets = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteAsset/${id}`, true);
      return data;
   };

   const updateAssets = async ({ id, Employee,
      designation,
      department,
      product,
      purchaseDate,
      additonal,
      description, status }) => {
      const data = await put(`${baseUrl}/admin/updateAsset/${id}`, {
         Employee,
         designation,
         department,
         product,
         purchaseDate,
         additonal,
         description,
         status
      }, true);
      return data;
   };

   const deleteUser = async (id) => {
      const data = await deleteReq(`${baseUrl}/user/deactivateUser/${id}`, true);
      return data;
   };


   const createTracks = async ({ Branch, GoalType, startDate, endDate, subject, target, description, status, rating, progress }) => {
      const data = await post(`${baseUrl}/admin/postTrack`, { Branch, GoalType, startDate, endDate, subject, target, description, status, rating, progress }, true);

      console.log("resp ", data);
      return data;
   }

   const getTracks = async () => {
      const data = await get(`${baseUrl}/admin/getTrack`, true);
      return data;
   };

   const deleteTracks = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteTrack/${id}`, true);
      return data;
   };

   const updateTracks = async ({ id, Branch, GoalType, startDate, endDate, subject, target, description, status, rating, progress }) => {
      const data = await put(`${baseUrl}/admin/updateTrack/${id}`, { Branch, GoalType, startDate, endDate, subject, target, description, status, rating, progress }, true);
      return data;
   };

   // ================================announcement===========================
   const createAnnouncement = async ({ title, Branch, Department, Employee, startDate, endDate, description }) => {
      const data = await post(`${baseUrl}/admin/postAnnouncement`, { title, Branch, Department, Employee, startDate, endDate, description }, true);
      return data;
   }

   const updateAnnouncements = async ({ id, title, Branch, Department, Employee, startDate, endDate, description }) => {
      const data = await put(`${baseUrl}/admin/updateAnnouncement/${id}`, { title, Branch, Department, Employee, startDate, endDate, description }, true);
      return data;
   };

   const deleteAnnouncements = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteAnnouncement/${id}`, true);
      return data;
   };

   const fetchAnnoucement = async () => {
      const data = await get(`${baseUrl}/admin/getAnnouncement`, true);
      if (data?.statusCode === 200) {
         setAnnouncement(data?.data)
      }
      return data;
   };

   const notificationGet = async () => {
      let user = JSON.parse(localStorage.getItem("hrms_user"));
      const userDetail = user;

      const id = userDetail?._id;

      const data = await get(`${baseUrl}/admin/getAnnouncement/${id}`, true);
      return data;
   }


   const acceptLeave = async (formdata, id, userId, from, to) => {

      const { user, days } = formdata;

      let fullName = user.fullName;

      const data = await post(`${baseUrl}/leave/acceptLeave/${id}`, { fullName, days, userId, startDate: from, endDate: to }, true);

      return data;
   }

   const acceptHalf = async (formdata, id, userId, from, to) => {

      const { user, days } = formdata;

      let fullName = user.fullName;

      const data = await post(`${baseUrl}/leave/acceptHalfDay/${id}`, { fullName, days, userId, startDate: from, endDate: to }, true);

      return data;
   }
   const rejectLeave = async (formdata, id) => {
      const { user } = formdata;
      let fullName = user.fullName;

      const data = await post(`${baseUrl}/leave/rejectLeave/${id}`, { fullName }, true);

      return data;
   }
   const rejectHalfDay = async (formdata, id) => {
      const { user } = formdata;
      let fullName = user.fullName;

      const data = await post(`${baseUrl}/leave/rejectHalfDay/${id}`, { fullName }, true);

      return data;
   }


   const postNotification = async (daysGap, name, username) => {


      const data = await post(`${baseUrl}/notification/createNotification`, { title: `Leave Application from ${username} `, description: `Leave of ${daysGap} days`, users: ["shubham gupta"] }, true);


      return data;

   }
   const postNotification2 = async (daysGap, name, username) => {


      const data = await post(`${baseUrl}/notification/createNotification`, { title: `Half Day Application from ${username} `, description: `Half Day on ${daysGap}`, users: ["shubham gupta"] }, true);


      return data;

   }
   const postNotifyLeavereq = async (name, title) => {

      const data = await post(`${baseUrl}/notification/createNotification`, { title: `${title} Leave Application`, description: `Leave Application ${title} By Admin `, users: [`${name}`] }, true);

      return data;

   }

   const postNotifyProject = async (name, title, date) => {
      const data = await post(`${baseUrl}/notification/createNotification`, { title: `You have been added to ${title} !`, description: `${title} are ${date} `, users: [`${name}`] }, true);
      return data
   }

   const postNotifyTask = async (name, title, date) => {
      const data = await post(`${baseUrl}/notification/createNotification`, { title: `New Task Assigned: ${title} !`, description: `Deadline for ${title} ${date} `, users: [`${name}`] }, true);
      return data
   }

   const postClientNotification = async (name, title, date) => {
      const data = await post(`${baseUrl}/notification/clientNotification`, { title: `New project added to dashboard.`, description: `${title}`, client: [`${name}`] }, true)
      return data
   }

   const getClientNotification = async (id) => {
      const data = await get(`${baseUrl}/notification/getNotification/${id}`)
      return data
   }

   const markedNotification = async (id) => {
      const data = await put(`${baseUrl}/notification/markedNotification/${id}`)
      return data
   }

   const fetchUserNotify = async () => {
      let user = JSON.parse(localStorage.getItem("hrms_user"));
      const userDetail = user;

      const id = userDetail?._id;

      const data = await get(`${baseUrl}/notification/getNotification/${id}`, true);
      return data;
   }


   const fetchTodayLeave = async () => {

      const data = await get(`${baseUrl}/leave/getTodayLeave`, true);
      return data;

   }

   const fetchUserNotifyHR = async () => {

      const data = await get(`${baseUrl}/notification/getNotification`, true);
      return data;
   }


   const deleteNotification = async (notId) => {
      let user = JSON.parse(localStorage.getItem("hrms_user"));
      const userDetail = user;

      const id = userDetail?._id;

      const data = await deleteReq(`${baseUrl}/notification/deleteNotification/${id}/${notId}`, true);
      return data;
   }

   const createTermination = async ({ Employee,
      type,
      noticeDate,
      terminationDate,
      description }) => {
      const data = await post(`${baseUrl}/admin/postTermination`, {
         Employee,
         type,
         noticeDate,
         terminationDate,
         description
      }, true);

      console.log("resp ", data);
      return data;
   }

   const getTermination = async () => {
      const data = await get(`${baseUrl}/admin/getTermination`, true);
      if (data?.statusCode) {
         setTermination(data?.data)
      }
      return data;
   };

   const deleteTermination = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteTermination/${id}`, true);
      return data;
   };

   const updateTermination = async ({ id, Employee,
      type,
      noticeDate,
      terminationDate,
      description }) => {
      const data = await put(`${baseUrl}/admin/updateTermination/${id}`, {
         Employee,
         type,
         noticeDate,
         terminationDate,
         description
      }, true);
      return data;
   };

   // ================warning================

   const createWarning = async ({ warningBy,
      warningTo,
      subject,
      warningDate,
      description }) => {
      const data = await post(`${baseUrl}/admin/postWarning`, {
         warningBy,
         warningTo,
         subject,
         warningDate,
         description
      }, true);

      console.log("resp ", data);
      return data;
   }

   const getWarning = async () => {
      const data = await get(`${baseUrl}/admin/getWarning`, true);
      if (data?.statusCode) {
         setWarning(data?.data)
      }
      return data;
   };

   const deleteWarning = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteWarning/${id}`, true);
      return data;
   };

   const updateWarning = async ({ id, warningBy,
      warningTo,
      subject,
      warningDate,
      description }) => {
      const data = await put(`${baseUrl}/admin/updateWarning/${id}`, {
         warningBy,
         warningTo,
         subject,
         warningDate,
         description
      }, true);
      return data;
   };

   // =================complains================

   const createComplain = async ({ complainFrom,
      complainAgain,
      title,
      complainDate,
      description }) => {
      const data = await post(`${baseUrl}/admin/postComplain`, {
         complainFrom,
         complainAgain,
         title,
         complainDate,
         description
      }, true);

      return data;
   }

   const getComplain = async () => {
      const data = await get(`${baseUrl}/admin/getComplain`, true);
      if (data?.statusCode === 200) {
         setComplain(data?.data)
      }
      return data;
   };

   const deleteComplain = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteComplain/${id}`, true);
      return data;
   };

   const updateComplain = async ({ id, complainFrom,
      complainAgain,
      title,
      complainDate,
      description }) => {
      const data = await put(`${baseUrl}/admin/updateComplain/${id}`, {
         complainFrom,
         complainAgain,
         title,
         complainDate,
         description
      }, true);
      return data;
   };


   const postAttendence = async ({ clockInDetail, clockOutDetail, id, breakTime, clockInDate, todayTask }) => {

      const data = await post(`${baseUrl}/clock/createClock/${id}`, {
         clockInDetail, clockOutDetail, date: clockInDate, breakTime, todayTask
      }, true);

      return data;
   }


   const getAttendence = async ({ id, date }) => {

      const data = await post(`${baseUrl}/clock/getClock/${id}`, {
         date
      }, true);

      return data;
   }

   const savenoteatt = async ({ id, Note, date }) => {

      const data = await post(`${baseUrl}/clock/savenoteatt/${id}`, {
         Note, date
      }, true);

      return data;
   }

   const createResignation = async ({ Employee,
      noticeDate,
      resignationDate,
      description }) => {
      const data = await post(`${baseUrl}/admin/postResignation`, {
         Employee,
         noticeDate,
         resignationDate,
         description
      }, true);

      return data;
   }

   const getResignation = async () => {
      const data = await get(`${baseUrl}/admin/getResignation`, true);
      if (data?.statusCode === 200) {
         setResignation(data?.data)
      }
      return data;
   };

   const deleteResignation = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteResignation/${id}`, true);
      return data;
   };

   const updateResignation = async ({ id, Employee,
      noticeDate,
      resignationDate,
      description }) => {
      const data = await put(`${baseUrl}/admin/updateResignation/${id}`, {
         Employee,
         noticeDate,
         resignationDate,
         description
      }, true);
      return data;
   };

   const createPromotion = async ({ Employee, Designation, title, promotionDate, description }) => {
      const data = await post(`${baseUrl}/admin/postPromotion`, {
         Employee, Designation, title, promotionDate, description
      }, true);

      return data;
   }

   const getPromotion = async () => {
      const data = await get(`${baseUrl}/admin/getPromotion`, true);
      if (data?.statusCode === 200) {
         setPromotion(data?.data)
      }
      return data;
   };

   const deletePromotion = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deletePromotion/${id}`, true);
      return data;
   };

   const updatePromotion = async ({ id, Employee, Designation, title, promotionDate, description }) => {
      const data = await put(`${baseUrl}/admin/updatePromotion/${id}`, {
         Employee, Designation, title, promotionDate, description
      }, true);
      return data;
   };


   const postAward = async ({ employee, awardType, date, gift, description, rating }) => {

      const data = await post(`${baseUrl}/award/postAward`, {
         employee, awardType, date, gift, description, rating
      }, true);

      return data;
   }

   const getAward = async () => {
      const data = await get(`${baseUrl}/award/getAllAward`, true);
      setAwards(data?.data);
      return data;
   };

   const deleteAward = async (id) => {
      const data = await deleteReq(`${baseUrl}/award/deleteAward/${id}`, true);
      return data;
   };

   const updateAward = async ({ id, employee, awardType, date, gift, description, rating }) => {
      const data = await put(`${baseUrl}/award/updateAward/${id}`, {
         employee, awardType, date, gift, description, rating
      }, true);
      return data;
   };

   const fetchClock = async ({ date, Employee }) => {
      const data = await post(`${baseUrl}/clock/getClockByUser`, {
         date, Employee
      }, true);

      return data;
   }

   const createTransfer = async ({ branch, Employee, Department, TransferDate, Description }) => {
      const data = await post(`${baseUrl}/admin/createTransfer`, {
         branch, Employee, Department, TransferDate, Description
      }, true);

      return data;
   }

   const getTransfer = async () => {
      const data = await get(`${baseUrl}/admin/getTransfer`, true);
      setTransfer(data?.data)
      return data;
   }

   const deleteTransfer = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteTransfer/${id}`, true);
      return data;
   };

   const updateTransfer = async ({ id, branch, Employee, Department, TransferDate, Description }) => {
      const data = await put(`${baseUrl}/admin/updateTransfer/${id}`, {
         branch, Employee, Department, TransferDate, Description
      }, true);
      return data;
   };

   const createTrainer = async ({ Branch, firstName, lastName, contact, email, expertise, address }) => {
      const data = await post(`${baseUrl}/admin/postTrainer`, {
         Branch, firstName, lastName, contact, email, expertise, address
      }, true);

      return data;
   }

   const getTrainer = async () => {
      const data = await get(`${baseUrl}/admin/getTrainer`, true);
      return data;
   }

   const deleteTrainer = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteTrainer/${id}`, true);
      return data;
   };

   const updateTrainer = async ({ id, Branch, firstName, lastName, contact, email, expertise, address }) => {
      const data = await put(`${baseUrl}/admin/updateTrainer/${id}`, {
         Branch, firstName, lastName, contact, email, expertise, address
      }, true);
      return data;
   };

   // =================training list api======================
   const createTrainingList = async ({ Branch, trainerOption, trainingType, trainer, trainingCost, Employee, startDate, endDate, description }) => {
      const data = await post(`${baseUrl}/admin/postList`, {
         Branch, trainerOption, trainingType, trainer, trainingCost, Employee, startDate, endDate, description
      }, true);

      return data;
   }

   const getTrainingList = async () => {
      const data = await get(`${baseUrl}/admin/getList`, true);
      return data;
   }

   const deleteTrainingList = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteList/${id}`, true);
      return data;
   };

   const updateTrainingList = async ({ id, Branch, trainerOption, trainingType, trainer, trainingCost, Employee, startDate, endDate, description, status, performance, remarks }) => {
      const data = await put(`${baseUrl}/admin/updateList/${id}`, {
         Branch, trainerOption, trainingType, trainer, trainingCost, Employee, startDate, endDate, description, status, performance, remarks
      }, true);
      return data;
   };

   // ==============================Holiday api=====================

   const createHoliday = async ({ holidayName, startDate, endDate }) => {
      const data = await post(`${baseUrl}/admin/createHoliday`, {
         holidayName, startDate, endDate
      }, true);

      return data;
   }

   const getHoliday = async () => {
      const data = await get(`${baseUrl}/admin/getHoliday`, true);
      if (data?.status === 200) {
         setHoliday(data?.data)
      }
      return data;
   }

   const deleteHolidays = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteHoliday/${id}`, true);
      return data;
   };

   const updateHolidays = async ({ id, holidayName, startDate, endDate }) => {
      const data = await put(`${baseUrl}/admin/updateHoliday/${id}`, {
         holidayName, startDate, endDate
      }, true);
      return data;
   };

   // ======================holiday api end================

   // ===========================trip===========
   const createTrip = async ({ Employee, startDate, endDate, purpose, country, description }) => {
      const data = await post(`${baseUrl}/admin/createTrip`, {
         Employee, startDate, endDate, purpose, country, description
      }, true);

      return data;
   }

   const getTrip = async () => {
      const data = await get(`${baseUrl}/admin/getTrip`, true);
      return data;
   }

   const deleteTrip = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteTrip/${id}`, true);
      return data;
   };

   const updateTrip = async ({ id, Employee, startDate, endDate, purpose, country, description }) => {
      const data = await put(`${baseUrl}/admin/updateTrip/${id}`, {
         Employee, startDate, endDate, purpose, country, description
      }, true);
      return data;
   };

   const createLead = async (
      {
         LeadOwner,
         Company,
         FirstName,
         LastName,
         Title,
         Email,
         Phone,
         Fax,
         Mobile,
         Website,
         LeadSource,
         NoOfEmployee,
         Industry,
         LeadStatus,
         AnnualRevenue,
         Rating,
         EmailOptOut,
         SkypeID,
         SecondaryEmail,
         Twitter,
         Street,
         City,
         State,
         ZipCode,
         Country,
         DescriptionInfo,
         image,
         date, dynamicFields
      }) => {

      let data;

      if (image) {

         const formdata = new FormData();
         formdata.append("image", image);

         const imageUrl = await postDocuments(`${baseUrl}/lead/postImage`, formdata, true);


         data = await post(`${baseUrl}/lead/createLead`, {
            LeadOwner,
            Company,
            FirstName,
            LastName,
            Title,
            Email,
            Phone,
            Fax,
            Mobile,
            Website,
            LeadSource,
            NoOfEmployee,
            Industry,
            LeadStatus,
            AnnualRevenue,
            Rating,
            EmailOptOut,
            SkypeID,
            SecondaryEmail,
            Twitter,
            Street,
            City,
            State,
            ZipCode,
            Country,
            DescriptionInfo,
            image: imageUrl?.data,
            date, dynamicFields
         }, true);

      }
      else {
         data = await post(`${baseUrl}/lead/createLead`, {
            LeadOwner,
            Company,
            FirstName,
            LastName,
            Title,
            Email,
            Phone,
            Fax,
            Mobile,
            Website,
            LeadSource,
            NoOfEmployee,
            Industry,
            LeadStatus,
            AnnualRevenue,
            Rating,
            EmailOptOut,
            SkypeID,
            SecondaryEmail,
            Twitter,
            Street,
            City,
            State,
            ZipCode,
            Country,
            DescriptionInfo,
            date,
            dynamicFields
         }, true);
      }

      return data;
   }


   const createExcelLead = async ({
      LeadOwner,
      CompanyName,
      Email,
      Website,
      LeadStatus,
      FirstName,
      LastName,
   }) => {

      let data;

      data = await post(`${baseUrl}/lead/createLead`, {
         LeadOwner,
         Company: CompanyName,
         Email,
         Website,
         LeadStatus,
         FirstName,
         LastName,


      }, true);


      return data;
   }



   const updateLead = async (
      {
         LeadOwner,
         Company,
         FirstName,
         LastName,
         Title,
         Email,
         Phone,
         Fax,
         Mobile,
         Website,
         LeadSource,
         NoOfEmployee,
         Industry,
         LeadStatus,
         AnnualRevenue,
         Rating,
         EmailOptOut,
         SkypeID,
         SecondaryEmail,
         Twitter,
         Street,
         City,
         State,
         ZipCode,
         Country,
         DescriptionInfo, id, image,
         date,
         dynamicFields

      }

   ) => {

      let data;
      let imageUrl;

      if (image) {
         const ans = await uploadToCloudinaryImg({ image });
         imageUrl = ans?.data;

         data = await post(`${baseUrl}/lead/editLead/${id}`,
            {
               LeadOwner,
               Company,
               FirstName,
               LastName,
               image: imageUrl,
               Title,
               Email,
               Phone,
               Fax,
               Mobile,
               Website,
               LeadSource,
               NoOfEmployee,
               Industry,
               LeadStatus,
               AnnualRevenue,
               Rating,
               EmailOptOut,
               SkypeID,
               SecondaryEmail,
               Twitter,
               Street,
               City,
               State,
               ZipCode,
               Country,
               DescriptionInfo,
               date,
               dynamicFields

            }, true);

      }
      else {

         data = await post(`${baseUrl}/lead/editLead/${id}`,
            {
               LeadOwner,
               Company,
               FirstName,
               LastName,
               Title,
               Email,
               Phone,
               Fax,
               Mobile,
               Website,
               LeadSource,
               NoOfEmployee,
               Industry,
               LeadStatus,
               AnnualRevenue,
               Rating,
               EmailOptOut,
               SkypeID,
               SecondaryEmail,
               Twitter,
               Street,
               City,
               State,
               ZipCode,
               Country,
               DescriptionInfo,
               date,
               dynamicFields

            }, true);

      }

      return data;
   }

   const getLead = async (id, query, page, perPage) => {
      let user = JSON.parse(localStorage.getItem("hrms_user"));

      const data = await post(`${baseUrl}/lead/getAllLead/?id=${id}&query=${query}&page=${page}&perPage=${perPage}`, { id: user?._id }, true);
      return data;
   }

   const getLead2 = async (id, query, page, perPage) => {

      const data = await get(`${baseUrl}/lead/getAllLead/?id=${id}&query=${query}&page=${page}&perPage=${perPage}`, true);
      return data;
   }


   const getLead3 = async () => {

      let user = JSON.parse(localStorage.getItem("hrms_user"));

      const data = await get(`${baseUrl}/lead/getAllLead2/${user?._id}`, true);
      return data;
   }
   const getLeadByUser = async (id) => {
      const data = await get(`${baseUrl}/lead/getLeadByUser/${id}`, true);
      return data;
   }
   const getAllLeads = async () => {
      const data = await get(`${baseUrl}/lead/getAllLeadByAdmin`, true);
      return data;
   }


   const deleteLeads = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteLead/${id}`, true);
      return data;
   };

   const closeLead = async (id) => {

      const data = await post(`${baseUrl}/admin/closeLead/${id}`, {}, true);
      return data;
   }
   const closeLeadApiFetch = async () => {
      const data = await post(`${baseUrl}/admin/getAllCloseLead`, {}, true);
      return data;
   }
   const closeLeadApiFetch2 = async () => {

      let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

      const data = await post(`${baseUrl}/admin/getAllCloseLead2`, { id: hrms_user?._id }, true);
      return data;
   }
   const getTodayLead = async () => {
      const data = await post(`${baseUrl}/admin/getTodayLead`, {}, true);
      return data;
   }
   const getTodayLead2 = async () => {
      let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

      const data = await post(`${baseUrl}/admin/getTodayLead2`, { id: hrms_user?._id }, true);
      return data;
   }
   const updateLeadStatus = async (id, LeadStatus) => {

      const data = await post(`${baseUrl}/lead/updateLeadStatus/${id}`, { LeadStatus }, true);
      return data;
   }
   const updateLeadNote = async (id, Note, LeadStatus) => {

      const data = await post(`${baseUrl}/lead/updateLeadNote/${id}`, { Note, LeadStatus }, true);
      return data;
   }

   const postQuotation = async ({ User, InvoiceNo, GstNo, SacCode, PlacedSupply, BillTo, ShipTo, ClientName, Address, Mobile, Email, ItemDescription, Qty, Price, Amount, BalanceAmount, Note, currency, leadId }) => {

      const data = await post(`${baseUrl}/admin/createInvoice`, { User, InvoiceNo, GstNo, SacCode, PlacedSupply, BillTo, ShipTo, ClientName, Address, Mobile, Email, ItemDescription, Qty, Price, Amount, BalanceAmount, Note, currency, leadId }, true);
      return data;

   }

   const getQuotationAll = async (id) => {
      const data = await get(`${baseUrl}/admin/getEveryUserInvoice/${id}`, true);
      return data;
   }

   const updateQuotation = async (
      { InvoiceNo, GstNo, SacCode, PlacedSupply, BillTo, ShipTo, ClientName, Address, Mobile, Email, ItemDescription, Qty, Price, Amount, BalanceAmount, Note, currency, id }

   ) => {

      let data;

      data = await post(`${baseUrl}/admin/updateInvoice/${id}`,
         {
            InvoiceNo, GstNo, SacCode, PlacedSupply, BillTo, ShipTo, ClientName, Address, Mobile, Email, ItemDescription, Qty, Price, Amount, BalanceAmount, Note, currency
         }, true);


      return data;
   }

   const deleteQuotation = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteInvoice/${id}`, true);
      return data;
   };
   const deleteQuotationapi = async (id) => {
      const data = await deleteReq(`${baseUrl}/lead/deleteQuotationapi/${id}`, true);
      return data;
   };
   const deleteQproapi = async (id) => {
      const data = await deleteReq(`${baseUrl}/lead/deletePropapi/${id}`, true);
      return data;
   };

   // ======================quatation api fething start===================
   const postQuotation1 = async ({ User, QuatationNo, GstNo, SacCode, PlacedSupply, BillTo, ShipTo, ClientName, Address, Mobile, Email, ItemDescription, Qty, Price, Amount, BalanceAmount, Note, currency, leadId }) => {

      const data = await post(`${baseUrl}/admin/createQuatation`, { User, QuatationNo, GstNo, SacCode, PlacedSupply, BillTo, ShipTo, ClientName, Address, Mobile, Email, ItemDescription, Qty, Price, Amount, BalanceAmount, Note, currency, leadId }, true);
      return data;

   }

   const getQuotationAll1 = async (id) => {
      const data = await get(`${baseUrl}/admin/getEveryUserQuatation/${id}`, true);
      return data;
   }

   const updateQuotation1 = async (
      { QuatationNo, GstNo, SacCode, PlacedSupply, BillTo, ShipTo, ClientName, Address, Mobile, Email, ItemDescription, Qty, Price, Amount, BalanceAmount, Note, currency, id }

   ) => {

      let data;

      data = await post(`${baseUrl}/admin/updateQuatation/${id}`,
         {
            QuatationNo, GstNo, SacCode, PlacedSupply, BillTo, ShipTo, ClientName, Address, Mobile, Email, ItemDescription, Qty, Price, Amount, BalanceAmount, Note, currency
         }, true);


      return data;
   }

   const deleteQuotation1 = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteQuatation/${id}`, true);
      return data;
   };
   // ==================================quatation api fetching end=================

   const createSallary = async ({ salary, paySlipType }) => {

      const data = await post(`${baseUrl}/admin/createSallary`, { salary, paySlipType }, true);
      return data;

   }

   const getSallary = async () => {
      // console.log('iddd ',id);
      const data = await get(`${baseUrl}/admin/getSallary`, true);
      return data;
   }

   const userSalaryFetch = async (id) => {
      const data = await get(`${baseUrl}/payroll/getAllUserPayroll/${id}`, true);
      return data;
   }

   const salaryCreate = async (paySlipType, salary, id) => {
      const data = await post(`${baseUrl}/payroll/editUserSalary/${id}`, { salary, paySlipType }, true);
      return data;
   }

   const createAllowance = async (allowanceOption, amount, title, type, id) => {
      const data = await post(`${baseUrl}/payroll/createAllowance/${id}`, { allowanceOption, amount, title, type }, true);
      return data;
   }
   const createCommision = async (amount, type, title, id) => {
      const data = await post(`${baseUrl}/payroll/createCommission/${id}`, { amount, title, type }, true);
      return data;
   }
   const createLoan = async (LoanOption, loanAmount, title, type, reason, id) => {
      const data = await post(`${baseUrl}/payroll/createLoan/${id}`, { LoanOption, loanAmount, title, reason, type }, true);
      return data;
   }
   const allowDeleteHandler = async (allowId, id) => {
      const data = await deleteReq(`${baseUrl}/payroll/deleteAllowance/${allowId}/${id}`, true);
      return data;
   }
   const loanDeleteHandler = async (loanId, id) => {
      const data = await deleteReq(`${baseUrl}/payroll/deleteLoan/${loanId}/${id}`, true);
      return data;
   }
   const commisionDelteHandler = async (commId, id) => {
      const data = await deleteReq(`${baseUrl}/payroll/deleteCommission/${commId}/${id}`, true);
      return data;
   }

   const editAllowance = async (allowanceOption, amount, title, type, allowanceId, id) => {
      const data = await post(`${baseUrl}/payroll/editAllowance/${id}`, { allowanceOption, amount, title, type, allowanceId }, true);
      return data;
   }
   const editComApi = async (amount, type, title, allowanceId, id) => {
      const data = await post(`${baseUrl}/payroll/editCommission/${id}`, { amount, title, type, allowanceId }, true);
      return data;
   }
   const editLoanApi = async (LoanOption, title, type, loanAmount, reason, allowanceId, id) => {
      const data = await post(`${baseUrl}/payroll/editLoan/${id}`, { LoanOption, loanAmount, title, type, reason, allowanceId }, true);
      return data;
   }
   const getUserSlip = async (month, year) => {
      const data = await post(`${baseUrl}/payslip/getPlayslip`, { month, year }, true);
      return data;
   }
   const togglePayslip = async (userId, month, year) => {

      const data = await post(`${baseUrl}/payslip/toglePayslip/${userId}`, { month, year }, true);
      return data;
   }
   const buildAPI = async (month, year) => {

      const data = await post(`${baseUrl}/payslip/bulkPayslip`, { month, year }, true);
      return data;
   }

   const updateAttendance = async (id, Date, clockIn, clockOut, breakTime) => {
      const data = await post(`${baseUrl}/clock/updateAttendance/${id}`, { Date, clockIn, clockOut, breakTime }, true);
      return data;

   }
   const postDocSetup = async ({ name, requiredField }) => {
      const data = await post(`${baseUrl}/system/createDocSetup`, { name, requiredField }, true);
      return data;

   }
   const updateDocSetup = async ({ id, name, requiredField }) => {
      const data = await post(`${baseUrl}/system/updateDocSetup/${id}`, { name, requiredField }, true);
      return data;

   }
   const deleteDocSetup = async ({ id }) => {
      const data = await deleteReq(`${baseUrl}/system/deleteDocSetup/${id}`, true);
      return data;

   }
   const fetchAllDocs = async () => {
      const data = await get(`${baseUrl}/system/fetchAllDocs`, true);
      return data;
   }

   const deleteAttendence = async (id) => {
      const data = await deleteReq(`${baseUrl}/clock/deleteAttendence/${id}`, true);
      return data;

   }

   const uploadOwnDocs = async ({ formData, id }) => {
      const resp = await postDocuments(`${baseUrl}/user/uploadDocument/${id}`, formData);
      return resp;
   }

   // for task and meet 


   const taskCreateApi = async ({ LeadName, FollowUpType, Date, Time, Remark, LeadId, userId }) => {
      const data = await post(`${baseUrl}/openActivity/createTask`, { LeadName, FollowUpType, Date, Time, Remark, LeadId, userId }, true);
      return data;

   }
   const taskEditApi = async ({ LeadName, FollowUpType, Date, Time, Remark, LeadId, userId, taskId }) => {
      const data = await post(`${baseUrl}/openActivity/editTask/${taskId}`, { LeadName, FollowUpType, Date, Time, Remark, LeadId, userId }, true);
      return data;

   }

   const deleteTaskapi = async ({ taskId }) => {
      const data = await deleteReq(`${baseUrl}/openActivity/deleteTask/${taskId}`, true);
      return data;

   }
   const deleteProjectTaskapi22 = async (taskId) => {
      console.log("coming ", taskId);
      const data = await deleteReq(`${baseUrl}/latest_project/deleteTask/${taskId}`, true);
      return data;

   }




   const getTaskApi = async ({ userId }) => {
      const data = await get(`${baseUrl}/openActivity/getTaskByUser/${userId}`, true);
      return data;
   }

   const getMeetApi = async ({ userId }) => {
      const data = await get(`${baseUrl}/openActivity/getMeetByUser/${userId}`, true);
      return data;
   }


   const deleteMeetapi = async ({ meetId }) => {

      const data = await deleteReq(`${baseUrl}/openActivity/deleteMeet/${meetId}`, true);
      return data;

   }

   const meetCreateApi = async ({ title, meetDateFrom, meetDateTo, Status, meetTimeFrom, meetTimeTo, Host, RelatedTo, Participant, Note, userId, LeadId, MeetingLink }) => {
      const data = await post(`${baseUrl}/openActivity/createMeet`, { title, meetDateFrom, meetDateTo, Status, meetTimeFrom, meetTimeTo, Host, RelatedTo, Participant, Note, userId, LeadId, MeetingLink }, true);
      return data;

   }

   const meetEditApi = async ({ title, meetDateFrom, meetDateTo, Status, meetTimeFrom, meetTimeTo, Host, RelatedTo, Participant, Note, userId, meetId, LeadId, MeetingLink }) => {
      const data = await post(`${baseUrl}/openActivity/editMeet/${meetId}`, { title, meetDateFrom, meetDateTo, Status, meetTimeFrom, meetTimeTo, Host, RelatedTo, Participant, Note, userId, LeadId, MeetingLink }, true);
      return data;

   }

   const getLeadById = async (id) => {
      const data = await get(`${baseUrl}/lead/getLeadById/${id}`, true);
      return data;
   }

   const getLeadSources = async () => {
      const data = await get(`${baseUrl}/system/getLeadSource`, true);
      return data;
   };

   const postLeadSource = async ({ name }) => {
      const data = await post(`${baseUrl}/system/postLeadSource`, { name }, true);
      return data;
   };

   const updateLeadSource = async ({ id, name }) => {
      const data = await put(`${baseUrl}/system/updateLeadSource/${id}`, { name }, true);
      return data;
   };

   const deleteLeadSource = async (id) => {
      const data = await deleteReq(`${baseUrl}/system/deleteLeadSource/${id}`, true);
      return data;
   };


   const getIndustry = async () => {
      const data = await get(`${baseUrl}/system/getIndustry`, true);
      return data;
   };

   const postIndustry = async ({ name }) => {
      const data = await post(`${baseUrl}/system/postIndustry`, { name }, true);
      return data;
   };

   const updateIndustry = async ({ id, name }) => {
      const data = await put(`${baseUrl}/system/updateIndustry/${id}`, { name }, true);
      return data;
   };

   const deleteIndustry = async (id) => {
      const data = await deleteReq(`${baseUrl}/system/deleteIndustry/${id}`, true);
      return data;
   };


   const postLeadStatus = async ({ status }) => {
      const data = await post(`${baseUrl}/lead/createLeadStatus`, { status }, true);
      return data;
   }
   const postLeadSource2 = async ({ status }) => {
      const data = await post(`${baseUrl}/lead/createLeadSource`, { status }, true);
      return data;
   }

   const AllLeadStatus = async () => {
      const data = await get(`${baseUrl}/lead/allLeadStatus`, true);
      return data;
   }

   const AllLeadSource = async () => {
      const data = await get(`${baseUrl}/lead/allLeadSource`, true);
      return data;

   }


   const UpdateLeadStatus = async ({ status }) => {
      const data = await post(`${baseUrl}/lead/updateLeadStatus`, { status }, true);
      return data;
   }
   const UpdateLeadSource = async ({ status }) => {
      const data = await post(`${baseUrl}/lead/updateLeadSource`, { status }, true);
      return data;
   }


   const getUserByDesignation = async () => {
      const data = await get(`${baseUrl}/lead/getDesiUser`, true);
      return data;
   }

   const getUserByDesignation1 = async () => {
      const data = await get(`${baseUrl}/lead/getDesiUser1`, true);
      return data;
   }

   const GetNoteApi = async (leadId) => {
      const data = await get(`${baseUrl}/lead/getNoteById/${leadId}`, true);
      return data;
   }


   const CreateNoteApi = async (id, Note, LeadStatus) => {
      const data = await post(`${baseUrl}/lead/createLeadNote/${id}`, { Note, Status: LeadStatus }, true);
      return data;
   }
   const updateNoteApi = async (noteId, Note, LeadStatus) => {
      const data = await post(`${baseUrl}/lead/updateLeadNote2/${noteId}`, { Note, Status: LeadStatus }, true);
      return data;
   }
   const DeleteNoteApi = async (id) => {
      const data = await deleteReq(`${baseUrl}/lead/deleteLeadNote/${id}`, true);
      return data;
   }

   const FetchFollowApi = async (id) => {
      const data = await get(`${baseUrl}/openActivity/fetchFollow/${id}`, true);
      return data;
   }

   const GetOpenLeadsApi = async ({ id }) => {
      const data = await get(`${baseUrl}/lead/getOpenLeads/${id}`, true);
      return data;
   }

   const getLeadStat = async () => {
      const data = await get(`${baseUrl}/system/getLeadStat`, true);
      return data;
   };

   const postLeadStat = async ({ name }) => {
      const data = await post(`${baseUrl}/system/postLeadStat`, { name }, true);
      return data;
   };

   const updateLeadStat = async ({ id, name }) => {
      const data = await put(`${baseUrl}/system/updateLeadStat/${id}`, { name }, true);
      return data;
   };

   const deleteLeadStat = async (id) => {
      const data = await deleteReq(`${baseUrl}/system/deleteLeadStat/${id}`, true);
      return data;
   };

   const getFollowUp = async () => {
      const data = await get(`${baseUrl}/system/getFollow`, true);
      return data;
   };

   const postLeadCategory = async (name) => {
      const data = await post(`${baseUrl}/lead/postLeadCategory`, { name }, true)
      return data;
   }

   const getLeadCatgory = async () => {
      const data = await get(`${baseUrl}/lead/getLeadCategories`, true);
      return data;
   }

   const updateLeadCategory = async (id, name) => {
      const data = await put(`${baseUrl}/lead/updateLeadCategory/${id}`, { name }, true);
      return data;
   }

   const deleteLeadCategory = async (id) => {
      const data = await deleteReq(`${baseUrl}/lead/deleteLeadTypeCategory/${id}`, true);
      return data;
   }


   const postLeadSubCategory = async (leadCategory, name) => {
      const data = await post(`${baseUrl}/lead/postLeadSubCategory`, { leadCategory, name }, true);
      return data;
   }

   const getLeadSubCategory = async () => {
      const data = await get(`${baseUrl}/lead/getSubCategory`, true);
      return data;
   }

   const updateLeadSubCategory = async (id, name, leadCategory) => {
      const data = await put(`${baseUrl}/lead/updateSubCategory/${id}`, { name, leadCategory }, true);
      return data;
   }

   const deleteLeadSubCategory = async (id) => {
      const data = await deleteReq(`${baseUrl}/lead/deleteSubCategory/${id}`, true);
      return data;
   }

   const getQuotationApi = async (leadId) => {
      const data = await get(`${baseUrl}/lead/getQuotationApi/${leadId}`, true);
      return data;
   };

   const postFollowUp = async ({ name }) => {
      const data = await post(`${baseUrl}/system/postFollow`, { name }, true);
      return data;
   };

   const ProvidePermission = async ({ name, Service }) => {
      const data = await post(`${baseUrl}/permission/providePermission`, { name, Service }, true);
      return data;
   };
   const UpdatePermission = async ({ name, Service, roleId }) => {
      const data = await post(`${baseUrl}/permission/updatePermission`, { name, Service, roleId }, true);
      return data;
   };
   const DeleteRoleApi = async (roleId) => {
      const data = await post(`${baseUrl}/permission/DeleteRoleApi`, { roleId }, true);
      return data;
   };
   const AllRolesapi = async () => {
      const data = await post(`${baseUrl}/permission/fetchallRole`, {}, true);
      return data;
   };

   const ProvideRemovePermission = async ({ Designation, userId, Service, SubPermission }) => {
      const data = await post(`${baseUrl}/permission/ProvideRemovePermission`, { Designation, userId, Service, SubPermission }, true);
      return data;
   };
   const RemovePermission = async ({ }) => {
      const data = await post(`${baseUrl}/permission/removePermission`, {}, true);
      return data;
   };
   const setUserTotalLeaveApi = async () => {
      const data = await post(`${baseUrl}/payslip/setUserTotalLeave`, {}, true);
      return data;
   };
   const postQuotationFormApi = async ({ customerName, customerReq, quotationDate, introduction, additional, costhead, timeline, technology, userId, leadId, isSave }) => {
      const data = await post(`${baseUrl}/lead/postQuotationForm`, { customerName, customerReq, quotationDate, introduction, additional, costhead, timeline, technology, userId, leadId, isSave }, true);
      return data;
   };
   const getSaveTempalte = async (leadId) => {
      const data = await get(`${baseUrl}/lead/getSaveTempalte/${leadId}`, true);
      return data;
   };
   // const postQuotationFormApi = async ({  quotationNum, customerName, customerReq,mobileNum,  quotationDate, validUntil, customerId,companyName,companyAddress,   companyGSTIN,companyWebsite , content , items, userId , leadId}) => {
   //    const data = await post(`${baseUrl}/lead/postQuotationForm`, {  quotationNum, customerName, customerReq,mobileNum,  quotationDate, validUntil, customerId,companyName,companyAddress,content ,   items,  companyGSTIN,companyWebsite , userId , leadId  }, true);
   //    return data;
   // };
   // const updateQuotationFormApi = async ({  quotationNum, customerName, customerReq,mobileNum,  quotationDate, validUntil, customerId,companyName,companyAddress,   companyGSTIN,companyWebsite , content , items, userId , leadId , id}) => {
   //    const data = await post(`${baseUrl}/lead/updateQuotationForm/${id}`, {  quotationNum, customerName, customerReq,mobileNum,  quotationDate, validUntil, customerId,companyName,companyAddress,content ,   items,  companyGSTIN,companyWebsite , userId , leadId  }, true);
   //    return data;
   // };
   const updateQuotationFormApi = async ({ customerName, customerReq, quotationDate, introduction, additional, costhead, timeline, technology, userId, id }) => {
      const data = await post(`${baseUrl}/lead/updateQuotationForm/${id}`, { customerName, customerReq, quotationDate, introduction, additional, costhead, timeline, technology, userId }, true);
      return data;
   };

   const postProposalFormApi = async ({ proposalFor, preparedFor, createdBy, Date, content, userId, leadId }) => {
      const data = await post(`${baseUrl}/lead/postProposalForm`, { proposalFor, preparedFor, createdBy, Date, content, userId, leadId }, true);
      return data;
   };
   const updatePropsalFormApi = async ({ proposalFor, preparedFor, createdBy, Date, content, userId, leadId, id }) => {
      const data = await post(`${baseUrl}/lead/UpdateProposalForm/${id}`, { proposalFor, preparedFor, createdBy, Date, content, userId, leadId }, true);
      return data;
   };

   const createClientapi = async ({ Name, Email, Password, City, State, ZipCode, PhoneNumber, Country, Address }) => {
      const data = await post(`${baseUrl}/task/createClient`, { Name, Email, Password, City, State, ZipCode, PhoneNumber, Country, Address }, true);
      return data;
   };

   const getClientapi = async () => {
      const data = await get(`${baseUrl}/task/getAllClient`, true);
      return data;
   };

   const editTaskapi = async ({ Name, Email, City, State, ZipCode, PhoneNumber, Country, Address, clientId, Password }) => {
      const data = await post(`${baseUrl}/task/editClient/${clientId}`, { Name, Email, City, State, ZipCode, PhoneNumber, Country, Address, Password }, true);
      return data;
   }

   const createProjectapi = async ({ Name, Description, Status, DueDate, Members, startDate, client }) => {
      let projectOwner = JSON.parse(localStorage.getItem("hrms_user"));
      const data = await post(`${baseUrl}/latest_project/createProject`, { projectOwner: client, projectName: Name, Description, Status, startDate, deadline: DueDate, Members, client: client }, true);
      return data;
   };

   const getAllProjectApi = async () => {
      const data = await get(`${baseUrl}/latest_project/getAllProject`, true);
      return data;
   };
   const getAllProjectUserApi = async () => {
      let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
      const data = await get(`${baseUrl}/latest_project/getProjectsByUserId/${hrms_user?._id}`, true);
      return data;
   };

   const editProjectapi = async ({ Name, Description, Employee, Status, DueDate, startDate, Members, projectId, client }) => {
      const data = await post(`${baseUrl}/latest_project/editProject`, { projectName: Name, Description, Employee, Status, deadline: DueDate, startDate, Members, projectId, projectOwner: client, client: client }, true);
      return data;
   }

   const disableClientapi = async (clientId) => {
      const data = await post(`${baseUrl}/task/disableClient/${clientId}`, {}, true);
      return data;
   }


   const updateFollowUp = async ({ id, name }) => {
      const data = await put(`${baseUrl}/system/updateFollow/${id}`, { name }, true);
      return data;
   };

   const deleteFollowUp = async (id) => {
      const data = await deleteReq(`${baseUrl}/system/deleteFollow/${id}`, true);
      return data;
   };
   const deleteTaskProject = async (id) => {
      const data = await deleteReq(`${baseUrl}/latest_project/deleteProject/${id}`, true);
      return data;
   };

   const uploadToCloudinaryImg = async ({ image }) => {

      const formdata = new FormData();
      formdata.append("image", image);
      const resp = await postDocuments(`${baseUrl}/user/uploadToCloudinary`, formdata);
      return resp;
   }


   const CreateProjectTask = async ({ Title, Description, Members, StartDate, Github, DueDate, Priority, projectId, taskfile }) => {

      let resp = "";
      if (taskfile) {
         resp = await uploadToCloudinaryImg({ image: taskfile });
      }
      const data = await post(`${baseUrl}/latest_project/createTask`, { taskName: Title, Github, description: Description, Members, startDate: StartDate, dueDate: DueDate, priority: Priority, Project: projectId, taskfile: resp?.data }, true);
      return data;
   }
   const EditProjectTask = async ({ Title, Description, Members, StartDate, DueDate, Priority, taskId }) => {
      const data = await post(`${baseUrl}/latest_project/editTask`, { taskName: Title, taskId, description: Description, Members, startDate: StartDate, dueDate: DueDate, priority: Priority }, true);
      return data;
   }
   const allfilesproject = async (projectId) => {
      const data = await post(`${baseUrl}/latest_project/getProjectFiles/${projectId}`, {}, true);
      return data;
   }
   const deleteProjectFile = async (fileId) => {
      console.log(fileId)
      const data = await deleteReq(`${baseUrl}/latest_project/deleteProjectFile/${fileId}`);
      return data
   }
   const UploadFileProjectapi = async (file, projectId) => {

      let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectId", projectId);
      formData.append("uploadedBy", hrms_user?._id);
      const data = await postDocuments(`${baseUrl}/latest_project/uploadProjectFile`, formData);
      return data;
   }
   const changeTaskStatusApi = async (taskStatus, taskId) => {
      const data = await post(`${baseUrl}/task/changeTaskStatus/${taskId}`, { taskStatus }, true);
      return data;
   }
   const saveDocs = async ({ id, content }) => {
      const data = await post(`${baseUrl}/lead/postSaveOfERdOCS`, { userId: id, content }, true);
      return data;
   }
   const freelencerOfferApi = async ({ id, content7 }) => {
      const data = await post(`${baseUrl}/lead/freelencerOfferApi`, { userId: id, content7 }, true);
      return data;
   }
   const saveRelivingLetterapi = async ({ id, content }) => {
      const data = await post(`${baseUrl}/lead/saveRelivingLetter`, { userId: id, content }, true);
      return data;
   }
   const saveExperienceLetterapi = async ({ id, content }) => {
      const data = await post(`${baseUrl}/lead/saveExperienceLetter`, { userId: id, content }, true);
      return data;
   }
   const saveLORLetterapi = async ({ id, content }) => {
      const data = await post(`${baseUrl}/lead/saveLORLetter`, { userId: id, content }, true);
      return data;
   }
   const saveLetter1Api = async ({ id, content }) => {
      const data = await post(`${baseUrl}/lead/saveLetter1Api`, { userId: id, content }, true);
      return data;
   }
   const saveOfferInterLetterapi = async ({ id, content }) => {
      const data = await post(`${baseUrl}/lead/saveOfferLetterInter`, { userId: id, content }, true);
      return data;
   }
   const createExpenseApi = async (formdata) => {
      const data = await post(`${baseUrl}/lead/createExpense`, { formdata }, true);
      return data;
   }
   const changeOfferLetterPer = async ({ userId }) => {
      const data = await post(`${baseUrl}/lead/changeOfferLetterPer`, { userId }, true);
      return data;
   }
   const changeExperienceLetterPer = async ({ userId }) => {
      const data = await post(`${baseUrl}/lead/changeExperienceLetterPer`, { userId }, true);
      return data;
   }
   const changeRelivingLetterPer = async ({ userId }) => {
      const data = await post(`${baseUrl}/lead/changeRelivingLetterPer`, { userId }, true);
      return data;
   }
   const getMyOfferLetter = async (userId) => {
      const data = await post(`${baseUrl}/lead/getUserLetter`, { userId }, true);
      return data;
   }
   const CreateExpense = async ({ title, itemCode, quantity, unit, purchasePrice, salesPrice, purchaseDate, category }) => {
      const data = await post(`${baseUrl}/lead/createExpense`, { title, itemCode, quantity, unit, purchasePrice, salesPrice, purchaseDate, category }, true);
      return data;
   }
   const getExpenseApi = async () => {
      const data = await post(`${baseUrl}/lead/getExpense`, {}, true);
      return data;
   }
   const deleteExpenseApi = async (id) => {
      const data = await post(`${baseUrl}/lead/deleteExpense/${id}`, {}, true);
      return data;
   }
   const statuschangeapi = async (taskId, status) => {
      const data = await post(`${baseUrl}/latest_project/changeTaskStatus`, { taskId, status }, true);
      return data;
   }

   const getAllProjectUserTaskApi = async () => {

      let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
      const data = await get(`${baseUrl}/task/getTaskByUser/${hrms_user?._id}`, true);
      return data;
   };

   const getAllProjectUserTaskApi2 = async (projectId) => {

      let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
      const data = await get(`${baseUrl}/task/getTaskByUserProject/${hrms_user?._id}/${projectId}`, true);
      return data;
   };

   const getProjectTask = async (projectId) => {

      const data = await get(`${baseUrl}/latest_project/getTasksByProjectId/${projectId}`, true);
      return data;
   };
   const getMyProjectTask = async (projectId, memberId) => {

      const data = await get(`${baseUrl}/latest_project/getUserTasksByProject/${memberId}/${projectId}`, true);
      return data;
   };
   const getThisMonthLeave = async (userId) => {

      const data = await get(`${baseUrl}/user/getThisMonthLeave/${userId}`, true);
      return data;
   };
   const fetchUserOwnDetailApi = async (userId) => {

      const data = await post(`${baseUrl}/user/getUserOwndetail/${userId}`, {}, true);
      return data;
   };
   const getTodayBirthday = async () => {

      const data = await get(`${baseUrl}/task/getBirthDayUser`, true);
      return data;
   };

   const getAllProjectAllTaskApi = async () => {

      const data = await get(`${baseUrl}/task/getAllTask`, true);
      return data;
   };

   const fetchAllTimesheetapi = async (id) => {

      const data = await get(`${baseUrl}/latest_project/getProjectTaskTimelines/${id}`, true);
      return data;
   };

   const fetchMonthlyLeave = async (month) => {
      const data = await post(`${baseUrl}/leave/monthlyLeave`, { month }, true);
      return data;
   }
   const LeaveAllowApihandler = async (user, allowance) => {

      const data = await post(`${baseUrl}/leave/leaveAllowance`, { user, allowance }, true);
      return data;
   }
   const leaveTypeApi = async ({ id }) => {

      const data = await post(`${baseUrl}/leave/leaveTypeApi`, { id }, true);
      return data;
   }
   const timerHandlerapi = async ({ taskId, Note, clockIn, clockOut, totalTime, projectId, submitedBy }) => {
      const data = await post(`${baseUrl}/latest_project/createTaskTimer`, { taskId, Note, clockIn, clockOut, totalTime, projectId, submitedBy }, true);
      return data;
   }

   // =============== Fetch common data only once when the app loads ===============
   useEffect(() => {
      const validUser = localStorage.getItem("hrms_user");
      if (validUser) {
         setUser(JSON.parse(validUser));
      }

   }, []);

   return (
      <MainContext.Provider value={{
         login, clientLogin, deleteQuotationapi, timerHandlerapi, saveLORLetterapi, saveLetter1Api, fetchMonthlyLeave, deleteExpenseApi, getExpenseApi, CreateExpense, saveRelivingLetterapi, getTodayBirthday, changeTaskStatusApi, getAllProjectUserTaskApi2, getProjectTask, getAllProjectAllTaskApi, getAllProjectUserTaskApi, CreateProjectTask, taskCreateApi, FetchFollowApi, getQuotationApi, ProvidePermission, RemovePermission, GetOpenLeadsApi, getLeadById, CreateNoteApi, updateNoteApi, DeleteNoteApi, getUserByDesignation, UpdateLeadStatus, UpdateLeadSource, AllLeadSource, meetCreateApi, AllLeadStatus, taskEditApi, meetEditApi, GetNoteApi, deleteTaskapi, deleteMeetapi, getTaskApi, getMeetApi, employeeLogin, employeeResetPassword, hrLogin, createHr, getHrs, deleteHr, createEmployee, getEmployees, getUsers, getActiveUsers, getActiveUsersCount, postLeadStatus, postLeadSource2, getAdminEmployees, getCheckInActivity, postActivity, editTaskapi, deleteProject, postActivityHr, getActivitiesByUser, getStatisticsByUser, getAllTaskUser, postLeave, updateLeave, getUserLeaves, getUserLeaveById, deleteLeave, getTotalLeaves, postTotalLeaves, verifyEmployee, verifyHr, verifyAdmin, setUser, buildAPI, user, disableClientapi, getProjects, postProject, getHolidays, postHoliday, updateProject, getProjectsByEmployee, getTasks, postTask, updateTask, deleteTask, setFlag, flag, changePassword, updateProfile, deleteHoliday, updateHoliday, deleteTaskProject, getChats, createNewChat, postMessage, deleteChat, getClientapi, adminLogin, getChat, getChatByUser, setUserTotalLeaveApi, setChatUser, chatUser, getEmployeesByEmployee, topDash, postAnnouncement, updateAnnouncement, getAnnouncements, getAnnouncementDates, deleteAnnouncement, getAttendance, getAttendanceByUser, createEmployee1, updateAdminProfile, createProjectapi, getAllProjectApi, editProjectapi
         , changePassword1, verify, updateUser, forgetPassword, forgetPassword1, forgetPassword2, getBranchs, postBranch, updateBranch, deleteBranch, getDepartments, postDepartment, updateDepartment, deleteDepartment, getDesingation, postDesignation, updateDesignation, deleteDesignation, getAllActivities, postLeaveType, updateLeaveType, getLeaveTypes, deleteLeaveType,
         createIndicator, getIndicator, deleteIndicator, getDesignations, updateIndicator, getAppraisal, createAppraisal, allEmployee, deleteApprisal, updateApprisal, createAssets, getAssets, deleteAssets, updateAssets, deleteUser, createTracks, getTracks, deleteTracks, updateTracks, editComApi, loanDeleteHandler,
         editAllowance, commisionDelteHandler, createLoan, editLoanApi, UpdatePermission,
         getTotalLeavesCount, uploadDocuments, createAnnouncement, updateAnnouncements, fetchAnnoucement, deleteAnnouncements, getEmp, allEmployeebyDep, notificationGet,
         acceptLeave, rejectLeave, leaveTypeApi,
         ProvideRemovePermission, postQuotationFormApi, updatePropsalFormApi, postProposalFormApi, createClientapi,
         updateQuotationFormApi, changeRelivingLetterPer, getThisMonthLeave,
         uploadOwnDocs, loading,allBranch, setBranch,
         transfer, setTransfer, resignation, getResignation, promotion, setPromotion,
         getAllLeads,
         updateDocSetup,
         getUpcomingBirthdays,
         changeOfferLetterPer,
         fetchAllDocs,
         updateAttendance,
         deleteDocSetup,
         postDocSetup,
         deleteAttendence,
         getMyProjectTask,
         postNotification, fetchUserNotify,
         togglePayslip,
         updateLeadStatus,
         deleteNotification,
         changeExperienceLetterPer,
         saveDocs,
         freelencerOfferApi,
         createAllowance,
         postNotifyLeavereq,
         getMyOfferLetter,
         getUserSlip,
         createCommision,
         updateLeadNote,
         createTermination, getTermination, deleteTermination, updateTermination, termination, setTermination, holiday, setHoliday,
         createWarning, getWarning, deleteWarning, updateWarning, announcement, setAnnouncement, allEmp, setAllEmp, allDep, setAllDep,
         createComplain, getComplain, updateComplain, deleteComplain, complain, setComplain, warning, setWarning,
         postAttendence,
         getAttendence, createResignation, deleteResignation, updateResignation,
         createPromotion, getPromotion, postAward,
         getAward, fetchClock, deleteAward, updateAward,
         createTransfer, getTransfer,
         deleteTransfer, updateTransfer,
         createTrainer, getTrainer, deleteTrainer, updateTrainer, createTrainingList, getTrainingList, updateTrainingList, deleteTrainingList, createHoliday, getHoliday, deleteHolidays, updateHolidays,
         getAllActivities2,
         createTrip, getTrip, deleteTrip, updateTrip, deletePromotion, updatePromotion,
         createLead,
         getLead,
         getLead2,
         allowDeleteHandler,
         fetchUserOwnDetailApi,
         deleteLeads, updateLead,
         uploadToCloudinaryImg,
         postQuotation,
         getQuotationAll,
         postFollowUp, updateFollowUp, deleteFollowUp, getFollowUp,
         fetchUserNotifyHR,
         createSallary,
         getSallary,
         userSalaryFetch, salaryCreate,
         createExcelLead,
         updateQuotation,
         fetchTodayLeave,
         deleteQuotation,
         departmentEmployee,
         LeaveAllowApihandler,
         getLead3,
         getLeadSources,
         postLeadSource,
         updateLeadSource,
         saveExperienceLetterapi,
         saveOfferInterLetterapi,
         deleteLeadSource,
         getIndustry,
         postIndustry,
         deleteIndustry,
         updateIndustry,
         getLeadByUser,
         DeleteRoleApi, awards, setAwards,
         getLeadStat,
         postLeadStat, getMonthlyWorkingHours,
         updateLeadStat,
         deleteLeadStat,
         getUserByDesignation1,
         postQuotation1,
         getQuotationAll1,
         updateQuotation1,
         deleteQuotation1, getLeadCatgory, postLeadCategory, updateLeadCategory, deleteLeadCategory, postLeadSubCategory, getLeadSubCategory, updateLeadSubCategory, deleteLeadSubCategory,
         uploadSingleImage, postClientNotification, getClientNotification, markedNotification,
         getAllProjectUserApi, postNotifyProject, postNotifyTask,
         savenoteatt, AllRolesapi, FetchMyLeave, closeLead, deleteQproapi, createExpenseApi, changeStatusBreak, deleteProjectTaskapi22, EditProjectTask, postHalfDay, closeLeadApiFetch2, closeLeadApiFetch, postNotification2, getUserHalfDay, rejectHalfDay, acceptHalf, acceptassetsapi, getTodayLead, getTodayLead2, getSaveTempalte, statuschangeapi, UploadFileProjectapi, allfilesproject, deleteProjectFile, fetchAllTimesheetapi, getClientProject
      }}>
         {props.children}
      </MainContext.Provider>
   );
};

export default MainState