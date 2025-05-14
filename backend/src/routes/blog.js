const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

// Route để lấy danh sách blog (có thể cho phép người dùng xem các blog đã published)
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

// Route để tạo blog (cần xác thực)
router.post('/', authenticateToken, blogController.createBlog);

// Route để cập nhật blog (cần xác thực, có thể chỉ cho phép người dùng cập nhật blog của chính họ hoặc admin)
router.put('/:id', authenticateToken, blogController.updateBlog);

// Route để xóa blog (cần xác thực, có thể chỉ cho phép người dùng xóa blog của chính họ hoặc admin)
router.delete('/:id', authenticateToken, blogController.deleteBlog);

module.exports = router;