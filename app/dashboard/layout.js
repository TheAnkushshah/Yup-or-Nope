"use client";

import { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";

function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const closeSidebar = () => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div>
            <div className={`fixed top-0 left-0 h-screen md:w-64 w-64 bg-white z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <SideNav />
            </div>
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'} md:ml-64`}
            onClick={closeSidebar}
            >
                <Header toggleSidebar={toggleSidebar} />
                
                <div>{children}</div>
            </div>
        </div>
    );
}

export default Layout;

