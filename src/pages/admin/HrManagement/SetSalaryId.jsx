
import "react-calendar/dist/Calendar.css";

import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import { useMain } from "../../../hooks/UseMain";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";
const SetSallary = ({
    pop,
    setPop

}) => {
    const { user, salaryCreate, getSallary, userSalaryFetch, createAllowance, allowDeleteHandler, editAllowance, commisionDelteHandler, createCommision, editComApi, createLoan, loanDeleteHandler, editLoanApi, getUsers } = useMain();
    const [refreshFlag, setRefreshFlag] = useState(false);

    const [formdata, setFormdata] = useState({
        salary: "00",
        paySlipType: ""
    })
    const [formdata1, setFormdata1] = useState({
        salary: "00",
        paySlipType: "",
    })


    const location = useLocation();
    const state = location.state;

    const [user1, setUser1] = useState({});

    const fetchUserDetails = async () => {
        const ans = await getUsers(state);
        setUser1(ans?.data);
    }

    useEffect(() => {
        fetchUserDetails();
    }, [])

    const [Allowance, setAllowance] = useState([]);

    const [Loan, setLoan] = useState([]);

    const [Commission, setCommission] = useState([]);

    const [allowanceForm, setAllowanceForm] = useState({
        allowanceOption: "",
        title: "",
        type: "",
        amount: ""
    })

    const [loanForm, setLoanForm] = useState({
        LoanOption: "",
        title: "",
        type: "",
        loanAmount: "",
        reason: ""
    })

    const loanHandler = (e) => {
        const { name, value } = e.target;

        setLoanForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const [commisionForm, setCommisionForm] = useState({
        title: "",
        type: "",
        amount: ""
    })



    const allowChangeHandler = async (e) => {

        const { name, value } = e.target;

        setAllowanceForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const commisionChange = async (e) => {
        const { name, value } = e.target;
        setCommisionForm((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    const [data, setData] = useState([]);

    useEffect(() => {
        getData()
    }, [refreshFlag])

    const getData = async () => {
        const ans = await getSallary();
        setData(ans?.data);
    }

    const changeHandler = (e) => {
        const { name, value } = e.target;

        setFormdata1((prev) => ({
            ...prev,
            [name]: value
        }))

    }


    const [show, setShow] = useState(false);

    const [show1, setShow1] = useState(false);

    const [show2, setShow2] = useState(false);

    const [show3, setShow3] = useState(false);

    const [isAllowEdit, setIsAllowEdit] = useState(null);
    const [isCommisionEdit, setIsCommisionEdit] = useState(null);
    const [isLoanEdit, setIsLoanEdit] = useState(null);


    const stylePeer1 = {
        display: show ? "block" : "none"
    }

    const stylePeer2 = {
        display: show1 ? "block" : "none"
    }

    const stylePeer3 = {
        display: show2 ? "block" : "none"
    }

    const stylePeer4 = {
        display: show3 ? "block" : "none"
    }

    let { id } = useParams();

    const fetchUserSalary = async () => {
        const ans = await userSalaryFetch(id);
        if (ans?.status) {
            const { allowance, commission, loan, userDetails } = ans?.data;

            if (allowance) {
                setAllowance(allowance);
            }

            if (commission) {
                setCommission(commission);
            }

            if (loan) {
                setLoan(loan);
            }

            if (userDetails) {

                const { paySlipType, salary } = userDetails;

                if (paySlipType) {
                    formdata.paySlipType = paySlipType;
                    formdata1.paySlipType = paySlipType;
                }

                if (salary) {
                    formdata.salary = salary;
                    formdata1.salary = salary;
                }

            }
        }

    }

    const postSalary = async (e) => {
        e.preventDefault();

        const toastId = toast.loading("Loading...");
        try {

            const ans = await salaryCreate(formdata1?.paySlipType, formdata1?.salary, id);
            if (ans?.status) {
                toast.success("Successfuly created");
                fetchUserSalary();
                setShow(false);
            }
            else {
                toast.error("Something went wrong ,please try again later");
            }
        } catch (error) {
            toast.error("Internal server eror");
        }
        toast.dismiss(toastId);
    }

    useEffect(() => {
        fetchUserSalary();
    }, []);

    const editAllow = async (e) => {
        const toastId = toast.loading("Loading...");

        const ans = await editAllowance(allowanceForm?.allowanceOption, allowanceForm?.amount, allowanceForm?.title, allowanceForm?.type, isAllowEdit, id);

        if (ans?.status) {
            setAllowanceForm({
                allowanceOption: "",
                title: "",
                type: "",
                amount: ""
            })


            toast.success('Successfully updated');
            setShow1(false);

            fetchUserSalary();
            setIsAllowEdit(null);
        }
        else {
            toast.error("Something went wrong , please try again later");
        }

        toast.dismiss(toastId);
    }

    const postAllowance = async () => {
        const toatId = toast.loading("Loading...");

        const ans = await createAllowance(allowanceForm?.allowanceOption, allowanceForm?.amount, allowanceForm?.title, allowanceForm?.type, id);

        if (ans?.status) {

            setShow1(false);
            fetchUserSalary();
            setAllowanceForm({
                allowanceOption: "",
                title: "",
                type: "",
                amount: ""
            })

            toast.success("Succeesssfuly created");
        }
        else {
            toast.error("Something went wrong ");
        }

        toast.dismiss(toatId);

    }

    const deleteAllow = async (allowId) => {
        const toastId = toast.loading("Loading...");
        const ans = await allowDeleteHandler(allowId, id);

        if (ans?.status) {
            fetchUserSalary();
            toast.success("Successfuly deleted");
        }
        else {
            toast.error("Something went wrong ");
        }


        toast.dismiss(toastId);

    }

    const deleteLoan = async (loadId) => {
        const toastId = toast.loading("Loading...");
        const ans = await loanDeleteHandler(loadId, id);

        if (ans?.status) {
            fetchUserSalary();
            toast.success("Successfuly deleted");
        }
        else {
            toast.error("Something went wrong ");
        }


        toast.dismiss(toastId);

    }

    const deleteCommision = async (commId) => {
        const toastId = toast.loading("Loading...");
        const ans = await commisionDelteHandler(commId, id);

        if (ans?.status) {
            fetchUserSalary();
            toast.success("Successfuly deleted");
        }


        toast.dismiss(toastId);

    }

    const editCommision = async () => {
        const toastId = toast.loading("Loading...");

        const ans = await editComApi(commisionForm?.amount, commisionForm?.type, commisionForm?.title, isCommisionEdit, id);

        if (ans?.status) {
            setCommisionForm({
                allowanceOption: "",
                title: "",
                type: "",
                amount: ""
            })

            fetchUserSalary();

            toast.success('Successfully updated');
            setShow2(false);

            setIsCommisionEdit(null);
        }
        else {
            toast.error("Something went wrong , please try again later");
        }

        toast.dismiss(toastId);
    }

    const editLoan = async () => {
        const toastId = toast.loading("Loading...");

        const ans = await editLoanApi(loanForm?.LoanOption, loanForm?.title, loanForm?.type, loanForm?.loanAmount, loanForm?.reason, isLoanEdit, id);

        if (ans?.status) {
            setLoanForm({
                allowanceOption: "",
                title: "",
                type: "",
                amount: ""
            })

            fetchUserSalary();

            toast.success('Successfully updated');
            setShow3(false);

            setIsLoanEdit(null);
        }
        else {
            toast.error("Something went wrong , please try again later");
        }

        toast.dismiss(toastId);
    }

    const commisionSubmit = async () => {

        const toatId = toast.loading("Loading...");

        const ans = await createCommision(commisionForm?.amount, commisionForm?.type, commisionForm?.title, id);

        if (ans?.status) {

            setShow2(false);
            fetchUserSalary();
            setCommisionForm({
                title: "",
                type: "",
                amount: ""
            })

            toast.success("Succeesssfuly created");
        }
        else {
            toast.error("Something went wrong ");
        }

        toast.dismiss(toatId);


    }


    const loanSubmit = async () => {
        const toatId = toast.loading("Loading...");

        const ans = await createLoan(loanForm?.LoanOption, loanForm?.loanAmount, loanForm?.title, loanForm?.type, loanForm?.reason, id);

        if (ans?.status) {

            setShow3(false);
            fetchUserSalary();
            setLoanForm({
                LoanOption: "",
                title: "",
                type: "",
                loanAmount: ""
            })

            toast.success("Succeesssfuly created");
        }
        else {
            toast.error("Somthing went wrong , please try again");
        }

        toast.dismiss(toatId);

    }

    const [showIndex, setShowIndex] = useState(null);

    const popupwrapper = useRef();
    const popupallowance = useRef();
    const commisionpopwrapper = useRef();
    const loanpopupwrapper = useRef();
    const showupwrapper = useRef();

    useOutsideClick(showupwrapper,()=> {
        setShowIndex(null)
    })

    useOutsideClick(popupwrapper, () => {
        setShow(false);
        setIsAllowEdit(null);
        setIsCommisionEdit(null);
        setIsLoanEdit(null);
    })
    useOutsideClick(popupallowance, () => {
        setShow1(false);
        setIsAllowEdit(null);
        setIsCommisionEdit(null);
        setIsLoanEdit(null);
    })
    useOutsideClick(commisionpopwrapper, () => {
        setShow2(false);
        setIsAllowEdit(null);
        setIsCommisionEdit(null);
        setIsLoanEdit(null);
    })
    useOutsideClick(loanpopupwrapper, () => {
        setShow3(false);
        setIsAllowEdit(null);
        setIsCommisionEdit(null);
        setIsLoanEdit(null);
    })


    return (
        <>
            <div className="employee-dash h-full">
               
                <div className="w-full bg-[#f5f5f5]">
                 

                    <div className="pt-[32px] pr-[20px] pb-[32px] pl-[20px] relative w-full
">

                        <div className="flex-col flex flex-col gap-[24px]
">

                            {/* first  */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px] text-left
">Employee Set Salary</h2>
                            </div>

                            <div className="flex items-center">

                                <div className="w-full mx-[10px]
">
                                    <div className="w-full max-w-full rounded-[20px] h-[275px] max-h-full bg-white
">
                                        <div className="flex items-center justify-between border-b border-b-[#E8E9EB] px-[20px] py-[15px]">
                                            <div className="flex items-center
">
                                                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747481428/talent1_dyqojb.svg" alt="talent1" />
                                                <h2 className="text-[16px] font-semibold ml-[10px]
">Employee Salary Details</h2>
                                            </div>
                                            <div className="salary_head12">
                                                <img className="cursor-pointer" onClick={() => {
                                                    setShow(true);
                                                }} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png" alt="" />
                                            </div>
                                        </div>

                                        <div className="p-[20px] flex items-center
">
                                            <div className="text-[#0F141C] font-semibold font-inter text-[14px]
">
                                                <h3 className="text-[#0F141C] font-semibold text-[14px] "> Payslip Type</h3>
                                                <p className="text-[#545962] font-medium text-[12px] font-inter mt-[5px]

">{formdata?.paySlipType}</p>
                                            </div>
                                            <div className="text-[#0F141C] font-semibold font-inter text-[14px]
 ml-[100px]">
                                                <h3 className="text-[#0F141C] font-semibold text-[14px]
">Salary</h3>
                                                <p className="text-[#545962] font-medium text-[12px] font-inter mt-[5px]
">{formdata?.salary}</p>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="w-full max-w-full rounded-[20px] h-[275px] max-h-full bg-white
mt-5">
                                        <div className="flex items-center justify-between border-b border-b-[#E8E9EB] px-[20px] py-[15px]
">
                                            <div className="flex items-center
">
                                                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747481428/talent1_dyqojb.svg" alt="talent1" />
                                                <h2 className="text-[16px] font-semibold ml-[10px]
">Commission</h2>
                                            </div>
                                            <div className="salary_head12">
                                                <img className="cursor-pointer" onClick={() => {
                                                    setShow2(true);
                                                }} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="p-[20px] flex items-center
 salary_bdy11">
                                            <div className="relative overflow-x-auto w-full
">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr className="sipi sipi1">
                                                            <th scope="col" className="px-6 py-3">
                                                                Employee Name
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Title
                                                            </th>

                                                            <th scope="col" className="px-6 py-3">
                                                                Type
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Amount
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            Commission?.map((item, index) => (
                                                                <tr key={index} className="bg-white opos !font-medium !text-[11px]
 border-b dark:bg-gray-800 dark:border-gray-700">
                                                                    <th
                                                                        scope="row"
                                                                        className="px-6 py-4 oklo font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                                    >
                                                                        {user1?.fullName}
                                                                    </th>
                                                                    <td className="px-6 py-4">{item?.title}</td>
                                                                    <td className="px-6 py-4">{item?.type}</td>
                                                                    <td className="px-6 py-4">{item?.amount}</td>
                                                                    <td className="px-6 py-4">
                                                                        <div className="flex items-center">
                                                                            <img className="cursor-pointer" onClick={() => {
                                                                                setShow2(true);
                                                                                setIsCommisionEdit(item?._id);
                                                                                setCommisionForm({
                                                                                    title: item?.title,
                                                                                    type: item?.type,
                                                                                    amount: item?.amount
                                                                                })
                                                                            }} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747481492/elo_rzi17s.svg" alt="elo" />
                                                                            <img className="cursor-pointer" onClick={(e) => {
                                                                                e.preventDefault();
                                                                                deleteCommision(item?._id);
                                                                            }} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747481374/frema_ayb4lq.svg" alt="frema" />
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

                                <div className="!w-full mx-[10px]">
                                    <div className="w-full max-w-full rounded-[20px] h-[275px] max-h-full bg-white
">
                                        <div className="flex items-center justify-between border-b border-b-[#E8E9EB] px-[20px] py-[15px]
">
                                            <div className="flex items-center
">
                                                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747481428/talent1_dyqojb.svg" alt="talent1" />
                                                <h2 className="text-[16px] font-semibold ml-[10px]
">Allowance</h2>
                                            </div>
                                            <div className="salary_head12">
                                                <img className="cursor-pointer" onClick={() => {
                                                    setShow1(true);
                                                }} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="p-[20px] flex items-center
 salary_bdy11">
                                            <div className="relative overflow-x-auto w-full
">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr className="sipi sipi1">
                                                            <th scope="col" className="px-6 py-3">
                                                                Name
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Allowance Option
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Title
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Type
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Amount
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            Allowance?.map((item, index) => (
                                                                <tr key={index} className="bg-white opos !font-medium !text-[11px]
 border-b dark:bg-gray-800 dark:border-gray-700">
                                                                    <th
                                                                        scope="row"
                                                                        className="px-3 py-4 oklo font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                                    >
                                                                        {user1?.fullName}
                                                                    </th>
                                                                    <td className="px-3 py-4">{item?.allowanceOption}</td>
                                                                    <td className="px-3 py-4">{item?.title}</td>
                                                                    <td className="px-3 py-4">{item?.type}</td>
                                                                    <td className="px-3 py-4">{item?.amount}</td>
                                                                    <td className="px-3 py-4">
                                                                        <div className="flex items-center relative">
                                                                            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png" alt="action-btn" onClick={() => setShowIndex(showIndex === index ? null : index)} />
                                                                            {
                                                                                showIndex === index && (
                                                                                    <div ref={showupwrapper} className="absolute w-32 bg-white p-2 rounded-md border border-gray-300 -top-14 right-12">
                                                                                        <div className="cursor-pointer flex gap-1 p-1" onClick={() => {
                                                                                            setShow1(true);
                                                                                            setIsAllowEdit(item?._id);
                                                                                            setAllowanceForm({
                                                                                                allowanceOption: item?.allowanceOption,
                                                                                                title: item?.title,
                                                                                                type: item?.type,
                                                                                                amount: item?.amount
                                                                                            })
                                                                                        }}>
                                                                                            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747481492/elo_rzi17s.svg" alt="elo" />
                                                                                            <span>Edit</span>
                                                                                        </div>
                                                                                        <hr />
                                                                                        <div onClick={() => {
                                                                                                deleteAllow(item?._id);
                                                                                            }} className="flex gap-1 p-1 cursor-pointer">
                                                                                            <img className="cursor-pointer"  src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747481374/frema_ayb4lq.svg" alt="frema" />
                                                                                            <span>Delete</span>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            }



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

                                    <div className="w-full max-w-full rounded-[20px] h-[275px] max-h-full bg-white
mt-5">
                                        <div className="flex items-center justify-between border-b border-b-[#E8E9EB] px-[20px] py-[15px]
">
                                            <div className="flex items-center
">
                                                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747481428/talent1_dyqojb.svg" alt="talent1" />
                                                <h2 className="text-[16px] font-semibold ml-[10px]
">Loan</h2>
                                            </div>
                                            <div className="salary_head12">
                                                <img className="cursor-pointer" onClick={() => {
                                                    setShow3(true);
                                                }} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747392487/thredonts_jlsvvx.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="p-[20px] flex items-center
 salary_bdy11">
                                            <div className="relative overflow-x-auto w-full
">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr className="sipi sipi1">
                                                            <th scope="col" className="px-3 py-3">
                                                                Employee Name
                                                            </th>
                                                            <th scope="col" className="px-3 py-3">
                                                                Loan Option
                                                            </th>
                                                            <th scope="col" className="px-3 py-3">
                                                                Title
                                                            </th>
                                                            <th scope="col" className="px-3 py-3">
                                                                Type
                                                            </th>
                                                            <th scope="col" className="px-3 py-3">
                                                                Loan Amount
                                                            </th>
                                                            <th scope="col" className="px-3 py-3">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            Loan?.map((item, index) => (
                                                                <tr key={index} className="bg-white opos !font-medium !text-[11px]
 border-b dark:bg-gray-800 dark:border-gray-700">
                                                                    <th
                                                                        scope="row"
                                                                        className="px-3 py-4 oklo font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                                    >
                                                                        {user1?.fullName}
                                                                    </th>
                                                                    <td className="px-3 py-4">{item?.LoanOption}</td>
                                                                    <td className="px-3 py-4">{item?.title}</td>
                                                                    <td className="px-3 py-4">{item?.type}</td>
                                                                    <td className="px-3 py-4">{item?.loanAmount}</td>
                                                                    <td className="px-3 py-4">
                                                                        <div className="flex items-center">
                                                                            <img className="cursor-pointer" onClick={() => {
                                                                                setShow3(true);
                                                                                setIsLoanEdit(item?._id);
                                                                                setLoanForm({
                                                                                    title: item?.title,
                                                                                    type: item?.type,
                                                                                    loanAmount: item?.loanAmount,
                                                                                    reason: item?.reason,
                                                                                    LoanOption: item?.LoanOption
                                                                                })
                                                                            }} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747481492/elo_rzi17s.svg" alt="elo" />
                                                                            <img className="cursor-pointer" onClick={(e) => {
                                                                                e.preventDefault();
                                                                                deleteLoan(item?._id);
                                                                            }} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747481374/frema_ayb4lq.svg" alt="frema" />
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

                            </div>

                            {/* =============toggle1============ */}

                            <>
                                {/* Modal toggle */}

                                {/* Main modal */}
                                <div
                                    style={stylePeer1}
                                    id="authentication-modal"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[3000] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] lokig max-h-full backdrop-blur-[1px]"
                                >
                                    <div ref={popupwrapper} className="relative top-[30%] left-[40%] p-4 w-full max-w-md max-h-full">
                                        {/* Modal content */}
                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            {/* Modal header */}
                                            <div

                                                className="flex okad items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                <h3 className="text-xl font-semibold basic_sel text-gray-900 dark:text-white">
                                                    Set Basic Salary
                                                </h3>
                                                {/* <img className="cursor-pointer" onClick={() => {
                                                    setShow(false);
                                                    setIsAllowEdit(null);
                                                    setIsCommisionEdit(null);
                                                    setIsLoanEdit(null);


                                                }} src={oot} alt="oot" /> */}
                                            </div>
                                            {/* Modal body */}
                                            <div className="p-4 md:p-5">
                                                <form className="space-y-4 kinh" onSubmit={postSalary}>
                                                    <div>
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Payslip Type*
                                                        </label>
                                                        <select onChange={changeHandler} name="paySlipType" value={formdata1?.paySlipType} id="paySlipType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                            <option disabled >Select Payslip</option>
                                                            <option>Monthly Paysleep</option>
                                                        </select>
                                                    </div>
                                                    <div className="mt-4">
                                                        <label
                                                            htmlFor="password"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Salary
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="salary"
                                                            id="salary"
                                                            value={formdata1?.salary}
                                                            onChange={changeHandler}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                            required=""
                                                        />
                                                    </div>
                                                    <div className="buttons_formo">
                                                        <button type="submit" className="text-white sarfros bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save Change</button>
                                                        <button onClick={() => {
                                                            setShow(false);
                                                            setIsAllowEdit(null);
                                                            setIsCommisionEdit(null);
                                                            setIsLoanEdit(null);

                                                        }} type="button" className="text-gray-900 sarfros1 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>

                            {/* ===============toggle1 end============ */}

                            {/* ===================toggle2 start=============== */}
                            <>
                                {/* Modal toggle */}

                                {/* Main modal */}
                                <div
                                    style={stylePeer2}
                                    id="authentication-modal1"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[3000] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] lokig max-h-full backdrop-blur-[1px]"
                                >
                                    <div ref={popupallowance} className="relative sekin sekin1 p-4 w-full max-w-md max-h-full">
                                        {/* Modal content */}
                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            {/* Modal header */}
                                            <div className="flex okad items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                <h3 className="text-xl font-semibold basic_sel text-gray-900 dark:text-white">
                                                    Create Allowance
                                                </h3>
                                                {/* <img className="cursor-pointer" onClick={() => {
                                                    setShow1(false);
                                                    setIsAllowEdit(null);
                                                    setIsCommisionEdit(null);
                                                    setIsLoanEdit(null);

                                                }} src={oot} alt="oot" /> */}
                                            </div>
                                            {/* Modal body */}
                                            <div className="p-4 md:p-5">
                                                <form className="space-y-4 kinh" action="#">
                                                    <div className=" flex items-center fgg">
                                                        <div className="w-full">
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Allowance Options*
                                                            </label>
                                                            <select value={allowanceForm.allowanceOption} name="allowanceOption" onChange={allowChangeHandler} id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                                <option value="">Select Allowance</option>
                                                                <option>Allowance</option>
                                                                <option>Travel Allowance</option>
                                                            </select>
                                                        </div>
                                                        <div className="w-full fggg ">
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Title
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={allowanceForm.title} name="title" onChange={allowChangeHandler}
                                                                id="title"
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                                required=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className=" flex items-center mt-4 fgg">
                                                        <div className="w-full">
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Type
                                                            </label>
                                                            <select value={allowanceForm.type} name="type" onChange={allowChangeHandler} id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                                <option>Select Type</option>
                                                                <option>Fixed</option>
                                                            </select>
                                                        </div>
                                                        <div className="w-full fggg">
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Amount
                                                            </label>
                                                            <input
                                                                type="number"
                                                                value={allowanceForm.amount} name="amount" onChange={allowChangeHandler} id="amount"
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                                required=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="buttons_formo">
                                                        <button onClick={(e) => {
                                                            e.preventDefault();
                                                            if (isAllowEdit) {
                                                                editAllow();

                                                            }
                                                            else {

                                                                postAllowance();
                                                            }
                                                        }
                                                        } type="submit" className="text-white sarfros bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isAllowEdit !== null ? "Update" : "Create"}</button>
                                                        <button onClick={() => {
                                                            setShow1(false);
                                                            setIsAllowEdit(null);
                                                            setIsCommisionEdit(null);
                                                            setIsLoanEdit(null);

                                                        }} type="button" className="text-gray-900 sarfros1 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>

                            {/* ===================toggle2 end============= */}

                            {/* ===================toggle3 start============= */}

                            <>
                                {/* Modal toggle */}

                                {/* Main modal */}
                                <div
                                    style={stylePeer3}
                                    id="authentication-modal2"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[3000] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] lokig max-h-full backdrop-blur-[1px]"
                                >
                                    <div ref={commisionpopwrapper} className="relative sekin sekin1 p-4 w-full max-w-md max-h-full">
                                        {/* Modal content */}
                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            {/* Modal header */}
                                            <div className="flex okad items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                <h3 className="text-xl font-semibold basic_sel ">
                                                    Create Commission
                                                </h3>
                                                {/* <img className="cursor-pointer" onClick={() => {
                                                    setShow2(false);
                                                    setIsAllowEdit(null);
                                                    setIsCommisionEdit(null);
                                                    setIsLoanEdit(null);

                                                }} src={oot} alt="oot" /> */}
                                            </div>
                                            {/* Modal body */}
                                            <div className="p-4 md:p-5">
                                                <form className="space-y-4 kinh" action="#">
                                                    <div className=" flex items-center fgg">

                                                        <div className="w-full">
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Title
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="title"
                                                                onChange={commisionChange}
                                                                value={commisionForm.title}


                                                                id="salary"
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                                required=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className=" flex items-center mt-4 fgg">
                                                        <div className="w-full">
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Type
                                                            </label>
                                                            <select value={commisionForm?.type} onChange={commisionChange} name="type" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                                <option>Select Type</option>
                                                                <option>Fixed</option>
                                                            </select>
                                                        </div>
                                                        <div className="w-full fggg">
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Amount
                                                            </label>
                                                            <input
                                                                value={commisionForm?.amount} onChange={commisionChange} name="amount"
                                                                type="number"
                                                                id="amount"
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                                required=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="buttons_formo">
                                                        <button onClick={(e) => {
                                                            e.preventDefault();

                                                            if (isCommisionEdit) {
                                                                editCommision();
                                                            }
                                                            else {
                                                                commisionSubmit();
                                                            }
                                                        }} type="submit" className="text-white sarfros bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isCommisionEdit !== null ? "Update" : "Create"}</button>
                                                        <button onClick={() => {
                                                            setShow2(false);
                                                            setIsAllowEdit(null);
                                                            setIsCommisionEdit(null);
                                                            setIsLoanEdit(null);

                                                        }} type="button" className="text-gray-900 sarfros1 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            {/* ======================toggle3 end================ */}

                            {/* ===================toggle4 start=========== */}
                            <>
                                {/* Modal toggle */}

                                {/* Main modal */}
                                <div
                                    style={stylePeer4}
                                    id="authentication-modal3"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[3000] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] lokig max-h-full backdrop-blur-[1px]"
                                >
                                    <div ref={loanpopupwrapper} className="relative sekin sekin1 p-4 w-full max-w-md max-h-full">
                                        {/* Modal content */}
                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            {/* Modal header */}
                                            <div className="flex okad items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                <h3 className="text-xl font-semibold basic_sel ">
                                                    Create Loan
                                                </h3>
                                                {/* <img className="cursor-pointer" onClick={() => {
                                                    setShow3(false);
                                                    setIsAllowEdit(null);
                                                    setIsCommisionEdit(null);
                                                    setIsLoanEdit(null);

                                                }} src={oot} alt="oot" /> */}
                                            </div>
                                            {/* Modal body */}
                                            <div className="p-4 md:p-5">
                                                <form className="space-y-4 kinh" action="#">
                                                    <div className=" flex items-center fgg">
                                                        <div className="w-full">
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Title
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="salary"
                                                                name="title"
                                                                onChange={loanHandler}
                                                                value={loanForm?.title}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                                required=""
                                                            />
                                                        </div>
                                                        <div className="w-full fggg">
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Loan Options*
                                                            </label>
                                                            <select name="LoanOption"
                                                                onChange={loanHandler}
                                                                value={loanForm?.LoanOption} id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                                <option value="">Select Loan</option>
                                                                <option>Health Insurance</option>

                                                            </select>
                                                        </div>

                                                    </div>
                                                    <div className=" flex items-center fgg mt-5">
                                                        <div className="w-full">
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Type
                                                            </label>
                                                            <select name="type"
                                                                onChange={loanHandler}
                                                                value={loanForm?.type} id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                                <option value="">Select Type</option>
                                                                <option>Fixed</option>

                                                            </select>
                                                        </div>
                                                        <div className="w-full fggg">
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Loan Amount
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="loanAmount"
                                                                onChange={loanHandler}
                                                                value={loanForm?.loanAmount}
                                                                id="salary"
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                                required=""
                                                            />
                                                        </div>


                                                    </div>

                                                    <div className=" flex items-center fgg mt-5">

                                                        <div className="w-full">
                                                            <label
                                                                htmlFor="email"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Reason
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="reason"
                                                                onChange={loanHandler}
                                                                value={loanForm?.reason}
                                                                id="salary"
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                                required=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="buttons_formo">
                                                        <button onClick={(e) => {
                                                            e.preventDefault();

                                                            if (isLoanEdit) {
                                                                editLoan();
                                                            }
                                                            else {
                                                                loanSubmit();
                                                            }
                                                        }} type="submit" className="text-white sarfros bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isLoanEdit !== null ? "Update" : "Create"}</button>
                                                        <button onClick={() => {
                                                            setShow3(false);
                                                            setIsAllowEdit(null);
                                                            setIsCommisionEdit(null);
                                                            setIsLoanEdit(null);

                                                        }} type="button" className="text-gray-900 sarfros1 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            {/* ================toggle4 end================ */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetSallary;
