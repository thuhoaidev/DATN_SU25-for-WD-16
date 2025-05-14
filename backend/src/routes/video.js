const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

// Các route công khai để lấy danh sách và chi tiết video
router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);

// Các route yêu cầu xác thực và quyền admin để quản lý video
router.post('/', authenticateToken, isAdmin, videoController.createVideo);
router.put('/:id', authenticateToken, isAdmin, videoController.updateVideo);
router.delete('/:id', authenticateToken, isAdmin, videoController.deleteVideo);

module.exports = router;