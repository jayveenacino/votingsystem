import React, { useEffect, useState } from 'react';
import './Style/Election.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Election() {
    const [candidates, setCandidates] = useState([]);
    const [voterName, setVoterName] = useState('');
    const [voterID, setVoterID] = useState('');
    const [selectedVotes, setSelectedVotes] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const name = localStorage.getItem('voterName');
        const id = localStorage.getItem('voterID');
        if (name) setVoterName(name);
        if (id) setVoterID(id);
    }, []);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const res = await axios.get('http://localhost:5000/candidates');
                setCandidates(res.data);
            } catch (err) {
                console.error('Failed to fetch candidates:', err);
            }
        };

        fetchCandidates();
    }, []);

    const groupedCandidates = candidates.reduce((acc, candidate) => {
        if (!acc[candidate.position]) acc[candidate.position] = [];
        acc[candidate.position].push(candidate);
        return acc;
    }, {});

    const handleVoteChange = (position, candidateId) => {
        if (position.toLowerCase() === 'senator') {
            const selected = selectedVotes[position] || [];

            if (selected.includes(candidateId)) {
                setSelectedVotes({
                    ...selectedVotes,
                    [position]: selected.filter(id => id !== candidateId)
                });
            } else {
                if (selected.length >= 7) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Limit Reached',
                        text: 'You can only select up to 7 senators.'
                    });
                    return;
                }
                setSelectedVotes({
                    ...selectedVotes,
                    [position]: [...selected, candidateId]
                });
            }
        } else {
            setSelectedVotes({ ...selectedVotes, [position]: candidateId });
        }
    };

    const handleSubmit = async () => {
        try {
            const voteEntries = Object.entries(selectedVotes);

            for (const [position, value] of voteEntries) {
                if (Array.isArray(value)) {
                    for (const candidateId of value) {
                        await axios.put(`http://localhost:5000/candidates/${candidateId}`, {
                            $inc: { votes: 1 }
                        });
                    }
                } else {
                    await axios.put(`http://localhost:5000/candidates/${value}`, {
                        $inc: { votes: 1 }
                    });
                }
            }

            Swal.fire({
                icon: 'success',
                title: 'Vote Submitted!',
                text: 'Thank you for voting.',
                confirmButtonText: 'OK'
            }).then(() => {
                localStorage.removeItem('voterName');
                localStorage.removeItem('voterID');
                navigate('/registration');
            });

        } catch (err) {
            console.error('Error submitting votes:', err);
            Swal.fire({ icon: 'error', title: 'Oops!', text: 'Something went wrong.' });
        }
    };

    return (
        <div className="election-container">
            <nav className="nav-container">
                <div className="nav-left">
                    <img src="/assets/knshdlogo.png" alt="Logo" className="logo" />
                    <div className="text-block">
                        <h1 className="title">Kolehiyo Ng Subic</h1>
                        <p className="subtitle">Supreme Student Government</p>
                    </div>
                </div>

                {voterName && voterID && (
                    <div className="voter-name">
                        <div><i className="fa-solid fa-user"></i> <strong>{voterName}</strong></div>
                        <div><i className="fa-solid fa-address-card"></i> {voterID}</div>
                    </div>
                )}
            </nav>

            <div className="voting-header">
                <img src="/assets/logo2.png" alt="" className="voting-header-logo" />
            </div>

            <main className="voting-area ballot-style">
                <div className="ballot-header-inline">
                    <img src="/assets/ssg.png" alt="Left Logo" className="ballot-logo" />
                    <div className="ballot-title-block">
                        <h1 className="ballot-title">Kolehiyo Ng Subic</h1>
                        <p className="ballot-subtitle">Supreme Student Government Election  </p>
                    </div>
                    <img src="/assets/knshdlogo.png" alt="Right Logo" className="ballot-logo" />
                </div>

                {Object.keys(groupedCandidates).map(position => (
                    <section key={position} className="ballot-section">
                        <h3 className="position-title">{position.toUpperCase()}</h3>
                        <div className="ballot-grid">
                            {groupedCandidates[position].map(candidate => (
                                <div key={candidate._id} className="ballot-card ballot-row">
                                    <div className="ballot-left">
                                        <img src={candidate.image} alt={candidate.fullname} className="ballot-img-square" />
                                    </div>
                                    <div className="ballot-center">
                                        <h4 className="ballot-name">{candidate.fullname}</h4>
                                        <p className="ballot-party">{candidate.partylist}</p>
                                    </div>
                                    <div className="ballot-right">
                                        {position.toLowerCase() === 'senator' ? (
                                            <input
                                                type="checkbox"
                                                name={`${position}-${candidate._id}`}
                                                className="vote-checkbox"
                                                value={candidate._id}
                                                checked={(selectedVotes[position] || []).includes(candidate._id)}
                                                onChange={() => handleVoteChange(position, candidate._id)}
                                            />
                                        ) : (
                                            <input
                                                type="radio"
                                                name={position}
                                                className="vote-radio"
                                                value={candidate._id}
                                                checked={selectedVotes[position] === candidate._id}
                                                onChange={() => handleVoteChange(position, candidate._id)}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                <div className="submit-area">
                    <button className="vote-btn submit-btn" onClick={handleSubmit}>Submit Ballot</button>
                </div>
            </main>
        </div>
    );
}
