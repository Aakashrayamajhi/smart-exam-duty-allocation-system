import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Adminnav from './Adminnav';
import './Admin.css';


const Sidebar = () => (
    <div className="sidebar">
        <h3 className="sidebar-title">Menu</h3>
        <ul className="sidebar-list">
            <li className="sidebar-item">Dashboard</li>
            <li className="sidebar-item">Faculty</li>
            <li className="sidebar-item">Events</li>
        </ul>
        <br /><br />
        <h3 className="sidebar-title">Services</h3>
        <ul className="sidebar-list">
            <li className="sidebar-item">
                <Link to="/admin/faculty">Availability Details</Link>
            </li>
            <li className="sidebar-item">
                <Link to="/admin/allocate">Allocate Task</Link>
            </li>
            <li className="sidebar-item">
                <Link to="/admin/notification">Send Notification</Link>
            </li>
            <li className="sidebar-item">
                <Link to="/admin/settings">Settings</Link>
            </li>
        </ul>
    </div>
);


const SummaryCard = ({ title, value, desc, bgColor }) => (
    <div className="summary-card" style={{ backgroundColor: bgColor }}>
        <h4>{title}</h4>
        <p className="card-value">{value}</p>
        {desc && <p className="card-desc">{desc}</p>}
    </div>
);


const Admin = () => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="admin-main">
                <Adminnav />

                <div className="admin-content">

                    <div className="card-row">
                        <SummaryCard title="January" value="$500" bgColor="#007bff" />
                        <SummaryCard title="Available" value="120" bgColor="#ff4d4f" />
                        <SummaryCard title="Events" value="230" bgColor="#17a2b8" />
                        <SummaryCard title="Faculty Left" value="45" bgColor="#fa8c16" />
                    </div>


                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Admin;
