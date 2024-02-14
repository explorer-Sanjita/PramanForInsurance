require('dotenv').config();
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = process.env.PINATA_JWT
const InsuranceCoverage = require('../models/insuranceCoverage');

exports.generateCoverage = async (req, res) => {
    try {
        const claimId = req.params.claimId;
        const coverageDocument = await generateCoverageDocument(claimId); // Implement this function
        // const ipfsHash = await ipfs.uploadToIPFS(coverageDocument);

        const insuranceCoverage = new InsuranceCoverage({
            claimId: claimId,
            documentIpfsHash: ipfsHash,
        });

        const savedCoverage = await insuranceCoverage.save();
        res.status(201).json(savedCoverage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.pinFileToIPFS = async (req, res) => {
    const formData = new FormData();
    const src = "./insurancedocument.png";
    console.log('Entered')

    const file = fs.createReadStream(src)
    formData.append('file', file)

    const pinataMetadata = JSON.stringify({
        name: 'Image2',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
        const result = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
            }
        });
        res.json(result.data);
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message });
    }
}
