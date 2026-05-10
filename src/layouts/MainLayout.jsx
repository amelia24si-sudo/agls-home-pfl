import { Outlet } from "react-router-dom";
import React from 'react';

const Header = React.lazy(() => import("../components/Header"));
const Sidebar = React.lazy(() => import("../components/Sidebar"));

export default function MainLayout() {
    return (
        // Mengubah background ke dark navy
        <div id="app-container" className="bg-[#151728] text-white flex h-screen overflow-hidden">
            <Sidebar />
            <div id="main-content" className="flex-1 flex flex-col h-full overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}