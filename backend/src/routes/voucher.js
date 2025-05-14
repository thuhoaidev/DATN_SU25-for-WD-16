const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

// Route để lấy danh sách voucher (có thể cho phép tất cả người dùng xem)
router.get('/', voucherController.getAllVouchers);
router.get('/:id', voucherController.getVoucherById);

// Route để tạo, cập nhật, xóa voucher (cần quyền admin)
router.post('/', authenticateToken, isAdmin, voucherController.createVoucher);
router.put('/:id', authenticateToken, isAdmin, voucherController.updateVoucher);
router.delete('/:id', authenticateToken, isAdmin, voucherController.deleteVoucher);

module.exports = router;