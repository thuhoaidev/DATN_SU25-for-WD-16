const Cart = require('../models/Cart');

// Lấy giỏ hàng của một người dùng
exports.getCartByUserId = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user_id: req.params.userId }).populate('user_id', 'name email');
        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng của người dùng' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy giỏ hàng', error: error.message });
    }
};

// Tạo giỏ hàng cho người dùng (thường được thực hiện khi đăng ký)
exports.createCart = async (req, res) => {
    try {
        const newCart = new Cart({ user_id: req.body.user_id });
        await newCart.save();
        res.status(201).json({ message: 'Đã tạo giỏ hàng thành công', cart: newCart });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo giỏ hàng', error: error.message });
    }
};

// Cập nhật giỏ hàng (ví dụ: khi thêm sản phẩm vào giỏ hàng)
exports.updateCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { user_id: req.params.userId },
            { updated_at: Date.now() }, // Thường thì bạn sẽ cập nhật các trường khác như danh sách sản phẩm
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật giỏ hàng thành công', cart: cart });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật giỏ hàng', error: error.message });
    }
};
