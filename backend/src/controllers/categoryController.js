const Category = require('../models/Category');

// Lấy danh sách tất cả các danh mục
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách danh mục', error: error.message });
    }
};

// Lấy một danh mục theo ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin danh mục', error: error.message });
    }
};

// Tạo một danh mục mới
exports.createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json({ message: 'Đã tạo danh mục thành công', category: newCategory });
    } catch (error) {
        if (error.code === 11000) { // Lỗi trùng lặp unique field (name)
            return res.status(400).json({ message: 'Tên danh mục đã tồn tại' });
        }
        res.status(500).json({ message: 'Lỗi khi tạo danh mục', error: error.message });
    }
};

// Cập nhật một danh mục theo ID
exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật danh mục thành công', category: updatedCategory });
    } catch (error) {
        if (error.code === 11000) { // Lỗi trùng lặp unique field (name)
            return res.status(400).json({ message: 'Tên danh mục đã tồn tại' });
        }
        res.status(500).json({ message: 'Lỗi khi cập nhật danh mục', error: error.message });
    }
};

// Xóa một danh mục theo ID
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa danh mục thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa danh mục', error: error.message });
    }
};