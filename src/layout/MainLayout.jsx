import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {

    const [showSidebar, setShowSidebar] = useState(true); 

    return (
        <>
            <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
            <div className="flex">
                <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
                <div className={`flex-1 transition-all ${showSidebar ? "md:ml-80" : ''}`}>
                {children}
                </div>
            </div>
        </>
    );
};

export default MainLayout;
