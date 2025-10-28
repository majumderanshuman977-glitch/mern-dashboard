import { useEffect, useState } from 'react'
import API from '../api/axios'


export default function Categories() {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')


    useEffect(() => {
        API.get('/categories').then(r => setCategories(r.data)).catch(() => { })
    }, [])


    const submit = async (e) => {
        e.preventDefault()
        await API.post('/categories', { name, description })
        const res = await API.get('/categories')
        setCategories(res.data)
        setName('')
        setDescription('')
    }


    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <form onSubmit={submit} className="mb-4 grid grid-cols-3 gap-3">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="p-2 border" />
                <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="p-2 border" />
                <div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Category</button>
                </div>
            </form>


            <div className="bg-white shadow rounded p-3">
                <ul>
                    {categories.map(c => (
                        <li key={c._id} className="p-2 border-b">{c.name} — {c.description}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}