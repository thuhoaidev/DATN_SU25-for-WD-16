const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Route để lấy danh sách ghi danh (có thể cần quyền admin hoặc chỉ cho người dùng xem ghi danh của chính họ)
router.get('/', authenticateToken, enrollmentController.getAllEnrollments);
router.get('/:id', authenticateToken, enrollmentController.getEnrollmentById);

// Route để tạo ghi danh (khi người dùng đăng ký khóa học) - cần xác thực
router.post('/', authenticateToken, enrollmentController.createEnrollment);

// Route để cập nhật thông tin ghi danh (ví dụ: tiến trình) - cần xác thực
router.put('/:id', authenticateToken, enrollmentController.updateEnrollment);

// Route để xóa ghi danh (ví dụ: khi người dùng hủy đăng ký) - cần xác thực
router.delete('/:id', authenticateToken, enrollmentController.deleteEnrollment);

module.exports = router;