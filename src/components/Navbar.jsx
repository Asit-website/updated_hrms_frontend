import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMain } from '../hooks/UseMain';
import { useClickOutside } from '../hooks/useClickOutside';
import { useAuth } from '../Context/AuthContext';

const Navbar = ({ showSidebar, setShowSidebar }) => {
  const { user } = useAuth();
  const { allEmployee, getDepartments, getBranchs, fetchUserNotify, markedNotification } = useMain()
  const currentUser = JSON.parse(localStorage.getItem('hrms_user'));
  const { fullName, email, profileImage } = currentUser;
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [allNotication, setAllNotification] = useState([]);
  const [loading, setLoading] = useState();
  const [shownotify, setShownotify] = useState(false);
  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));
  const { permissionPagePermission } = hrms_permission

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate('/login');
  };

  const fetchNotification = async () => {
    const ans = await fetchUserNotify();
    if (ans?.status) {
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
      const now = Date.now();

      let notifications = ans?.notifications || [];
      const validNotifications = notifications.filter(notification => {
        const receivedTimestamp = Number(notification?.date);
        return now - receivedTimestamp <= sevenDaysInMs;
      });

      const reversedNotifications = validNotifications.slice().reverse();
      setAllNotification(reversedNotifications);
    }
  };

  const markedReadNotification = async (id) => {
    setLoading(id);
    const ans = await markedNotification(id);
    if (ans.status === 200) {
      fetchNotification();
      toast.success("Marked Read");
    }
    setLoading(null);
  };

  const unreadNotifications = allNotication.filter(notification => !notification.IsRead);
  const unreadCount = unreadNotifications.length;
  const bellRef = useRef(null);

  const toggleNotification = (e) => {
    e.stopPropagation();
    setShownotify((prev) => !prev);
  };

  const notificationWrapper = useClickOutside((e) => {
    // if (bellRef.current?.contains(e.target)) return;
    setShownotify(false);
  });

  const profileWrapper = useClickOutside(() => {
    setDropdownOpen(false);
  });

  useEffect(() => {
    allEmployee();
    getDepartments();
    getBranchs();
    fetchNotification();
  }, [])

  useEffect(() => {
    fetchNotification();
    const interval = setInterval(fetchNotification, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(shownotify)
  }, [shownotify])

  return (

    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1720px] flex items-center justify-between mx-auto p-4 md:px-8">
          <NavLink to="/">
            <img
              src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1739012691/logo_zckmvw.png"
              className="w-40"
              alt="KushelDigi Logo"
            />
          </NavLink>

          <div className='flex items-center gap-5'>
            <div className="relative cursor-pointer inline-block " ref={bellRef} onClick={toggleNotification}>
              <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748275066/notifications_fyy92v.png" alt="Notification" className="h-7 w-7" />

              {unreadCount > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-5 flex items-center justify-center cursor-pointer">
                  {unreadCount}
                </div>
              )}
            </div>

            <div className="relative flex items-center gap-1 md:gap-5 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-10 h-10 rounded-full"
                  src={profileImage}
                  alt="user photo"
                />
              </button>

              <button className=" bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white md:hidden" onClick={() => setShowSidebar(!showSidebar)}>{showSidebar ? <RxCross2 fontSize={21} /> : <GiHamburgerMenu fontSize={21} />}</button>
              {dropdownOpen && (
                <div ref={profileWrapper} className="absolute right-0 top-7 border border-gray-300 z-50 w-48 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">{fullName}</span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{email}</span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <NavLink to="/adminDash/mySelf" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">MySelf</NavLink>
                    </li>
                    {
                      (permissionPagePermission || user?.role === "ADMIN") && (
                        <li>
                          <NavLink to="/adminDash/Permission" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Permission </NavLink>
                        </li>
                      )
                    }
                    <li>
                      <p onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">Log out</p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>


        </div>
      </nav>

      {shownotify && (
        <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-screen flex justify-end">
          <div ref={notificationWrapper} className="notifcont">
            <nav className='flex items-center justify-between sticky top-0 bg-white p-3'>
              <div>
                <h2 className='text-left text-[16px] font-semibold'>Notifications</h2>
              </div>
              <img className="cursor-pointer" onClick={() => setShownotify(false)} src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747220403/Vector_pbkqdp.png" alt="" />
            </nav>
            <hr className='mb-3' />
            <div className="flex flex-col gap-4">
              {allNotication.length > 0 ? (
                <div>
                  {allNotication?.map((item, index) => (
                    <div key={index} className={`flex flex-row gap-2 justify-between items-center border-b-[1px] p-3 border-gray-300 ${item.IsRead ? "bg-gray-200" : "bg-white"}`}>
                      <div>
                        <h2 className='text-sm font-medium text-left'>{item?.title}</h2>
                        <p className='text-[12px] font-medium text-left'>{item?.description}</p>
                        <p className='text-[12px] font-medium text-left'>Date : {new Date(parseInt(item?.date)).toLocaleDateString()}</p>
                      </div>
                      {item.IsRead === false && (
                        <button
                          onClick={() => markedReadNotification(item._id)}
                          className="bg-white px-1 py-1 max-h-[40px] min-w-[100px] text-[12px] font-medium rounded border border-gray-300"
                          disabled={loading}
                        >
                          {loading === item?._id ? 'Loading...' : 'Mark as Read'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[calc(100vh_-_150px)] items-center justify-center">
                  <div>
                    <img className='w-24 m-auto' src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748276773/3f44b9e4d7c9231953cfadd9b23e6da861d9cc76_bvoplv.png" alt="bell-img" />
                    <h4>No Notification found</h4>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
