const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
title: { 
    type: String, 
    required: true 
},
content: { 
    type: String, 
    required: true 
},
status: {
    type: String,
    enum: ['draft', 'published', 'hidden'],
    default: 'draft'
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
module.exports = mongoose.model('Blog', BlogSchema);
