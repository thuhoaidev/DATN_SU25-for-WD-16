const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    lesson_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson', 
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: {
        type: mongoose.Schema.Types.Mixed, 
        required: true,
    },
    correct_answer: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Quiz', QuizSchema);