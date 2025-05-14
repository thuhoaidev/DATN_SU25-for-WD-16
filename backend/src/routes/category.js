const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware'); 

// Các route công khai
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Các route yêu cầu xác thực và quyền admin để quản lý danh mục
router.post('/', authenticateToken, isAdmin, categoryController.createCategory);
router.put('/:id', authenticateToken, isAdmin, categoryController.updateCategory);
router.delete('/:id', authenticateToken, isAdmin, categoryController.deleteCategory);

module.exports = router;