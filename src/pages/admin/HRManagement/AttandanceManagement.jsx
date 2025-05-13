import React, { useEffect, useState, useMemo } from 'react';
import ActionMenu from '../../../components/ActionMenu';
import { useMain } from '../../../hooks/UseMain';
import { IoSearch } from "react-icons/io5";
import Upload from '../../../Assets/images/upload_2.png';
import { CSVLink } from "react-csv";

function AttandanceManagement() {
    const {
        getAllActivities,
        allAttandance,
        allDep,
        allEmp,
        getAllActivities2,
        setAllAttandance
        // postAttendence, updateAttendance, deleteAttendence,
    } = useMain();

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const [active, setActive] = useState("Daily Report")
    const [form, setForm] = useState({
        type: "monthly",
        date: "",
        month: "",
        userId: "",
        department: "Select Department",
        year: ""
    })

    const getMonthlyAttandance = async () => {
        if (form.year && form.month && form.userId) {
            const data = await getAllActivities2(form.type, form.date, form.month, form.userId, form.department, form.year);
            if (data?.status) {
                setAllAttandance(data?.data?.reverse())
                setCurrentPage(1)
            }
            console.log("Form:", form);
            console.log("All Attendance:", data?.data);

        } else {
            alert("Please select all fields");
        }
    }


    const calculateTime = (clockIn, clockOut) => {
        if (!clockIn || !clockOut) return false;

        const getHour = (time) => {
            const hour = parseInt(time.split(":")[0]);
            return hour === 12 ? 12 : hour % 12;
        };

        let inHour = getHour(clockIn), outHour = getHour(clockOut), count = 0;

        while (inHour !== outHour) {
            inHour = inHour === 12 ? 1 : inHour + 1;
            count++;
        }

        return count >= 9;
    };
    function formatDate(dateString) {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    }
    const [mat, setMat] = useState({
        date: "",
        department: ""
    })


    // Filter and paginate attendance data
    const filteredData = useMemo(() => {
        return allAttandance.filter((item) => {
            const matchesSearchTerm =
                item?.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item?.Date?.includes(searchTerm);

            const matchesDate = mat.date ? item.Date === formatDate(mat.date) : true;
            const matchesDepartment = mat.department ? item?.user?.department === mat.department : true;

            return matchesSearchTerm && matchesDate && matchesDepartment;
        });
    }, [allAttandance, searchTerm, mat]);


    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, currentPage]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const headers = [
        { label: "Employee", key: "user.fullName" },
        { label: "Department", key: "user.department" },
        { label: "Date", key: "Date" },
        { label: "Clock In", key: "clockIn" },
        { label: "Clock Out", key: "clockOut" },
        { label: "Break", key: "break" },
        { label: "Today Task", key: "todayTask" },
        { label: "Note", key: "Note" },
    ];

    const normalizedData = allAttandance?.map((item) => ({
        ...item,
        user: {
            fullName: item?.user?.fullName || '',
            department: item?.user?.department || '',
        },
        break: item?.overTime || item?.break || '',
    }));

    useEffect(() => {
        if (!allAttandance.length) {
            getAllActivities();
        }
    }, []);


    useEffect(() => {
        if (active === "Daily Report") {
            getAllActivities();
            setCurrentPage(1)
        } else if (active === "Monthly Report") {
            setForm(prev => ({ ...prev, type: 'monthly' }));

        }
    }, [active]);

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                <h1 className="text-2xl font-semibold">Attendance Management</h1>
                <button className='bg-blue-800 font-semibold px-4 py-2 text-white flex justify-between items-center gap-2 rounded'>
                    <img src={Upload} alt="" className='h-5 w-5' />
                    <span>Upload File</span>
                </button>
            </div>

            <div className="bg-white rounded-lg border  shadow-sm">
                {/* Header: Report Toggle + Filters */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4  p-4">
                    {/* Toggle Buttons */}
                    <div className="flex gap-4">
                        <button onClick={() => setActive('Daily Report')} className={`px-6 py-2 text-sm font-medium rounded ${active === "Daily Report" ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'} `}>
                            Daily Report
                        </button>
                        <button onClick={() => setActive('Monthly Report')} className={`px-6 py-2 text-sm font-medium rounded ${active === "Monthly Report" ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'} `}>
                            Monthly Report
                        </button>
                    </div>

                    {active === "Daily Report" ? <div className="flex flex-wrap items-center gap-4">
                        <input
                            type="date"
                            className="border rounded px-3 py-2 text-sm"
                            value={mat.date}
                            onChange={(e) => setMat({ ...mat, date: e.target.value })}
                        />

                        <select
                            className="border rounded px-3 py-2 text-sm w-40"
                            value={mat.department}
                            onChange={(e) => setMat({ ...mat, department: e.target.value })}
                        >
                            <option value="">All Departments</option>
                            {allDep?.map((e, i) => (
                                <option key={i} value={e?.name}>{e?.name}</option>
                            ))}
                        </select>

                        <button
                            className="flex items-center gap-2 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 text-sm"
                        >
                            <IoSearch /> Search
                        </button>

                    </div> : <div className="flex flex-wrap items-center gap-4">
                        <input
                            type="month"
                            className="border rounded px-3 py-2 text-sm w-40"
                            value={form.month && form.year ? `${form.year}-${form.month}` : ""}
                            onChange={(e) => {
                                const [year, month] = e.target.value.split("-");
                                setForm({ ...form, month, year });
                            }}

                        />
                        <select
                            className="border rounded px-3 py-2 text-sm w-40"
                            value={form.userId}
                            onChange={(e) => setForm({ ...form, userId: e.target.value })}
                        >
                            <option value="">Select Employee</option>
                            {allEmp?.map((e, i) => (
                                <option key={i} value={e?._id}>{e?.fullName}</option>
                            ))}
                        </select>
                        <button
                            className="flex items-center gap-2 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 text-sm"
                            onClick={getMonthlyAttandance}
                        >
                            <IoSearch /> Search
                        </button>

                    </div>
                    }


                </div>

                {/* Sub Header: Title + Search + Export */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4  p-4 border-t border-gray-300 pt-4">
                    <h2 className="text-lg font-semibold">Daily Attendance</h2>
                    <div className='flex gap-4'>

                        <input
                            type="text"
                            placeholder="Search by Employee"
                            className="border px-4 py-2 rounded-md w-full sm:w-auto"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />

                        <CSVLink
                            headers={headers}
                            data={normalizedData}
                            filename={"daily-attendance.csv"}
                            className="px-5 py-2 border border-green-500 text-green-600 rounded hover:bg-green-50 text-sm"
                        >
                            Export
                        </CSVLink>

                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 border-b">Employee</th>
                                <th className="py-3 px-4 border-b">Department</th>
                                <th className="py-3 px-4 border-b">Date</th>
                                <th className="py-3 px-4 border-b">Status</th>
                                <th className="py-3 px-4 border-b">Clock In</th>
                                <th className="py-3 px-4 border-b">Clock Out</th>
                                <th className="py-3 px-4 border-b">Break</th>
                                {/* <th className="py-3 px-4 border-b">Task</th> */}
                                <th className="py-3 px-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length ? (
                                paginatedData.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 border-b">{item?.user?.fullName}</td>
                                        <td className="px-4 py-3 border-b">{item?.user?.department || 'N/A'}</td>
                                        <td className="px-4 py-3 border-b">{item?.Date}</td>
                                        <td className="px-4 py-3 border-b">{calculateTime(item.clockIn, item.clockOut)
                                            ? "Full Day"
                                            : "Half Day"}</td>
                                        <td className="px-4 py-3 border-b">{item?.clockIn}</td>
                                        <td className="px-4 py-3 border-b">{item?.clockOut}</td>
                                        <td className="px-4 py-3 border-b"> {item?.breakTime ? item?.breakTime : "No break"}</td>
                                        {/* <td className="px-4 py-3 border-b">{item?.todayTask.length}</td> */}
                                        <td className="px-4 py-3 border-b">
                                            <ActionMenu />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center py-4 text-gray-500">
                                        No results found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>



            {/* Pagination Controls */}
            {filteredData?.length > 4 && <div className="flex justify-center items-center mt-4 gap-2">
                <button
                    className="px-4 py-1.5 border border-black  rounded-lg"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Prev
                </button>
                <span className="text-sm">
                    {currentPage} / {totalPages}
                </span>
                <button
                    className="px-4 py-1.5 border border-black  rounded-lg"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>}

        </div>
    );
}

export default AttandanceManagement;