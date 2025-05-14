const Certificate = require('../models/Certificate');

// Lấy danh sách tất cả chứng chỉ (có thể lọc theo user_id hoặc course_id)
exports.getAllCertificates = async (req, res) => {
    try {
        const filter = {};
        if (req.query.user_id) filter.user_id = req.query.user_id;
        if (req.query.course_id) filter.course_id = req.query.course_id;
        const certificates = await Certificate.find(filter)
            .populate('user_id', 'name email') // Populate thông tin người dùng
            .populate('course_id', 'title'); // Populate thông tin khóa học
        res.status(200).json(certificates);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách chứng chỉ', error: error.message });
    }
};

// Lấy một chứng chỉ theo ID
exports.getCertificateById = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id)
            .populate('user_id', 'name email')
            .populate('course_id', 'title');
        if (!certificate) {
            return res.status(404).json({ message: 'Không tìm thấy chứng chỉ' });
        }
        res.status(200).json(certificate);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin chứng chỉ', error: error.message });
    }
};

// Tạo một chứng chỉ mới
exports.createCertificate = async (req, res) => {
    try {
        const newCertificate = new Certificate(req.body);
        await newCertificate.save();
        res.status(201).json({ message: 'Đã tạo chứng chỉ thành công', certificate: newCertificate });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo chứng chỉ', error: error.message });
    }
};

// Cập nhật một chứng chỉ theo ID
exports.updateCertificate = async (req, res) => {
    try {
        const updatedCertificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCertificate) {
            return res.status(404).json({ message: 'Không tìm thấy chứng chỉ để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật chứng chỉ thành công', certificate: updatedCertificate });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật chứng chỉ', error: error.message });
    }
};

// Xóa một chứng chỉ theo ID
exports.deleteCertificate = async (req, res) => {
    try {
        const deletedCertificate = await Certificate.findByIdAndDelete(req.params.id);
        if (!deletedCertificate) {
            return res.status(404).json({ message: 'Không tìm thấy chứng chỉ để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa chứng chỉ thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa chứng chỉ', error: error.message });
    }
};