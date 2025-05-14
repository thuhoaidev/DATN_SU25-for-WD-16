const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

// Lấy danh sách tất cả các đơn hàng
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user_id', 'name email')
            .populate('voucher_id', 'code description');

        // Lấy thông tin các mục trong đơn hàng
        const ordersWithItems = await Promise.all(orders.map(async (order) => {
            const orderItems = await OrderItem.find({ order_id: order._id })
                .populate('course_id', 'title');
            return { ...order.toObject(), order_items: orderItems };
        }));

        res.status(200).json(ordersWithItems);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng', error: error.message });
    }
};

// Lấy một đơn hàng theo ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user_id', 'name email')
            .populate('voucher_id', 'code description');

        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }

        // Lấy thông tin các mục trong đơn hàng
        const orderItems = await OrderItem.find({ order_id: order._id })
            .populate('course_id', 'title');

        const orderWithItems = { ...order.toObject(), order_items: orderItems };
        res.status(200).json(orderWithItems);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin đơn hàng', error: error.message });
    }
};

// Tạo một đơn hàng mới
exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();

        // Tạo các mục đơn hàng (order items)
        if (req.body.order_items && Array.isArray(req.body.order_items)) {
            const orderItems = req.body.order_items.map(item => ({
                ...item,
                order_id: newOrder._id
            }));
            await OrderItem.insertMany(orderItems);
        }

        res.status(201).json({ message: 'Đã tạo đơn hàng thành công', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo đơn hàng', error: error.message });
    }
};

// Cập nhật một đơn hàng theo ID
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật đơn hàng thành công', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật đơn hàng', error: error.message });
    }
};

// Xóa một đơn hàng theo ID
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa đơn hàng thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa đơn hàng', error: error.message });
    }
};