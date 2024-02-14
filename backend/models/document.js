const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., "ID", "Medical Report", "Claim Form"
    file: { type: String, required: true }, // Store file path or IPFS hash
});

module.exports = mongoose.model('Document', documentSchema);