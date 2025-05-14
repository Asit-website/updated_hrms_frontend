import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div
          className={`flex-1 transition-all overflow-hidden pt-20 ${showSidebar ? "md:ml-80" : ""
            }`}
        >
          {/* {children} */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
