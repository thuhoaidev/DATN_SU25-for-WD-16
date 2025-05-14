const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middlewares/authMiddleware'); // Giả sử bạn có middleware này

// Route để lấy giỏ hàng của người dùng
router.get('/:userId', authenticateToken, cartController.getCartByUserId);

// Route để tạo giỏ hàng (thường được gọi khi đăng ký người dùng)
router.post('/', authenticateToken, cartController.createCart);

// Route để cập nhật giỏ hàng
router.put('/:userId', authenticateToken, cartController.updateCart);

module.exports = router;