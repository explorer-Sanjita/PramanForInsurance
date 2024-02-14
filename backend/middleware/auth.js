const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.log('entered')
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId  = decoded.userId ;
        console.log(decoded.userId)
        next();
    } catch (err) {
        console.log(err)
        res.status(401).json({ error: 'Invalid token' });
    }
};
