const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware'); 

// Các route công khai để lấy danh sách và chi tiết quiz
router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);

// Các route yêu cầu xác thực và quyền admin để quản lý quiz
router.post('/', authenticateToken, isAdmin, quizController.createQuiz);
router.put('/:id', authenticateToken, isAdmin, quizController.updateQuiz);
router.delete('/:id', authenticateToken, isAdmin, quizController.deleteQuiz);

module.exports = router;