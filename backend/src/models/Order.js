const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    voucher_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Voucher', 
        default: null 
    },
    total_price: { 
        type: Number, 
        required: true 
    },
    payment_method: { 
        type: String, 
        required: true 
    },
    qr_code_url: { 
        type: String 
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'completed', 'cancelled'],
        default: 'pending'
    },
    expires_at: { 
        type: Date 
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

module.exports = mongoose.model('Order', OrderSchema);