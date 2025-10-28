import React from 'react'
import { NavLink } from 'react-router-dom'
import {
    HomeIcon,
    ChartBarIcon,
    TagIcon,
    ShoppingBagIcon,
    CubeIcon
} from '@heroicons/react/24/outline';

const links = [
    { to: '/', label: 'Dashboard', icon: HomeIcon },
    { to: '/products', label: 'Products', icon: CubeIcon },
    { to: '/categories', label: 'Categories', icon: TagIcon },
    { to: '/sales', label: 'Sales', icon: ChartBarIcon },
]

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r">
            <div className="p-5 text-xl font-bold">Sales Admin</div>
            <nav className="mt-6">
                {links.map(l => (
                    <NavLink key={l.to} to={l.to} className={({ isActive }) => `flex items-center gap-3 p-3 hover:bg-gray-50 ${isActive ? 'bg-gray-100 font-semibold' : ''}`}>
                        <l.icon className="w-5 h-5" />
                        <span>{l.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}