const Document = require('../models/document');
// const ipfs = require('../middleware/ipfs');

exports.uploadDocument = async (req, res) => {
    try {
        const file = req.file;
        // const ipfsHash = await ipfs.uploadToIPFS(file.buffer);

        const document = new Document({
            userId: req.user._id,
            name: file.originalname,
            type: req.body.type,
            // file: ipfsHash,
        });

        const savedDocument = await document.save();
        res.status(201).json(savedDocument);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ userId: req.user._id });
        res.json(documents);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};