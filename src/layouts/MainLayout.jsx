import { Outlet } from "react-router-dom";
import { Suspense, lazy } from 'react';
import React from 'react';

const Header = React.lazy(() => import("../components/Header"));
const Sidebar = React.lazy(() => import("../components/Sidebar"));
export default function MainLayout() {
    return (
        <div id="app-container" className="bg-gray-100 flex h-screen overflow-hidden">
            <Sidebar />
            <div id="main-content" className="flex-1 p-4 h-full overflow-y-auto">
                <Header />
                <Outlet />
            </div>
        </div>
    );
}