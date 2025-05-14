const Voucher = require('../models/Voucher');

// Lấy danh sách tất cả các voucher
exports.getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find();
        res.status(200).json(vouchers);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách voucher', error: error.message });
    }
};

// Lấy một voucher theo ID
exports.getVoucherById = async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.params.id);
        if (!voucher) {
            return res.status(404).json({ message: 'Không tìm thấy voucher' });
        }
        res.status(200).json(voucher);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin voucher', error: error.message });
    }
};

// Tạo một voucher mới
exports.createVoucher = async (req, res) => {
    try {
        const newVoucher = new Voucher(req.body);
        await newVoucher.save();
        res.status(201).json({ message: 'Đã tạo voucher thành công', voucher: newVoucher });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo voucher', error: error.message });
    }
};

// Cập nhật một voucher theo ID
exports.updateVoucher = async (req, res) => {
    try {
        const updatedVoucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVoucher) {
            return res.status(404).json({ message: 'Không tìm thấy voucher để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật voucher thành công', voucher: updatedVoucher });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật voucher', error: error.message });
    }
};

// Xóa một voucher theo ID
exports.deleteVoucher = async (req, res) => {
    try {
        const deletedVoucher = await Voucher.findByIdAndDelete(req.params.id);
        if (!deletedVoucher) {
            return res.status(404).json({ message: 'Không tìm thấy voucher để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa voucher thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa voucher', error: error.message });
    }
};
