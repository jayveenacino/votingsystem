const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/User.js');
const Candidate = require('./models/Candidate.js');

const app = express();
const PORT = 5000;

// Increase payload size for base64 images (up to 10MB)
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/election-app')
    .then(() => console.log('Connected to MongoDB (election-app)'))
    .catch(err => console.error('MongoDB connection failed:', err));

// ======================
// VOTER ROUTES
// ======================
app.post('/register', async (req, res) => {
    try {
        const { fullName, studentNumber, course, yearLevel } = req.body;

        if (!/^\d{6}$/.test(studentNumber)) {
            return res.status(400).json({ message: 'Student number must be exactly 6 digits.' });
        }

        const newUser = new User({ fullName, studentNumber, course, yearLevel });
        await newUser.save();

        return res.status(200).json({ message: 'User registered successfully.' });

    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(409).json({ message: `Duplicate ${field}` });
        }

        console.error(err);
        return res.status(500).json({ message: 'Server error.' });
    }
});

app.get('/voters', async (req, res) => {
    try {
        const voters = await User.find();
        res.status(200).json(voters);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch voters.' });
    }
});

app.delete('/voters/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Voter not found.' });
        }
        res.status(200).json({ message: 'Voter deleted successfully.' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ message: 'Failed to delete voter.' });
    }
});

app.delete('/voters', async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).json({ message: 'All voters deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete all voters.' });
    }
});

// ======================
// CANDIDATE ROUTES
// ======================

app.get('/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch candidates.' });
    }
});

app.post('/candidates', async (req, res) => {
    try {
        const { fullname, courseYear, partylist, position, image } = req.body;
        const newCandidate = new Candidate({ fullname, courseYear, partylist, position, image });
        await newCandidate.save();
        res.status(201).json(newCandidate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add candidate.' });
    }
});

app.put('/candidates/:id', async (req, res) => {
    try {
        const updated = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update candidate.' });
    }
});

app.delete('/candidates/:id', async (req, res) => {
    try {
        await Candidate.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Candidate deleted.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete candidate.' });
    }
});

// ======================
// RESULTS ROUTE
// ======================

app.get('/results', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        const grouped = {};

        candidates.forEach(candidate => {
            if (!grouped[candidate.position]) grouped[candidate.position] = [];

            grouped[candidate.position].push({
                name: candidate.fullname,
                votes: candidate.votes || 0,
                image: candidate.image
            });
        });

        res.status(200).json(grouped);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch results.' });
    }
});

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
