require('dotenv').config();
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = process.env.PINATA_JWT

export const pinFileToIPFS = async (req,res) => {
    const formData = new FormData();
    const src = "./hero.png";

    const file = fs.createReadStream(src)
    formData.append('file', file)

    const pinataMetadata = JSON.stringify({
        name: 'Image1',
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
        res.status(400).json({ error: err.message });
    }
}
