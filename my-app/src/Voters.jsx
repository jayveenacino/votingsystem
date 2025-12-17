import React, { useEffect, useState } from 'react';
import './Style/Voters.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Voters() {
    const [voters, setVoters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const votersPerPage = 5;

    const fetchVoters = async () => {
        try {
            const res = await axios.get('voters');
            setVoters(res.data);
        } catch (err) {
            console.error('Error fetching voters:', err);
        }
    };

    useEffect(() => {
        fetchVoters();
    }, []);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This voter will be permanently deleted.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`voters/${id}`);
                setVoters(prev => prev.filter(voter => voter._id !== id));
                Swal.fire('Deleted!', 'Voter has been deleted.', 'success');
            } catch (err) {
                console.error('Error deleting voter:', err);
                Swal.fire('Error', 'Failed to delete voter.', 'error');
            }
        }
    };

    const handleDeleteAll = async () => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete all voters permanently.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete all!'
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete('voters');
                await fetchVoters();
                Swal.fire('Deleted!', 'All voters have been deleted.', 'success');
            } catch (err) {
                console.error('Error deleting all voters:', err);
                Swal.fire('Error', 'Failed to delete all voters.', 'error');
            }
        }
    };

    const filteredVoters = voters.filter((v) =>
        `${v.fullName} ${v.studentNumber}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredVoters.length / votersPerPage);
    const indexOfLast = currentPage * votersPerPage;
    const indexOfFirst = indexOfLast - votersPerPage;
    const currentVoters = filteredVoters.slice(indexOfFirst, indexOfLast);

    return (
        <div className="voters-container">
            <div className="voters-header">
                <h1><i className="fa-solid fa-check-to-slot"></i> Manage Voters</h1>
                <p>View and manage the list of registered student voters.</p>
            </div>

            <div className="voters-controls">
                <input
                    type="text"
                    placeholder="Search by name or ID..."
                    className="voters-search"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // reset to page 1 on search
                    }}
                />
                <button
                    className="voters-add-btn"
                    style={{ marginLeft: '10px', backgroundColor: '#8b1f1f' }}
                    onClick={handleDeleteAll}
                >
                    Delete All Voters
                </button>
            </div>

            <div className="voters-table-container">
                <table className="voters-table">
                    <thead>
                        <tr>
                            <th>ID Number</th>
                            <th>Full Name</th>
                            <th>Course</th>
                            <th>Year Level</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentVoters.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                    No voters found.
                                </td>
                            </tr>
                        ) : (
                            currentVoters.map((voter) => (
                                <tr key={voter._id}>
                                    <td>{voter.studentNumber}</td>
                                    <td>{voter.fullName}</td>
                                    <td>{voter.course}</td>
                                    <td>{voter.yearLevel}</td>
                                    <td><span className="status-active">Active</span></td>
                                    <td>
                                        <button className="action-btn delete" onClick={() => handleDelete(voter._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination-controls">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
