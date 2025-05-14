const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware'); // Import cả hai middleware

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

router.post('/', authenticateToken, isAdmin, courseController.createCourse); // Áp dụng authenticateToken trước isAdmin
router.put('/:id', authenticateToken, isAdmin, courseController.updateCourse); // Áp dụng authenticateToken trước isAdmin
router.delete('/:id', authenticateToken, isAdmin, courseController.deleteCourse); // Áp dụng authenticateToken trước isAdmin

module.exports = router;