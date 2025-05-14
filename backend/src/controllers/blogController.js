const Blog = require('../models/Blog');

// Lấy danh sách tất cả các blog
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('user_id', 'name email');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách blog', error: error.message });
    }
};

// Lấy một blog theo ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('user_id', 'name email');
        if (!blog) {
            return res.status(404).json({ message: 'Không tìm thấy blog' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin blog', error: error.message });
    }
};

// Tạo một blog mới
exports.createBlog = async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        await newBlog.save();
        res.status(201).json({ message: 'Đã tạo blog thành công', blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo blog', error: error.message });
    }
};

// Cập nhật một blog theo ID
exports.updateBlog = async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Không tìm thấy blog để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật blog thành công', blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật blog', error: error.message });
    }
};

// Xóa một blog theo ID
exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Không tìm thấy blog để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa blog thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa blog', error: error.message });
    }
};