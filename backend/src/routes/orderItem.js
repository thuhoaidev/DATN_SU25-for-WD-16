const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Route để lấy danh sách mục đơn hàng (có thể cần quyền admin)
router.get('/', authenticateToken, orderItemController.getAllOrderItems);
router.get('/:id', authenticateToken, orderItemController.getOrderItemById);

// Route để tạo mục đơn hàng (thường được tạo cùng với đơn hàng, không tạo riêng lẻ)
router.post('/', authenticateToken, orderItemController.createOrderItem);

// Route để cập nhật mục đơn hàng (có thể không cần thiết)
router.put('/:id', authenticateToken, orderItemController.updateOrderItem);

// Route để xóa mục đơn hàng (có thể không cần thiết)
router.delete('/:id', authenticateToken, orderItemController.deleteOrderItem);

module.exports = router;