const mongoose = require('mongoose');

const insuranceCoverageSchema = new mongoose.Schema({
    claimId: { type: mongoose.Types.ObjectId, ref: 'Claim', required: true },
    documentIpfsHash: { type: String, required: true }, // IPFS hash of the coverage document
    accessTokens: [{ type: String }], // Tokens for controlling access to the document
});

module.exports = mongoose.model('InsuranceCoverage', insuranceCoverageSchema);