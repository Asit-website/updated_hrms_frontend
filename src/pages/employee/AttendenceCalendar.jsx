import React, { useRef, useState } from "react";
import { useMain } from "../../hooks/UseMain";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useAuth } from "../../Context/AuthContext";
import { useClickOutside } from "../../hooks/useClickOutside";

const AttendenceCalendar = () => {
    let todayDate = new Date().toLocaleDateString("en-GB");
    const {
        
        getActivitiesByUser,
        getAttendence,
    } = useMain();
    const { user } = useAuth();
    const [value, onChange] = useState(new Date());
    const [loadFlag, setLoadFlag] = useState(false);
    const [mainData, setMainData] = useState({});

    const [currdate, setCurrdate] = useState("");

    const [Note, setNote] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const getData = async (date) => {
        setLoadFlag(true);
        const data = await getActivitiesByUser(date, "", "", 0, 10, "");
        setMainData(data.data[0]);
        setLoadFlag(false);
    };

    useEffect(() => {
        getData(todayDate);
    }, []);
    const [allClock, setAllClock] = useState([])

    const getClock = async (date) => {
        let user = localStorage.getItem("hrms_user");
        const userDetail = JSON.parse(user);
        const id = userDetail?._id;
        const attendece = await getAttendence({ id, date });

        if (attendece.status) {
            setAllClock(attendece?.data)
            if (attendece?.data?.clockIn && attendece?.data?.clockOut) {
                if (attendece?.data?.Note) {
                    setNote(attendece?.data?.Note);
                } else {
                    setNote("");
                }
                if (attendece?.data?.todayTask) {
                    settask(attendece?.data?.todayTask);
                } 
                setClockOut(attendece?.data?.clockOut);
                setTotalBreak(attendece?.data?.breakTime);
            } else {
                setNote("");
            }
        }
    };

    const navigate = useNavigate();

    const handleCalendar = (e) => {
        let date = new Date(e).toLocaleDateString("en-GB");
        setCurrdate(date);
        getClock(date);
        getData(date);
        setShowPopup(true);
    };

    const clockTimeWrapper = useClickOutside(() => {
        setShowPopup(false);
    })

    useEffect(() => {
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
            today.getMonth() + 1
        ).padStart(2, "0")}/${today.getFullYear()}`;

        getClock(formattedDate);
    }, []);

    return (
        <div className="w-full ">
            <div className="h-[calc(100vh_-_82px)] w-full p-5">
                <div className="flex-col">
                    <button onClick={() => navigate(-1)} style={{
                        marginBottom: "20px",
                        fontSize: "16px"
                    }} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                        <MdKeyboardBackspace />
                        Back
                    </button>


                    <div className="flex">
                        <div className="w-full">
                            <Calendar onChange={handleCalendar} value={value} className="p-10"/>
                        </div>

                        {showPopup && !loadFlag && (
                            <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[1px] z-[3000]">
                                <div ref={clockTimeWrapper} className="bg-gray-200 border flex flex-col gap-4 border-[#95D0C0] rounded-lg p-4 w-[35%]">

                                    {
                                        allClock?.length > 0 ? (
                                            allClock?.map((e, i) => (
                                                <div key={i}>
                                                    <div className="flex justify-between items-center bg-white p-4 rounded-lg">
                                                        <div>
                                                            <h3 className="font-medium">Check In</h3>
                                                            <h2 className="font-bold">{e?.clockIn ? e?.clockIn : "N/A"}</h2>
                                                        </div>

                                                        <div>
                                                            <h3 className="font-medium">Check Out</h3>
                                                            <h2 className="font-bold">{e?.clockOut ? e?.clockOut : "N/A"}</h2>
                                                        </div>

                                                        <div>
                                                            <h3 className="font-medium">Total Break</h3>
                                                            <h2 className="font-bold">{e?.totalBreak ? e?.totalBreak : "N/A"}</h2>
                                                        </div>
                                                    </div>

                                                    <div className="bg-white p-4 rounded-lg mt-2 font-semibold">
                                                        <p>{e?.todayTask === "" ? "N/A" : e?.todayTask}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="bg-white p-4 rounded-lg">
                                                <p className="text-center font-semibold">You haven't Check-In that Day.</p>
                                            </div>
                                        )
                                    }


                                </div>

                            </div>

                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendenceCalendar;
