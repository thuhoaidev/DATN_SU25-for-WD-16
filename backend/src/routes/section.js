const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

// Route để lấy danh sách section (có thể cho phép người dùng xem các section của một khóa học)
router.get('/', sectionController.getAllSections);
router.get('/:id', sectionController.getSectionById);

// Route để tạo, cập nhật, xóa section (cần quyền admin)
router.post('/', authenticateToken, isAdmin, sectionController.createSection);
router.put('/:id', authenticateToken, isAdmin, sectionController.updateSection);
router.delete('/:id', authenticateToken, isAdmin, sectionController.deleteSection);

module.exports = router;