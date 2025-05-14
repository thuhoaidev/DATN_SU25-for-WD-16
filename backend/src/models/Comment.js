const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tham chiếu đến model User
        required: true,
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', // Tham chiếu đến chính model Comment để tạo cây phân cấp
        default: null,
    },
    target_type: {
        type: String,
        required: true,
        enum: ['course', 'lesson', 'blog'], // Giới hạn các loại đối tượng được comment
    },
    target_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', CommentSchema);