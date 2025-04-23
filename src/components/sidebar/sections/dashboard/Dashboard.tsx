import type React from "react"
import "./Dashboard.css"
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts"

const Dashboard: React.FC = () => {
    // Datos simulados para el dashboard
    const areaData = [
        { name: "Ene", value: 4000 },
        { name: "Feb", value: 3000 },
        { name: "Mar", value: 5000 },
        { name: "Abr", value: 2780 },
        { name: "May", value: 1890 },
        { name: "Jun", value: 2390 },
        { name: "Jul", value: 3490 },
    ]

    const salesData = [
        { day: "Lun", value: 42 },
        { day: "Mar", value: 78 },
        { day: "Mié", value: 85 },
        { day: "Jue", value: 45 },
        { day: "Vie", value: 52 },
        { day: "Sáb", value: 72 },
        { day: "Dom", value: 58 },
    ]

    const pieData = [
        { name: "Giveaway", value: 60, color: "#586ae9" },
        { name: "Direct Sales", value: 24, color: "#14b8a6" },
        { name: "Referral", value: 16, color: "#bf6903" },
    ]

    const recentSales = [
        {
            id: 1,
            name: "Steven Summer",
            time: "23 minutos atrás",
            amount: 52.0,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 2,
            name: "Jordan Mateo",
            time: "29 minutos atrás",
            amount: 83.0,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 3,
            name: "Jessica Alba",
            time: "45 minutos atrás",
            amount: 55.6,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 4,
            name: "Anna Armas",
            time: "52 minutos atrás",
            amount: 2251.0,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        { id: 5, name: "Angelina Boo", time: "1 hora atrás", amount: 152.0, avatar: "/placeholder.svg?height=40&width=40" },
        {
            id: 6,
            name: "Anastasia Kors",
            time: "2 horas atrás",
            amount: 542.0,
            avatar: "/placeholder.svg?height=40&width=40",
        },
    ]

    const lastOrders = [
        {
            id: 1,
            name: "David Astee",
            amount: 1456,
            status: "Pendiente",
            date: "11 Sep 2023",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 2,
            name: "Maria Hufana",
            amount: 542.78,
            status: "Completado",
            date: "11 Sep 2023",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 3,
            name: "Arnold Swarz",
            amount: 53.12,
            status: "Completado",
            date: "11 Sep 2023",
            avatar: "/placeholder.svg?height=40&width=40",
        },
    ]

    // Función para determinar el color del estado
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completado":
                return "#4CAF50"
            case "Pendiente":
                return "var(--orange-color)"
            default:
                return "#9E9E9E"
        }
    }

    // Tooltip personalizado para gráficos
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label} : $${payload[0].value.toLocaleString()}`}</p>
                </div>
            )
        }
        return null
    }



    return (
        <div className="dashboard">
            <div className="dashboard__container">
                <div className="dashboard__content">
                    <div className="dashboard__cards">
                        <div className="card card--balance">
                            <div className="card__header">
                                <span className="card__label">Total de ingresos</span>
                                <span className="card__percent positive">+17%</span>
                            </div>
                            <div className="card__value">$56,874</div>
                            <div className="card__chart">
                                <ResponsiveContainer width="100%" height={60}>
                                    <AreaChart data={areaData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="value" stroke="#4CAF50" fillOpacity={1} fill="url(#colorBalance)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="card card--sales">
                            <div className="card__header">
                                <span className="card__label">Total de ventas</span>
                                <span className="card__percent positive">+24%</span>
                            </div>
                            <div className="card__value">$ 24,575</div>
                            <div className="card__chart">
                                <ResponsiveContainer width="100%" height={60}>
                                    <AreaChart data={areaData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#FF9800" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#FF9800" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="value" stroke="#FF9800" fillOpacity={1} fill="url(#colorSales)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="card card--upgrade">
                            <div className="card__content">
                                <h3>Upgrade</h3>
                                <p>Explore premium features and opportunities</p>
                                <button className="btn-upgrade">Go Pro</button>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard__stats">
                        <div className="stats__weekly">
                            <div className="stats__header">
                                <h3>User in The Last Week</h3>
                                <div className="stats__percent">+ 3.2%</div>
                            </div>
                            <div className="stats__chart">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                        <YAxis hide={true} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="value" fill="var(--sidebar-background)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="stats__monthly">
                            <div className="stats__header">
                                <h3>Monthly Profits</h3>
                                <p>Total Performance 25%</p>
                            </div>
                            <div className="stats__donut">
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            labelLine={false}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="donut-center">$76,556</div>
                                <div className="donut-legend">
                                    {pieData.map((entry, index) => (
                                        <div className="legend-item" key={`legend-${index}`}>
                                            <span className="legend-color" style={{ backgroundColor: entry.color }}></span>
                                            <span className="legend-label">{entry.name}</span>
                                            <span className="legend-value">{entry.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard__tables">
                        <div className="recent-sales">
                            <div className="table__header">
                                <h3>Recent Sales</h3>
                                <a href="#" className="link-all">
                                    See All
                                </a>
                            </div>
                            <div className="table__content">
                                {recentSales.map((sale) => (
                                    <div className="table__row" key={sale.id}>
                                        <div className="row__user">
                                            <img src={sale.avatar || "/placeholder.svg"} alt={sale.name} className="user__avatar" />
                                            <div className="user__info">
                                                <div className="user__name">{sale.name}</div>
                                                <div className="user__time">{sale.time}</div>
                                            </div>
                                        </div>
                                        <div className="row__amount">+ ${sale.amount.toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='table__dashboard_orders' >
                            <div className='table__head'>
                                <div className='thead'>
                                    <div className='th'>
                                        <p className=''>Cliente</p>
                                    </div>
                                    <div className='th'>
                                        <p className=''>Monto</p>
                                    </div>
                                    <div className='th'>
                                        <p className=''>Status</p>
                                    </div>
                                    <div className='th'>
                                        <p className=''>Fecha</p>
                                    </div>
                                </div>
                            </div>
                            {lastOrders?.length > 0 ? (
                                <div className='table__body'>
                                    {lastOrders?.map((item: any, index: any) => (
                                        <div className='tbody__container' key={index}>
                                            <div className='tbody'>
                                                <div className='td'>
                                                    <p>{item.amount}</p>
                                                </div>
                                                <div className='td'>
                                                    {item.amount.toFixed(2)}
                                                </div>
                                                <div className='td'>
                                                    {item.status}
                                                </div>
                                                <div className="td">
                                                <span className="status" style={{ backgroundColor: getStatusColor(item.status) }}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                                <div className='td'>
                                                    {item.date}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className='text'>No hay máximos y mínimos que mostrar</p>
                            )}
                        </div>
                        {/* <div className="last-orders">
                            <div className="table__header">
                                <h3>Last Orders</h3>
                                <div className="table__actions">
                                    <span className="table__update">Data Updated Every 3 Hours</span>
                                    <a href="#" className="link-all">
                                        View All Orders
                                    </a>
                                </div>
                            </div>
                            <div className="table__content">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Customer</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lastOrders.map((order) => (
                                            <tr key={order.id}>
                                                <td>
                                                    <div className="row__user">
                                                        <img src={order.avatar || "/placeholder.svg"} alt={order.name} className="user__avatar" />
                                                        <div className="user__name">{order.name}</div>
                                                    </div>
                                                </td>
                                                <td>${order.amount.toFixed(2)}</td>
                                                <td>
                                                    <span className="status" style={{ backgroundColor: getStatusColor(order.status) }}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td>{order.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
