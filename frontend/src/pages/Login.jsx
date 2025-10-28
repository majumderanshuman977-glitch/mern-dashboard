import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const nav = useNavigate()


    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post('/auth/login', { email, password })
            const token = res.data.token
            localStorage.setItem('token', token)
            nav('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
                {error && <div className="text-red-500 mb-3">{error}</div>}
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border mb-3" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border mb-4" />
                <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
            </form>
        </div>
    )
}