import React, { useState, useEffect } from 'react';
import './Style/Admin.css';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function Adminlogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // 🔒 Redirect if already authenticated
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
        if (isAuthenticated) {
            navigate('/admin', { replace: true });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const defaultUsername = "admin";
        const defaultPassword = "admin123";

        if (username === defaultUsername && password === defaultPassword) {
            localStorage.setItem('isAdminAuthenticated', 'true');
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Redirecting to admin dashboard...',
                timer: 1500,
                showConfirmButton: false,
            }).then(() => {
                navigate('/admin');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: 'Invalid username or password.',
                confirmButtonColor: '#129c16'
            });
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-login-box">
                <img src="/assets/knshdlogo.png" alt="Admin Logo" className="admin-login-logo" />
                <h2 className="admin-login-title">ADMIN LOGIN</h2>
                <h2 className="admin-login-subtitle">SUPREME STUDENT GOVERNMENT SYSTEM</h2>

                <form className="admin-login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="admin-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="admin-input password-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                    <button type="submit" className="admin-login-btn">Login</button>
                </form>
            </div>
            <footer className="footer">
                © Jayvee Madriaga Nacino 2025
            </footer>
        </div>
    );
}
