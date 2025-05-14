const mongoose = require('mongoose');

const QuizResultSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    quiz_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz', 
        required: true,
    },
    selected_answer: {
        type: String,
    },
    is_correct: {
        type: Boolean,
    },
    submitted_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('QuizResult', QuizResultSchema);