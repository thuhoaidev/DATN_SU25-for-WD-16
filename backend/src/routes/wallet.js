const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const { authenticateToken } = require('../middlewares/authMiddleware'); // Giả sử bạn có middleware này

// Route để lấy thông tin ví của người dùng
router.get('/:userId', authenticateToken, walletController.getWalletByUserId);

// Route để tạo ví (thường được gọi khi đăng ký người dùng)
router.post('/', authenticateToken, walletController.createWallet);

// Route để cập nhật số dư ví (ví dụ: khi nạp tiền, thanh toán)
router.put('/:userId', authenticateToken, walletController.updateWalletBalance);

module.exports = router;