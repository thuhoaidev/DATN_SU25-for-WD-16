const express = require('express');
const router = express.Router();
const userExperienceController = require('../controllers/userExperienceController');
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Route để lấy điểm kinh nghiệm của tất cả người dùng (có thể chỉ dành cho admin)
router.get('/', authenticateToken, userExperienceController.getAllUserExperiences);

// Route để lấy điểm kinh nghiệm của một người dùng theo User ID
router.get('/:userId', authenticateToken, userExperienceController.getUserExperienceByUserId);

// Route để tạo hoặc cập nhật điểm kinh nghiệm của người dùng (cần xác thực)
// Thường chỉ cập nhật, không tạo mới trực tiếp bằng route này (tạo khi đăng ký hoặc có hành động tăng điểm)
router.put('/:userId', authenticateToken, userExperienceController.updateUserExperience);

module.exports = router;