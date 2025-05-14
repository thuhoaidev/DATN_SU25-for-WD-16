const DailyCheckin = require('../models/DailyCheckin');

// Lấy lịch sử check-in của một người dùng
exports.getDailyCheckinHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        const history = await DailyCheckin.find({ user_id: userId })
            .sort({ checkin_date: -1 }) // Sắp xếp theo ngày giảm dần
            .populate('user_id', 'name email');
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy lịch sử check-in', error: error.message });
    }
};

// Check-in hàng ngày
exports.createDailyCheckin = async (req, res) => {
    try {
        const userId = req.body.user_id;

        // Lấy ngày hiện tại ở dạng YYYY-MM-DD
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Kiểm tra xem người dùng đã check-in hôm nay chưa
        const existingCheckin = await DailyCheckin.findOne({
            user_id: userId,
            checkin_date: startOfDay
        });

        if (existingCheckin) {
            return res.status(400).json({ message: 'Bạn đã check-in hôm nay rồi' });
        }

        // Tạo bản ghi check-in mới
        const newCheckin = new DailyCheckin({
            user_id: userId,
            checkin_date: startOfDay
        });
        await newCheckin.save();
        res.status(201).json({ message: 'Check-in thành công', checkin: newCheckin });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi check-in hàng ngày', error: error.message });
    }
};