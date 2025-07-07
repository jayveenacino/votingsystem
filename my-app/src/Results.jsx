import React, { useEffect, useState } from 'react';
import './Style/Result.css';
import axios from 'axios';

export default function Results() {
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios.get('http://localhost:5000/results');
                setResults(res.data);
            } catch (err) {
                console.error('Failed to fetch results:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    return (
        <div className="candidates-container">
            <div className="candidates-header">
                <h1><i className="fa-solid fa-folder"></i> Election Results</h1>
                <p className="results-subtitle">Final vote count and percentages by position.</p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <div className="spinner"></div>
                    <p style={{ marginTop: '10px', color: '#555' }}>Loading results...</p>
                </div>
            ) : (
                Object.entries(results).map(([position, candidates]) => {
                    const totalVotes = candidates.reduce((acc, curr) => acc + curr.votes, 0);
                    return (
                        <div key={position} className="position-group">
                            <h2 className="position-title">{position}</h2>
                            <div className="candidates-table-container">
                                <table className="candidates-table">
                                    <thead>
                                        <tr>
                                            <th>Candidate</th>
                                            <th>Votes</th>
                                            <th>Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {candidates.sort((a, b) => b.votes - a.votes).map((candidate, index) => {
                                            const percentage = totalVotes
                                                ? ((candidate.votes / totalVotes) * 100).toFixed(1)
                                                : 0;
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <img
                                                                src={candidate.image}
                                                                alt={candidate.name}
                                                                style={{
                                                                    width: '50px',
                                                                    height: '50px',
                                                                    borderRadius: '8px',
                                                                    objectFit: 'cover',
                                                                    border: '2px solid #0a3d18',
                                                                }}
                                                            />
                                                            <span>{candidate.name}</span>
                                                        </div>
                                                    </td>
                                                    <td>{candidate.votes}</td>
                                                    <td>
                                                        <div className="vote-bar">
                                                            <div className="vote-fill" style={{ width: `${percentage}%` }}></div>
                                                        </div>
                                                        <span className="vote-info">{percentage}%</span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
