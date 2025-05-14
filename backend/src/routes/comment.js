const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Route để lấy danh sách comment (có thể lọc theo target_type và target_id)
router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getCommentById);

// Route để tạo comment (cần xác thực)
router.post('/', authenticateToken, commentController.createComment);

// Route để cập nhật comment (cần xác thực, có thể chỉ cho phép người dùng cập nhật comment của chính họ)
router.put('/:id', authenticateToken, commentController.updateComment);

// Route để xóa comment (cần xác thực, có thể chỉ cho phép người dùng xóa comment của chính họ hoặc quyền admin)
router.delete('/:id', authenticateToken, commentController.deleteComment);

module.exports = router;