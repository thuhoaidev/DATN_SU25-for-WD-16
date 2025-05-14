const Wallet = require('../models/Wallet');

// Lấy thông tin ví của một người dùng
exports.getWalletByUserId = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ user_id: req.params.userId }).populate('user_id', 'name email');
        if (!wallet) {
            return res.status(404).json({ message: 'Không tìm thấy ví của người dùng' });
        }
        res.status(200).json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin ví', error: error.message });
    }
};

// Tạo ví cho người dùng (thường được thực hiện khi đăng ký)
exports.createWallet = async (req, res) => {
    try {
        const newWallet = new Wallet({
            user_id: req.body.user_id,
            balance: req.body.balance || 0
        });
        await newWallet.save();
        res.status(201).json({ message: 'Đã tạo ví thành công', wallet: newWallet });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo ví', error: error.message });
    }
};

// Cập nhật số dư ví
exports.updateWalletBalance = async (req, res) => {
    try {
        const wallet = await Wallet.findOneAndUpdate(
            { user_id: req.params.userId },
            { balance: req.body.balance, updated_at: Date.now() },
            { new: true }
        );
        if (!wallet) {
            return res.status(404).json({ message: 'Không tìm thấy ví để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật số dư ví thành công', wallet: wallet });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật số dư ví', error: error.message });
    }
};
