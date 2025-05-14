const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Thông tin đăng nhập không hợp lệ' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Thông tin đăng nhập không hợp lệ' });
        }


        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || '12345678', { expiresIn: '1h' });

        res.status(200).json({ message: 'Đăng nhập thành công', token, userId: user._id, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra', error: error.message });
    }
};