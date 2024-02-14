const AccessLog = require('../models/accessLog');

exports.submitDocument = async (req, res) => {
    try {

        const accessLog = new AccessLog(req.body);

        await accessLog.save();
        res.json({ success:true,accessLog });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAccessLogs = async (req, res) => {
    try {
        const accessLogs = await AccessLog.findOne({ claimId: req.params.claimId });
        console.log(accessLogs)
        res.json({success:true,accessLogs});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// exports.getAccessLogs = async (req, res) => {
//     try {
//         const accessLogs = await AccessLog.find({ documentId: req.params.documentId });
//         res.json(accessLogs);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// exports.submitDocument = async (req, res) => {
//     try {
//         const accessLogs = await AccessLog.find({ documentId: req.params.documentId });
//         res.json(accessLogs);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };