const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

// Các route công khai để lấy danh sách và chi tiết badge
router.get('/', badgeController.getAllBadges);
router.get('/:id', badgeController.getBadgeById);

// Các route yêu cầu xác thực và quyền admin để quản lý badge
router.post('/', authenticateToken, isAdmin, badgeController.createBadge);
router.put('/:id', authenticateToken, isAdmin, badgeController.updateBadge);
router.delete('/:id', authenticateToken, isAdmin, badgeController.deleteBadge);

module.exports = router;