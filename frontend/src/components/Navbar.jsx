import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function Navbar() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }


    return (
        <header className="bg-white p-4 border-b flex justify-between items-center">
            <div className="text-lg font-medium">Dashboard</div>
            <div>
                <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </div>
        </header>
    )
}