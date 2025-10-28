import { useEffect, useState } from 'react'
import API from '../api/axios'

export default function Categories() {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [search, setSearch] = useState('')

    // Fetch categories with search & pagination
    const fetchCategories = async (pageNum = 1, searchQuery = '') => {
        try {
            const res = await API.get(`/categories?page=${pageNum}&limit=8&search=${searchQuery}`)
            setCategories(res.data.data)
            setTotalPages(res.data.totalPages)
            setPage(res.data.currentPage)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchCategories(1)
    }, [])

    const submit = async (e) => {
        e.preventDefault()
        await API.post('/categories', { name, description })
        setName('')
        setDescription('')
        fetchCategories(page, search)
    }

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
        fetchCategories(1, value) // reset to page 1 on new search
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Categories</h2>

            {/* Add Category Form */}
            <form onSubmit={submit} className="mb-4 grid grid-cols-3 gap-3">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="p-2 border"
                />
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="p-2 border"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add Category
                </button>
            </form>

            {/* Search Box */}
            <div className="mb-4">
                <input
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search categories..."
                    className="p-2 border w-full rounded"
                />
            </div>

            {/* Category List */}
            <div className="bg-white shadow rounded p-3">
                {categories.length === 0 ? (
                    <p className="text-gray-500 text-center py-3">No categories found</p>
                ) : (
                    <ul>
                        {categories.map((c) => (
                            <li key={c._id} className="p-2 border-b">
                                <span className="font-medium">{c.name}</span> —{' '}
                                {c.description || 'No description'}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Pagination */}
                <div className="flex justify-center items-center gap-3 mt-4">
                    <button
                        onClick={() => page > 1 && fetchCategories(page - 1, search)}
                        disabled={page === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => page < totalPages && fetchCategories(page + 1, search)}
                        disabled={page === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
