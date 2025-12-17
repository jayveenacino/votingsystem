const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    courseYear: { type: String, required: true },
    partylist: { type: String, required: true },
    position: { type: String, required: true },
    image: { type: String },
    votes: { type: Number, default: 0 } 
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);
