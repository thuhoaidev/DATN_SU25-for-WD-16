const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    lesson_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson', // Tham chiếu đến model Lesson
        required: true,
    },
    video_url: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Video', VideoSchema);