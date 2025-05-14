const express = require('express');
const router = express.Router();
const dailyCheckinController = require('../controllers/dailyCheckinController');
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Route để lấy lịch sử check-in của người dùng
router.get('/:userId', authenticateToken, dailyCheckinController.getDailyCheckinHistory);

// Route để check-in hàng ngày
router.post('/', authenticateToken, dailyCheckinController.createDailyCheckin);

module.exports = router;
