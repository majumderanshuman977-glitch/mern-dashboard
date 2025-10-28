import { useEffect, useState } from 'react'
import API from '../api/axios'


export default function Products() {
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])


    useEffect(() => {
        API.get('/products').then(r => setProducts(r.data)).catch(() => { })
        API.get('/categories').then(r => setCategories(r.data)).catch(() => { })
    }, [])


    const submit = async (e) => {
        e.preventDefault()
        await API.post('/products', { name, price, stock, category })
        const res = await API.get('/products')
        setProducts(res.data)
    }


    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            <form onSubmit={submit} className="mb-4 grid grid-cols-4 gap-3">
                <label className="col-span-4 font-semibold">Add New Product</label>

                <label htmlFor="name">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="p-2 border" />
                <label htmlFor="price">Price</label>
                <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" className="p-2 border" />
                <label htmlFor="stock">Stock</label>
                <input value={stock} onChange={e => setStock(e.target.value)} placeholder="Stock" className="p-2 border" />
                <label htmlFor="category">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="p-2 border">
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <div className="col-span-4">
                    <button className="bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
                </div>
            </form>


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
                        {products.map(p => (
                            <tr key={p._id} className="border-t">
                                <td className="p-3">{p.name}</td>
                                <td className="p-3">{p.category?.name || '—'}</td>
                                <td className="p-3">₹{p.price}</td>
                                <td className="p-3">{p.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}