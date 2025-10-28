import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'
const Layout = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout