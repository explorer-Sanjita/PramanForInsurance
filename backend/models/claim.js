const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
    clientId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    insuranceFirmId: { type: mongoose.Types.ObjectId, ref: 'User' }, // Insurance firm handling the claim
    policy: { type : Object , required:true },
    status: { type: String,
        default : 'pending',
        enum: ['pending', 'approved', 'rejected'] ,
        },
    ipfsHash : {
        type : String
    }
});

module.exports = mongoose.model('Claim', claimSchema);
