const Claim = require('../models/claim');
const User = require("../models/user");

exports.submitClaim = async (req, res) => {
    try {
        console.log()
        const claim = new Claim({
            clientId: req.userId,
            policy: req.body.policy, // Array of document IDs
        });
        console.log(claim)
        const savedClaim = await claim.save();
        // Assign broker or send notification to a broker
        res.status(201).json(savedClaim);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getClaims = async (req, res) => {
    try {
        const claims = await Claim.find({ userId: req.user._id });
        res.json(claims);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateClaims = async (req, res) => {
    try {
        const claims = await Claim.findByIdAndUpdate(req.body._id, req.body, {
            new: true, // Return the updated user object
        });

        if (!claims) {
            return res.status(404).json({ error: 'Claim not found' });
        }

        res.json(claims);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to update Claim' });
    }
};


exports.getAllClaims = async (req, res) => {
    try {
        const claims = await Claim.find();
        res.json(claims);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllClaimsByInsuranceId = async (req, res) => {
    try {
        const claims = await Claim.find({insuranceFirmId : req.userId});
        // console.log(req.user_id)
        res.json(claims);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllClaimsByClientId = async (req, res) => {
    try {
        const claims = await Claim.find({clientId : req.userId});
        console.log('Hello')
        // console.log(req.user_id)
        res.json(claims);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};