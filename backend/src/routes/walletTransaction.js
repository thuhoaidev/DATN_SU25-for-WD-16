const express = require('express');
const router = express.Router();
const walletTransactionController = require('../controllers/walletTransactionController');
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Route để lấy lịch sử giao dịch của một ví
router.get('/:walletId', authenticateToken, walletTransactionController.getWalletTransactions);

// Route để lấy thông tin chi tiết của một giao dịch
router.get('/:id', authenticateToken, walletTransactionController.getWalletTransactionById);

// Route để tạo giao dịch (cần xác thực)
router.post('/', authenticateToken, walletTransactionController.createWalletTransaction);

// Route để cập nhật trạng thái giao dịch (cần xác thực, có thể chỉ dành cho admin hoặc người thực hiện giao dịch)
router.put('/:id', authenticateToken, walletTransactionController.updateWalletTransactionStatus);

module.exports = router;