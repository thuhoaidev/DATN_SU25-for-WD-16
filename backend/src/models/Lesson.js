const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    section_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section', 
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    order_number: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Lesson', LessonSchema);