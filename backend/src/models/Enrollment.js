const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tham chiếu đến model User
        required: true,
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Tham chiếu đến model Course
        required: true,
    },
    progress: {
        type: Number,
        default: 0,
    },
    completed_at: {
        type: Date,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);