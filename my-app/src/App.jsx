import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Root from './Root';
import Register from './Register';
import Election from './Election';
import AdminLogin from './Adminlogin';
import ProtectedRoute from './ProtectedRoute';

import AdminLayout from './AdminLayout'; // updated wrapper layout
import Dashboard from './Dashboard';
import Voters from './Voters';
import Results from './Results';
import Candidates from './Candidates';

function AppRoutes() {
    return (
        <Routes>
            {/* Public / User Routes */}
            <Route element={<Root />}>
                <Route path="/" element={<Register />} />
            </Route>
            <Route path="/election" element={<Election />} />

            {/* Admin Login Page */}
            <Route path="/adminlogin" element={<AdminLogin />} />

            {/* Admin Protected Routes */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="candidates" element={<Candidates />} />
                <Route path="voters" element={<Voters />} />
                <Route path="results" element={<Results />} />
            </Route>

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}
