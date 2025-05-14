const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    order_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order', 
        required: true 
    },
    course_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course', 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);