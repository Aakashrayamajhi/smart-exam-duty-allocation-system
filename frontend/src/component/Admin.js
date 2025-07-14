import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './Admin.css';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const SummaryCard = ({ title, value, desc, bgColor }) => (
    <div className="summary-card" style={{ backgroundColor: bgColor }}>
        <h4>{title}</h4>
        <p className="card-value">{value}</p>
        {desc && <p className="card-desc">{desc}</p>}
    </div>
);

const Admin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Logout function
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const pieData = [
        { name: 'Allocated', value: 400 },
        { name: 'Unallocated', value: 200 },
    ];
    const COLORS = ['#00C49F', '#FF8042'];

    // Legend click prevent default
    const handleLegendClick = (e) => {
        e.preventDefault();
    };

    // Function to detect active menu item based on current path
    const isActive = (path) => {
        return location.pathname === path ? 'active-link' : '';
    };

    return (
        <div className="admin-layout">
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <h3 className="sidebar-title">Menu</h3>
                <ul className="sidebar-list">
                    <li className="sidebar-item">
                        <Link
                            to="/admin"
                            className={isActive('/admin')}
                            onClick={() => setSidebarOpen(false)}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link
                            to="/admin/faculty"
                            className={isActive('/admin/faculty')}
                            onClick={() => setSidebarOpen(false)}
                        >
                            Faculty
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link
                            to="/admin/events"
                            className={isActive('/admin/events')}
                            onClick={() => setSidebarOpen(false)}
                        >
                            Events
                        </Link>
                    </li>
                </ul>

                <h3 className="sidebar-title">Services</h3>
                <ul className="sidebar-list">
                    <li className="sidebar-item">
                        <Link
                            to="/admin/faculty"
                            className={isActive('/admin/faculty')}
                            onClick={() => setSidebarOpen(false)}
                        >
                            Availability Details
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link
                            to="/admin/allocate"
                            className={isActive('/admin/allocate')}
                            onClick={() => setSidebarOpen(false)}
                        >
                            Allocate Task
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link
                            to="/admin/notification"
                            className={isActive('/admin/notification')}
                            onClick={() => setSidebarOpen(false)}
                        >
                            Send Notification
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link
                            to="/admin/settings"
                            className={isActive('/admin/settings')}
                            onClick={() => setSidebarOpen(false)}
                        >
                            Settings
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="admin-main">
                <div className="navbar">
                    <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        ☰
                    </button>
                    <h2>Dashboard</h2>
                    <button className="logout-btn" onClick={handleLogout}>
                        LOGOUT
                    </button>
                </div>

                {/* For "/admin" path show dashboard content here */}
                {location.pathname === '/admin' && (
                    <>
                        <div className="card-row">
                            <SummaryCard title="January" value="$500" desc="Daily spend target: $16.67" bgColor="#007bff" />
                            <SummaryCard title="Available" value="120" bgColor="#ff4d4f" />
                            <SummaryCard title="Events" value="230" bgColor="#17a2b8" />
                            <SummaryCard title="Faculty" value="580" bgColor="#fa8c16" />
                        </div>

                        <div className="graph-section">
                            <div className="graph-left">
                                <h3>Calendar</h3>
                                <div className="calendar-placeholder">
                                    <iframe
                                        src="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=Asia%2FKathmandu"
                                        style={{ border: 0 }}
                                        width="100%"
                                        height="250"
                                        frameBorder="0"
                                        scrolling="no"
                                        title="International Holidays Calendar"
                                    />
                                </div>
                            </div>

                            <div className="graph-right">
                                <h3>Allocated vs Unallocated</h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Legend onClick={handleLegendClick} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                )}

                {/* Render child routes here */}
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;
