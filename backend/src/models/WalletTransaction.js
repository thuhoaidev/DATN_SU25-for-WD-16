const mongoose = require('mongoose');

const WalletTransactionSchema = new mongoose.Schema({
    wallet_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet', required: true },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal', 'payment', 'refund', 'adjustment'],
        required: true
    },
    amount: { 
        type: Number, 
        required: true 
    },
    payment_method_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'PaymentMethod' 
    },
    description: { 
        type: String, 
        required: true 
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'cancelled'],
        default: 'pending'
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WalletTransaction', WalletTransactionSchema);
