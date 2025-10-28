import { useEffect, useState } from 'react'
import API from '../api/axios'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'


export default function Dashboard() {
    const [revenue, setRevenue] = useState(0)
    const [products, setProducts] = useState(0)
    const [orders, setOrders] = useState(0)
    const [monthly, setMonthly] = useState([])


    useEffect(() => {
        // API.get('/analytics/revenue').then(r => setRevenue(r.data.totalRevenue)).catch(() => { })
        API.get('/analytics/revenue')
            .then(r => {
                setRevenue(r.data.totalRevenue)
                setProducts(r.data.totalProducts)
                setOrders(r.data.totalOrders)
            }).catch(() => { });
        API.get('/analytics/monthly-sales').then(r => {
            // transform _id month to name
            const map = r.data.map(item => ({ month: item._id, total: item.totalSales }))
            setMonthly(map)
        }).catch(() => { })
    }, [])


    return (
        <div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 shadow rounded">Total Revenue<br /><div className="text-2xl font-bold">₹{revenue}</div></div>
                <div className="bg-white p-4 shadow rounded">Products<br /><div className="text-2xl font-bold">{products}</div></div>
                <div className="bg-white p-4 shadow rounded">Orders<br /><div className="text-2xl font-bold">{orders}</div></div>
            </div>


            <div className="bg-white p-4 shadow rounded">
                <h3 className="font-semibold mb-2">Monthly Sales</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={monthly}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}