import React, { useState, useEffect } from 'react';
import './Style/Dashboard.css';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const [stats, setStats] = useState({
        voters: 0,
        candidates: 0,
        status: true // true = ongoing, false = closed
    });
    const [courseData, setCourseData] = useState([]);

    const COURSE_COLORS = {
        BSCS: '#9b59b6', // Purple
        BSED: '#3498db', // Blue
        BSHM: '#e74c3c', // Red
        BSBA: '#f1c40f'  // Yellow
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const votersRes = await axios.get('http://localhost:5000/voters');
                const candidatesRes = await axios.get('http://localhost:5000/candidates');

                const courseCount = { BSCS: 0, BSED: 0, BSHM: 0, BSBA: 0 };

                votersRes.data.forEach(voter => {
                    const course = voter.course?.toUpperCase(); // normalize case
                    if (courseCount[course] !== undefined) {
                        courseCount[course]++;
                    }
                });

                const formattedData = Object.entries(courseCount).map(([name, value]) => ({ name, value }));

                setStats(prev => ({
                    ...prev,
                    voters: votersRes.data.length,
                    candidates: candidatesRes.data.length
                }));

                setCourseData(formattedData);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1><i className="fa-solid fa-chart-simple"></i>  Dashboard Overview</h1>
                <p>Welcome, Admin! Here's a quick summary of election data.</p>
            </div>

            <div className="dashboard-card-container">
                <div className="dashboard-card">
                    <h2>Total Registered Voters</h2>
                    <p className="card-number">{stats.voters}</p>
                </div>
                <div className="dashboard-card">
                    <h2>Total Candidates</h2>
                    <p className="card-number">{stats.candidates}</p>
                </div>
                <div className="dashboard-card">
                    <h2>Voting Status</h2>
                    <p className="card-status">{stats.status ? '🟢 Ongoing' : '🔴 Closed'}</p>
                </div>
            </div>

            <div className="dashboard-chart">
                <h3>Registered Voters by Course</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={courseData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {courseData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COURSE_COLORS[entry.name] || '#ccc'}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="dashboard-footer-note">
                <p>Use the sidebar to manage voters, candidates, and view results.</p>
            </div>
        </div>
    );
}
