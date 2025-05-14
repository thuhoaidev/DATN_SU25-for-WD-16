const express = require('express');
const router = express.Router();
const quizResultController = require('../controllers/quizResultController');
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Route để lấy danh sách kết quả quiz (có thể cần quyền admin hoặc chỉ cho người dùng xem kết quả của chính họ)
router.get('/', authenticateToken, quizResultController.getAllQuizResults);
router.get('/:id', authenticateToken, quizResultController.getQuizResultById);

// Route để tạo kết quả quiz (khi người dùng nộp bài) - cần xác thực
router.post('/', authenticateToken, quizResultController.createQuizResult);

module.exports = router;