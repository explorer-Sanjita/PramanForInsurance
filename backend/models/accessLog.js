const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
    claimId : {type: mongoose.Types.ObjectId, ref: 'Claim', required: true,unique : true},
    clientAddress: { type : String },
    insuranceAddress: { type : String },
    index: { type : Number},
});

module.exports = mongoose.model('AccessLog', accessLogSchema);