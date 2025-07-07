import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Style/Admin.css';

export default function AdminLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of the admin panel.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#129c16',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Logged Out!',
                    text: 'You have been securely logged out.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                setTimeout(() => {
                    localStorage.removeItem('isAdminAuthenticated');
                    navigate('/adminlogin');
                }, 1600);
            }
        });
    };

    return (
        <div className="admin-page-layout">
            <aside className="admin-sidebar university-style">
                <div className="sidebar-header">
                    <img src="/assets/knshdlogo.png" alt="Logo" />
                    <h2>Kolehiyo Ng Subic</h2>
                    <p>Office of Student Affairs</p>
                </div>
                <ul className="sidebar-menu">
                    <li onClick={() => navigate('/admin/dashboard')}>
                        <i className="fa-solid fa-chart-simple"></i> Dashboard
                    </li>
                    <li onClick={() => navigate('/admin/candidates')}>
                        <i className="fa-solid fa-user-tie"></i> Manage Candidates
                    </li>
                    <li onClick={() => navigate('/admin/voters')}>
                        <i className="fa-solid fa-check-to-slot"></i> Manage Voters
                    </li>
                    <li onClick={() => navigate('/admin/results')}>
                        <i className="fa-solid fa-folder"></i> View Results
                    </li>
                    <li onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i> Logout
                    </li>
                </ul>
            </aside>

            <main className="admin-main">
                <div className="admin-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
