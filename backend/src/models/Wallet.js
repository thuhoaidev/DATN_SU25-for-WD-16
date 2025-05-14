const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        unique: true 
    },
    balance: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Wallet', WalletSchema);