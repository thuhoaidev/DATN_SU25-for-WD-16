const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
    course_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course', required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    order_number: { 
        type: Number, 
        required: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Section', SectionSchema);