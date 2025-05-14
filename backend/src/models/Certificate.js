const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
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
    certificate_url: {
        type: String,
        required: true,
    },
    issued_at: {
        type: Date,
        default: Date.now,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Certificate', CertificateSchema);