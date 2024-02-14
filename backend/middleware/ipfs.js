const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient('ipfs.infura.io', 5001, { protocol: 'https' });

exports.uploadToIPFS = async (file) => {
    try {
        const added = await ipfs.add(file);
        return added[0].path;
    } catch (err) {
        console.error('IPFS upload error:', err);
        throw err;
    }
};

exports.downloadFromIPFS = async (ipfsHash) => {
    try {
        const file = await ipfs.get(ipfsHash);
        return file.source;
    } catch (err) {
        console.error('IPFS download error:', err);
        throw err;
    }
};
