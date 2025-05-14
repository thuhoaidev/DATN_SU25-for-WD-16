const mongoose = require('mongoose');

const UserExperienceSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    experience_points: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('UserExperience', UserExperienceSchema);