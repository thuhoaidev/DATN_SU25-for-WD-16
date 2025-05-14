const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'Không tìm thấy token' });
    }

    jwt.verify(token, process.env.JWT_SECRET || '12345678', async (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token không hợp lệ' });
        }
        req.user = await User.findById(user.userId).select('-password'); 
        next(); 
    });
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Không có quyền truy cập' });
    }
};

module.exports = { authenticateToken ,isAdmin };