const Badge = require('../models/Badge');

// Lấy danh sách tất cả các badge
exports.getAllBadges = async (req, res) => {
    try {
        const badges = await Badge.find();
        res.status(200).json(badges);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách badge', error: error.message });
    }
};

// Lấy một badge theo ID
exports.getBadgeById = async (req, res) => {
    try {
        const badge = await Badge.findById(req.params.id);
        if (!badge) {
            return res.status(404).json({ message: 'Không tìm thấy badge' });
        }
        res.status(200).json(badge);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin badge', error: error.message });
    }
};

// Tạo một badge mới
exports.createBadge = async (req, res) => {
    try {
        const newBadge = new Badge(req.body);
        await newBadge.save();
        res.status(201).json({ message: 'Đã tạo badge thành công', badge: newBadge });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo badge', error: error.message });
    }
};

// Cập nhật một badge theo ID
exports.updateBadge = async (req, res) => {
    try {
        const updatedBadge = await Badge.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBadge) {
            return res.status(404).json({ message: 'Không tìm thấy badge để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật badge thành công', badge: updatedBadge });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật badge', error: error.message });
    }
};

// Xóa một badge theo ID
exports.deleteBadge = async (req, res) => {
    try {
        const deletedBadge = await Badge.findByIdAndDelete(req.params.id);
        if (!deletedBadge) {
            return res.status(404).json({ message: 'Không tìm thấy badge để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa badge thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa badge', error: error.message });
    }
};