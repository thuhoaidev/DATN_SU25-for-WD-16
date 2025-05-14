const OrderItem = require('../models/OrderItem');

// Lấy danh sách tất cả các mục đơn hàng
exports.getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.find()
            .populate('order_id', 'id user_id') // Thêm id của order để dễ theo dõi
            .populate('course_id', 'title');
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách mục đơn hàng', error: error.message });
    }
};

// Lấy một mục đơn hàng theo ID
exports.getOrderItemById = async (req, res) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id)
            .populate('order_id', 'id user_id')  // Thêm id của order để dễ theo dõi
            .populate('course_id', 'title');
        if (!orderItem) {
            return res.status(404).json({ message: 'Không tìm thấy mục đơn hàng' });
        }
        res.status(200).json(orderItem);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin mục đơn hàng', error: error.message });
    }
};

// Tạo một mục đơn hàng mới
exports.createOrderItem = async (req, res) => {
    try {
        const newOrderItem = new OrderItem(req.body);
        await newOrderItem.save();
        res.status(201).json({ message: 'Đã tạo mục đơn hàng thành công', orderItem: newOrderItem });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo mục đơn hàng', error: error.message });
    }
};

// Cập nhật một mục đơn hàng theo ID
exports.updateOrderItem = async (req, res) => {
    try {
        const updatedOrderItem = await OrderItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrderItem) {
            return res.status(404).json({ message: 'Không tìm thấy mục đơn hàng để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật mục đơn hàng thành công', orderItem: updatedOrderItem });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật mục đơn hàng', error: error.message });
    }
};

// Xóa một mục đơn hàng theo ID
exports.deleteOrderItem = async (req, res) => {
    try {
        const deletedOrderItem = await OrderItem.findByIdAndDelete(req.params.id);
        if (!deletedOrderItem) {
            return res.status(404).json({ message: 'Không tìm thấy mục đơn hàng để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa mục đơn hàng thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa mục đơn hàng', error: error.message });
    }
};