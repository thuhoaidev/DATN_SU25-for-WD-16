const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
name: {
    type: String, 
    required: true 
},
description: { 
    type: String, 
    required: true 
},
icon_url: { 
    type: String, 
    required: true 
},
condition_type: { 
    type: String, 
    required: true 
},
condition_value: { 
    type: Number, 
    required: true 
},
created_at: { 
    type: Date, 
    default: Date.now 
},
});   

module.exports = mongoose.model('Badge', BadgeSchema);