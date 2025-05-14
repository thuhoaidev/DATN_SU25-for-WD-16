const mongoose = require('mongoose');

const DailyCheckinSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    checkin_date: { 
        type: Date, 
        required: true, 
        unique: true 
    }, 
    created_at: { 
        type: Date, 
        default: Date.now 
    }
});

// Đảm bảo rằng mỗi người dùng chỉ có thể check-in một lần trong một ngày
DailyCheckinSchema.index({ user_id: 1, checkin_date: 1 }, { unique: true });

module.exports = mongoose.model('DailyCheckin', DailyCheckinSchema);
