import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Style/Style.css';

export default function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        studentNumber: '',
        course: '',
        yearLevel: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fullName, studentNumber, course, yearLevel } = formData;

        // Frontend validation
        if (!fullName || !studentNumber || !course || !yearLevel) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please complete all fields before submitting!',
            });
            return;
        }

        if (studentNumber.length !== 6) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Student Number',
                text: 'Student number must be exactly 6 digits.',
            });
            return;
        }

        try {
            Swal.fire({
                title: 'Registering...',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            // Updated fetch URL to match backend port (5000)
            const response = await fetch('http://192.168.100.82:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            Swal.close();

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem('voterName', formData.fullName);
                localStorage.setItem('voterID', formData.studentNumber);

                await Swal.fire({
                    icon: 'success',
                    title: 'Registered Successfully!',
                    text: 'You will now be redirected to vote.',
                    showConfirmButton: false,
                    timer: 2000
                });

                navigate('/election');
            }
            else if (response.status === 409) {
                const result = await response.json();
                let errorText = 'Already registered!';

                if (result.message.includes('fullName')) {
                    errorText = 'This full name is already registered!';
                } else if (result.message.includes('studentNumber')) {
                    errorText = 'This student number is already registered!';
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Registration Error',
                    text: errorText,
                });
            }
            else if (response.status === 400) {
                const result = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                    text: result.message || 'Check your input!',
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Something went wrong.',
                });
            }
        } catch (error) {
            Swal.close();
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Could not connect to the server.',
            });
        }
    };


    return (
        <div className="register-container">
            <div className="register-content">
                <div className="register-left">
                    <img src="/assets/logo2.png" alt="Logo" className="register-img" />
                </div>

                <div className="register-right">
                    <form className="register-field" onSubmit={handleSubmit}>
                        <h2>REGISTER HERE!</h2>

                        <input
                            type="text"
                            placeholder="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            placeholder="Student Number"
                            name="studentNumber"
                            value={formData.studentNumber}
                            onChange={handleChange}
                            required
                        />

                        <select name="course" value={formData.course} onChange={handleChange} required>
                            <option disabled value="">Select Course</option>
                            <option>BSED</option>
                            <option>BSCS</option>
                            <option>BSHM</option>
                            <option>BSBA</option>
                        </select>

                        <select name="yearLevel" value={formData.yearLevel} onChange={handleChange} required>
                            <option disabled value="">Select Year Level</option>
                            <option>1st Year</option>
                            <option>2nd Year</option>
                            <option>3rd Year</option>
                            <option>4th Year</option>
                        </select>

                        <button type="submit">Let's Vote!</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
