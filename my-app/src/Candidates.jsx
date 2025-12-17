import React, { useEffect, useState } from 'react';
import './Style/Candidates.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Candidates() {
    const [candidates, setCandidates] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const candidatesPerPage = 5;

    const [form, setForm] = useState({
        fullname: '',
        courseYear: '',
        partylist: '',
        position: '',
        image: ''
    });

    const fetchCandidates = async () => {
        setLoading(true);
        try {
            const res = await axios.get('candidates');
            setCandidates(res.data);
        } catch (err) {
            console.error('Error fetching candidates:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm({ ...form, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const openAddModal = () => {
        setForm({ fullname: '', courseYear: '', partylist: '', position: '', image: '' });
        setIsEditing(false);
        setEditingId(null);
        setShowModal(true);
    };

    const openEditModal = (candidate) => {
        setForm(candidate);
        setIsEditing(true);
        setEditingId(candidate._id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the candidate.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`candidates/${id}`);
                await fetchCandidates();
                Swal.fire('Deleted!', 'Candidate has been removed.', 'success');
            } catch (err) {
                console.error('Failed to delete candidate:', err);
                Swal.fire('Error!', 'Failed to delete candidate.', 'error');
            }
        }
    };

    const handleSave = async () => {
        try {
            if (isEditing) {
                await axios.put(`candidates/${editingId}`, form);
                Swal.fire('Success!', 'Candidate updated successfully.', 'success');
            } else {
                await axios.post('candidates', form);
                Swal.fire('Success!', 'Candidate added successfully.', 'success');
            }
            setShowModal(false);
            fetchCandidates();
        } catch (err) {
            console.error('Failed to save candidate:', err);
            Swal.fire('Error!', 'Failed to save candidate.', 'error');
        }
    };

    const filteredCandidates = candidates.filter((c) =>
        `${c.fullname} ${c.courseYear} ${c.partylist} ${c.position}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
    const indexOfLast = currentPage * candidatesPerPage;
    const indexOfFirst = indexOfLast - candidatesPerPage;
    const currentCandidates = filteredCandidates.slice(indexOfFirst, indexOfLast);

    return (
        <div className="candidates-container">
            <div className="candidates-header">
                <h1><i className="fa-solid fa-user-tie"></i> Manage Candidates</h1>
                <p>View, add, and manage election candidates below.</p>
            </div>

            <div className="candidates-controls">
                <input
                    className="candidates-search"
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // reset to page 1 on search
                    }}
                />
                <button className="candidates-add-btn" onClick={openAddModal}>+ Add Candidate</button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <div className="spinner"></div>
                    <p style={{ marginTop: '10px', color: '#555' }}>Loading candidates...</p>
                </div>
            ) : (
                <>
                    <div className="candidates-table-container">
                        <table className="candidates-table">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Full Name</th>
                                    <th>Course & Year</th>
                                    <th>Partylist</th>
                                    <th>Position</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCandidates.map((c) => (
                                    <tr key={c._id}>
                                        <td><img src={c.image} alt={c.fullname} /></td>
                                        <td>{c.fullname}</td>
                                        <td>{c.courseYear}</td>
                                        <td>{c.partylist}</td>
                                        <td>{c.position}</td>
                                        <td>
                                            <button className="action-btn edit" onClick={() => openEditModal(c)}>Edit</button>
                                            <button className="action-btn delete" onClick={() => handleDelete(c._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredCandidates.length === 0 && (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                                            No candidates found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination-controls">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content compact">
                        <h2 className="modal-title">{isEditing ? 'Edit Candidate' : 'Add Candidate'}</h2>
                        <button className="modal-close-btn" onClick={() => setShowModal(false)}>&times;</button>

                        <form className="modal-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                            <div className="form-row">
                                <div className="input-fullname">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        placeholder="e.g. Jayvee Nacino"
                                        value={form.fullname}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="image-section">
                                    <label>Image</label>
                                    <label htmlFor="image-upload" className="image-box clickable">
                                        {form.image ? (
                                            <img src={form.image} alt="preview" />
                                        ) : (
                                            <div className="image-placeholder">Click to Upload</div>
                                        )}
                                    </label>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>

                            <label>Course & Year</label>
                            <input
                                type="text"
                                name="courseYear"
                                placeholder="e.g. BSCS 4th Year"
                                value={form.courseYear}
                                onChange={handleChange}
                                required
                            />

                            <label>Partylist</label>
                            <input
                                type="text"
                                name="partylist"
                                placeholder="e.g. KASANGGA"
                                value={form.partylist}
                                onChange={handleChange}
                                required
                            />

                            <label>Position</label>
                            <input
                                type="text"
                                name="position"
                                placeholder="e.g. President"
                                value={form.position}
                                onChange={handleChange}
                                required
                            />

                            <div className="modal-footer">
                                <button type="submit" className="save-btn">
                                    {isEditing ? 'Update Candidate' : 'Save Candidate'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
