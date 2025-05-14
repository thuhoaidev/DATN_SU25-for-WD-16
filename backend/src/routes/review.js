const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Route để lấy danh sách đánh giá (có thể lọc theo course_id)
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);

// Route để tạo đánh giá (cần xác thực)
router.post('/', authenticateToken, reviewController.createReview);

// Route để cập nhật đánh giá (cần xác thực, có thể chỉ cho phép người dùng cập nhật đánh giá của chính họ)
router.put('/:id', authenticateToken, reviewController.updateReview);

// Route để xóa đánh giá (cần xác thực, có thể chỉ cho phép người dùng xóa đánh giá của chính họ hoặc admin)
router.delete('/:id', authenticateToken, reviewController.deleteReview);

module.exports = router;
