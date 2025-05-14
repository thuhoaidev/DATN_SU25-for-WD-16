const UserBadge = require('../models/UserBadge');

// Lấy danh sách tất cả user_badge (có thể lọc theo user_id hoặc badge_id)
exports.getAllUserBadges = async (req, res) => {
    try {
        const filter = {};
        if (req.query.user_id) filter.user_id = req.query.user_id;
        if (req.query.badge_id) filter.badge_id = req.query.badge_id;
        const userBadges = await UserBadge.find(filter)
            .populate('user_id', 'name email') // Populate thông tin người dùng
            .populate('badge_id', 'name description'); // Populate thông tin badge
        res.status(200).json(userBadges);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách user_badge', error: error.message });
    }
};

// Lấy một user_badge theo ID
exports.getUserBadgeById = async (req, res) => {
    try {
        const userBadge = await UserBadge.findById(req.params.id)
            .populate('user_id', 'name email')
            .populate('badge_id', 'name description');
        if (!userBadge) {
            return res.status(404).json({ message: 'Không tìm thấy user_badge' });
        }
        res.status(200).json(userBadge);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin user_badge', error: error.message });
    }
};

// Tạo một user_badge mới (khi người dùng đạt được một badge)
exports.createUserBadge = async (req, res) => {
    try {
        const newUserBadge = new UserBadge(req.body);
        await newUserBadge.save();
        res.status(201).json({ message: 'Đã tạo user_badge thành công', userBadge: newUserBadge });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo user_badge', error: error.message });
    }
};

// Cập nhật một user_badge theo ID (có thể không cần thiết)
exports.updateUserBadge = async (req, res) => {
    try {
        const updatedUserBadge = await UserBadge.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUserBadge) {
            return res.status(404).json({ message: 'Không tìm thấy user_badge để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật user_badge thành công', userBadge: updatedUserBadge });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật user_badge', error: error.message });
    }
};

// Xóa một user_badge theo ID (có thể không cần thiết)
exports.deleteUserBadge = async (req, res) => {
    try {
        const deletedUserBadge = await UserBadge.findByIdAndDelete(req.params.id);
        if (!deletedUserBadge) {
            return res.status(404).json({ message: 'Không tìm thấy user_badge để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa user_badge thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa user_badge', error: error.message });
    }
};