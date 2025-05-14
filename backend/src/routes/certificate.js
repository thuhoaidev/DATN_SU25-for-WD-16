const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Route để lấy danh sách chứng chỉ (có thể cần quyền admin hoặc chỉ cho người dùng xem chứng chỉ của chính họ)
router.get('/', authenticateToken, certificateController.getAllCertificates);
router.get('/:id', authenticateToken, certificateController.getCertificateById);

// Route để tạo chứng chỉ (ví dụ: khi người dùng hoàn thành khóa học) - cần xác thực
router.post('/', authenticateToken, certificateController.createCertificate);

// Route để cập nhật chứng chỉ (có thể cần quyền admin)
router.put('/:id', authenticateToken, certificateController.updateCertificate);

// Route để xóa chứng chỉ (có thể cần quyền admin)
router.delete('/:id', authenticateToken, certificateController.deleteCertificate);

module.exports = router;