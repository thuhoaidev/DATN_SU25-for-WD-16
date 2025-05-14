const mongoose = require('mongoose');

const UserBadgeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tham chiếu đến model User
        required: true,
    },
    badge_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Badge', // Tham chiếu đến model Badge
        required: true,
    },
    earned_at: {
        type: Date,
        default: Date.now,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserBadge', UserBadgeSchema);