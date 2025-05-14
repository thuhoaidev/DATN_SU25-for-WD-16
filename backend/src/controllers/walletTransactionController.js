const WalletTransaction = require('../models/WalletTransaction');

// Lấy lịch sử giao dịch của một ví
exports.getWalletTransactions = async (req, res) => {
    try {
        const walletId = req.params.walletId;
        const transactions = await WalletTransaction.find({ wallet_id: walletId })
            .sort({ created_at: -1 }) // Sắp xếp theo thời gian giảm dần
            .populate('wallet_id', 'user_id')  // Lấy thông tin ví
            .populate('payment_method_id', 'name'); // Lấy thông tin phương thức thanh toán
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy lịch sử giao dịch', error: error.message });
    }
};

// Lấy thông tin chi tiết của một giao dịch
exports.getWalletTransactionById = async (req, res) => {
    try {
        const transaction = await WalletTransaction.findById(req.params.id)
            .populate('wallet_id', 'user_id')
            .populate('payment_method_id', 'name');
        if (!transaction) {
            return res.status(404).json({ message: 'Không tìm thấy giao dịch' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin giao dịch', error: error.message });
    }
};

// Tạo một giao dịch mới
exports.createWalletTransaction = async (req, res) => {
    try {
        const newTransaction = new WalletTransaction(req.body);
        await newTransaction.save();

        // Cập nhật số dư ví (ví dụ)
        const Wallet = require('../models/Wallet'); // Import model Wallet
        const wallet = await Wallet.findById(req.body.wallet_id);
        if (wallet) {
            if (req.body.type === 'deposit') {
                wallet.balance += req.body.amount;
            } else if (req.body.type === 'withdrawal' || req.body.type === 'payment') {
                wallet.balance -= req.body.amount;
            }
            //  Bạn có thể cần thêm các loại giao dịch khác (refund, adjustment)
            await wallet.save();
        }

        res.status(201).json({ message: 'Đã tạo giao dịch thành công', transaction: newTransaction });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo giao dịch', error: error.message });
    }
};

// Cập nhật trạng thái giao dịch (ví dụ: từ 'pending' sang 'completed')
exports.updateWalletTransactionStatus = async (req, res) => {
    try {
        const updatedTransaction = await WalletTransaction.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status, updated_at: Date.now() },
            { new: true }
        );
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Không tìm thấy giao dịch để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật trạng thái giao dịch thành công', transaction: updatedTransaction });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái giao dịch', error: error.message });
    }
};
