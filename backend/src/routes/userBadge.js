const express = require('express');
const router = express.Router();
const userBadgeController = require('../controllers/userBadgeController');
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Route để lấy danh sách user_badge (có thể cần quyền admin hoặc chỉ cho người dùng xem badge của chính họ)
router.get('/', authenticateToken, userBadgeController.getAllUserBadges);
router.get('/:id', authenticateToken, userBadgeController.getUserBadgeById);

// Route để tạo user_badge (khi người dùng đạt được một badge) - cần xác thực
router.post('/', authenticateToken, userBadgeController.createUserBadge);

// (Có thể không cần các route này)
// router.put('/:id', authenticateToken, userBadgeController.updateUserBadge);
// router.delete('/:id', authenticateToken, userBadgeController.deleteUserBadge);

module.exports = router;