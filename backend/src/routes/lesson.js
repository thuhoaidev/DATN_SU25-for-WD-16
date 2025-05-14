const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');


router.get('/', lessonController.getAllLessons);
router.get('/:id', lessonController.getLessonById);


router.post('/', authenticateToken, isAdmin, lessonController.createLesson);
router.put('/:id', authenticateToken, isAdmin, lessonController.updateLesson);
router.delete('/:id', authenticateToken, isAdmin, lessonController.deleteLesson);

module.exports = router;