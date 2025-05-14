const Review = require('../models/Review');

// Lấy danh sách tất cả các đánh giá (có thể lọc theo course_id)
exports.getAllReviews = async (req, res) => {
    try {
        const filter = {};
        if (req.query.course_id) filter.course_id = req.query.course_id;
        const reviews = await Review.find(filter)
            .populate('user_id', 'name email')
            .populate('course_id', 'title');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách đánh giá', error: error.message });
    }
};

// Lấy một đánh giá theo ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('user_id', 'name email')
            .populate('course_id', 'title');
        if (!review) {
            return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin đánh giá', error: error.message });
    }
};

// Tạo một đánh giá mới
exports.createReview = async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).json({ message: 'Đã tạo đánh giá thành công', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo đánh giá', error: error.message });
    }
};

// Cập nhật một đánh giá theo ID
exports.updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Không tìm thấy đánh giá để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật đánh giá thành công', review: updatedReview });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật đánh giá', error: error.message });
    }
};

// Xóa một đánh giá theo ID
exports.deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Không tìm thấy đánh giá để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa đánh giá thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa đánh giá', error: error.message });
    }
};
