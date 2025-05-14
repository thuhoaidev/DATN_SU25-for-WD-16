const Enrollment = require('../models/Enrollment');

// Lấy danh sách tất cả các ghi danh (có thể lọc theo user_id hoặc course_id)
exports.getAllEnrollments = async (req, res) => {
    try {
        const filter = {};
        if (req.query.user_id)
            filter.user_id = req.query.user_id;
        if (req.query.course_id)
            filter.course_id = req.query.course_id;
        const enrollments = await Enrollment.find(filter)
            .populate('user_id', 'name email') // Populate thông tin người dùng
            .populate('course_id', 'title'); // Populate thông tin khóa học
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi lấy danh sách ghi danh',
            error: error.message
        });
    }
};

// Lấy một ghi danh theo ID
exports.getEnrollmentById = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id)
            .populate('user_id', 'name email')
            .populate('course_id', 'title');
        if (!enrollment) {
            return res.status(404).json({ message: 'Không tìm thấy ghi danh' });
        }
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi lấy thông tin ghi danh',
            error: error.message
        });
    }
};

// Tạo một ghi danh mới (khi người dùng đăng ký một khóa học)
exports.createEnrollment = async (req, res) => {
    try {
        const newEnrollment = new Enrollment(req.body);
        await newEnrollment.save();
        res.status(201).json({
            message: 'Đã tạo ghi danh thành công',
            enrollment: newEnrollment
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi tạo ghi danh',
            error: error.message
        });
    }
};

// Cập nhật thông tin ghi danh (ví dụ: cập nhật tiến trình)
exports.updateEnrollment = async (req, res) => {
    try {
        const updatedEnrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updatedEnrollment) {
            return res.status(404).json({
                message: 'Không tìm thấy ghi danh để cập nhật'
            });
        }
        res.status(200).json({
            message: 'Đã cập nhật thông tin ghi danh thành công',
            enrollment: updatedEnrollment
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi cập nhật ghi danh',
            error: error.message
        });
    }
};

// Xóa một ghi danh (ví dụ: khi người dùng hủy đăng ký khóa học)
exports.deleteEnrollment = async (req, res) => {
    try {
        const deletedEnrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!deletedEnrollment) {
            return res.status(404).json({ message: 'Không tìm thấy ghi danh để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa ghi danh thành công' });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi xóa ghi danh',
            error: error.message
        });
    }
};