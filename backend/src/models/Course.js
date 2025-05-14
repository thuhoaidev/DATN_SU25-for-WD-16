const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    category_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    }, 
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        decimal: true 
    },
    is_free: { 
        type: Boolean, 
        default: false 
    },
    level: { 
        type: String 
    },
    created_by: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true }, 
    created_at: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model('Course', CourseSchema);