const Comment = require('../models/Comment');

// Lấy danh sách tất cả comment (có thể lọc theo target_type và target_id)
exports.getAllComments = async (req, res) => {
    try {
        const filter = {};
        if (req.query.target_type) filter.target_type = req.query.target_type;
        if (req.query.target_id) filter.target_id = req.query.target_id;
        const comments = await Comment.find(filter)
            .populate('user_id', 'name email') // Populate thông tin người dùng
            .populate({
                path: 'parent_id',
                select: 'content user_id',
                populate: {
                    path: 'user_id',
                    select: 'name'
                }
            })
            .sort({ created_at: -1 }); 
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách comment', error: error.message });
    }
};

// Lấy một comment theo ID
exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate('user_id', 'name email')
             .populate({
                path: 'parent_id',
                select: 'content user_id',
                populate: {
                    path: 'user_id',
                    select: 'name'
                }
            });
        if (!comment) {
            return res.status(404).json({ message: 'Không tìm thấy comment' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin comment', error: error.message });
    }
};

// Tạo một comment mới
exports.createComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        await newComment.save();
        res.status(201).json({ message: 'Đã tạo comment thành công', comment: newComment });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo comment', error: error.message });
    }
};

// Cập nhật một comment theo ID
exports.updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ message: 'Không tìm thấy comment để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật comment thành công', comment: updatedComment });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật comment', error: error.message });
    }
};

// Xóa một comment theo ID
exports.deleteComment = async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Không tìm thấy comment để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa comment thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa comment', error: error.message });
    }
};
