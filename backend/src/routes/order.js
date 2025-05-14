const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Route để lấy danh sách đơn hàng (có thể cần quyền admin hoặc chỉ cho người dùng xem đơn hàng của chính họ)
router.get('/', authenticateToken, orderController.getAllOrders);
router.get('/:id', authenticateToken, orderController.getOrderById);

// Route để tạo đơn hàng (cần xác thực)
router.post('/', authenticateToken, orderController.createOrder);

// Route để cập nhật đơn hàng (cần xác thực, có thể chỉ cho phép admin cập nhật trạng thái đơn hàng)
router.put('/:id', authenticateToken, orderController.updateOrder);

// Route để xóa đơn hàng (cần xác thực, có thể chỉ cho phép admin xóa)
router.delete('/:id', authenticateToken, orderController.deleteOrder);

module.exports = router;