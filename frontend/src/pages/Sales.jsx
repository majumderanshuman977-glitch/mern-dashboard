import { useEffect, useState } from 'react'
import API from '../api/axios'


export default function Sales() {
    const [products, setProducts] = useState([])
    const [productId, setProductId] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [sales, setSales] = useState([])


    useEffect(() => {
        API.get('/products').then(r => setProducts(r.data)).catch(() => { })
        API.get('/sales').then(r => setSales(r.data)).catch(() => { })
    }, [])


    const submit = async (e) => {
        e.preventDefault()
        await API.post('/sales', { productId, quantity })
        const res = await API.get('/sales')
        setSales(res.data)
    }


    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Buy Products</h2>
            <form onSubmit={submit} className="mb-6 grid grid-cols-3 gap-3">
                <select className="p-2 border" value={productId} onChange={e => setProductId(e.target.value)}>
                    <option value="">Select Product</option>
                    {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                </select>
                <input className="p-2 border" value={quantity} onChange={e => setQuantity(e.target.value)} type="number" min="1" />
                <div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded">Buy</button>
                </div>
            </form>


            <div className="bg-white shadow rounded">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left">Product</th>
                            <th className="p-3 text-left">Quantity</th>
                            <th className="p-3 text-left">Total</th>
                            <th className="p-3 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(s => (
                            <tr key={s._id} className="border-t">
                                <td className="p-3">{s.product?.name || '—'}</td>
                                <td className="p-3">{s.quantity}</td>
                                <td className="p-3">₹{s.totalPrice}</td>
                                <td className="p-3">{new Date(s.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}