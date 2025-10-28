import { useEffect, useState } from 'react'
import API from '../api/axios'

export default function Products() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')
    const [filterCategory, setFilterCategory] = useState('All')

    // Pagination
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // ✅ Fetch products (with filters, search & pagination)
    const fetchProducts = async (pageNum = 1) => {
        try {
            const params = new URLSearchParams({
                page: pageNum,
                limit: 8,
                search,
                category: filterCategory,
            })

            const res = await API.get(`/products?${params}`)
            setProducts(res.data.data)
            setPage(res.data.currentPage)
            setTotalPages(res.data.totalPages)
        } catch (err) {
            console.error(err)
        }
    }

    // ✅ Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await API.get('/categories')
            setCategories(res.data.data || res.data) // supports both paginated & non-paginated responses
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchCategories()
        fetchProducts()
    }, [])

    // ✅ Handle search/filter submit
    const handleFilter = (e) => {
        e.preventDefault()
        fetchProducts(1)
    }

    // ✅ Add new product
    const submit = async (e) => {
        e.preventDefault()
        await API.post('/products', { name, price, stock, category })
        setName('')
        setPrice('')
        setStock('')
        setCategory('')
        fetchProducts(page)
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Products</h2>

            {/* 🔹 Add Product Form */}
            <form onSubmit={submit} className="mb-6 grid grid-cols-4 gap-3 bg-gray-50 p-4 rounded">
                <label className="col-span-4 font-semibold">Add New Product</label>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="p-2 border rounded"
                />
                <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="p-2 border rounded"
                />
                <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Stock"
                    className="p-2 border rounded"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <div className="col-span-4">
                    <button className="bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
                </div>
            </form>

            {/* 🔹 Search & Filter */}
            <form onSubmit={handleFilter} className="mb-4 flex gap-3 items-center">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="p-2 border rounded flex-1"
                />
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="All">All Categories</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Filter</button>
            </form>

            {/* 🔹 Products Table */}
            <div className="bg-white shadow rounded">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((p) => (
                                <tr key={p._id} className="border-t hover:bg-gray-50">
                                    <td className="p-3">{p.name}</td>
                                    <td className="p-3">{p.category?.name || '—'}</td>
                                    <td className="p-3">₹{p.price}</td>
                                    <td className="p-3">{p.stock}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-3 text-center text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* 🔹 Pagination */}
                <div className="flex justify-center items-center gap-3 mt-4 p-3">
                    <button
                        onClick={() => page > 1 && fetchProducts(page - 1)}
                        disabled={page === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => page < totalPages && fetchProducts(page + 1)}
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
